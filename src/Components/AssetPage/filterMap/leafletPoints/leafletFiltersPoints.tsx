//@ts-nocheck
import L from "leaflet";
import { useCallback, useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet-draw";
import "./LeafletMapByFilter.css";
import {useSharedContext} from "../SharedSiteType/SharedSiteType";

const LeafletFilter = ({ points,type }) =>
{
    const mapRef = useRef(null);
    const markersRef = useRef(null);
    const drawnItems = useRef(new L.FeatureGroup()).current;

    const {siteData, setSiteData}= useSharedContext()

    const [siteName, setSiteName]= useState()



    useEffect(() =>
    {
        if (!mapRef.current) {
            console.log("Initializing map");

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
                maxZoom: 14
            });
            tileLayerOffline.addTo(mapRef.current);

            markersRef.current = L.markerClusterGroup({
                showCoverageOnHover: false,
                maxClusterRadius: (zoom) => (zoom >= 13 ? 0 : 80),
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
        }

        if (points.length > 0) {
            console.log("Adding markers to map with new points:", points);
            addMarkers(points);
        }
    }, [points]);

    useEffect(() => {
        if (points.length > 0 && mapRef.current) {
            const handleDraw = (e) => {
                console.log("Draw event fired:", e);
                console.log("Draw event points:", points);
                const layer = e.layer;
                drawnItems.addLayer(layer);
                filterMarkersInPolygon(layer);
            };

            mapRef.current.on(L.Draw.Event.CREATED, handleDraw);

            return () => {
                mapRef.current.off(L.Draw.Event.CREATED, handleDraw);
            };
        }
    }, [points]);

    const filterMarkersInPolygon = useCallback((polygonLayer) => {
        console.log("Filtering markers, current points:", points);
        if (points.length === 0) {
            console.warn("No points available to filter.");
            return;
        }

        const polygonLatLngs = polygonLayer.getLatLngs()[0];
        const polygon = L.polygon(polygonLatLngs);

        console.log("Polygon coordinates:", polygonLatLngs);

        const pointsWithinPolygon = points.filter(point => {
            const pointMarker = L.marker([point.latitude, point.longitude]); // Create a temporary marker for the point
            return isMarkerInsidePolygon(pointMarker, polygon); // Check if it's inside the polygon
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


    function isMarkerInsidePolygon(marker, poly) {
        const polyPoints = poly.getLatLngs()[0]; // Get the first set of latLngs for the polygon
        const x = marker.getLatLng().lat, y = marker.getLatLng().lng;

        let inside = false;
        for (let i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++)
        {
            const xi = polyPoints[i].lat, yi = polyPoints[i].lng;
            const xj = polyPoints[j].lat, yj = polyPoints[j].lng;

            const intersect = ((yi > y) !== (yj > y)) &&
                (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }

        return inside;
    }



    const addMarkers = (pointsToShow) => {
        markersRef.current.clearLayers();

        const displayedMarkers = [];
        const distanceThreshold = 0.005; // Adjust this based on your needs

        pointsToShow.forEach(position => {
            const { latitude, longitude, sitename } = position;

            // Validate latitude and longitude
            if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
                // Check if there's a displayed marker close enough
                const isNearby = displayedMarkers.some(marker => {
                    const latDiff = marker.latitude - latitude;
                    const lngDiff = marker.longitude - longitude;
                    return (latDiff * latDiff + lngDiff * lngDiff) < (distanceThreshold * distanceThreshold);
                });

                if (!isNearby) {
                    const randomIcon = Math.random() < 0.5 ? "1.svg" : "2.svg";
                    const customIcon = L.icon({
                        iconUrl: `./images/map/FilterMap/${randomIcon}`,
                        iconSize: [32, 32],
                        iconAnchor: [16, 16]
                    });
                    const marker = L.marker([latitude, longitude], { icon: customIcon });

                    marker.on('click', () => {
                        setSiteData({
                            siteName: sitename,
                            latitude: latitude,
                            longitude: longitude,
                            type: type,
                        });
                        console.log(`Clicked on marker: ${sitename}, Lat: ${latitude}, Long: ${longitude}`);
                    });

                    // Add the new marker and its position to the displayed markers
                    displayedMarkers.push({ latitude, longitude, marker });
                    markersRef.current.addLayer(marker);
                }
            } else {
                console.warn(`Invalid coordinates for sitename "${sitename}": Lat=${latitude}, Long=${longitude}`);
            }
        });
    };



    return (
        <div id="map-container" style={{ width: "100%", height: "675px", position: "relative" }}>

        </div>
    );
};

export default LeafletFilter;
