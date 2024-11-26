import React from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Inventory from "./Inventort";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DataProvider } from "./pages/DataContext";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
      <BrowserRouter >
      <DataProvider> 
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar /> 
        <div className="flex-1 overflow-auto ">
        <Routes>
        <Route path="/inventory" element={<Inventory />} />
        </Routes>
        </div>
        </div>
        </div>
        </DataProvider> 
      </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;


