//@ts-nocheck
import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import CustomSelectDropdown from "../../DropDown.tsx";
import LoadingProgress from "../../Loading/Loading";
import Pagination from "../../AssetTable/pagination/Pagination";

const AssetsTable = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [tabHeaders,setTabHeaders]=useState([])
    const [filterType,setFilterType]=useState(-1)
    const [searchTerm,setSearchTerm]=useState("")
    const [data,setData]=useState([])
    const[loading,setLoading]=useState(true)
    const[error,setError]=useState("")
    const [currentIndex, setCurrentIndex] = useState(1);
    const [selectedHeaders, setSelectedHeaders] = useState(new Set());
    const [option, setOption] = useState(new Set());
    const navigate=useNavigate()

    const [exportOpen,setExportOpen]=useState(false)
    const [exportType,setExportType]=useState(-1)


    // const { data, isLoading, error } = useQuery({
    //     queryKey: ['tableData'],
    //     queryFn: fetchMyData,
    // });


    const tableRef = useRef(null);

    useEffect(() =>
    {
        const storedViews = JSON.parse(localStorage.getItem('views')) || {};
        console.log('Available views:', storedViews);


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










    const handleHeaderClick = (header) =>
    {

        setSelectedHeaders((prevSelectedHeaders) =>
        {
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
        { value: "Save as new view", label: t("Save as new view") },
        { value: "Default view", label: t("Default view") },
    ];

    const saveNewView =(viewName)=>
    {
        const headerArray=Array.from(selectedHeaders)
        const storedViews=JSON.parse(localStorage.getItem('views')) || {};


        storedViews[viewName]=headerArray;
        localStorage.setItem('views', JSON.stringify(storedViews))

        console.log(`View '${viewName}' saved with headers:`, headerArray);
    }





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
    useEffect(() => {
        const storedViews = JSON.parse(localStorage.getItem('views')) || {};
        saveNewView('Custom View Name')
        console.log('Available views:', storedViews);
    }, [option]);

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

        <div className="relative pt-[20px]">
            <div className="flex justify-between items-center mb-8 ml-[20px]">
                <div className="flex-grow">
                    <CustomSelectDropdown
                        options={options}
                        placeholder={t("View : Default view")}
                        onSelect={handleSelect}
                        setOption={setOption}
                        option={option}
                    />
                </div>
                <div className={`relative bg-white flex flex-row items-center rounded-[4px] ${
                    exportOpen ? "border-[1px] border-[#63ABFD]" : "border-[1px]"
                }`}
                     onClick={() => setExportOpen(!exportOpen)}>
                    <p className="text-[#212121] font-[600] px-[24px] py-[7px] border-r-[1px] border-r-[#e0e0e0] "
                    >{t("Export")}</p>
                    <svg className="mx-[10px] " width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15.023 7.14804L9.39804 12.773C9.3458 12.8253 9.28376 12.8668 9.21547 12.8951C9.14719 12.9234 9.07399 12.938 9.00007 12.938C8.92615 12.938 8.85295 12.9234 8.78466 12.8951C8.71638 12.8668 8.65434 12.8253 8.6021 12.773L2.9771 7.14804C2.87155 7.04249 2.81226 6.89934 2.81226 6.75007C2.81226 6.6008 2.87155 6.45765 2.9771 6.3521C3.08265 6.24655 3.2258 6.18726 3.37507 6.18726C3.52434 6.18726 3.66749 6.24655 3.77304 6.3521L9.00007 11.5798L14.2271 6.3521C14.2794 6.29984 14.3414 6.25838 14.4097 6.2301C14.478 6.20181 14.5512 6.18726 14.6251 6.18726C14.699 6.18726 14.7722 6.20181 14.8404 6.2301C14.9087 6.25838 14.9708 6.29984 15.023 6.3521C15.0753 6.40436 15.1168 6.46641 15.145 6.53469C15.1733 6.60297 15.1879 6.67616 15.1879 6.75007C15.1879 6.82398 15.1733 6.89716 15.145 6.96545C15.1168 7.03373 15.0753 7.09578 15.023 7.14804Z"
                            fill="black"/>
                    </svg>
                    {exportOpen && (
                        <div className="absolute bg-white left-0 top-[42px] z-50
                        w-full  flex flex-col border-[1px] border-[#e0e0e0] rounded-[4px]">
                            <h2 className="px-[24px] py-[8px] w-full hover:bg-[#007bFF] hover:text-white"
                                onClick={() => exportToCSV(data)}>Csv file </h2>
                            <h2 className="px-[24px] py-[8px] w-full hover:bg-[#007bFF] hover:text-white"
                                onClick={() => exportToCSV(data)}>Excel file </h2>
                        </div>

                    )}

                </div>
            </div>


            {loading ?
                <LoadingProgress/> :
                <div className="flex flex-col">
                    <div ref={tableRef}
                         className="table-scroll-container ml-[20px] w-[calc(90vw)] overflow-x-scroll">
                        <div className="flex flex-row items-center justify-between
                                            border-[1px] border-[#E0E0E0] py-[20px] px-[23px]">
                            <div className=" w-[316px] flex flex-row items-center
                                                    gap-[8px] border-[1px] border-[##E0E0E0]
                                                    outline-none  rounded-[4px] py-[11px] px-[12px]">
                                <img className="cursor-pointer" src="/images/Asset/MagnifyingGlass.svg" alt=""/>
                                <input className="outline-none bg-transparent border-none w-full h-full" type="text" placeholder="search here"
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
                            {tabHeaders.map((item, index) => (
                                !selectedHeaders.has(item) && (
                                    <div   key={index} className={` text-left py-[14px] pl-[12px] pr-[20px] whitespace-nowrap ${
                                        index === 0
                                            ? `sticky  left-0 z-10 bg-[#E5F2FF] ${
                                                isScrolled ? 'border-r-2 border-[#e0e0e0]' : ''
                                            }`
                                            : 'border-[1px] border-[#e0e0e0]'
                                    }`}
                                           style={{
                                               width:`calc(100%/${tabHeaders.length})`,
                                               maxWidth: '440px',
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
                                        {item}
                                    </div>)
                            ))}
                        </div>



                        {filterType ===2 && (
                            <div className="bg-[#E5F2FF] w-full flex flex-row items-center">
                                {tabHeaders.map((item, index) => (
                                    <div key={index}
                                         onClick={() => handleHeaderClick(item)}
                                         className={`max-w-fit  h-[40px] p-[10px] flex flex-row rounded-[4px] m-[10px] cursor-pointer
                                         gap-[16px] items-center justify-between text-white bg-[#313138] ${selectedHeaders.has(item)?'bg-[#313138] bg-opacity-50':'bg-[#313138]'}`}>
                                        {item}
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

                            {filteredDataInPage.map((row, rowIndex) => (
                                <tr className="cursor-pointer" key={rowIndex} onClick={()=>handleNavigate()}>
                                    {tabHeaders.map((header, colIndex) => {
                                        if (selectedHeaders.has(header)) return null; // Skip rendering column if it's selected

                                        if (header === "assetName") {
                                            return (
                                                <td
                                                    key={colIndex}
                                                    className={`sticky left-0 z-10 bg-white  flex flex-row items-center gap-[22px] 
                                                border-b-[1px] border-b-[#e0e0e0] py-[14px] pl-[12px] ${
                                                        isScrolled ? 'border-r-2 border-[#e0e0e0]' : ''
                                                    }`}
                                                    style={{
                                                        width: `100%`,
                                                        maxWidth:'286px',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="w-[18px] h-[18px] bg-transparent border-none outline-none"
                                                    />
                                                    <span
                                                        className="py-[14px] pl-[12px] whitespace-nowrap pr-[20px] text-[#007BFF]"
                                                        style={{
                                                            width: `100%`,
                                                            maxWidth:'250px',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap',
                                                        }}
                                                        title={row.assetName}
                                                    >
                            {row.assetName}
                        </span>
                                                </td>
                                            );
                                        }

                                        return (
                                            <td
                                                key={colIndex}
                                                className={`  border-b-[1px] border-b-[#e0e0e0] py-[14px] pl-[12px] whitespace-nowrap pr-[20px]`}
                                                style={{
                                                    width: `calc(100%/${tabHeaders.length})`,
                                                    maxWidth:'250px',
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

export default AssetsTable;