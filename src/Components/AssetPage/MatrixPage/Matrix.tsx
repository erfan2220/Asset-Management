import CustomSelectDropdown from "../../DropDown.tsx";
import React, {useState} from "react";
import DropDown from "./dropDown";

const MatrixPage = () => {
    const options = [
        {value: "Save as new view", label: "Save as new view"},
        {value: "Default view", label: "Default view"},
    ];

    const versionOptions = [
        { label: "Criticaly and End of life"},
        { label: "Criticaly and Health"},
        { label: "Criticaly and Risk"},
    ];

    const dayOptions = [
        { label: "Year"},
        { label: "Month"},
        { label: "Day"},
    ];


    const data = [
        { rowHeader: 'A', values: [4, 2, -1] },
        { rowHeader: 'B', values: [1, 3, 0] },
        { rowHeader: 'C', values: [-2, 2, 4] },
        { rowHeader: 'D', values: [3, -1, 1] },
        { rowHeader: 'E', values: [0, 3, 2] },
    ];


    const criticallyDegree = [
        { label: "High",url:"/images/Asset/matrix/high.svg"},
        { label: "Medium",url:"/images/Asset/matrix/medium.svg"},
        { label: "Low",url:"/images/Asset/matrix/Low.svg"},
        { label: "Missing Data",url:"/images/Asset/matrix/Missing.svg"},
        { label: "Total",url:""},
    ];

    const [currentIndex, setCurrentIndex] = useState(1);
    const calenderOptions = [{value: "year", label: "year"}];

    const handleSelect = (option: any) => {
        setCurrentIndex(option.value);
    };

    const getColor = (value:number) => {
        if (value >= 3) return '#61BB19'; // Green
        if (value >= 0 && value < 3) return '#FFB03D'; // Orange
        return '#FB4E4E'; // Red
    };

    return (
        <div>
            <div className="flex flex-row justify-between items-center">
                <CustomSelectDropdown
                    options={options}
                    placeholder="View : Default view"
                    onSelect={handleSelect}
                />

                <div className="text-[#424242] flex flex-row items-center ">
                    <div className="text-[#424242] flex flex-row items-center gap-[24px]">
                        <div className="text-[#424242] flex flex-row items-center gap-[8px]">
                            <h3>Version</h3>
                            <DropDown option={versionOptions}/>
                        </div>
                        <DropDown option={dayOptions}/>
                    </div>

                    <div className="flex justify-center items-center bg-white rounded-[4px]
                     w-[40px] border-[1px] border-[#e0e0e0] h-[40px] ml-[16px] mr-[8px]">
                        <img src="/images/Asset/dataCharts/arrowLeft.svg" alt=""/>
                    </div>

                    <div className="flex justify-center items-center bg-white rounded-[4px]
                     w-[40px] border-[1px] border-[#e0e0e0] h-[40px] ml-[16px] mr-[8px]">
                        <img src="/images/Asset/dataCharts/arrowRight.svg" alt=""/>
                    </div>

                    <div className="flex justify-center items-center bg-white rounded-[4px]
                     w-[40px] border-[1px] border-[#e0e0e0] h-[40px] ml-[16px] mr-[8px]">
                        <img src="/images/Asset/dataCharts/Gear.svg" alt=""/>
                    </div>

                </div>

            </div>

            <div className="flex flex-row justify-between items-center gap-[16px] my-[23px]">


                {criticallyDegree.map((item)=>(
                    <div className="bg-white w-full h-[145px] border-[1px] flex flex-col gap-[19px]
                    border-[#e0e0e0] rounded-[4px] p-[20px]">
                        <div className="flex flex-col gap-[8px]">
                            <div className="flex flex-row items-center justify-between">
                                <span>{item.label}</span>
                                {item.url !== "" &&
                                    <img src={item.url} alt=""/>
                                }
                            </div>
                            <h2>need for action</h2>
                        </div>

                        <span>2 Asset</span>
                    </div>
                ))}
            </div>

            <div className="bg-white border-[1px] border-[#e0e0e0] py-[20px] px-[32px] rounded-[4px]">
                <h2>Matrix</h2>


                <table className="mt-[40px] w-full border-collapse">
                    <tbody>

                    {/* Row headers with "Critically" column */}
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>


                            <td className={`font-bold text-center p-0`}
                                style={{width: '1px'}}
                            >
                                {rowIndex === 2 && (
                                    <span className="inline-block transform rotate-90">Critically</span>
                                )}
                            </td>

                            <td className="text-center font-bold">{row.rowHeader}</td>

                            {/* Values with background color */}
                            {row.values.map((value, colIndex) => (
                                <td
                                    key={colIndex}
                                    className="border p-2 text-white font-[600] text-center"
                                    style={{backgroundColor: getColor(value)}}
                                >
                                    {value}
                                </td>
                            ))}
                        </tr>
                    ))}

                    <tr>
                        <td className="font-bold"></td>
                        <td className=" font-bold"></td>
                        {/* Empty cell for "Critically" */}
                        <td className=" text-center font-bold">Good</td>
                        <td className=" p-2 text-center font-bold">Fair</td>
                        <td className=" p-2 text-center font-bold">Poor</td>
                    </tr>
                    <tr>
                    <td className=" font-bold"></td>
                        <td className=" font-bold"></td>
                        {/* Empty cell for "Critically" */}
                        <td className=" p-2 text-center font-bold"></td>
                        <td className=" p-2 text-center font-bold">Health</td>
                        <td className=" p-2 text-center font-bold"></td>
                    </tr>
                    </tbody>
                </table>

                {/* Legend */}
                <div className="mt-[35px]">
                    <h3 className="text-[14px] text-[#424242] font-semibold mb-2">Need for action</h3>
                    <div className="flex space-x-[14px]">
                            <div className="flex items-center">
                            <span className="inline-block w-[10px] h-[10px] rounded-full"
                                style={{backgroundColor: '#61BB19'}}
                            ></span>
                                <span className="text-[14px] font-[600] ml-[14px]">High</span>
                            </div>
                        <div className="flex items-center">
                            <span
                                className="inline-block w-[10px] h-[10px] rounded-full"
                                style={{backgroundColor: '#FFB03D'}}
                            >
                            </span>
                            <span className="text-[14px] font-[600] ml-[14px]">Medium</span>
                        </div>
                        <div className="flex items-center">
                            <span
                                className="inline-block w-[10px] h-[10px] rounded-full"
                                style={{backgroundColor: '#FB4E4E'}}
                            ></span>
                            <span className="text-[14px] font-[600] ml-[14px]">Low</span>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default MatrixPage;