import React from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";

const Leaflet = (props) => {
  return (
    <div>
      <MapContainer center={props.position} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default Leaflet;
