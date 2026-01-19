import { X, MapPin, Calendar, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function DestinationModal({ destination, onClose }) {
  const navigate = useNavigate();

  if (!destination) return null;

  const handleViewMore = () => {
    navigate(`/destino/${destination.id}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-card rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-4xl font-bold mb-2">{destination.name}</h2>
            <div className="flex items-center gap-2 text-lg">
              <MapPin className="w-5 h-5" />
              <span>{destination.country}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <p className="text-card-foreground text-lg leading-relaxed">
            {destination.description}
          </p>

          {/* Highlights */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-card-foreground">Lugares destacados</h3>
            <div className="grid grid-cols-2 gap-2">
              {destination.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 bg-accent/20 rounded-lg text-accent-foreground"
                >
                  <div className="w-1.5 h-1.5 bg-accent-foreground rounded-full" />
                  <span className="text-sm font-medium">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-accent/20 rounded-lg">
                <Calendar className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mejor época</p>
                <p className="font-semibold text-card-foreground">{destination.bestTime}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-accent/20 rounded-lg">
                <DollarSign className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Precio</p>
                <p className="font-semibold text-card-foreground">{destination.price}</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={handleViewMore}
              className="flex-1 py-3 bg-card border-2 border-primary text-primary font-semibold rounded-xl transition-all shadow-lg hover:bg-primary/20"
            >
              Ver más detalles
            </button>
            {/* <button className="flex-1 py-3 bg-primary text-primary-foreground font-semibold rounded-xl transition-all shadow-lg hover:bg-primary/90">
              Reservar ahora
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
