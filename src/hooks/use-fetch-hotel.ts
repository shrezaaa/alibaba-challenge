import { useState, useEffect, useCallback } from "react";
import { Hotel } from "../types/hotel.model";

interface HotelPageState {
  hotel: Hotel | null;
  error: string | null;
  fetchHotel: () => void;
}

const useFetchHotel = (id: string | undefined): HotelPageState => {
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchHotel = useCallback(async (): Promise<void> => {
    if (!id) return;
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/hotels/${Number(id)}`
      );
      if (!response.ok) {
        throw new Error("Hotel not found");
      }
      const data: Hotel = await response.json();
      setHotel(data);
    } catch (err) {
      setError("Hotel not found. Please check the ID or go back.");
      console.error("Error fetching hotel:", err);
    }
  }, [id]);

  useEffect(() => {
    fetchHotel();
  }, [fetchHotel]);

  return { hotel, error, fetchHotel };
};

export default useFetchHotel;
