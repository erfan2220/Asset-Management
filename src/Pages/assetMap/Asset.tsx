//@ts-nocheck
import React, {useEffect, useRef, useState} from "react";
import Rate from "../../Components/AssetPage/dataCharts/rateColor/Rate"
import FilterMap from "../../Components/AssetPage/filterMap/FilterMap";
import {motion} from "framer-motion"
import "./Asset.css"
import { mapData as initialMapData, mapDataIran as initialMapDataIran } from "../../database/IranMapWrapperData/mapData.ts";
import {provinceNameVariations} from "../../database/dictionaryProvinces/dictionaryProvinces.ts";
import {provinceMapping} from "../../database/dictionaryProvinces/provinceMapping"
import Filters from "../../Components/AssetMap/Filters/Filters";
import AssetView2 from "../../Components/AssetPage/AssetView2/AssetView2";
import ActiveTab1Country from "../../Components/AssetPage/AssetView1/ActiveTab1Country/ActiveTab1Country";
import { DateObject} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {Shamsi} from "basic-shamsi";
import SiteMap from "../../Components/AssetPage/SiteMap/FilterMap";
import {useSharedContext} from "../../Components/AssetPage/filterMap/SharedSiteType/SharedSiteType";
import SitaData from "../../Components/AssetPage/AssetView1/sitaData/SitaData";
import { t } from "../../translationUtil";
import Cookies from 'js-cookie';
import ActiveTab2Country from "../../Components/AssetPage/AssetView1/ActiveTab2Country/ActiveTab2Country";
import TechMap from "../../Components/AssetPage/AssetView3/TechMap";
import ProvinceData from "../../Components/AssetPage/AssetView1/ProvinceData/ProvinceData";


