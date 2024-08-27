import React, { useState } from 'react';
import DropDown from "../../MatrixPage/dropDown";

const AssetScore = () => {
    const [svgRotate, setSvgRotate] = useState(-1);

    const versionOptions = [
        { label: "Criticality and End of life" },
        { label: "Criticality and Health" },
        { label: "Criticality and Risk" },
    ];

    const headers = [
        { label: "" },
        { label: "Score" },
        { label: "Contributor" },
        { label: "Weight" },
    ];

    const columns = [
        {
            Score: "50",
            Contributor: "Facrulyearssample",
            Weight: "60",
        },
        {
            Score: "96",
            Contributor: "Motor Temp Calculation",
            Weight: "20",
        },
        {
            Score: "100",
            Contributor: "Emergency work orders",
            Weight: "20",
        },
    ];

    const handleClick = (index: number) => {
        setSvgRotate(index === svgRotate ? -1 : index); // Toggle rotation
    };

    return (
        <div>
            <h2 className="text-[16px] text-[#212121] font-[600]">Score Details</h2>

            <div className="flex flex-row items-center gap-[16px] mt-[16px]">
                <div className="flex flex-row items-center gap-[7px]">
                    <h2>Scoring</h2>
                    <DropDown option={versionOptions} />
                </div>

                <div className="flex flex-row items-center gap-[7px]">
                    <div className="flex flex-row items-center gap-[4px]">
                        <div className="w-[12px] h-[12px] bg-[#FFB03D] rounded-full"></div>
                        <h2>69</h2>
                    </div>
                    <h3 className="text-[14px] text-[#424242]">as of 2:00 AM on 8/7/23</h3>
                </div>
            </div>

            <div>
                <table className="w-full mt-[16px]">
                    <thead>
                    <tr className="bg-[#e5f2f2]">
                        {headers.map((item, index) => (
                            <td key={index} className="border-[1px] border-[#e0e0e0] pl-[32px] py-[14px] max-w-fit">
                                {item.label}
                            </td>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {columns.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td className="border-[1px] border-[#e0e0e0] pl-[32px] py-[14px] max-w-fit">
                                <svg
                                    className={svgRotate === rowIndex ? "rotate-180" : ""}
                                    width="19"
                                    height="19"
                                    viewBox="0 0 19 19"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => handleClick(rowIndex)}
                                >
                                    <path
                                        d="M15.0986 7.42953L9.4736 13.0545C9.42136 13.1068 9.35932 13.1483 9.29103 13.1766C9.22275 13.2049 9.14955 13.2195 9.07563 13.2195C9.00171 13.2195 8.92851 13.2049 8.86023 13.1766C8.79194 13.1483 8.7299 13.1068 8.67766 13.0545L3.05266 7.42953C2.94711 7.32398 2.88782 7.18083 2.88782 7.03156C2.88782 6.8823 2.94711 6.73914 3.05266 6.63359C3.15821 6.52805 3.30136 6.46875 3.45063 6.46875C3.5999 6.46875 3.74305 6.52805 3.8486 6.63359L9.07563 11.8613L14.3027 6.63359C14.3549 6.58133 14.417 6.53988 14.4853 6.51159C14.5535 6.48331 14.6267 6.46875 14.7006 6.46875C14.7745 6.46875 14.8477 6.48331 14.916 6.51159C14.9843 6.53988 15.0463 6.58133 15.0986 6.63359C15.1509 6.68586 15.1923 6.7479 15.2206 6.81618C15.2489 6.88447 15.2634 6.95765 15.2634 7.03156C15.2634 7.10547 15.2489 7.17866 15.2206 7.24694C15.1923 7.31523 15.1509 7.37727 15.0986 7.42953Z"
                                        fill="#000000"
                                    />
                                </svg>
                            </td>
                            <td className="border-[1px] border-[#e0e0e0] pl-[32px] py-[14px] max-w-fit">
                                <div className="flex flex-row items-center gap-[6px]">
                                    <div className="w-[12px] h-[12px] bg-[#FFB03D] rounded-full"></div>
                                    {row.Score}
                                </div>
                                {svgRotate === rowIndex && <p>Formula result: 50</p>}
                            </td>
                            <td className="border-[1px] border-[#e0e0e0] pl-[32px] py-[14px] max-w-fit">
                                {row.Contributor}
                                {svgRotate === rowIndex && <p>Formula result: 50</p>}
                            </td>
                            <td className="border-[1px] border-[#e0e0e0] pl-[32px] py-[14px] max-w-fit">
                                {row.Weight}%
                                {svgRotate === rowIndex && <p>Formula result: 50</p>}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssetScore;
