import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet-async";
import { Hotel } from "../../types/hotel.model";

const HotelsList: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchHotels = async () => {
    try {
      const response = await fetch("http://localhost:5000/hotels");
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
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
    <>
      <Helmet>
        <title>Hotels List - Find the Best Hotels</title>
        <meta
          name="description"
          content="Browse and book top-rated hotels with great amenities and best prices."
        />
      </Helmet>

      <div className="w-full h-full flex flex-wrap p-2">
        <div className="w-full h-full bg-white bg-gradient-to-r rounded-sm shadow-md flex flex-col overflow-auto">
          <header className="w-full p-1">
            <div className="flex w-full justify-between min-h-10">
              <h1 className="self-center ps-2 text-xl font-semibold">
                Hotels List
              </h1>
              <div className="flex items-center min-w-full md:min-w-0 md:grow justify-end">
                <button
                  onClick={fetchHotels}
                  className="p-2 rounded-full hover:bg-gray-200 flex items-center"
                  aria-label="Refresh Hotels"
                >
                  <FontAwesomeIcon icon={faSync} className="text-gray-700" />
                </button>
              </div>
            </div>
            <hr />
          </header>

          <main className="grow p-2 overflow-auto">
            <section>
              <div className="flex items-center gap-x-2">
                <h2 className="text-2xl font-bold">Search Hotels</h2>
                <input
                  type="text"
                  className="px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search hotels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search Hotels"
                />
              </div>
              <hr className="my-2" />
              <ul className="space-y-4">
                {filteredHotels.length > 0 ? (
                  filteredHotels.map((hotel) => (
                    <li
                      key={hotel.id}
                      className="p-4 border rounded-lg shadow-sm bg-white hover:bg-gray-100 transition"
                    >
                      <Link
                        to={`/hotels/${hotel.id}`}
                        className="block"
                        aria-label={`View details of ${hotel.name}`}
                      >
                        <article>
                          <h2 className="text-xl font-bold">{hotel.name}</h2>
                          <p className="text-gray-700">{hotel.description}</p>
                          <p className="text-gray-500">
                            Location: ({hotel.location.lat},{" "}
                            {hotel.location.long})
                          </p>
                          <p className="text-yellow-500">
                            ⭐ {hotel.stars} Stars
                          </p>
                          <p className="text-green-600 font-semibold">
                            Price per Night: ${hotel.pricePerNight}
                          </p>
                        </article>
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="p-4 text-center text-gray-500">
                    No hotels found.
                  </li>
                )}
              </ul>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default HotelsList;
