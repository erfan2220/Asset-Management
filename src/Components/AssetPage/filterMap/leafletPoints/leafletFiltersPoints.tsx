//@ts-nocheck
import L from "leaflet";
import {useCallback, useEffect, useRef, useState} from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet-draw";
import "./LeafletMapByFilter.css";
import { useSharedContext } from "../SharedSiteType/SharedSiteType";
import {useNavigate} from "react-router-dom";

// Define the Point interface
interface Point {
    latitude: number;
    longitude: number;
    sitename: string;
    tech: string;
    type: 'BTS' | 'BSC' | 'MSC' | 'RNC' | 'NODEB' | 'ENODEB';
}

const LeafletFilter: React.FC<{ points: Point[], setSiteNameClicked: (siteName: string) => void }> = ({ points, setSiteNameClicked }) =>
{

    const mapRef = useRef<L.Map | null>(null);
    const markersRef = useRef<L.MarkerClusterGroup | null>(null);
    const drawnItems = useRef<L.FeatureGroup>(new L.FeatureGroup()).current;
    const { setSiteData } = useSharedContext();

    const [activeType, setActiveType] = useState<string | null>(null); // Tracks the active type (MSC/BSC clicked)
    const [activeMarker, setActiveMarker] = useState<string | null>(null); // Tracks active marker by sitename or type


    const iconMap: Record<string, { default: string; clicked: string }> = {
        MSC: {
            default: "./images/Asset/map/Filters/MSCGreen.svg",
            clicked: "./images/map/Topology/MSC-Clicked.svg",
        },
        BSC: {
            default: "./images/Asset/map/Filters/BSCGreen.svg",
            clicked: "./images/map/Topology/BSC-Clicked.svg",
        },
        RNC: {
            default: "./images/Asset/map/Filters/BSCGreen.svg",
            clicked: "./images/map/Topology/BSC-Clicked.svg",
        },
        BTS: {
            default: "./images/Asset/map/Filters/BTSGreen.svg",
            clicked: "./images/map/Topology/Site-unClicked.svg",
        },
        nodeb: {
            default: "./images/Asset/map/Filters/BTSGreen.svg",
            clicked: "./images/map/Topology/Site-unClicked.svg",
        },
        enoedb: {
            default: "./images/Asset/map/Filters/BTSGreen.svg",
            clicked: "./images/map/Topology/Site-unClicked.svg",
        },
    };

    useEffect(() =>
    {

        if (!mapRef.current)
        {
            initializeMap();
        }

        if (points.length > 0)
        {
            addMarkers(points);
        }

    }, [points]);

    const initializeMap = () => {
        mapRef.current = L.map("map-container", {
            center: [32.74015808, 52.30584163],
            zoom: 6,
            attributionControl: false,
            scrollWheelZoom: false,
            zoomControl: false,
        });

        L.control.zoom({ position: 'bottomright' }).addTo(mapRef.current);

        L.tileLayer("http://10.15.90.79/tiles/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            minZoom: 1,
            maxZoom: 13
        }).addTo(mapRef.current);

        markersRef.current = L.markerClusterGroup({
            showCoverageOnHover: false,
            // maxClusterRadius: (zoom) => (zoom >= 13 ? 0 : 80),
        });

        mapRef.current.addLayer(markersRef.current);
        mapRef.current.addLayer(drawnItems);

        const drawControl = new L.Control.Draw({
            position: 'topright',
            draw: {
                polygon: true,
                circle: false,
                rectangle: false,
                marker: false,
                polyline: false
            },
            edit: {
                featureGroup: drawnItems, // Layer that allows editing and deleting
                remove: true              // Enable the delete option
            }
        });
        mapRef.current.addControl(drawControl);

        mapRef.current.on(L.Draw.Event.CREATED, (e) => {
            drawnItems.addLayer(e.layer);
            filterMarkersInPolygon(e.layer);
        });
    };



    const filterMarkersInPolygon = useCallback((polygonLayer) => {
        const polygonLatLngs = polygonLayer.getLatLngs()[0];
        const polygon = L.polygon(polygonLatLngs);

        const pointsWithinPolygon = points.filter(point => {
            const pointMarker = L.marker([point.latitude, point.longitude]);
            return isMarkerInsidePolygon(pointMarker, polygon);
        });

        addMarkers(pointsWithinPolygon.length ? pointsWithinPolygon : points);
    }, [points]);

    const isMarkerInsidePolygon = (marker: L.Marker, poly: L.Polygon) => {
        const polyPoints = poly.getLatLngs()[0];
        const x = marker.getLatLng().lat, y = marker.getLatLng().lng;
        let inside = false;
        for (let i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
            const xi = polyPoints[i].lat, yi = polyPoints[i].lng;
            const xj = polyPoints[j].lat, yj = polyPoints[j].lng;
            const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    };

    const addMarkers = (pointsToShow: Point[]) =>
    {
        if (markersRef.current) {
            markersRef.current.clearLayers();
        }

        const generateDirectionalPointsWithLines = (centerLat, centerLng, type) => {
            const offset = 0.05; // Adjust distance from center as needed
            const points = [
                { latitude: centerLat, longitude: centerLng + offset, type }, // East
                { latitude: centerLat, longitude: centerLng - offset, type }, // West
                { latitude: centerLat + offset, longitude: centerLng + offset, type }, // Northeast
                { latitude: centerLat - offset, longitude: centerLng - offset, type }  // Southwest
            ];
            return points;
        };


        pointsToShow.forEach(position => {
            // Ensure position has required properties before destructuring
            if (position && position.latitude != null && position.longitude != null) {
                const { latitude, longitude, sitename, type } = position;

                const isActive = activeMarker === sitename;
                const iconUrl = isActive
                    ? iconMap[type]?.clicked
                    : iconMap[type]?.default;

                const customIcon = L.icon({
                    iconUrl: iconUrl || "./images/Asset/map/Filters/BTSGreen.svg",
                    iconSize: [32, 32],
                    iconAnchor: [16, 16],
                });

                const marker = L.marker([latitude, longitude], { icon: customIcon });

                // marker.on('click', () =>
                // {
                //     setSiteData({ siteName: sitename, latitude, longitude, type });
                //     setSiteNameClicked(sitename);
                //
                //     mapRef.current.flyTo([latitude, longitude], 12, {
                //         animate: true,
                //         duration: 1 // Adjust duration if needed
                //     });
                //
                //     if (type === 'MSC') {
                //         marker.setIcon(
                //             L.icon({
                //                 iconUrl: "./images/Asset/map/Topology/MSC-Clicked.svg", // Use a different icon for clicked MSC
                //                 iconSize: [32, 32],
                //                 iconAnchor: [16, 16],
                //             })
                //         );
                //     }
                //     if (type === 'MSC') {
                //         marker.setIcon(
                //             L.icon({
                //                 iconUrl: "./images/Asset/map/Topology/BSC-Clicked.svg", // Use a different icon for clicked MSC
                //                 iconSize: [32, 32],
                //                 iconAnchor: [16, 16],
                //             })
                //         );
                //     }
                //
                //     mapRef.current.once('moveend', () => {
                //         markersRef.current.clearLayers(); // Clear existing markers
                //
                //         if (type === 'MSC') {
                //             const directionalBSCs = generateDirectionalPointsWithLines(latitude, longitude, 'BSC', mapRef.current);
                //             addMarkers(directionalBSCs);
                //         } else if (type === 'BSC') {
                //             const directionalBTSs = generateDirectionalPointsWithLines(latitude, longitude, 'BTS', mapRef.current);
                //             addMarkers(directionalBTSs);
                //         }
                //         console.log(`Arrived at ${sitename}, displaying nearby points.`);
                //     });
                // });

                marker.on("click", () => {
                    setActiveType(type); // Update active type
                    setSiteData({ siteName: sitename, latitude, longitude, type });
                    setSiteNameClicked(sitename);

                    marker.setIcon(
                        L.icon({
                            iconUrl: iconMap[type]?.clicked || "./images/Asset/map/Filters/BTSGreen.svg",
                            iconSize: [32, 32],
                            iconAnchor: [16, 16],
                        })
                    );

                    mapRef.current.flyTo([latitude, longitude], 12, {
                        animate: true,
                        duration: 1, // Adjust duration if needed
                    });

                    // Add directional points when needed
                    mapRef.current.once("moveend", () => {
                        markersRef.current.clearLayers(); // Clear existing markers
                        if (type === "MSC") {
                            const directionalBSCs = generateDirectionalPointsWithLines(latitude, longitude, "BSC");
                            addMarkers(directionalBSCs);
                        } else if (type === "BSC" || type === "RNC") {
                            const directionalBTSs = generateDirectionalPointsWithLines(latitude, longitude, "BTS");
                            addMarkers(directionalBTSs);
                        }
                    });
                });

                if (type === 'BTS' || type === 'nodeb' || type === 'enodeb' )
                {
                    if (mapRef.current?.getZoom() < 13) {
                        markersRef.current?.addLayer(marker);
                    } else {
                        marker.addTo(mapRef.current); // Add directly to the map without clustering
                    }
                } else if (type === 'MSC' || type === 'BSC' || type === 'RNC') {
                    // Add unclustered points directly to the map
                    marker.addTo(mapRef.current);
                } else {
                    markersRef.current?.addLayer(marker);
                }

            }
            else
            {
                console.warn(`Invalid point data: `, position);
            }

        });

        markersRef.current.refreshClusters();
    };

    useEffect(() => {
        const handleZoomEnd = () => {
            addMarkers(points);
        };

        if (mapRef.current) {
            mapRef.current.on('zoomend', handleZoomEnd);
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.off('zoomend', handleZoomEnd);
            }
        };
    }, [points]);

    return (
        <div id="map-container" style={{ width: "100%", height: "675px", position: "relative" }} />
    );
};

export default LeafletFilter;
