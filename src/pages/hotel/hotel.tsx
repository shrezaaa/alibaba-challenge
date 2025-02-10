import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Hotel } from "../../types/hotel.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSync } from "@fortawesome/free-solid-svg-icons";
import Map from "../../components/map/map";
import HotelErrorBoundary from "./error-boundry";

const HotelPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchHotel = async () => {
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/hotels/${Number(id)}`
      );
      if (!response.ok) {
        throw new Error("Hotel not found");
      }
      const data = await response.json();
      setHotel(data);
    } catch (error) {
      setError("Hotel not found. Please check the ID or go back.");
      console.error("Error fetching hotel:", error);
    }
  };

  useEffect(() => {
    fetchHotel();
  }, [id]);

  if (error) {
    throw new Error(error);
  }

  if (!hotel) {
    return <div className="text-center text-gray-500">Loading hotel...</div>;
  }

  return (
    <HotelErrorBoundary>
      <div className="w-full h-full flex flex-wrap p-2">
        <div className="w-full h-full bg-white bg-gradient-to-r rounded-sm shadow-md flex flex-col">
          <section className="w-full p-1">
            <div className="flex w-full justify-between min-h-10">
              <div className="self-center">
                <Link
                  to="/hotels"
                  className="p-2 rounded-full hover:bg-gray-200 flex items-center"
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="text-gray-700"
                  />
                </Link>
              </div>
              <h1 className="self-center ps-2 text-xl font-semibold">
                {hotel.name}
              </h1>
              <div className="flex items-center min-w-full md:min-w-0 md:grow justify-end">
                <button
                  onClick={fetchHotel}
                  className="p-2 rounded-full hover:bg-gray-200 flex items-center"
                >
                  <FontAwesomeIcon icon={faSync} className="text-gray-700" />
                </button>
              </div>
            </div>
            <hr />
          </section>
          <section className="grow p-2">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-3xl font-bold">{hotel.name}</h1>
              <p className="text-gray-700 mt-2">{hotel.description}</p>
              <p className="text-gray-500 mt-1">
                Location: ({hotel.location.lat}, {hotel.location.long})
              </p>
              <p className="text-yellow-500 mt-1">⭐ {hotel.stars} Stars</p>
              <p className="text-green-600 font-semibold mt-2">
                Price per Night: ${hotel.pricePerNight}
              </p>

              <div className="lg:flex">
                <Map hotels={[hotel]} />
              </div>

              <Link
                to="/hotels"
                className="text-blue-600 mt-4 inline-flex items-center hover:underline hover:font-medium"
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="text-gray-700 mr-2"
                />
                Back to Hotels
              </Link>
            </div>
          </section>
        </div>
      </div>
    </HotelErrorBoundary>
  );
};

export default HotelPage;
