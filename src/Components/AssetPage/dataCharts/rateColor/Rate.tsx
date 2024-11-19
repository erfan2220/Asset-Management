import {useState} from "react";

const ToolTip=()=>
{
    return(<div className="absolute bg-[#112965] text-white w-[70px] h-[50px] top-[-30px]  py-[10]  z-50 rounded-[4px] flex justify-center items-center">
        4444555
    </div>)
}

const Rate = ({ value }: { value: number }) =>
{
    const [hoverOpen,setHoverOpen] = useState(false);
    return (
        <div className={`relative w-[54px] h-[20px] flex items-center justify-center gap-[2px] text-xs font-semibold rounded-[4px]
                ${value >= 0 ? 'bg-[#E5F1E8] text-[#006B0E]' : 'bg-[#FFECF7] rounded-[4px] text-[#E53365]'}`}
        onMouseEnter={()=>setHoverOpen(true)}
        onMouseLeave={()=>setHoverOpen(false)}>
            {value >= 0 ? `+${value}%` : `${value}%`}
            {hoverOpen &&(
                <ToolTip/>
            )}
        </div>
    );
};

export default Rate;