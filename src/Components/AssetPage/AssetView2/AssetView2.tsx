import React, {useState} from 'react';
import FilterMap from "../filterMap/FilterMap";
import {
    mapData as initialMapData,
    mapDataIran as initialMapDataIran
} from "../../../database/IranMapWrapperData/mapData";
import "./Asset.css"
const AssetView2 = () =>
{
    const [activeIndex,setActiveIndex]=useState(2)
    const [data, setData] = useState(null);
    const [dataPerProvince, setDataPerProvince] = useState(null);
    const [provinceName, setProvinceName] = useState("");
    const [cityName,setCityName]=useState("")
    const [  selectedProvince,setSelectedProvince] = useState("")
    const [sitePoints, setSitePoints] = useState([]);
    const [pupop,setPupop]=useState(false)
    const [loading,setLoading]=useState(false)
    const [totalTraffic,setTotalTraffic]=useState(null)
    const [totalCount,setTotalCount]=useState(null)
    const [cellsCount,setCellsCount]=useState(null)
    const [cityCount,setCityCount]=useState(null)
    const [cityCountSelected,setCityCountSelected]=useState(null)
    const [totaldata,setTotaldata]=useState(null)
    const [cellsSitePerProvince,setCellsSitePerProvince]=useState(null)

    const [dataCountry,setDataCountry]=useState(null)
    const [siteTypesOpen,setSiteTypesOpen]=useState(false)
    const [activeTab,setActiveTab]=useState(1)
    const [showSites,setShowSites]=useState(false)
    const[mapPopup,setMapPopup]=useState(false)
    const [activeMapState,setActiveMapState]=useState(1)
    const [mapProvincesData, setMapProvincesData] = useState(initialMapData);
    const [groupDictionary,setGroupDictionary]=useState()
    const [mapIranData, setMapIranData] = useState(initialMapDataIran);
    const [timeInterval, setTimeInterval] = useState("CS");
    const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;
    return (
        <div>
                    {/*<FilterMap/>*/}
        </div>
    );
};

export default AssetView2;