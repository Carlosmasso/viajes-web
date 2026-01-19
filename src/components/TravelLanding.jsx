import { destinations } from '@/data/destinations';
import { Plane } from 'lucide-react';
import { useRef, useState } from 'react';
import { DestinationModal } from '@/components/DestinationModal';
import { MapboxGlobe } from './MapboxGlobe';
import { Header } from './Header';

export function TravelLanding() {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const globeRef = useRef(null);

  const handleDestinationSelect = (destination) => {
    // Fly to destination first
    globeRef.current?.flyToDestination(destination);
    
    // Show modal after flight animation
    setTimeout(() => {
      setSelectedDestination(destination);
    }, 2200);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      <Header />

      {/* Main Content */}
      <div className="relative w-full h-full">
        {/* Globe */}
        <MapboxGlobe 
          ref={globeRef}
          destinations={destinations} 
          onDestinationClick={setSelectedDestination}
        />

        {/* Center overlay with instructions */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center space-y-6 max-w-2xl px-4">
            <h2 className="text-4xl font-semibold text-white">
              Descubre el Mundo
            </h2>
            <p className="text-base text-white/80">
              Haz clic en cualquier destino para comenzar tu aventura
            </p>
            <div className="flex flex-wrap gap-2 justify-center pt-4">
              {destinations.slice(0, 4).map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => handleDestinationSelect(dest)}
                  className="cursor-pointer px-4 py-2 bg-secondary text-secondary-foreground backdrop-blur-sm rounded-lg hover:bg-secondary/90 transition-all hover:scale-105 pointer-events-auto text-sm font-medium shadow-sm"
                >
                  {dest.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Destination cards sidebar */}
        <div className="absolute right-6 top-24 bottom-6 w-80 hidden lg:flex flex-col gap-3 overflow-y-auto pointer-events-auto">
          {destinations.map((dest) => (
            <button
              key={dest.id}
              onClick={() => handleDestinationSelect(dest)}
              className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all group text-left border border-white/20 cursor-pointer"
            >
              <img 
                src={dest.image} 
                alt={dest.name} 
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white group-hover:text-white/80 transition-colors truncate">
                  {dest.name}
                </h3>
                <p className="text-sm text-white/70 truncate">{dest.country}</p>
                <p className="text-xs text-white/60">{dest.price}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <DestinationModal 
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />
    </div>
  );
}
