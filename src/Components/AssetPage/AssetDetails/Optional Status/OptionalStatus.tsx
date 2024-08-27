import React from 'react';

const OptionalStatus = () => {
    return (
        <div>
            <div className="flex flex-row justify-between pl-[20px] pr-[25px]">
                <h2>Meters</h2>

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
                            <td className="border-[1px] border-[#e0e0e0] py-[12px] px-[12px]">Status</td>
                            <td className="border-[1px] border-[#e0e0e0] py-[12px] px-[12px]">Meter</td>
                            <td className="border-[1px] border-[#e0e0e0] py-[12px] px-[12px]">Value</td>
                            <td className="border-[1px] border-[#e0e0e0] py-[12px] px-[12px]">ID</td>
                            <td className="border-[1px] border-[#e0e0e0] py-[12px] px-[12px]">Last Reading</td>
                        </tr>
                    </thead>
                </table>
            </div>


            <div className="mt-[94px] pb-[222px] flex flex-col  justify-center items-center">
                <img src="/images/Asset/asset.svg" alt="" width="74px"/>
                <h2 className="text-[#212121] text-[16px]">No Status to Show</h2>
                <p className="mt-[14px]">Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of ...</p>
            </div>



        </div>
    );
};

export default OptionalStatus;