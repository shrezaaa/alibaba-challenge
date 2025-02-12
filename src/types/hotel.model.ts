import { LatLngExp } from "./location.model";

export interface Facility {
  id: number;
  name: string;
  icon: string;
}

export interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
}

export interface Hotel {
  id: number;
  name: string;
  description: string;
  location: LatLngExp;
  stars: number;
  pricePerNight: number;
  facilities: Facility[];
  reviews: Review[];
}
