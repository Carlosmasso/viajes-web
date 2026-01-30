import dest1 from '../assets/destinations/dest1.jpg';
import dest2 from '../assets/destinations/dest2.jpg';
import dest3 from '../assets/destinations/dest3.jpg';
import dest4 from '../assets/destinations/dest4.jpg';
import dest5 from '../assets/destinations/dest5.jpg';
import dest6 from '../assets/destinations/dest6.jpg';

export const destinations = [
  {
    id: 'paris',
    name: 'París',
    country: 'Francia',
    description: 'La ciudad del amor y las luces, hogar de la Torre Eiffel y el Louvre.',
    coordinates: [2.3522, 48.8566],
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&q=90',
    images: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&q=90',
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=1920&q=90',
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1920&q=90',
      'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=1920&q=90'
    ],
    highlights: ['Torre Eiffel', 'Museo del Louvre', 'Catedral de Notre-Dame', 'Arco del Triunfo'],
    bestTime: 'Abril - Junio, Septiembre - Octubre',
    price: 'Desde €1,200',
    bgImage: dest1
  },
  {
    id: 'tokyo',
    name: 'Tokio',
    country: 'Japón',
    description: 'Metrópolis vibrante que combina tradición milenaria con tecnología de vanguardia.',
    coordinates: [139.6917, 35.6895],
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&q=90',
    images: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&q=90',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1920&q=90',
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1920&q=90',
      'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=1920&q=90'
    ],
    highlights: ['Monte Fuji', 'Templo Senso-ji', 'Shibuya Crossing', 'Palacio Imperial'],
    bestTime: 'Marzo - Mayo, Septiembre - Noviembre',
    price: 'Desde €1,800',
    bgImage: dest2
  },
  {
    id: 'new-york',
    name: 'Nueva York',
    country: 'Estados Unidos',
    description: 'La ciudad que nunca duerme, epicentro de cultura, arte y negocios.',
    coordinates: [-74.0060, 40.7128],
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1920&q=90',
    images: [
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1920&q=90',
      'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=1920&q=90',
      'https://images.unsplash.com/photo-1519223400710-6da9e1b4d5ad?w=1920&q=90',
      'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1920&q=90'
    ],
    highlights: ['Estatua de la Libertad', 'Central Park', 'Times Square', 'Empire State'],
    bestTime: 'Abril - Junio, Septiembre - Noviembre',
    price: 'Desde €1,500',
    bgImage: dest3
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    description: 'Paraíso tropical con playas de ensueño, templos sagrados y arrozales en terrazas.',
    coordinates: [115.1889, -8.4095],
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=90',
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=90',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1920&q=90',
      'https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=1920&q=90',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=90'
    ],
    highlights: ['Templo Tanah Lot', 'Ubud', 'Playas de Seminyak', 'Terrazas de Tegalalang'],
    bestTime: 'Mayo - Septiembre',
    price: 'Desde €900',
    bgImage: dest4
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'España',
    description: 'Ciudad mediterránea con arquitectura modernista única y vibrante vida cultural.',
    coordinates: [2.1734, 41.3851],
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1920&q=90',
    images: [
      'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1920&q=90',
      'https://images.unsplash.com/photo-1562883676-8c7feb83f09b?w=1920&q=90',
      'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=1920&q=90',
      'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=1920&q=90',
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1920&q=90',
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1920&q=90',
      'https://images.unsplash.com/photo-1579282240050-352db0a14c21?w=1920&q=90',
      'https://images.unsplash.com/photo-1464790719320-516ecd75af6c?w=1920&q=90'
    ],
    highlights: ['Sagrada Familia', 'Park Güell', 'Las Ramblas', 'Casa Batlló'],
    bestTime: 'Mayo - Junio, Septiembre - Octubre',
    price: 'Desde €800',
    bgImage: dest5
  },
  {
    id: 'dubai',
    name: 'Dubái',
    country: 'Emiratos Árabes Unidos',
    description: 'Ciudad futurista en el desierto, con lujo y arquitectura impresionante.',
    coordinates: [55.2708, 25.2048],
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=90',
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=90',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1920&q=90',
      'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=1920&q=90',
      'https://images.unsplash.com/photo-1546412414-e1885259563a?w=1920&q=90',
      'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=1920&q=90',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=90',
      'https://images.unsplash.com/photo-1589330694653-e0b8b5f8b9e5?w=1920&q=90',
      'https://images.unsplash.com/photo-1570454228927-4a86bd4b8c39?w=1920&q=90'
    ],
    highlights: ['Burj Khalifa', 'Palm Jumeirah', 'Dubai Mall', 'Desert Safari'],
    bestTime: 'Noviembre - Marzo',
    price: 'Desde €1,600',
    bgImage: dest6
  },
];
