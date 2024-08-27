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


    useEffect(() =>
    {
        if (!mapRef.current) {
            mapRef.current = L.map("map-container", {
                center: [32.74015808, 52.30584163],
                zoom: 6,
                scrollWheelZoom: false
            });

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
                        iconUrl: "./FilterMap/BSC.svg",
                        iconSize: [32, 32],
                        iconAnchor: [16, 16]
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

    return <div id="map-container" style={{ width: "100vw", height: "100vh" ,position:"relative"}} >
        <div className="mapInfoContainer">
            <div className="mapInfoContainerColumns">

                <div className="siteNameContainer">
                    <img src="./images/LeafletMapByfilter/siteLocation.svg" alt=""/>
                    <span>{siteName}</span>
                </div>

                <div className="leafletMapByFilterItem">
                    <div className="leftData">
                        <h3>Total Profit</h3>
                        {/*<h2>{siteData? siteData[0].total_profit:""}</h2>*/}
                        <h2>{siteData && siteData[0] && siteData[0].total_profit !== undefined ? siteData[0].total_profit : "Data is not available"}</h2>
                    </div>
                    <div className="rightData">
                        <div className="rateContainerLeafletMap">
                            <Rate value="-2"/>
                        </div>
                        <h4>TB</h4>
                    </div>
                </div>

                <div className="leafletMapByFilterItem">
                    <div className="leftData">
                        <h3>Total Margin</h3>
                        {/*<h2>{siteData? siteData[0].total_margin:""}</h2>*/}
                        <h2>{siteData && siteData[0] && siteData[0].total_margin !== undefined ? siteData[0].total_margin : "Data is not available"}</h2>
                    </div>
                    <div className="rightData">
                        <div className="rateContainerLeafletMap">
                            <Rate value="+2"/>
                        </div>
                        <h4>TB</h4>
                    </div>
                </div>

                <div className="leafletMapByFilterItem">
                    <div className="leftData">
                        <h3>Total cost</h3>
                        {/*<h2>{siteData? siteData[0].total_cost:""}</h2>*/}
                        <h2>{siteData && siteData[0] && siteData[0].total_cost !== undefined ? siteData[0].total_cost : "Data is not available"}</h2>
                    </div>
                    <div className="rightData">
                        <div className="rateContainerLeafletMap">
                            <Rate value="+3"/>
                        </div>
                        <h4>Toman</h4>
                    </div>
                </div>

                <div className="leafletMapByFilterItem">
                    <div className="leftData">
                        <h3>Address</h3>
                        <h6>...</h6>
                    </div>

                </div>





            </div>

        </div>

    </div>;
};
export default LeafletFilter;
