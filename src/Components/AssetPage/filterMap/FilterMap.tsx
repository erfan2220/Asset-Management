//@ts-nocheck
import "./FilterMap.css";
import LeafletFilter from "./leafletPoints/leafletFiltersPoints";
import { useEffect, useState } from "react";


const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;
const FilterMap = () => {
    // Initialize state variables
    const [bscPoints, setBscPoints] = useState([]);
    const [mscPoints, setMscPoints] = useState([]);
    const [sitePoints, setSitePoints] = useState([]);
    const [points, setPoints] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(true);


    // Filter items definition
    const Filter_items = [
        { id: 1, name: "Site", url: "./FilterMap/Site.svg" },
        { id: 2, name: "BSC", url: "./FilterMap/BSC.svg" },
        { id: 3, name: "MSC", url: "./FilterMap/MSC.svg" },
        { id: 4, name: "WLL", url: "./FilterMap/province.svg" },
        { id: 4, name: "USO", url: "./FilterMap/BSC.svg" },
    ];




    useEffect(() => {
        const promises = [];

        // Fetch BSC points
        const promise1 = fetchAndCacheData("bsc-list-points", "http://10.15.90.87:5001/api/assets/bsc_list")
            .then(data => {
                    setBscPoints(data.data)

                }
            )
            .catch(error => console.error("Error fetching BSC points:", error));
        promises.push(promise1);

        // Fetch MSC points
        const promise2 = fetchAndCacheData("msc-lists-points", "http://10.15.90.87:5001/api/assets/msc_list")
            .then(
                data => setMscPoints(data.data)
            )
            .catch(error => console.error("Error fetching MSC points:", error));
        promises.push(promise2);

        const promise3 = fetchAndCacheData("site-listsfaaa-points", "http://10.15.90.87:5001/api/assets/sites_location")
            .then(data => {
                    setSitePoints(data.data)
                    console.log("pointssusfhlsdfhl",sitePoints)
                }
            )
            .catch(error => console.error("Error fetching MSC points:", error));
        promises.push(promise3);

        // Wait for all promises to resolve
        Promise.all(promises)
            .then(() => setLoading(false))
            .catch(error => console.error("Error fetching points:", error));
    }, []);

    // Function to fetch and cache data
    async function fetchAndCacheData(cacheKey, apiUrl)
    {
        const cachedData = JSON.parse(localStorage.getItem(cacheKey)) || {};

        if (cachedData.data && Date.now() - cachedData.timestamp < CACHE_EXPIRATION_TIME) {
            return cachedData.data;
        } else {
            const response = await fetch(apiUrl);
            const jsonData = await response.json();
            localStorage.setItem(cacheKey, JSON.stringify({ data: jsonData, timestamp: Date.now() }));
            return jsonData;
        }
    }

    // Function to filter points based on category
    /* const findLatLong = (pointsFilter) => {
         const allPoints = [];

         pointsFilter.forEach(point =>{
             if(point.latitude && point.longitude)
             {

                 allPoints.push([point.latitude,point.longitude]);
             }
         })

         setPoints(allPoints);

     };*/

    const handleItemClick = (itemName) => {
        setSelectedItem(itemName === selectedItem ? null : itemName);
        switch (itemName) {
            case "BSC":
                findLatLong(bscPoints);
                break;
            case "MSC":
                findLatLong(mscPoints);
                break;
            case "Site":
                findLatLong(sitePoints);
                break;
            default:
                break;
        }
    };

    const findLatLong = (pointsFilter) =>
    {

        const allPoints = pointsFilter.map(point => ({
            latitude: parseFloat(point.latitude),
            sitename:point.sitename,
            longitude: parseFloat(point.longitude)

        }));

        setPoints(allPoints);
        console.log("BSC",points)
    };


    return (
        <div>
            <div className="asset_filter_page_header">
                <h2>Layers :</h2>
                {/* Filters based on category */}
                {Filter_items.map((item) => (
                    <div key={item.id}
                         className={`${selectedItem ===item.name ?  "Selected_asset_filter_page_item":"asset_filter_page_item"} `}
                         onClick={() =>handleItemClick(item.name)}>
                        <div className="nameandcount">
                            <div className="asset_filter_page_img">
                                <div className="asset_filter_page_img_border">
                                    <img src={item.url} alt="" />
                                </div>
                            </div>
                            <div className="asset_filter_page_span" >
                                <span>{item.name}</span>
                                {
                                    item.name === "MSC" &&(
                                        <span>{mscPoints.length}</span>
                                    )
                                }
                                {
                                    item.name === "BSC" &&(
                                        <span>{bscPoints.length}</span>
                                    )
                                }
                                {
                                    item.name === "Site" &&(
                                        <span>{sitePoints.length}</span>
                                    )
                                }
                                {
                                    item.name === "Province_sites" &&(
                                        <span>31</span>
                                    )
                                }
                            </div>
                        </div>
                        <div className="buttonFilterAsset1" >
                            <div className={`${selectedItem ===item.name ?  "SelectedbuttonFilterAsset1Off":"buttonFilterAsset1Off"}`}>
                                <div className={`${selectedItem ===item.name ?  "SelectedcircleFilterAsset1":"circleFilterAsset1"}`}>

                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Information based on category */}
            <div className="map_data_information_base_category">
                <LeafletFilter points={points} />
            </div>
        </div>
    );
};

export default FilterMap;
