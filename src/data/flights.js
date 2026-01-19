export const flights = [
  // Vuelos a París
  {
    id: 1,
    destinationId: 'paris',
    airline: 'Iberia',
    departure: '10:00',
    arrival: '12:30',
    price: 180,
    availableSeats: 12,
    duration: '2h 30m',
    stops: 'Directo'
  },
  {
    id: 2,
    destinationId: 'paris',
    airline: 'Air France',
    departure: '15:45',
    arrival: '18:15',
    price: 220,
    availableSeats: 5,
    duration: '2h 30m',
    stops: 'Directo'
  },
  {
    id: 3,
    destinationId: 'paris',
    airline: 'Vueling',
    departure: '08:30',
    arrival: '11:00',
    price: 150,
    availableSeats: 8,
    duration: '2h 30m',
    stops: 'Directo'
  },
  {
    id: 4,
    destinationId: 'paris',
    airline: 'Ryanair',
    departure: '18:00',
    arrival: '20:30',
    price: 99,
    availableSeats: 2,
    duration: '2h 30m',
    stops: 'Directo'
  },

  // Vuelos a Tokio
  {
    id: 5,
    destinationId: 'tokyo',
    airline: 'Iberia',
    departure: '22:00',
    arrival: '18:30+1',
    price: 850,
    availableSeats: 15,
    duration: '14h 30m',
    stops: '1 escala'
  },
  {
    id: 6,
    destinationId: 'tokyo',
    airline: 'Japan Airlines',
    departure: '12:30',
    arrival: '09:00+1',
    price: 920,
    availableSeats: 8,
    duration: '14h 30m',
    stops: 'Directo'
  },
  {
    id: 7,
    destinationId: 'tokyo',
    airline: 'Air France',
    departure: '10:00',
    arrival: '06:30+1',
    price: 880,
    availableSeats: 6,
    duration: '14h 30m',
    stops: '1 escala'
  },
  {
    id: 8,
    destinationId: 'tokyo',
    airline: 'Turkish Airlines',
    departure: '16:45',
    arrival: '13:15+1',
    price: 750,
    availableSeats: 3,
    duration: '14h 30m',
    stops: '1 escala'
  },

  // Vuelos a Nueva York
  {
    id: 9,
    destinationId: 'new-york',
    airline: 'Iberia',
    departure: '11:00',
    arrival: '14:30',
    price: 450,
    availableSeats: 12,
    duration: '8h 30m',
    stops: 'Directo'
  },
  {
    id: 10,
    destinationId: 'new-york',
    airline: 'American Airlines',
    departure: '15:45',
    arrival: '19:15',
    price: 480,
    availableSeats: 5,
    duration: '8h 30m',
    stops: 'Directo'
  },
  {
    id: 11,
    destinationId: 'new-york',
    airline: 'Air Europa',
    departure: '09:30',
    arrival: '13:00',
    price: 420,
    availableSeats: 8,
    duration: '8h 30m',
    stops: 'Directo'
  },
  {
    id: 12,
    destinationId: 'new-york',
    airline: 'LEVEL',
    departure: '18:00',
    arrival: '21:30',
    price: 380,
    availableSeats: 2,
    duration: '8h 30m',
    stops: 'Directo'
  },

  // Vuelos a Bali
  {
    id: 13,
    destinationId: 'bali',
    airline: 'Qatar Airways',
    departure: '08:00',
    arrival: '10:30+1',
    price: 680,
    availableSeats: 10,
    duration: '18h 30m',
    stops: '1 escala'
  },
  {
    id: 14,
    destinationId: 'bali',
    airline: 'Emirates',
    departure: '14:30',
    arrival: '17:00+1',
    price: 720,
    availableSeats: 7,
    duration: '18h 30m',
    stops: '1 escala'
  },
  {
    id: 15,
    destinationId: 'bali',
    airline: 'Turkish Airlines',
    departure: '22:00',
    arrival: '00:30+2',
    price: 650,
    availableSeats: 4,
    duration: '18h 30m',
    stops: '1 escala'
  },
  {
    id: 16,
    destinationId: 'bali',
    airline: 'KLM',
    departure: '10:15',
    arrival: '12:45+1',
    price: 590,
    availableSeats: 3,
    duration: '18h 30m',
    stops: '2 escalas'
  },

  // Vuelos a Barcelona
  {
    id: 17,
    destinationId: 'barcelona',
    airline: 'Iberia',
    departure: '09:00',
    arrival: '10:30',
    price: 80,
    availableSeats: 20,
    duration: '1h 30m',
    stops: 'Directo'
  },
  {
    id: 18,
    destinationId: 'barcelona',
    airline: 'Vueling',
    departure: '12:45',
    arrival: '14:15',
    price: 65,
    availableSeats: 15,
    duration: '1h 30m',
    stops: 'Directo'
  },
  {
    id: 19,
    destinationId: 'barcelona',
    airline: 'Air Europa',
    departure: '16:30',
    arrival: '18:00',
    price: 75,
    availableSeats: 10,
    duration: '1h 30m',
    stops: 'Directo'
  },
  {
    id: 20,
    destinationId: 'barcelona',
    airline: 'Ryanair',
    departure: '19:00',
    arrival: '20:30',
    price: 45,
    availableSeats: 5,
    duration: '1h 30m',
    stops: 'Directo'
  },

  // Vuelos a Dubái
  {
    id: 21,
    destinationId: 'dubai',
    airline: 'Emirates',
    departure: '23:00',
    arrival: '08:30+1',
    price: 520,
    availableSeats: 12,
    duration: '7h 30m',
    stops: 'Directo'
  },
  {
    id: 22,
    destinationId: 'dubai',
    airline: 'Etihad Airways',
    departure: '14:30',
    arrival: '00:00+1',
    price: 550,
    availableSeats: 8,
    duration: '7h 30m',
    stops: 'Directo'
  },
  {
    id: 23,
    destinationId: 'dubai',
    airline: 'Qatar Airways',
    departure: '10:00',
    arrival: '19:30',
    price: 480,
    availableSeats: 6,
    duration: '7h 30m',
    stops: '1 escala'
  },
  {
    id: 24,
    destinationId: 'dubai',
    airline: 'Turkish Airlines',
    departure: '06:00',
    arrival: '15:30',
    price: 450,
    availableSeats: 4,
    duration: '7h 30m',
    stops: '1 escala'
  },

  // Vuelos a Sídney
  {
    id: 25,
    destinationId: 'sydney',
    airline: 'Emirates',
    departure: '22:00',
    arrival: '20:00+1',
    price: 1100,
    availableSeats: 10,
    duration: '22h',
    stops: '1 escala'
  },
  {
    id: 26,
    destinationId: 'sydney',
    airline: 'Qantas',
    departure: '10:00',
    arrival: '08:00+1',
    price: 1250,
    availableSeats: 5,
    duration: '22h',
    stops: '1 escala'
  },
  {
    id: 27,
    destinationId: 'sydney',
    airline: 'Singapore Airlines',
    departure: '14:30',
    arrival: '12:30+1',
    price: 1180,
    availableSeats: 7,
    duration: '22h',
    stops: '1 escala'
  },
  {
    id: 28,
    destinationId: 'sydney',
    airline: 'Qatar Airways',
    departure: '18:00',
    arrival: '16:00+1',
    price: 980,
    availableSeats: 3,
    duration: '22h',
    stops: '2 escalas'
  },

  // Vuelos a Machu Picchu (vía Lima)
  {
    id: 29,
    destinationId: 'machu-picchu',
    airline: 'Iberia',
    departure: '23:30',
    arrival: '10:15+1',
    price: 650,
    availableSeats: 8,
    duration: '14h 45m',
    stops: 'Directo a Lima'
  },
  {
    id: 30,
    destinationId: 'machu-picchu',
    airline: 'Air Europa',
    departure: '12:00',
    arrival: '22:45',
    price: 680,
    availableSeats: 6,
    duration: '14h 45m',
    stops: 'Directo a Lima'
  },
  {
    id: 31,
    destinationId: 'machu-picchu',
    airline: 'LATAM',
    departure: '16:30',
    arrival: '03:15+1',
    price: 720,
    availableSeats: 10,
    duration: '14h 45m',
    stops: 'Directo a Lima'
  },
  {
    id: 32,
    destinationId: 'machu-picchu',
    airline: 'KLM',
    departure: '09:00',
    arrival: '19:45',
    price: 590,
    availableSeats: 4,
    duration: '14h 45m',
    stops: '1 escala'
  }
];
