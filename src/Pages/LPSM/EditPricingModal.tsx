//@ts-nocheck
import React, { useState, useEffect } from 'react';
import axios from "axios";

const EditPriceModal = ({ rowData, onClose }) => {
  const [formData, setFormData] = useState(rowData);
 // Fetch data for the specific ID when the component mounts
 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://10.15.90.72:9098/api/lpsm/${rowData.id}`);
        setFormData(response.data); // Assuming response data matches formData structure
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [rowData.id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://10.15.90.72:9098/api/provinceEP/${rowData.id}`,
        formData
      );
      console.log("Updated data:", response.data);
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-left">Edit Price</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          {/* Dropdowns for Year and Province */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-1">Year</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              >
                <option>Select Year</option>
                {/* Add more years as needed */}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Province</label>
              <select
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              >
                <option>Select Province</option>
                {/* Add more provinces as needed */}
              </select>
            </div>
          </div>
          <hr className="border-gray-300 my-4" />


          {/* Input fields for Voice */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Voice (Toman)</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="voice2GEP"
                placeholder="2G"
                value={formData.voice2GEP}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                name="voice3GEP"
                placeholder="3G"
                value={formData.voice3GEP}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
          <hr className="border-gray-300 my-4" />

          {/* Input fields for SMS */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">SMS (Toman)</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="sms2GEP"
                placeholder="2G"
                value={formData.sms2GEP}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                name="sms3GEP"
                placeholder="3G"
                value={formData.sms3GEP}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
          <hr className="border-gray-300 my-4" />

          {/* Input fields for Data */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Data (Toman)</label>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <input
                type="text"
                name="data2GEP"
                placeholder="2G"
                value={formData.data2GEP}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                name="data3GEP"
                placeholder="3G"
                value={formData.data3GEP}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <input
                type="text"
                name="data4GEP"
                placeholder="4G"
                value={formData.data4GEP}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
          </div>
          <hr className="border-gray-300 my-4" />

          {/* Action buttons */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded mr-2 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPriceModal;
