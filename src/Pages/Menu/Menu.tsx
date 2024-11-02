//@ts-nocheck
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as AssetIcon } from "../../images/Menu/6.svg";
import { ReactComponent as LocationIcon } from "../../images/Menu/4.svg";
import { ReactComponent as WorkOrderIcon } from "../../images/Menu/3.svg";
import { ReactComponent as ScoreIcon } from "../../images/Menu/2.svg";
import { ReactComponent as AdminIcon } from "../../images/Menu/1.svg";
import { ReactComponent as MapIcon } from "../../images/Menu/9.svg";
import { ReactComponent as AssetCategories } from "../../images/Menu/8.svg";
import { ReactComponent as SubMenu } from "../../images/Menu/10.svg";
import { t } from "../../translationUtil";


const menu = [

  {
    name: t("Map"),
    subMenu: [],
    route: "/map",
    icon: <MapIcon />,
  },
  {
    name: t("Asset"),
    Items: ["Data table", "Map", "Charts", "Matrix"],
    subMenu: [],
    route: "/asset",
    icon: <AssetIcon />,
  },
  {
    name: t("Asset Categories"),
    subMenu: [
      {
        name: t("Technologies"),
        subMenu: ["2G", "3G", "4G", "5G"],
      },
      {
        name: t("Network Area"),
        subMenu: ["RAN","TX","IPBB","CS Core","PS Core"],
      },
      {
        name: t("Miscelaneous"),
        subMenu: [],
      },
      {
        name: t("Site Type"),
        subMenu: ["USO","WLL","شهری","جاده ای","روستایی"],
      },
      {
        name: t("Vendors"),
        subMenu: ["Huawei","Ericsson","Nokia","ZTE"],
      },
    ],
    route: "/asset-categories",
    icon: <AssetCategories />,
  },
  // {
  //   name: "Location",
  //   subMenu: [],
  //   route: "/location",
  //   icon: <LocationIcon />,
  // },
  // {
  //   name: "Work order queues",
  //   subMenu: [],
  //   route: "/work-order-queues",
  //   icon: <WorkOrderIcon />,
  // },
  // {
  //   name: "Score Settings",
  //   subMenu: [],
  //   route: "/score-settings",
  //   icon: <ScoreIcon />,
  // },
  {
    name: t("Admin Panel"),
    subMenu: [],
    route: "/AdminPanel",
    icon: <AdminIcon />,
  },
];

const Menu = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [subMenuIndex, setSubMenuIndex] = useState(-1);
  const [openSubSubMenuIndex, setOpenSubSubMenuIndex] = useState(-1);
  const [openText, setOpenText] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null); // Track open submenu
  const [openInnerSubMenu, setOpenInnerSubMenu] = useState(null); // Track open inner submenu for technologies
  const navigate = useNavigate();

  const handleIndex = (index, name, route) => {
    setCurrentIndex(index);
    navigate(route);
    setOpenSubMenu(null); // Close all submenus when a main menu item is clicked
  };

  const handleSubMenuClick = (index) => {
    setCurrentIndex(index)
    setSubMenuIndex(-1)
    setOpenSubSubMenuIndex(-1)
    setOpenSubMenu(openSubMenu === index ? null : index); // Toggle the main submenu
  };

  const handleInnerSubMenuClick = (subIndex) =>
  {
    setSubMenuIndex(subIndex)
    setOpenInnerSubMenu(openInnerSubMenu === subIndex ? null : subIndex); // Toggle the inner submenu (e.g., for "Technologies")
  };
  const handleInnerSubSubMenuClick = (subIndex) =>
  {
    setOpenSubSubMenuIndex(subIndex)
    navigate('/DynamicTable', { state: { subIndex } });
  };

  return (
      <div
          className="flex flex-col gap-[20px] bg-[#14141A] pt-[22px] pr-[28px] max-w-fit min-h-[calc(100vh-64px)] pl-[32px] cursor-pointer"
          onMouseEnter={() => setOpenText(true)}
          onMouseLeave={() => setOpenText(false)}
      >
        {menu.map((item, index) => (
            <div key={item.name} className="flex flex-col">
              <div
                  className="flex flex-row items-center gap-[12px]"
                  onClick={() =>
                      item.subMenu.length > 0
                          ? handleSubMenuClick(index)
                          : handleIndex(index, item.name, item.route)
                  }
              >
                <div
                    className={`${
                        currentIndex === index ? "text-[#007BFF]" : "text-[#FFF]"
                    }`}
                >
                  {React.cloneElement(item.icon, {
                    stroke: currentIndex === index ? "#007bff" : "#ffffff",
                  })}
                </div>
                {openText && (
                    <h2
                        className={
                          currentIndex === index
                              ? "text-[16px] text-[#007BFF] text-nowrap"
                              : "text-[16px] text-[#FFF] opacity-60 text-nowrap"
                        }
                    >
                      {item.name}
                    </h2>
                )}
                {
                    item.subMenu.length>0 && openText &&
                    <img src="./images/assetCategories/CaretDown.svg" alt="" className={ openSubMenu === index ? ""
                        :"rotate-180"} />
                }
              </div>


              {openSubMenu === index && openText &&
                  item.subMenu.map((subItem, subIndex) => (
                      <div key={subItem.name} className="ml-[20px] mt-[20px] ">
                        <div className="flex flex-row gap-[8px] items-center">
                          <SubMenu
                            stroke={subIndex===subMenuIndex?"#007bff":"#ffffff"}
                          />
                          <h3
                              className={subIndex===subMenuIndex?"text-[16px] text-[#007BFF] text-nowrap cursor-pointer"
                                  :"text-[16px] text-[#FFF] opacity-60 text-nowrap"}
                              onClick={() =>
                                  subItem.subMenu && subItem.subMenu.length > 0
                                      ? handleInnerSubMenuClick(subIndex)
                                      : handleInnerSubSubMenuClick(innerSubItem)
                              }
                          >
                            {subItem.name}
                          </h3>
                        </div>


                        {openInnerSubMenu === subIndex &&
                            subItem.subMenu.map((innerSubItem) => (
                                <div key={innerSubItem} className="ml-[20px]">
                                  <h4
                                      className={innerSubItem===openSubSubMenuIndex?"text-[16px] text-[#007BFF] text-nowrap cursor-pointer flex flex-col gap-[20px] mt-[24px]"
                                          :"text-[16px] text-[#FFF]  text-nowrap flex flex-col gap-[20px] mt-[24px]"}
                                      onClick={() => handleInnerSubSubMenuClick(innerSubItem)}>
                                    {innerSubItem}
                                  </h4>
                                </div>
                            ))}
                      </div>
                  ))}
            </div>
        ))}
      </div>
  );
};

export default Menu;
