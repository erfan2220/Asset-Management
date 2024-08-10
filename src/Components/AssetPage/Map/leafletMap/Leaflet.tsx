//@ts-nocheck
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Leaflet.css';


const getMarkerColor = (value) => {
    if (value < 20) return '#ff0000'; // Red
    if (value < 50) return '#ffff00'; // Yellow
    return '#00ff00'; // Green
};


const dataPoints = [
    { id: 1, position: [51.505, -0.09], value: 10 },
    { id: 2, position: [51.515, -0.1], value: 30 },
    { id: 3, position: [51.525, -0.11], value: 60 },
];


const LeafletMap = () =>
{

    const defaultIcon = L.icon({
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
    L.Marker.prototype.options.icon = defaultIcon;

    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {dataPoints.map(point => (
                <Marker
                    key={point.id}
                    position={point.position}
                    icon={L.divIcon({
                        className: 'custom-icon',
                        html: `<div style="background-color: ${getMarkerColor(point.value)}; width: 30px; height: 30px; border-radius: 50%; border: 2px solid white;"></div>`,
                        iconSize: [30, 30],
                        iconAnchor: [15, 30]  // Adjust anchor point
                    })}
                >
                    <Popup>
                        Value: {point.value}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default LeafletMap;