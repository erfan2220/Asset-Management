// //@ts-nocheck
// import React, { useState, useEffect, useRef } from "react";
// import "../../Components/AdminPage/AdminTable/AdminTable.css";
// import { useNavigate } from "react-router-dom";
// import CustomSelectDropdown from "../../Components/DropDown.tsx";
// import LoadingProgress from "../../Components/Loading/Loading";
// import Pagination from "../../Components/AssetTable/pagination/Pagination";
// import RegisterPriceModal from "../../Components/RegisterPriceModal";
// import UploadPricingFileModal from "./UploadFileModal";

// const columns = [
//   { title: "provinceName" },
//   { title: "voice2GEP" },
//   { title: "voice3GEP" },
//   { title: "sms2GEP" },
//   { title: "sms3GEP" },
//   { title: "totalSMSEp" },
//   { title: "data2GEP" },
//   { title: "data3GEP" },
//   { title: "data4GEP" },
//   { title: "totalDataEp" },
//   { title: "year" },
// ];

// const dataAdmin = [
//   {
//     provinceName: "MCI-20240203",
//     voice2GEP: "Lorem ipsum is Placeholder text...",
//     voice3GEP: "East Campus",
//     totalSMSEp: "East Campus",
//     year: "",
//     data2GEP: "East Campus",
//     data3GEP: "East Campus",
//     data4GEP: "East Campus",
//     totalDataEp: "East Campus",
//   },
//   {
//     provinceName: "MCI-20240203",
//     voice2GEP: "Lorem ipsum is Placeholder text...",
//     voice3GEP: "East Campus",
//     totalSMSEp: "East Campus",
//     year: "",
//     data2GEP: "East Campus",
//     data3GEP: "East Campus",
//     data4GEP: "East Campus",
//     totalDataEp: "East Campus",
//   },
//   {
//     provinceName: "MCI-20240203",
//     voice2GEP: "Lorem ipsum is Placeholder text...",
//     voice3GEP: "East Campus",
//     totalSMSEp: "East Campus",
//     year: "",
//     data2GEP: "East Campus",
//     data3GEP: "East Campus",
//     data4GEP: "East Campus",
//     totalDataEp: "East Campus",
//   },
//   {
//     provinceName: "MCI-20240203",
//     voice2GEP: "Lorem ipsum is Placeholder text...",
//     voice3GEP: "East Campus",
//     totalSMSEp: "East Campus",
//     year: "",
//     data2GEP: "East Campus",
//     data3GEP: "East Campus",
//     data4GEP: "East Campus",
//     totalDataEp: "East Campus",
//   },
//   {
//     provinceName: "MCI-20240203",
//     voice2GEP: "Lorem ipsum is Placeholder text...",
//     voice3GEP: "East Campus",
//     totalSMSEp: "East Campus",
//     year: "",
//     data2GEP: "East Campus",
//     data3GEP: "East Campus",
//     data4GEP: "East Campus",
//     totalDataEp: "East Campus",
//   },
//   {
//     provinceName: "MCI-20240203",
//     voice2GEP: "Lorem ipsum is Placeholder text...",
//     voice3GEP: "East Campus",
//     totalSMSEp: "East Campus",
//     year: "",
//     data2GEP: "East Campus",
//     data3GEP: "East Campus",
//     data4GEP: "East Campus",
//     totalDataEp: "East Campus",
//   },
// ];

// const ProvinceEp = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [tabHeaders, setTabHeaders] = useState([]);
//   const [filterType, setFilterType] = useState(-1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [currentIndex, setCurrentIndex] = useState(1);
//   const [selectedHeaders, setSelectedHeaders] = useState(new Set());
//   const [selectedYear, setSelectedYear] = useState("");
//   const [selectedProvince, setSelectedProvince] = useState("");
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [showEditButton, setShowEditButton] = useState(false);
//   const [showDeleteButton, setShowDeleteButton] = useState(false);
//   const [isUploaderVisible, setIsUploaderVisible] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [selectedRowData, setSelectedRowData] = useState(null);

//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);

//   // Year and province options
//   const yearOptions = ["1403", "1402", "1401", "1400", "1399"];
//   const provinceOptions = ["Tehran", "East Azarbayjan", "West Azarbayjan"];

//   const tableRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (tableRef.current) {
//         setIsScrolled(tableRef.current.scrollLeft > 0);
//       }
//     };

