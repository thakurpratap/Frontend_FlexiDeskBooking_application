import React,{useState} from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Inventory from "./Inventort";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DataProvider } from "./pages/DataContext";
import NewBooking from "./Components/NewBooking";
import PaymentDetails from "./Components/PaymentDetails";
import BookingDetails from "./Components/BookingDetails";
import { NewBookingContextProvider } from "./context_API/NewBookingContext";
const queryClient = new QueryClient();

function App() {
  const [isOpenNewBooking, setIsOpenNewBooking] = useState(false);
  
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <NewBookingContextProvider>
            <DataProvider>
              <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Navbar />
                  <div className="flex-1 overflow-auto ">
                    <Routes>
                      <Route path="/inventory" element={<Inventory />} />
                      <Route path="/new-booking" element={<NewBooking setIsOpenNewBooking={setIsOpenNewBooking}  />} />
                      <Route
                        path="/payment-details"
                        element={<PaymentDetails />}
                      />
                      <Route
                        path="/booking-details"
                        element={<BookingDetails />}
                      />
                    </Routes>
                  </div>
                </div>
              </div>
            </DataProvider>
          </NewBookingContextProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
