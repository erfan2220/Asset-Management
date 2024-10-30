import React from 'react';
import BarChart from "./BarChart";
import InterpolationChart from "./InterpolationChart";

const ActiveTab2Country = () =>
{
    return (
        <div className="py-[20px] px-[27px] ">

           <BarChart/>
           <InterpolationChart/>
        </div>
    );
};

export default ActiveTab2Country;