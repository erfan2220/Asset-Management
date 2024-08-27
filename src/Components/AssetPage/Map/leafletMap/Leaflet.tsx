// @ts-nocheck
import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import iranProvincesGeoJSON from "../../../../database/geoGraphy/geoGraphy"
const LeafletFilter = () => {
    const mapRef = useRef(null);
    const [markers, setMarkers] = useState([]);

    const defaultStyle = {
        color: "#3388ff",
        weight: 2,
        fillOpacity: 0.2
    };

    const hoverStyle = {
        color: "#007bFF",
        weight: 3,
        fillColor: "#3388ff",
        fillOpacity: 0.6
    };

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map("map-container", {
                center: [32.4279, 53.6880],
                zoom: 5,
                scrollWheelZoom: false
            });

            const tileLayerOffline = L.tileLayer("http://10.15.90.87/tiles/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                minZoom: 1,
                maxZoom: 13
            });
            tileLayerOffline.addTo(mapRef.current);

            // Add GeoJSON layer for provinces
            const provinceLayer = L.geoJSON(iranProvincesGeoJSON, {
                style: {
                    color: "#3388ff",
                    weight: 2
                },
                onEachFeature: (feature, layer) => {
                    layer.on({
                        click: (e) => {
                            zoomToFeature(e);
                            const provinceName = feature.properties.name;
                            handleProvinceClick(provinceName);
                        },
                        mouseover: (e) => {
                            e.target.setStyle(hoverStyle);
                        },
                        mouseout: (e) => {
                            e.target.setStyle(defaultStyle);
                        }
                    });

                }
            }).addTo(mapRef.current);
        }
    }, []);

    const zoomToFeature = (e) => {
        mapRef.current.fitBounds(e.target.getBounds());
    };

    const handleProvinceClick = (provinceName) =>
    {
        // alert(`You clicked on ${provinceName}`);
    };

    return (
        <div id="map-container" style={{ width: "100%", height: "100vh", zIndex: 1 }}></div>
    );
};

export default LeafletFilter;
