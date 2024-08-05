import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as AssetIcon } from "./Menu/6.svg";
import { ReactComponent as LocationIcon } from "./Menu/4.svg";
import { ReactComponent as WorkOrderIcon } from "./Menu/3.svg";
import { ReactComponent as ScoreIcon } from "./Menu/2.svg";
import { ReactComponent as AdminIcon } from "./Menu/1.svg";

const menu = [
  {
    name: "Asset",
    subMenu: ["Data table ", "Map", "Charts", "Matrix"],
    route: "/asset",
  },
  {
    name: "Location",
    subMenu: [],
    route: "/location",
  },
  {
    name: "Work order queues",
    subMenu: [],
    route: "/work-order-queues",
  },
  {
    name: "Score Settings",
    subMenu: [],
    route: "/score-settings",
  },
  {
    name: "Admin Panel",
    subMenu: [],
    route: "/admin-panel",
  },
];

const Dashboard = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [openText, setOpenText] = useState(false);
  const [menuName, setMenuName] = useState("Asset");
  const navigate = useNavigate();

  const handleIndex = (index:number, name:string, route:string) => {
    setCurrentIndex(index);
    setMenuName(name);
    navigate(route);
  };

  const handleMenuOpen = (condition:any) => {
    setOpenText(condition);
  };

  useEffect(() => {
    let timeout:any;

    if (openText) {
      timeout = setTimeout(() => setOpenText(true), 300);
    } else {
      timeout = setTimeout(() => setOpenText(false), 300);
    }

    return () => clearTimeout(timeout);
  }, [openText]);

  return (
    <div
      className="flex flex-col gap-[20px] bg-[#14141A] pt-[22px] pr-[28px] max-w-fit
           min-h-[calc(100vh-64px)] pl-[32px] cursor-pointer"
      onMouseEnter={() => {
        handleMenuOpen(true);
      }}
      onMouseLeave={() => handleMenuOpen(false)}
    >
      {menu.map((item, index) => (
        <div
          key={item.name}
          className="flex flex-row items-center gap-[12px]"
          onClick={() => handleIndex(index, item.name, item.route)}
        >
          {item.name === "Asset" && (
            <AssetIcon
              className={`${
                currentIndex === index ? "text-[#007BFF]" : "text-[#FFF]"
              }`}
              stroke={currentIndex === index ? "#007bff" : "#ffffff"}
            />
          )}
          {item.name === "Location" && (
            <LocationIcon
              className={`${
                currentIndex === index ? "text-[#007BFF]" : "text-[#FFF]"
              }`}
              stroke={currentIndex === index ? "#007bff" : "#ffffff"}
            />
          )}
          {item.name === "Work order queues" && (
            <WorkOrderIcon
              className={`${
                currentIndex === index ? "text-[#007BFF]" : "text-[#FFF]"
              }`}
              stroke={currentIndex === index ? "#007bff" : "#ffffff"}
            />
          )}
          {item.name === "Score Settings" && (
            <ScoreIcon
              className={`${
                currentIndex === index ? "text-[#007BFF]" : "text-[#FFF]"
              }`}
              stroke={currentIndex === index ? "#007bff" : "#ffffff"}
            />
          )}
          {item.name === "Admin Panel" && (
            <AdminIcon
              className={`${
                currentIndex === index ? "text-[#007BFF]" : "text-[#FFF]"
              }`}
              stroke={currentIndex === index ? "#007bff" : "#ffffff"}
            />
          )}

          {openText && (
            <h2
              className={
                currentIndex === index
                  ? "text-[16px] text-[#007BFF]"
                  : "text-[16px] text-[#FFF] opacity-60"
              }
            >
              {item.name}
            </h2>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
