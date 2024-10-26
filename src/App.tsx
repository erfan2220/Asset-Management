import React, {lazy, Suspense} from "react";
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from "./Components/Navbar/Navbar";
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';



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

function App() {
    return (
        <QueryClientProvider client={queryClient}>
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
                            <Route path="/AssetView2" element={<AssetView2 />} />
                            <Route path="/AssetView3" element={<AssetView3 />} />
                            <Route path="/DynamicTable" element={<DynamicTable />} />
                        </Route>
                        <Route path="/AdminPanel" element={<AdminPanel />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </Provider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );

}

export default App;