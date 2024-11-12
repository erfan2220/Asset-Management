//@ts-nocheck
import React from 'react';
import L from "leaflet";
import { useCallback, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet-draw";
import "./TechChooser.css";
import { useSharedContext } from "../SharedSiteType/SharedSiteType";


// Define the Point interface
interface Point {
    latitude: number;
    longitude: number;
    sitename: string;
    tech: string;
    type: '2G' | '3G' | '4G' | '5G' ;
}

const TechChooser : React.FC<{ points: Point[],setPoints: (points: Point[]) => void, setSiteNameClicked: (siteName: string) => void }> = ({ points,setPoints, setSiteNameClicked }) =>
{

    const mapRef = useRef<L.Map | null>(null);
    const markersRef = useRef<L.MarkerClusterGroup | null>(null);
    const drawnItems = useRef<L.FeatureGroup>(new L.FeatureGroup()).current;
    const { setSiteData } = useSharedContext();


    const iconMap: Record<string, string> = {
        '2G': "./images/Asset/map/Filters/BTSGreen.svg",
        '3G': "./images/Asset/map/Filters/BTSGreen.svg",
        '4G': "./images/Asset/map/Filters/BTSGreen.svg",
        '5G': "./images/Asset/map/Filters/BTSGreen.svg",
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

        mapRef.current.on('zoomend', () => {
            addMarkers(points);
        });
    };



    const filterMarkersInPolygon = useCallback((polygonLayer) => {
        // const polygonLatLngs = polygonLayer.getLatLngs()[0];
        // const polygon = L.polygon(polygonLatLngs);

        const polygon = L.polygon(polygonLayer.getLatLngs()[0]);

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

        const zoomLevel = mapRef.current?.getZoom() ?? 0;


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

                marker.on('click', () =>
                {
                    setSiteData({ siteName: sitename, latitude, longitude, type });
                    setSiteNameClicked(sitename);



                });


                    if (zoomLevel < 13) {
                        markersRef.current?.addLayer(marker);
                    } else {
                        marker.addTo(mapRef.current); // Add directly to the map without clustering
                    }


            }


        });

        markersRef.current.refreshClusters();
    };




    // useEffect(() => {
    //     const handleZoomEnd = () => {
    //         if (mapRef.current.getZoom() < 13) {
    //             if (markersRef.current) {
    //                 markersRef.current.addTo(mapRef.current); // Clustered markers at low zoom
    //             }
    //         } else {
    //             mapRef.current.eachLayer((layer) => {
    //                 if (layer instanceof L.Marker && layer !== markersRef.current) {
    //                     mapRef.current.removeLayer(layer);
    //                 }
    //             });
    //             markersRef.current?.clearLayers();
    //             addMarkers(points); // Non-clustered markers at high zoom
    //         }
    //     };
    //
    //     // if (mapRef.current) {
    //     //     mapRef.current.on('zoomend', handleZoomEnd);
    //     // }
    //     //
    //     // return () => {
    //     //     mapRef.current?.off('zoomend', handleZoomEnd);
    //     // };
    // }, [points]);

    useEffect(() => {
        const handleMapMove = () => {
            if (!mapRef.current) return;

            const bounds = mapRef.current.getBounds();
            const visiblePoints = points.filter(point =>
                point && point.latitude !== undefined && point.longitude !== undefined && bounds.contains([point.latitude, point.longitude])
            );

            setPoints(visiblePoints);
        };

        if (mapRef.current) {
            mapRef.current.on('moveend', handleMapMove);
        }

        return () => {
            mapRef.current?.off('moveend', handleMapMove);
        };
    }, [points]);

    return (
        <div id="map-container" style={{ width: "100%", height: "675px", position: "relative" }} />
    );
};

export default TechChooser;