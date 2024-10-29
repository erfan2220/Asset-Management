//@ts-nocheck
import React from 'react';
import {useNavigate} from "react-router-dom";
import "./Filters.css"

interface FilterProps {
    view: number;
    setView: (view: number) => void;
    technologyIndex: number;
    setTechnologyIndex: (technologyIndex: number) => void;
    technologyLayer: number;
    setTechnologyLayer: (technologyLayer: number) => void;
    itemName: string;
    setItemName: (itemName: string) => void;
    searchCode: string;
    setSearchCode: (searchCode: string) => void;
}


const Filters:React.FC<FilterProps> = (props) =>
{

    const TechnologyTopology=[
        {
            name: "2G",
            Layers:[
                {
                    index:1,
                    name:"MSC",
                },
                {
                    index:2,
                    name:"BSC",
                },
                {
                    index:3,
                    name:"BTS",
                },
            ]
        },
        {
            name: "3G",
            Layers:[
                {
                    index:1,
                    name:"MSC",
                },
                {
                    index:2,
                    name:"BSC",
                },
                {
                    index:3,
                    name:"BTS",
                },
            ]
        },
        {
            name: "4G",
            Layers:[
                {
                    index:1,
                    name:"MSC",
                },
                {
                    index:2,
                    name:"BSC",
                },
                {
                    index:3,
                    name:"BTS",
                },
            ]
        },
    ]

    const TechnologyTech=[
        {
            name: "2G",
            Layers:[]
        },
        {
            name: "3G",
            Layers:[]
        },
        {
            name: "4G",
            Layers:[]
        },
        {
            name: "5G",
            Layers:[]
        },
    ]


    const navigate=useNavigate();

    const handleIndex=(index:number)=>
    {
        props.setView(index)
        props.setSearchCode("")
    }

    const handleTopologyIndex=(index:number)=>
    {
        props.setTechnologyIndex(index)
    }
    const handleTopologyLayer=(index:number,name:string)=>
    {
        props.setTechnologyLayer(index)
        props.setItemName(name)
    }

    return (
        <div className=" test flex flex-col bg-white w-[40px] h-[120px] absolute left-[20px] top-[20px]">
            <div className={props.view===1?"bg-[#007bFF] p-[8px]":"p-[8px]"} onClick={()=>handleIndex(1)}>
                {
                    props.view === 1 ? <img src="./images/Asset/map/Filters/View1.svg" alt=""/>:
                        <img src="./images/Asset/map/Filters/View1copy.svg" alt=""/>
                }
            </div>
            <div className={props.view===2?"relative bg-[#007bFF] p-[8px]":"relative p-[8px]"} onClick={()=>handleIndex(2)}>
                {
                    props.view === 2 ? <img src="./images/Asset/map/Filters/View2.svg" alt=""/>:
                        <img src="./images/Asset/map/Filters/View2copy.svg" alt=""/>
                }
            </div>
            <div className={props.view===3?"bg-[#007bFF] p-[8px]":"p-[8px]"} onClick={()=>handleIndex(3)}>
                {
                    props.view === 3 ? <img src="./images/Asset/map/Filters/View3.svg" alt=""/>:
                        <img src="./images/Asset/map/Filters/View3copy.svg" alt=""/>

                }
            </div>
            {
                props.view === 2 &&
                <div className="bg-white w-[188px] h-[275px] py-[16px] flex flex-col
                         absolute left-[50px] top-[40px] rounded-[4px]">
                    <h1 className="text-[#212121] text-[14px] font-[600] mx-[16px]">Technologies</h1>
                    <span className="text-[#212121] opacity-60 text-[14px] mx-[16px] mb-[8px] font-[500]">Layer</span>

                        {
                            TechnologyTopology.map((item,index)=>
                                <div>
                                   <div className="items px-[16px] py-[8px]  flex flex-row items-center justify-between  border-t-[1px]">

                                            <div className=" flex flex-row items-center gap-[12px]">
                                                <p className="text-[14px] text-[#212121]">{item.name}</p>
                                                <img src="./images/map/CaretDown.svg" alt=""/>
                                            </div>

                                            <div className={props.technologyIndex===index? "relative bg-[#007Bff] w-[30px] h-[18px] rounded-[8px]":
                                                "relative bg-[#BDBDBD]  w-[30px] h-[18px] rounded-[8px]"} onClick={()=>handleTopologyIndex(index)}>
                                                <div className={props.technologyIndex===index? "absolute w-[10px] h-[10px] rounded-full bg-white top-[4px] right-[4px]":
                                                    "absolute w-[10px] h-[10px] rounded-full bg-white top-[4px] left-[4px]"}>

                                                </div>
                                            </div>

                                   </div>

                                    <div className="flex flex-col gap-[12px] px-[16px] ">
                                        {props.technologyIndex ===index && item.Layers.length>0 && item.Layers?.map((layer) =>
                                            <div className="items flex flex-row items-center gap-[10px]">
                                                <div className={props.technologyLayer===layer.index?
                                                    "w-[16px] h-[16px] rounded-full border-[1px] border-[#66B0FF] flex justify-center items-center":
                                                    "w-[16px] h-[16px] rounded-full border-[1px] border-[#21212180] flex justify-center items-center"}
                                                    onClick={()=>handleTopologyLayer(layer.index,layer.name)}>
                                                     <div className={props.technologyLayer===layer.index?"w-[8px] h-[8px] rounded-full bg-[#66B0FF]":""}>
                                                    </div>
                                                </div>

                                                <p className="text-[14px] text-[#424242]">{layer.name}</p>

                                            </div>
                                        )}


                                    </div>

                                </div>)}


                </div>
            }

            {
                props.view === 3 &&
                <div className="bg-white w-[188px] h-[275px] py-[16px] flex flex-col
            absolute left-[50px] top-[40px] rounded-[4px]">
                    <h1 className="text-[#212121] text-[14px] font-[600] mx-[16px]">Technologies</h1>
                    <span className="text-[#212121] opacity-60 text-[14px] mx-[16px] mb-[8px] font-[500]">Layer</span>

                    {
                        TechnologyTech.map((item,index)=>
                            <div>
                                <div className="items px-[16px] py-[8px]  flex flex-row items-center justify-between  border-t-[1px]">

                                    <div className=" flex flex-row items-center gap-[12px]">
                                        <p className="text-[14px] text-[#212121]">{item.name}</p>
                                        <img src="./images/map/CaretDown.svg" alt=""/>
                                    </div>

                                    <div className={props.technologyIndex===index? "relative bg-[#007Bff] w-[30px] h-[18px] rounded-[8px]":
                                        "relative bg-[#BDBDBD] w-[30px] h-[18px] rounded-[8px]"} onClick={()=>handleTopologyIndex(index)}>
                                        <div className={props.technologyIndex===index? "absolute w-[10px] h-[10px] rounded-full bg-white top-[4px] right-[4px]":
                                            "absolute w-[10px] h-[10px] rounded-full bg-white top-[4px] left-[4px]"}>

                                        </div>
                                    </div>

                                </div>

                                <div className="flex flex-col gap-[12px] px-[16px] ">
                                    {props.technologyIndex ===index &&item.Layers.map((layer) =>
                                        <div className="items flex flex-row items-center gap-[10px]">
                                            <div className={props.technologyLayer===layer.index?"w-[16px] h-[16px]  border-[1px] border-[#66B0FF] flex justify-center items-center"
                                           :"w-[16px] h-[16px]  border-[1px] border-[#21212180] flex justify-center items-center" }
                                                 onClick={()=>handleTopologyLayer(layer.index,layer.name)}>
                                                {
                                                    props.technologyLayer===layer.index &&
                                                    <img src="./images/map/Vector.svg" alt=""/>
                                                }
                                                {/*<div className={props.technologyLayer===layer.index?"w-[8px] h-[8px]  bg-[#66B0FF]":""}>*/}
                                                {/*</div>*/}
                                            </div>

                                            <p className="text-[14px] text-[#424242]">{layer.name}</p>

                                        </div>
                                    )}


                                </div>

                            </div>)}


                </div>
            }


        </div>
    );
};

export default Filters;