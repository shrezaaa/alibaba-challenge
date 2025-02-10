type LatLng = { lat: number; long: number };

export function calculateCenter(points: LatLng[]): LatLng {
  if (points.length === 0) {
    throw new Error("No points provided to calculate the center.");
  }

  const total = points.reduce(
    (acc, point) => {
      return {
        lat: acc.lat + point.lat,
        long: acc.long + point.long,
      };
    },
    { lat: 0, long: 0 }
  );

  return {
    lat: total.lat / points.length,
    long: total.long / points.length,
  };
}
