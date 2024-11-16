//@ts-nocheck
import React, { useState } from 'react';
import axios from 'axios';

const RegisterPriceModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    year: '',
    province: '',
    voice2G: '',
    voice3G: '',
    sms2G: '',
    sms3G: '',
    data2G: '',
    data3G: '',
    data4G: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://10.15.90.72:9098/api/provinceEP", formData);
      alert('Price registered successfully');
      onClose();
    } catch (error) {
      console.error("Error registering price:", error);
      alert('Failed to register price');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-left">Register New Price</h2>
        <hr className="border-gray-300 my-4" />


        <form onSubmit={handleSubmit}>
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
                <option value="">Select Year</option>
                {/* Replace with actual years */}
                <option value="1403">1403</option>
                <option value="1402">1402</option>
                <option value="1400">1400</option>


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
                <option value="">Select Province</option>
                {/* Replace with actual provinces */}
                <option value="Province1">Tehran</option>
                <option value="Province2">Esfahan</option>
                <option value="Province3">Ardebil</option>

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
                name="voice2G"
                placeholder="2G"
                value={formData.voice2G}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                name="voice3G"
                placeholder="3G"
                value={formData.voice3G}
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
                name="sms2G"
                placeholder="2G"
                value={formData.sms2G}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                name="sms3G"
                placeholder="3G"
                value={formData.sms3G}
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
                name="data2G"
                placeholder="2G"
                value={formData.data2G}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                name="data3G"
                placeholder="3G"
                value={formData.data3G}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <input
                type="text"
                name="data4G"
                placeholder="4G"
                value={formData.data4G}
                onChange={handleChange}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
          </div>
          <hr className="border-gray-300 my-4" />

          {/* Action buttons */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-white text-[#616161] border-2 border-[#D1D3D7] py-2 px-4 rounded mr-2 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#007BFF] text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPriceModal;
