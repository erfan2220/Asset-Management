//@ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import "./AdminTable.css"
import Pagination from "./pagination/Pagination";
import CustomSelectDropdown from "../../DropDown.tsx";
import {useNavigate} from "react-router-dom";
import LoadingProgress from "../../Loading/Loading"




const columns = [
    { title: 'Asset' },
    { title: 'Description' },
    { title: 'Location' },
    { title: 'Loop Location' },
    { title: 'Parent\t' },
    { title: 'Rotating Item' },
    { title: 'IS M&TE?' },
    { title: 'Linear?' },
    { title: 'Calibration?' },
];

const dataAdmin=[
    {
        Asset:"MCI-20240203",
        "Description":"Lorem ipsum is Placeholder text...",
        "Location":"East Campus",
        "Loop Location":"",
        "Parent":"",
        "Rotating Item":"",
        "IS M&TE?":false,
        "Linear?":false,
        "Calibration?":false,
    },
    {
        Asset:"MCI-20240203",
        "Description":"Lorem ipsum is Placeholder text...",
        "Location":"East Campus",
        "Loop Location":"",
        "Parent":"",
        "Rotating Item":"",
        "IS M&TE?":false,
        "Linear?":false,
        "Calibration?":false,
    },
    {
        Asset:"MCI-20240203",
        "Description":"Lorem ipsum is Placeholder text...",
        "Location":"East Campus",
        "Loop Location":"",
        "Parent":"",
        "Rotating Item":"",
        "IS M&TE?":false,
        "Linear?":false,
        "Calibration?":false,
    },
]


