import React, {lazy, Suspense} from "react";
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from "./Components/Navbar/Navbar";
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LoadingPro from "./Components/Loading/Loading";
import AdminPanel from "./Pages/AdminPanel/AdminPanel";


const queryClient = new QueryClient();

const Asset= lazy(()=>import("./Pages/AssetPage"))
const AssetMap= lazy(()=>import("./Pages/assetMap/Asset"))
const Dashboard = lazy(() => import("./Pages/Dashboard/Dashboard"));
const Network = lazy(() => import("./Components/AssetPage/network/Network"));
const FilterByCategory = lazy(() => import("./Components/AssetPage/filterByCategory/filterByCategory"));
const AssetsDatails = lazy(() => import("./Components/AssetPage/AssetDetails/Assetdetails"));



const Layout = () => (
    <>
        <Navbar />
        <div className="flex bg-[#fafafa]">
            <Dashboard />
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

                            <Route index element={<Asset />}/>
                            <Route path="/dashboard" element={<div>Home</div>} />
                            <Route path="/asset" element={<Asset />} />
                            <Route path="/map" element={<AssetMap />} />
                            <Route path="/network" element={<Network />} />
                            <Route path="/FilterBycategory" element={<FilterByCategory />} />
                            <Route path="/AssetDetails" element={<AssetsDatails />} />
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