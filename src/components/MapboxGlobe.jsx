import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import Globe from 'globe.gl';

export const MapboxGlobe = forwardRef(({ destinations, onDestinationClick }, ref) => {
  const globeEl = useRef(null);
  const globeInstance = useRef(null);

  // Expose flyToDestination method to parent
  useImperativeHandle(ref, () => ({
    flyToDestination: (destination) => {
      if (globeInstance.current) {
        globeInstance.current.pointOfView(
          {
            lat: destination.coordinates[1],
            lng: destination.coordinates[0],
            altitude: 0.5
          },
          2000
        );
      }
    }
  }));

  useEffect(() => {
    if (!globeEl.current || globeInstance.current) return;

    // Initialize globe
    const globe = new Globe(globeEl.current)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .pointOfView({ lat: 20, lng: 0, altitude: 2.5 })
      .showAtmosphere(true)
      .atmosphereColor('#3a5686')
      .atmosphereAltitude(0.25);

    // Auto-rotate
    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enableZoom = true;

    // Add points for destinations
    const pointsData = destinations.map(dest => ({
      lat: dest.coordinates[1],
      lng: dest.coordinates[0],
      size: 0.5,
      color: '#667eea',
      destination: dest
    }));

    globe
      .pointsData(pointsData)
      .pointAltitude(0.01)
      .pointRadius('size')
      .pointColor('color')
      .pointLabel((d) => `
        <div style="background: white; padding: 8px 12px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
          <div style="color: black; font-weight: bold; font-size: 14px; margin-bottom: 4px;">${d.destination.name}</div>
          <div style="color: #666; font-size: 12px;">${d.destination.country}</div>
        </div>
      `)
      .onPointClick((point) => {
        const dest = point.destination;
        // Fly to destination
        globe.pointOfView(
          {
            lat: dest.coordinates[1],
            lng: dest.coordinates[0],
            altitude: 0.5
          },
          2000
        );
        
        // Show modal after animation
        setTimeout(() => {
          onDestinationClick(dest);
        }, 2200);
      });

    globeInstance.current = globe;

    // Cleanup
    return () => {
      if (globeInstance.current) {
        globeInstance.current._destructor();
        globeInstance.current = null;
      }
    };
  }, [destinations, onDestinationClick]);

  return (
    <div className="relative w-full h-screen">
      <div ref={globeEl} className="absolute inset-0" />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/40" />
    </div>
  );
});

MapboxGlobe.displayName = 'MapboxGlobe';
