import React, { useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSync, faStar } from "@fortawesome/free-solid-svg-icons";
import Map from "../../components/map/map";
import HotelErrorBoundary from "./error-boundry";
import useFetchHotel from "../../hooks/use-fetch-hotel";
import { Facility, Review } from "../../types/hotel.model";

const FacilityItem = React.memo(({ facility }: { facility: Facility }) => (
  <div className="flex items-center bg-white p-2 rounded-md shadow-sm">
    <span className="text-xl mr-2">{facility.icon}</span>
    <span className="text-gray-700">{facility.name}</span>
  </div>
));

const ReviewItem = React.memo(({ review }: { review: Review }) => (
  <div className="p-4 bg-white rounded-md shadow-sm border">
    <div className="flex items-center">
      <h3 className="font-semibold text-gray-800">{review.user}</h3>
      <div className="ml-2 text-yellow-500 flex">
        {Array(review.rating)
          .fill(0)
          .map((_, i) => (
            <FontAwesomeIcon key={i} icon={faStar} />
          ))}
      </div>
    </div>
    <p className="text-gray-700 mt-1">{review.comment}</p>
  </div>
));

const HotelPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { hotel, error, fetchHotel } = useFetchHotel(id);

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
                  className="p-2 rounded-full hover:bg-gray-200 flex items-center cursor-pointer"
                  aria-label="Back to Hotels"
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="text-gray-700"
                  />
                </Link>
              </div>
              <h1 className="self-center ps-2 text-xl font-semibold">
                Hotel Page
              </h1>
              <div className="flex items-center min-w-full md:min-w-0 md:grow justify-end">
                <button
                  onClick={fetchHotel}
                  className="p-2 rounded-full hover:bg-gray-200 flex items-center"
                  aria-label="Refresh hotel"
                >
                  <FontAwesomeIcon icon={faSync} className="text-gray-700" />
                </button>
              </div>
            </div>
            <hr />
          </section>

          <section className="grow p-2 overflow-auto">
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

              <section className="mt-6 p-4 bg-gray-100 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-3">
                  Facilities & Features
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {hotel.facilities.map((facility) => (
                    <FacilityItem key={facility.id} facility={facility} />
                  ))}
                </div>
              </section>

              <div className="lg:flex mt-6">
                <Map hotels={[hotel]} />
              </div>

              <section className="mt-6 p-4 bg-gray-100 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-3">User Reviews</h2>
                <div className="space-y-4">
                  {hotel.reviews.map((review) => (
                    <ReviewItem key={review.id} review={review} />
                  ))}
                </div>
              </section>

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
