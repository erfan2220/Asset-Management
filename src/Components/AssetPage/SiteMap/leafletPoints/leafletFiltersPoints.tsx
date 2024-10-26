//@ts-nocheck
import L from "leaflet";
import {useEffect, useRef, useState} from "react";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from 'react-leaflet-markercluster'
import 'react-leaflet-markercluster/dist/styles.min.css'
import "leaflet.markercluster/dist/leaflet.markercluster";
import "./LeafletMapByFilter.css"
import Rate from "../../../AssetPage/dataCharts/rateColor/Rate";


{/*
const LeafletFilter = (props) => {

        const mapRef = useRef(null);
        const markersRef = useRef<L.MarkerClusterGroup | null>(null);
        console.log("propsleaflet", props)

        useEffect(() => {
            if (!mapRef.current) {
                mapRef.current = L.map("map-container", {
                    center: [35.454339, 51.29135],
                    zoom: 5,
                    scrollWheelZoom: false,
                });

                // Add offline tile layer
                const tileLayerOffline = L.tileLayer(
                    "http://10.15.90.87/tiles/{z}/{x}/{y}.png",
                    {
                        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                        minZoom: 1,
                        maxZoom: 13,
                    }
                );

                tileLayerOffline.addTo(mapRef.current);
            }

            // Add marker


            if (Array.isArray(props.props)) {
                props.props.forEach((position) => {

                    const lat = parseFloat(position.latitude);
                    const lng = parseFloat(position.longitude);


                    if (!isNaN(lat) && !isNaN(lng)) {
                        const customIcon = L.icon({
                            iconUrl: './FilterMap/BSC.svg',
                            iconSize: [32, 32],
                            iconAnchor: [16, 16],
                        });

                        const marker = L.marker([lat, lng], {icon: customIcon}).addTo(mapRef.current);
                    }
                });
            }
        }, [props]);


    return <div id="map-container" style={{ width: "100vw", height: "100vh" }} />;
};*/}


const LeafletFilter = ({ points }: LeafletFilterProps) => {
    const mapRef = useRef<L.Map | null>(null);
    const markersRef = useRef<L.MarkerClusterGroup | null>(null);
    const [siteName,setSiteName]=useState("")
    const [siteData,setSiteData]=useState()

    useEffect(()=>
    {
        if (siteName!="") {
            fetch(`http://10.15.90.87:5001/api/assets/site_profit_margin/${siteName}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setSiteData(data.data);
                })
                .catch(error => {
                    console.error('Error fetching info:', error);
                });
        }
        else {
            setSiteName("")
        }

    },[siteName])

    console.log("pointsfhgtfh",points)

    useEffect(() =>
    {
        if (!mapRef.current) {
            mapRef.current = L.map("map-container", {
                center: [32.74015808, 52.30584163],
                zoom: 6,
                scrollWheelZoom: false,
                zoomControl: false,
            });

            // Add zoom control to a custom position (e.g., bottom-right)
            L.control.zoom({
                position: 'bottomright' // Change to 'topright', 'bottomleft', or 'bottomright'
            }).addTo(mapRef.current);

            const tileLayerOffline = L.tileLayer("http://10.15.90.87/tiles/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                minZoom: 1,
                maxZoom: 13
            });
            tileLayerOffline.addTo(mapRef.current);
        }

        if (!markersRef.current) {
            markersRef.current = L.markerClusterGroup({
                showCoverageOnHover:false
            });
            mapRef.current.addLayer(markersRef.current);
        }

        if (points.length > 0) {
            const markers: L.Marker[] = [];
            points.forEach(position => {
                const { latitude, longitude,sitename } = position;

                if (!isNaN(latitude) && !isNaN(longitude)) {
                    const customIcon = L.icon({
                        iconUrl: "./images/map/FilterMap/BSC.svg",
                        iconSize: [54, 54],
                        iconAnchor: [32, 32]
                    });

                    // const marker = L.marker([latitude, longitude], { icon: customIcon });
                    const marker = L.marker([latitude, longitude], { icon: customIcon }).on('click',()=>{
                        setSiteName(sitename)
                    });
                    markers.push(marker);
                }
            });

            markersRef.current.clearLayers();
            markersRef.current.addLayers(markers);
        }
    }, [points]);

    return <div id="map-container" style={{ width: "100%", height: "675px" ,position:"relative"}} >
        <div className="mapInfoContainer">
            <div className="mapInfoContainerColumns">

            </div>

        </div>

    </div>;
};
export default LeafletFilter;
