//@ts-nocheck
import  React, { useRef,useState, useEffect } from "react";
import iranProvinces from "../../../database/dataMap/iranProvinces.jsx";
import iranBorder from "../../../database/dataMap/IranMapData.js";
import styles from "./Iranmap.module.css";
import 'reactjs-popup/dist/index.css';
// import Rate from "../../AssetPage/dataCharts/rateColor/Rate";
import {Link} from "react-router-dom";
import { ProgressBar} from "react-loader-spinner";
import {motion} from "framer-motion";

// const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;


const useMouse = () =>
{
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const setMousePositionRef = useRef(setMousePosition);

    useEffect(() =>
    {
        setMousePositionRef.current = setMousePosition;
        function handle(e:MouseEvent) {
            setMousePositionRef.current({
                x: e.pageX,
                y: e.pageY,
            });
        }



        const mapEffect = document.querySelector("#mySvg");  // Use the ID selector
        console.log(mapEffect)
        mapEffect?.addEventListener("mousemove", handle);
        return () => document.removeEventListener("mousemove", handle);
         }, []);

    return mousePosition;
};





const IranMap = (props) =>
{
    const {x, y} = useMouse();
    const [provinces] = useState(() => iranProvinces);
    const [provinceName, setProvinceName] = useState("");
    const [provinceNameOnClick, setProvinceNameOnClick] = useState("");

    const [mapZoom, setMapZoom] = useState(false);
    const [provinceSelected, setProvinceSelected] = useState(false);

    const [cities, setCities] = useState(["تمام ایران"]);


    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [citySelected, setCItySelected] = useState(false)
    const [isChecked, setChecked] = useState(false);

    const [pupop,setPupop]=useState(false)

    const [dataProvince,setDataProvince]=useState(false)
    const [loading,setLoading]=useState(false)


    const [uvValues, setUvValues] = useState([Math.floor(Math.random() * 1000)]);


    const [totalTraffic,setTotalTraffic]=useState(null)
    const [totalCount,setTotalCount]=useState(null)
    const [cellsCount,setCellsCount]=useState(null)
    const [cityCount,setCityCount]=useState(null)
    const [cityCountSelected,setCityCountSelected]=useState(null)

    const [totalRevenue,setTotalRevenue]=useState(0)

    const [originalCityCountSelected, setOriginalCityCountSelected] = useState();


    const pathRefs = useRef({});











    const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;

    function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newUvValue = Math.floor(randomNumber(300,500) * 3000);
            setUvValues(prevValues => {
                const updatedValues = [...prevValues, newUvValue];
                if (updatedValues.length > 16) {
                    // Remove the oldest value
                    updatedValues.shift();
                }
                return updatedValues;
            });
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);





    let currentIndex = 0;

    const data = uvValues.map((uv) =>
    {
        if (currentIndex < 7) {
            const entry = {
                name: `Page ${String.fromCharCode(65 + currentIndex)}`,
                uv: uv,
            };
            currentIndex++;
            return entry;
        }
        else {
            currentIndex=0;
            return null;
        }
    }).filter(entry => entry !== null);

    /*
        const handleCheckboxChange = () => {
            setChecked(!isChecked);
        };

    */



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

