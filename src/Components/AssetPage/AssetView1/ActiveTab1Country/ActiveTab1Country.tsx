//@ts-nocheck
import React, {useEffect, useRef, useState} from 'react';
import {Calendar, DateObject} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Rate from "../../dataCharts/rateColor/Rate";
import loading from "../../../Loading/Loading";
import "./ActiveTab1Country.css"
import {Shamsi} from "basic-shamsi";
import {provinceNameVariations} from "../../../../database/dictionaryProvinces/dictionaryProvinces";


const ActiveTab1Country = (props) =>
{




    const [calenderSelection,setCalenderSelection]=useState(1)
    const [dataCountry,setDataCountry]=useState([])
    const [siteTypesOpen,setSiteTypesOpen]=useState(false)
    const [calenderOpen,setCalenderOpen]=useState(false)
    const [sitePoints, setSitePoints] = useState([]);

    const [totalTraffic,setTotalTraffic]=useState(null)
    const [totalCount,setTotalCount]=useState(null)
    const [cellsCount,setCellsCount]=useState(null)
    const [cityCount,setCityCount]=useState(null)
    const [totaldata,setTotaldata]=useState(null)

    const [cellsSitePerProvince ,setCellsSitePerProvince ]=useState()
    const [values, setValues] = useState([
        new DateObject({ calendar: persian, locale: persian_fa })
    ]);

    const [loading,setLoading]=useState(false)

    const calenderRef=useRef()

    const [daysDates,setDaysDates]=useState([])


    const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;

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

    const getCanonicalProvinceName = (provinceName) => {
        for (const groupObj of provinceNameVariations) {
            const variations = Object.values(groupObj)[0];
            if (variations.some(variation => variation.toLowerCase() === provinceName.toLowerCase())) {
                return variations[0]; // Return the first variation as the canonical name
            }
        }
        return provinceName; // Return the original name if no match found
    };

    const handleDateChange = (dates) =>
    {

        setValues(dates);

        // Convert each date to Shamsi format (e.g., '۱۴۰۳/۰۷/۰۱')
        const persianDates = dates.map(date => date.format("YYYY/MM/DD"));


        // Convert each Persian date to Miladi (Gregorian)
        const miladiDates = persianDates.map(date => convertToMiladi(date));

        console.log("Persian Dates:", persianDates);
        console.log("Miladi (Gregorian) Dates:", miladiDates);

        setDaysDates(miladiDates)


    };



    useEffect(() =>
    {
        const promises = [];
        const promise1 = fetchAndCacheData("sites_count_cache", "http://10.15.90.87:5001/api/assets/sites_count_per_province")
            .then(data => {
                // Handle the data as needed
                // console.log("Sites count per province data", data);
                setTotalCount(data);
            })
            .catch(error => {
                // Handle errors
                console.error("Error fetching sites count per province data:", error);
            });

        promises.push(promise1);

        // Fetch cells count per province data
        const promise2 = fetchAndCacheData("cells_count_cache_datatat", "http://10.15.90.87:5001/api/assets/cells_count_per_province")
            .then(data => {
                // Handle the data as needed
                // console.log("kljdsldjfslk", data);
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
                // console.log("Cities per province data:", data);
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
                // console.log("Traffic per province data:", data);
                setTotalTraffic(data);
            })
            .catch(error => {
                // Handle errors
                console.error("Error fetching traffic per province data:", error);
            });

        promises.push(promise4);

        // Fetch traffic per province data
        const promise5 = fetchAndCacheData("traffic_per_all_country",
            "http://10.15.90.87:5001/api/assets/traffic_total")
            .then(data => {
                // Handle the data as needed
                setTotaldata(data);
            })
            .catch(error => {
                // Handle errors
                console.error("Error fetching traffic per province data:", error);
            });

        promises.push(promise5);


        const promise6 = fetchAndCacheData("sites_count_per_country",
            "http://10.15.90.87:5001/api/assets/sites_count_per_tech")
            .then(data2 => {
                // Handle the data as needed
                props.setData(data2);

            })
            .catch(error => {
                console.log(error)
            });

        promises.push(promise6);

        const promise7 = fetchAndCacheData("cell_counts_per_all_country",
            "http://10.15.90.87:5001/api/assets/cells_count")
            .then(data2 => {
                // Handle the data as needed
                // setDataPerProvince(data2);
                setCellsSitePerProvince(data2)

            })
            .catch(error => {
                // Handle errors
                console.log(error)
            });

        promises.push(promise7);



        const promise8 = fetchAndCacheData("data_countr44444",
            "http://10.15.90.72:9098/api/iran-total-traffic?fromDateTime=2024-10-04&toDateTime=2024-10-04")
            .then(data2 => {
                // Handle the data as needed
                setDataCountry(data2);
            })
            .catch(error => {
                // Handle errors
                console.log(error)
            });

        promises.push(promise8);




        // Wait for all promises to resolve
        Promise.all(promises)
            .then(() => {

                setLoading(true); // Set loading to false once all data is fetched
            });


    }, []);


    const numberFormatter = new Intl.NumberFormat('en-US', {
        style: 'decimal',

    });

    const handleSelection=(index)=>
    {
        setCalenderSelection (index)
        setCalenderOpen(true)
    }


    useEffect(() =>
    {
        const handleData = (data, setter) => {
            if (data) {
                setter(data); // If data is valid, set the state
            }
        };



        if(daysDates.length>0)
        {

            const formatDate = (dateStr) => {
                const date = new Date(dateStr);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            };

            const fromDate =  formatDate(daysDates[0]);  // Use the first date for both cases
            const toDate = daysDates.length >1 ?formatDate(daysDates[1]) : formatDate(daysDates[0]);


            fetch(`http://10.15.90.72:9098/api/iran-total-traffic?fromDateTime=${fromDate}&toDateTime=${toDate}`)
                .then(response => {
                    if (!response.ok) {
                        // throw new Error('Network response was not ok');
                    }
                    return response.json(); // Convert response to JSON
                }).then(data => {
                handleData(data, setDataCountry)


            }).catch(error => {
                // Handle errors
                console.error('Error fetching data:', error);
            });


            fetch("http://10.15.90.87:5001/api/assets/sites_location")
                .then((res) =>
                {
                    if (!res.ok)
                    {
                        // throw new Error("Failed to fetch");
                    }
                    return res.json();
                })
                .then((res) => {
                    setSitePoints(res.data); // Assuming data is an array of site points
                    console.log("rererreres",res.data)
                })
                .catch((error) => {
                    alert("Data is not available");
                });
        }
    }, [daysDates]);



    useEffect(()=>
    {
        //get site counts
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

        if(props.provinceName !=="")
        {
            const canonicalProvinceName = getCanonicalProvinceName(props.provinceName);


            fetch(`http://10.15.90.87:5001/api/assets/province_profit_margin/${canonicalProvinceName}`)
                .then(response => {
                    if (!response.ok) {
                        // throw new Error('Network response was not ok');
                    }
                    return response.json(); // Convert response to JSON
                }).then(data => {
                setDataPerProvince(data?.data[0]);
            }).catch(error => {
                // Handle errors
                console.error('Error fetching data:', error);
            });



            // console.log("province name:",provinceName)
            //

        }

    },[props.provinceName])

    const format = (number)=>
    {
        const formattedNumber = numberFormatter.format(number);
        return formattedNumber;
    }

    return (
        loading?
             <div className="total_map_data">
            <div className="header_total_map_data_2">
                <div className="header_total_map_data_1">
                    <img src="./images/Asset/map/View1/total_svg.svg" alt=""/>
                    <h2>Total statistics </h2>
                </div>
                <div className="flex flex-row items-center gap-[20px]">
                    <div className="relative border-[1px] border-[#e0e0e0] bg-[#f5f6f7] py-[10px]
                                                         rounded-[8px]  flex flex-row items-center justify-between w-[130px] pl-[16px] pr-[16px]"
                         onClick={() => {
                             setSiteTypesOpen(!siteTypesOpen)
                         }}>
                        <span>Total</span>
                        <img src="/images/Asset/map/View1/CaretDown.svg" alt=""/>
                        {siteTypesOpen && (
                            <div className="border-[1px] border-[#e0e0e0]flex flex-col
                                                                 gap-[6px] absolute top-[50px] left-0 bg-[#fafafa] w-[100%] ">
                                <p className="hover:bg-blue-500 py-[8px] pl-[8px]">جاده
                                    ای </p>
                                <p className="hover:bg-blue-500  py-[8px] pl-[8px]">شهری </p>
                                <p className="hover:bg-blue-500  py-[8px] pl-[8px]"> USO </p>
                                <p className="hover:bg-blue-500  py-[8px] pl-[8px]"> WLL </p>
                            </div>)}
                    </div>

                    <div className="border-[1px] border-[#e0e0e0] bg-[#f5f6f7] py-[10px] pl-[16px] pr-[16px]
                                                         rounded-[8px]  flex flex-row items-center justify-between w-[163px]">
                        <img src="/images/Asset/map/View1/CalendarBlank.svg"
                             alt=""/>
                        <span className="text-nowrap">this week</span>
                        <img src="/images/Asset/map/View1/CaretDown.svg" alt=""/>

                    </div>

                    <div
                        className=" relative rounded-[8px] bg-[#f5f6f7] border-[1px] border-[#e0e0e0] w-[80px] py-[6px]  flex flex-row items-center justify-center gap-[3px]">
                        <div
                            className={calenderSelection === 1 ? "bg-[#B3D7FF] p-[5px]" : "p-[5px]"}
                            onClick={() => handleSelection(1)}>
                            <img
                                src="./images/Asset/map/View1/Selection/Calender.svg"
                                alt=""/>
                            {
                                calenderSelection === 1 && calenderOpen &&
                                <div
                                    className="p-[20px] z-50 absolute right-0 top-[50px] bg-white border-[1px] border-[#e0e0e0] rounded-[4px]"
                                    ref={calenderRef}>
                                    <Calendar calendar={persian} locale={persian_fa}
                                              range
                                              rangeHover value={values}
                                              onChange={handleDateChange}/>

                                    {/*<DatePicker  calendar={persian}*/}
                                    {/*           locale={persian_fa} value={value} onChange={setValue}   multiple*/}
                                    {/*             dateSeparator=" & "/>*/}
                                </div>
                            }
                        </div>
                        <div
                            className={calenderSelection === 2 ? "bg-[#B3D7FF] p-[5px]" : "p-[5px]"}
                            onClick={() => handleSelection(2)}>
                            <img
                                src="./images/Asset/map/View1/Selection/default.svg"
                                alt=""/>
                        </div>

                    </div>

                </div>


            </div>
            <div className="total_map_data_item_group">
                <div className="total_map_data_item_spp1">
                    <h3>Site Counts</h3>
                    <p>{format(sitePoints.length)}

                    </p>
                </div>
                <div className="total_map_data_item_spp2">
                    <h3>Cell Counts</h3>
                    <p>464,085</p>
                </div>
            </div>
            <div className="data_row_box">
                <h2>Total traffic</h2>
                <div className="row_items_traffic">
                    <div className="total_map_data_item_for_quantity_3">
                        <div className="total_map_data_item_2">
                            <h3>Traffic PS</h3>
                            <p>{dataCountry.content.length > 0 ? format(dataCountry?.content[dataCountry?.content.length - 1][`totalPS`]) : "data is not available"}</p>
                        </div>
                        <div className="total_map_data_item_3">
                            <Rate value="4"/>
                            <h6>TB</h6>
                        </div>
                    </div>
                    <div className="total_map_data_item_for_quantity">
                        <div className="total_map_data_item_2">
                            <h3>Traffic CS</h3>
                            <p>{dataCountry.content.length > 0 ? format(dataCountry?.content[dataCountry?.content.length - 1][`totalCS`]) : "data is not available"}</p>
                        </div>

                        <div className="total_map_data_item_3">
                            <Rate value="4"/>
                            <h6>TB</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className="data_row_box">
                <h2>Costs and revenue</h2>
                <div className="row_items_traffic">
                    <div className="total_map_data_item_for_quantity">
                        <div className="total_map_data_item_2">
                            <h3>Cost</h3>
                            <p>{dataCountry.content.length > 0 ? format(dataCountry?.content[dataCountry?.content.length - 1][`totalCost`]) : "data is not available"}</p>
                        </div>
                        <div className="total_map_data_item_3">
                            <Rate value="4"/>
                            <h6>تومان</h6>
                        </div>
                    </div>
                    <div className="total_map_data_item_for_quantity">
                        <div className="total_map_data_item_2">
                            <h3>Margin</h3>
                            <p>{dataCountry.content.length > 0 ? format(dataCountry?.content[dataCountry?.content.length - 1][`totalMargin`]) : "data is not available"}</p>
                        </div>
                        <div className="total_map_data_item_3">
                            <Rate value="4"/>
                            <h6>%</h6>
                        </div>
                    </div>
                    <div className="total_map_data_item_for_quantity">
                        <div className="total_map_data_item_2">
                            <h3>Profit</h3>
                            <p>{dataCountry.content.length > 0 ? format(dataCountry?.content[dataCountry?.content.length - 1][`totalProfit`]) : "data is not available"}</p>
                        </div>
                        <div className="total_map_data_item_3">
                            <Rate value="4"/>
                            <h6>تومان</h6>
                        </div>
                    </div>
                    <div className="total_map_data_item_for_quantity">
                        <div className="total_map_data_item_2">
                            <h3>Total revenue</h3>
                            <p>{dataCountry.content.length > 0 ? format(dataCountry?.content[dataCountry?.content.length - 1][`totalRev`]) : "data is not available"}</p>
                        </div>
                        <div className="total_map_data_item_3">
                            <Rate value="4"/>
                            <h6>تومان</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>:
            <div>loading</div>);
};

export default ActiveTab1Country;