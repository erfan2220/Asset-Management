//@ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
import {useSelector} from "react-redux";
import Rate from "./rateColor/Rate";
import CircularProgressBar from "./CircularProgressBar/CircularProgressBar";
import HorizontalProgressBar from "./HorizontalProgressBar/HorizontalProgressBar";
import LineChart from "./lineCharts/LineChart";

/*
const chartsHeader=[
    {
        name:"Good Health",
        value:5102,
        percentage:8,
        numbersGrow:"+324"
    },
    {
        name:"Fair Health",
        value:2200,
        percentage:-8,
        numbersGrow:"+324"
    },
    {
        name:"Poor Health",
        value:2200,
        percentage:8,
        numbersGrow:"-102"
    },
    {
        name:"No Score",
        value:354,
        percentage:8,
        numbersGrow:"+32"
    }
]
*/

const chartData = [
    { name: "Good Health", value: 80, color: "#58A0FF" },
    { name: "Fair Health", value: 60, color: "#A179FF" },
    { name: "Poor Health", value: 40, color: "#FE6D96" },
    { name: "No Score", value: 80, color: "#E5F2FF" }
];


const barData = [
    { name: 'Nokia', value: 70, color: '#58A0FF' },
    { name: 'Huawei', value: 50, color: '#A179FF' },
    { name: 'Ericsson', value: 30, color: '#FE6D96' }
];

const DataCharts = () => {

    const chartsHeader = useSelector((state) => state.charts.chartsHeader);

    return (
        <div>
            <div className="w-full  py-[32px] pl-[32px] pr-[312px]
            bg-white flex flex-row justify-between border-[1px]">
                {chartsHeader.map((itemHeader) => (
                    <div className="border-l-[1px] border-l-[#40404529] pl-[32px] flex flex-col gap-[14px]">
                        <h2 className="text-[16px] text-[#757575]">{itemHeader.name}</h2>
                        <div className="flex flex-row gap-[10px]">
                            <p className="text-[#0F172A] text-[28px] font-[600]">{itemHeader.value}</p>
                            <Rate value={itemHeader.value}/>
                        </div>
                        <p className="text-[16px] text-[#757575]">{itemHeader.numbersGrow} since last year</p>
                    </div>
                ))}


            </div>

            <div className="grid grid-cols-2 gap-[24px] mt-[24px]">
                <div className="bg-white h-[400px] col-span-1 pt-[24px] pb-[35px] pl-[35px] pr-[56px] shadow-md">
                    <div className="flex flex-row items-center gap-[12px]">
                        <div className="flex justify-center items-center p-[8px] bg-[#E9FAEF] rounded-[4px]">
                            <img src="/images/Asset/dataCharts/Health.svg" alt=""/>
                        </div>
                        <h2 className="text-[#0F172A] text-[18px] font-[600]">Health</h2>
                    </div>

                    <div>
                        <CircularProgressBar data={chartData}/>
                    </div>


                </div>

                <div className="bg-white h-[400px] col-span-1 pt-[24px] pb-[35px] pl-[35px] pr-[56px] shadow-md">
                    <div className="flex flex-row items-center gap-[12px]">
                        <div className="flex justify-center items-center p-[8px] bg-[#FFEDDC] rounded-[4px]">
                            <img src="/images/Asset/dataCharts/FailureRate.svg" alt=""/>
                        </div>
                        <h2 className="text-[#0F172A] text-[18px] font-[600]">Failure rate per manufacturer</h2>
                    </div>

                    <div>
                        <HorizontalProgressBar data={barData}/>
                    </div>


                </div>


            </div>

            <div className="bg-white mt-[24px] pt-[24px] pb-[35px] pl-[35px] pr-[56px] shadow-md">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-[12px]">
                        <div className="flex justify-center items-center p-[8px] bg-[#FFEDDC] rounded-[4px]">
                            <img src="/images/Asset/dataCharts/repair.svg" alt=""/>
                        </div>
                        <h2 className="text-[#0F172A] text-[18px] font-[600]">Unplanned downtime</h2>
                    </div>

                    <div className="flex flex-row items-center gap-[8px]">

                        <div className="flex flex-row items-center gap-[28px] py-[10px] pl-[16px] pr-[12px] border-[1px] border-[#e0e0e0] rounded-[4px]">
                            <div className="flex flex-row gap-[8px]">
                                <img src="/images/Asset/dataCharts/calender.svg" alt=""/>
                                <h2>Month</h2>
                            </div>
                            <img src="/images/Asset/dataCharts/arrowDown.svg" alt=""/>
                        </div>

                        <div className="flex justify-center items-center p-[11px] border-[1px] rounded-[4px]  border-[#e0e0e0]">
                            <img src="/images/Asset/dataCharts/arrowLeft.svg" alt=""/>
                        </div>

                        <div className="flex justify-center items-center p-[11px] border-[1px] rounded-[4px] border-[#e0e0e0]">
                            <img src="/images/Asset/dataCharts/arrowRight.svg" alt=""/>
                        </div>


                    </div>

                </div>

                <div className="flex flex-col gap-[8px] mt-[34px]">
                    <h2 className=" font-[600] text-[20px] text-[#0F172A]">102</h2>
                    <span className="text-[16px] text-[#757575] ">hours downtime</span>
                </div>


                <div className="mt-[24px]">
                    <LineChart />
                </div>


            </div>


        </div>
    );
};

export default DataCharts;