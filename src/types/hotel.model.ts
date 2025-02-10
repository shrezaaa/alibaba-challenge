import { LatLngExp } from "./location.model";

export interface Hotel {
  id: number;
  name: string;
  description: string;
  location: LatLngExp;
  stars: number;
  pricePerNight: number;
}
