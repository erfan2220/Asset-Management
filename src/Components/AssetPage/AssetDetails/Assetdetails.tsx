import React, { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Rate from "../../AssetPage/dataCharts/rateColor/Rate"
import AssetScore from "./AssetScore/AssetScore";
import AssetTimeLine from "./AssetTimeLine/AssetTimeLine";
import AssetInformation from "./Assetinformation/AssetInformation";
import OptionalStatus from "./Optional Status/OptionalStatus";
import MaintenanceHistory from "./Maintenance history/MaintenanceHistory";
import Replacement from "./ReplaceMent/Replacement";

const AssetDetails = () => {
    const [activeTab, setActiveTab] = useState('Asset Information');



    const renderTabContent = () => {
        switch (activeTab) {
            case 'Asset Information':
                return (
                   <AssetInformation/>
                );
            case 'Asset Scores':
                return <div>
                    <AssetScore/>
                </div>;
            case 'Asset Timeline':
                return <div>
                    <AssetTimeLine/>
                </div>;
            case 'Optional Status':
                return <div>
                    <OptionalStatus/>
                </div>;
            case 'Maintenance History':
                return <div>
                    <MaintenanceHistory/>
                </div>;
            case 'Replacement Planning':
                return <div>
                    <Replacement/>
                </div>;
            default:
                return null;
        }
    };

    return (
        <div className="p-8  min-h-screen w-full">
            <div className="flex justify-between items-center mb-6">


                <div className="flex flex-row justify-between">
                    <h1 className="text-2xl font-bold">Asset Pmp130023</h1>




                </div>
                <div className="space-x-2">
                    <button className="border-[1px] border-[#e0e0e0] bg-white  text-[#4242424] py-2 px-4 rounded">Prev</button>
                    <button className="border-[1px] border-[#e0e0e0] bg-white  text-[#4242424] py-2 px-4 rounded">Next</button>
                    <button className="bg-[#007bFF] text-white py-2 px-4 rounded">Actions</button>
                </div>
            </div>

            <div>
                <div className="flex flex-row items-center gap-[77px]">
                    <div className="flex flex-row gap-[20px]">
                        <img src="/images/Asset/details/image.png" alt=""/>
                        <div className="flex flex-col gap-[10px]">
                            <div className="flex flex-row gap-[8px]">
                                <img src="/images/Asset/details/Group%201000005148.svg" alt=""/>
                                <span>Pump</span>
                            </div>
                            <span>Centrifugal pump 10005</span>
                        </div>
                    </div>

                    <div className="flex flex-row gap-[20px]">

                        <div className="flex flex-col gap-[10px]">
                            <div className="flex flex-row gap-[8px]">
                                <img src="/images/Asset/details/Group%201000005157.svg" alt=""/>
                                <span>Unspecified</span>
                            </div>

                            <div className="flex flex-row gap-[8px]">
                                <img src="/images/Asset/details/Group%201000005149.svg" alt=""/>
                                <span>Replaced</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Asset Info */}
            <div className="grid grid-cols-7  gap-6 mt-[24px]">
                {/* Health */}
                <div className="bg-white py-[16px] px-[18px] rounded shadow-md flex flex-col items-center">

                    <div className="flex flex-row justify-between w-full">
                        <p className="text-sm text-gray-500 mb-4">Health</p>
                        <Rate value={-8}/>
                    </div>
                    <div style={{ width: 80, height: 80 }}>
                        <CircularProgressbar
                            value={82}
                            text={`${82}%`}
                            styles={buildStyles({
                                pathColor: '#4CAF50',
                                textColor: '#000',
                                trailColor: '#eee',
                            })}
                        />
                    </div>

                </div>
                {/* Criticality */}
                <div className="bg-white py-[16px] px-[18px] rounded shadow-md flex flex-col items-center">
                    <div className="flex flex-row justify-between w-full">
                        <p className="text-sm text-gray-500 mb-4">Critically</p>
                        <Rate value={+8}/>
                    </div>
                    <div style={{ width: 80, height: 80 }}>
                        <CircularProgressbar
                            value={82}
                            text={`${82}%`}
                            styles={buildStyles({
                                pathColor: '#8E24AA',
                                textColor: '#000',
                                trailColor: '#eee',
                            })}
                        />
                    </div>

                </div>
                {/* Risk */}
                <div className="bg-white py-[16px] px-[18px] rounded shadow-md flex flex-col items-center">
                    <div className="flex flex-row justify-between w-full">
                        <p className="text-sm text-gray-500 mb-4">RIsk</p>
                        <Rate value={+8}/>
                    </div>
                    <div style={{ width: 80, height: 80 }}>
                        <CircularProgressbar
                            value={23}
                            text={`${23}%`}
                            styles={buildStyles({
                                pathColor: '#FF9800',
                                textColor: '#000',
                                trailColor: '#eee',
                            })}
                        />
                    </div>

                </div>
                {/* More info */}
                <div className="bg-white py-[16px] px-[18px] flex flex-col justify-between  rounded shadow-md">
                    <p className="text-sm text-gray-500">RUL</p>
                    <p className="text-sm text-gray-500">Useful life is at</p>

                    <p className="text-2xl font-semibold">59.4%</p>
                </div>
                <div className="bg-white  py-[16px] px-[18px] flex flex-col justify-between  rounded shadow-md">
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="text-2xl font-semibold">6.1 Years</p>
                </div>
                <div className="bg-white  py-[16px] px-[18px] flex flex-col justify-between  rounded shadow-md">
                    <p className="text-sm text-gray-500">Next PM</p>
                    <p className="text-sm text-gray-500">Generating in</p>
                    <p className="text-2xl font-semibold">0 Days</p>
                </div>
                <div className="bg-white  py-[16px] px-[18px] flex flex-col justify-between  rounded shadow-md">
                    <p className="text-sm text-gray-500">MRR</p>
                    <p className="text-sm text-gray-500">Ratio is</p>
                    <p className="text-2xl font-semibold">0%</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="mt-8 bg-white pt-[16px] px-[20px]">
                <ul className="flex space-x-4  border-b-[2px] border-b-[#e0e0e0]">
                    {['Asset Information', 'Asset Scores', 'Asset Timeline', 'Optional Status', 'Maintenance History', 'Replacement Planning'].map((tab) => (
                        <li
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`cursor-pointer ${
                                activeTab === tab ? 'text-[#007bFF] pb-[10px] border-b-[2px] border-b-[#007bff] font-semibold' : 'text-gray-500'
                            }`}
                        >
                            {tab}
                        </li>
                    ))}
                </ul>

                {/* Tab Content */}
                <div className="mt-6">{renderTabContent()}</div>
            </div>
        </div>
    );
};

export default AssetDetails;
