//@ts-nocheck
import React, { useState } from "react";

const DropDown = ({ option }) => {
    const [clicked, setClicked] = useState(false);

    // Toggle dropdown visibility
    const handleToggle = () => {
        setClicked(!clicked);
    };

    return (
        <div className="relative bg-white h-[40px] rounded-[4px] text-center border-[1px] border-[#e0e0e0]">
            {/* Display selected option */}
            <div
                className="flex flex-row items-center justify-center w-full py-[10px] pl-[16px] pr-[10px] cursor-pointer"
                onClick={handleToggle}
            >
                <div className="flex flex-row items-center gap-[8px]">
                    {option[0].src && (
                        <img src={option[0].src} alt="icon" />
                    )}
                    <span className="text-[14px]">{option[0].label}</span>
                </div>
                <img
                    className="ml-[30px]"
                    src="/images/Asset/dataCharts/arrowDown.svg"
                    alt="dropdown arrow"
                />
            </div>

            {/* Dropdown options */}
            {clicked && (
                <div className="absolute left-0 top-[100%+2px] w-full bg-white border-[1px] rounded-[4px] border-[#007bFF] z-10">
                    {option.map((item, index) => (
                        <div
                            key={index}
                            className="py-[10px] pl-[16px] pr-[12px] hover:bg-[#007bFF]  hover:text-white cursor-pointer"
                        >
                            {item.src && (
                                <img
                                    src={item.src}
                                    alt={item.label}
                                    className="inline-block mr-[8px]"
                                />
                            )}
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropDown;
