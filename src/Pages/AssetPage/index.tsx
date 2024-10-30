//@ts-nocheck
import React, { useState } from "react";
import Button from "../../Components/SimpleButton";
import Table from "../../Components/AssetTable/Table";
import CustomSelectDropdown from "../../Components/DropDown.tsx";
import Map from "../../Components/AssetPage/Map/map";
import SearchIcon from "../../images/Asset/SearchIcon.svg";
import nextIcon from "../../images/Asset/nextIcon.svg";
import backIcon from "../../images/Asset/backIcon.svg";
import calenderIcon from "../../images/Asset/calenderIcon.svg";

import "./index.css";
import DataCharts from "../../Components/AssetPage/dataCharts/dataCharts";
import MatrixPage from "../../Components/AssetPage/MatrixPage/Matrix";
import { t } from "../../translationUtil";




const Asset = () => {
    const options = [
        { value: "Save as new view", label: t("saveAsNewView") },
        { value: "Default view", label: t("defaultView") },
    ];

    const calenderOptions = [{ value: "year", label: t("year") }];
    const [currentIndex, setCurrentIndex] = useState(1);



    const Matrix =()=> (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="20" height="20" fill={currentIndex===4 ? "#007BFF":"#fff"}/>
            <path
                d="M16.875 3.75H3.125C2.79348 3.75 2.47554 3.8817 2.24112 4.11612C2.0067 4.35054 1.875 4.66848 1.875 5V15C1.875 15.3315 2.0067 15.6495 2.24112 15.8839C2.47554 16.1183 2.79348 16.25 3.125 16.25H16.875C17.2065 16.25 17.5245 16.1183 17.7589 15.8839C17.9933 15.6495 18.125 15.3315 18.125 15V5C18.125 4.66848 17.9933 4.35054 17.7589 4.11612C17.5245 3.8817 17.2065 3.75 16.875 3.75ZM8.125 11.25V8.75H11.875V11.25H8.125ZM11.875 12.5V15H8.125V12.5H11.875ZM3.125 8.75H6.875V11.25H3.125V8.75ZM8.125 7.5V5H11.875V7.5H8.125ZM13.125 8.75H16.875V11.25H13.125V8.75ZM16.875 7.5H13.125V5H16.875V7.5ZM6.875 5V7.5H3.125V5H6.875ZM3.125 12.5H6.875V15H3.125V12.5ZM16.875 15H13.125V12.5H16.875V15Z"
                fill={currentIndex===4 ? "#fff":"#616161"}/>
        </svg>
    )

    const Charts =()=> (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="20" height="20" fill={currentIndex===3 ? "#007BFF":"#fff"}/>
            <path
                d="M18.125 16.25C18.125 16.4158 18.0592 16.5747 17.9419 16.6919C17.8247 16.8092 17.6658 16.875 17.5 16.875H2.5C2.33424 16.875 2.17527 16.8092 2.05806 16.6919C1.94085 16.5747 1.875 16.4158 1.875 16.25V3.75C1.875 3.58424 1.94085 3.42527 2.05806 3.30806C2.17527 3.19085 2.33424 3.125 2.5 3.125C2.66576 3.125 2.82473 3.19085 2.94194 3.30806C3.05915 3.42527 3.125 3.58424 3.125 3.75V11.1227L7.08828 7.65625C7.19613 7.56184 7.33315 7.50737 7.47638 7.50197C7.61961 7.49656 7.76034 7.54055 7.875 7.62656L12.4695 11.0727L17.0883 7.03125C17.1488 6.9713 17.221 6.92437 17.3004 6.89334C17.3797 6.86231 17.4646 6.84784 17.5498 6.85081C17.6349 6.85378 17.7186 6.87414 17.7956 6.91062C17.8726 6.94711 17.9413 6.99896 17.9976 7.06298C18.0538 7.127 18.0963 7.20185 18.1226 7.28292C18.1488 7.36399 18.1582 7.44956 18.1502 7.5344C18.1421 7.61923 18.1168 7.70152 18.0758 7.77622C18.0348 7.85091 17.979 7.91643 17.9117 7.96875L12.9117 12.3438C12.8039 12.4382 12.6669 12.4926 12.5236 12.498C12.3804 12.5034 12.2397 12.4594 12.125 12.3734L7.53047 8.92891L3.125 12.7836V15.625H17.5C17.6658 15.625 17.8247 15.6908 17.9419 15.8081C18.0592 15.9253 18.125 16.0842 18.125 16.25Z"
                fill={currentIndex===3 ? "#fff":"#616161"}/>
        </svg>
    )
    const List =()=> (
        <svg width="20" height="20" viewBox="0 0 20 20" fill={currentIndex===1 ? "#007BFF":"#fff"} xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6.875 5C6.875 4.83424 6.94085 4.67527 7.05806 4.55806C7.17527 4.44085 7.33424 4.375 7.5 4.375H16.875C17.0408 4.375 17.1997 4.44085 17.3169 4.55806C17.4342 4.67527 17.5 4.83424 17.5 5C17.5 5.16576 17.4342 5.32473 17.3169 5.44194C17.1997 5.55915 17.0408 5.625 16.875 5.625H7.5C7.33424 5.625 7.17527 5.55915 7.05806 5.44194C6.94085 5.32473 6.875 5.16576 6.875 5ZM16.875 9.375H7.5C7.33424 9.375 7.17527 9.44085 7.05806 9.55806C6.94085 9.67527 6.875 9.83424 6.875 10C6.875 10.1658 6.94085 10.3247 7.05806 10.4419C7.17527 10.5592 7.33424 10.625 7.5 10.625H16.875C17.0408 10.625 17.1997 10.5592 17.3169 10.4419C17.4342 10.3247 17.5 10.1658 17.5 10C17.5 9.83424 17.4342 9.67527 17.3169 9.55806C17.1997 9.44085 17.0408 9.375 16.875 9.375ZM16.875 14.375H7.5C7.33424 14.375 7.17527 14.4408 7.05806 14.5581C6.94085 14.6753 6.875 14.8342 6.875 15C6.875 15.1658 6.94085 15.3247 7.05806 15.4419C7.17527 15.5592 7.33424 15.625 7.5 15.625H16.875C17.0408 15.625 17.1997 15.5592 17.3169 15.4419C17.4342 15.3247 17.5 15.1658 17.5 15C17.5 14.8342 17.4342 14.6753 17.3169 14.5581C17.1997 14.4408 17.0408 14.375 16.875 14.375ZM4.375 4.375H3.125C2.95924 4.375 2.80027 4.44085 2.68306 4.55806C2.56585 4.67527 2.5 4.83424 2.5 5C2.5 5.16576 2.56585 5.32473 2.68306 5.44194C2.80027 5.55915 2.95924 5.625 3.125 5.625H4.375C4.54076 5.625 4.69973 5.55915 4.81694 5.44194C4.93415 5.32473 5 5.16576 5 5C5 4.83424 4.93415 4.67527 4.81694 4.55806C4.69973 4.44085 4.54076 4.375 4.375 4.375ZM4.375 9.375H3.125C2.95924 9.375 2.80027 9.44085 2.68306 9.55806C2.56585 9.67527 2.5 9.83424 2.5 10C2.5 10.1658 2.56585 10.3247 2.68306 10.4419C2.80027 10.5592 2.95924 10.625 3.125 10.625H4.375C4.54076 10.625 4.69973 10.5592 4.81694 10.4419C4.93415 10.3247 5 10.1658 5 10C5 9.83424 4.93415 9.67527 4.81694 9.55806C4.69973 9.44085 4.54076 9.375 4.375 9.375ZM4.375 14.375H3.125C2.95924 14.375 2.80027 14.4408 2.68306 14.5581C2.56585 14.6753 2.5 14.8342 2.5 15C2.5 15.1658 2.56585 15.3247 2.68306 15.4419C2.80027 15.5592 2.95924 15.625 3.125 15.625H4.375C4.54076 15.625 4.69973 15.5592 4.81694 15.4419C4.93415 15.3247 5 15.1658 5 15C5 14.8342 4.93415 14.6753 4.81694 14.5581C4.69973 14.4408 4.54076 14.375 4.375 14.375Z"
                fill={currentIndex===1 ? "#fff":"#616161"}/>
        </svg>


    )

    const MapIcon = () => (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="20" height="20" fill={currentIndex === 2 ? "#007BFF" : "#fff"}/>
            <path
                d="M10 5C9.38193 5 8.77775 5.18328 8.26384 5.52666C7.74994 5.87004 7.3494 6.3581 7.11288 6.92911C6.87635 7.50013 6.81447 8.12847 6.93505 8.73466C7.05562 9.34085 7.35325 9.89767 7.79029 10.3347C8.22733 10.7717 8.78415 11.0694 9.39034 11.19C9.99653 11.3105 10.6249 11.2486 11.1959 11.0121C11.7669 10.7756 12.255 10.3751 12.5983 9.86116C12.9417 9.34725 13.125 8.74307 13.125 8.125C13.125 7.2962 12.7958 6.50134 12.2097 5.91529C11.6237 5.32924 10.8288 5 10 5ZM10 10C9.62916 10 9.26665 9.89003 8.95831 9.68401C8.64996 9.47798 8.40964 9.18514 8.26773 8.84253C8.12581 8.49992 8.08868 8.12292 8.16103 7.75921C8.23337 7.39549 8.41195 7.0614 8.67417 6.79917C8.9364 6.53695 9.27049 6.35837 9.63421 6.28603C9.99792 6.21368 10.3749 6.25081 10.7175 6.39273C11.0601 6.53464 11.353 6.77496 11.559 7.08331C11.765 7.39165 11.875 7.75416 11.875 8.125C11.875 8.62228 11.6775 9.09919 11.3258 9.45083C10.9742 9.80246 10.4973 10 10 10ZM10 1.25C8.17727 1.25207 6.42979 1.97706 5.14092 3.26592C3.85206 4.55479 3.12707 6.30227 3.125 8.125C3.125 10.5781 4.25859 13.1781 6.40625 15.6445C7.37127 16.759 8.45739 17.7626 9.64453 18.6367C9.74962 18.7103 9.87482 18.7498 10.0031 18.7498C10.1314 18.7498 10.2566 18.7103 10.3617 18.6367C11.5467 17.7623 12.6307 16.7587 13.5938 15.6445C15.7383 13.1781 16.875 10.5781 16.875 8.125C16.8729 6.30227 16.1479 4.55479 14.8591 3.26592C13.5702 1.97706 11.8227 1.25207 10 1.25ZM10 17.3438C8.70859 16.3281 4.375 12.5977 4.375 8.125C4.375 6.63316 4.96763 5.20242 6.02252 4.14752C7.07742 3.09263 8.50816 2.5 10 2.5C11.4918 2.5 12.9226 3.09263 13.9775 4.14752C15.0324 5.20242 15.625 6.63316 15.625 8.125C15.625 12.5961 11.2914 16.3281 10 17.3438Z"
                fill={currentIndex === 2 ? "#fff" : "#616161"}/>
        </svg>
    )


    const iconData = [
        {
            id: 1,
            src: <List/>,
            name: t("Asset"),
        },
        // {
        //     id: 2,
        //     src: <MapIcon/>,
        //     name: t("Asset"),
        // },
        {
            id: 3,
            src: <Charts/>,
            name: t("Asset"),
        },
        {
            id: 4,
            src: <Matrix />,
            name: t("Asset"),
        },
    ];

    const currentTitle = iconData.find(icon => icon.id === currentIndex)?.name || "Asset";

    const handleSelect = (option: any) => {
        setCurrentIndex(option.value);
    };

    const renderContent = () => {
        switch (currentIndex) {
            case 1:
                return (
                    <>


                        <div className="w-full">
                            <Table/>
                        </div>
                    </>
                );

            case 2:
                return (
                    <>
                        <div className="flex justify-between items-center mb-8">
                            {/* Left side */}
                            <div className="flex items-center space-x-4">
                                <CustomSelectDropdown
                                    options={options}
                                    placeholder="View : Default view"
                                    onSelect={handleSelect}
                                />
                                <div className="relative flex items-center
                                  border border-gray-300 rounded-md h-[40px]">
                                    <img
                                        src={SearchIcon}
                                        className="search-icon absolute left-3 top-1/2 transform
                                        -translate-y-1/2 text-gray-500 pointer-events-none"
                                        alt="Search"
                                    />
                                    {/* Input Field */}
                                    <input
                                        type="text"
                                        placeholder={t("search_code_site...")}
                                        className="search-input bg-transparent border-none
                                        rounded-md py-2 px-4 pl-10 w-full h-full"
                                    />
                                </div>
                            </div>

                            {/* Right side */}
                            <div className="flex items-center space-x-2">
                                <CustomSelectDropdown
                                    options={calenderOptions}
                                    placeholder={t("year")}
                                    onSelect={handleSelect}
                                    iconSrc={calenderIcon}
                                />
                                <Button>
                                    <img src={backIcon} alt="Back" />
                                </Button>
                                <Button>
                                    <img src={nextIcon} alt="Next" />
                                </Button>
                            </div>
                        </div>

                        <Map />
                    </>
                );
            case 3:
                return<>
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center space-x-4">
                          <CustomSelectDropdown
                               options={options}
                               placeholder="View : Default view"
                               onSelect={handleSelect}/>
                        </div>

                    </div>
                    <DataCharts/>
                </>;
            case 4:
                return <div >

                    <MatrixPage/>

                </div>;
            default:
                return <div>Select an option</div>;
        }
    };

    return (
        <div className="p-5 w-full">
            <div className="flex justify-between items-center mb-5 w-full">
                <div>
                    <h1 className="text-[#212121] text-[22px]">{currentTitle}</h1>
                </div>

                <div className="flex flex-row items-center justify-between border-[1px] m-[10px] rounded-md h-[40px]">
                    {iconData.map((icon) => (
                        <div key={icon.id}
                             onClick={() => handleSelect({value: icon.id})}
                             className={`icon-container ${currentIndex === icon.id ? "active" : ""}`}
                        >
                            {icon.src}

                        </div>
                    ))}
                </div>
            </div>

            {renderContent()}
        </div>
    );
};

export default Asset;