import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import * as turf from "@turf/turf";
import { destinations } from "@/data/destinations";

const GlobeMap = () => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const [zoomIn, setZoomIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDestino, setSelectedDestino] = useState(null);
  const zoomDelta = 1.5;

  // Usar destinos soportados desde el fichero
  const DESTINOS = destinations.map((d) => ({
    nombre: d.name,
    coords: d.coordinates || [d.lon, d.lat], // soporta ambos formatos
    id: d.id,
  }));

  // Función para compensar el efecto de ampliación en zonas polares
  const getZoomAdjustment = (oldLatitude, newLatitude) => {
    return Math.log2(
      Math.cos((newLatitude / 180) * Math.PI) /
        Math.cos((oldLatitude / 180) * Math.PI)
    );
  };

  useEffect(() => {
    if (mapRef.current) return; // Evita inicializar más de una vez

    console.log("Inicializando mapa...");
    console.log("Container:", mapContainer.current);

    if (!mapContainer.current) {
      console.error("Container no disponible");
      return;
    }

    try {
      // Ajustar zoom según el ancho de la pantalla
      const isMobile = window.innerWidth < 1024;
      const initialZoom = isMobile ? 1.2 : 2.5;
      
      const map = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {
            "world-data": {
              type: "geojson",
              data: "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson",
            },
          },
          layers: [
            {
              id: "background",
              type: "background",
              paint: {
                "background-color": "#ffffff",
              },
            },
            {
              id: "countries-outline",
              type: "line",
              source: "world-data",
              paint: {
                "line-color": "#222",
                "line-width": 1.5,
                "line-opacity": 0.85,
                "line-dasharray": [2, 2],
              },
            },
            {
              id: "countries-sketch-accent",
              type: "line",
              source: "world-data",
              paint: {
                "line-color": "#555",
                "line-width": 0.7,
                "line-opacity": 0.3,
                "line-dasharray": [5, 3],
                "line-offset": 1,
              },
            },
          ],
        },
        center: [0, 0],
        zoom: initialZoom,
        projection: "globe",
        antialias: true,
      });

      map.on("load", () => {
        console.log("Mapa cargado correctamente");
        map.setProjection({ type: "globe" });
        setIsLoading(false);

        // Eliminar cualquier capa de marcador previa
        if (map.getLayer("destino-highlight")) {
          map.removeLayer("destino-highlight");
        }
        if (map.getSource("destino-highlight")) {
          map.removeSource("destino-highlight");
        }

        // Función para sombrear el país seleccionado usando turf.js
        const shadeCountry = (coords) => {
          fetch(
            "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_0_countries.geojson"
          )
            .then((res) => res.json())
            .then((geojson) => {
              const pt = turf.point(coords);
              let foundFeature = null;
              for (const f of geojson.features) {
                if (turf.booleanPointInPolygon(pt, f)) {
                  foundFeature = f;
                  break;
                }
              }
              if (foundFeature) {
                if (map.getLayer("destino-highlight"))
                  map.removeLayer("destino-highlight");
                if (map.getSource("destino-highlight"))
                  map.removeSource("destino-highlight");
                map.addSource("destino-highlight", {
                  type: "geojson",
                  data: foundFeature,
                });
                map.addLayer({
                  id: "destino-highlight",
                  type: "fill",
                  source: "destino-highlight",
                  paint: {
                    "fill-color": "#ee8a65",
                    "fill-opacity": 0.18,
                  },
                });
              }
            });
        };
        window.__shadeCountry = shadeCountry;
      });

      map.on("error", (e) => {
        console.error("Error del mapa:", e);
      });

      mapRef.current = map;
    } catch (error) {
      console.error("Error al crear el mapa:", error);
    }

    // Limpieza al desmontar el componente
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const handleFly = () => {
    const map = mapRef.current;
    if (!map) return;

    const currentCenter = map.getCenter();
    const newCenter = [currentCenter.lng, zoomIn ? 0 : 80];
    const delta = zoomIn ? zoomDelta : -zoomDelta;

    const adjustedZoom =
      map.getZoom() +
      delta +
      getZoomAdjustment(currentCenter.lat, newCenter[1]);

    map.flyTo({
      center: newCenter,
      zoom: adjustedZoom,
      essential: true,
    });

    setZoomIn(!zoomIn);
  };

  const handleFlyToDestino = (coords, nombre, id) => {
    const map = mapRef.current;
    if (!map) return;
    
    setSelectedDestino(id);
    
    const currentCenter = map.getCenter();
    const targetLat = coords[1];
    const zoomAdjustment = getZoomAdjustment(currentCenter.lat, targetLat);
    const targetZoom = 4 + zoomAdjustment;
    map.flyTo({
      center: coords,
      zoom: targetZoom,
      duration: 2000,
      essential: true,
      curve: 1.5,
    });
    // Sombrea el país
    if (window.__shadeCountry) window.__shadeCountry(coords);
    // Espera a que termine el vuelo y redirige
    const onMoveEnd = () => {
      map.off("moveend", onMoveEnd);
      // Redirige a la página de detalles usando el id real
      setTimeout(() => {
        window.location.href = `/destino/${id}`;
      }, 300);
    };
    map.on("moveend", onMoveEnd);
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        background: "#efece7",
      }}
    >
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm z-50 animate-in fade-in duration-300">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-secondary/30 border-t-secondary rounded-full animate-spin mx-auto" />
            <p className="text-sm text-muted-foreground font-medium">Cargando el mundo...</p>
          </div>
        </div>
      )}
      
      <div
        ref={mapContainer}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />
      
      {/* Destinos Sidebar - Desktop */}
      <div className="absolute right-6 top-24 bottom-6 w-64 hidden lg:flex flex-col gap-2 overflow-y-auto pointer-events-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pr-2">
        <div className="mb-2 px-3 py-2 bg-[#f4f1ea]/95 backdrop-blur-md rounded-xl border border-border/40 shadow-sm">
          <h2 className="text-sm font-semibold text-foreground">Destinos Disponibles</h2>
          <p className="text-xs text-muted-foreground">Haz clic para explorar</p>
        </div>
        {DESTINOS.map((dest) => (
          <button
            key={dest.id}
            onClick={() => handleFlyToDestino(dest.coords, dest.nombre, dest.id)}
            className={`flex items-center gap-3 p-3 backdrop-blur-lg rounded-xl transition-all group text-left border cursor-pointer hover:scale-[1.02] ${
              selectedDestino === dest.id
                ? 'bg-secondary/90 border-secondary shadow-lg'
                : 'bg-[#f4f1ea]/90 hover:bg-[#f4f1ea] border-border/40 shadow-sm hover:shadow-md'
            }`}
          >
            <div className="flex-1 min-w-0">
              <h3 className={`font-medium truncate transition-colors ${
                selectedDestino === dest.id
                  ? 'text-secondary-foreground'
                  : 'text-foreground'
              }`}>
                {dest.nombre}
              </h3>
            </div>
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              className={`flex-shrink-0 transition-transform group-hover:translate-x-1 ${
                selectedDestino === dest.id ? 'text-secondary-foreground' : 'text-muted-foreground'
              }`}
              fill="none"
            >
              <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ))}
      </div>
      
      {/* Destinos Bottom Bar - Mobile */}
      <div className="absolute bottom-6 left-6 right-6 lg:hidden flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {DESTINOS.map((dest) => (
          <button
            key={dest.id}
            onClick={() => handleFlyToDestino(dest.coords, dest.nombre, dest.id)}
            className={`flex-shrink-0 px-4 py-2 backdrop-blur-lg rounded-xl transition-all border ${
              selectedDestino === dest.id
                ? 'bg-secondary/90 border-secondary shadow-lg'
                : 'bg-[#f4f1ea]/90 hover:bg-[#f4f1ea] border-border/40 shadow-sm hover:shadow-md'
            }`}
          >
            <span className={`text-sm font-medium whitespace-nowrap ${
              selectedDestino === dest.id
                ? 'text-secondary-foreground'
                : 'text-foreground'
            }`}>
              {dest.nombre}
            </span>
          </button>
        ))}
      </div>
      
      {/* Button Pole/Equator */}
      <button
        onClick={handleFly}
        className="absolute bottom-6 right-6 lg:bottom-24 lg:right-6 w-12 h-12 rounded-full bg-secondary text-secondary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center group"
        title="Ir a polo o ecuador"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:rotate-90 transition-transform duration-300">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};

export default GlobeMap;
