// import React from 'react';
// import Table from "../../Components/AssetTable/Table";

// const Asset = () => {
//     return (
//         <div>
//             <h1>Asset Page</h1>
//             <div className="mt-[24px]">
//                 <Table/>
//             </div>
//         </div>
//     );
// };

// export default Asset;

import React from "react";
import Button from "../../Components/SimpleButton";
import Table from "../../Components/AssetTable/Table";
import CustomSelectDropdown from "../../Components/DropDown.tsx";

const Asset = () => {
  const options = [
    { value: "Save as new view", label: "Save as new view" },
    { value: "Default view", label: "Default view" },
    { value: "Default view", label: "Default view" },
  ];

  const handleSelect = (option: any) => {
    console.log("Selected option:", option);
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-[#212121] text-[22px]">Asset </h1>
        </div>
        <div className="flex justify-around border-2 w-[160px] p-2 rounded-md">
          <div className="relative">
            <img
              src="/images/Asset/ListDashes.svg"
              alt=""
              className="bg-blue-500"
            />
            <div className="absolute right-0 top-0 h-full border-r border-gray-300"></div>
          </div>
          <div className="relative">
            <img src="/images/Asset/map.svg" alt="" className="bg-blue-500" />
            <div className="absolute right-0 top-0 h-full border-r border-gray-300"></div>
          </div>
          <div className="relative">
            <img
              src="/images/Asset/charts.svg"
              alt=""
              className="bg-blue-500"
            />
            <div className="absolute right-0 top-0 h-full border-r border-gray-300"></div>
          </div>
          <div>
            <img
              src="/images/Asset/matrix.svg"
              alt=""
              className="bg-blue-500"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="">
          <CustomSelectDropdown
            options={options}
            placeholder="View : Default view"
            onSelect={handleSelect}
          />
        </div>
        <div>
          <Button>Export</Button>
        </div>
      </div>

      <div className="mt-[24px]">
        <Table />
      </div>
    </div>
  );
};

export default Asset;
