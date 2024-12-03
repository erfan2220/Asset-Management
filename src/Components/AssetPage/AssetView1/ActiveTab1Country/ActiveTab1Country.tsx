//@ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { Calendar, DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Rate from "../../dataCharts/rateColor/Rate";
import loading from "../../../Loading/Loading";
import "./ActiveTab1Country.css"
import { Shamsi } from "basic-shamsi";
import { provinceNameVariations } from "../../../../database/dictionaryProvinces/dictionaryProvinces";
import { t } from '../../../../translationUtil';
import LoadingProgress from "../../../Loading/Loading";


const ActiveTab1Country = (props) =>
{

    const [calenderSelection, setCalenderSelection] = useState(3)
    const [dataCountry, setDataCountry] = useState([])
    const [siteTypesOpen, setSiteTypesOpen] = useState(false)
    const [calenderOpen, setCalenderOpen] = useState(false)
    const [sitePoints, setSitePoints] = useState([]);


    // const [totalCount, setTotalCount] = useState(null)
    // const [cellsCount, setCellsCount] = useState(null)
    // const [cityCount, setCityCount] = useState(null)
    // const [totaldata, setTotaldata] = useState(null)


    const [siteData, setSiteData] = useState(null)

    //Data to  set
    const [totalTraffic, setTotalTraffic] = useState(null)
    const [totalFixedCost, setTotalFixedCost] = useState(null)
    const [totalVariableCost, setTotalVariableCost] = useState(null)
    const [revenue, setRevenue] = useState(null)

    const [profit, setProfit] = useState(null)
    const [margin, setMargin] = useState(null)


    const [closeFirstCalender,setCloseFirstCalender]=useState(false)
    const [closeSecondCalender,setCloseSecondCalender]=useState(false)

    const Year=[1403,1402,1401,1400,1399,1398,1397,1396,1395,1394,1393,1392,1391,1390];

    const Month=[12,11,10,9,8,7,6,5,4,3,2,1];

    const Day=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

    const [year,setYear]=useState(null)
    const [month,setMonth]=useState(null)
    const [day,setDay]=useState(null)


    const [openSelectiveTime, setOpenSelectiveTime] = useState(false)

    const [openSelectiveIndex, setOpenSelectiveIndex] = useState(0)

    const [cellsSitePerProvince, setCellsSitePerProvince] = useState()

    const [values, setValues] = useState([
        new DateObject({ calendar: persian, locale: persian_fa })
    ]);

    const [loading, setLoading] = useState(true)

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

    //default Data before this
    // useEffect(() => {
    //     const promises = [];
    //     // const promise1 = fetchAndCacheData("",
    //     //     "http://10.15.90.72:9098/api/daily-traffic/site-traffic/iran?toDate=${toDate}%2012:00:00%20AM&fromDate=${fromDate}%2012:00:00%20AM")
    //     //     .then(data2 => {
    //     //         // Handle the data as needed
    //     //     })
    //     //     .catch(error => {
    //     //         console.log(error)
    //     //     });
    //     // promises.push(promise1);
    //     //
    //     // const promise2 = fetchAndCacheData("",
    //     //     "http://10.15.90.72:9098/api/daily-traffic/site-traffic/iran?toDate=${toDate}%2012:00:00%20AM&fromDate=${fromDate}%2012:00:00%20AM")
    //     //     .then(data2 => {
    //     //         // Handle the data as needed
    //     //     })
    //     //     .catch(error => {
    //     //         console.log(error)
    //     //     });
    //     // promises.push(promise2);
    //     //
    //     // const promise3 = fetchAndCacheData("",
    //     //     "http://10.15.90.72:9098/api/daily-traffic/site-traffic/iran?toDate=${toDate}%2012:00:00%20AM&fromDate=${fromDate}%2012:00:00%20AM")
    //     //     .then(data2 => {
    //     //         // Handle the data as needed
    //     //     })
    //     //     .catch(error => {
    //     //         console.log(error)
    //     //     });
    //     // promises.push(promise3);
    //     //
    //     // const promise4 = fetchAndCacheData("",
    //     //     "http://10.15.90.72:9098/api/daily-traffic/site-traffic/iran?toDate=${toDate}%2012:00:00%20AM&fromDate=${fromDate}%2012:00:00%20AM")
    //     //     .then(data2 => {
    //     //         // Handle the data as needed
    //     //     })
    //     //     .catch(error => {
    //     //         console.log(error)
    //     //     });
    //     // promises.push(promise4);
    //     //
    //     // const promise5 = fetchAndCacheData("",
    //     //     "http://10.15.90.72:9098/api/daily-traffic/site-traffic/iran?toDate=${toDate}%2012:00:00%20AM&fromDate=${fromDate}%2012:00:00%20AM")
    //     //     .then(data2 => {
    //     //         // Handle the data as needed
    //     //     })
    //     //     .catch(error => {
    //     //         console.log(error)
    //     //     });
    //     // promises.push(promise5);
    //
    //         // fetch(`http://10.15.90.72:9098/api/daily-traffic/site-traffic/iran?toDate=${toDate}%2012:00:00%20AM&fromDate=${fromDate}%2012:00:00%20AM`)
    //         // fetch(`http://10.15.90.72:9098/api/fix-cost/iran-fix-cost?fromDate=${fromDate2}%2012:00:00%20AM&toDate=${toDate2}%2012:00:00%20AM`)
    //         // fetch(`http://10.15.90.72:9098/api/variable-cost/iran-variable-cost?fromDate=${fromDate}&toDate=${toDate}`)
    //         // // fetch(`http://10.15.90.72:9098/api/revenue/country-revenue?fromDate=3/26/2024%2012:00:00%20AM&toDate=4/26/2024%2012:00:00%20AM`)
    //         // fetch(`http://10.15.90.72:9098/api/revenue/country-revenue?fromDate=${fromDate2}%2012:00:00%20AM&toDate=${toDate2}%2012:00:00%20AM`)
    //         // fetch("http://10.15.90.87:5001/api/assets/sites_location")
    //
    //     const promise6 = fetchAndCacheData("sites_count_per_country",
    //         "http://10.15.90.87:5001/api/assets/sites_count_per_tech")
    //         .then(data2 => {
    //             // Handle the data as needed
    //             props.setData(data2);
    //
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         });
    //
    //     promises.push(promise6);
    //
    //     const promise8 = fetchAndCacheData("data_countr44444",
    //         "http://10.15.90.72:9098/api/iran-total-traffic?fromDateTime=2024-10-04&toDateTime=2024-10-04")
    //         .then(data2 => {
    //             // Handle the data as needed
    //             setDataCountry(data2);
    //         })
    //         .catch(error => {
    //             // Handle errors
    //             console.log(error)
    //         });
    //
    //     promises.push(promise8);
    //
    //     // Wait for all promises to resolve
    //     Promise.all(promises)
    //         .then(() => {
    //
    //             setLoading(false); // Set loading to false once all data is fetched
    //         });
    //
    //
    // }, []);

    useEffect(() => {
        const handleData = (data, setter) => {
            if (data) {
                setter(data); // Set state with fetched data
            }
        };

        // Calculate start and end of the year dynamically
        const currentYear = new Date().getFullYear();
        const startOfYear = `${currentYear}-01-01`;
        const endOfYear = `${currentYear}-12-31`;

        console.log("Year Range:", startOfYear, endOfYear);

        // Set loading to true initially
        setLoading(true);

        // Array of fetch calls
        const fetchCalls = [
            fetch(`http://10.15.90.72:9098/api/daily-traffic/site-traffic/iran?toDate=3/26/2024%2012:00:00%20AM&fromDate=3/01/2024%2012:00:00%20AM`)
                .then((response) => response.json())
                .then((data) => handleData(data, setTotalTraffic)),

            fetch(`http://10.15.90.72:9098/api/fix-cost/iran-fix-cost?fromDate=3/01/2024%2012:00:00%20AM&toDate=3/26/2024%2012:00:00%20AM`)
                .then((response) => response.json())
                .then((data) => handleData(data, setTotalFixedCost)),

            fetch(`http://10.15.90.72:9098/api/variable-cost/iran-variable-cost?fromDate=2024-03-01&toDate=2024-12-03`)
                .then((response) => response.json())
                .then((data) => handleData(data, setTotalVariableCost)),

            fetch(`http://10.15.90.72:9098/api/revenue/country-revenue?fromDate=3/01/2024%%2012:00:00%20AM&toDate=03/12/2024%2012:00:00%20AM`)
                .then((response) => response.json())
                .then((data) => handleData(data, setRevenue)),

            fetch("http://10.15.90.87:5001/api/assets/sites_location")
                .then((res) => res.json())
                .then((res) => {
                    setSitePoints(res.data); // Assuming data is an array of site points
                    console.log("Site Points:", res.data);
                }),
        ];

        // Wait for all fetches to complete
        Promise.all(fetchCalls)
            .then(() => {
                // All fetches have completed successfully
                setLoading(false);
            })
            .catch((error) => {
                // Handle errors from any of the fetch calls
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading to false even if there's an error
            });
    }, []);


    //This useEffect is used for calender
    useEffect(() => {
        const handleData = (data, setter) => {
            if (data) {
                setter(data); // If data is valid, set the state
            }
        };

        if (daysDates.length > 0)
        {

            const formatDate = (dateStr) =>
            {
                const date = new Date(dateStr);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            };

            const formatDate2 = (dateStr) =>
            {
                const date = new Date(dateStr);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                const day = String(date.getDate()).padStart(2, '0');
                return `${month}/${day}/${year}`;
            };

            const fromDate = formatDate(daysDates[0]);
            const toDate = daysDates.length > 1 ? formatDate(daysDates[1]) : formatDate(daysDates[0]);

            const fromDate2 = formatDate2(daysDates[0]);
            const toDate2 = daysDates.length > 1 ? formatDate2(daysDates[1]) : formatDate2(daysDates[0]);

            console.log("todayFormatttt", fromDate, toDate);

            // Set loading to true initially
            setLoading(true);

            // Array of fetch calls
            const fetchCalls = [
                // fetch(`http://10.15.90.72:9098/api/daily-traffic/site-traffic/iran?toDate=${toDate}%2012:00:00%20AM&fromDate=${fromDate}%2012:00:00%20AM`)
                fetch(`http://10.15.90.72:9098/api/daily-traffic/site-traffic/iran?toDate=09/30/2024%2012:00:00%20AM&fromDate=09/01/2024%2012:00:00%20AM`)
                    .then((response) => response.json())
                    .then((data) => handleData(data, setTotalTraffic)),

                fetch(`http://10.15.90.72:9098/api/fix-cost/iran-fix-cost?fromDate=09/01/2024%2012:00:00%20AM&toDate=09/30/2024%2012:00:00%20AM`)
                // fetch(`http://10.15.90.72:9098/api/fix-cost/iran-fix-cost?fromDate=3/26/2024%2012:00:00%20AM&toDate=3/26/2024%2012:00:00%20AM`)
                    .then((response) => response.json())
                    .then((data) => handleData(data, setTotalFixedCost)),

                fetch(`http://10.15.90.72:9098/api/variable-cost/iran-variable-cost?fromDate=09/01/2024}&toDate=09/30/2024`)
                // fetch(`http://10.15.90.72:9098/api/variable-cost/iran-variable-cost?fromDate=2024-11-29&toDate=2024-11-29`)
                    .then((response) => response.json())
                    .then((data) => handleData(data, setTotalVariableCost)),

                // fetch(`http://10.15.90.72:9098/api/revenue/country-revenue?fromDate=3/26/2024%2012:00:00%20AM&toDate=4/26/2024%2012:00:00%20AM`)
                fetch(`http://10.15.90.72:9098/api/revenue/country-revenue?fromDate=09/01/2024%2012:00:00%20AM&toDate=09/30/2024%2012:00:00%20AM`)
                    .then((response) => response.json())
                    .then((data) => handleData(data, setRevenue)),

                fetch("http://10.15.90.87:5001/api/assets/sites_location")
                    .then((res) => res.json())
                    .then((res) => {
                        setSitePoints(res.data); // Assuming data is an array of site points
                        console.log("rererreres", res.data);
                    }),
            ];

            // Wait for all fetches to complete
            Promise.all(fetchCalls)
                .then(() => {
                    // All fetches have completed successfully
                    setLoading(false);
                })
                .catch((error) => {
                    // Handle errors from any of the fetch calls
                    console.error('Error fetching data:', error);
                    setLoading(false); // Set loading to false even if there's an error
                });
        }
    }, [daysDates]);


    // useEffect(() =>
    // {
    //
    //     const formatDate = (dateStr) => {
    //         const date = new Date(dateStr);
    //         const year = date.getFullYear();
    //         const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    //         const day = String(date.getDate()).padStart(2, '0');
    //         return `${year}-${month}-${day}`;
    //     };
    //
    //     const formatDate2 = (dateStr) => {
    //         const date = new Date(dateStr);
    //         const year = date.getFullYear();
    //         const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    //         const day = String(date.getDate()).padStart(2, '0');
    //         return `${month}/${day}/${year}`;
    //     };
    //
    //     const today = new Date();
    //     const todayFormatted1 = formatDate(today);
    //     const todayFormatted2 = formatDate2(today);
    //
    //     console.log("todayFormatted1",todayFormatted1)
    //     console.log("todayFormatted2",todayFormatted2)
    //
    //     const fromDate = formatDate(daysDates[0]);  // Use the first date for both cases
    //     const toDate = daysDates.length > 1 ? formatDate(daysDates[1]) : formatDate(daysDates[0]);
    //
    //     const fromDate2 = formatDate2(daysDates[0]);  // Use the first date for both cases
    //     const toDate2 = daysDates.length > 1 ? formatDate2(daysDates[1]) : formatDate2(daysDates[0]);
    //
    //     if (props.siteNameClicked && daysDates.length < 1) {
    //         fetch(`http://10.15.90.72:9098/api/revenue/site-revenue/${props.siteNameClicked}?fromDate=${todayFormatted1}&toDate=${todayFormatted1}`)
    //             .then((res) => res.json())  // Parse as JSON
    //             .then((res) => {
    //                 setSiteData(res);
    //             })
    //             .catch((error) => {
    //                 console.error("Error fetching site data:", error);
    //             });
    //
    //         fetch(`http://10.15.90.72:9098/api/daily-traffic/site-traffic/${props.siteNameClicked}?fromDate=${todayFormatted2}&toDate=${todayFormatted2}`)
    //             .then((res) => res.json())  // Parse as JSON
    //             .then((res) => {
    //                 setTotalTraffic(res);
    //             })
    //             .catch((error) => {
    //                 console.error("Error fetching site data:", error);
    //             });
    //
    //
    //         // fetch(`http://10.15.90.72:9098/api/fix-cost/calculate-site-fix-cost/Tehran/${props.siteNameClicked}?fromDateTime=${todayFormatted1}&toDateTime=${todayFormatted1}`)
    //         //     .then((res) => res.json())  // Parse as JSON
    //         //     .then((res) =>
    //         //     {
    //         //         console.log("Site Data for", props.siteNameClicked, res.siteTotalFixCostData);
    //         //         setCostData(res);
    //         //     })
    //         //     .catch((error) => {
    //         //         console.error("Error fetching site data:", error);
    //         //     });
    //
    //         fetch(`http://10.15.90.72:9098/api/financial-state/site/${props.siteNameClicked}?date=${todayFormatted1}`)
    //             .then((res) => res.json())  // Parse as JSON
    //             .then((res) =>
    //             {
    //                 console.log("Site Data for", props.siteNameClicked, res);
    //                 setProfitMarginData(res);
    //             })
    //             .catch((error) => {
    //                 console.error("Error fetching site data:", error);
    //             });
    //
    //     }
    //     else if (props.siteNameClicked && daysDates.length > 0) {
    //         fetch(`http://10.15.90.72:9098/api/revenue/site-revenue/TH1340?fromDate=${fromDate}4&toDate=${toDate}`)
    //             .then((res) => res.json())  // Parse as JSON
    //             .then((res) => {
    //                 setSiteData(res);
    //             })
    //             .catch((error) => {
    //                 console.error("Error fetching site data:", error);
    //             });
    //
    //
    //         fetch(`http://10.15.90.72:9098/api/daily-traffic/site-traffic/${props.siteNameClicked}?fromDate=${fromDate2}&toDate=${toDate2}`)
    //             .then((res) => res.json())  // Parse as JSON
    //             .then((res) =>
    //             {
    //                 setDataTraffic(res);
    //             })
    //             .catch((error) => {
    //                 console.error("Error fetching site data:", error);
    //             });
    //
    //         // fetch(`http://10.15.90.72:9098/api/fix-cost/calculate-site-fix-cost/Tehran/${props.siteNameClicked}?fromDateTime=${fromDate}&toDateTime=${toDate}`)
    //         //     .then((res) => res.json())  // Parse as JSON
    //         //     .then((res) =>
    //         //     {
    //         //         console.log("Site Data for", props.siteNameClicked, res);
    //         //         setCostData(res);
    //         //     })
    //         //     .catch((error) => {
    //         //         console.error("Error fetching site data:", error);
    //         //     });
    //
    //         fetch(`http://10.15.90.72:9098/api/financial-state/site/${props.siteNameClicked}?date=${todayFormatted1}`)
    //             .then((res) => res.json())  // Parse as JSON
    //             .then((res) =>
    //             {
    //                 console.log("Site Data for", props.siteNameClicked, res);
    //                 setProfitMarginData(res);
    //             })
    //             .catch((error) => {
    //                 console.error("Error fetching site data:", error);
    //             });
    //     }
    // }, [props.siteNameClicked, daysDates]);


    const numberFormatter = new Intl.NumberFormat('en-US', {
        style: 'decimal',

    });

    const handleSelection = (index) =>
    {
        setCalenderSelection(index)

        if(index===1)
        {
            setCloseFirstCalender(!closeFirstCalender)
            setCloseSecondCalender(false)
            setYear(null)
            setMonth(null)
            setDay(null)
        }

        else if(index===2)
        {
            setCloseFirstCalender(false)
            setCloseSecondCalender(!closeSecondCalender)
        }


    }





    useEffect(() =>
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

        // if (props.provinceName !== "") {
        //     const canonicalProvinceName = getCanonicalProvinceName(props.provinceName);
        //
        //
        //     fetch(`http://10.15.90.87:5001/api/assets/province_profit_margin/${canonicalProvinceName}`)
        //         .then(response => {
        //             if (!response.ok) {
        //                 // throw new Error('Network response was not ok');
        //             }
        //             return response.json(); // Convert response to JSON
        //         }).then(data => {
        //             setDataPerProvince(data?.data[0]);
        //         }).catch(error => {
        //             // Handle errors
        //             console.error('Error fetching data:', error);
        //         });
        //
        //
        //
        //     // console.log("province name:",provinceName)
        //     //
        //
        // }

    }, [props.provinceName])

    const format = (number) => {
        const formattedNumber = numberFormatter.format(number);
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
            case "month":
                endDate = new Date(today);
                startDate = new Date(today);
                startDate.setDate(startDate.getMonth() - 1);
                break;
            case "season":
                endDate = new Date(today);
                startDate = new Date(today);
                startDate.setMonth(startDate.getMonth() - 3);
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

    const handleFilterChange = (type) =>
    {
        setOpenSelectiveTime(false)
        const [startDate, endDate] = calculateDateRange(type);

        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);

        // Update calendar with new dates
        // setValues([
        //     new DateObject({ date: formattedStartDate, calendar: persian, locale: persian_fa }),
        //     new DateObject({ date: formattedEndDate, calendar: persian, locale: persian_fa })
        // ]);

        console.log("startDate","endDate",formattedStartDate,formattedEndDate)
        // console.log("startDate","endDate",values)
        // Update daysDates in Gregorian format
        setDaysDates([formattedStartDate, formattedEndDate]);
    };

    const formatDate = (date) => {
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };




    const handleYear=(year)=>
    {
        console.log("yeararrar",year)
        setYear(year)
    }
    const handleMonth=(month)=>
    {
        console.log("month",month)
        setMonth(month)
    }
    const handleDay=(day)=>
    {
        console.log("day",day)
        setDay(day)
    }

    const handleTime =()=>
    {
        const gregorianDate = handleDateConversion(year, month, day);
        console.log("daysDates",gregorianDate)
        setDaysDates([gregorianDate])
        console.log("daysDates",daysDates)
    }

    const handleDateConversion = (jy, jm, jd) => {
        const gDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const jDaysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

        // Helper function to check leap year in Gregorian calendar
        const isGregorianLeap = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

        // Calculate the Jalali year in days
        let jDayNo = 365 * (jy - 1) + Math.floor((jy - 1) / 33) * 8 + Math.floor(((jy - 1) % 33 + 3) / 4);
        for (let i = 0; i < jm - 1; i++) {
            jDayNo += jDaysInMonth[i];
        }
        jDayNo += jd - 1;

        // Base Gregorian year and its starting days offset
        const gEpochDay = 1721425.5; // Julian day for Gregorian year 1
        const jEpochDay = 1948320.5; // Julian day for Jalali year 1
        const gDayNo = jDayNo + (jEpochDay - gEpochDay);

        // Calculate Gregorian year
        let gy = Math.floor(gDayNo / 365.2425);
        let remDays = gDayNo - Math.floor(gy * 365.2425);

        // Adjust for leap year
        if (remDays < 0) {
            gy--;
            remDays += isGregorianLeap(gy) ? 366 : 365;
        }

        // Calculate Gregorian month and day
        let gm = 0;
        const isLeap = isGregorianLeap(gy);
        while (gm < 12 && remDays >= gDaysInMonth[gm] + (gm === 1 && isLeap ? 1 : 0)) {
            remDays -= gDaysInMonth[gm] + (gm === 1 && isLeap ? 1 : 0);
            gm++;
        }
        gm++; // Gregorian month is 1-based
        const gd = remDays + 1;

        // Format Gregorian date as YYYY/MM/DD
        const formattedDate = `${gy}/${gm.toString().padStart(2, '0')}/${gd.toString().padStart(2, '0')}`;
        return formattedDate;
    };


    console.log("total Traffic",totalTraffic)

    return (
        loading ?  <LoadingProgress/>:
            <div className="total_map_data">
                <div className="flex  flex-col">
                    <div className="header_total_map_data_2">
                    {/*<div className="header_total_map_data_1">*/}
                    {/*    <img src="./images/Asset/map/View1/total_svg.svg" alt="" />*/}
                    {/*    <h2>{t("Total statistics")} </h2>*/}
                    {/*</div>*/}

                    <div className="flex flex-row gap-[16px] items-center">

                        <div className="flex flex-row items-center gap-[20px] relative">


                            <div className="border-[1px] border-[#e0e0e0] bg-[#f5f6f7] py-[10px] pl-[16px] pr-[16px] rounded-[8px]
                        flex flex-row items-center justify-between min-w-[163px] relative"
                                 onClick={() => handleSelectiveOpen()}>
                                <img src="/images/Asset/map/View1/CalendarBlank.svg"
                                     alt=""/>
                                {
                                    openSelectiveIndex === 1 &&
                                    <span className="text-nowrap">
                                       {t("this Month")}
                                    </span>
                                }

                                {
                                    openSelectiveIndex === 2 &&
                                    <span className="text-nowrap">
                                       {t("this Season")}
                                    </span>
                                }

                                {
                                    openSelectiveIndex === 3 &&
                                    <span className="text-nowrap">
                                       {t("this Year")}
                                    </span>
                                }

                                {/*{*/}
                                {/*    daysDates?.length === 2 &&*/}
                                {/*    <span className="text-nowrap">*/}
                                {/*       {t("this Year")}*/}
                                {/*    </span>*/}
                                {/*}*/}


                                {daysDates.length < 1 && openSelectiveIndex === 1 &&
                                    <span className="text-nowrap">
                                       {t("this Month")}
                                    </span>
                                }
                                {
                                    daysDates.length < 1 && openSelectiveIndex === 2 &&
                                    <span className="text-nowrap">
                                       {t("this Season")}
                                    </span>
                                }

                                {
                                    daysDates.length < 1 && openSelectiveIndex === 3 &&
                                    <span className="text-nowrap">
                                       {t("this Year")}
                                    </span>
                                }

                                <img src="/images/Asset/map/View1/CaretDown.svg" alt=""/>

                            </div>

                            {
                                openSelectiveTime && (
                                    <div
                                        className="absolute bg-white w-[100%] border-[1px] border-[#e0e0e0] flex flex-col top-[50px] left-0 rounded-[4px] z-50 px-[16px] py-[10px]">
                                        <p className={openSelectiveIndex === 1 ? "text-[15px] text-[#007BFF] cursor-pointer font-[600] text-nowrap" :
                                            "text-[15px] text-[#424242] cursor-pointer font-[600] text-nowrap"}
                                           onClick={() => {
                                               handleSelectiveOpenIndex(1)
                                               handleFilterChange("month")
                                           }}>This Month</p>
                                        <p className={openSelectiveIndex === 2 ? "text-[15px] text-[#007BFF] mt-[20px] cursor-pointer font-[600] text-nowrap" :
                                            "text-[15px] text-[#424242] mt-[20px] cursor-pointer font-[600] text-nowrap"}
                                           onClick={() => {
                                               handleSelectiveOpenIndex(2)
                                               handleFilterChange("season")
                                           }}>This Season</p>
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
                        {
                            daysDates.length>0 &&
                            <div className="flex flex-row items-center gap-[20px] relative">
                                <div className="border-[1px] border-[#e0e0e0] bg-[#f5f6f7] py-[10px] pl-[16px] pr-[16px] rounded-[8px]
                        flex flex-row items-center  justify-between w-fit relative">

                                    {/*<img src="/images/Asset/map/View1/CalendarBlank.svg"*/}
                                    {/*     alt=""/>*/}

                                    {
                                        daysDates?.length === 1 &&
                                        <span className="text-nowrap">
                                       {daysDates[0]}
                                   </span>
                                    }

                                    {
                                        daysDates?.length === 2 &&
                                        <span className="text-nowrap">
                                       {daysDates[0]}-{daysDates[1]}
                                </span>
                                    }
                                    <img src="./images/map/Calender/close.svg" alt="" onClick={()=>setCloseSecondCalender(false)}/>


                                    {daysDates.length < 1 && openSelectiveIndex === 1 &&
                                        <span className="text-nowrap">
                                       {t("this Month")}
                                    </span>
                                    }
                                    {
                                        daysDates.length < 1 && openSelectiveIndex === 2 &&
                                        <span className="text-nowrap">
                                       {t("this Season")}
                                    </span>
                                    }

                                    {
                                        daysDates.length < 1 && openSelectiveIndex === 3 &&
                                        <span className="text-nowrap">
                                       {t("this Year")}
                                    </span>
                                    }

                                    {/*<img src="/images/Asset/map/View1/CaretDown.svg" alt=""/>*/}

                                </div>
                            </div>
                        }





                    </div>

                    <div className=" relative rounded-[8px] bg-[#f5f6f7] border-[1px] border-[#e0e0e0] w-[80px] py-[6px]  flex flex-row items-center justify-center gap-[3px]">
                        <div className={calenderSelection === 1 ? "bg-[#B3D7FF] p-[5px]" : "p-[5px]"}
                            onClick={() => handleSelection(1)}>
                            <img
                                src="./images/Asset/map/View1/Selection/Calender.svg"
                                alt=""/>
                        </div>
                        {
                            calenderSelection === 1 && closeFirstCalender &&
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
                        <div className={calenderSelection === 2 ? "bg-[#B3D7FF] p-[5px]" : "p-[5px]"}
                            onClick={() => handleSelection(2)}>
                            <img src="./images/Asset/map/View1/Selection/default.svg"
                                alt=""/>
                        </div>


                    </div>





                </div>
                    {
                        closeSecondCalender && calenderSelection === 2 &&
                        <div className="directionOfCalender  py-[10px] px-[14px] bg-[#E5F2FF] ">

                            <div className="newCalnender  flex flex-row items-center justify-between">
                                <div className="flex flex-row items-center justify-between w-full">

                                    <div
                                        className="yearPicker  w-[160px] h-[40px] border-[1px] bg-[#f5f6f7] py-[10px] px-[16px]">
                                        <select
                                            className="w-full bg-transparent border-none outline-none text-[#757070]"
                                            name=""
                                            id="" onChange={(e) => handleYear(Number(e.target.value))}>
                                            {Year.map((item) =>
                                                <option value={item}>سال {item}
                                                </option>
                                            )}
                                        </select>

                                    </div>

                                    <div
                                        className="monthPicker flex flex-row items-center gap-[16px] w-full h-[40px] py-[10px]">
                                        <div
                                            className=" flex flex-row items-center cursor-pointer  gap-[8px] w-full h-[40px]">
                                            {
                                                Month.map((item) =>
                                                    <div
                                                        className={month === item ? "bg-[#007BFF] rounded-[4px] w-[32px] h-[32px] flex flex-row items-center gap-[8px] justify-center border-[1px] border-[#e0e0e0]  text-white" :
                                                            "bg-[#f5f6f7] rounded-[4px] w-[32px] h-[32px] flex flex-row items-center gap-[8px] justify-center border-[1px] border-[#e0e0e0] bg-[#f5f6f7] text-[#757070]"}
                                                        onClick={() => handleMonth(item)}>
                                                        {item}
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className="w-full">
                                            <span>ماه</span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="newCalnender flex flex-row items-center justify-between mt-[14px]">
                                <div className="  w-[139px] h-[40px] border-[1px] bg-[#f5f6f7] py-[10px] px-[16px]">
                                    <select className="w-full bg-transparent border-none outline-none text-[#757070]"
                                            name="" id="" onChange={(e) => handleDay(Number(e.target.value))}>
                                        {Day.map((item) =>
                                            <option value={item}> روز {item}</option>
                                        )}
                                    </select>

                                </div>

                                <div
                                    className="text-[#007Bff] py-[7px] px-[21px] cursor-pointer border-[1px] border-[#007Bff] rounded-[4px]"
                                    onClick={() => handleTime()}>
                                    <span className="text-[15px]">اعمال تاریخ</span>
                                </div>


                            </div>


                        </div>
                    }
                </div>


                <div className="total_map_data_item_group">
                    <div className="total_map_data_item_spp1">
                        <h3>{t("Site Counts")}</h3>
                        <p>{format(sitePoints.length)}</p>
                    </div>

                </div>
                <div className="data_row_box">
                    <h2>{t("Traffic")}</h2>
                    <div className="row_items_traffic">
                        <div className="total_map_data_item_for_quantity_3">
                            <div className="total_map_data_item_2">
                                <h3>{t("Traffic PS")}</h3>

                                {/*{*/}
                                {/*    daysDates.length === 0 &&*/}
                                {/*    <p>{dataCountry.content.length > 0 ? format(dataCountry?.content[dataCountry?.content.length - 1][`totalPS`]) : "data is not available"}</p>*/}
                                {/*}*/}

                                {/*{*/}
                                {/*    daysDates.length > 0 &&*/}
                                {/*    <p>*/}
                                {/*        {totalTraffic ? format(totalTraffic.totalPsTraffic) : "data is not available"}*/}
                                {/*    </p>*/}
                                {/*}*/}

                                <p>{totalTraffic ? format(totalTraffic.totalPsTraffic) : "data is not available"}</p>

                                {/*<p>{dataCountry.content.length > 0 ? format(dataCountry?.content[dataCountry?.content.length - 1][`totalPS`]) : "data is not available"}</p>*/}
                                {/*<p>{dataCountry.content.length > 0 ? dataCountry?.content[dataCountry?.content.length - 1][`totalPS`] : "data is not available"}</p>*/}
                            </div>
                            <div className="total_map_data_item_3">
                                <Rate value="4" dayDates={[]}/>
                                <h6>GB</h6>
                            </div>
                        </div>
                        <div className="total_map_data_item_for_quantity">
                            <div className="total_map_data_item_2">
                                <h3>{t("Traffic CS")}</h3>


                                {/*{*/}
                                {/*    daysDates.length === 0 &&*/}
                                {/*    <p>{dataCountry.content.length > 0 ? format(dataCountry?.content[dataCountry?.content.length - 1][`totalCS`]) : "data is not available"}</p>*/}
                                {/*}*/}

                                {/*{*/}
                                {/*    daysDates.length>0 &&*/}
                                {/*    <p>{totalTraffic ? format(totalTraffic.totalCsTraffic) : "data is not available"}</p>*/}
                                {/*}*/}

                                <p>{totalTraffic ? format(totalTraffic.totalCsTraffic) : "data is not available"}</p>


                            </div>

                            <div className="total_map_data_item_3">
                            <Rate value="4" dayDates={[]}/>
                                <h6>Erlang</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="data_row_box">
                    <h2>{t("Cost and Revenue")}</h2>
                    <div className="row_items_traffic">
                        <div className="total_map_data_item_for_quantity">
                            <div className="total_map_data_item_2">
                                <h3>{t("Cost")}</h3>

                                {/*{*/}
                                {/*    daysDates.length === 0 &&*/}
                                {/*    <p>{dataCountry.content.length > 0 ? format(dataCountry?.content[dataCountry?.content.length - 1][`totalCS`]) : "data is not available"}</p>*/}
                                {/*}*/}

                                {/*{*/}
                                {/*    daysDates.length > 0 &&*/}
                                {/*    <p>{totalVariableCost ? format(totalVariableCost.totalVariableCostVoiceData + totalFixedCost.totalFixCostData) : "data is not available"}</p>*/}
                                {/*}*/}


                                <p>{totalVariableCost ? format(totalVariableCost.totalVariableCostVoiceData + totalFixedCost.totalFixCostData) : "data is not available"}</p>
                                {/*<p>{dataCountry.content.length > 0 ? dataCountry?.content[dataCountry?.content.length - 1][`totalCost`] : "data is not available"}</p>*/}
                            </div>
                            <div className="total_map_data_item_3">
                                <Rate value="4" dayDates={[]}/>
                                <h6 className="text-nowrap"> ریال</h6>
                            </div>
                        </div>
                        <div className="total_map_data_item_for_quantity">
                            <div className="total_map_data_item_2">
                                <h3>{t("Margin")}</h3>
                                {/*{*/}
                                {/*    calenderSelection === 1 &&*/}
                                {/*    <p>{dataCountry.content.length > 0 ? format(dataCountry?.content[dataCountry?.content.length - 1][`totalMargin`]) : "data is not available"}</p>*/}
                                {/*}*/}

                                {/*{*/}
                                {/*    calenderSelection === 2 &&*/}
                                {/*    <p>{totalVariableCost ? format(totalVariableCost.totalVariableCostVoiceData+totalFixedCost.totalFixCostData) : "data is not available"}</p>*/}
                                {/*}*/}
                                {/*<p>{dataCountry.content.length > 0 ? dataCountry?.content[dataCountry?.content.length - 1][`totalMargin`] : "data is not available"}</p>*/}
                                {/*{*/}
                                {/*    daysDates.length===0  &&*/}
                                {/*    <p>{dataCountry.content.length > 0 ? format(dataCountry?.content[dataCountry?.content.length - 1][`totalMargin`]) : "data is not available"}</p>*/}
                                {/*}*/}

                                {/*{*/}
                                {/*    daysDates.length>0  &&*/}
                                {/*    <p>{dataCountry.content.length > 0 ? format(dataCountry?.content[dataCountry?.content.length - 1][`totalMargin`]) : "data is not available"}</p>*/}
                                {/*}*/}
                                {/*<p>{dataCountry.content.length > 0 ? format(dataCountry?.content[dataCountry?.content.length - 1][`totalMargin`]) : "data is not available"}</p>*/}

                                <p>data is not available</p>
                            </div>
                            <div className="total_map_data_item_3">
                                <Rate value="4" dayDates={[]}/>
                                <h6>%</h6>
                            </div>
                        </div>
                        <div className="total_map_data_item_for_quantity">
                            <div className="total_map_data_item_2">
                                <h3>{t("Profit")}</h3>

                                {/*{*/}
                                {/*    daysDates.length===0 &&*/}
                                {/*<p>{dataCountry.content.length > 0 ? format(dataCountry?.content[dataCountry?.content.length - 1][`totalProfit`]) : "data is not available"}</p>*/}
                                {/*}*/}
                                <p>data is not available</p>
                                {/*{*/}
                                {/*    daysDates.length>0 &&*/}
                                {/*    <p>{dataCountry.content.length > 0 ? format(dataCountry?.content[dataCountry?.content.length - 1][`totalProfit`]) : "data is not available"}</p>*/}
                                {/*}*/}

                                {/*<p>{dataCountry.content.length > 0 ? dataCountry?.content[dataCountry?.content.length - 1][`totalProfit`] : "data is not available"}</p>*/}
                            </div>
                            <div className="total_map_data_item_3">
                                <Rate value="4" dayDates={[]}/>
                                <h6 className="text-nowrap"> ریال</h6>
                            </div>
                        </div>
                        <div className="total_map_data_item_for_quantity">
                            <div className="total_map_data_item_2">
                                <h3>{t("Total revenue")}</h3>
                                {/*{*/}
                                {/*    daysDates.length === 0 &&*/}
                                {/*    <p>{dataCountry.content.length > 0 ? format(dataCountry?.content[dataCountry?.content.length - 1][`totalRev`]) : "data is not available"}</p>*/}
                                {/*}*/}

                                {/*{*/}
                                {/*    daysDates.length > 0 &&*/}
                                {/*    <p>{revenue ? format(revenue.revenue) : "data is not available"}</p>*/}
                                {/*}*/}

                                <p>{revenue ? format(revenue.revenue) : "data is not available"}</p>

                                {/*<p>{dataCountry.content.length > 0 ? dataCountry?.content[dataCountry?.content.length - 1][`totalRev`] : "data is not available"}</p>*/}
                            </div>
                            <div className="total_map_data_item_3">
                                <Rate value="4" dayDates={[]}/>
                                <h6 className="text-nowrap">ریال</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div> );

};

export default ActiveTab1Country;