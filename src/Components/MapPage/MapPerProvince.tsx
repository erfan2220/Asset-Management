//@ts-nocheck
import { useEffect, useRef, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { cityMapping } from "../../database/dictionaryProvinces/cityMapping";
import { provinceMapping2 } from "../../database/dictionaryProvinces/provinceMapping";
import L from "leaflet";
import 'react-leaflet-markercluster/dist/styles.min.css';
import "leaflet.markercluster/dist/leaflet.markercluster";
import "./LeafletMapByFilter.css";
import LoadingProgress from "../Loading/Loading";
import debounce from 'lodash.debounce';


// Fetch points from the API
const fetchPoints = async ({ queryKey }) =>
{

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
    const [loading,setLoading] = useState(false);
    const [isPolygonDrawn, setIsPolygonDrawn] = useState(false);
    const drawnItems = useRef<L.FeatureGroup>(new L.FeatureGroup()).current;
    const [nearestSiteData,setNearestSiteData] = useState({
        revenue:0,
        cost:0,
        profit:0,
        margin:0
    });

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
        const R = 6371;
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


    const fetchSiteData = async (siteName) => {
        try {
            const response = await fetch(`http://10.15.90.72:9098/api/financial-state/site/${siteName}?date=2024-11-24`);
            if (!response.ok) throw new Error(`Failed to fetch data for siteName: ${siteName}`);
            return await response.json();
        } catch (error) {
            console.error(`Error fetching data for ${siteName}:`, error);
            return { revenue: 0, cost: 0, profit: 0, margin: 0 }; // Default or fallback data
        }
    };


    const getTogetherSites =(nearestSite)=>
    {
        console.log("nearestSite",nearestSite)
        const aggregatedData = nearestSite.reduce((acc, site) => ({
            revenue: acc.revenue + site.revenue,
            cost: acc.cost + site.cost,
            profit: acc.profit + site.profit,
            margin: acc.margin + site.margin
        }), { revenue: 0, cost: 0, profit: 0, margin: 0 });

        console.log("aggregatedData",aggregatedData)

        setNearestSiteData(aggregatedData);

    }

    const handleMarkerClick = async (latitude, longitude, siteName) =>
    {

        if (mapRef.current) {
            mapRef.current.dragging.disable(); // Disable dragging during loading
            mapRef.current.scrollWheelZoom.disable(); // Disable zooming
        }

        setSiteNameClicked(siteName);
        showPopup(latitude, longitude, siteName);

        const nearestPoints = allPoints
            .map((point) => ({
                ...point,
                distance: calculateDistance(latitude, longitude, point.latitude, point.longitude),
            }))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 11);

        setFilterPoints(nearestPoints);
        setLoading(true);

        try{
            const fetchedDataPromises = nearestPoints.map((point) => fetchSiteData(point.siteName));

            const fetchedData = await Promise.all(fetchedDataPromises);

            const validData = fetchedData.filter(data => data !== null);

            if (validData.length > 0) {
                // Process only after all valid data has arrived
                getTogetherSites(validData);
            } else {
                console.warn("No valid data received for nearest points");
            }


        }
        catch(error){
            console.log("Error fetching nearest points data:",error);
        }
        finally {
            setLoading(false); // Stop loading once all data is fetched
        }


    };

    // Update markers on the map
    const updateMapMarkers = useCallback((displayPoints) => {
        if (!markersRef.current) return;

        markersRef.current.clearLayers();
        mapRef.current.invalidateSize();

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
        if (!isLoading && mapRef.current && markersRef.current) {
            updateMapMarkers(filterPoints.length > 0 ? filterPoints : allPoints);
        }
    }, [filterPoints, updateMapMarkers]);

    const removeDuplicatePoints = (points) => {
        const seen = new Set();
        return points.filter((point) => {
            const isDuplicate = seen.has(point.siteName); // or use point.latitude, point.longitude if you prefer
            seen.add(point.siteName); // or use point.latitude, point.longitude
            return !isDuplicate;
        });
    };
    useEffect(() =>
    {
        if (points.length > 0)
        {
            const uniquePoints = removeDuplicatePoints(points);
            setAllPoints(uniquePoints);
        }
    }, [points]);


    console.log("allPoints1",points)

    const filterMarkersInPolygon = useCallback((polygonLayer,points2) =>
    {
        if (!points2 || points2.length === 0) {
            console.warn("No points available to filter.");
            return;
        }

        const polygonLatLngs = polygonLayer.getLatLngs();
        const polygon = L.polygon(polygonLatLngs);

        // const pointsWithinPolygon = points.filter(point => {
        //     const pointMarker = L.marker([point.latitude, point.longitude]);
        //     return isMarkerInsidePolygon(pointMarker, polygon);
        // });

        const pointsWithinPolygon = points2.filter(point => {
            if (!point || point.latitude === undefined || point.longitude === undefined) {
                console.warn("Invalid point:", point);
                return false;
            }
            const pointMarker = L.marker([point.latitude, point.longitude]);
            return isMarkerInsidePolygon(pointMarker, polygon);
        });

        setFilterPoints(pointsWithinPolygon)
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

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.on("zoomend", () => {
                console.log("Current Zoom Level:", mapRef.current.getZoom());
            });
        }
    }, []);

    // Map setup and marker clustering
    useEffect(() => {
        console.log("allPoints5",points)
        if (!isLoading && !mapRef.current) {
            mapRef.current = L.map("map-container", {
                center: [32.74015808, 52.30584163],
                attributionControl: false,
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





            if (!markersRef.current) {
                markersRef.current = L.markerClusterGroup({
                    showCoverageOnHover: false,
                    // maxClusterRadius: zoom => (zoom >= 14 ? 0 : 80),
                });
                mapRef.current.addLayer(markersRef.current);



                // mapRef.current.on('zoomend', () => {
                //     addMarkers(points);
                // });
            }

        }

        console.log("allPoints2",points)

        if (!mapRef.current._drawControlInitialized) {
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
                    featureGroup: drawnItems,
                    remove: true
                }
            });
            mapRef.current.addControl(drawControl);
            mapRef.current._drawControlInitialized = true; // Flag to prevent re-initialization
        }


        mapRef.current.on(L.Draw.Event.CREATED, (e) => {
            const layer = e.layer;
            drawnItems.addLayer(layer);
            filterMarkersInPolygon(e.layer,points);
        });


        if (!markersRef.current) {
            markersRef.current = L.markerClusterGroup({
                showCoverageOnHover: false,
                maxClusterRadius: zoom => (zoom >= 14 ? 0 : 80),
            });
            mapRef.current.addLayer(markersRef.current);
            mapRef.current.addLayer(drawnItems);



            // mapRef.current.on('zoomend', () => {
            //     addMarkers(points);
            // });
        }

        const displayPoints = filterPoints.length > 0 ? filterPoints : allPoints;
        if (displayPoints.length > 0) updateMapMarkers(displayPoints);
    }, [isLoading,updateMapMarkers]);

    // if (error) return <div>Error fetching data</div>;

    return <div>{loading &&<LoadingProgress/>}
             <div id="map-container" style={{ width: "100%", height: "700px", zIndex: 0 }}>
                 {/*{ !loading &&*/}
                 {/*    <div className="bg-white w-[150px] h-[150px] rounded-[4px] absolute top-1/2 left-[50px] tenSitePopup">*/}
                 {/*        <p>10 site Data</p>*/}
                 {/*        <p>Revenue: {nearestSiteData.revenue}</p>*/}
                 {/*        <p>Cost: {nearestSiteData.cost}</p>*/}
                 {/*        <p>Profit: {nearestSiteData.profit}</p>*/}
                 {/*        <p>Margin: {nearestSiteData.margin}</p>*/}
                 {/*    </div>*/}
                 {/*}*/}

             </div>
    </div>
};

export default MapPerProvince;
