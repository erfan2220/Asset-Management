//@ts-nocheck
import "./FilterMap.css";
import LeafletFilter from "./leafletPoints/leafletFiltersPoints";
import { useEffect, useState } from "react";
import {useSharedContext} from "./SharedSiteType/SharedSiteType";
import axios from "axios";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import LoadingProgress from "../../Loading/Loading";


const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;
const FilterMap = ({itemName,tech}) =>
{
    // Initialize state variables
    const [bscPoints, setBscPoints] = useState([]);
    const [mscPoints, setMscPoints] = useState([]);
    const [sitePoints, setSitePoints] = useState([]);
    const [points, setPoints] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [type,setType]=useState("")

    const [apiTech,setApiTech]=useState("http://10.15.90.72:9098/api/report/asset/category/technology/2G?size=98270")
    const [loading, setLoading] = useState(true);

    console.log("tech",tech)
    // Filter items definition
    const Filter_items = [
        { id: 1, name: "Site", url: "./FilterMap/Site.svg" },
        { id: 2, name: "BSC", url: "./FilterMap/BSC.svg" },
        { id: 3, name: "MSC", url: "./FilterMap/MSC.svg" },
        { id: 4, name: "WLL", url: "./FilterMap/province.svg" },
        { id: 4, name: "USO", url: "./FilterMap/BSC.svg" },
    ];

    useEffect(() => {
        if (tech.tech === "2G" && tech.type === "BTS") {
            console.log("2G")
            setApiTech("http://10.15.90.72:9098/api/report/asset/category/technology/2G?size=98270");
        } else if (tech.tech === "3G" && tech.type === "nodeb") {
            console.log("3G")
            setApiTech("http://10.15.90.72:9098/api/report/asset/category/technology/3G?size=189537");
        } else if (tech.tech === "4G" && tech.type === "enodeb") {
            console.log("4G")
            setApiTech("http://10.15.90.72:9098/api/report/asset/category/technology/4G?size=98270");
        }
        else if ( tech.type === "RNC" || tech.type === "BSC" ) {
            console.log("4G")
            setApiTech("http://10.15.90.87:5001/api/assets/bsc_list");
        }
        else if ( tech.type === "MSC") {
            console.log("4G")
            setApiTech("http://10.15.90.87:5001/api/assets/msc_list");
        }
    }, [tech]);

    useEffect(() => {
        if(apiTech)
        {
            setLoading(true);
            axios.get(apiTech).then(
                (response)=>{
                    if(tech.type === "MSC" || tech.type === "RNC" || tech.type === "BSC")
                    {
                        setSitePoints(response.data)
                        console.log("response.data.content",response.data.data)
                        handleItemClick(tech.type,response.data.data);
                    }
                    else
                    {
                        setSitePoints(response.data.content)
                        console.log("response.data.content",response.data.content)
                        handleItemClick(tech.type,response.data.content);
                    }
                    setLoading(false)

                },(error)=>
                {
                    console.log(error);
                    setLoading(false);
                }
            )
        }
    }, [apiTech]);


    // useEffect(() =>
    // {
    //
    //     console.log("sitepppoins",sitePoints)
    //
    //     // Call handleItemClick after sitePoints updates to ensure data is loaded
    //     if (sitePoints.length > 0) {
    //         handleItemClick(tech.type);
    //     }
    //
    // }, [ sitePoints]);

        const handleItemClick = (itemName,sitepoints) =>
        {
            console.log("sitepppoins2333",sitepoints)
            // setSelectedItem(itemName === selectedItem ? null : itemName);
            setType(itemName)
            findLatLong(sitepoints);
        }



    const findLatLong = (pointsFilter) =>
    {

        console.log("sitepppoins3",pointsFilter)
        const allPoints = pointsFilter.map(point => ({
            latitude: parseFloat(point.latitude),

            longitude: parseFloat(point.longitude),
            sitename: tech.type === "MSC" || tech.type === "RNC" || tech.type === "BSC"
                ? point.code_site
                : point.assetName,

        }));

        setPoints(allPoints);
    };



    return (
        <div>
            {loading ? <LoadingProgress/> :
                <div className="map_data_information_base_category">
                    <LeafletFilter points={points} type={type}/>
                </div>
            }
        </div>
    );
};

export default FilterMap;
