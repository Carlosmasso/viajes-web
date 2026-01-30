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
  const [showDestinations, setShowDestinations] = useState(false);
  const navigate = useNavigate();
  const globeRef = useRef(null);

  // Normalizamos destinos a estructura para labels
  const DESTINOS = destinations.map((d) => {
    const coords = d.coordinates || [d.lon, d.lat]; // [lng, lat]
    return {
      ...d,
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
      const controls = globeRef.current.controls();
      controls.enableZoom = false;
      const isMobile = window.innerWidth <= 768; // Determinar si es un dispositivo móvil
      const altitude = isMobile ? 6 : 1.75; // Altitude 4 para móvil, 2 para desktop
      globeRef.current.pointOfView({ altitude });
    }
  }, []);

  // Actualizar rotación del globo en el shader cuando el usuario hace zoom/drag
  const handleZoom = ({ lng, lat }) => {
    if (!globeMaterial) return;
    globeMaterial.uniforms.globeRotation.value.set(lng, lat);
  };

  const renderDestinationCard = (dest) => (
    <div
      key={dest.id}
      onClick={() =>
        memoizedHandleFlyToDestino([dest.lng, dest.lat], dest.nombre, dest.id)
      }
      className="group cursor-pointer bg-white backdrop-blur-md rounded-xl px-4 py-3 hover:bg-[#a61d2d] transition-all duration-300 border border-gray-200 hover:border-[#a61d2d]"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800 group-hover:text-white transition-colors">
          {dest.nombre}
        </h3>
        <span className="text-gray-400 group-hover:text-white text-sm transition-colors">
          →
        </span>
      </div>
    </div>
  );

  const memoizedHandleFlyToDestino = useCallback(
    (coords, nombre, id) => {
      // Cerrar todos los modales
      setShowDestinations(false);

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

  const renderNewDestination = (dest) => {
    return (
      <div
        key={dest.id}
        onClick={() =>
          memoizedHandleFlyToDestino([dest.lng, dest.lat], dest.nombre, dest.id)
        }
        style={{
          position: "relative",
          padding: "12px",
          backgroundColor: "black",
          display: "grid",
          placeContent: "center",
          textAlign: "center",
          minHeight: "200px",
          borderRadius: "12px",
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${dest.bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.7,
            zIndex: 0,
          }}
        />
        <h3 className="font-semibold text-white" style={{ position: "relative", zIndex: 1 }}>{dest.nombre}</h3>
      </div>
    );
  };

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

      <div
        style={{
          position: "absolute",
          top: "10%",
          left: 0,
          right: 0,
          gap: "20px",
          display: "grid",
          marginInline: "24px",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {DESTINOS.slice(0, 3).map((dest) => renderNewDestination(dest))}
      </div>

      <div
         style={{
          position: "absolute",
          bottom: "10%",
          left: 0,
          right: 0,
          gap: "20px",
          display: "grid",
          marginInline: "24px",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {DESTINOS.slice(3).map((dest) => renderNewDestination(dest))}
      </div>

      {/* Destinos Center Overlay */}
      {showDestinations && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-40 pointer-events-auto">
          <div className="bg-white/98 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-gray-200 pointer-events-auto max-w-3xl w-full mx-4">
            <div className="flex items-center justify-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Selecciona tu destino
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pr-2">
              {DESTINOS.map((dest) => renderDestinationCard(dest))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DayNightGlobe;
