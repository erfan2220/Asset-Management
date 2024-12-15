//@ts-nocheck
import React, {useEffect, useState} from 'react';
import Rate from "../../../../Components/AssetPage/dataCharts/rateColor/Rate"
import TimeZone from "../TimeZone/TimeZone";
import "./ProvinceData.css"
import {provinceNameVariations} from "../../../../database/dictionaryProvinces/dictionaryProvinces";




const ProvinceData = ({
                      pupop,
                      siteNameClicked,
                      provinceName,
                      totalCount,
                      dataPerProvince,
                      t,
                      format,
                  }) =>
{

    const [daysDates ,setDaysDates ]=useState([]);

    const compareProvinceNames = (provinceName1: string | null | undefined, provinceName2: string | null | undefined): string | null =>
    {
        if (!provinceName1 || !provinceName2)
        {
            return false; // If either of the province names is null or undefined, return null
        }

        const normalize = (name: string) => name.toLowerCase().replace(/\s+/g, '');
        const normalizedProvince1 = normalize(provinceName1);
        const normalizedProvince2 = normalize(provinceName2);

        for (const groupObj of provinceNameVariations)
        {
            const groupKey = Object.keys(groupObj)[0];
            const variations = Object.values(groupObj)[0].map(normalize);

            if (variations.includes(normalizedProvince1) && variations.includes(normalizedProvince2)) {
                return groupKey; // Return the group key where the match was found
            }
        }

        return false; // No match found for both province names in any group
    };

    const filter_siteCount = (province: string): number =>
    {
        const groupDictionary: { [key: string]: string[] } = {};

        const filterItems = totalCount.sites_count.filter(item => {
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
    };

    const filter_traffic_CS= (province)=>
    {
        const filterItems = dataPerProvince? dataPerProvince['total_cs'] :"data is not available now"
        return filterItems;
    }
    const filter_traffic_PS= (province)=>
    {
        const filterItems = (dataPerProvince? dataPerProvince['total_ps'] :"data is not available now")
        return filterItems;
    }

    const filter_cost_per_province= (province)=>
    {
        const filterItems = dataPerProvince? dataPerProvince['total_cost'] :"data is not available now"
        return filterItems;
    }
    const filter_margin_per_province= (province)=>
    {
        const filterItems = dataPerProvince? dataPerProvince['total_margin'] :"data is not available now"
        return filterItems;
    }
    const filter_profit_per_province= (province)=>
    {
        const filterItems = dataPerProvince? dataPerProvince['total_profit'] :"data is not available now"
        return filterItems;
    }
    const filter_revenue_per_province= (province)=>
    {
        const filterItems = dataPerProvince? dataPerProvince['total_revenue'] :"data is not available now"

        return filterItems;
    }

    if (!pupop || siteNameClicked !== null) return null;

    const renderDataItem = (title, value, unit) => (
        <div className="total_map_data_item_for_quantity">
            <div className="total_map_data_item_2">
                <h3>{t(title)}</h3>
                <p>{value || "data is not available"}</p>
            </div>
            <div className="total_map_data_item_3">
                <Rate value={+4} dayDates={daysDates} />
                {unit && <h6 className="text-nowrap">{unit}</h6>}
            </div>
        </div>
    );

    const renderSection = (title, data) => (
        <div className="data_row_box">
            <h2>{t(title)}</h2>
            <div className="row_items_traffic">{data}</div>
        </div>
    );

    //
    // useEffect(() => {
    //     const handleData = (data, setter) => {
    //         if (data) {
    //             setter(data); // Set state with fetched data
    //         }
    //     };
    //
    //     // Calculate start and end of the year dynamically
    //     const currentYear = new Date().getFullYear();
    //     const startOfYear = `${currentYear}-01-01`;
    //     const endOfYear = `${currentYear}-12-31`;
    //
    //     console.log("Year Range:", startOfYear, endOfYear);
    //
    //     // Set loading to true initially
    //     setLoading(true);
    //
    //     // Array of fetch calls
    //     const fetchCalls = [
    //         fetch(`http://10.15.90.72:9098/api/daily-traffic/site-traffic/province/${provinceName}?toDate=3/27/2024 12:00:00 AM&fromDate=3/27/2024 12:00:00 AM`)
    //             .then((response) => response.json())
    //             .then((data) => handleData(data, setTotalTraffic)),
    //
    //         fetch(`http://10.15.90.72:9098/api/fix-cost/iran-fix-cost?fromDate=3/01/2024%2012:00:00%20AM&toDate=3/26/2024%2012:00:00%20AM`)
    //             .then((response) => response.json())
    //             .then((data) => handleData(data, setTotalFixedCost)),
    //
    //         fetch(`http://10.15.90.72:9098/api/variable-cost/iran-variable-cost?fromDate=2024-03-01&toDate=2024-12-03`)
    //             .then((response) => response.json())
    //             .then((data) => handleData(data, setTotalVariableCost)),
    //
    //         fetch(`http://10.15.90.72:9098/api/revenue/country-revenue?fromDate=3/01/2024%%2012:00:00%20AM&toDate=03/12/2024%2012:00:00%20AM`)
    //             .then((response) => response.json())
    //             .then((data) => handleData(data, setRevenue)),
    //
    //         fetch("http://10.15.90.87:5001/api/assets/sites_location")
    //             .then((res) => res.json())
    //             .then((res) => {
    //                 setSitePoints(res.data); // Assuming data is an array of site points
    //                 console.log("Site Points:", res.data);
    //             }),
    //     ];
    //
    //     // Wait for all fetches to complete
    //     Promise.all(fetchCalls)
    //         .then(() => {
    //             // All fetches have completed successfully
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             // Handle errors from any of the fetch calls
    //             console.error('Error fetching data:', error);
    //             setLoading(false); // Set loading to false even if there's an error
    //         });
    // }, []);
    //
    //
    // //This useEffect is used for calender
    // useEffect(() => {
    //     const handleData = (data, setter) => {
    //         if (data) {
    //             setter(data); // If data is valid, set the state
    //         }
    //     };
    //
    //     if (daysDates.length > 0)
    //     {
    //
    //         const formatDate = (dateStr) =>
    //         {
    //             const date = new Date(dateStr);
    //             const year = date.getFullYear();
    //             const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    //             const day = String(date.getDate()).padStart(2, '0');
    //             return `${year}-${month}-${day}`;
    //         };
    //
    //         const formatDate2 = (dateStr) =>
    //         {
    //             const date = new Date(dateStr);
    //             const year = date.getFullYear();
    //             const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    //             const day = String(date.getDate()).padStart(2, '0');
    //             return `${month}/${day}/${year}`;
    //         };
    //
    //         const fromDate = formatDate(daysDates[0]);
    //         const toDate = daysDates.length > 1 ? formatDate(daysDates[1]) : formatDate(daysDates[0]);
    //
    //         const fromDate2 = formatDate2(daysDates[0]);
    //         const toDate2 = daysDates.length > 1 ? formatDate2(daysDates[1]) : formatDate2(daysDates[0]);
    //
    //         console.log("todayFormatttt", fromDate, toDate);
    //
    //         // Set loading to true initially
    //         setLoading(true);
    //
    //         // Array of fetch calls
    //         const fetchCalls = [
    //             // fetch(`http://10.15.90.72:9098/api/daily-traffic/site-traffic/iran?toDate=${toDate}%2012:00:00%20AM&fromDate=${fromDate}%2012:00:00%20AM`)
    //             fetch(`http://10.15.90.72:9098/api/daily-traffic/site-traffic/iran?toDate=09/30/2024%2012:00:00%20AM&fromDate=09/01/2024%2012:00:00%20AM`)
    //                 .then((response) => response.json())
    //                 .then((data) => handleData(data, setTotalTraffic)),
    //
    //             fetch(`http://10.15.90.72:9098/api/fix-cost/iran-fix-cost?fromDate=09/01/2024%2012:00:00%20AM&toDate=09/30/2024%2012:00:00%20AM`)
    //                 // fetch(`http://10.15.90.72:9098/api/fix-cost/iran-fix-cost?fromDate=3/26/2024%2012:00:00%20AM&toDate=3/26/2024%2012:00:00%20AM`)
    //                 .then((response) => response.json())
    //                 .then((data) => handleData(data, setTotalFixedCost)),
    //
    //             fetch(`http://10.15.90.72:9098/api/variable-cost/iran-variable-cost?fromDate=09/01/2024}&toDate=09/30/2024`)
    //                 // fetch(`http://10.15.90.72:9098/api/variable-cost/iran-variable-cost?fromDate=2024-11-29&toDate=2024-11-29`)
    //                 .then((response) => response.json())
    //                 .then((data) => handleData(data, setTotalVariableCost)),
    //
    //             // fetch(`http://10.15.90.72:9098/api/revenue/country-revenue?fromDate=3/26/2024%2012:00:00%20AM&toDate=4/26/2024%2012:00:00%20AM`)
    //             fetch(`http://10.15.90.72:9098/api/revenue/country-revenue?fromDate=09/01/2024%2012:00:00%20AM&toDate=09/30/2024%2012:00:00%20AM`)
    //                 .then((response) => response.json())
    //                 .then((data) => handleData(data, setRevenue)),
    //
    //             fetch("http://10.15.90.87:5001/api/assets/sites_location")
    //                 .then((res) => res.json())
    //                 .then((res) => {
    //                     setSitePoints(res.data); // Assuming data is an array of site points
    //                     console.log("rererreres", res.data);
    //                 }),
    //         ];
    //
    //         // Wait for all fetches to complete
    //         Promise.all(fetchCalls)
    //             .then(() => {
    //                 // All fetches have completed successfully
    //                 setLoading(false);
    //             })
    //             .catch((error) => {
    //                 // Handle errors from any of the fetch calls
    //                 console.error('Error fetching data:', error);
    //                 setLoading(false); // Set loading to false even if there's an error
    //             });
    //     }
    // }, [daysDates]);




    return (
        <div className="total_map_data">
            <div className="tabs_header_to_map"></div>

                {/*<img src="./images/Province.svg" alt=""/>*/}
                {/*<h2 className="text-[#000000] font-[600]">*/}
                {/*    {capitalizeFirstLetter(provinceName)}*/}
                {/*</h2>*/}
                <TimeZone daysDates={daysDates} setDaysDates={setDaysDates}/>

            <div className="total_map_data_item_group">
                <div className="halfOfData">
                         <h3>{t("Site Counts")}</h3>
                        <p>
                            {totalCount
                                ? format(
                                    provinceName === "Khuzestan"
                                        ? filter_siteCount("Khouzestan")
                                        : provinceName === "Ardebil"
                                            ? filter_siteCount("ardabil")
                                            : filter_siteCount(provinceName)
                                )
                                : "data is not available"}
                        </p>
                </div>
            </div>
            {renderSection("Traffic", [
                renderDataItem(
                    "Traffic PS",
                    dataPerProvince &&
                    format(
                        provinceName === "Khuzestan"
                            ? filter_traffic_PS("Khouzestan")
                            : filter_traffic_PS(provinceName)
                    ),
                    "GB"
                ),
                renderDataItem(
                    "Traffic CS",
                    dataPerProvince &&
                    format(
                        provinceName === "Khuzestan"
                            ? filter_traffic_CS("Khouzestan")
                            : filter_traffic_CS(provinceName)
                    ),
                    "Erlang"
                ),
            ])}
            {renderSection("Costs and revenue", [
                renderDataItem(
                    "Cost",
                    dataPerProvince &&
                    format(
                        provinceName === "Khuzestan"
                            ? filter_cost_per_province("Khouzestan")
                            : filter_cost_per_province(provinceName)
                    ),
                    "ریال"
                ),
                renderDataItem(
                    "Margin",
                    dataPerProvince &&
                    format(
                        provinceName === "Khuzestan"
                            ? filter_margin_per_province("Khouzestan")
                            : filter_margin_per_province(provinceName)
                    ),
                    "%"
                ),
                renderDataItem(
                    "Profit",
                    dataPerProvince &&
                    format(
                        provinceName === "Khuzestan"
                            ? filter_profit_per_province("Khouzestan")
                            : filter_profit_per_province(provinceName)
                    ),
                    "ریال"
                ),
                renderDataItem(
                    "Total revenue",
                    dataPerProvince &&
                    format(
                        provinceName === "Khuzestan"
                            ? filter_revenue_per_province("Khouzestan")
                            : filter_revenue_per_province(provinceName)),
                    "ریال"
                ),
            ])}
        </div>
    );
};

export default ProvinceData;
