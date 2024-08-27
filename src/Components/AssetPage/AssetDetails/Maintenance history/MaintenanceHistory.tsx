import React from 'react';

const MaintenanceHistory = () => {
    return (
            <div>
                <div className="flex flex-row justify-between pl-[20px] pr-[25px]">
                    <h2>Maintenance History</h2>

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
                            <td className="border-[1px] border-[#e0e0e0] py-[12px] px-[12px]">Scheduled Start</td>
                            <td className="border-[1px] border-[#e0e0e0] py-[12px] px-[12px]">Work order</td>
                            <td className="border-[1px] border-[#e0e0e0] py-[12px] px-[12px]">Description</td>
                            <td className="border-[1px] border-[#e0e0e0] py-[12px] px-[12px]">Status</td>
                            <td className="border-[1px] border-[#e0e0e0] py-[12px] px-[12px]">Type</td>
                            <td className="border-[1px] border-[#e0e0e0] py-[12px] px-[12px]">Job plan</td>
                            <td className="border-[1px] border-[#e0e0e0] py-[12px] px-[12px]">Failure code</td>
                            <td className="border-[1px] border-[#e0e0e0] py-[12px] px-[12px]">Actual finish</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="py-[10px] pl-[10px]"></td>
                            <td className="py-[10px] pl-[10px]">10</td>
                            <td className="py-[10px] pl-[10px]">maintenance for...</td>
                            <td className="py-[10px] pl-[10px]">WAPPPR</td>
                            <td className="py-[10px] pl-[10px]">CM</td>
                            <td className="py-[10px] pl-[10px]"></td>
                            <td className="py-[10px] pl-[10px]">BUILDING</td>
                            <td className="py-[10px] pl-[10px]"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>




            </div>
    );
};

export default MaintenanceHistory;