const AdminTable = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [tabHeaders,setTabHeaders]=useState([])
    const [filterType,setFilterType]=useState(-1)
    const [searchTerm,setSearchTerm]=useState("")
    const [data,setData]=useState([])
    const[loading,setLoading]=useState(true)
    const[error,setError]=useState("")
    const [currentIndex, setCurrentIndex] = useState(1);
    const [selectedHeaders, setSelectedHeaders] = useState(new Set());
    const navigate=useNavigate()


    // const { data, isLoading, error } = useQuery({
    //     queryKey: ['tableData'],
    //     queryFn: fetchMyData,
    // });


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

    const filteredData = data?.filter(row =>
        Object.values(row).some(value =>
            (value ? value.toString().toLowerCase() : '').includes(searchTerm.toLowerCase())
        )
    );

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const filteredDataInPage = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleFilterType=(index)=>
    {
        setFilterType(index)
    }

    useEffect(() => {
        const fetchMyData = async () => {
            try {
                const response = await fetch('http://10.15.90.72:9098/api/inventory');

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                setData(result.content); // Assuming `content` contains your data
                setTabHeaders(Object.keys(result.content[1]))
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchMyData();
    }, []);










    const handleHeaderClick = (header) => {
        setSelectedHeaders((prevSelectedHeaders) => {
            const newSelectedHeaders = new Set(prevSelectedHeaders);
            if (newSelectedHeaders.has(header)) {
                newSelectedHeaders.delete(header);
            } else {
                newSelectedHeaders.add(header);
            }
            return newSelectedHeaders;
        });
    };
    const options = [
        {value: "Save as new view", label: "Save as new view"},
        {value: "Default view", label: "Default view"},
    ];

    const handleSelect = (option: any) => {
        setCurrentIndex(option.value);
    };

    // const convertToCSV = (data) => {
    //     const headers = Object.keys(data[0]);
    //     const rows = data.map(row => headers.map(header => row[header]).join(','));
    //
    //     return [
    //         headers.join(','),
    //         ...rows
    //     ].join('\n');
    // };

// Function to trigger the CSV download
    const exportToCSV = (data) => {
        const headers = Object.keys(data[1]);
        const rows = data.map(row => headers.map(header => `"${row[header]}"`).join(','));

        const csvContent = [
            headers.join(','),
            ...rows
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'export.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const handleNavigate=()=>
    {
        navigate("/AssetDetails")
    }

    return (

        <div className="relative">
            <div className="flex justify-between items-center mb-8 ml-[20px] mt-[14px]">
                <div className="flex flex-row items-center gap-[32px]">
                    <h1 className="text-[22px] text-[#212121]"> Assets</h1>
                    <CustomSelectDropdown
                        options={options}
                        placeholder="View : Default view"
                        onSelect={handleSelect}
                    />
                </div>
                <div className="flex flex-row items-center gap-[24px] flex-shrink-0">
                    <div className="cursor-pointer text-[#212121] flex flex-row gap-[8px] py-[7px] rounded-[4px]
                    pl-[12px] pr-[16px] bg-[#fff] border-[1px] border-[#e0e0e0]" onClick={() => exportToCSV(data)}>
                        <img src="/images/AdminPanel/DownloadSimple.svg" alt=""/>
                        <h2 className="text-[15px] text-[#212121]">Export</h2>
                    </div>

                    <div
                        className="cursor-pointer text-white flex flex-row gap-[11px] py-[7px] pl-[12px] pr-[16px] bg-[#007BFF] rounded-[4px]">
                        <img src="/images/AdminPanel/NewAsset.svg" alt=""/>
                        <h2 className="text-[15px] text-white">New Asset</h2>
                    </div>
                </div>
            </div>


            {loading ?
                <LoadingProgress/> :
                <div className="flex flex-col">
                    <div ref={tableRef} className="table-scroll-container ml-[20px] w-[calc(90vw)] overflow-x-scroll">
                        <div className="flex flex-row items-center justify-between
                    border-[1px] border-[#E0E0E0] py-[20px] px-[23px]">
                        <div className=" w-[316px] flex flex-row items-center fixed
                            gap-[8px] border-[1px] border-[##E0E0E0]
                            outline-none  rounded-[4px] py-[11px] px-[12px]">
                                <img className="cursor-pointer" src="/images/Asset/MagnifyingGlass.svg" alt=""/>
                                <input className="outline-none bg-transparent border-none w-full h-full" type="text" placeholder="Find asset"
                                       value={searchTerm || ''} // Use an empty string if searchTerm is undefined
                                       onChange={(e) => setSearchTerm(e.target.value)}/>
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

                        <div className="cursor-pointer bg-[#E5F2FF] w-full flex flex-row items-center">
                            {columns.map((item, index) => (
                                !selectedHeaders.has(item) && (
                                    <div   key={index} className={`min-w-[220px] text-left py-[14px] pl-[12px] pr-[20px] whitespace-nowrap ${
                                        index === 0
                                            ? `sticky  left-0 z-10 bg-[#E5F2FF] ${
                                                isScrolled ? 'border-r-2 border-[#e0e0e0]' : ''
                                            }`
                                            : 'border-[1px] border-[#e0e0e0]'
                                    }`}
                                           style={{
                                               maxWidth: '250px',
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
                                    </div>)
                            ))}
                            {/*columns.map((item, index) => (
                                !selectedHeaders.has(item) && (
                                    <div   key={index} className={`min-w-[220px] text-left py-[14px] pl-[12px] pr-[20px] whitespace-nowrap ${
                                        index === 0
                                            ? `sticky  left-0 z-10 bg-[#E5F2FF] ${
                                                isScrolled ? 'border-r-2 border-[#e0e0e0]' : ''
                                            }`
                                            : 'border-[1px] border-[#e0e0e0]'
                                    }`}
                                           style={{
                                               maxWidth: '250px',
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
                                    </div>)
                            ))*/}

                            {/*{tabHeaders.map((item, index) => (*/}
                            {/*    !selectedHeaders.has(item) && (*/}
                            {/*        <div   key={index} className={`min-w-[220px] text-left py-[14px] pl-[12px] pr-[20px] whitespace-nowrap ${*/}
                            {/*            index === 0*/}
                            {/*                ? `sticky  left-0 z-10 bg-[#E5F2FF] ${*/}
                            {/*                    isScrolled ? 'border-r-2 border-[#e0e0e0]' : ''*/}
                            {/*                }`*/}
                            {/*                : 'border-[1px] border-[#e0e0e0]'*/}
                            {/*        }`}*/}
                            {/*               style={{*/}
                            {/*                   maxWidth: '250px',*/}
                            {/*                   overflow: 'hidden',*/}
                            {/*                   textOverflow: 'ellipsis',*/}
                            {/*                   whiteSpace: 'nowrap',*/}
                            {/*               }}*/}
                            {/*        >*/}
                            {/*            {index === 0 && (*/}
                            {/*                <input*/}
                            {/*                    type="checkbox"*/}
                            {/*                    className="w-[18px] h-[18px] mr-[36px]  bg-transparent border-none outline-none"*/}
                            {/*                />*/}
                            {/*            )}*/}
                            {/*            {item}*/}
                            {/*        </div>)*/}
                            {/*))}*/}
                        </div>



                        {filterType ===2 && (
                            <div className="bg-[#E5F2FF] w-full flex flex-row items-center">
                                {columns.map((item, index) => (
                                    <div key={index}
                                         onClick={() => handleHeaderClick(item)}
                                         className={`max-w-fit  h-[40px] p-[10px] flex flex-row rounded-[4px] m-[10px] cursor-pointer
                                         gap-[16px] items-center justify-between text-white bg-[#313138] ${selectedHeaders.has(item)?'bg-[#313138] bg-opacity-50':'bg-[#313138]'}`}>
                                        {item.title}
                                        <img src="/images/Asset/headerEam.svg" alt=""/>
                                    </div>
                                ))}

                            </div>

                        )}

                        {
                            filterType ===1 &&(
                                <div>
                                    <div className="fixed top-0 left-0 w-full h-full bg-[#00000014] z-40"></div>
                                    <div className="fixed left-[30%] top-[15%] bg-white border-[1px]
                                border-[#D9D9D9] w-[460px]  p-[20px] z-50 rounded-[4px]">
                                        <div className="flex flex-row items-center justify-between">
                                            <h2>Filter</h2>
                                            <img className="cursor-pointer" src="/images/Asset/filter/close.svg" alt="" onClick={()=>setFilterType(-1)}/>
                                        </div>
                                        <p className="text-[16px] text-[#616161] mt-[26px]">You can choose a query or filter some attributes of table</p>
                                        <h3 className="mt-[20px] text-[14px] text-[#757575] text-opacity-90">Query</h3>
                                        <select className="mt-[8px] w-full border-[1px] border-[#D9D9D9] py-[8px] outline-none rounded-[4px]">
                                            <option value="">select...</option>
                                        </select>
                                        <div className="border-[1px] w-full border-[#EEEEEE] mt-[20px]"></div>
                                        <div className="flex flex-row items-center justify-between mt-[20px]">
                                            <h2 className="text-[16px] text-[#212121]">Attributes</h2>
                                            <h4 className="text-[#007Bff] text-[14px]">Clear</h4>
                                        </div>

                                        <h3 className="mt-[20px] text-[14px] opacity-90 text-[#757575]">Asset</h3>
                                        <select className="mt-[8px] w-full border-[1px] border-[#D9D9D9] py-[8px] outline-none rounded-[4px]">
                                            <option value="">select...</option>
                                        </select>

                                        <h3 className="mt-[20px] text-[14px] opacity-90 text-[#757575]">Type</h3>
                                        <select className="mt-[8px] w-full border-[1px] border-[#D9D9D9] py-[8px] outline-none rounded-[4px]">
                                            <option value="">select...</option>
                                        </select>

                                        <div className="flex flex-row justify-end items-center gap-[16px] mt-[32px]">
                                            <button className="border-[1px] rounded-[4px] border-[#e0e0e0]
                                         text-[#212121] py-[7px] px-[23px]">cancel</button>

                                            <button className="bg-[#007BFF] text-white border-[1px] rounded-[4px] border-[#e0e0e0]
                                         py-[7px] px-[23px]">save</button>




                                        </div>



                                    </div>
                                </div>
                            )
                        }

                        <table className="border-[1px] border-[#e0e0e0] w-full">
                            <thead className="bg-[#E5F2FF]">




                            </thead>

                            <tbody>

                            {dataAdmin.map((row, rowIndex) => (
                                <tr className="cursor-pointer" key={rowIndex} >
                                    {columns.map((header, colIndex) => {
                                        if (selectedHeaders.has(header)) return null; // Skip rendering column if it's selected


                                        if (header === "Asset") {
                                            return (
                                                <td
                                                    key={colIndex}
                                                    className={`sticky left-0 z-10 bg-white min-w-[220px] flex flex-row items-center gap-[22px] border-b-[1px] border-b-[#e0e0e0] py-[14px] pl-[12px] ${
                                                        isScrolled ? 'border-r-2 border-[#e0e0e0]' : ''
                                                    }`}
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
                                                             {row.Asset}
                                                    </span>
                                                    <span
                                                        className="py-[14px] pl-[12px] whitespace-nowrap pr-[20px] text-[#007BFF]"
                                                        style={{
                                                            maxWidth: '200px',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap',
                                                        }}
                                                    >
    {'Test Value'} {/* Hardcoded test value */}
</span>

                                                </td>
                                            );
                                        }

                                        return (
                                            <td
                                                key={colIndex}
                                                className={`min-w-[220px]  border-b-[1px] border-b-[#e0e0e0] py-[14px] pl-[26px] whitespace-nowrap pr-[20px]`}
                                                style={{
                                                    maxWidth: '200px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                {row[header]}
                                            </td>
                                        );
                                    })}
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
            }
        </div>
    )
};

export default AdminTable;