const Assets = () =>
{
    const isRTL = Cookies.get('language') === 'fa';
    const [data, setData] = useState(null);
    const [dataPerProvince, setDataPerProvince] = useState(null);
    const [provinceName, setProvinceName] = useState("");
    const [cityName,setCityName]=useState("")
    const [selectedProvince,setSelectedProvince] = useState("")
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


    const [siteNameClicked,setSiteNameClicked]=useState(null)


    const [tech,setTech]=useState([{
        type:"",
        tech:""
    }])

    const [techLayer,setTechLayer]=useState([])
    const [techNames,setTechNames]=useState([])


    const {siteData}=useSharedContext()

    const [itemName,setItemName]=useState("")

    const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;

    const [view,setView]=useState(1)
    const [provinceConvertorData,setProvinceConvertorData]=useState([])
    const [values, setValues] = useState([
        new DateObject({ calendar: persian, locale: persian_fa })
    ]);



    const [daysDates,setDaysDates]=useState([])


    const [calenderSelection,setCalenderSelection]=useState(1)

    const [calenderOpen,setCalenderOpen]=useState(false)

    const calenderRef=useRef()


    const onMapRef=useRef()

    const convertPersianToEnglish = (persianStr) => {
        const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        return persianStr.replace(/[۰-۹]/g, (char) => englishNumbers[persianNumbers.indexOf(char)]);
    };

    const convertToMiladi = (shamsiDateStr) => {
        // Convert Persian numerals to English before validating and converting
        const englishDateStr = convertPersianToEnglish(shamsiDateStr);

        // Check if the Shamsi date string is valid
        const isValid = Shamsi.isValid(englishDateStr);

        if (isValid) {
            // Convert the valid Shamsi date string to Miladi (Gregorian)
            const gregorianDate = Shamsi.toMiladi(englishDateStr);

            return gregorianDate; // Return the Miladi date
        } else {
            return null; // Return null if the input is invalid
        }
    };

    const handleDateChange = (dates) =>
    {

        setValues(dates);

        const persianDates = dates.map(date => date.format("YYYY/MM/DD"));


        const miladiDates = persianDates.map(date => convertToMiladi(date));

        console.log("Persian Dates:", persianDates);
        console.log("Miladi (Gregorian) Dates:", miladiDates);

        setDaysDates(miladiDates)


    };

    const [technologyIndex,setTechnologyIndex]=useState(0)
    const [technologyLayer,setTechnologyLayer]=useState([0])
    const [searchCode,setSearchCode]=useState(null)
    const [searchSiteData,setSearchSiteData]=useState(null)


    async function fetchAndCacheData(cacheKey, apiUrl)
    {
        const cachedData = JSON.parse(localStorage.getItem(cacheKey)) || {};

        if (cachedData.data && Date.now() - cachedData.timestamp < CACHE_EXPIRATION_TIME)
        {
            return cachedData.data;
        }
        else {
            const response = await fetch(apiUrl);
            const jsonData = await response.json();
            localStorage.setItem(cacheKey, JSON.stringify({data: jsonData, timestamp: Date.now()}));
            return jsonData;
        }
    }

    const getCanonicalProvinceName = (provinceName) => {
        for (const groupObj of provinceNameVariations) {
            const variations = Object.values(groupObj)[0];
            if (variations.some(variation => variation.toLowerCase() === provinceName.toLowerCase())) {
                return variations[0]; // Return the first variation as the canonical name
            }
        }
        return provinceName; // Return the original name if no match found
    };

    const normalizedMapDataIran = {};
    for (const key in initialMapDataIran) {
        if (initialMapDataIran.hasOwnProperty(key)) {
            const normalizedKey = key.toLowerCase().replace(/\s+/g, '');
            normalizedMapDataIran[normalizedKey] = initialMapDataIran[key];
        }
    }

    const getCanonicalProvinceName2 = (provinceName) => {
        const normalizedProvinceName = provinceName.toLowerCase().replace(/\s+/g, '');

        for (const groupObj of provinceNameVariations) {
            const variations = Object.values(groupObj)[0];
            const normalizedVariations = variations.map(variation => variation.toLowerCase().replace(/\s+/g, ''));


            if (normalizedVariations.includes(normalizedProvinceName)) {
                for (const variation of variations) {
                    const normalizedVariation = variation.toLowerCase().replace(/\s+/g, '');

                    if (normalizedMapDataIran.hasOwnProperty(normalizedVariation)) {
                        // return { canonicalName: variation, csValue: normalizedMapDataIran[normalizedVariation] };
                        return normalizedVariation;
                    }
                }
            }
        }
        console.log(`No match found for: ${provinceName}`);
        return false;
    };


    useEffect(() => {
        const promises = [];

        // Function to safely handle and skip invalid data
        const handleData = (data, setter) => {
            if (data) {
                setter(data); // If data is valid, set the state
            }
        };

        const promise1 = fetchAndCacheData("sites_count_cache", "http://10.15.90.87:5001/api/assets/sites_count_per_province")
            .then(data => handleData(data, setTotalCount))
            .catch(error => console.error("Error fetching sites count per province data:", error));

        promises.push(promise1);

        const promise2 = fetchAndCacheData("cells_count_cache_datatat", "http://10.15.90.87:5001/api/assets/cells_count_per_province")
            .then(data => handleData(data, setCellsCount))
            .catch(error => console.error("Error fetching cells count per province data:", error));

        promises.push(promise2);

        const promise3 = fetchAndCacheData("cities_per_province_cache", "http://10.15.90.87:5001/api/assets/cities")
            .then(data => handleData(data, setCityCount))
            .catch(error => console.error("Error fetching cities per province data:", error));

        promises.push(promise3);

        const promise4 = fetchAndCacheData("traffic_per_province_cache", "http://10.15.90.87:5001/api/assets/traffic_per_province")
            .then(data => handleData(data, setTotalTraffic))
            .catch(error => console.error("Error fetching traffic per province data:", error));

        promises.push(promise4);

        const promise5 = fetchAndCacheData("traffic_per_all_country", "http://10.15.90.87:5001/api/assets/traffic_total")
            .then(data => handleData(data, setTotaldata))
            .catch(error => console.error("Error fetching traffic per province data:", error));

        promises.push(promise5);

        const promise6 = fetchAndCacheData("sites_count_per_country", "http://10.15.90.87:5001/api/assets/sites_count_per_tech")
            .then(data => handleData(data, setData))
            .catch(error => console.log(error));

        promises.push(promise6);

        const promise7 = fetchAndCacheData("cell_counts_per_all_country", "http://10.15.90.87:5001/api/assets/cells_count")
            .then(data => handleData(data, setCellsSitePerProvince))
            .catch(error => console.log(error));

        promises.push(promise7);

        const promise8 = fetchAndCacheData("data_country", "http://10.15.90.87:5001/api/assets/total_profit_margin")
            .then(data => handleData(data, setDataCountry))
            .catch(error => console.log(error));

        promises.push(promise8);

        const promise9 = fetchAndCacheData("data_country", "http://10.15.90.72:9098/api/map/Site/province-count")
            .then(data => handleData(data, setDataCountry))
            .catch(error => console.log(error));

        promises.push(promise9);

        // Wait for all promises to resolve
        Promise.all(promises)
            .then(() => setLoading(true)) // Set loading to false once all data is fetched
            .catch(error => console.error("Error in one of the promises:", error)); // Handle any errors in the promises

    }, []);

    const getMapDataForProvince = (provinceName) => {
        const mappedProvince = provinceMapping[provinceName];
        if (mappedProvince) {
            return initialMapData[mappedProvince];  // Access the correct province in mapDataIran
        } else {
            console.error(`No matching data for province: ${provinceName}`);
            return null;
        }
    };


    useEffect(() => {
        fetch(`http://10.15.90.72:9098/api/map/Site/province-count`)
            .then(response => {
                if (!response.ok) {
                    // throw new Error('Network response was not ok');
                }
                return response.json(); // Convert response to JSON
            })
            .then(data => {
                setProvinceConvertorData(data);
                console.log("Data Convertor:", data);
            })
            .catch(error => {
                // Handle errors
                console.error('Error fetching data:', error);
            });

    }, []);



    useEffect(()=> {

        if (provinceName !== "")
        {
            const canonicalProvinceName = getCanonicalProvinceName(provinceName);


            fetch(`http://10.15.90.87:5001/api/assets/province_profit_margin/${canonicalProvinceName}`)
                .then(response => {
                    if (!response.ok) {
                        // throw new Error('Network response was not ok');
                    }
                    return response.json(); // Convert response to JSON
                })
                .then(data => {
                    setDataPerProvince(data.data[0]);
                })
                .catch(error => {
                    // Handle errors
                    console.error('Error fetching data:', error);
                });


            fetch("http://10.15.90.87:5001/api/assets/sites_location")
                .then((res) => {
                    if (!res.ok) {
                        // throw new Error("Failed to fetch");
                    }
                    return res.json();
                })
                .then((res) => {
                    setSitePoints(res.data); // Assuming data is an array of site points
                })
                .catch((error) => {
                    alert("Data is not available");
                });
        }

    },[provinceName])

    const numberFormatter = new Intl.NumberFormat('en-US', {
        style: 'decimal',

    });
    const format = (number)=>
    {
        const formattedNumber = numberFormatter.format(number);
        return formattedNumber;
    }



    const filter_cells= (province)=>
    {
        const groupDictionary: { [key: string]: string[] } = {};

        const filterItems = cellsCount.cells_count.filter(item => {
            const groupKey = compareProvinceNames(item.province, province);

            if (groupKey) {
                if (!groupDictionary[groupKey]) {
                    groupDictionary[groupKey] = [];
                }
                groupDictionary[groupKey].push(item.province);

                return true;
            }
            return false;
        });



        const totalcount = filterItems.reduce((acc, curr) => acc + curr.count, 0);
        return totalcount;
    }




    const handleTab=(index)=>
    {
        setActiveTab(index)
    }


    const handleBackMap =()=>
    {
        setPupop(false)
        setSiteNameClicked(null)
        if(provinceName !=="" && cityName !=="")
        {
            setCityName("")
        }
        else if(provinceName !=="" && cityName ==="")
        {
           setProvinceName("")
        }
        // if( cityName !=="")
        // {
        //     setCityName("")
        // }
        // if( cityName === "")
        // {
        //     setProvinceName("")
        // }
    }
    const selectProvinceHandler = (province) =>
    {
        setProvinceName(province.name)
        setSelectedProvince(province.name);
        setPupop(true)
    }

    const selectProvinceHandler2 = (province) =>
    {
          setPupop(true)
    }




    const fetchProvinceProfitMargin=async (provinceName)=>
    {

        try
        {
            const response=await  fetch(`http://10.15.90.87:5001/api/assets/province_profit_margin/${canonicalProvinceName}`)

            if (!response.ok)
            {
                throw new Error('Network response was not ok');
            }

            const data=await response.json();

            console.log("daaatatata",data);

            return data.data[0];
        }
        catch (error)
        {
            console.log("Error fetching data:",error)
            return false;
        }
    }

    const fetchAllProvincesData = async () => {
        const provinceNames = provinceNameVariations.flatMap(group => Object.values(group)[0]);

        const canonicalProvinceNames = [...new Set(provinceNames.map(name => getCanonicalProvinceName(name)))];

        const allProvincesData = await Promise.all(canonicalProvinceNames.map(province => fetchProvinceProfitMargin(province)));

        console.log("prroroorovinces",canonicalProvinceNames)

        // Filter out any null results (in case of fetch errors)

        return allProvincesData.filter(data => data !== null);
    };



    const handleSearchClick=()=>
    {


        if(searchCode !=="")
        {
            fetch(`http://10.15.90.72:9098/api/inventory/site/${searchCode}`)
                .then(response => {
                    if (!response.ok) {
                        // throw new Error('Network response was not ok');
                    }
                    return response.json(); // Convert response to JSON
                })
                .then(data => {
                    if (data.content && data.content.length > 0) {
                        setSearchSiteData(data.content[0]); // Store the found data
                    } else {
                        // Show an alert or message for no results
                        alert("No results found for the provided search code.");
                        setSearchSiteData([]); // Clear previous search data if needed
                    }
                })
                .catch(error => {
                    // Handle errors
                    console.error('Error fetching data:', error);
                });
        }

    }

    const handleSearchCodes=(value)=>
    {
        setSearchCode(value)
    }



    console.log("tech",tech)

    const capitalizeFirstLetter=(item:string)=>
    {
        return String(item).charAt(0).toUpperCase() + String(item).slice(1);
    }


    return(
        <div className="Assets_container">

            <div className="Assets-map-2">
                <div>
                    <div>
                        <div className={`Assets_header ${isRTL ? 'rtl' : ''}`}>
                            <h2>{t("Assets/Network")}</h2>
                        </div>
                        <div className={"flex flex-row items-center justify-between"}>
                                {/*<h2 className= "font-[600] text-[20px] text-[#424242]">{t("Province & City View")}</h2>*/}

                                <div>
                                    <h2 className="font-[600] text-[20px] text-[#424242] ">
                                        {
                                            view === 1 &&
                                            <nav className="bg-grey-light w-full rounded-md">
                                                <ol className="list-reset flex">
                                                    <li>
                                                        <a href="#"
                                                            className="text-primary transition duration-150 ease-in-out hover:text-primary-accent-300 focus:text-primary-accent-300 active:text-primary-accent-300 motion-reduce:transition-none dark:text-primary-400"
                                                        >RAN</a>
                                                    </li>
                                                    <li>
                                                        <span className="mx-2 text-neutral-400">&gt;</span>
                                                    </li>
                                                    <li>
                                                        <a href="#"
                                                            className="text-primary transition duration-150 ease-in-out hover:text-primary-accent-300 focus:text-primary-accent-300 active:text-primary-accent-300 motion-reduce:transition-none dark:text-primary-400"
                                                        >IRAN</a>
                                                    </li>
                                                    <li>
                                                        {provinceName &&
                                                            <span className="mx-2 text-neutral-400">&gt;</span>}
                                                    </li>
                                                    <li className="text-neutral-400">{provinceName}</li>
                                                    <li>
                                                        {cityName && <span className="mx-2 text-neutral-400">&gt;</span>}
                                                    </li>
                                                    <li className="text-neutral-400">{cityName}</li>

                                                    <li>
                                                        {siteNameClicked &&
                                                            <span className="mx-2 text-neutral-400">&gt;</span>}
                                                    </li>

                                                    <li className="text-neutral-400">{siteNameClicked}</li>

                                                </ol>
                                            </nav>}
                                    </h2>
                                    <h2 className="font-[600] text-[20px] text-[#424242] ">
                                        {
                                            view === 2 &&
                                            <nav className="bg-grey-light w-full rounded-md">
                                                <ol className="list-reset flex">
                                                    <li>
                                                        <a href="#"
                                                            className="text-primary transition duration-150 ease-in-out hover:text-primary-accent-300 focus:text-primary-accent-300 active:text-primary-accent-300 motion-reduce:transition-none dark:text-primary-400"
                                                        >RAN</a>
                                                    </li>
                                                    <li>
                                                        <span className="mx-2 text-neutral-400">&gt;</span>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className="text-primary transition duration-150 ease-in-out hover:text-primary-accent-300 focus:text-primary-accent-300 active:text-primary-accent-300 motion-reduce:transition-none dark:text-primary-400"
                                                        >Topology</a>
                                                    </li>
                                                    {tech.length > 0 && <span className="mx-2 text-neutral-400">&gt;</span>}

                                                    <li className="flex items-center text-neutral-400">
                                                        {tech?.map((item, index) => (
                                                            <React.Fragment key={index}>
                                                                {item.tech}
                                                                {index < tech.length - 1 && (
                                                                    <span className="mx-2 text-neutral-400">,</span>
                                                                )}
                                                            </React.Fragment>
                                                        ))}
                                                    </li>

                                                    {tech.length > 0 && <span className="mx-2 text-neutral-400">&gt;</span>}

                                                    <li className="flex items-center text-neutral-400">
                                                        {tech?.map((item, index) => (
                                                            <React.Fragment key={index}>
                                                                {item.type}
                                                                {index < tech.length - 1 && (
                                                                    <span className="mx-2 text-neutral-400">,</span>
                                                                )}
                                                            </React.Fragment>
                                                        ))}
                                                    </li>

                                                    {siteNameClicked && <span className="mx-2 text-neutral-400">&gt;</span>}

                                                    {siteNameClicked && (
                                                        <li className="text-neutral-400">{siteNameClicked}</li>
                                                    )}
                                                </ol>
                                            </nav>
                                        }

                                    </h2>
                                    <h2 className="font-[600] text-[20px] text-[#424242] ">
                                        {
                                            view === 3 &&
                                            <nav className="bg-grey-light w-full rounded-md">
                                                <ol className="list-reset flex">
                                                    <li>
                                                        <a href="#" className="text-primary transition duration-150 ease-in-out hover:text-primary-accent-300 focus:text-primary-accent-300 active:text-primary-accent-300 motion-reduce:transition-none dark:text-primary-400"
                                                        >RAN</a>
                                                    </li>
                                                    <li>
                                                        <span className="mx-2 text-neutral-400">&gt;</span>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className="text-primary transition duration-150 ease-in-out hover:text-primary-accent-300 focus:text-primary-accent-300 active:text-primary-accent-300 motion-reduce:transition-none dark:text-primary-400"
                                                        >Technology</a>
                                                    </li>
                                                    <li>
                                                        {tech.length > 0 &&
                                                            <span className="mx-2 text-neutral-400">&gt;</span>}
                                                    </li>
                                                    {/* <li class="text-neutral-400">{tech[1]?.type}</li> */}

                                                    <li className="flex items-center text-neutral-400">
                                                        {tech?.map((item, index) => (
                                                            <React.Fragment key={index}>
                                                                {item.type}
                                                                {index < tech.length - 1 && (
                                                                    <span className="mx-2 text-neutral-400">,</span>
                                                                )}
                                                            </React.Fragment>
                                                        ))}
                                                    </li>
                                                    <li>
                                                        {siteNameClicked &&
                                                            <span className="mx-2 text-neutral-400">&gt;</span>}
                                                    </li>
                                                    <li className="text-neutral-400">{siteNameClicked}</li>
                                                </ol>
                                            </nav>}
                                    </h2>
                        </div>


                            <div
                                className="w-[357px] flex flex-row gap-[8px] bg-white border-[1px] border-[#e0e0e0] py-[11px] px-[12px] rounded-[4px]">
                                <img className="cursor-pointer" src="./images/Asset/map/View1/search.svg" alt=""
                                     onClick={() => handleSearchClick()}/>
                                <input type="text" placeholder={t("search_code_site...")}
                                       className="bg-none outline-none w-[100%]"
                                       onChange={(e) => handleSearchCodes(e.target.value)}/>
                            </div>
                        </div>

                        <div className="home">
                            <div className=" box5">
                                <div className="Map_intilizer_container">
                                    <div className="Total_information_map_details">

                                        {
                                            searchCode !== "" &&
                                            (
                                                <div>
                                                    <motion.div className={
                                                        (provinceName !== "" && cityName !== "") ? "relative p-0 overflow-hidden" :
                                                            "pb-[0] overflow-hidden relative"
                                                    }>

                                                        <Filters setTechnologyIndex={setTechnologyIndex}
                                                                 technologyIndex={technologyIndex}
                                                                 setTechnologyLayer={setTechnologyLayer}
                                                                 technologyLayer={technologyLayer}
                                                                 setView={setView} view={view}
                                                                 setItemName={setItemName} itemName={itemName}
                                                                 searchCode={searchCode} setSearchCode={setSearchCode}
                                                                 tech={tech} setTech={setTech}
                                                                 techLayer={techLayer} setTechLayer={setTechLayer}
                                                                 techNames={techNames} setTechNames={setTechNames}
                                                        />

                                                        <div>
                                                            <SiteMap searchSiteData={searchSiteData}/>
                                                        </div>
                                                    </motion.div>
                                                </div>)
                                        }

                                        {searchCode === "" && (view === 1) && (
                                            <div>
                                                <motion.div className={
                                                    (provinceName !== "" && cityName !== "") ? "relative p-0 overflow-hidden" :
                                                        "map_fixed_positition pt-[30px] px-[35px] pb-[0] overflow-hidden relative"
                                                }>
                                                    <Filters setTechnologyIndex={setTechnologyIndex}
                                                             technologyIndex={technologyIndex}
                                                             setTechnologyLayer={setTechnologyLayer}
                                                             technologyLayer={technologyLayer}
                                                             setView={setView} view={view}
                                                             setItemName={setItemName} itemName={itemName}
                                                             searchCode={searchCode} setSearchCode={setSearchCode}
                                                             tech={tech} setTech={setTech}
                                                             techLayer={techLayer} setTechLayer={setTechLayer}
                                                             techNames={techNames} setTechNames={setTechNames}/>

                                                    {provinceName !== "" &&
                                                        <div>
                                                            <div className="backItem absolute right-[55px] top-[20px] z-50"
                                                                onClick={() => {
                                                                    handleBackMap()
                                                                }}>
                                                                <img src="/images/arrow/back.svg" alt=""/>
                                                                <span>Back</span>
                                                            </div>
                                                        </div>
                                                    }

                                                    <AssetView2 setSiteNameClicked={setSiteNameClicked}
                                                                provinceName={provinceName} cityName={cityName}
                                                                selectedProvince={selectedProvince}
                                                                selectProvinceHandler={selectProvinceHandler}
                                                                selectProvinceHandler2={selectProvinceHandler2}
                                                                setCityName={setCityName}
                                                                mapProvincesData={mapProvincesData}
                                                                mapIranData={mapIranData}/>

                                                </motion.div>
                                            </div>
                                        )}
                                        {
                                            searchCode === "" && view === 2 && (
                                                <div>
                                                    <motion.div className={
                                                        (provinceName !== "" && cityName !== "") ? "relative p-0 overflow-hidden" :
                                                            "pb-[0] overflow-hidden relative"
                                                    }>
                                                        <Filters setTechnologyIndex={setTechnologyIndex}
                                                                 technologyIndex={technologyIndex}
                                                                 setTechnologyLayer={setTechnologyLayer}
                                                                 technologyLayer={technologyLayer}
                                                                 setView={setView} view={view}
                                                                 setItemName={setItemName} itemName={itemName}
                                                                 searchCode={searchCode} setSearchCode={setSearchCode}
                                                                 tech={tech} setTech={setTech}
                                                                 techLayer={techLayer} setTechLayer={setTechLayer}
                                                                 techNames={techNames} setTechNames={setTechNames}
                                                        />
                                                        <div>
                                                            <FilterMap provinceName={provinceName}
                                                                       setSiteNameClicked={setSiteNameClicked} techs={tech}
                                                                       itemName={itemName}/>
                                                        </div>
                                                    </motion.div>
                                                </div>)
                                        }
                                        {
                                            /*view 3 shows mix of technologies for when I have provinces or I don't have we must uses this component
                                            * for example Tehran 2g and 3g sites or only 2G sites of All of Iran */
                                            searchCode === "" && view === 3 && (
                                                <div>
                                                    <motion.div className={
                                                        (provinceName !== "" && cityName !== "") ? "relative p-0 overflow-hidden" :
                                                            "pb-[0] overflow-hidden relative"
                                                    }>
                                                        <Filters setTechnologyIndex={setTechnologyIndex}
                                                                 technologyIndex={technologyIndex}
                                                                 setTechnologyLayer={setTechnologyLayer}
                                                                 technologyLayer={technologyLayer}
                                                                 setView={setView} view={view}
                                                                 setItemName={setItemName} itemName={itemName}
                                                                 searchCode={searchCode} setSearchCode={setSearchCode}
                                                                 tech={tech} setTech={setTech}
                                                                 techLayer={techLayer} setTechLayer={setTechLayer}
                                                                 techNames={techNames} setTechNames={setTechNames}
                                                        />
                                                        <div>
                                                            <TechMap provinceName={provinceName}
                                                                     setSiteNameClicked={setSiteNameClicked} techs={tech}
                                                                     itemName={itemName}/>
                                                        </div>
                                                    </motion.div>
                                                </div>)
                                        }




                                        <div className="data_box_asset">
                                            <div className="chooseActiveIndex">
                                                <div className={activeTab === 1 ? "chooseActiveIndexItem1" : "chooseDeactiveIndexItem1"}
                                                    onClick={() => {
                                                        handleTab(1)
                                                    }}>
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M18.125 16.25C18.125 16.4158 18.0592 16.5747 17.9419 16.6919C17.8247 16.8092 17.6658
                                         16.875 17.5 16.875H2.5C2.33424 16.875 2.17527 16.8092 2.05806 16.6919C1.94085 16.5747 1.875 16.4158 1.875 16.25V3.75C1.875 3.58424 1.94085 3.42527 2.05806 3.30806C2.17527 3.19085 2.33424 3.125 2.5 3.125C2.66576 3.125 2.82473 3.19085 2.94194 3.30806C3.05915 3.42527 3.125 3.58424 3.125 3.75V12.2414L7.05781 8.30781C7.11586 8.2497 7.18479 8.2036 7.26066 8.17215C7.33654 8.1407 7.41787 8.12451 7.5 8.12451C7.58213 8.12451 7.66346 8.1407 7.73934 8.17215C7.81521 8.2036 7.88414 8.2497 7.94219 8.30781L10 10.3664L14.1164 6.25H12.5C12.3342 6.25 12.1753 6.18415 12.0581 6.06694C11.9408 5.94973 11.875 5.79076 11.875 5.625C11.875 5.45924 11.9408 5.30027 12.0581 5.18306C12.1753 5.06585 12.3342 5 12.5 5H15.625C15.7908 5 15.9497 5.06585 16.0669 5.18306C16.1842 5.30027 16.25 5.45924 16.25 5.625V8.75C16.25 8.91576 16.1842 9.07473 16.0669 9.19194C15.9497 9.30915 15.7908 9.375 15.625 9.375C15.4592 9.375 15.3003 9.30915 15.1831 9.19194C15.0658 9.07473 15 8.91576 15 8.75V7.13359L10.4422 11.6922C10.3841 11.7503 10.3152 11.7964 10.2393 11.8279C10.1635 11.8593 10.0821 11.8755 10 11.8755C9.91787 11.8755 9.83654 11.8593 9.76066 11.8279C9.68479 11.7964 9.61586 11.7503 9.55781 11.6922L7.5 9.63359L3.125 14.0086V15.625H17.5C17.6658 15.625 17.8247 15.6908 17.9419 15.8081C18.0592 15.9253 18.125 16.0842 18.125 16.25Z"
                                                              fill={activeTab === 1 ? "#007BFF" : "#757575"}/>
                                                    </svg>
                                                    <span
                                                        className={activeTab === 1 ? "active" : ""}>{t("Total")}</span>
                                                </div>
                                                <div
                                                    className={activeTab === 2 ? "chooseActiveIndexItem1" : "chooseDeactiveIndexItem1"}
                                                    onClick={() => {
                                                        handleTab(2)
                                                    }}>
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <g clip-path="url(#clip0_2691_6383)">
                                                            <path
                                                                d="M17.9945 11.0203C17.762 10.8414 17.4913 10.7185 17.2035 10.6612C16.9157 10.6038 16.6185 10.6137 16.3352 10.6898L13.0664 11.4414C13.1425 11.1202 13.1448 10.7858 13.0733 10.4636C13.0017 10.1413 12.8582 9.83934 12.6534 9.58041C12.4486 9.32149 12.1878 9.11228 11.8907 8.96847C11.5935 8.82465 11.2676 8.74997 10.9375 8.75H7.02656C6.69812 8.74918 6.37278 8.81345 6.06932 8.93909C5.76587 9.06474 5.49032 9.24927 5.25859 9.48203L3.49141 11.25H1.25C0.918479 11.25 0.600537 11.3817 0.366117 11.6161C0.131696 11.8505 0 12.1685 0 12.5L0 15.625C0 15.9565 0.131696 16.2745 0.366117 16.5089C0.600537 16.7433 0.918479 16.875 1.25 16.875H9.375C9.4261 16.875 9.47701 16.8687 9.52656 16.8563L14.5266 15.6063C14.5584 15.5987 14.5896 15.5882 14.6195 15.575L17.6562 14.2828L17.6906 14.2672C17.9825 14.1214 18.2324 13.9036 18.4168 13.6345C18.6013 13.3654 18.7142 13.0537 18.7449 12.7289C18.7756 12.4041 18.7231 12.0768 18.5924 11.7779C18.4617 11.479 18.257 11.2183 17.9977 11.0203H17.9945ZM1.25 12.5H3.125V15.625H1.25V12.5ZM17.143 13.1414L14.1742 14.4055L9.29688 15.625H4.375V12.1336L6.14297 10.3664C6.25862 10.2498 6.39629 10.1574 6.54798 10.0945C6.69967 10.0316 6.86235 9.99948 7.02656 10H10.9375C11.1861 10 11.4246 10.0988 11.6004 10.2746C11.7762 10.4504 11.875 10.6889 11.875 10.9375C11.875 11.1861 11.7762 11.4246 11.6004 11.6004C11.4246 11.7762 11.1861 11.875 10.9375 11.875H8.75C8.58424 11.875 8.42527 11.9408 8.30806 12.0581C8.19085 12.1753 8.125 12.3342 8.125 12.5C8.125 12.6658 8.19085 12.8247 8.30806 12.9419C8.42527 13.0592 8.58424 13.125 8.75 13.125H11.25C11.297 13.1249 11.3439 13.1196 11.3898 13.1094L16.6242 11.9055L16.6484 11.8992C16.8082 11.8549 16.9788 11.8712 17.1273 11.945C17.2758 12.0188 17.3917 12.1449 17.4528 12.2991C17.5139 12.4533 17.5158 12.6246 17.4582 12.7801C17.4005 12.9356 17.2874 13.0643 17.1406 13.1414H17.143ZM12.8125 7.5C12.9669 7.50018 13.1211 7.48763 13.2734 7.4625C13.4448 7.97152 13.7583 8.42083 14.177 8.7573C14.5956 9.09378 15.1018 9.30335 15.6358 9.36123C16.1698 9.41912 16.7091 9.32291 17.1901 9.08397C17.6712 8.84503 18.0737 8.47336 18.3502 8.01289C18.6267 7.55243 18.7655 7.02242 18.7503 6.48555C18.7351 5.94867 18.5665 5.42737 18.2644 4.98328C17.9624 4.53919 17.5394 4.19088 17.0457 3.97953C16.5519 3.76818 16.008 3.70263 15.4781 3.79063C15.3131 3.30019 15.016 2.86479 14.6195 2.53233C14.223 2.19987 13.7424 1.98324 13.2307 1.90628C12.7191 1.82932 12.196 1.89502 11.7193 2.09615C11.2425 2.29727 10.8305 2.62602 10.5285 3.04622C10.2266 3.46642 10.0464 3.96179 10.0078 4.47779C9.96921 4.9938 10.0737 5.51045 10.3098 5.97089C10.546 6.43132 10.9045 6.81769 11.3461 7.08748C11.7876 7.35726 12.2951 7.50001 12.8125 7.5ZM17.5 6.5625C17.5 6.87153 17.4084 7.17363 17.2367 7.43058C17.065 7.68753 16.821 7.8878 16.5354 8.00606C16.2499 8.12432 15.9358 8.15527 15.6327 8.09498C15.3296 8.03469 15.0512 7.88588 14.8326 7.66736C14.6141 7.44884 14.4653 7.17043 14.405 6.86733C14.3447 6.56423 14.3757 6.25007 14.4939 5.96456C14.6122 5.67905 14.8125 5.43502 15.0694 5.26333C15.3264 5.09164 15.6285 5 15.9375 5C16.3519 5 16.7493 5.16462 17.0424 5.45765C17.3354 5.75067 17.5 6.1481 17.5 6.5625ZM12.8125 3.125C13.1534 3.12517 13.4848 3.2368 13.7563 3.44287C14.0279 3.64895 14.2245 3.93816 14.3164 4.26641C13.9963 4.49164 13.7267 4.7812 13.5249 5.11658C13.3232 5.45195 13.1936 5.82575 13.1445 6.21406C13.0354 6.23763 12.9241 6.24967 12.8125 6.25C12.3981 6.25 12.0007 6.08538 11.7076 5.79236C11.4146 5.49933 11.25 5.1019 11.25 4.6875C11.25 4.2731 11.4146 3.87567 11.7076 3.58265C12.0007 3.28962 12.3981 3.125 12.8125 3.125Z"
                                                                fill={activeTab === 2 ? "#007BFF" : "#757575"}/>
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_2691_6383">
                                                                <rect width="20" height="20" fill="white"/>
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <span
                                                        className={activeTab === 2 ? "active" : ""}>{t("Financial")}</span>
                                                </div>
                                                <div
                                                    className={activeTab === 3 ? "chooseActiveIndexItem1" : "chooseDeactiveIndexItem1"}
                                                    onClick={() => {
                                                        handleTab(3)
                                                        
                                                    }}>
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M18.125 16.25C18.125 16.4158 18.0592 16.5747 17.9419 16.6919C17.8247 16.8092 17.6658
                                         16.875 17.5 16.875H2.5C2.33424 16.875 2.17527 16.8092 2.05806 16.6919C1.94085 16.5747 1.875 16.4158 1.875 16.25V3.75C1.875 3.58424 1.94085 3.42527 2.05806 3.30806C2.17527 3.19085 2.33424 3.125 2.5 3.125C2.66576 3.125 2.82473 3.19085 2.94194 3.30806C3.05915 3.42527 3.125 3.58424 3.125 3.75V12.2414L7.05781 8.30781C7.11586 8.2497 7.18479 8.2036 7.26066 8.17215C7.33654 8.1407 7.41787 8.12451 7.5 8.12451C7.58213 8.12451 7.66346 8.1407 7.73934 8.17215C7.81521 8.2036 7.88414 8.2497 7.94219 8.30781L10 10.3664L14.1164 6.25H12.5C12.3342 6.25 12.1753 6.18415 12.0581 6.06694C11.9408 5.94973 11.875 5.79076 11.875 5.625C11.875 5.45924 11.9408 5.30027 12.0581 5.18306C12.1753 5.06585 12.3342 5 12.5 5H15.625C15.7908 5 15.9497 5.06585 16.0669 5.18306C16.1842 5.30027 16.25 5.45924 16.25 5.625V8.75C16.25 8.91576 16.1842 9.07473 16.0669 9.19194C15.9497 9.30915 15.7908 9.375 15.625 9.375C15.4592 9.375 15.3003 9.30915 15.1831 9.19194C15.0658 9.07473 15 8.91576 15 8.75V7.13359L10.4422 11.6922C10.3841 11.7503 10.3152 11.7964 10.2393 11.8279C10.1635 11.8593 10.0821 11.8755 10 11.8755C9.91787 11.8755 9.83654 11.8593 9.76066 11.8279C9.68479 11.7964 9.61586 11.7503 9.55781 11.6922L7.5 9.63359L3.125 14.0086V15.625H17.5C17.6658 15.625 17.8247 15.6908 17.9419 15.8081C18.0592 15.9253 18.125 16.0842 18.125 16.25Z"
                                                              fill={activeTab === 3 ? "#007BFF" : "#757575"}/>
                                                    </svg>
                                                    <span
                                                        className={activeTab === 3 ? "active" : ""}>{t("Traffic")}</span>
                                                </div>
                                                <div
                                                    className={activeTab === 4 ? "chooseActiveIndexItem1" : "chooseDeactiveIndexItem1"}
                                                    onClick={() => {
                                                        handleTab(4)
                                                    }}>
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M9.00977 10.2799C9.00977 9.96137 9.26801 9.70312 9.58657 9.70312C9.90513 9.70312 10.1634 9.96137 10.1634 10.2799V17.8608C10.1634 18.1793 9.90513 18.4376 9.58657 18.4376C9.26801 18.4376 9.00977 18.1793 9.00977 17.8608V10.2799Z"
                                                            fill="#757575"/>
                                                        <path
                                                            d="M10.9872 9.29143C10.9872 10.0651 10.36 10.6922 9.58636 10.6922C8.81271 10.6922 8.18555 10.0651 8.18555 9.29143C8.18555 8.51779 8.81271 7.89062 9.58636 7.89062C10.36 7.89062 10.9872 8.51779 10.9872 9.29143Z"
                                                            fill="#757575"/>
                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                              d="M9.78157 5.9975C9.22673 5.99216 8.68062 6.13304 8.19905 6.40544C7.71751 6.67783 7.31796 7.07183 7.04074 7.54679C6.76354 8.02172 6.61845 8.5608 6.61993 9.10906C6.62141 9.65731 6.76941 10.1956 7.04918 10.6691C7.21123 10.9433 7.12028 11.297 6.84602 11.4591C6.57176 11.6212 6.21806 11.5302 6.056 11.2559C5.67196 10.606 5.46836 9.86624 5.46632 9.11217C5.46429 8.3581 5.66389 7.61725 6.04443 6.96528L6.54258 7.25604L6.04443 6.96528C6.42494 6.31334 6.9726 5.77382 7.63108 5.40134C8.28952 5.02889 9.03542 4.83665 9.79268 4.84395C10.55 4.85125 11.292 5.05781 11.943 5.44291C12.5941 5.82802 13.1312 6.37802 13.4989 7.03721C13.8666 7.69643 14.0517 8.44101 14.0349 9.1949C14.0181 9.94878 13.8001 10.6845 13.4034 11.3268C13.2361 11.5979 12.8807 11.6819 12.6096 11.5146C12.3386 11.3472 12.2545 10.9918 12.4219 10.7207C12.7109 10.2527 12.8694 9.71734 12.8816 9.16922C12.8938 8.6211 12.7593 8.07934 12.4914 7.5992C12.2236 7.11902 11.8318 6.71743 11.3558 6.43583C10.8796 6.15422 10.3364 6.00285 9.78157 5.9975Z"
                                                              fill={activeTab === 4 ? "#007BFF" : "#757575"}/>
                                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                                              d="M12.8987 3.89165C11.8975 3.29657 10.7435 2.99765 9.57423 3.03114C8.40494 3.06463 7.27061 3.42908 6.30618 4.08034C5.34183 4.73155 4.58827 5.64186 4.13413 6.70218C3.68002 7.76243 3.54406 8.92873 3.74209 10.0626C3.94013 11.1965 4.46403 12.2513 5.25252 13.1012C5.46918 13.3347 5.45551 13.6997 5.22198 13.9163C4.98845 14.133 4.62349 14.1193 4.40683 13.8858C3.46778 12.8736 2.84225 11.6156 2.60568 10.2611C2.36911 8.90652 2.53167 7.51348 3.0737 6.24799C3.61569 4.98256 4.51395 3.8986 5.66058 3.1243C6.80714 2.35005 8.1541 1.91774 9.5412 1.87801C10.9283 1.83828 12.2982 2.19277 13.4881 2.89998C14.6781 3.60723 15.6383 4.63777 16.2536 5.86986C16.8689 7.10203 17.113 8.48334 16.9563 9.84924C16.7997 11.2151 16.249 12.507 15.3708 13.5714C15.1681 13.8171 14.8045 13.852 14.5588 13.6492C14.3131 13.4465 14.2782 13.0829 14.481 12.8372C15.2181 11.9439 15.6791 10.861 15.8102 9.71779C15.9414 8.57455 15.7372 7.41792 15.2215 6.38526C14.7058 5.35253 13.8999 4.4867 12.8987 3.89165Z"
                                                              fill="#757575"/>
                                                    </svg>
                                                    <span
                                                        className={activeTab === 4 ? "active" : ""}>{t("Physical")}</span>
                                                </div>
                                            </div>
                                            <div>
                                                {/*pupop && siteNameClicked ===null&& (
                                                    <div>
                                                        <div className="total_map_data">
                                                            <div className="tabs_header_to_map">
                                                            </div>
                                                            <div className="header_total_map_data">
                                                                <img src="./images/Province.svg" alt=""/>
                                                                <h2 className="text-[#000000] font-[600] ">{capitalizeFirstLetter(provinceName)} </h2>
                                                            </div>
                                                            <div className="total_map_data_item_group">
                                                                <div className="total_map_data_item_spp1">
                                                                    <h3>{t("Site Counts")}</h3>
                                                                    <p> {totalCount ? (
                                                                        format(
                                                                            provinceName === "Khuzestan" ? (
                                                                                    filter_siteCount("Khouzestan")
                                                                                ) :
                                                                                provinceName === "Ardebil" ? (
                                                                                    filter_siteCount("ardabil")
                                                                                ) : (
                                                                                    filter_siteCount(provinceName)
                                                                                )
                                                                        )) : "data is not available"
                                                                    }</p>


                                                                </div>
                                                                <div className="total_map_data_item_spp2">
                                                                    <h3>{t("Cell Counts")}</h3>
                                                                    <p> {cellsCount ? (
                                                                        format(
                                                                            provinceName === "Khuzestan" ? (
                                                                                filter_cells("Khouzestan")
                                                                            ) : (
                                                                                filter_cells(provinceName)
                                                                            )
                                                                        )) : "data is not available"
                                                                    }</p>


                                                                </div>
                                                            </div>
                                                            <div className="data_row_box">
                                                                <h2>{t("Traffic")}</h2>
                                                                <div className="row_items_traffic">
                                                                    <div
                                                                        className="total_map_data_item_for_quantity">
                                                                        <div className="total_map_data_item_2">
                                                                            <h3>{t("Traffic PS")}</h3>
                                                                            <p> {dataPerProvince ? (format(provinceName === "Khuzestan" ?
                                                                                filter_traffic_PS("Khouzestan") :
                                                                                filter_traffic_PS(provinceName))) : "data is not available"
                                                                            }</p>


                                                                        </div>
                                                                        <div className="total_map_data_item_3">
                                                                            <Rate value={+4} dayDates={daysDates}/>
                                                                            <h6>GB</h6>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="total_map_data_item_for_quantity">
                                                                        <div className="total_map_data_item_2">
                                                                            <h3>{t("Traffic CS")}</h3>
                                                                            <p> {dataPerProvince ? (format(provinceName === "Khuzestan" ?
                                                                                filter_traffic_CS("Khouzestan") :
                                                                                filter_traffic_CS(provinceName))) : "data is not available"
                                                                            }</p>

                                                                        </div>
                                                                        <div className="total_map_data_item_3">
                                                                            <Rate value={+4} dayDates={daysDates}/>
                                                                            <h6>Erlang</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="data_row_box_2">
                                                                <h2>{t("Costs and revenue")}</h2>
                                                                <div className="row_items_traffic">
                                                                    <div
                                                                        className="total_map_data_item_for_quantity">
                                                                        <div className="total_map_data_item_2">
                                                                            <h3>{t("Cost")}</h3>
                                                                            <p> {dataPerProvince ? (format(provinceName === "Khuzestan" ?
                                                                                filter_cost_per_province("Khouzestan") :
                                                                                filter_cost_per_province(provinceName))) : "data is not available"
                                                                            }</p>



                                                                        </div>
                                                                        <div className="total_map_data_item_3">
                                                                            <Rate value="4" dayDates={daysDates}/>
                                                                            <h6 className="text-nowrap"> تومان</h6>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="total_map_data_item_for_quantity">
                                                                        <div className="total_map_data_item_2">
                                                                            <h3>{t("Margin")}</h3>
                                                                            <p> {dataPerProvince ? (format(provinceName === "Khuzestan" ?
                                                                                filter_margin_per_province("Khouzestan") :
                                                                                filter_margin_per_province(provinceName))) : "data is not available"
                                                                            }</p>


                                                                        </div>
                                                                        <div className="total_map_data_item_3">
                                                                            <Rate value="4" dayDates={daysDates}/>
                                                                            <h6>%</h6>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="total_map_data_item_for_quantity">
                                                                        <div className="total_map_data_item_2">
                                                                            <h3>{t("Profit")}</h3>
                                                                            <p> {dataPerProvince ? (format(provinceName === "Khuzestan" ?
                                                                                filter_profit_per_province("Khouzestan") :
                                                                                filter_profit_per_province(provinceName))) : "data is not available"
                                                                            }</p>


                                                                        </div>
                                                                        <div className="total_map_data_item_3">
                                                                            <Rate value="4" dayDates={daysDates}/>
                                                                            <h6 className="text-nowrap"> تومان</h6>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="total_map_data_item_for_quantity">
                                                                        <div className="total_map_data_item_2">
                                                                            <h3>{t("Total revenue")}</h3>
                                                                            <p> {dataPerProvince ? (format(provinceName === "Khuzestan" ?
                                                                                filter_revenue_per_province("Khouzestan") :
                                                                                filter_revenue_per_province(provinceName))) : "data is not available"
                                                                            }</p>


                                                                        </div>
                                                                        <div className="total_map_data_item_3">
                                                                            <Rate value="4" dayDates={daysDates}/>
                                                                            <h6 className="text-nowrap">  تومان</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )*/}

                                                {pupop && siteNameClicked ===null&& (
                                                    <ProvinceData
                                                        pupop={pupop}
                                                        siteNameClicked={siteNameClicked}
                                                        provinceName={provinceName}
                                                        totalCount={totalCount}
                                                        dataPerProvince={dataPerProvince}
                                                        t={t}
                                                        format={format}
                                                      />
                                                )}

                                                {siteNameClicked !==null && (
                                                    <>
                                                        <div>
                                                            <SitaData setData={setData} data={data} siteNameClicked={siteNameClicked}
                                                                               provinceName={provinceName}
                                                                               setProvinceName={setProvinceName}/>
                                                        </div>

                                                    </>
                                                )}
                                            </div>


                                            {/*Total data left direction of map */}
                                            {!pupop && siteNameClicked ===null && (
                                                <>
                                                    {
                                                        activeTab === 1 &&
                                                        <div>
                                                            <ActiveTab1Country setData={setData} data={data}
                                                                               provinceName={provinceName}
                                                                               setProvinceName={setProvinceName}/>
                                                        </div>
                                                    }
                                                    {
                                                        activeTab === 2 &&
                                                        <div>
                                                            <ActiveTab2Country />
                                                        </div>
                                                    }
                                                    {
                                                        activeTab === 3 &&
                                                        <div>
                                                            <ActiveTab1Country setData={setData} data={data}
                                                                               provinceName={provinceName}
                                                                               setProvinceName={setProvinceName}/>
                                                        </div>
                                                    }
                                                    {
                                                        activeTab === 4 &&
                                                        <div>
                                                            <ActiveTab1Country setData={setData} data={data}
                                                                               provinceName={provinceName}
                                                                               setProvinceName={setProvinceName}/>
                                                        </div>
                                                    }


                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default Assets;



