import { useState } from "react";

const ToolTip = ({ dayDates }: { dayDates: string[] }) => {
    // Get today's date for comparison
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth(); // Note: Months are 0-indexed
    const todayDay = today.getDate();

    return (
        <div className="absolute bg-[#322F35] text-white w-fit h-[50px] top-[-60px] py-[10px] px-[16px] z-50 rounded-[4px] flex justify-center items-center">
              {/*<span className="text-white text-nowrap">*/}
              {/*  {*/}
              {/*      dayDates?.length === 0 &&*/}
              {/*      `${todayYear}-${todayMonth + 1}-${todayDay}` // Show today's date if no dates are provided*/}
              {/*  }*/}
              {/*    {*/}
              {/*        dayDates?.length === 1 &&*/}
              {/*        dayDates[0] // Display the single date if only one is provided*/}
              {/*    }*/}
              {/*    {*/}
              {/*        dayDates?.length === 2 &&*/}
              {/*        <>{dayDates[0]}-{dayDates[1]}</>*/}
              {/*    }*/}
              {/*</span>*/}
            <span className="text-white text-nowrap">درصد پیشرفت در بازه زمانی فیلتر شده</span>
        </div>
    );
};

const Rate = ({ value, dayDates }: { value: number, dayDates: string[] }) => {
    // const [hoverOpen, setHoverOpen] = useState(false);
    //
    // return (
    //     <div
    //         className={`relative w-[54px] h-[20px] flex items-center justify-center gap-[2px] text-xs font-semibold rounded-[4px]
    //     ${value >= 0 ? 'bg-[#E5F1E8] text-[#006B0E]' : 'bg-[#FFECF7] rounded-[4px] text-[#E53365]'}`}
    //         onMouseEnter={() => setHoverOpen(true)}
    //         onMouseLeave={() => setHoverOpen(false)}
    //     >
    //         {value >= 0 ? `+${value}%` : `${value}%`}
    //         {hoverOpen && <ToolTip dayDates={dayDates} />}
    //     </div>
    // );

    return(<div className="w-[54px] h-[8px]">

    </div>)
};

export default Rate;
