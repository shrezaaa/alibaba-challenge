import { useState, useEffect } from "react";
import { Hotel } from "../types/hotel.model";

interface HotelPageState {
  hotel: Hotel | null;
  error: string | null;
}

const useFetchHotel = (id: string | undefined): HotelPageState => {
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchHotel = async (): Promise<void> => {
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/hotels/${Number(id)}`
      );
      if (!response.ok) {
        throw new Error("Hotel not found");
      }
      const data: Hotel = await response.json();
      setHotel(data);
    } catch (error) {
      setError("Hotel not found. Please check the ID or go back.");
      console.error("Error fetching hotel:", error);
    }
  };

  useEffect(() => {
    fetchHotel();
  }, [id]);

  return { hotel, error };
};

export default useFetchHotel;
