import React from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
// import Home from "./pages/Home";
import Inventory from "./Inventort";

function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar /> 
        <div className="flex-1 overflow-auto ">
        <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/inventory" element={<Inventory />} />
        </Routes>
        </div>
        </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
