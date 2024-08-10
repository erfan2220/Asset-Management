//@ts-nocheck

import React, { useState, useEffect, useRef } from 'react';
import "./Table.css"
import Pagination from "./pagination/Pagination";

const columns = [
    { title: 'Asset' },
    { title: 'Critically' },
    { title: 'Flags' },
    { title: 'Technology' },
    { title: 'Vendor' },
    { title: 'Work Order' },
    { title: 'Risk' },
    { title: 'Description' },
    { title: 'Status' },
    { title: 'Health' },
    { title: 'Installation' },
];

const data = [
    {
        asset: 'MCI-IGR-20240203',
        critically: '60',
        flags: '2G,3G,4G,5G',
        technology: 'Tech 1',
        workOrder: 'AMHERST',
        risk: '10',
        description: 'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document',
        Vendor: 'Nokia',
        status: 'Inactive',
        health: '10',
        installation: '01.02.19',
    },
    {
        asset: 'MCI-IGR-20240203',
        critically: '20',
        flags: '2G,3G',
        technology: 'Tech 1',
        workOrder: 'AMHERST',
        risk: '10',
        description: 'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document',
        Vendor: 'Nokia',
        status: 'Inactive',
        health: '40',
        installation: '01.02.19',
    },
    {
        asset: 'MCI-IGR-20240203',
        critically: '23',
        flags: '2G,3G',
        technology: 'Tech 1',
        workOrder: 'AMHERST',
        risk: '10',
        description: 'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document',
        Vendor: 'Huawei',
        status: 'Inactive',
        health: '85',
        installation: '01.02.19',
    },  {
        asset: 'MCI-IGR-20240203',
        critically: '80',
        flags: '2G,3G',
        technology: 'Tech 1',
        workOrder: 'AMHERST',
        risk: '10',
        description: 'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document',
        Vendor: 'Huawei',
        status: 'Inactive',
        health: '20',
        installation: '01.02.19',
    },  {
        asset: 'MCI-IGR-20240203',
        critically: '90',
        flags: '2G,3G',
        technology: 'Tech 1',
        workOrder: 'AMHERST',
        risk: '10',
        description: 'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document',
        Vendor: 'Huawei',
        status: 'Inactive',
        health: '85',
        installation: '01.02.19',
    },  {
        asset: 'MCI-IGR-20240203',
        critically: '10',
        flags: '2G,3G',
        technology: 'Tech 1',
        workOrder: 'AMHERST',
        risk: '10',
        description: 'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document',
        Vendor: 'Huawei',
        status: 'Inactive',
        health: '30',
        installation: '01.02.19',
    },  {
        asset: 'MCI-IGR-20240203',
        critically: '10',
        flags: '2G,3G',
        technology: 'Tech 1',
        workOrder: 'AMHERST',
        risk: '10',
        description: 'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document',
        Vendor: 'Huawei',
        status: 'Inactive',
        health: '50',
        installation: '01.02.19',
    },  {
        asset: 'MCI-IGR-20240203',
        critically: '10',
        flags: '2G,3G',
        technology: 'Tech 1',
        workOrder: 'AMHERST',
        risk: '10',
        description: 'Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document',
        Vendor: 'Huawei',
        status: 'Inactive',
        health: '30',
        installation: '01.02.19',
    },
];