/*
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        localStorage.setItem(cacheKey, JSON.stringify({ data: jsonData, timestamp: Date.now() }));
        return jsonData;
        */


    }





    useEffect(() => {

        const promises = [];
        // Fetch sites count per province data
       /* fetchAndCacheData("sites_count_cache", "http://192.168.129.188:5001/api/assets/sites_count_per_province")
            .then(data => {
                // Handle the data as needed
                console.log("Sites count per province data", data);
                setTotalCount(data)
                console.log("lshbbdfm", totalCount);
            })
            .catch(error => {
                // Handle errors
                console.error("Error fetching sites count per province data:", error);
            });

        fetchAndCacheData("cells_count_cache", "http://192.168.129.188:5001/api/assets/cells_count_per_province")
            .then(data => {
                // Handle the data as needed
                console.log("Cells count per province data:", data);
                setCellsCount(data)
            })
            .catch(error => {
                // Handle errors
                console.error("Error fetching sites count per province data:", error);
            });

        fetchAndCacheData("cities_per_province_cache", "http://192.168.129.188:5001/api/assets/cities")
            .then(data => {
                // Handle the data as needed
                console.log("Cities  per province :", data);
                setCityCount(data)
            })
            .catch(error => {
                // Handle errors
                console.error("Error fetching sites count per province data:", error);
            });



        // Fetch traffic per province data
        fetchAndCacheData("traffic_per_province_cache", "http://192.168.129.188:5001/api/assets/traffic_per_province")
            .then(data => {
                // Handle the data as needed
                console.log("Traffic per province data:", data);
                setTotalTraffic(data)
            })
            .catch(error => {
                // Handle errors
                console.error("Error fetching traffic per province data:", error);
            });*/


        const promise1 = fetchAndCacheData("sites_count_cache", "http://10.15.90.87:5001/api/assets/sites_count_per_province")
            .then(data => {
                // Handle the data as needed
                console.log("Sites count per province data", data);
                setTotalCount(data);
            })
            .catch(error => {
                // Handle errors
                console.error("Error fetching sites count per province data:", error);
            });

        promises.push(promise1);

        // Fetch cells count per province data
        const promise2 = fetchAndCacheData("cells_count_cache", "http://10.15.90.87:5001/api/assets/cells_count_per_province")
            .then(data => {
                // Handle the data as needed
                console.log("Cells count per province data:", data);
                setCellsCount(data);
            })
            .catch(error => {
                // Handle errors
                console.error("Error fetching cells count per province data:", error);
            });

        promises.push(promise2);

        // Fetch cities per province data
        const promise3 = fetchAndCacheData("cities_per_province_cache", "http://10.15.90.87:5001/api/assets/cities")
            .then(data => {
                // Handle the data as needed
                console.log("Cities per province data:", data);
                setCityCount(data);
            })
            .catch(error => {
                // Handle errors
                console.error("Error fetching cities per province data:", error);
            });

        promises.push(promise3);

        // Fetch traffic per province data
        const promise4 = fetchAndCacheData("traffic_per_province_cache", "http://10.15.90.87:5001/api/assets/traffic_per_province")
            .then(data => {
                // Handle the data as needed
                console.log("Traffic per province data:", data);
                setTotalTraffic(data);
            })
            .catch(error => {
                // Handle errors
                console.error("Error fetching traffic per province data:", error);
            });

        promises.push(promise4);

        // Wait for all promises to resolve
        Promise.all(promises)
            .then(() => {

                setLoading(true); // Set loading to false once all data is fetched
            });


    }, []);

    const numberFormatter = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const format = (number)=>
    {
            const formattedNumber = numberFormatter.format(number);
            return formattedNumber;
    }
    const sum_PS = (listdata) => {
        let total_PS = 0;

        let div=1024
        if (listdata.length > 0) {
            listdata.forEach(item => {
                // Iterate over the properties of each item
                Object.keys(item).forEach(key => {
                    // Check if the key contains "PS"
                    if (key.includes('PS') && typeof item[key] === 'number') {
                        // Add the value to the total_PS
                        total_PS += item[key];
                    }
                });
            });
        }
        div= (total_PS/1024)

        return div.toFixed(2);
    };


    const sum_CS = (listdata) => {
        let total_CS = 0;

        let div=1024
        if (listdata.length > 0) {
            listdata.forEach(item => {
                // Iterate over the properties of each item
                Object.keys(item).forEach(key => {
                    // Check if the key contains "CS"
                    if (key.includes('CS') && typeof item[key] === 'number') {
                        // Add the value to the total_CS
                        total_CS += item[key];
                    }
                });
            });
        }
        div= (total_CS/1024)

        return div.toFixed(2);
    };


    const calculate_revenue = (province) => {
        let total = 0;

        const filterItems = totalTraffic.traffic.filter(item => item.province === province)

        if (filterItems.length > 0) {
            filterItems.forEach(item => {
                // Add the revenue of each item to the total
                total += item.revenue;
            });
        }

        return total;
    }


    const filter_traffic_CS= (province)=>
    {


        const filterItems = totalTraffic.traffic.filter(item => item.province === province)



         const totalcount = sum_CS(filterItems)



        return totalcount;
    }

    const filter_traffic_PS= (province)=>
    {
        const filterItems = totalTraffic.traffic.filter(item => item.province === province)

        const totalcount = sum_PS(filterItems)

        return totalcount;
    }

    const filter_cells= (province)=>
    {

        console.log("kdjdfklsj",cellsCount)
        const filterItems= cellsCount.cells_count.filter(item => item.province === province)

        return filterItems.length > 0 ? filterItems[0].count : 0;
    }



    const filter_siteCounts_CS = (province) => {
        if (provinceName === "West Azerbaijan") {
            return filter_traffic_CS("West Azarbaijan");
        } else if (provinceName === "Sistan va Baluchestan") {
            return filter_traffic_CS("Sistan Va Baluchestan");
        } else if (provinceName === "Chaharmahal Bakhtiari") {
            return filter_traffic_CS("Chahar Mahal Va Bakhtiari");
        } else if (provinceName === "Kohgiluyeh and Boyer Ahmad") {
            return filter_traffic_CS("Kohgiluyeh Va Boyer Ahmad");
        } else if (provinceName === "East Azerbaijan") {
            return filter_traffic_CS("East Azarbaijan");
        } else if (provinceName === "Ardabil") {
            return filter_traffic_CS("Ardebil");
        } else {
            return filter_traffic_CS(provinceName);
        }
    };


    const filter_siteCounts_PS = (province) => {
        if (provinceName === "West Azerbaijan") {
            return filter_traffic_CS("West Azarbaijan");
        } else if (provinceName === "Sistan va Baluchestan") {
            return filter_traffic_CS("Sistan Va Baluchestan");
        } else if (provinceName === "Chaharmahal Bakhtiari") {
            return filter_traffic_CS("Chahar Mahal Va Bakhtiari");
        } else if (provinceName === "Kohgiluyeh and Boyer Ahmad") {
            return filter_traffic_CS("Kohgiluyeh Va Boyer Ahmad");
        } else if (provinceName === "East Azerbaijan") {
            return filter_traffic_CS("East Azarbaijan");
        } else if (provinceName === "Ardabil") {
            return filter_traffic_CS("Ardebil");
        } else {
            return filter_traffic_CS(provinceName);
        }
    };
    const filter_siteCount= (province)=>
    {

        const filterItems = totalCount.sites_count.filter(item => item.province === province)

        const totalcount = filterItems.reduce((acc, curr) => acc + curr.count, 0)

        return totalcount;
    }

    const filter_cities= (province)=>
    {
        const filterItems= cityCount.sites_count.filter(item => item.province === province)

        setOriginalCityCountSelected(filterItems)
        setCityCountSelected(filterItems)
    }



    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();
        const items = cityCountSelected.filter((cityItem) => cityItem.city.toLowerCase().includes(searchText));
        console.log("kjdnalkjsd",items)
        setOriginalCityCountSelected(items);
        console.log("setOriginalCityCountSelected",originalCityCountSelected)
    }



    const handleClick = (className, key) => {
        if (pathRefs.current[key]) {
            pathRefs.current[key].style.zIndex = 999;

        }
        setProvinceName(className);
        props.setProvinceName(className);
        setPupop(true);
        props.setPupop(true);
    };

    const handleMouseLeave = (key) => {
        if (pathRefs.current[key]) {
            pathRefs.current[key].style.zIndex = '999';

        }
        setProvinceName("");
        props.setProvinceName("");
        setPupop(false);
        props.setPupop(false);
    };


    return (
         loading ?
             (
                <>

                    {/*
                 {
                pupop && (
                    <div>
                        <section className={styles.show_title}>
                            {provinceName}
                            <div className="show_title_chartBar" style={{width: '165px', height: '52px'}}>
                                <span>Site Count:
                                        {
                                            format(filter_siteCount(provinceName))
                                        }
                                </span>
                            </div>
                            <style>{`
                            section {
                                position: absolute;
                                left: ${x + 5 + "px"};
                                top: ${y + 5 + "px"};
                                z-index: 999;
                            }
                        `}</style>
                        </section>
                        <div className={styles.data_per_province}>
                            <div className={styles.data_per_province_header}>
                                <img src="../../../public/info_provinces.svg" alt="" width={24} height={24}/>
                                <span >{provinceName}</span>
                            </div>

                            <div className={styles.main_data_perProvince}>
                                <div className={styles.main_data_every_item}>
                                    <div className={styles.main_data_headerItem}>
                                        <p>Site Count</p>
                                        <span>

                                            {
                                                format(
                                                    provinceName === "Khuzestan" ? (
                                                        filter_siteCount("Khouzestan")
                                                    ) : (
                                                        filter_siteCount(provinceName)
                                                    )
                                                )
                                            }
                                        </span>
                                    </div>
                                    <div className={styles.main_data_rateItem}>
                                        <div>
                                            <Rate calculation={"positive"}/>
                                        </div>
                                        <span>since last month</span>
                                    </div>

                                </div>

                                <div className={styles.main_data_every_item}>
                                    <div className={styles.main_data_headerItem}>
                                        <p>Total traffic CS</p>
                                        <div>
                                        <span>
                                           {
                                               format(filter_traffic_CS(provinceName))
                                           }
                                        </span>
                                            <span>
                                            TB
                                        </span>
                                        </div>
                                    </div>
                                    <div className={styles.main_data_rateItem}>
                                        <div>
                                            <Rate calculation={"positive"}/>
                                        </div>
                                        <span>since last month</span>
                                    </div>

                                </div>

                                <div className={styles.main_data_every_item}>
                                    <div className={styles.main_data_headerItem}>
                                        <p>Total traffic PS</p>
                                        <div>
                                        <span>
                                           {
                                               format(filter_traffic_PS(provinceName))
                                           }
                                        </span>
                                            <span>
                                            TB
                                        </span>
                                        </div>
                                    </div>
                                    <div className={styles.main_data_rateItem}>
                                        <div>
                                            <Rate calculation={"positive"}/>
                                        </div>
                                        <span>since last month</span>
                                    </div>

                                </div>

                                <div className={styles.main_data_every_item}>
                                    <div className={styles.main_data_headerItem}>
                                        <p>Cells Count</p>
                                        <span>{
                                            format(
                                                provinceName === "Khuzestan" ? (filter_cells("Khouzestan")) :
                                                    filter_cells(provinceName)
                                            )
                                        }
                                        </span>
                                    </div>
                                    <div className={styles.main_data_rateItem}>
                                        <div>
                                            <Rate calculation={"positive"}/>
                                        </div>
                                        <span>since last month</span>
                                    </div>

                                </div>

                                <div className={styles.main_data_every_item}>
                                    <div className={styles.main_data_headerItem}>
                                        <p>Total Revenue</p>

                                        <span>
                                            {
                                                format(calculate_revenue(provinceName))
                                            }
                                        </span>
                                        <span>
                                            Toman
                                        </span>
                                    </div>
                                    <div className={styles.main_data_rateItem}>
                                        <div>
                                            <Rate calculation={"positive"}/>
                                        </div>
                                        <span>since last month</span>
                                    </div>

                                </div>


                            </div>
                        </div>

                    </div>
                )}*/
                    }


                    {provinceSelected && (
                        <div>
                            <div
                                className={styles.backdrop}
                                onClick={() => setProvinceSelected(false)}
                            ></div>
                            {
                                /*
                                <div className={styles.cities}>
                                    <div className="cities_header_row">
                                        <img src="./arrow_city.svg" alt=""/>
                                        <img src="./location_city.svg" alt=""/>
                                        <span className={styles.selected_province}> Choose city in {provinceNameOnClick}</span>
                                    </div>
                                    <form>
                                        {cities.map((city) => {
                                            return (
                                                <>
                                                    <input type="checkbox" value={city} name={city} id="cities_class"
                                                           checked={selectedCities.includes(city)}

                                                    onChange={() => {
                                                   if (selectedCities.includes(city)) {
                                                       setSelectedCities(selectedCities.filter(selectedCity => selectedCity !== city));
                                                   } else {
                                                       setSelectedCities([...selectedCities, city]);
                                                                   }
                                                               }} />
                                                        <label htmlFor={city} className={styles.city_label} >
                                                            {city}

                                                        </label>
                                                        <br />
                                                </>
                                            );
                                        })}




                                        <div className={styles.select_cities_btns}>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setProvinceSelected(false)
                                                    setSelectedCities([])
                                                }}
                                            >
                                                بازگشت
                                            </button>

                                            <input type="submit" value="تایید" onClick={()=> {
                                                setCItySelected(true)
                                                setProvinceSelected(false)
                                            }
                                            }/>
                                        </div>

                                    </form>
                                </div>
                                */
                    }

                    <div className={styles.cities}>
                        <div className={styles.cities_wrapper}>
                            <div className={styles.cities_header}>
                                <img className={styles.back_data} src="./arrow_city.svg" alt="" onClick={()=>{
                                    setProvinceSelected(false)
                                }}/>
                                <div className={styles.cities_header_right}>
                                    <img src="./location_city.svg" alt=""/>
                                    <span>Choose city in {provinceNameOnClick}</span>
                                </div>
                            </div>

                            <div className={styles.search_city_in_map} >

                                <div className={styles.search_city_in_map_border}>
                                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 15L21 21" stroke="black" stroke-width="2" stroke-linecap="round"
                                              stroke-linejoin="round"/>
                                        <path
                                            d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                                            stroke="black" stroke-width="2"/>
                                    </svg>

                                    <input type="text" placeholder="Select city"
                                           onChange={(e) =>
                                               handleSearch(e)}/>
                                </div>
                            </div>


                            {
                                originalCityCountSelected.map((item, index) =>
                                    (
                                        <Link to={`/sites/${item.city}`}>
                                        <div key={index} className={styles.cities_selection}>
                                                    <span>{item.city}</span>
                                            </div>
                                        </Link>
                            ))
                            }
                            <div className={styles.buttons_cities_select}>
                                <div  className={styles.confrim_btt}
                                      onClick={()=> {
                                setCItySelected(true)
                                setProvinceSelected(false)
                                }
                                }
                                >Confirm</div>
                                <div  className={styles.cancel_btt}
                                      onClick={() => {
                                          setProvinceSelected(false)
                                          setSelectedCities([])
                                      }}
                                >Cancel</div>
                            </div>










                        </div>



                    </div>

                </div>
            )}

            {(citySelected && !provinceSelected && (selectedCities != null ) )&& (
                <>
                   <div className={styles.sites_container}>
                       {
                           <section className={styles.site_form_container}>
                               <img src="/images/arrow/arrow-left.svg" alt="title" width={22} style={{rotate: "180deg"}}
                                    onClick={() => {
                                        setProvinceSelected(true)
                                        setCItySelected(false)
                                        setSelectedCities([])
                                    }}/>
                               <div className={styles.header_site_form_container}>
                                <img src="/images/conversionIcon.svg" alt=""/>
                                <h1>انتخاب سایت</h1>
                               </div>
                               <div className={styles.site_name_container}>
                                   {
                                       abaali.map((item, index) =>
                                           (
                                               <div className={styles.site_link_name_container} key={index}>
                                                   <a href={`sites/${item.sitename}`}>
                                                       {item.sitename}
                                                   </a>
                                               </div>
                                           ))
                                   }
                               </div>
                           </section>
                       }
                   </div>
                </>
            )}


            <motion.div className={styles.container}>
                <div className={styles.map}>
                    <button
                        className={
                            mapZoom
                                ? styles.zoom_btn + " " + styles.zoom_out
                                : styles.zoom_btn + " " + styles.zoom_in
                        }
                        onClick={() => {
                            setMapZoom(!mapZoom);
                        }}
                    />
                    <motion.svg
                        className={
                            mapZoom ? styles.svg + " " + styles.map_zoom : styles.svg
                        }
                        id="mySvg"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="20 0 970 960"
                        enableBackground="new 20 0 970 960"
                        xmlSpace="preserve"
                    >
                        <g className={styles.border}>
                            <path className={styles.iran} d={iranBorder}/>
                        </g>
                        <g className={styles.province}>
                            {provinces.map((province: any) => (
                                <motion.path  whileHover={{scale:1.2}} whileTap={{scale:0.9}}
                                    ref={(el) => (pathRefs.current[province.id] = el)}
                                    key={province.id}
                                    className={province.className}
                                    d={province.d}
                                    onClick={() =>handleClick(province.className,province.id)}
                                       /* setProvinceName(province.className)
                                        props.setProvinceName(province.className)

                                         setPupop(true)
                                          props.setPupop(true)*/
                                   /* onMouseOver={() => handleMouseMapOver(province.name)}*/
                                    // onMouseLeave={() => {
                                    //     setProvinceName("")
                                    //     props.setProvinceName("")
                                    //     setPupop(false)
                                    //     props.setPupop(false)
                                    // }}
                                     onMouseLeave={() => handleMouseLeave(province.id)}

                                    // onClick={() => {
                                    //     setCities(province.cities);
                                    //     setProvinceSelected(true);
                                    //     setProvinceNameOnClick(province.className);
                                    //     filter_cities(province.className)
                                    // }}
                                />
                            ))}
                        </g>
                        {
                        /*<g className={styles.sea}>
                            <path className={styles.caspian} d={caspianD} />
                            <path
                                className={styles.persian_gulf}
                                onMouseOver={() => setProvinceName("جزایر خلیج فارس")}
                                onMouseLeave={() => setProvinceName("")}
                                d={persianGulfD}
                            />
                        </g>*/
                        }
                        <g className={styles.lake}>
                            <path
                                className={styles.jazmourian}
                                d=" M 735.39 728.39 C 739.32 725.48 744.50 726.12 749.09 726.06 C 748.87 730.23 748.85 734.76 746.25 738.27 C 744.31 740.90 742.24 743.89 739.07 745.09 C 735.82 743.00 735.87 738.59 734.78 735.26 C 734.53 733.01 733.02 729.97 735.39 728.39 Z"
                            />
                            <path
                                className={styles.qom}
                                d=" M 392.53 316.41 C 396.15 319.51 400.05 322.33 403.25 325.88 C 405.56 328.37 405.60 331.94 406.17 335.09 C 399.76 335.20 393.56 333.51 387.51 331.56 C 390.12 326.86 392.05 321.79 392.53 316.41 Z"
                            />
                            <path
                                className={styles.urmia}
                                d=" M 70.94 100.38 C 76.66 94.04 88.01 97.27 90.48 105.14 C 89.12 111.83 86.35 118.54 87.47 125.50 C 88.30 127.83 90.56 129.30 92.62 130.47 C 95.27 131.90 98.30 130.53 101.12 130.96 C 104.02 131.89 105.83 134.55 107.85 136.66 C 105.87 138.36 103.19 140.92 105.12 143.69 C 109.33 148.80 115.47 152.40 118.27 158.65 C 118.78 159.50 118.71 160.29 118.05 161.03 C 115.60 163.09 112.39 164.01 109.96 166.10 C 109.61 169.05 109.90 172.04 109.99 175.00 C 107.00 174.40 103.25 174.51 101.33 171.69 C 96.74 164.74 92.82 157.11 86.45 151.56 C 83.31 148.97 83.19 144.67 81.91 141.10 C 80.21 136.23 78.11 131.51 76.67 126.55 C 75.23 125.31 73.66 124.19 72.49 122.68 C 71.82 120.64 71.96 118.40 72.41 116.33 C 73.48 112.43 78.57 111.08 79.29 107.06 C 79.94 102.30 74.03 101.97 70.94 100.38 Z"
                            />
                        </g>
                    </motion.svg>

                </div>
            </motion.div>
        </> ):(<div style={{    width: '100%',
                 height: '100%',
                 position: 'absolute',
                 left: '15%',
                 top: '28%'}}>
                 <ProgressBar
                     visible={true}
                     height="200"
                     width="200"
                     barColor="#000"
                     ariaLabel="progress-bar-loading"
                     borderColor="none"
                     wrapperStyle={{}}
                     wrapperClass=""
                 />
                </div>)
    );
};

export default IranMap;