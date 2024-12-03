//@ts-nocheck
import React, {useRef, useState} from 'react';
import {t} from "../../../../translationUtil";
import {Calendar, DateObject} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";


const TimeZone = ({daysDates,setDaysDates}) =>
{

    const Year=[1403,1402,1401,1400,1399,1398,1397,1396,1395,1394,1393,1392,1391,1390];
    const Month=[12,11,10,9,8,7,6,5,4,3,2,1];
    const Day=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

    const [year,setYear]=useState(null)
    const [month,setMonth]=useState(null)
    const [day,setDay]=useState(null)

    const [openSelectiveIndex, setOpenSelectiveIndex] = useState(0)
    const [closeFirstCalender,setCloseFirstCalender]=useState(false)
    const [closeSecondCalender,setCloseSecondCalender]=useState(false)
    const [openSelectiveTime, setOpenSelectiveTime] = useState(false)

    const [calenderSelection, setCalenderSelection] = useState(1)

    const [values, setValues] = useState([
        new DateObject({ calendar: persian, locale: persian_fa })
    ]);
    const [loading, setLoading] = useState(false)
    const calenderRef = useRef()

    const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;


    const handleSelectiveOpen=()=>
    {
        setOpenSelectiveTime(!openSelectiveTime)
    }

    const handleSelectiveOpenIndex=(number:number)=>
    {
        setOpenSelectiveIndex(number);
    }

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

    const formatDate = (date) => {
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };

    const handleFilterChange = (type) =>
    {
        setOpenSelectiveTime(false)
        const [startDate, endDate] = calculateDateRange(type);

        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);

        console.log("startDate","endDate",formattedStartDate,formattedEndDate)
        // console.log("startDate","endDate",values)
        // Update daysDates in Gregorian format
        setDaysDates([formattedStartDate, formattedEndDate]);
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

    const handleDateConversion = (jy, jm, jd) =>
    {
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

    return (
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
                        daysDates.length > 0 &&
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
                                <img src="./images/map/Calender/close.svg" alt=""
                                     onClick={() => setCloseSecondCalender(false)}/>


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

                <div
                    className=" relative rounded-[8px] bg-[#f5f6f7] border-[1px] border-[#e0e0e0] w-[80px] py-[6px]  flex flex-row items-center justify-center gap-[3px]">
                    <div className={calenderSelection === 1 ? "bg-[#B3D7FF] p-[5px]" : "p-[5px]"}
                         onClick={() => handleSelection(1)}>
                        <img
                            src="./images/Asset/map/View1/Selection/Calender.svg"
                            alt=""/>
                    </div>
                    {
                        calenderSelection === 1 && closeFirstCalender &&
                        <div
                            className="p-[20px] z-50 absolute right-0 top-[50px] bg-white border-[1px] border-[#e0e0e0] rounded-[4px]">
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
    );
};

export default TimeZone;