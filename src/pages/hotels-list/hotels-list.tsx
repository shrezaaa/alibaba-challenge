import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { Hotel } from "../../types/hotel.model";
import Map from "../../components/map/map";
import HotelsErrorBoundary from "./errour-boundry";

const HotelsList: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchHotels = async () => {
    try {
      const response = await fetch("http://localhost:5000/hotels");
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      throw error; // Caught by the error boundary
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <HotelsErrorBoundary>
      <div className="w-full h-full flex" role="main">
        <div className="w-1/3 h-full flex flex-col bg-white shadow-lg">
          <header className="p-4 border-b " role="banner">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">Hotels List</h1>
              <button
                onClick={fetchHotels}
                className="p-2 rounded-full hover:bg-gray-200 flex items-center focus:ring-2 focus:ring-blue-500"
                aria-label="Refresh Hotels"
              >
                <FontAwesomeIcon icon={faSync} className="text-gray-700" />
              </button>
            </div>
            <div className="mt-2">
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search hotels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search Hotels"
              />
            </div>
          </header>

          <main className="grow overflow-auto p-4 " role="main">
            {filteredHotels.length > 0 ? (
              <ul className="space-y-4">
                {filteredHotels.map((hotel) => (
                  <li
                    key={hotel.id}
                    className="p-4 border rounded-lg shadow-sm bg-white hover:bg-gray-100 transition"
                    role="article"
                  >
                    <Link
                      to={`/hotels/${hotel.id}`}
                      className="block focus:ring-2 focus:ring-blue-500"
                      aria-label={`View details of ${hotel.name}`}
                    >
                      <article>
                        <h2 className="text-xl font-bold">{hotel.name}</h2>
                        <p className="text-gray-700">{hotel.description}</p>
                        <p className="text-gray-500">
                          📍 {hotel.location.lat}, {hotel.location.long}
                        </p>
                        <p className="text-yellow-500">
                          ⭐ {hotel.stars} Stars
                        </p>
                        <p className="text-green-600 font-semibold">
                          💰 ${hotel.pricePerNight} / Night
                        </p>
                      </article>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">No hotels found.</p>
            )}
          </main>
        </div>

        <div className="w-2/3 h-full">
          <Map hotels={filteredHotels} height="100%" width="100%" />
        </div>
      </div>
    </HotelsErrorBoundary>
  );
};

export default HotelsList;
