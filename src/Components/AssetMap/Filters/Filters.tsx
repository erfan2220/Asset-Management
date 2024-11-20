//@ts-nocheck
import React from 'react';
import { useNavigate } from "react-router-dom";
import "./Filters.css";

interface FilterProps {
    view: number;
    setView: (view: number) => void;
    technologyIndex: number;
    setTechnologyIndex: (technologyIndex: number) => void;
    technologyLayer: number[];
    setTechnologyLayer: (technologyLayer: number[]) => void;
    itemName: string;
    setItemName: (itemName: string) => void;
    searchCode: string;
    setSearchCode: (searchCode: string) => void;
    tech: string;
    setTech: (tech: string) => void;
    techLayer: string;
    setTechLayer: (techLayer: string) => void;
    techNames: string;
    setTechNames: (techNames: string) => void;
}

const Filters: React.FC<FilterProps> = (props) => {

    const TechnologyTopology = [
        {
            name: "2G",
            Layers: [
                { index: 1, name: "MSC" },
                { index: 2, name: "BSC" },
                { index: 3, name: "BTS" },
            ]
        },
        {
            name: "3G",
            Layers: [
                { index: 1, name: "MSC" },
                { index: 2, name: "RNC" },
                { index: 3, name: "nodeb" },
            ]
        },
        {
            name: "4G",
            Layers: [
                { index: 1, name: "MME" },
                { index: 2, name: "enodeb" },
            ]
        }
    ];

    const TechnologyTech = [
        {
            name: "Single-Tech",
            Layers: [
                { index: 1, name: "2G" },
                { index: 2, name: "3G" },
                { index: 3, name: "4G" },
                { index: 4, name: "5G" },
            ]
        },
        {
            name: "Multi-Tech",
            Layers: [
                // { index: 1, name: "2G" },
                // { index: 2, name: "3G" },
                // { index: 3, name: "4G" },
                // { index: 4, name: "5G" },
                // { index: 5, name: "2G3G" },
                // { index: 6, name: "2G4G" },
                // { index: 7, name: "2G5G" },
                // { index: 8, name: "3G4G" },
                // { index: 9, name: "3G5G" },
                // { index: 10, name: "4G5G" },
                // { index: 11, name: "2G3G4G" },
                // { index: 12, name: "2G3G5G" },
                // { index: 13, name: "2G4G5G" },
                // { index: 14, name: "3G4G5G" },
                // { index: 15, name: "All-Tech" },
                { index: 1, name: "2G3G" },
                { index: 2, name: "2G4G" },
                { index: 3, name: "2G5G" },
                { index: 4, name: "2G3G4G" },
                { index: 5, name: "2G3G4G5G" },
                // { index: 6, name: "2G4G" },
                // { index: 7, name: "2G5G" },
                // { index: 8, name: "3G4G" },
                // { index: 9, name: "3G5G" },
                // { index: 10, name: "4G5G" },
                // { index: 11, name: "2G3G4G" },
                // { index: 12, name: "2G3G5G" },
                // { index: 13, name: "2G4G5G" },
                // { index: 14, name: "3G4G5G" },
                // { index: 15, name: "All-Tech" },
            ]
        }
    ];

    const navigate = useNavigate();

    const handleIndex = (index: number) => {
        props.setView(index);
        props.setSearchCode("");
    }

    const handleTopologyIndex = (index: number) => {
        props.setTechnologyIndex(index);
        props.setTech([])
        props.setTechnologyLayer([])
    }

    const handleTopologyLayer = (index: number, name: string, tech: string) =>
    {
        props.setTech((prevTech) => {
            if (!Array.isArray(prevTech)) {
                return []; // Reset to empty array if it's not an array
            }
            const existingItemIndex = prevTech.findIndex(
                (item) => item.type === name && item.tech === tech
            );

            if (existingItemIndex >= 0) {
                return prevTech.filter((_, i) => i !== existingItemIndex);
            } else {
                return [...prevTech, { type: name, tech }];
            }
        });

        props.setTechnologyLayer((prevLayers) => {
            if (prevLayers.includes(index)) {
                return prevLayers.filter((layer) => layer !== index);
            } else {
                return [...prevLayers, index];
            }
        });

        console.log("tech",props.tech)
        console.log("techLayer",props.technologyLayer)

        // Set the technology and item name when a layer is clicked
        props.setItemName(name);
    }

    return (
        <div className="test flex flex-col bg-white w-[40px] h-[120px] absolute left-[20px] top-[20px]">
            <div className={props.view === 1 ? "bg-[#007bFF] p-[8px]" : "p-[8px]"} onClick={() => handleIndex(1)}>
                <img src={props.view === 1 ? "./images/Asset/map/Filters/View3.svg" : "./images/Asset/map/Filters/View3copy.svg"} alt="" />
            </div>
            <div className={props.view === 2 ? "relative bg-[#007bFF] p-[8px]" : "relative p-[8px]"} onClick={() => handleIndex(2)}>
                <img src={props.view === 2 ? "./images/Asset/map/Filters/View2.svg" : "./images/Asset/map/Filters/View2copy.svg"} alt="" />
            </div>
            <div className={props.view === 3 ? "bg-[#007bFF] p-[8px]" : "p-[8px]"} onClick={() => handleIndex(3)}>
                <img src={props.view === 3 ? "./images/Asset/map/Filters/View1.svg" : "./images/Asset/map/Filters/View1copy.svg"} alt="" />
            </div>
            {
                props.view === 2 &&
                <div className="bg-white w-[188px] h-fit py-[16px] flex flex-col absolute left-[50px] top-[40px] rounded-[4px]">
                    <h1 className="text-[#212121] text-[14px] font-[600] mx-[16px]">Technologies</h1>
                    <span className="text-[#212121] opacity-60 text-[14px] mx-[16px] mb-[8px] font-[500]">Layer</span>

                    {
                        TechnologyTopology.map((item, index) =>
                            <div key={index}>
                                <div className="items px-[16px] py-[8px] flex flex-row items-center justify-between border-t-[1px]">
                                    <div className="flex flex-row items-center gap-[12px]">
                                        <p className="text-[14px] text-[#212121]">{item.name}</p>
                                        <img src="./images/map/CaretDown.svg" alt="" />
                                    </div>
                                    <div className={props.technologyIndex === index ? "relative bg-[#007Bff] w-[30px] h-[18px] rounded-[8px]" : "relative bg-[#BDBDBD] w-[30px] h-[18px] rounded-[8px]"} onClick={() => handleTopologyIndex(index)}>
                                        <div className={props.technologyIndex === index ? "absolute w-[10px] h-[10px] rounded-full bg-white top-[4px] right-[4px]" : "absolute w-[10px] h-[10px] rounded-full bg-white top-[4px] left-[4px]"}></div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-[12px] px-[16px] ">
                                    {props.technologyIndex === index && item.Layers.length > 0 && item.Layers.map((layer) =>
                                        <div className="items flex flex-row items-center gap-[10px]" key={layer.index}>
                                            <div className={props.technologyLayer.includes(layer.index) ? "w-[16px] h-[16px] border-[1px] border-[#66B0FF] flex justify-center items-center" : "w-[16px] h-[16px] border-[1px] border-[#21212180] flex justify-center items-center"}
                                                 onClick={() => handleTopologyLayer(layer.index, layer.name, item.name)}>
                                                {
                                                    // Display Vector image if this layer is selected
                                                    props.technologyLayer.includes(layer.index) && (
                                                        <img width={16} height={16} src="./images/map/Vector.svg" alt="" />
                                                    )
                                                }
                                            </div>
                                            <p className="text-[14px] text-[#424242]">{layer.name}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                </div>
            }

            {
                props.view === 3 &&
                <div className="bg-white w-[188px] h-fit py-[16px] flex flex-col absolute left-[50px] top-[40px] rounded-[4px]">
                    <h1 className="text-[#212121] text-[14px] font-[600] mx-[16px]">Technologies</h1>
                    <span className="text-[#212121] opacity-60 text-[14px] mx-[16px] mb-[8px] font-[500]">Layer</span>
                    {
                        TechnologyTech.map((item, index) =>
                            <div key={index}>
                                {item.name !== null &&
                                    <div
                                        className="items px-[16px] py-[8px] flex flex-row items-center justify-between border-t-[1px] max-h-[250px] overflow-y-hidden">
                                        <div className="flex flex-row items-center gap-[12px]">
                                            <p className="text-[14px] text-[#212121]">{item.name}</p>
                                            <img src="./images/map/CaretDown.svg" alt=""/>
                                        </div>
                                        <div
                                            className={props.technologyIndex === index ? "relative bg-[#007Bff] w-[30px] h-[18px] rounded-[8px]" : "relative bg-[#BDBDBD] w-[30px] h-[18px] rounded-[8px]"}
                                            onClick={() => handleTopologyIndex(index)}>
                                            <div
                                                className={props.technologyIndex === index ? "absolute w-[10px] h-[10px] rounded-full bg-white top-[4px] right-[4px]" : "absolute w-[10px] h-[10px] rounded-full bg-white top-[4px] left-[4px]"}></div>
                                        </div>
                                    </div>}
                                <div className="flex flex-col gap-[12px] px-[16px] max-h-[100px] overflow-y-auto ">
                                    {item.Layers.length > 0 && props.technologyIndex ===index && item.Layers.map((layer) =>
                                        <div className="items flex flex-row items-center gap-[10px]" key={layer.index}>
                                            <div
                                                className={props.technologyLayer.includes(layer.index) ? "w-[16px] h-[16px] border-[1px] border-[#66B0FF] flex justify-center items-center" : "w-[16px] h-[16px] border-[1px] border-[#21212180] flex justify-center items-center"}
                                                onClick={() => handleTopologyLayer(layer.index, layer.name, item.name)}>
                                                {
                                                    props.technologyLayer.includes(layer.index) && (
                                                        <img width={16} height={16} src="./images/map/Vector.svg" alt="" />
                                                    )
                                                }
                                            </div>
                                            <p className="text-[14px] text-[#424242]">{layer.name}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                    )}


                </div>
            }
        </div>
    );
}

export default Filters;
