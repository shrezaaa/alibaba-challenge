import React from "react";
import { Hotel } from "../../types/hotel.model";

const sampleHotels: Hotel[] = [
  {
    id: 1,
    name: "Homa",
    description:
      "Tehran Homa Hotel, one of the most prestigious five-star hotels in the capital...",
    location: { long: 50, lat: 50 },
    stars: 5,
    pricePerNight: 150,
  },
  {
    id: 2,
    name: "Luxury Palace",
    description: "A luxurious stay with breathtaking views.",
    location: { long: 51, lat: 51 },
    stars: 4,
    pricePerNight: 200,
  },
];

const getData = () => {
  console.log("Refresh clicked");
  // Fetch data logic here
};

cconst Hotels: React.FC = () => {
    return (
      <div className="w-full h-full flex flex-wrap p-2">
        <div className="w-full h-full bg-white bg-gradient-to-r rounded-sm shadow-md flex flex-col">
          {/* Header Section */}
          <section className="w-full p-1">
            <div className="flex w-full justify-between min-h-10">
              <div className="self-center ps-2">Hotels List</div>
              <form></form>
              <div className="flex items-center min-w-full md:min-w-0 md:grow justify-end">
                <button
                  onClick={getData}
                  className="p-2 rounded-full hover:bg-gray-200 flex items-center"
                >
                  <RefreshIcon />
                </button>
              </div>
            </div>
            <hr />
          </section>
  
          {/* Content Section */}
          <section className="grow p-2">
            <div>
              <h1 className="text-lg font-semibold">Hotels</h1>
              <ul className="space-y-4">
                {sampleHotels.map((hotel) => (
                  <li
                    key={hotel.id}
                    className="p-4 border rounded-lg shadow-sm bg-white"
                  >
                    <h2 className="text-xl font-bold">{hotel.name}</h2>
                    <p className="text-gray-700">{hotel.description}</p>
                    <p className="text-gray-500">
                      Location: ({hotel.location.lat}, {hotel.location.long})
                    </p>
                    <p className="text-yellow-500">
                      ⭐ {hotel.stars} Stars
                    </p>
                    <p className="text-green-600 font-semibold">
                      Price per Night: ${hotel.pricePerNight}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  };
  
  export default Hotels;
