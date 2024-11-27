// import React from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import leftSvg from "../../images/LandingPage/LefBg.svg";
// import rightSvg from "../../images/LandingPage/RighBg.svg";
// import coreIcon from "../../images/LandingPage/core.svg";
// import ranIcon from "../../images/LandingPage/Ran.svg";
// import dataCenterIcon from "../../images/LandingPage/DataCenter.svg";
// import transmissionIcon from "../../images/LandingPage/transmission.svg";
// import itIcon from "../../images/LandingPage/ITicon.svg";
// import reportIcon from "../../images/LandingPage/reportIcon.svg";

// function LandingPage() {
//   const navigate = useNavigate();

//   const handleRANClick = () => {
//     navigate("/layout");
//   };

//   return (
//     <div className="w-full bg-gray-50 min-h-screen flex flex-col items-center">
//       {/* Top Section */}
//       <div className="relative w-full bg-white py-8">
//         <div className="flex justify-between items-center w-12/12 mx-auto">
//           <img src={leftSvg} alt="Left Design" className="h-[200px]" />
//           <div className="text-center">
//             <h1 className="text-2xl font-semibold text-gray-800">
//               Assets of MCI
//             </h1>
//             <p className="text-gray-600 mt-2">
//               Click on any item to view its related data.
//             </p>
//           </div>
//           <img src={rightSvg} alt="Right Design" className="h-[200px]" />
//         </div>
//       </div>

//       {/* Card Section */}
//       <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
//         {/* Radio Access Network (RAN) */}
//         <div
//           className="group bg-white shadow-sm rounded-lg p-6 flex items-center hover:shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-100 cursor-pointer"
//           onClick={handleRANClick}
//         >
//           <img
//             src={ranIcon}
//             alt="Radio Access Network"
//             className="h-24 w-24 mr-4 bg-[#F9F9F9] p-4 rounded-full group-hover:text-blue-500"
//           />
//           <div>
//             <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-500">
//               Radio Access Network (RAN)
//             </h2>
//             <p className="text-sm text-gray-600">Radio Access Network (RAN)</p>
//           </div>
//         </div>

//      {/* Transmission */}
//      <div className="group bg-white shadow-sm rounded-lg p-6 flex items-center hover:shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-100">
//           <img
//             src={transmissionIcon}
//             alt="Transmission"
//             className="h-24 w-24 mr-4  p-4 bg-[#F9F9F9] rounded-full group-hover:text-blue-500"
//           />
//           <div>
//             <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-500">
//               Transmission
//             </h2>
//             <p className="text-sm text-gray-600">Transmission</p>
//           </div>
//         </div>

//         {/* Core Network */}
//         <div className="group bg-white shadow-sm rounded-lg p-6 flex items-center hover:shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-100">
//           <img
//             src={coreIcon}
//             alt="Core Network"
//             className="h-24 w-24 mr-4  p-4 bg-[#F9F9F9] rounded-full group-hover:text-blue-500"
//           />
//           <div>
//             <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-500">
//               Core Network
//             </h2>
//             <p className="text-sm text-gray-600">Mobile "Core" Network</p>
//           </div>
//         </div>

//         {/* Data Center */}
//         <div className="group bg-white shadow-sm rounded-lg p-6 flex items-center hover:shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-100">
//           <img
//             src={dataCenterIcon}
//             alt="Data Center"
//             className="h-24 w-24 mr-4  p-4 bg-[#F9F9F9] rounded-full group-hover:text-blue-500"
//           />
//           <div>
//             <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-500">
//               Data Center
//             </h2>
//             <p className="text-sm text-gray-600">Data Center</p>
//           </div>
//         </div>
//          {/*IT */}
//          <div className="group bg-white shadow-sm rounded-lg p-6 flex items-center hover:shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-100">
//           <img
//             src={itIcon}
//             alt="Data Center"
//             className="h-24 w-24 mr-4  p-4 bg-[#F9F9F9] rounded-full group-hover:text-blue-500"
//           />
//           <div>
//             <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-500">
//               IT Network
//             </h2>
//             <p className="text-sm text-gray-600"> IT Network</p>
//           </div>
//         </div>
//            {/*Reports */}
//            <div className="group bg-white shadow-sm rounded-lg p-6 flex items-center hover:shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-100">
//           <img
//             src={reportIcon}
//             alt="Data Center"
//             className="h-24 w-24 mr-4  p-4 bg-[#F9F9F9] rounded-full group-hover:text-blue-500"
//           />
//           <div>
//             <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-500">
//               Reports
//             </h2>
//             <p className="text-sm text-gray-600"> Reports</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LandingPage;

//@ts-nocheck
import React from "react";
import { useNavigate } from "react-router-dom";
import leftSvg from "../../images/LandingPage/LefBg.svg";
import rightSvg from "../../images/LandingPage/RighBg.svg";
import coreIcon from "../../images/LandingPage/core.svg";
import ranIcon from "../../images/LandingPage/Ran.svg";
import dataCenterIcon from "../../images/LandingPage/DataCenter.svg";
import transmissionIcon from "../../images/LandingPage/transmission.svg";
import itIcon from "../../images/LandingPage/ITicon.svg";
import reportIcon from "../../images/LandingPage/reportIcon.svg";

function LandingPage() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const cards = [
    {
      icon: ranIcon,
      label: "Radio Access Network (RAN)",
      path: "/layout",
      iconSize: "h-16 w-16",
    },
    {
      icon: transmissionIcon,
      label: "Transmission",
      path: "/layout",
      iconSize: "h-16 w-16",
    },
    {
      icon: coreIcon,
      label: "Core Network",
      path: "/layout",
      iconSize: "h-16 w-16",
    },
    {
      icon: dataCenterIcon,
      label: "Data Center",
      path: "/layout",
      iconSize: "h-16 w-16",
    },
    {
      icon: itIcon,
      label: "IT Assets",
      path: "/layout",
      iconSize: "h-16 w-16",
    },
    {
      icon: reportIcon,
      label: "Reports",
      path: "/layout",
      iconSize: "h-16 w-16",
    },
  ];

  return (
      <div className="w-full bg-gray-50 min-h-screen flex flex-col items-center">
        {/* Top Section */}
        <div className="relative w-full bg-white ">
          <div className="flex justify-between items-center w-12/12 mx-auto">
            <img src={leftSvg} alt="Left Design" className="h-[200px]" />
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-gray-800">
                Assets of MCI
              </h1>
              <p className="text-gray-600 mt-2">
                Click on any item to view its related data.
              </p>
            </div>
            <img src={rightSvg} alt="Right Design" className="h-[200px]" />
          </div>
        </div>

        {/* Card Section */}
        <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {cards.map((card, index) => (
              <div
                  key={index}
                  className="group bg-white shadow-md rounded-md overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
                  onClick={() => handleNavigation(card.path)}
              >
                {/* Icon Section */}
                <div className="bg-[#FAFAFA] p-6 flex justify-center items-center group-hover:bg-[#E5F2FF] transition-colors">
                  <div className="flex flex-col items-center">
                    <img src={card.icon} alt={card.label}  />
                  </div>
                </div>

                {/* Text Section */}
                <div className="bg-white p-4 text-center">
                  <h2 className="text-lg font-semibold text-gray-800 group-hover:text-[#007BFF]">
                    {card.label}
                  </h2>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
}

export default LandingPage;
