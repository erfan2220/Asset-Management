//@ts-nocheck
import React, { useState, useEffect } from "react";
import axios from "axios";
import EditModal from "./EditPricingModal";
import deleteIcon from "../../images/AdminPanel/deleteIcon.svg"
import editIcon from "../../images/AdminPanel/editIcon.svg"
import apiClient from "../../ApiClient";
import Dropdown from "./DropDown";
import calenderIcon from "../../images/AdminPanel/calenderIcon.svg";
import cityIcon from "../../images/AdminPanel/cityIcon.svg";


const Table = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  // const data = [
  //   {
  //     id: 1,
  //     year: "1403",
  //     province: "Tehran",
  //     smsEp: "3,825,000",
  //     totalVoiceEp: "3,825,000",
  //   },
  //   {
  //     id: 2,
  //     year: "1402",
  //     province: "Gorgan",
  //     smsEp: "4,344,000",
  //     totalVoiceEp: "4,344,000",
  //   },
  //   {
  //     id: 3,
  //     year: "1402",
  //     province: "Gorgan",
  //     smsEp: "4,344,000",
  //     totalVoiceEp: "4,344,000",
  //   },
  //   {
  //     id: 4,
  //     year: "1402",
  //     province: "Gorgan",
  //     smsEp: "4,344,000",
  //     totalVoiceEp: "4,344,000",
  //   },
  //   {
  //     id: 5,
  //     year: "1402",
  //     province: "Gorgan",
  //     smsEp: "4,344,000",
  //     totalVoiceEp: "4,344,000",
  //   },
  // ];

  useEffect(() => {
    // Fetch data from API
    apiClient
      .get("http://10.15.90.72:9098/api/lpsm")
      .then((response) => {
        setData(response.data.content);

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleEditClick = () => {
    if (selectedRows.length === 1) {
      setEditModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setSelectedRows([]);
  };

  const selectedData = data.find((row) => row.id === selectedRows[0]);

  // Get the data for the current page
  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div>

      {/* Dropdowns and Action Buttons */}
      <div className="flex justify-between items-center gap-4 mb-4 border-b-2 pb-4">
        {/* Left: Dropdowns */}
        <div className="flex gap-4">
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

        {/* Right: Action Buttons */}
        <div className="flex gap-4">
          {selectedRows.length === 1 && (
            <button
              onClick={handleEditClick}
              className="flex items-center border-2 text-[#007BFF] border-[#007BFF] py-2 px-4 rounded"
            >
              <img src={editIcon} alt="Edit Icon" className="w-5 h-5 mr-2" />
              Edit
            </button>
          )}
          {selectedRows.length > 0 && (
            <button className="flex items-center border-2 text-[#FF4D4D] border-[#FF4D4D] py-2 px-4 rounded">
              <img src={deleteIcon} alt="Delete Icon" className="w-5 h-5 mr-2" />
              Delete
            </button>
          )}
        </div>
      </div>



      {/* Table */}
      <div className="overflow-x-scroll">
      <table className="w-full border-collapse border border-gray-200 ">
        <thead className="bg-[#E5F2FF]">
          <tr>
            <th className="border border-gray-300 px-4 py-2"></th>
            <th className="border border-gray-300 px-8 py-2">provinceName</th>
            <th className="border border-gray-300 px-4 py-2">linkVoice2g</th>
            <th className="border border-gray-300 px-4 py-2">linkVoice3g</th>
            <th className="border border-gray-300 px-4 py-2">linkVoiceTotal</th>
            <th className="border border-gray-300 px-4 py-2">powerVoice2g</th>
            <th className="border border-gray-300 px-4 py-2">powerVoice3g</th>
            <th className="border border-gray-300 px-4 py-2">powerVoiceTotal</th>
            <th className="border border-gray-300 px-4 py-2">spaceVoice2g</th>
            <th className="border border-gray-300 px-4 py-2">spaceVoice3g</th>
            <th className="border border-gray-300 px-4 py-2">spaceVoiceTotal</th>
            <th className="border border-gray-300 px-4 py-2">maintenanceVoice2g</th>
            <th className="border border-gray-300 px-4 py-2">maintenanceVoice3g</th>
            <th className="border border-gray-300 px-4 py-2">maintenanceVoiceTotal</th>
            <th className="border border-gray-300 px-4 py-2">wageVoice2g</th>
            <th className="border border-gray-300 px-4 py-2">wageVoice3g</th>
            <th className="border border-gray-300 px-4 py-2">wageVoiceTotal</th>
            <th className="border border-gray-300 px-4 py-2">depreciationVoice2g</th>
            <th className="border border-gray-300 px-4 py-2">depreciationVoice3g</th>
            <th className="border border-gray-300 px-4 py-2">depreciationVoiceTotal</th>
            <th className="border border-gray-300 px-4 py-2">otherVoice2g</th>
            <th className="border border-gray-300 px-4 py-2">otherVoice3g</th>
            <th className="border border-gray-300 px-4 py-2">otherVoiceTotal</th>
            <th className="border border-gray-300 px-4 py-2">totalFixCostVoice2g</th>
            <th className="border border-gray-300 px-4 py-2">totalFixCostVoice3g</th>
            <th className="border border-gray-300 px-4 py-2">totalFixCostVoice</th>
            <th className="border border-gray-300 px-4 py-2">linkData2g</th>
            <th className="border border-gray-300 px-4 py-2">linkData3g</th>
            <th className="border border-gray-300 px-4 py-2">linkData4g</th>
            <th className="border border-gray-300 px-4 py-2">linkData5g</th>
            <th className="border border-gray-300 px-4 py-2">linkDataTotal</th>
            <th className="border border-gray-300 px-4 py-2">powerData2g</th>
            <th className="border border-gray-300 px-4 py-2">powerData3g</th>
            <th className="border border-gray-300 px-4 py-2">powerData4g</th>
            <th className="border border-gray-300 px-4 py-2">powerData5g</th>
            <th className="border border-gray-300 px-4 py-2">powerDataTotal</th>
            <th className="border border-gray-300 px-4 py-2">spaceData2g</th>
            <th className="border border-gray-300 px-4 py-2">spaceData3g</th>
            <th className="border border-gray-300 px-4 py-2">spaceData4g</th>
            <th className="border border-gray-300 px-4 py-2">spaceData5g</th>
            <th className="border border-gray-300 px-4 py-2">spaceDataTotal</th>
            <th className="border border-gray-300 px-4 py-2">maintenanceData2g</th>
            <th className="border border-gray-300 px-4 py-2">maintenanceData3g</th>
            <th className="border border-gray-300 px-4 py-2">maintenanceData4g</th>
            <th className="border border-gray-300 px-4 py-2">maintenanceData5g</th>
            <th className="border border-gray-300 px-4 py-2">maintenanceDataTotal</th>
            <th className="border border-gray-300 px-4 py-2">wageData2g</th>
            <th className="border border-gray-300 px-4 py-2">wageData3g</th>
            <th className="border border-gray-300 px-4 py-2">wageData4g</th>
            <th className="border border-gray-300 px-4 py-2">wageData5g</th>
            <th className="border border-gray-300 px-4 py-2">wageDataTotal</th>
            <th className="border border-gray-300 px-4 py-2">depreciationData2g</th>
            <th className="border border-gray-300 px-4 py-2">depreciationData3g</th>
            <th className="border border-gray-300 px-4 py-2">depreciationData4g</th>
            <th className="border border-gray-300 px-4 py-2">depreciationData5g</th>
            <th className="border border-gray-300 px-4 py-2">depreciationDataTotal</th>
            <th className="border border-gray-300 px-4 py-2">otherData2g</th>
            <th className="border border-gray-300 px-4 py-2">otherData3g</th>
            <th className="border border-gray-300 px-4 py-2">otherData4g</th>
            <th className="border border-gray-300 px-4 py-2">otherData5g</th>
            <th className="border border-gray-300 px-4 py-2">otherDataTotal</th>
            <th className="border border-gray-300 px-4 py-2">totalFixCostData2g</th>
            <th className="border border-gray-300 px-4 py-2">totalFixCostData3g</th>
            <th className="border border-gray-300 px-4 py-2">totalFixCostData4g</th>
            <th className="border border-gray-300 px-4 py-2">totalFixCostData5g</th>
            <th className="border border-gray-300 px-4 py-2">totalFixCostData</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr key={row.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 text-center">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => toggleRowSelection(row.id)}
                />
              </td>
              {/* <td className="border border-gray-300 px-4 py-2">{row.id}</td> */}
              {/* <td className="border border-gray-300 px-4 py-2">
                {row.province}
              </td> */}
              <td className="border border-gray-300 px-4 py-2 ">{row.provinceName}</td>
              <td className="border border-gray-300 px-4 py-2">{row.linkVoice2g}</td>
              <td className="border border-gray-300 px-4 py-2">
                {row.linkVoice3g}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.linkVoiceTotal}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.powerVoice2g}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.powerVoice3g}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.powerVoiceTotal}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.spaceVoice2g}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.spaceVoice3g}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.spaceVoiceTotal}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.maintenanceVoice2g}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.maintenanceVoice3g}
              </td>
              <td className="border border-gray-300 px-4 py-2">{row.maintenanceVoiceTotal}</td>
              <td className="border border-gray-300 px-4 py-2">{row.wageVoice2g}</td>
              <td className="border border-gray-300 px-4 py-2">
                {row.wageVoice3g}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.wageVoiceTotal}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.depreciationVoice2g}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.depreciationVoice3g}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.depreciationVoiceTotal}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.otherVoice2g}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.otherVoice3g}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.otherVoiceTotal}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.totalFixCostVoice2g}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.totalFixCostVoice3g}
              </td>

              <td className="border border-gray-300 px-4 py-2">
                {row.totalFixCostVoice}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.linkData2g}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.linkData3g}
              </td>
             
             <td className="border border-gray-300 px-4 py-2">
                {row.linkData4g}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.linkData5g}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.linkDataTotal}
              </td>
              <td className="border border-gray-300 px-4 py-2">{row.powerData2g}</td>
              <td className="border border-gray-300 px-4 py-2">{row.powerData3g}</td>
              <td className="border border-gray-300 px-4 py-2">
                {row.powerData4g}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.powerData5g}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.powerDataTotal}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.spaceData2g}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.spaceData3g}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.spaceData4g}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.spaceData5g}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.spaceDataTotal}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.maintenanceData2g}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.maintenanceData3g}
              </td>

              <td className="border border-gray-300 px-4 py-2">
                {row.maintenanceData4g}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.maintenanceData5g}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.maintenanceDataTotal}
              </td>

              <td className="border border-gray-300 px-4 py-2">
                {row.wageData2g}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.wageData3g}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.wageData4g}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.wageData5g}
              </td>
              <td className="border border-gray-300 px-4 py-2">{row.wageDataTotal}</td>
              <td className="border border-gray-300 px-4 py-2">{row.depreciationData2g}</td>
              <td className="border border-gray-300 px-4 py-2">
                {row.depreciationData3g}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.depreciationData4g}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.depreciationData5g}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.depreciationDataTotal}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.otherData2g}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.otherData3g}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.otherData4g}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.otherData5g}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.otherDataTotal}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.totalFixCostData2g}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.totalFixCostData3g}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.totalFixCostData4g}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.totalFixCostData5g}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.totalFixCostData}
              </td>



            </tr>
          ))}
        </tbody>
      </table>


</div>





      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded"
        >
          Next
        </button>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && selectedData && (
        <EditModal rowData={selectedData} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Table;
