//@ts-nocheck
import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet-draw";
import "./LeafletMapByFilter.css";

const LeafletFilter = ({ points }) =>
{
    const mapRef = useRef(null);
    const markersRef = useRef(null);
    const drawnItems = useRef(new L.FeatureGroup()).current;
    const [siteName, setSiteName] = useState("");

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map("map-container", {
                center: [32.74015808, 52.30584163],
                zoom: 6,
                scrollWheelZoom: false,
                zoomControl: false,
            });

            L.control.zoom({ position: 'bottomright' }).addTo(mapRef.current);

            const tileLayerOffline = L.tileLayer("http://10.15.90.87/tiles/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                minZoom: 1,
                maxZoom: 13
            });
            tileLayerOffline.addTo(mapRef.current);

            markersRef.current = L.markerClusterGroup({
                showCoverageOnHover: false
            });
            mapRef.current.addLayer(markersRef.current);

            mapRef.current.addLayer(drawnItems);

            const drawControl = new L.Control.Draw({
                position: 'topright',
                edit: { featureGroup: drawnItems },
                draw: {
                    polygon: true,
                    circle: false,
                    rectangle: false,
                    marker: false,
                    polyline: false
                }
            });
            mapRef.current.addControl(drawControl);

            mapRef.current.on(L.Draw.Event.CREATED, (e) => {
                const layer = e.layer;
                drawnItems.addLayer(layer);
                filterMarkersInPolygon(layer);
            });
        }

        if (points.length > 0) {
            addMarkers(points);
        }
    }, [points]);

    const addMarkers = (pointsToShow) => {
        const markers = [];
        pointsToShow.forEach(position => {
            const { latitude, longitude, sitename } = position;

            if (!isNaN(latitude) && !isNaN(longitude)) {
                const customIcon = L.icon({
                    iconUrl: "./images/map/FilterMap/BSC.svg",
                    iconSize: [32, 32],
                    iconAnchor: [16, 16]
                });

                const marker = L.marker([latitude, longitude], { icon: customIcon }).on('click', () => {
                    setSiteName(sitename);
                });
                markers.push(marker);
            }
        });

        markersRef.current.clearLayers();
        markersRef.current.addLayers(markers);
    };

    const filterMarkersInPolygon = (polygonLayer) => {
        const pointsWithinPolygon = points.filter(point => {
            const pointLatLng = L.latLng(point.latitude, point.longitude);
            return polygonLayer.getLatLngs()[0].some((latlng) =>
                L.polyline(latlng).getBounds().contains(pointLatLng)
            );
        });

        addMarkers(pointsWithinPolygon);
    };

    return (
        <div id="map-container" style={{ width: "100%", height: "675px", position: "relative" }}>
            <div>Selected Site: {siteName}</div>
        </div>
    );
};

export default LeafletFilter;
