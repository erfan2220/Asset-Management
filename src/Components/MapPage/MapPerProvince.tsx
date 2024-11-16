//@ts-nocheck
import { useEffect, useRef, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { cityMapping } from "../../database/dictionaryProvinces/cityMapping";
import { provinceMapping2 } from "../../database/dictionaryProvinces/provinceMapping";
import L from "leaflet";
import 'react-leaflet-markercluster/dist/styles.min.css';
import "leaflet.markercluster/dist/leaflet.markercluster";
import "./LeafletMapByFilter.css";

// Fetch points from the API
const fetchPoints = async ({ queryKey }) => {
    const [_, canonicalCityName, canonicalProvinceName] = queryKey;
    const response = await fetch(`http://10.15.90.72:9098/api/map/Site/city-detail/${canonicalCityName}/${canonicalProvinceName}`);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
};

const MapPerProvince = ({ cityName, ProvinceName, setSiteNameClicked }) => {
    const [canonicalProvinceName, setCanonicalProvinceName] = useState("");
    const [canonicalCityName, setCanonicalCityName] = useState("");
    const mapRef = useRef(null);
    const markersRef = useRef(null);
    const [filterPoints, setFilterPoints] = useState([]);
    const [allPoints, setAllPoints] = useState([]);

    // Update canonical names for city and province
    useEffect(() => {
        setCanonicalProvinceName(provinceMapping2[ProvinceName]);
    }, [ProvinceName]);

    useEffect(() => {
        setCanonicalCityName(cityMapping[cityName]);
    }, [cityName]);

    // Fetch data using react-query
    const { data: points = [], error, isLoading } = useQuery({
        queryKey: ["fetchPoints", canonicalCityName, canonicalProvinceName],
        queryFn: fetchPoints,
        enabled: !!canonicalCityName && !!canonicalProvinceName,
        cacheTime: 0,
        staleTime: 0
    });

    useEffect(() => {
        if (points.length > 0) setAllPoints(points);
    }, [points]);

    // Function to calculate distance between two points
    const calculateDistance = useCallback((lat1, lon1, lat2, lon2) =>
    {
        const R = 6371; // Radius of the Earth in km
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
        return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))); // Distance in km
    }, []);

    // Show popup for a marker
    const showPopup = (latitude, longitude, siteName) =>
    {
        const popup = L.popup()
            .setLatLng([latitude, longitude])
            .setContent(`<div><b>siteName: ${siteName}</b></div>`)
            .openOn(mapRef.current);
    };

    const handleMarkerClick = (latitude, longitude, siteName) => {
        setSiteNameClicked(siteName);
        showPopup(latitude, longitude, siteName);

        const nearestPoints = allPoints
            .map((point) => ({
                ...point,
                distance: calculateDistance(latitude, longitude, point.latitude, point.longitude),
            }))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 11); // Include the clicked point + 10 nearest points

        setFilterPoints(nearestPoints); // Only set filtered points
    };

    // Update markers on the map
    const updateMapMarkers = useCallback((displayPoints) => {
        if (!markersRef.current) return;

        markersRef.current.clearLayers();

        const markers = displayPoints.map((position) => {
            const { latitude, longitude, siteName } = position;

            const randomIcon = Math.random() < 0.5 ? "1.svg" : "2.svg";
            const customIcon = L.icon({
                iconUrl: `../../images/map/FilterMap/${randomIcon}`,
                iconSize: [32, 32],
                iconAnchor: [16, 16]
            });

            return L.marker([latitude, longitude], { icon: customIcon }).on('click', () => {
                handleMarkerClick(latitude, longitude, siteName);
            });
        });

        markersRef.current.addLayers(markers);

        // Conditionally apply fitBounds only if displaying a specific set of points
        if (displayPoints.length === 11) {
            const bounds = L.latLngBounds(displayPoints.map((point) => [point.latitude, point.longitude]));
            mapRef.current.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [handleMarkerClick]);

    // Set markers on the map whenever filterPoints or allPoints change
    useEffect(() => {
        // Display only filterPoints when available, otherwise use allPoints
        const displayPoints = filterPoints.length > 0 ? filterPoints : allPoints;

        if (!isLoading && mapRef.current && markersRef.current) {
            updateMapMarkers(displayPoints);
        }
    }, [filterPoints, isLoading, updateMapMarkers]);


    // Map setup and marker clustering
    useEffect(() => {
        if (!isLoading && !mapRef.current) {
            mapRef.current = L.map("map-container", {
                center: [32.74015808, 52.30584163],
                zoom: 6,
                scrollWheelZoom: false
            });

            const tileLayerOffline = L.tileLayer("http://10.15.90.79/tiles/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                minZoom: 1,
                maxZoom: 13
            });
            tileLayerOffline.addTo(mapRef.current);

            const zoomControl = L.control.zoom({ position: 'bottomright' });
            zoomControl.addTo(mapRef.current);
        }

        if (!markersRef.current) {
            markersRef.current = L.markerClusterGroup({
                showCoverageOnHover: false,
                maxClusterRadius: zoom => (zoom >= 13 ? 0 : 80),
            });
            mapRef.current.addLayer(markersRef.current);
        }

        const displayPoints = filterPoints.length > 0 ? filterPoints : allPoints;
        if (displayPoints.length > 0) updateMapMarkers(displayPoints);
    }, [isLoading, updateMapMarkers]);

    if (error) return <div>Error fetching data</div>;

    return <div id="map-container" style={{ width: "100%", height: "700px", zIndex: 0 }}></div>;
};

export default MapPerProvince;
