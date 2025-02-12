import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { divIcon, LatLngBounds } from "leaflet";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { renderToString } from "react-dom/server";

import "./map.scss";
import { Location } from "../../types/location.model";

interface MapProps<T extends Location> {
  locations: T[];
  height?: string;
  width?: string;
  onMarkerClick?: (id: number) => void;
}

const locationIconMarker = (name: string) => {
  const iconHtml = renderToString(
    <div className="flex flex-col items-center marker-container">
      <FontAwesomeIcon icon={faLocationPin} className="text-3xl marker-icon" />
      <div className="text-xs font-semibold text-center mt-1 text-white py-1 px-2 rounded-lg marker-text">
        {name}
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

const MapBounds = ({ locations }: { locations: Location[] }) => {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 0) {
      const bounds = new LatLngBounds(
        locations.map((loc) => [loc.lat, loc.long])
      );

      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations, map]);

  return null;
};

const Map = <T extends Location>({
  locations,
  height = "400px",
  width = "100%",
  onMarkerClick,
}: MapProps<T>) => {
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
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.lat, location.long]}
          icon={locationIconMarker(location.name)}
          eventHandlers={{
            click: () => onMarkerClick?.(location.id),
          }}
        />
      ))}
      <MapBounds locations={locations} />
    </MapContainer>
  );
};

export default Map;
