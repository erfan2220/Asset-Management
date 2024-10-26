//@ts-nocheck
import "./FilterMap.css";
import LeafletFilter from "./leafletPoints/leafletFiltersPoints";
import { useEffect, useState } from "react";


const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;
const SiteMap = ({searchSiteData}) => {
    // Initialize state variables
    const [bscPoints, setBscPoints] = useState([]);
    const [mscPoints, setMscPoints] = useState([]);
    const [sitePoints, setSitePoints] = useState([]);
    const [points, setPoints] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(true);





    useEffect(() => {
        const allPoints =[{
            latitude: parseFloat(searchSiteData?.latitude),
            sitename:searchSiteData?.sitename,
            longitude: parseFloat(searchSiteData?.longitude)
        }];

        setPoints(allPoints);
        console.log("BSCdsaad",allPoints)

    }, [searchSiteData]);


    const findLatLong = (pointsFilter) =>
    {

        const allPoints = searchSiteData.map(point => ({
            latitude: parseFloat(point.latitude),
            sitename:point.sitename,
            longitude: parseFloat(point.longitude)

        }));

        setPoints(allPoints);
        console.log("BSCdsaad",allPoints)
    };


    return (
        <div>
            <div className="map_data_information_base_category">
                <LeafletFilter points={points} />
            </div>
        </div>
    );
};

export default SiteMap;
