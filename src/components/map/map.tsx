import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { LatLngExpression, divIcon, LatLngBounds } from "leaflet";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { renderToString } from "react-dom/server";
import { Hotel } from "../../types/hotel.model";

interface MapProps {
  hotels: Hotel[];
  height?: string;
  width?: string;
}

const locationIconMarker = (hotelName: string) => {
  const iconHtml = renderToString(
    <div className="flex flex-col items-center">
      <FontAwesomeIcon
        icon={faLocationPin}
        className="text-green-800 text-3xl opacity-95"
      />
      <div className="text-xs font-semibold text-center mt-1 text-white bg-green-800 py-1 px-2 rounded-lg opacity-95">
        {hotelName}
      </div>
    </div>
  );

  return divIcon({
    html: iconHtml,
    className: "custom-marker-icon",
    iconSize: [30, 42],
    iconAnchor: [15, 42],
  });
};

// Component to handle map bounds and zoom
const MapBounds = ({ hotels }: { hotels: Hotel[] }) => {
  const map = useMap();

  useEffect(() => {
    if (hotels.length > 0) {
      // Create a LatLngBounds object to fit all markers
      const bounds = new LatLngBounds(
        hotels.map((hotel) => [hotel.location.lat, hotel.location.long])
      );

      // Fit the map to the bounds
      map.fitBounds(bounds, { padding: [50, 50] }); // Add padding for better visibility
    }
  }, [hotels, map]);

  return null;
};

const Map = ({ hotels, height = "400px", width = "100%" }: MapProps) => {
  return (
    <MapContainer
      preferCanvas={true}
      scrollWheelZoom={true}
      style={{ height, width }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hotels.map((hotel) => (
        <Marker
          key={hotel.id}
          position={[hotel.location.lat, hotel.location.long]}
          icon={locationIconMarker(hotel.name)} // Pass hotel name
        />
      ))}
      <MapBounds hotels={hotels} /> {/* Add MapBounds component */}
    </MapContainer>
  );
};

export default Map;