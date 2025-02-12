import { useState, useEffect } from "react";
import { Hotel } from "../types/hotel.model";

interface UseFetchHotelsResponse {
  hotels: Hotel[];
  loading: boolean;
  error: string | null;
  fetchHotels: () => void;
}

const useFetchHotelsList = (): UseFetchHotelsResponse => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHotels = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/hotels");
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data: Hotel[] = await response.json();
      setHotels(data);
    } catch (error) {
      setError(`Error fetching hotels: ${error instanceof Error ? error.message : error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return { hotels, loading, error, fetchHotels };
};

export default useFetchHotelsList;
