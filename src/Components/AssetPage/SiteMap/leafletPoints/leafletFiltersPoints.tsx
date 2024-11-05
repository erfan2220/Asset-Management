//@ts-nocheck
import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import "leaflet.markercluster/dist/leaflet.markercluster";
import "./LeafletMapByFilter.css";

const LeafletFilter = ({ points }: LeafletFilterProps) => {
    const mapRef = useRef<L.Map | null>(null);
    const markersRef = useRef<L.MarkerClusterGroup | null>(null);
    const [siteName, setSiteName] = useState("");
    const [siteData, setSiteData] = useState();

    useEffect(() => {
        if (siteName !== "") {
            fetch(`http://10.15.90.87:5001/api/assets/site_profit_margin/${siteName}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setSiteData(data.data);
                })
                .catch(error => {
                    console.error('Error fetching info:', error);
                });
        } else {
            setSiteName("");
        }
    }, [siteName]);

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map("map-container", {
                center: [32.74015808, 52.30584163],
                zoom: 6,
                scrollWheelZoom: false,
                zoomControl: false,
            });

            // Add zoom control to a custom position (e.g., bottom-right)
            L.control.zoom({
                position: 'bottomright'
            }).addTo(mapRef.current);

            const tileLayerOffline = L.tileLayer("http://10.15.90.87/tiles/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                minZoom: 1,
                maxZoom: 14
            });
            tileLayerOffline.addTo(mapRef.current);
        }

        if (!markersRef.current) {
            markersRef.current = L.markerClusterGroup({
                showCoverageOnHover: false
            });
            mapRef.current.addLayer(markersRef.current);
        }

        if (points.length > 0) {
            const validPoints = points.filter(point => !isNaN(point.latitude) && !isNaN(point.longitude));

            // Clear existing markers
            markersRef.current.clearLayers();

            // Create markers for valid points
            const markers: L.Marker[] = validPoints.map(position => {
                const { latitude, longitude, sitename } = position;

                const customIcon = L.icon({
                    iconUrl: "./images/map/FilterMap/BSC.svg",
                    iconSize: [54, 54],
                    iconAnchor: [27, 54]
                });

                const marker = L.marker([latitude, longitude], { icon: customIcon })
                    .on('click', () => {
                        setSiteName(sitename);
                    });

                return marker;
            });

            markersRef.current.addLayers(markers);

            // Fly to the first valid point if available
            if (validPoints.length > 0) {
                const { latitude, longitude } = validPoints[0];
                if (mapRef.current) {
                    mapRef.current.flyTo([latitude, longitude], 13, {
                        animate: true,
                        duration: 2
                    });
                }
            }
        }
    }, [points]);

    return (
        <div id="map-container" style={{ width: "100%", height: "675px", position: "relative" }}>
            <div className="mapInfoContainer">
                <div className="mapInfoContainerColumns">

                </div>
            </div>
        </div>
    );
};

export default LeafletFilter;
