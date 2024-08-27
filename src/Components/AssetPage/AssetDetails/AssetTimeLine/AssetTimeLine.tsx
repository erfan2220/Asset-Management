import React from 'react';
import TimeLine from "./timeLine/TimeLine";

const AssetTimeLine = () => {
    return (
        <div>
            <div className="flex flex-row items-center justify-between">
              <h2>Asset Timeline</h2>

            </div>


            <div className="flex flex-row justify-between items-center mt-[20px]">


                <div className="flex flex-row gap-[24px] items-center">
                    <div className="flex flex-row items-center gap-[6px]">
                        <div className="w-[12px] h-[12px] rounded-full bg-[#61BB19]"></div>
                        <p>Preventive Maintenance (PM)</p>
                    </div>

                    <div className="flex flex-row items-center gap-[6px]">
                        <div className="w-[12px] h-[12px] rounded-full bg-[#FFB03D]"></div>
                        <p>Failures</p>
                    </div>
                    <div className="flex flex-row items-center gap-[6px]">
                        <div className="w-[12px] h-[12px] rounded-full bg-[#3395FF]"></div>
                        <p>Work Orders(WO)</p>
                    </div>
                    <div className="flex flex-row items-center gap-[6px]">
                        <div className="w-[12px] h-[12px] rounded-full bg-[#A179FF]"></div>
                        <p>Inspections</p>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-between rounded-[4px] gap-[8px] border-[1px] border-[#e0e0e0] py-[10px] px-[12px]">
                    <img src="/images/Asset/dataCharts/calender.svg" alt=""/>
                    <h3>3 month</h3>
                    <img src="/images/Asset/dataCharts/arrowDown.svg" alt=""/>
                </div>
            </div>

            <div className="flex flex-row items-center gap-[8px] mt-[20px] w-full">
                <h2 className="rotate-90">Event type</h2>
                <TimeLine/>


            </div>
            
        </div>
    );
};

export default AssetTimeLine;