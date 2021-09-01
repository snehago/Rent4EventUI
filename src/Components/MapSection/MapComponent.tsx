import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Venue } from "../../Shared/Interfaces/Venue";
import "./map.scss";

interface FSProps {
  venue: Venue;
}
const MapComponent = ({ venue }: FSProps) => {
  return (
    <>
      <MapContainer
        center={[
          venue.address.latitude ? venue.address.latitude : 0,
          venue.address.longitude ? venue.address.longitude : 0,
        ]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[
            venue.address.latitude ? venue.address.latitude : 0,
            venue.address.longitude ? venue.address.longitude : 0,
          ]}
        >
          <Popup>
            {`${venue.title},${venue.address.city},${venue.address.state},${venue.address.country}`}
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
};

export default MapComponent;
