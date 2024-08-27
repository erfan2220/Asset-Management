import React from 'react';

const Replacement = () => {
    return (
        <div>
            <div className="flex flex-row justify-between pl-[20px] pr-[25px]">
                <h2>Plans</h2>

                <div className="flex flex-row items-center gap-[20px]">
                    <img src="/images/Asset/MagnifyingGlass.svg" alt=""/>
                    <img src="/images/Asset/filterIcon.svg" alt=""/>
                    <img src="/images/Asset/filter.svg" alt=""/>
                </div>
            </div>
            <div className="mt-[17px] w-full">
                <table className="w-full">
                    <thead>
                    <tr className="bg-[#E5F2FF]">
                        <td className="border-[1px] border-[#e0e0e0] py-[12px] px-[12px]">Plan</td>
                        <td className="border-[1px] border-[#e0e0e0] py-[12px] px-[12px]">Type</td>
                        <td className="border-[1px] border-[#e0e0e0] py-[12px] px-[12px]">Target Date</td>
                        <td className="border-[1px] border-[#e0e0e0] py-[12px] px-[12px]">Total Stimated Cost(USD)</td>
                        <td className="border-[1px] border-[#e0e0e0] py-[12px] px-[12px]">Capital Expense</td>
                        <td className="border-[1px] border-[#e0e0e0] py-[12px] px-[12px]">Operating Expense</td>

                    </tr>
                    </thead>
                    <tbody>
                    <tr >
                        <td className="py-[10px] pl-[10px]">Plan 4</td>
                        <td className="py-[10px] pl-[10px]">Replace</td>
                        <td className="py-[10px] pl-[10px]">01.02.19</td>
                        <td className="py-[10px] pl-[10px]">3.00</td>
                        <td className="py-[10px] pl-[10px]">2.00</td>
                        <td className="py-[10px] pl-[10px]">2.00</td>
                    </tr>
                    </tbody>
                </table>
            </div>




        </div>
    );
};

export default Replacement;