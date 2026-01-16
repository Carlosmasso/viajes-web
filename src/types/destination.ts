export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  coordinates: [number, number]; // [lng, lat]
  image: string;
  highlights: string[];
  bestTime: string;
  price: string;
}
