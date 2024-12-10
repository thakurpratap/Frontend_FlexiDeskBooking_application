import "./App.css";
import Sidebar from "./Components/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Inventort from "./pages/flexiBooking/Inventort";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DataProvider } from "./pages/DataContext";
import { NewBookingContextProvider } from "./context_API/NewBookingContext";
import RightSidebar from "./Components/Rightsidebar";
import Home from "./pages/Home";
import { PaymentDetailsProvider } from "./context_API/PaymentDetailsContext";
import PaymentDetails from "./Components/PaymentDetails";
import { HomeIcon } from "./assets/icons/Desk";
import { UpdateGuestDetailsContextProvider } from "./context_API/UpdateCreateGuestDetailsContext";
import { PaymentSuccessContextProvider } from "./context_API/PaymentSuccessContext";
import { BookingDetailsContextProvider } from "./context_API/BookingDetailsContext";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <NewBookingContextProvider>
            <PaymentDetailsProvider>
              <UpdateGuestDetailsContextProvider>
                <PaymentSuccessContextProvider>
                <BookingDetailsContextProvider>
                  <DataProvider>
                    <div className="flex h-screen">
                      <Sidebar />
                      <div className="flex-1 flex flex-col">
                        <Navbar />
                        <div className="flex-1 overflow-auto ">
                          <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/inventory" element={<Inventort />} />
                            {/* <Route
                          path="/booking-details"
                          element={<PaymentDetails />}
                        /> */}
                          </Routes>
                        </div>
                      </div>
                      <div className="h-screen fixed top-0 right-0 z-10 ">
                        <RightSidebar />
                      </div>
                    </div>
                  </DataProvider>
                  </BookingDetailsContextProvider>
                </PaymentSuccessContextProvider>
              </UpdateGuestDetailsContextProvider>
            </PaymentDetailsProvider>
          </NewBookingContextProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
