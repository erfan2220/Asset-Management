// //@ts-nocheck
// import React, { lazy, Suspense, useEffect } from "react";
// import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
// import Navbar from "./Components/Navbar/Navbar";
// import { Provider } from "react-redux";
// import { store } from "./Redux/store";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import Cookies from "js-cookie";
// import Login from "./Pages/Login";
//
// const queryClient = new QueryClient();
//
// const Asset = lazy(() => import("./Pages/AssetPage"));
// const AssetMap = lazy(() => import("./Pages/assetMap/Asset"));
// const Menu = lazy(() => import("./Pages/Menu/Menu"));
// const Network = lazy(() => import("./Components/AssetPage/network/Network"));
// const FilterByCategory = lazy(
//   () => import("./Components/AssetPage/filterByCategory/filterByCategory")
// );
// const AssetsDatails = lazy(
//   () => import("./Components/AssetPage/AssetDetails/Assetdetails")
// );
// const AssetCategories = lazy(
//   () => import("./Components/AssetCategory/Table/AssetsTable")
// );
// const AssetView1 = lazy(
//   () => import("./Components/AssetPage/AssetView1/AssetView1")
// );
// const AssetView2 = lazy(
//   () => import("./Components/AssetPage/AssetView2/AssetView2")
// );
// const AssetView3 = lazy(
//   () => import("./Components/AssetPage/AssetView3/AssetView3")
// );
// const DynamicTable = lazy(
//   () => import("./Components/DynamicTable/DynamicTable")
// );
// const AdminPanel = lazy(() => import("./Pages/AdminPanel/AdminPanel"));
//
//
// const Layout = () => (
//   <>
//     <Navbar />
//     <div className="flex bg-[#fafafa]">
//       <Menu />
//       <div className="flex flex-row w-full">
//         <Outlet />
//       </div>
//     </div>
//   </>
// );
//
// const PrivateRoute = ({ children }: { children: JSX.Element }) => {
//   const authToken = Cookies.get("authToken");
//   return authToken ? children : <Navigate to="/login" />;
// };
//
// function App() {
//   useEffect(() => {
//     const language = Cookies.get("language") || "en";
//
//     if (language === "fa") {
//       document.documentElement.setAttribute("dir", "rtl");
//       document.documentElement.lang = "fa";
//     } else {
//       document.documentElement.setAttribute("dir", "ltr");
//       document.documentElement.lang = "en";
//     }
//   }, []);
//
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Provider store={store}>
//         <BrowserRouter>
//           <Suspense fallback={<div>Loading...</div>}>
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route
//                 path="/"
//                 element={
//                   <PrivateRoute>
//                     <Layout />
//                   </PrivateRoute>
//                 }
//               >
//                 <Route index element={<AssetMap />} />
//                 <Route path="/asset" element={<Asset />} />
//
//                 <Route path="/network" element={<Network />} />
//                 <Route
//                     path="/asset-categories"
//                     element={<AssetCategories />}
//                   />
//                    <Route
//                     path="/FilterBycategory"
//                     element={<FilterByCategory />}
//                   />
//                    <Route path="/AssetDetails" element={<AssetsDatails />} />
//                    <Route path="/AssetView1" element={<AssetView1 />} />
//                    {/* <Route
//                     path="/AssetView2"
//                     element={
//                       <AssetView2
//                         provinceName={provinceName}
//                         cityName={cityName}
//                         mapIranData={mapIranData}
//                         selectProvinceHandler={selectProvinceHandler}
//                         selectedProvince={selectedProvince}
//                         mapProvincesData={mapProvincesData}
//                         selectProvinceHandler2={selectProvinceHandler2}
//                         setCityName={setCityName}
//                       />
//                     }
//                   /> */}
//         <Route path="/AssetView3" element={<AssetView3 />} />
//         <Route path="/DynamicTable" element={<DynamicTable />} />
//
//               </Route>
//               <Route path="/AdminPanel" element={<AdminPanel />} />
//
//             </Routes>
//           </Suspense>
//         </BrowserRouter>
//       </Provider>
//       <ReactQueryDevtools initialIsOpen={false} />
//     </QueryClientProvider>
//   );
// }
//
// export default App;


