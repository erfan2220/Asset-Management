const Rate = ({ value }: { value: number }) => {
    return (
        <div
            className={`w-[54px] h-[20px] flex items-center justify-center gap-[2px] text-xs font-semibold rounded-[4px]
                ${value >= 0 ? 'bg-[#E5F1E8] text-[#006B0E]' : 'bg-[#FFECF7] rounded-[4px] text-[#E53365]'}`}
        >
            {value >= 0 ? `+${value}%` : `${value}%`}
        </div>
    );
};

export default Rate;