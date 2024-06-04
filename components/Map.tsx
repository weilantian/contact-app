import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FC } from "react";
const LazyMap: FC<{ lat: number; lng: number }> = ({ lat, lng }) => (
  <MapContainer
    style={{
      width: "100%",
      height: "100%",
    }}
    center={[51.505, -0.09]}
    zoom={13}
    scrollWheelZoom={false}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  </MapContainer>
);

export default LazyMap;