//@ts-nocheck
import React, {lazy, Suspense, useState,useEffect} from "react";
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from "./Components/Navbar/Navbar";
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { mapData as initialMapData, mapDataIran as initialMapDataIran } from "./database/IranMapWrapperData/mapData.ts";
import { SharedProvider } from './Components/AssetPage/filterMap/SharedSiteType/SharedSiteType';
import Cookies from "js-cookie";


const queryClient = new QueryClient();

const Asset= lazy(()=>import("./Pages/AssetPage"))
const AssetMap= lazy(()=>import("./Pages/assetMap/Asset"))
const Menu = lazy(() => import("./Pages/Menu/Menu"));
const Network = lazy(() => import("./Components/AssetPage/network/Network"));
const FilterByCategory = lazy(() => import("./Components/AssetPage/filterByCategory/filterByCategory"));
const AssetsDatails = lazy(() => import("./Components/AssetPage/AssetDetails/Assetdetails"));
const AssetCategories = lazy(() => import("./Components/AssetCategory/Table/AssetsTable"));
const AssetView1 = lazy(() => import("./Components/AssetPage/AssetView1/AssetView1"));
const AssetView2 = lazy(() => import("./Components/AssetPage/AssetView2/AssetView2"));
const AssetView3 = lazy(() => import("./Components/AssetPage/AssetView3/AssetView3"));
const DynamicTable = lazy(() => import("./Components/DynamicTable/DynamicTable"));
const AdminPanel = lazy(() => import("./Pages/AdminPanel/AdminPanel"));



const Layout = () => (
    <>
        <Navbar />
        <div className="flex bg-[#fafafa]">
            <Menu />
            <div className="flex flex-row w-full">
                <Outlet />
            </div>
        </div>
    </>
);

function App()
{

    useEffect(() => {
        const language = Cookies.get('language') || 'en';

        if (language === 'fa') {
            document.documentElement.setAttribute('dir', 'rtl');
            document.documentElement.lang = 'fa';
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
            document.documentElement.lang = 'en';
        }
    }, []);


    const [provinceName, setProvinceName] = useState("");
    const [cityName,setCityName]=useState("")
    const [mapIranData, setMapIranData] = useState(initialMapDataIran);
    const [mapProvincesData, setMapProvincesData] = useState(initialMapData);
    const [pupop,setPupop]=useState(false)
    const [selectedProvince,setSelectedProvince] = useState("")


    const selectProvinceHandler = (province:any) =>
    {
        setProvinceName(province.name)
        setSelectedProvince(province.name);
        setPupop(true)
    }

    const selectProvinceHandler2 = (province:any) =>
    {
        setPupop(true)
    }

    return (
        <QueryClientProvider client={queryClient}>
            <SharedProvider>
                    <Provider store={store}>
                        <BrowserRouter>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Routes>
                                    <Route path="/" element={<Layout />}>

                                        <Route index element={<AssetMap />}/>
                                        <Route path="/asset" element={<Asset />} />
                                        <Route path="/map" element={<AssetMap />} />
                                        <Route path="/network" element={<Network />} />
                                        <Route path="/asset-categories" element={<AssetCategories />} />
                                        <Route path="/FilterBycategory" element={<FilterByCategory />} />
                                        <Route path="/AssetDetails" element={<AssetsDatails />} />
                                        <Route path="/AssetView1" element={<AssetView1 />} />
                                        <Route path="/AssetView2" element={<AssetView2
                                            provinceName={provinceName}
                                            cityName={cityName}
                                            mapIranData={mapIranData}
                                            selectProvinceHandler={selectProvinceHandler}
                                            selectedProvince={selectedProvince}
                                            mapProvincesData={mapProvincesData}
                                            selectProvinceHandler2={selectProvinceHandler2}
                                            setCityName={setCityName}
                                        />} />
                                        <Route path="/AssetView3" element={<AssetView3 />} />
                                        <Route path="/DynamicTable" element={<DynamicTable />} />
                                    </Route>
                                    <Route path="/AdminPanel" element={<AdminPanel />} />
                                </Routes>
                            </Suspense>
                        </BrowserRouter>
                  </Provider>
               </SharedProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );

}

export default App;