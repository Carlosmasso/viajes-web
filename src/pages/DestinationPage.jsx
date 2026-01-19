import { useParams, useNavigate } from 'react-router-dom';
import { destinations } from '@/data/destinations';
import { flights as allFlights } from '@/data/flights';
import { MapPin, Calendar, DollarSign, Star, Plane, Hotel, Camera, Users, Clock } from 'lucide-react';
import { Header } from '@/components/Header';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export function DestinationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const destination = destinations.find(d => d.id === id);

  // Obtener vuelos dinámicos para este destino
  const destinationFlights = id ? allFlights.filter(f => f.destinationId === id) : [];

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

        {/* Tabs */}
        <Tabs defaultValue="info">
          <TabsList>
            <TabsTrigger value="info">Información del Viaje</TabsTrigger>
            <TabsTrigger value="flights">Vuelos Disponibles</TabsTrigger>
          </TabsList>

          {/* Tab Content - Info */}
          <TabsContent value="info" className="space-y-12 mt-8">
            {/* Is This Trip For Me Section */}
            <div className="bg-card backdrop-blur-md rounded-2xl p-8 border border-border">
              <h2 className="text-3xl font-bold text-foreground mb-6">¿Es este viaje para mí?</h2>
              
              {/* Trip Attributes with Rating Dots */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Relax */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/30 rounded-lg">
                    <Hotel className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground mb-1">Relax</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <div
                          key={dot}
                          className={`w-2 h-2 rounded-full ${
                            dot <= 3 ? 'bg-primary' : 'bg-border'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* City & Culture */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/30 rounded-lg">
                    <Camera className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground mb-1">City & Culture</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <div
                          key={dot}
                          className={`w-2 h-2 rounded-full ${
                            dot <= 5 ? 'bg-primary' : 'bg-border'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Nature & Adventure */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/30 rounded-lg">
                    <MapPin className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground mb-1">Nature & Adventure</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <div
                          key={dot}
                          className={`w-2 h-2 rounded-full ${
                            dot <= 2 ? 'bg-primary' : 'bg-border'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Party */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/30 rounded-lg">
                    <Users className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground mb-1">Party</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <div
                          key={dot}
                          className={`w-2 h-2 rounded-full ${
                            dot <= 3 ? 'bg-primary' : 'bg-border'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Food & Wine */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/30 rounded-lg">
                    <Star className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground mb-1">Food & Wine</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <div
                          key={dot}
                          className={`w-2 h-2 rounded-full ${
                            dot <= 4 ? 'bg-primary' : 'bg-border'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Active */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/30 rounded-lg">
                    <Plane className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground mb-1">Active</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <div
                          key={dot}
                          className={`w-2 h-2 rounded-full ${
                            dot <= 3 ? 'bg-primary' : 'bg-border'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-accent/20 rounded-xl border border-accent">
                <p className="text-foreground text-sm">
                  <span className="font-semibold">💡 Consejo:</span> Este viaje es perfecto si buscas sumergirte en una nueva cultura, 
                  hacer amigos de todo el mundo y crear recuerdos inolvidables sin preocuparte por la planificación.
                </p>
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
          </TabsContent>

          {/* Tab Content - Flights */}
          <TabsContent value="flights" className="space-y-6 mt-8">
            <div className="bg-card backdrop-blur-md rounded-2xl p-8 border border-border">
              <h2 className="text-3xl font-bold text-foreground mb-6">Vuelos Disponibles</h2>
              <p className="text-muted-foreground mb-8">
                Encuentra el vuelo perfecto para tu viaje. Los precios incluyen ida y vuelta desde Madrid.
              </p>

              <div className="space-y-4">
                {destinationFlights.map((flight) => (
                  <div
                    key={flight.id}
                    className="bg-muted rounded-xl p-6 border border-border hover:border-primary transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      {/* Flight Info */}
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-accent rounded-xl">
                            <Plane className="w-6 h-6 text-accent-foreground" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-foreground">{flight.airline}</h3>
                            <p className="text-sm text-muted-foreground">{flight.stops}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-8">
                          <div>
                            <p className="text-sm text-muted-foreground">Salida</p>
                            <p className="text-2xl font-bold text-foreground">{flight.departure}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-1">
                            <div className="h-px bg-border flex-1" />
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm">{flight.duration}</span>
                            </div>
                            <div className="h-px bg-border flex-1" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Llegada</p>
                            <p className="text-2xl font-bold text-foreground">{flight.arrival}</p>
                          </div>
                        </div>
                      </div>

                      {/* Price and Availability */}
                      <div className="flex flex-col items-end gap-4 md:min-w-[200px]">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Desde</p>
                          <p className="text-3xl font-bold text-primary">{flight.price}€</p>
                          <p className="text-xs text-muted-foreground">por persona</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-semibold ${
                            flight.availableSeats <= 5 ? 'text-red-500' : 'text-green-500'
                          }`}>
                            {flight.availableSeats} plazas disponibles
                          </p>
                        </div>
                        <button className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors w-full">
                          Seleccionar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

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
