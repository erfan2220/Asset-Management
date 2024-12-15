
//@ts-nocheck
import React, { useState } from "react";
import Dropdown from "./DropDown";
import UploadPricingFileModal from "./upload";
import Table from "./Table";
import RegisterPriceModal from "./PriceModal";
import calenderIcon from "../../images/AdminPanel/calenderIcon.svg";
import cityIcon from "../../images/AdminPanel/cityIcon.svg";
import plusIcon from "../../images/AdminPanel/plusIcon.svg";

const Lpsm = () => {
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="flex flex-row justify-between">
        <h1 className="text-xl font-bold mb-4">LPSM</h1>

        {/* Buttons */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setRegisterModalOpen(true)}
            className="bg-[#007BFF] text-white py-2 px-4 rounded flex items-center gap-2"
          >
            <img src={plusIcon} alt="Plus Icon" className="h-5 w-5" />
            Register New LPSM
          </button>

          <button
            onClick={() => setUploadModalOpen(true)}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded"
          >
            Upload LPSM File
          </button>
        </div>
      </div>
      <div className="border-2 p-4">
     

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

export default Lpsm;
