//@ts-nocheck
import React, { useState, useEffect } from "react";
import axios from "axios";
import EditModal from "./EditPricingModal";
import deleteIcon from "../../images/AdminPanel/deleteIcon.svg"
import editIcon from "../../images/AdminPanel/editIcon.svg"
import apiClient from "../../ApiClient";


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
      .get("http://10.15.90.72:9098/api/provinceEP")
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
      {/* Action Buttons */}
      <div className="flex gap-4 mb-4 ">
        {selectedRows.length === 1 && (
          <button
            onClick={handleEditClick}
            className="flex items-center border-2 text-[#007BFF] border-[#007BFF] py-2 px-4 rounded"
          >
            <img src={editIcon} alt="Delete Icon" className="w-5 h-5 mr-2" />
            Edit
          </button>
        )}

        {selectedRows.length > 0 && (
          <button className="flex items-center  border-2 text-[#FF4D4D] border-[#FF4D4D] py-2 px-4 rounded">
            <img src={deleteIcon} alt="Delete Icon" className="w-5 h-5 mr-2" />


            Delete
          </button>
        )}
      </div>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-[#E5F2FF]">
          <tr>
            <th className="border border-gray-300 px-4 py-2"></th>
            <th className="border border-gray-300 px-4 py-2 ">provinceName</th>
            <th className="border border-gray-300 px-4 py-2">voice2GEP</th>
            <th className="border border-gray-300 px-4 py-2">voice3GEP</th>
            <th className="border border-gray-300 px-4 py-2">totalVoiceEp</th>
            <th className="border border-gray-300 px-4 py-2">sms2GEP</th>
            <th className="border border-gray-300 px-4 py-2">sms3GEP</th>
            <th className="border border-gray-300 px-4 py-2">totalSMSEp</th>
            <th className="border border-gray-300 px-4 py-2">data2GEP</th>
            <th className="border border-gray-300 px-4 py-2">data3GEP</th>
            <th className="border border-gray-300 px-4 py-2">data4GEP</th>
            <th className="border border-gray-300 px-4 py-2">totalDataEp</th>
            <th className="border border-gray-300 px-4 py-2">year</th>
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
              <td className="border border-gray-300 px-4 py-2">{row.provinceName}</td>
              <td className="border border-gray-300 px-4 py-2">{row.voice2GEP}</td>
              <td className="border border-gray-300 px-4 py-2">
                {row.voice3GEP}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.totalVoiceEp}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.sms2GEP}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.sms3GEP}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.totalSMSEp}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.data3GEP}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.data3GEP}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.data4GEP}
              </td><td className="border border-gray-300 px-4 py-2">
                {row.totalDataEp}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {row.year}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
