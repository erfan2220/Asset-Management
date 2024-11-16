//@ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { Calendar, DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Rate from "../../dataCharts/rateColor/Rate";
import { t } from "../../../../translationUtil";
import "./ActiveTab1Country.css"
import { Shamsi } from "basic-shamsi";
import { provinceNameVariations } from "../../../../database/dictionaryProvinces/dictionaryProvinces";



const SitaData = (props) =>
{
    const [calenderSelection, setCalenderSelection] = useState(1)
    const [siteData, setSiteData] = useState([])
    const [siteTypesOpen, setSiteTypesOpen] = useState(false)
    const [calenderOpen, setCalenderOpen] = useState(false)
    const [openSelectiveTime, setOpenSelectiveTime] = useState(false)
    const [openSelectiveIndex, setOpenSelectiveIndex] = useState(false)
    const [sitePoints, setSitePoints] = useState([]);

    const [totalTraffic, setTotalTraffic] = useState(null)
    const [totalCount, setTotalCount] = useState(null)
    const [cellsCount, setCellsCount] = useState(null)
    const [cityCount, setCityCount] = useState(null)
    const [totaldata, setTotaldata] = useState(null)
    const [dataTraffic,setDataTraffic]=useState(null)
    const [costData,setCostData]=useState(null)



    const [values, setValues] = useState([
        new DateObject({ calendar: persian, locale: persian_fa })
    ]);

    const [loading, setLoading] = useState(false)

    const calenderRef = useRef()

    const [daysDates, setDaysDates] = useState([])


    const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;

    async function fetchAndCacheData(cacheKey, apiUrl) {
        const cachedData = JSON.parse(localStorage.getItem(cacheKey)) || {};

        if (cachedData.data && Date.now() - cachedData.timestamp < CACHE_EXPIRATION_TIME) {
            return cachedData.data;
        }
        else {
            const response = await fetch(apiUrl);
            const jsonData = await response.json();
            localStorage.setItem(cacheKey, JSON.stringify({ data: jsonData, timestamp: Date.now() }));
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

    const handleDateChange = (dates) => {

        setValues(dates);

        // Convert each date to Shamsi format (e.g., '۱۴۰۳/۰۷/۰۱')
        const persianDates = dates.map(date => date.format("YYYY/MM/DD"));


        // Convert each Persian date to Miladi (Gregorian)
        const miladiDates = persianDates.map(date => convertToMiladi(date));

        console.log("Persian Dates:", persianDates);
        console.log("Miladi (Gregorian) Dates:", miladiDates);

        setDaysDates(miladiDates)


    };



    useEffect(() => {
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

        // Wait for all promises to resolve
        Promise.all(promises)
            .then(() => {

                setLoading(true); // Set loading to false once all data is fetched
            });


    }, []);


    const numberFormatter = new Intl.NumberFormat('en-US', {
        style: 'decimal',

    });

    const handleSelection = (index) => {
        setCalenderSelection(index)
        setCalenderOpen(true)
    }





    useEffect(() => {
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

        if (props.provinceName !== "") {
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

    }, [props.provinceName])

    // useEffect(() => {
    //     fetch(`http://10.15.90.72:9098/api/revenue/site-revenue/${props.siteNameClicked}?fromDate=4/01/2024&toDate=4/30/2024`)
    //         .then((res) => {
    //             console.log("trstrstsfdidsftidsf",res)
    //             setSiteData(res.data.content)
    //         })
    //         .catch((error) => {
    //             alert("Data is not available");
    //         });
    // }, [props.siteNameClicked]);


    useEffect(() =>
    {

        const formatDate = (dateStr) => {
            const date = new Date(dateStr);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        const formatDate2 = (dateStr) => {
            const date = new Date(dateStr);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const day = String(date.getDate()).padStart(2, '0');
            return `${month}/${day}/${year}`;
        };

        const today = new Date();
        const todayFormatted1 = formatDate(today);
        const todayFormatted2 = formatDate2(today);

        console.log("todayFormatted1",todayFormatted1)
        console.log("todayFormatted2",todayFormatted2)

        const fromDate = formatDate(daysDates[0]);  // Use the first date for both cases
        const toDate = daysDates.length > 1 ? formatDate(daysDates[1]) : formatDate(daysDates[0]);

        const fromDate2 = formatDate2(daysDates[0]);  // Use the first date for both cases
        const toDate2 = daysDates.length > 1 ? formatDate2(daysDates[1]) : formatDate2(daysDates[0]);

        if (props.siteNameClicked && daysDates.length < 1) {
            fetch(`http://10.15.90.72:9098/api/revenue/site-revenue/TH1340?fromDate=${todayFormatted1}&toDate=${todayFormatted1}`)
                .then((res) => res.json())  // Parse as JSON
                .then((res) => {
                    setSiteData(res);
                })
                .catch((error) => {
                    console.error("Error fetching site data:", error);
                });

            fetch(`http://10.15.90.72:9098/api/daily-traffic/site-traffic/${props.siteNameClicked}?fromDate=${todayFormatted2}&toDate=${todayFormatted2}`)
                .then((res) => res.json())  // Parse as JSON
                .then((res) => {
                    setDataTraffic(res);
                })
                .catch((error) => {
                    console.error("Error fetching site data:", error);
                });


            fetch(`http://10.15.90.72:9098/api/fix-cost/calculate-site-fix-cost/Tehran/${props.siteNameClicked}?fromDateTime=${todayFormatted1}&toDateTime=${todayFormatted1}`)
                .then((res) => res.json())  // Parse as JSON
                .then((res) =>
                {
                    console.log("Site Data for", props.siteNameClicked, res.siteTotalFixCostData);
                    setCostData(res);
                })
                .catch((error) => {
                    console.error("Error fetching site data:", error);
                });

        }
        else if (props.siteNameClicked && daysDates.length > 0) {
            fetch(`http://10.15.90.72:9098/api/revenue/site-revenue/TH1340?fromDate=${fromDate}4&toDate=${toDate}`)
                .then((res) => res.json())  // Parse as JSON
                .then((res) => {

                    setSiteData(res);
                })
                .catch((error) => {
                    console.error("Error fetching site data:", error);
                });


            fetch(`http://10.15.90.72:9098/api/daily-traffic/site-traffic/${props.siteNameClicked}?fromDate=${fromDate2}&toDate=${toDate2}`)
                .then((res) => res.json())  // Parse as JSON
                .then((res) =>
                {
                    setDataTraffic(res);
                })
                .catch((error) => {
                    console.error("Error fetching site data:", error);
                });

            fetch(`http://10.15.90.72:9098/api/fix-cost/calculate-site-fix-cost/Tehran/${props.siteNameClicked}?fromDateTime=${fromDate}&toDateTime=${toDate}`)
                .then((res) => res.json())  // Parse as JSON
                .then((res) =>
                {
                    console.log("Site Data for", props.siteNameClicked, res);
                    setCostData(res);
                })
                .catch((error) => {
                    console.error("Error fetching site data:", error);
                });
        }
    }, [props.siteNameClicked, daysDates]);


    const format = (number) =>
    {
        // console.log("number",number)
        const numberFloat=parseFloat(number);
        // console.log("numberFloat",numberFloat)
        const formattedNumber = numberFormatter.format(numberFloat);
        return formattedNumber;
    }
    const handleSelectiveOpen=()=>
    {
        setOpenSelectiveTime(!openSelectiveTime)
    }
    const handleSelectiveOpenIndex=(number:number)=>
    {
        setOpenSelectiveIndex(number);
    }
    const calculateDateRange =(type)=>
    {
        const today=new Date();
        let startDate,endDate;

        switch (type) {
            case "week":
                endDate = new Date(today);
                startDate = new Date(today);
                startDate.setDate(startDate.getDate() - 7);
                break;
            case "month":
                endDate = new Date(today);
                startDate = new Date(today);
                startDate.setMonth(startDate.getMonth() - 1);
                break;
            case "year":
                endDate = new Date(today);
                startDate = new Date(today);
                startDate.setFullYear(startDate.getFullYear() - 1);
                break;
            default:
                endDate = today;
                startDate = today;
        }
        return [startDate, endDate];
    }

    const handleFilterChange = (type) => {
        const [startDate, endDate] = calculateDateRange(type);

        console.log("startDate","endDate",startDate,endDate)

        // Update calendar with new dates
        setValues([
            new DateObject({ date: startDate, calendar: persian, locale: persian_fa }),
            new DateObject({ date: endDate, calendar: persian, locale: persian_fa })
        ]);

        // Update daysDates in Gregorian format
        setDaysDates([startDate, endDate]);
    };

    return (
        // loading ?
            <div className="total_map_data">
                <div className="header_total_map_data_2">
                    <div className="header_total_map_data_1">
                        <img src="./images/Asset/map/View1/total_svg.svg" alt="" />
                        <h2>{props.siteNameClicked} </h2>
                    </div>
                    <div className="flex flex-row items-center gap-[20px]">
                        {/*<div className="relative border-[1px] border-[#e0e0e0] bg-[#f5f6f7] py-[10px]*/}
                        {/*                                 rounded-[8px]  flex flex-row items-center justify-between w-[130px] pl-[16px] pr-[16px]"*/}
                        {/*    onClick={() => {*/}
                        {/*        setSiteTypesOpen(!siteTypesOpen)*/}
                        {/*    }}>*/}
                        {/*    <span>{t("Total")}</span>*/}
                        {/*    <span>Total</span>*/}
                        {/*    <img src="/images/Asset/map/View1/CaretDown.svg" alt="" />*/}
                        {/*    {siteTypesOpen && (*/}
                        {/*        <div className="border-[1px] border-[#e0e0e0]flex flex-col*/}
                        {/*                                         gap-[6px] absolute top-[50px] left-0 bg-[#fafafa] w-[100%] ">*/}
                        {/*            <p className="hover:bg-blue-500 py-[8px] pl-[8px]">جاده*/}
                        {/*                ای </p>*/}
                        {/*            <p className="hover:bg-blue-500  py-[8px] pl-[8px]">شهری </p>*/}
                        {/*            <p className="hover:bg-blue-500  py-[8px] pl-[8px]"> USO </p>*/}
                        {/*            <p className="hover:bg-blue-500  py-[8px] pl-[8px]"> WLL </p>*/}
                        {/*        </div>)}*/}
                        {/*</div>*/}

                        <div className="border-[1px] border-[#e0e0e0] bg-[#f5f6f7] py-[10px] pl-[16px] pr-[16px]
                                                         rounded-[8px]  flex flex-row items-center justify-between w-[163px] relative" onClick={()=>handleSelectiveOpen()}>
                            <img src="/images/Asset/map/View1/CalendarBlank.svg"
                                alt="" />



                                {
                                    openSelectiveIndex ===1 &&
                                    <span className="text-nowrap">
                                       {t("this week")}
                                    </span>
                                }
                                {
                                    openSelectiveIndex ===2 &&
                                    <span className="text-nowrap">
                                       {t("this Month")}
                                    </span>
                                }

                                {
                                    openSelectiveIndex ===3 &&
                                    <span className="text-nowrap">
                                       {t("this Year")}
                                    </span>
                                }





                            <img src="/images/Asset/map/View1/CaretDown.svg" alt="" />
                            {
                                openSelectiveTime && (

                                    <div
                                        className="absolute bg-white w-[165px] border-[1px] border-[#e0e0e0] flex flex-col top-[50px] left-0 rounded-[4px] z-50 px-[16px] py-[10px]">
                                        <p className={openSelectiveIndex === 1 ? "text-[15px] text-[#007BFF] cursor-pointer font-[600] text-nowrap" :
                                            "text-[15px] text-[#424242] cursor-pointer font-[600] text-nowrap"}
                                           onClick={() => {
                                               handleSelectiveOpenIndex(1)
                                               handleFilterChange("week")
                                           }}>This Week</p>
                                        <p className={openSelectiveIndex === 2 ? "text-[15px] text-[#007BFF] mt-[20px] cursor-pointer font-[600] text-nowrap" :
                                            "text-[15px] text-[#424242] mt-[20px] cursor-pointer font-[600] text-nowrap"}
                                           onClick={() => {
                                               handleSelectiveOpenIndex(2)
                                               handleFilterChange("month")
                                           }}>This Month</p>
                                        <p className={openSelectiveIndex === 3 ? "text-[15px] text-[#007BFF] mt-[20px] mb-[10px] cursor-pointer font-[600] text-nowrap" :
                                            "text-[15px] text-[#424242] mt-[20px] mb-[10px] cursor-pointer font-[600] text-nowrap"}
                                           onClick={() => {
                                               handleSelectiveOpenIndex(3)
                                               handleFilterChange("year")
                                           }}>This Year</p>

                                    </div>
                                )
                            }
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
                                    alt="" />
                            </div>

                        </div>

                    </div>


                </div>
                {/*<div className="total_map_data_item_group">*/}
                {/*    /!*<div className="total_map_data_item_spp1">*!/*/}
                {/*    /!*    <h3>Site Counts</h3>*!/*/}
                {/*    /!*    <p>{format(sitePoints.length)}*!/*/}

                {/*    /!*    </p>*!/*/}
                {/*    /!*</div>*!/*/}
                {/*    /!*<div className="total_map_data_item_spp22222">*!/*/}
                {/*    /!*    <h3>Cell Counts</h3>*!/*/}
                {/*    /!*    <p>data is not available</p>*!/*/}
                {/*    /!*</div>*!/*/}
                {/*</div>*/}
                <div className="data_row_box">
                    <h2>{t("Total traffic")}</h2>
                        <div className="total_map_data_item_for_quantity_32">
                            <div className="total_map_data_item_2">

                                <div className="row_items_traffic">
                                    <div className="total_map_data_item_for_quantity_3">
                                        <div className="total_map_data_item_2">
                                            <h3>Traffic PS</h3>
                                            <p>{dataTraffic ? format(dataTraffic?.totalPsTraffic) : "data is not available"}</p>
                                            {/*<p>{dataCountry.content.length > 0 ? format(dataCountry?.content[dataCountry?.content.length - 1][`totalPS`]) : "data is not available"}</p>*/}

                                        </div>
                                        <div className="total_map_data_item_3">
                                            <Rate value="4" />
                                            <h6>TB</h6>
                                        </div>
                                    </div>
                                    <div className="total_map_data_item_for_quantity">
                                        <div className="total_map_data_item_2">
                                            <h3>Traffic CS</h3>
                                            {/*<p>{dataCountry.content.length > 0 ? format(dataCountry?.content[dataCountry?.content.length - 1][`totalCS`]) : "data is not available"}</p>*/}
                                            <p>{dataTraffic ? format(dataTraffic?.totalCsTraffic) : "data is not available"}</p>
                                            {/*<p> data is not available</p>*/}
                                        </div>

                                        <div className="total_map_data_item_3">
                                        <Rate value="4" />
                                            <h6>TB</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="data_row_box_2">
                                <h2>Costs and revenue</h2>
                                <div className="total_map_data_item_2">
                                    <div className="row_items_traffic">
                                        <div className="total_map_data_item_for_quantity">
                                            <div className="total_map_data_item_2">
                                                <h3>{t("Cost")}</h3>
                                                {/*<p>{dataCountry.content.length > 0 ? format(dataCountry?.content[dataCountry?.content.length - 1][`totalCost`]) : "data is not available"}</p>*/}
                                                {/*<p>data is not available</p>*/}
                                                <p>{costData ? format(costData?.siteTotalFixCostData) : "data is not available"}</p>
                                            </div>
                                            <div className="total_map_data_item_3">
                                            <Rate value="4"/>
                                                <h6>تومان</h6>
                                            </div>
                                        </div>
                                        <div className="total_map_data_item_for_quantity">
                                            <div className="total_map_data_item_2">
                                                <h3>{t("Margin")}</h3>

                                                {/*<p>{dataCountry.content.length > 0 ? format(dataCountry?.content[dataCountry?.content.length - 1][`totalMargin`]) : "data is not available"}</p>*/}
                                                <p>data is not available</p>
                                            </div>
                                            <div className="total_map_data_item_3">
                                                <Rate value="4"/>
                                                <h6>%</h6>
                                            </div>
                                        </div>
                                        <div className="total_map_data_item_for_quantity">
                                            <div className="total_map_data_item_2">
                                                <h3>{t("Profit")}</h3>

                                                {/*<p>{dataCountry.content.length > 0 ? format(dataCountry?.content[dataCountry?.content.length - 1][`totalProfit`]) : "data is not available"}</p>*/}
                                                <p>data is not available</p>
                                            </div>
                                            <div className="total_map_data_item_3">
                                                <Rate value="4"/>
                                                <h6>تومان</h6>
                                            </div>
                                        </div>
                                        <div className="total_map_data_item_for_quantity">
                                            <div className="total_map_data_item_2">
                                                <h3>{t("Total revenue")}</h3>

                                                {/*<p>{dataCountry.content.length > 0 ? format(dataCountry?.content[dataCountry?.content.length - 1][`totalRev`]) : "data is not available"}</p>*/}
                                                <p>{siteData ? format(siteData?.revenue) : "data is not available"}</p>
                                            </div>
                                            <div className="total_map_data_item_3">
                                                <Rate value="4"/>
                                                <h6>تومان</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            {/*:*/}
                            {/* <div>loading</div> */}

                </div>
            </div>
    )


};


export default SitaData;