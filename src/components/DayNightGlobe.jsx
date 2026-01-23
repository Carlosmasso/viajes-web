import React, { useEffect, useState, useRef, useCallback } from "react";
import Globe from "react-globe.gl";
import { TextureLoader, ShaderMaterial, Vector2 } from "three";
import * as solar from "solar-calculator";
import { destinations } from "@/data/destinations";
import { useNavigate } from "react-router-dom";

const VELOCITY = 1; // minutos por frame

// Shader personalizado: mezcla texturas de día y noche
const dayNightShader = {
  vertexShader: `
    varying vec3 vNormal;
    varying vec2 vUv;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    #define PI 3.141592653589793
    uniform sampler2D dayTexture;
    uniform sampler2D nightTexture;
    uniform vec2 sunPosition;
    uniform vec2 globeRotation;
    varying vec3 vNormal;
    varying vec2 vUv;

    float toRad(in float a) {
      return a * PI / 180.0;
    }

    vec3 Polar2Cartesian(in vec2 c) { // [lng, lat]
      float theta = toRad(90.0 - c.x);
      float phi = toRad(90.0 - c.y);
      return vec3( // x,y,z
        sin(phi) * cos(theta),
        cos(phi),
        sin(phi) * sin(theta)
      );
    }

    void main() {
      float invLon = toRad(globeRotation.x);
      float invLat = -toRad(globeRotation.y);
      mat3 rotX = mat3(
        1, 0, 0,
        0, cos(invLat), -sin(invLat),
        0, sin(invLat), cos(invLat)
      );
      mat3 rotY = mat3(
        cos(invLon), 0, sin(invLon),
        0, 1, 0,
        -sin(invLon), 0, cos(invLon)
      );
      vec3 rotatedSunDirection = rotX * rotY * Polar2Cartesian(sunPosition);
      float intensity = dot(normalize(vNormal), normalize(rotatedSunDirection));
      vec4 dayColor = texture2D(dayTexture, vUv);
      vec4 nightColor = texture2D(nightTexture, vUv);
      float blendFactor = smoothstep(-0.1, 0.1, intensity);
      gl_FragColor = mix(nightColor, dayColor, blendFactor);
    }
  `,
};

// Función para calcular posición del sol
const sunPosAt = (dt) => {
  const day = new Date(+dt).setUTCHours(0, 0, 0, 0);
  const t = solar.century(dt);
  const longitude = ((day - dt) / 864e5) * 360 - 180;
  return [longitude - solar.equationOfTime(t) / 4, solar.declination(t)];
};

const DayNightGlobe = () => {
  const [dt, setDt] = useState(+new Date());
  const [globeMaterial, setGlobeMaterial] = useState(null);
  const navigate = useNavigate();
  const globeRef = useRef(null);

  // Normalizamos destinos a estructura para labels
  const DESTINOS = destinations.map((d) => {
    const coords = d.coordinates || [d.lon, d.lat]; // [lng, lat]
    return {
      id: d.id,
      nombre: d.name,
      lat: coords[1],
      lng: coords[0],
    };
  });

  // Animar el tiempo (cambia dt)
  useEffect(() => {
    let animId;

    const animateTime = () => {
      setDt((prev) => prev + VELOCITY * 60 * 1000);
      animId = requestAnimationFrame(animateTime);
    };

    animateTime();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  // Cargar texturas y crear ShaderMaterial
  useEffect(() => {
    let cancelled = false;

    Promise.all([
      new TextureLoader().loadAsync(
        "//cdn.jsdelivr.net/npm/three-globe/example/img/earth-day.jpg",
      ),
      new TextureLoader().loadAsync(
        "//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg",
      ),
    ]).then(([dayTexture, nightTexture]) => {
      if (cancelled) return;

      const material = new ShaderMaterial({
        uniforms: {
          dayTexture: { value: dayTexture },
          nightTexture: { value: nightTexture },
          sunPosition: { value: new Vector2() },
          globeRotation: { value: new Vector2() },
        },
        vertexShader: dayNightShader.vertexShader,
        fragmentShader: dayNightShader.fragmentShader,
      });

      setGlobeMaterial(material);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Actualizar posición del sol en el shader cuando cambia dt
  useEffect(() => {
    if (!globeMaterial) return;
    globeMaterial.uniforms.sunPosition.value.set(...sunPosAt(dt));
  }, [dt, globeMaterial]);

  useEffect(() => {
    if (globeRef.current) {
      const isMobile = window.innerWidth <= 768; // Determinar si es un dispositivo móvil
      const altitude = isMobile ? 3 : 1.75; // Altitude 4 para móvil, 2 para desktop
      globeRef.current.pointOfView({ altitude });
    }
  }, []);

  // Actualizar rotación del globo en el shader cuando el usuario hace zoom/drag
  const handleZoom = ({ lng, lat }) => {
    if (!globeMaterial) return;
    globeMaterial.uniforms.globeRotation.value.set(lng, lat);
  };

  const renderDestinationButton = (dest, onClick) => (
    <button
      key={dest.id}
      onClick={onClick}
      className="flex items-center gap-3 p-3 backdrop-blur-lg rounded-xl transition-all group text-left border cursor-pointer bg-[#a61d2d]/90 hover:bg-[#a61d2d] border-[#a61d2d]/60 shadow-sm hover:shadow-md"
    >
      <div className="flex-1 min-w-0">
        <h3 className="font-medium truncate transition-colors text-white">
          {dest.nombre}
        </h3>
      </div>
    </button>
  );

  const memoizedHandleFlyToDestino = useCallback(
    (coords, nombre, id) => {
      if (globeRef.current) {
        globeRef.current.pointOfView(
          { lat: coords[1], lng: coords[0], altitude: 1.5 },
          2000,
        );
        setTimeout(() => {
          navigate(`/destino/${id}`);
        }, 2000);
      }
      console.log(`Flying to ${nombre} at coordinates:`, coords);
    },
    [navigate],
  );

  return (
    <div
      style={{
        margin: 0,
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Globe
        ref={globeRef}
        globeMaterial={globeMaterial || undefined}
        onZoom={handleZoom}
        backgroundColor="#e8ebed"
      />

      {/* Destinos Sidebar - Desktop */}
      <div className="absolute right-6 top-24 bottom-6 w-64 hidden lg:flex flex-col gap-2 overflow-y-auto pointer-events-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pr-2">
        <div className="mb-2 px-3 py-2 bg-[#a61d2d]/95 backdrop-blur-md rounded-xl border border-border/40 shadow-sm">
          <h2 className="text-sm font-semibold text-white">
            Destinos Disponibles
          </h2>
          <p className="text-xs text-white/90">Haz clic para explorar</p>
        </div>
        {DESTINOS.map((dest) =>
          renderDestinationButton(dest, () =>
            memoizedHandleFlyToDestino(
              [dest.lng, dest.lat], 
              dest.nombre,
              dest.id,
            ),
          ),
        )}
      </div>

      {/* Destinos Bottom Bar - Mobile */}
      <div className="absolute bottom-20 left-4 right-4 lg:hidden flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {DESTINOS.map((dest) =>
          renderDestinationButton(dest, () =>
            memoizedHandleFlyToDestino([dest.lng, dest.lat], dest.nombre, dest.id),
          ),
        )}
      </div>
    </div>
  );
};

export default DayNightGlobe;