//     const tableElement = tableRef.current;
//     if (tableElement) {
//       tableElement.addEventListener("scroll", handleScroll);
//       handleScroll(); // Check scroll position on mount
//     }

//     return () => {
//       if (tableElement) {
//         tableElement.removeEventListener("scroll", handleScroll);
//       }
//     };
//   }, []);

//   const filteredData = data?.filter((row) =>
//     Object.values(row).some((value) =>
//       (value ? value.toString().toLowerCase() : "").includes(
//         searchTerm.toLowerCase()
//       )
//     )
//   );

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const filteredDataInPage = filteredData.slice(
//     indexOfFirstItem,
//     indexOfLastItem
//   );
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   useEffect(() => {
//     const fetchMyData = async () => {
//       try {
//         const response = await fetch("http://10.15.90.72:9098/api/provinceEP");

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const result = await response.json();
//         setData(result.content);
//         setTabHeaders(Object.keys(result.content[1]));
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchMyData();
//   }, []);

//   const handleHeaderClick = (header) => {
//     setSelectedHeaders((prevSelectedHeaders) => {
//       const newSelectedHeaders = new Set(prevSelectedHeaders);
//       if (newSelectedHeaders.has(header)) {
//         newSelectedHeaders.delete(header);
//       } else {
//         newSelectedHeaders.add(header);
//       }
//       return newSelectedHeaders;
//     });
//   };

//   const handleNavigate = () => {
//     navigate("/AssetDetails");
//   };

//   const openUploadModal = () => setIsUploadModalOpen(true);
//   const closeUploadModal = () => setIsUploadModalOpen(false);

//   const handleFileUpload = (file) => {
//     console.log("File to upload:", file);
//   };

//   const handleRowSelection = (rowIndex) => {
//     const selectedData = filteredDataInPage[rowIndex];
//     // setSelectedRowData(selectedData);

//     setSelectedRows((prevSelectedRows) => {
//       const isSelected = prevSelectedRows.includes(rowIndex);
//       const updatedSelectedRows = isSelected
//         ? prevSelectedRows.filter((index) => index !== rowIndex)
//         : [...prevSelectedRows, rowIndex];

//       setShowDeleteButton(updatedSelectedRows.length > 0);
//       setShowEditButton(updatedSelectedRows.length === 1);
//       setSelectedRowData(
//         updatedSelectedRows.length === 1 ? selectedData : null
//       );

//       if (updatedSelectedRows.length === 1) {
//         setSelectedRowData(updatedSelectedRows[0]);
//         console.log(updatedSelectedRows[0], "selectedData");
//       } else {
//         setSelectedRowData(null);
//       }

//       return updatedSelectedRows;
//     });
//   };

//   const handleEditClick = () => {
//     if (selectedRowData) {
//       setIsEditMode(true);
//       setIsModalVisible(true);
//     } else {
//       console.log("No row selected for editing");
//     }
//   };

//   return (
//     <div className="relative">
//       <div className="flex justify-between items-center mb-8 ml-[20px] mt-[14px]">
//         <div className="flex flex-row items-center gap-[32px]">
//           <h1 className="text-[22px] text-[#212121]">
//             {" "}
//             Province Effective Prices
//           </h1>
//         </div>
//         <div className="flex flex-row items-center gap-[24px] flex-shrink-0">
//           <div>
//             <button
//               onClick={openUploadModal}
//               className="bg-blue-500 text-white px-4 py-2 rounded"
//             >
//               Upload Pricing File
//             </button>

//             <UploadPricingFileModal
//               isOpen={isUploadModalOpen}
//               onClose={closeUploadModal}
//               onFileUpload={handleFileUpload}
//             />
//           </div>

//           <div
//             onClick={() => setIsModalVisible(true)}
//             className="cursor-pointer text-white flex flex-row gap-[11px] py-[7px] pl-[12px] pr-[16px] bg-[#007BFF] rounded-[4px]"
//           >
//             <h2 className="text-[15px] text-white">Register New Price</h2>
//           </div>
//         </div>
//         <RegisterPriceModal
//           isVisible={isModalVisible}
//           isEditMode={isEditMode}
//           data={selectedRowData || null} // null data for register, filled data for edit
//           onClose={() => {
//             setIsModalVisible(false);
//             setIsEditMode(false);
//             setSelectedRowData(null); // Clear selected row
//           }}
//           onSubmit={(data) => {
//             console.log("Form submitted:", data);
//             setIsModalVisible(false);
//           }}
//         />
//       </div>

//       {loading ? (
//         <LoadingProgress />
//       ) : (
//         <div className="flex flex-col">
//           <div
//             ref={tableRef}
//             className="table-scroll-container ml-[20px] w-[calc(90vw)] overflow-x-scroll"
//           >
//             <div
//               className="flex flex-row items-center justify-between
//                     border-[1px] border-[#E0E0E0] py-[20px] px-[23px]"
//             >
//               <div className="flex gap-[24px]  px-[23px]">
//                 <select
//                   value={selectedYear}
//                   onChange={(e) => setSelectedYear(e.target.value)}
//                   className="w-[150px] border-[1px] border-[#E0E0E0] py-[11px] px-[12px] rounded-[4px]"
//                 >
//                   <option value="">Select Year</option>
//                   {yearOptions.map((year) => (
//                     <option key={year} value={year}>
//                       {year}
//                     </option>
//                   ))}
//                 </select>
//                 <select
//                   value={selectedProvince}
//                   onChange={(e) => setSelectedProvince(e.target.value)}
//                   className="w-[150px] border-[1px] border-[#E0E0E0] py-[11px] px-[12px] rounded-[4px]"
//                 >
//                   <option value="">Select Province</option>
//                   {provinceOptions.map((province) => (
//                     <option key={province} value={province}>
//                       {province}
//                     </option>
//                   ))}
//                 </select>

//                 <div className="flex gap-4">
//                   {showEditButton && (
//                     <button
//                       onClick={handleEditClick} // Trigger modal opening for edit
//                       className="border-2 border-[#007BFF] text-[#007BFF] px-4 py-2 rounded"
//                     >
//                       Edit
//                     </button>
//                   )}
//                   {showDeleteButton && (
//                     <button className="border-2 border-[#FF4D4D] text-[#FF4D4D] px-4 py-2 rounded">
//                       Delete
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="cursor-pointer bg-[#E5F2FF] w-full flex flex-row items-center">
//               {columns.map(
//                 (item, index) =>
//                   !selectedHeaders.has(item) && (
//                     <div
//                       key={index}
//                       className={`min-w-[220px] text-left py-[14px] pl-[12px] pr-[20px] whitespace-nowrap ${
//                         index === 0
//                           ? `sticky  left-0 z-10 bg-[#E5F2FF] ${
//                               isScrolled ? "border-r-2 border-[#e0e0e0]" : ""
//                             }`
//                           : "border-[1px] border-[#e0e0e0]"
//                       }`}
//                       style={{
//                         maxWidth: "250px",
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                         whiteSpace: "nowrap",
//                       }}
//                     >
//                       {index === 0 && (
//                         <input
//                           type="checkbox"
//                           className="w-[18px] h-[18px] mr-[36px]  bg-transparent border-none outline-none"
//                         />
//                       )}
//                       {item.title}
//                     </div>
//                   )
//               )}
//             </div>

//             {filterType === 2 && (
//               <div className="bg-[#E5F2FF] w-full flex flex-row items-center">
//                 {columns.map((item, index) => (
//                   <div
//                     key={index}
//                     onClick={() => handleHeaderClick(item)}
//                     className={`max-w-fit  h-[40px] p-[10px] flex flex-row rounded-[4px] m-[10px] cursor-pointer
//                                          gap-[16px] items-center justify-between text-white bg-[#313138] ${selectedHeaders.has(item) ? "bg-[#313138] bg-opacity-50" : "bg-[#313138]"}`}
//                   >
//                     {item.title}
//                     <img src="/images/Asset/headerEam.svg" alt="" />
//                   </div>
//                 ))}
//               </div>
//             )}

//             {filterType === 1 && (
//               <div>
//                 <div className="fixed top-0 left-0 w-full h-full bg-[#00000014] z-40"></div>
//                 <div
//                   className="fixed left-[30%] top-[15%] bg-white border-[1px]
//                                 border-[#D9D9D9] w-[460px]  p-[20px] z-50 rounded-[4px]"
//                 >
//                   <div className="flex flex-row items-center justify-between">
//                     <h2>Filter</h2>
//                     <img
//                       className="cursor-pointer"
//                       src="/images/Asset/filter/close.svg"
//                       alt=""
//                       onClick={() => setFilterType(-1)}
//                     />
//                   </div>
//                   <p className="text-[16px] text-[#616161] mt-[26px]">
//                     You can choose a query or filter some attributes of table
//                   </p>
//                   <h3 className="mt-[20px] text-[14px] text-[#757575] text-opacity-90">
//                     Query
//                   </h3>
//                   <select className="mt-[8px] w-full border-[1px] border-[#D9D9D9] py-[8px] outline-none rounded-[4px]">
//                     <option value="">select...</option>
//                   </select>
//                   <div className="border-[1px] w-full border-[#EEEEEE] mt-[20px]"></div>
//                   <div className="flex flex-row items-center justify-between mt-[20px]">
//                     <h2 className="text-[16px] text-[#212121]">Attributes</h2>
//                     <h4 className="text-[#007Bff] text-[14px]">Clear</h4>
//                   </div>

//                   <h3 className="mt-[20px] text-[14px] opacity-90 text-[#757575]">
//                     Asset
//                   </h3>
//                   <select className="mt-[8px] w-full border-[1px] border-[#D9D9D9] py-[8px] outline-none rounded-[4px]">
//                     <option value="">select...</option>
//                   </select>

//                   <h3 className="mt-[20px] text-[14px] opacity-90 text-[#757575]">
//                     Type
//                   </h3>
//                   <select className="mt-[8px] w-full border-[1px] border-[#D9D9D9] py-[8px] outline-none rounded-[4px]">
//                     <option value="">select...</option>
//                   </select>

//                   <div className="flex flex-row justify-end items-center gap-[16px] mt-[32px]">
//                     <button
//                       className="border-[1px] rounded-[4px] border-[#e0e0e0]
//                                          text-[#212121] py-[7px] px-[23px]"
//                     >
//                       cancel
//                     </button>

//                     <button
//                       className="bg-[#007BFF] text-white border-[1px] rounded-[4px] border-[#e0e0e0]
//                                          py-[7px] px-[23px]"
//                     >
//                       save
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <table className="border-[1px] border-[#e0e0e0] w-full">
//               <thead className="bg-[#E5F2FF]"></thead>

//               <tbody>
//                 {dataAdmin.map((row, rowIndex) => (
//                   <tr key={rowIndex} className="border-t">
//                     <td className="px-4 py-2">
//                       <input
//                         type="checkbox"
//                         checked={selectedRows.includes(rowIndex)}
//                         onChange={() => handleRowSelection(rowIndex)}
//                       />
//                     </td>
//                     {columns.map((col, colIndex) => (
//                       <td key={colIndex} className="px-4 py-2 border">
//                         {row[col.title] || ""}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div>
//             <Pagination
//               data={data}
//               currentPage={currentPage}
//               totalPages={totalPages}
//               setItemsPerPage={setItemsPerPage}
//               itemsPerPage={itemsPerPage}
//               onPageChange={handlePageChange}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProvinceEp;

import React, { useState } from "react";
import Dropdown from "./DropDown";
import UploadPricingFileModal from "./upload";
import Table from "./Table";
import RegisterPriceModal from "./PriceModal";
import calenderIcon from "../../images/AdminPanel/calenderIcon.svg";
import cityIcon from "../../images/AdminPanel/cityIcon.svg";
import plusIcon from "../../images/AdminPanel/plusIcon.svg";

const ProvinceEp = () => {
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="flex flex-row justify-between">
        <h1 className="text-xl font-bold mb-4">Effective Province Pricing</h1>

        {/* Buttons */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setRegisterModalOpen(true)}
            className="bg-[#007BFF] text-white py-2 px-4 rounded flex items-center gap-2"
          >
            <img src={plusIcon} alt="Plus Icon" className="h-5 w-5" />
            Register New Price
          </button>

          <button
            onClick={() => setUploadModalOpen(true)}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded"
          >
            Upload Pricing File
          </button>
        </div>
      </div>
      <div className="border-2 p-4">
        {/* Dropdowns */}
        <div className="flex gap-4 mb-4 border-b-2 pb-4">
          <Dropdown
            label="Year"
            options={["1403", "1402", "1401"]}
            icon={calenderIcon}
          />
          <Dropdown
            label="Province"
            options={["Tehran", "Gorgan", "Isfahan"]}
            icon={cityIcon}
          />
        </div>

        {/* Table */}
        <Table />
      </div>

      {/* Modals */}
      {isUploadModalOpen && (
        <UploadPricingFileModal onClose={() => setUploadModalOpen(false)} />
      )}
      {isRegisterModalOpen && (
        <RegisterPriceModal onClose={() => setRegisterModalOpen(false)} />
      )}
    </div>
  );
};

export default ProvinceEp;
