//@ts-nocheck
import { useEffect, useRef, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { cityMapping } from "../../database/dictionaryProvinces/cityMapping";
import { provinceMapping2 } from "../../database/dictionaryProvinces/provinceMapping";
import L from "leaflet";
import 'react-leaflet-markercluster/dist/styles.min.css';
import "leaflet.markercluster/dist/leaflet.markercluster";
import "./LeafletMapByFilter.css";
import { t } from "../../translationUtil";
import throttle from "lodash.throttle";

// Fetch points from the API
const fetchPoints = async ({ queryKey }) => {
    const [_, canonicalCityName, canonicalProvinceName] = queryKey;
    const response = await fetch(
        `http://10.15.90.72:9098/api/map/Site/city-detail/${canonicalCityName}/${canonicalProvinceName}`
    );

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response.json();
};

const MapPerProvince = ({ cityName, ProvinceName, setSiteNameClicked }) => {
    const [canonicalProvinceName, setCanonicalProvinceName] = useState("");
    const [canonicalCityName, setCanonicalCityName] = useState("");
    const mapRef = useRef<L.Map | null>(null);
    const markersRef = useRef<L.MarkerClusterGroup | null>(null);
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
        if (points.length > 0) setAllPoints(points); // Set initial points when fetched
    }, [points]);

    // Function to calculate distance between two points
    const calculateDistance = useCallback((lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in km
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    }, []);

    // Show popup for a marker
    const showPopup = (latitude, longitude, siteName) => {
        const popup = L.popup()
            .setLatLng([latitude, longitude])
            .setContent(`
                <div>
                    <b>siteName: ${siteName}</b>
                </div>
            `)
            .openOn(mapRef.current);
    };

    // Handle marker click, show popup and filter points
    const handleMarkerClick = (latitude, longitude, siteName) => {
        setSiteNameClicked(siteName);
        showPopup(latitude, longitude, siteName);

        const nearestPoints = allPoints
            .map((point) => ({
                ...point,
                distance: calculateDistance(latitude, longitude, point.latitude, point.longitude),
            }))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 10);

        setFilterPoints(nearestPoints);
    };

    // Throttled map updates
    const updateMapMarkers = useCallback(
        throttle((displayPoints) => {
            const markers = displayPoints.map((position) => {
                const { latitude, longitude, siteName } = position;

                const randomIcon = Math.random() < 0.5 ? "1.svg" : "2.svg";
                const customIcon = L.icon({
                    iconUrl: `../../images/map/FilterMap/${randomIcon}`,
                    iconSize: [32, 32],
                    iconAnchor: [16, 16]
                });

                const marker = L.marker([latitude, longitude], { icon: customIcon }).on('click', () => {
                    handleMarkerClick(latitude, longitude, siteName);
                });

                return marker;
            });

            markersRef.current.clearLayers();
            markersRef.current.addLayers(markers);

            const bounds = L.latLngBounds(displayPoints.map((point) => [point.latitude, point.longitude]));
            mapRef.current.fitBounds(bounds, { padding: [50, 50] });
        }, 200), // 200ms throttle delay
        []
    );

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
                maxClusterRadius: (zoom) => (zoom >= 13 ? 0 : 80),
            });
            mapRef.current.addLayer(markersRef.current);
        }

        const displayPoints = filterPoints.length > 0 ? filterPoints : allPoints;

        if (displayPoints.length > 0) {
            updateMapMarkers(displayPoints);
        }
    }, [filterPoints, allPoints, isLoading, updateMapMarkers]);

    if (error) return <div>Error fetching data</div>;

    return (
        <div id="map-container" style={{ width: "100%", height: "700px", zIndex: 0 }}></div>
    );
};

export default MapPerProvince;
