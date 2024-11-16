//@ts-nocheck
import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { ReactComponent as HomeIcon } from "../../images/AdminPanel/Home.svg";
import { ReactComponent as AssetIcon } from "../../images/AdminPanel/Bank.svg";
import { ReactComponent as EpIcon } from "../../images/AdminPanel/EP.svg";

import { useNavigate } from "react-router-dom";
import AdminTable from "../../Components/AdminPage/AdminTable/AdminTable";
import ProvinceEp from "../ProvinceEP";

const AdminPanel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openText, setOpenText] = useState(false);
  const [menuName, setMenuName] = useState("Asset");
  const navigate = useNavigate();

  const handleIndex = (index, name, route) => {
    setCurrentIndex(index);
    setMenuName(name);
    navigate(route);
  };

  const menu = [
    { name: "Home", subMenu: [], route: "" },
    { name: "Asset", subMenu: ["Asset", "Location"], route: "" },
    { name: "Province EP", subMenu: [], route: "" },
  ];

  const handleMenuOpen = (condition) => {
    setOpenText(condition);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-row">
        <div>
          <div
            className="flex flex-col gap-[20px] bg-[#14141A] pt-[22px] pr-[28px] max-w-fit min-h-[calc(100vh-64px)] pl-[32px] cursor-pointer"
            onMouseEnter={() => handleMenuOpen(true)}
            onMouseLeave={() => handleMenuOpen(false)}
          >
            {menu.map((item, index) => (
              <div
                key={item.name}
                className="flex flex-row items-center gap-[12px]"
                onClick={() => handleIndex(index, item.name, item.route)}
              >
                {item.name === "Home" && <HomeIcon className={`${currentIndex === index ? "text-[#007BFF]" : "text-[#FFF]"}`} stroke={currentIndex === index ? "#007bff" : "#ffffff"} />}
                {item.name === "Asset" && <AssetIcon className={`${currentIndex === index ? "text-[#007BFF]" : "text-[#FFF]"}`} stroke={currentIndex === index ? "#007bff" : "#ffffff"} />}
                {item.name === "Province EP" && <EpIcon className={`${currentIndex === index ? "text-[#007BFF]" : "text-[#FFF]"}`} stroke={currentIndex === index ? "#007bff" : "#ffffff"} />}

                {openText && (
                  <h2 className={currentIndex === index ? "text-[16px] text-[#007BFF]" : "text-[16px] text-[#FFF] opacity-60"}>
                    {item.name}
                  </h2>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="content-area w-full">
          {menuName === "Province EP" ? <ProvinceEp /> : <AdminTable />}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
