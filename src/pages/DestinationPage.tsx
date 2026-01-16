import { useParams, useNavigate } from 'react-router-dom';
import { destinations } from '@/data/destinations';
import { MapPin, Calendar, DollarSign, Star, Plane, Hotel, Camera, Users } from 'lucide-react';
import { Header } from '@/components/Header';

export function DestinationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const destination = destinations.find(d => d.id === id);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">Destino no encontrado</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-primary" />
              <span className="text-xl text-primary">{destination.country}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-secondary mb-4">
              {destination.name}
            </h1>
            <p className="text-xl text-muted-foreground text-secondary max-w-2xl">
              {destination.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card backdrop-blur-md rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-accent rounded-xl">
                <Calendar className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mejor época</p>
                <p className="text-lg font-semibold text-foreground">{destination.bestTime}</p>
              </div>
            </div>
          </div>

          <div className="bg-card backdrop-blur-md rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-accent rounded-xl">
                <DollarSign className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Precio</p>
                <p className="text-lg font-semibold text-foreground">{destination.price}</p>
              </div>
            </div>
          </div>

          <div className="bg-card backdrop-blur-md rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-accent rounded-xl">
                <Star className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valoración</p>
                <p className="text-lg font-semibold text-foreground">4.8 / 5.0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights Section */}
        <div className="bg-card backdrop-blur-md rounded-2xl p-8 border border-border">
          <h2 className="text-3xl font-bold text-foreground mb-6">Lugares Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {destination.highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-muted rounded-xl border border-border hover:border-primary transition-colors group"
              >
                <div className="p-2 bg-accent rounded-lg group-hover:bg-accent/80 transition-colors">
                  <Camera className="w-5 h-5 text-accent-foreground" />
                </div>
                <span className="text-lg text-foreground font-medium">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What's Included Section */}
        <div className="bg-card backdrop-blur-md rounded-2xl p-8 border border-border">
          <h2 className="text-3xl font-bold text-foreground mb-6">¿Qué incluye?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent rounded-xl">
                <Plane className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Vuelos</h3>
                <p className="text-muted-foreground">Vuelos de ida y vuelta desde principales ciudades de España</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent rounded-xl">
                <Hotel className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Alojamiento</h3>
                <p className="text-muted-foreground">Hotel 4 estrellas con desayuno incluido</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent rounded-xl">
                <Users className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Guía turístico</h3>
                <p className="text-muted-foreground">Guía local en español para tours principales</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent rounded-xl">
                <Camera className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Actividades</h3>
                <p className="text-muted-foreground">Tours y excursiones a lugares emblemáticos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Itinerary Section */}
        <div className="bg-card backdrop-blur-md rounded-2xl p-8 border border-border">
          <h2 className="text-3xl font-bold text-foreground mb-6">Itinerario Sugerido</h2>
          <div className="space-y-6">
            {[
              { day: 1, title: 'Llegada y bienvenida', description: 'Recogida en el aeropuerto, check-in en el hotel y tour panorámico de la ciudad.' },
              { day: 2, title: 'Lugares emblemáticos', description: 'Visita a los principales monumentos y atracciones turísticas.' },
              { day: 3, title: 'Experiencia cultural', description: 'Inmersión en la cultura local, gastronomía y tradiciones.' },
              { day: 4, title: 'Día libre', description: 'Explora a tu ritmo o únete a actividades opcionales.' },
              { day: 5, title: 'Despedida', description: 'Últimas compras y traslado al aeropuerto.' }
            ].map((item) => (
              <div key={item.day} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg group-hover:scale-110 transition-transform">
                    {item.day}
                  </div>
                  {item.day < 5 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Día {item.day}: {item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            ¿Listo para la aventura?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Reserva ahora y vive una experiencia inolvidable en {destination.name}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-card text-card-foreground font-semibold rounded-xl hover:bg-card/90 transition-colors shadow-xl">
              Reservar ahora
            </button>
            <button className="px-8 py-4 bg-card/20 backdrop-blur-md text-primary-foreground font-semibold rounded-xl hover:bg-card/30 transition-colors border border-card/30">
              Más información
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
