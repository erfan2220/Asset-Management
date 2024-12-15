//@ts-nocheck
import React, { useState } from "react";
import axios from "axios";
import upload from "../../images/AdminPanel/upload.svg";
import apiClient from "../../ApiClient";

const UploadPricingFileModal = ({ onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await apiClient.post(
        "http://10.15.90.72:9098/api/lpsm/upload-ep/1403",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("File uploaded successfully");
      onClose();
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-center">
          Upload LPSM File
        </h2>

        <div
          className="border-2 border-dashed border-blue-500 p-6 rounded flex flex-col items-center text-center mb-4"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <img src={upload} alt="upload" className="h-[64px] w-[64px]" />
          <p className="text-gray-600 mb-1">
            Drag & drop or{" "}
            <span className="text-blue-500 cursor-pointer">browse</span> to
            upload
          </p>
          <p className="text-sm text-gray-500">Accepted formats: XLS, XLSX</p>
          <input
            id="fileInput"
            type="file"
            onChange={handleFileChange}
            accept=".xls, .xlsx"
            style={{ display: "none" }}
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-white text-[#616161] border-2 border-[#D1D3D7] py-2 px-4 rounded mr-2 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPricingFileModal;
