//@ts-nocheck
import React, {useState} from 'react';
import Navbar from "../../Components/Navbar/Navbar";

import { ReactComponent as HomeIcon } from "../../images/AdminPanel/Home.svg";
import { ReactComponent as AssetIcon } from "../../images/AdminPanel/Bank.svg";
import {useNavigate} from "react-router-dom";
import AdminTable from "../../Components/AdminPage/AdminTable/AdminTable";


const AdminPanel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [openText, setOpenText] = useState(false);
    const [menuName, setMenuName] = useState("Asset");
    const navigate = useNavigate();

    const handleIndex = (index:number, name:string, route:string) => {
        setCurrentIndex(index);
        setMenuName(name);
        navigate(route);
    };
    const menu = [
        {
            name: "Home",
            subMenu: [],
            route: "",
        },
        {
            name: "Asset",
            subMenu: ["Asset","Location"],
            route: "",
        },
    ];

    const handleMenuOpen = (condition:any) => {
        setOpenText(condition);
    };

    return (
        <div>
            <Navbar/>
            <div className="flex flex-row">
                <div>
                    <div
                        className="flex flex-col gap-[20px] bg-[#14141A] pt-[22px] pr-[28px] max-w-fit
           min-h-[calc(100vh-64px)] pl-[32px] cursor-pointer"
                        onMouseEnter={() => {
                            handleMenuOpen(true);
                        }}
                        onMouseLeave={() => handleMenuOpen(false)}>
                        {menu.map((item, index) => (
                            <div
                                key={item.name}
                                className="flex flex-row items-center gap-[12px]"
                                onClick={() => handleIndex(index, item.name, item.route)}
                            >


                                {item.name === "Home" && (
                                    <HomeIcon
                                        className={`${
                                            currentIndex === index ? "text-[#007BFF]" : "text-[#FFF]"
                                        }`}
                                        stroke={currentIndex === index ? "#007bff" : "#ffffff"}
                                    />
                                )}
                                {item.name === "Asset" && (
                                    <AssetIcon
                                        className={`${
                                            currentIndex === index ? "text-[#007BFF]" : "text-[#FFF]"
                                        }`}
                                        stroke={currentIndex === index ? "#007bff" : "#ffffff"}
                                    />
                                )}


                                {openText && (
                                    <h2 className={currentIndex === index
                                        ? "text-[16px] text-[#007BFF] text-nowrap"
                                        : "text-[16px] text-[#FFF] opacity-60 text-nowrap"}>
                                        {item.name}
                                    </h2>
                                )}
                            </div>
                        ))}
                    </div>


                </div>
                <AdminTable/>
            </div>

        </div>
    );
};

export default AdminPanel;