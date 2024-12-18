import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { FaMapMarkerAlt } from 'react-icons/fa';
import ReactDOMServer from 'react-dom/server';
import 'leaflet/dist/leaflet.css';

type Props = {
 tableData: { [key: string]: any }[];};

// Custom Icon using react-icons
const CustomMarkerIcon = () => {
  return <FaMapMarkerAlt style={{ color: 'red', fontSize: '24px' }} />;
};

// Create a custom DivIcon using the React component
const createCustomIcon = () => {
  return L.divIcon({
    html: ReactDOMServer.renderToString(<CustomMarkerIcon />),
    iconSize: [24, 24],
    className: 'custom-marker-icon'
  });
};

const MapComponent = ({ tableData }: Props) => {
  // Filter out items with invalid latitude or longitude
  const validData = tableData.filter(item => item.Latitude && item.Longitude && !isNaN(parseFloat(item.Latitude)) && !isNaN(parseFloat(item.Longitude)));

  if (validData.length === 0) {
    return <div>No valid data available to display on the map.</div>;
  }

  // Limit to the first 50 markers
  const limitedData = validData.slice(0, 50);

  return (
    <MapContainer center={[parseFloat(limitedData[0].Latitude), parseFloat(limitedData[0].Longitude)]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {limitedData.map((item, index) => (
        <Marker key={index} position={[parseFloat(item.Latitude), parseFloat(item.Longitude)]} icon={createCustomIcon()}>
          <Popup>
            {`DESCRIPTION: ${item.Description || 'DESCRIPTION UNKNOWN'}\n, LOCATION: ${item.Location || 'LOCATION UNKNOWN'}`.trim() || 'No description provided'}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
