export interface Hotel {
  id: number;
  name: string;
  description: string;
  location: {
    long: number;
    lat: number;
  };
  stars: number;
  pricePerNight: number;
}
