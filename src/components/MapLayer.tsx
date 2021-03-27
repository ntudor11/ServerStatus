import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MapPin from "../images/map-pin.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: MapPin,
  shadowUrl: iconShadow,
  iconSize: [45, 45],
  iconAnchor: [17, 45],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface IProps {
  addressCoords: any;
}

const MapLayer: React.FC<IProps> = (props: IProps) => {
  const { addressCoords } = props;

  return (
    <MapContainer
      center={addressCoords}
      zoom={8}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={addressCoords}>
        <Popup>
          <p>demo map placeholder</p>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapLayer;
