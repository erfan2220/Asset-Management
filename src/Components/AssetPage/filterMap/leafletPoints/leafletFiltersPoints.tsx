//@ts-nocheck
import L from "leaflet";
import {useCallback, useEffect, useRef, useState} from "react";
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
        if (!mapRef.current)
        {
            console.log("pointntntnns",points)
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

            // Add event listener for polygon creation
            mapRef.current.on(L.Draw.Event.CREATED, (e) => {
                console.log("Draw event fired:", e); // Log the entire event
                const layer = e.layer;
                drawnItems.addLayer(layer);
                console.log("Polygon created:", layer.getLatLngs());
                console.log("Polygon points:", points.length);
                filterMarkersInPolygon(layer);
            });
        }

        if (points.length > 0) {
            addMarkers(points); // Always add all markers on points change
        }
    }, [points]);


    const filterMarkersInPolygon = useCallback((polygonLayer) => {
        console.log("Filtering markers, current points:", points);
        if (points.length === 0) {
            console.warn("No points available to filter.");
            return; // Exit early if no points are available
        }

        // Get polygon coordinates from the layer
        const polygonLatLngs = polygonLayer.getLatLngs()[0]; // Get the first set of latLngs if it's a multi-polygon
        const polygon = L.polygon(polygonLatLngs); // Create a Leaflet polygon

        console.log("Polygon coordinates:", polygonLatLngs);

        const pointsWithinPolygon = points.filter(point => {
            const pointLatLng = L.latLng(point.latitude, point.longitude);
            const isInside = polygon.contains(pointLatLng); // Check if point is inside the polygon
            console.log(`Checking point ${point.sitename} at (${point.latitude}, ${point.longitude}): ${isInside ? "Inside" : "Outside"}`);
            return isInside;
        });

        console.log(`Total points: ${points.length}, Points within polygon: ${pointsWithinPolygon.length}`);

        if (pointsWithinPolygon.length === 0) {
            console.warn("No points found within the polygon. Displaying all markers.");
            addMarkers(points);
        } else {
            console.log(`Points found within polygon: ${pointsWithinPolygon.length}`);
            addMarkers(pointsWithinPolygon);
        }
    }, [points]);




    const addMarkers = (pointsToShow) => {
        markersRef.current.clearLayers(); // Clear current markers

        const markers = pointsToShow.map(position => {
            const { latitude, longitude, sitename } = position;
            if (!isNaN(latitude) && !isNaN(longitude)) {
                const customIcon = L.icon({
                    iconUrl: "./images/map/FilterMap/BSC.svg",
                    iconSize: [32, 32],
                    iconAnchor: [16, 16]
                });

                return L.marker([latitude, longitude], { icon: customIcon }).on('click', () => {
                    setSiteName(sitename);
                });
            }
            return null;
        }).filter(marker => marker !== null);

        markersRef.current.addLayers(markers); // Add markers to the cluster group
    };


    return (
        <div id="map-container" style={{ width: "100%", height: "675px", position: "relative" }}>
            <div>Selected Site: {siteName}</div>
        </div>
    );
};

export default LeafletFilter;
