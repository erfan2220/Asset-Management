import React from 'react';
import {useNavigate} from "react-router-dom";
import assetView1 from "../../AssetPage/AssetView1/AssetView1";

interface FilterProps {
    view: number;
    setView: (view: number) => void;
}


const Filters:React.FC<FilterProps> = (props) =>
{
    const navigate=useNavigate();
    const handleIndex=(index:number)=>
    {
        // if(index===1)
        // {
        //     navigate("/AssetView1",{state:{view:index}})
        // }
        // else if(index===2)
        // {
        //     navigate("/AssetView2",{state:{view:index}})
        // }
        // if(index===3)
        // {
        //     navigate("/AssetView3",{state:{view:index}})
        // }
        props.setView(index)

    }
    return (
        <div className="z-50 flex flex-col bg-white w-[40px] h-[120px] absolute left-[20px] top-[20px]">
            <div className={props.view===1?"bg-[#007bFF] p-[8px]":"p-[8px]"} onClick={()=>handleIndex(1)}>
                {
                    props.view === 1 ? <img src="./images/Asset/map/Filters/View1.svg" alt=""/>:
                        <img src="./images/Asset/map/Filters/View1copy.svg" alt=""/>

                }
            </div>
            <div className={props.view===2?"bg-[#007bFF] p-[8px]":"p-[8px]"} onClick={()=>handleIndex(2)}>
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


        </div>
    );
};

export default Filters;