const Table = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [filterType,setFilterType]=useState(1)

    const tableRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (tableRef.current) {
                setIsScrolled(tableRef.current.scrollLeft > 0);
            }
        };

        const tableElement = tableRef.current;
        if (tableElement) {
            tableElement.addEventListener('scroll', handleScroll);
            handleScroll(); // Check scroll position on mount
        }

        return () => {
            if (tableElement) {
                tableElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleFilterType=(index)=>
    {
        setFilterType(index)
    }
    return (
        <div className="flex flex-col">
                <div ref={tableRef} className="table-scroll-container ml-[20px] w-[calc(90vw)] overflow-x-scroll">
                    <div className="flex flex-row items-center justify-between
                    border-[1px] border-[#E0E0E0] py-[20px] px-[23px]">
                            <div className=" w-[316px] flex flex-row items-center
                            gap-[8px] border-[1px] border-[##E0E0E0]
                            outline-none  rounded-[4px] py-[11px] px-[12px]">
                                <img src="/images/Asset/MagnifyingGlass.svg" alt=""/>
                                <input className="outline-none border-none w-full h-full" type="text" placeholder="search here"/>
                            </div>

                            <div className="flex flex-row items-center gap-[12px]">
                                <div className={filterType ===1 ?"flex justify-center items-center w-[40px] h-[40px] bg-[#E5F2FF]":"cursor-pointer"} onClick={()=>handleFilterType(1)}>
                                     <img src="/images/Asset/filterIcon.svg" alt=""/>
                                </div>

                                <div  className={filterType ===2 ?"flex justify-center items-center w-[40px] h-[40px] bg-[#E5F2FF]":"cursor-pointer"} onClick={()=>handleFilterType(2)}>
                                    <img src="/images/Asset/filter.svg" alt=""/>
                                </div>
                            </div>

                    </div>
                    <table className="border-[1px] border-[#e0e0e0] ml-[24px]">
                        <thead className="bg-[#E5F2FF]">
                        <tr>
                            {columns.map((item, index) => (
                                <th key={index} className={`min-w-[200px] text-left py-[14px] pl-[12px] pr-[20px] whitespace-nowrap ${
                                        index === 0
                                            ? `sticky  left-0 z-10 bg-[#E5F2FF] ${
                                                isScrolled ? 'border-r-2 border-[#e0e0e0]' : ''
                                            }` // Conditional border
                                            : 'border-[1px] border-[#e0e0e0]'
                                    }`}
                                    style={{
                                        maxWidth: '200px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {index === 0 && (
                                        <input
                                            type="checkbox"
                                            className="w-[18px] h-[18px] mr-[36px]  bg-transparent border-none outline-none"
                                        />
                                    )}
                                    {item.title}
                                </th>
                            ))}
                        </tr>
                        {/*<tr>*/}

                        {/*        {columns.map((item, index) => (*/}
                        {/*            <div className="w-[106px] h-[40px] flex flex-row items-center justify-between text-white bg-[#313138]">*/}
                        {/*                {item.title}*/}
                        {/*                <img src="/images/Asset/headerEam.svg" alt=""/>*/}
                        {/*            </div>*/}
                        {/*        ))}*/}
                        {/*</tr>*/}

                        </thead>

                        <tbody>
                        {currentItems.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td
                                    className={`sticky left-0 z-10 bg-white min-w-[200px] flex flex-row items-center gap-[22px] border-b-[1px] border-b-[#e0e0e0] py-[14px] pl-[12px] ${
                                        isScrolled ? 'border-r-2 border-[#e0e0e0]' : ''
                                    }`} // Conditional border
                                >
                                    <input
                                        type="checkbox"
                                        className="w-[18px] h-[18px] bg-transparent border-none outline-none"
                                    />
                                    <span
                                        className="py-[14px] pl-[12px] whitespace-nowrap pr-[20px] text-[#007BFF]"
                                        style={{
                                            maxWidth: '200px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                            {row.asset}
                                        </span>
                                </td>

                                <td
                                    className=" min-w-[200px] border-b-[1px] border-b-[#e0e0e0] py-[14px] pl-[12px] whitespace-nowrap pr-[20px]"
                                    style={{
                                        maxWidth: '200px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    <div className="flex flex-row items-center gap-[7px]">
                                        <div className={row.critically <50 ?"w-[10px] h-[10px] rounded-full bg-[#8E60FA]":
                                            "w-[10px] h-[10px] rounded-full bg-[#58A0FF]" }>

                                        </div>
                                        {row.critically}
                                    </div>
                                </td>
                                <td
                                    className="min-w-[200px] border-b-[1px] border-b-[#e0e0e0] py-[14px] pl-[12px] whitespace-nowrap pr-[20px]"
                                    style={{
                                        maxWidth: '200px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {row.flags}
                                </td>
                                <td
                                    className="min-w-[200px] border-b-[1px] border-b-[#e0e0e0] py-[14px] pl-[12px] whitespace-nowrap pr-[20px]"
                                    style={{
                                        maxWidth: '200px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {row.technology}
                                </td>

                                <td
                                    className="min-w-[200px] border-b-[1px] border-b-[#e0e0e0] py-[14px] pl-[12px] whitespace-nowrap pr-[20px]"
                                    style={{
                                        maxWidth: '200px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {row.Vendor}
                                </td>
                                <td
                                    className="min-w-[200px] border-b-[1px] border-b-[#e0e0e0] py-[14px] pl-[12px] whitespace-nowrap pr-[20px]"
                                    style={{
                                        maxWidth: '200px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {row.workOrder}
                                </td>
                                <td
                                    className="min-w-[200px] border-b-[1px] border-b-[#e0e0e0] py-[14px] pl-[12px] whitespace-nowrap pr-[20px]"
                                    style={{
                                        maxWidth: '200px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    <div className="flex flex-row items-center gap-[7px]">
                                        <div
                                            className={row.risk < 50 ? "w-[10px] h-[10px] rounded-full bg-[#8E60FA]" :
                                                "w-[10px] h-[10px] rounded-full bg-[#58A0FF]"}>

                                        </div>
                                        {row.risk}
                                    </div>

                                </td>
                                <td
                                    className="min-w-[200px] border-b-[1px] border-b-[#e0e0e0] py-[14px] pl-[12px] whitespace-nowrap pr-[20px] truncate"
                                    style={{
                                        maxWidth: '200px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {row.description}
                                </td>

                                <td
                                    className="min-w-[200px] border-b-[1px] border-b-[#e0e0e0] py-[14px] pl-[12px] whitespace-nowrap pr-[20px]"
                                    style={{
                                        maxWidth: '200px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {row.status}
                                </td>
                                <td
                                    className="min-w-[200px] border-b-[1px] border-b-[#e0e0e0] py-[14px] pl-[12px] whitespace-nowrap pr-[20px]"
                                    style={{
                                        maxWidth: '200px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    <div className="flex flex-row items-center gap-[7px]">
                                        <div
                                            className={
                                                row.health < 40
                                                    ? "w-[10px] h-[10px] rounded-full bg-[#FB4E4E]"
                                                    : row.health < 70
                                                        ? "w-[10px] h-[10px] rounded-full bg-[#FFB03D]"
                                                        : "w-[10px] h-[10px] rounded-full bg-[#61BB19]"
                                            }>

                                        </div>
                                        {row.health}
                                    </div>
                                </td>
                                <td className="min-w-[200px] border-b-[1px] border-b-[#e0e0e0] py-[14px] pl-[12px] whitespace-nowrap pr-[20px]">
                                    {row.installation}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>


                </div>

            <div>
                <Pagination
                    data={data}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setItemsPerPage={setItemsPerPage}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                </div>
         </div>
)
    ;
};

export default Table;