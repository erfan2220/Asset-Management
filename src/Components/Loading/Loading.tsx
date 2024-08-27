//@ts-nocheck
import {useEffect, useState} from "react";
import "./Loading.css"
const LoadingProgress = () =>
{


    return(
        <div>
            <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#40404066] opacity-40">

            </div>
            <div className="fixed top-0 left-0 w-full h-full flex  flex-col items-center justify-center z-50">

                <div className=" flex flex-col items-center justify-center
                 w-[334px] h-[120px] rounded-[4px] shadow-[0 4px 8px #00000014] bg-[#fff] gap-[16px]">
                   <h2 className="text-[20px] text-[#212121] font-[600]">Enterprise Asset Management</h2>
                    <div className="circlesRotating flex flex-row justify-center">
                        <Circle1 delay="0s" />
                        <Circle2 delay="0.4s" />
                        <Circle3 delay="0.6s" />
                        <Circle4 delay="0.8s" />
                    </div>
                </div>
            </div>
        </div>
    )


}

const Circle1 = ({ delay }) => {
    return <div style={{ animationDelay: delay,width:8 , height:8 ,backgroundColor:"#CCE5FF",borderRadius:"18px" }} />;
};

const Circle2 = ({ delay }) => {
    return <div style={{ animationDelay: delay,width:8 , height:8 ,backgroundColor:"#99CAFF",borderRadius:"18px" }} />;
};

const Circle3 = ({ delay }) => {
    return <div style={{ animationDelay: delay,width:8 , height:8 ,backgroundColor:"#3395FF",borderRadius:"18px" }} />;
};
const Circle4 = ({ delay }) => {
    return <div style={{ animationDelay: delay,width:8 , height:8 ,backgroundColor:"#ffff",borderRadius:"18px" }} />;
};



export default LoadingProgress;