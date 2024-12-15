import React, { useState } from "react";

const RegisterPriceModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    year: "",
    province: "",
    voice2G: "",
    voice3G: "",
    sms2G: "",
    sms3G: "",
    data2G: "",
    data3G: "",
    data4G: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://10.15.90.72:9098/api/lpsm/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Data registered successfully");
        setFormData({
          year: "",
          province: "",
          voice2G: "",
          voice3G: "",
          sms2G: "",
          sms3G: "",
          data2G: "",
          data3G: "",
          data4G: "",
        });
        onClose();
      } else {
        console.error("Failed to register data");
      }
    } catch (error) {
      console.error("Error registering data:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-lg">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-xl font-bold mb-4"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Register New LPSM</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700">Province</label>
            <select
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Province</option>
              {/* Add province options here */}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Year</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Year</option>
              {/* Add year options here */}
            </select>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-gray-700 font-bold mb-2">(Currency) Voice</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="voice2G"
              placeholder="2G"
              value={formData.voice2G}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              name="voice3G"
              placeholder="3G"
              value={formData.voice3G}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-gray-700 font-bold mb-2">(Currency) SMS</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="sms2G"
              placeholder="2G"
              value={formData.sms2G}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              name="sms3G"
              placeholder="3G"
              value={formData.sms3G}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-gray-700 font-bold mb-2">(Currency) Data</h3>
          <div className="grid grid-cols-3 gap-4">
            <input
              name="data2G"
              placeholder="2G"
              value={formData.data2G}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              name="data3G"
              placeholder="3G"
              value={formData.data3G}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              name="data4G"
              placeholder="4G"
              value={formData.data4G}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleRegister}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPriceModal;
