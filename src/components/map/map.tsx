import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { LatLngExpression, divIcon } from "leaflet";
import { useState } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { renderToString } from "react-dom/server";
interface MapProps {
  position: LatLngExpression;
  center: LatLngExpression;
  showMarker: boolean;
  zoom?: number;
  height?: string;
  width?: string;
}

const defaults = { zoom: 14 };

const locationIconMarker = () => {
  const iconHtml = renderToString(  
    React.createElement(FontAwesomeIcon, {
      icon: faLocationPin,
      style: { fontSize: "30px", color: "green" },
    })
  );

  return divIcon({
    html: iconHtml,
    className: "custom-marker-icon",
    iconSize: [30, 30],
    iconAnchor: [12, 30],
  });
};

export default function Map(props: MapProps) {
  const {
    zoom = defaults.zoom,
    position,
    center,
    showMarker,
    width = "100%",
    height = "400px",
  } = props;
  const [markerPosition, setMarkerPosition] =
    useState<LatLngExpression>(position);

  return (
    <MapContainer
      preferCanvas={true}
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height, width }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {showMarker && (
        <>
          <Marker position={markerPosition} icon={locationIconMarker()} />
        </>
      )}
    </MapContainer>
  );
}
