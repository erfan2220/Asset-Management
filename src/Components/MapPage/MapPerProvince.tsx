//@ts-nocheck
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { cityMapping } from "../../database/dictionaryProvinces/cityMapping";
import { provinceMapping2 } from "../../database/dictionaryProvinces/provinceMapping";
import L from "leaflet";
import 'react-leaflet-markercluster/dist/styles.min.css';
import "leaflet.markercluster/dist/leaflet.markercluster";
import "./LeafletMapByFilter.css";

// Fetching function using the native fetch API
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

    useEffect(() => {
        setCanonicalProvinceName(provinceMapping2[ProvinceName]);
    }, [ProvinceName]);

    useEffect(() => {
        setCanonicalCityName(cityMapping[cityName]);
    }, [cityName]);

    const { data: points = [], error, isLoading } = useQuery({
        queryKey: ["fetchPoints", canonicalCityName, canonicalProvinceName],
        queryFn: fetchPoints,
        enabled: !!canonicalCityName && !!canonicalProvinceName,
        cacheTime: 0,
        staleTime: 0
    });

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
                maxZoom: 14
            });
            tileLayerOffline.addTo(mapRef.current);

            const zoomControl = L.control.zoom({ position: 'bottomright' });
            zoomControl.addTo(mapRef.current);


            zoomLevelControl.onAdd = function () {
                const div = L.DomUtil.create("div", "zoom-level-display");
                div.innerHTML = `Zoom Level: ${mapRef.current.getZoom()}`;
                return div;
            };
            zoomLevelControl.addTo(mapRef.current);

            // Update zoom level display on zoom change
            mapRef.current.on("zoomend", function () {
                const zoomDisplay = document.querySelector(".zoom-level-display");
                if (zoomDisplay) {
                    zoomDisplay.innerHTML = `Zoom Level: ${mapRef.current.getZoom()}`;
                }
            });
        }

        if (!markersRef.current) {
            markersRef.current = L.markerClusterGroup({
                showCoverageOnHover: false,
                maxClusterRadius: (zoom) => (zoom >= 13 ? 0 : 80),
            });
            mapRef.current.addLayer(markersRef.current);
        }

        if (points.length > 0) {
            const markers = [];
            const uniquePoints = new Set();

            points.forEach(position => {
                const { latitude, longitude, siteName } = position;
                const uniqueKey = `${latitude}-${longitude}-${siteName}`;

                if (!uniquePoints.has(uniqueKey) && !isNaN(latitude) && !isNaN(longitude)) {
                    const randomIcon = Math.random() < 0.5 ? "1.svg" : "2.svg";

                    const customIcon = L.icon({
                        iconUrl: `../../images/map/FilterMap/${randomIcon}`,
                        iconSize: [32, 32],
                        iconAnchor: [16, 16]
                    });

                    const marker = L.marker([latitude, longitude], { icon: customIcon }).on('click', () => {
                        setSiteNameClicked(siteName);
                    });

                    markers.push(marker);
                    uniquePoints.add(uniqueKey);
                }
            });

            markersRef.current.clearLayers();
            markersRef.current.addLayers(markers);
        }
    }, [points]);

    if (error) return <div>Error fetching data</div>;

    return (
        <div id="map-container" style={{ width: "100%", height: "700px", zIndex: 0 }}></div>
    );
};

export default MapPerProvince;

