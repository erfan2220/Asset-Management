import React from 'react';

const AssetInformation = () => {
    return (
        <div className="bg-white p-6 rounded ">
            <h2 className="text-lg font-semibold mb-4">Asset Details</h2>
            <table className="border-[1px] border-[#e0e0e0] text-left w-full">
                <tbody>
                <tr className="border-[1px] border-[#e0e0e0]" >
                    <td className="text-[#757575] pl-[32px] py-2">Type</td>
                    <th className=" py-2">DIESELENG</th>
                </tr>
                <tr className="border-[1px] border-[#e0e0e0] bg-[#fcfcfc]">
                    <td className="text-[#757575] pl-[32px] py-2">Model</td>
                    <th className=" py-2">Unspecified</th>
                </tr>
                <tr className="border-[1px] border-[#e0e0e0]">
                    <td className="text-[#757575] pl-[32px]  py-2">Serial Number</td>
                    <th className=" py-2">Unspecified</th>
                </tr>
                <tr className="border-[1px] border-[#e0e0e0] bg-[#fcfcfc]">
                    <td className="text-[#757575] pl-[32px] py-2">Installation Date</td>
                    <th className=" py-2">8/6/18</th>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AssetInformation;