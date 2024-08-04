import React from "react";
import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom';
import Navbar from "./Components/Navbar/Navbar";



const Dashboard = React.lazy(()=>import('./Pages/Dashboard/Dashboard'))


const Layout =()=>{
    return(<>
            <Navbar/>
               <Outlet/>
        </>)
}




function App() {
  return (
   <BrowserRouter>
       <Routes>
           <Route path="/" element={<Layout />}>
               <Route path="/" element={<Dashboard/>} />
               <Route path="/dashboard" element={<Dashboard/>} />
           </Route>
       </Routes>
   </BrowserRouter>
  );
}

export default App;
