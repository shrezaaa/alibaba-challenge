export interface LatLngExp {
  lat: number;
  long: number;
}

export interface Location extends LatLngExp {
  id: number;
  name: string;
}
