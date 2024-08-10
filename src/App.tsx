import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from "./Components/Navbar/Navbar";
import Asset from "./Pages/AssetPage/index";
import Dashboard from "./Pages/Dashboard/Dashboard"; // Directly import Dashboard

const Layout = () => (
    <>
        <Navbar />
        <div className="flex">
            <Dashboard />
            <div className="flex flex-row w-full">
                <Outlet />
            </div>
        </div>
    </>
);

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Asset />} />
                    <Route path="/dashboard" element={<div>Home</div>} />
                    <Route path="/asset" element={<Asset />} />

                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;