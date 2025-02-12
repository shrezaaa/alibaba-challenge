import React, { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import Map from "../../components/map/map";
import HotelsErrorBoundary from "./error-boundry";
import { Hotel } from "../../types/hotel.model";
import useFetchHotelsList from "../../hooks/use-fetch-hotels-list";

const HotelListItem = React.memo(({ hotel }: { hotel: Hotel }) => {
  return (
    <li
      key={hotel.id}
      className="p-4 border rounded-lg shadow-sm bg-white hover:bg-gray-100 transition"
      role="article"
    >
      <Link
        to={`/hotels/${hotel.id}`}
        className="block cursor-pointer"
        aria-label={`View details of ${hotel.name}`}
      >
        <article>
          <h2 data-testid="hotel-name" className="text-xl font-bold">
            {hotel.name}
          </h2>
          <p className="text-gray-700">{hotel.description}</p>
          <p className="text-gray-500">
            📍 {hotel.location.lat}, {hotel.location.long}
          </p>
          <p className="text-yellow-500">⭐ {hotel.stars} Stars</p>
          <p className="text-green-600 font-semibold">
            💰 ${hotel.pricePerNight} / Night
          </p>
        </article>
      </Link>
    </li>
  );
});

const HotelsList: React.FC = () => {
  const { hotels, loading, error, fetchHotels } = useFetchHotelsList();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHotels = useMemo(() => {
    return hotels.filter(
      (hotel: Hotel) =>
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [hotels, searchQuery]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  return (
    <HotelsErrorBoundary>
      <div className="w-full h-full flex" role="main">
        <div className="w-1/3 h-full flex flex-col bg-white shadow-lg">
          <header className="p-4 border-b " role="banner">
            <div className="flex justify-between items-center">
              <h1 data-testid="hotel-title" className="text-xl font-semibold">
                Hotels List
              </h1>
              <button
                onClick={fetchHotels}
                className="p-2 rounded-full hover:bg-gray-200 flex items-center"
                aria-label="Refresh Hotels"
              >
                <FontAwesomeIcon icon={faSync} className="text-gray-700" />
              </button>
            </div>
            <div className="mt-2">
              <input
                data-testid="search-input"
                type="text"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search hotels..."
                value={searchQuery}
                onChange={handleSearchChange}
                aria-label="Search Hotels"
              />
            </div>
          </header>

          <main className="grow overflow-auto p-4 " role="main">
            {loading && <p className="text-center text-gray-500">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {filteredHotels.length > 0 ? (
              <ul className="space-y-4">
                {filteredHotels.map((hotel: Hotel) => (
                  <HotelListItem key={hotel.id} hotel={hotel} />
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
