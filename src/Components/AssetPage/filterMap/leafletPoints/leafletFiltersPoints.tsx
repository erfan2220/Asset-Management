//@ts-nocheck
import L from "leaflet";
import { useCallback, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet-draw";
import "./LeafletMapByFilter.css";
import { useSharedContext } from "../SharedSiteType/SharedSiteType";

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


    const iconMap: Record<string, string> = {
        BTS: "./images/Asset/map/Filters/BTSGreen.svg",
        BSC: "./images/Asset/map/Filters/BSCGreen.svg",
        MSC: "./images/Asset/map/Filters/MSCGreen.svg",
    };


    useEffect(() => {
        if (!mapRef.current) {
            initializeMap();
        }
        // Re-run marker addition when points update
        if (points.length > 0) {
            addMarkers(points);
        }
    }, [points]);

    const initializeMap = () => {
        mapRef.current = L.map("map-container", {
            center: [32.74015808, 52.30584163],
            zoom: 6,
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
            maxClusterRadius: (zoom) => (zoom >= 13 ? 0 : 80),
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

    const addMarkers = (pointsToShow: Point[]) => {
        if (markersRef.current) {
            markersRef.current.clearLayers();
        }

        pointsToShow.forEach(position => {
            // Ensure position has required properties before destructuring
            if (position && position.latitude != null && position.longitude != null) {
                const { latitude, longitude, sitename, type } = position;

                const customIcon = L.icon({
                    iconUrl: iconMap[type] || "./images/Asset/map/Filters/BTSGreen.svg",
                    iconSize: [32, 32],
                    iconAnchor: [16, 16],
                });

                const marker = L.marker([latitude, longitude], { icon: customIcon });

                marker.on('click', () => {
                    setSiteData({ siteName: sitename, latitude, longitude, type });
                    setSiteNameClicked(sitename);
                    console.log(`Clicked on marker: ${sitename}, Lat: ${latitude}, Long: ${longitude}`);
                });

                if (type === 'BTS' ||type === 'nodeb' ||type === 'enodeb') {
                    if (mapRef.current?.getZoom() < 13) {
                        markersRef.current.addLayer(marker);
                    } else {
                        markersRef.current.addLayer(marker);
                    }
                } else if (type === 'BSC' || type === 'MSC') {
                    markersRef.current.addLayer(marker);
                }
            } else {
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
