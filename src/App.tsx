import React from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Inventory from "./Inventort";
import PaymentDetails from "./Components/PaymentDetails";
import NewBooking from "./Components/NewBooking";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <div className="flex-1 overflow-auto">
              <Routes>
                {/* Define all your routes here */}
                <Route path="/" element={<Inventory />} />
                <Route path="/payment-details" element={<PaymentDetails />} />
                <Route path="/new-booking" element={<NewBooking />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;















// import React from "react";
// import "./App.css";
// import Sidebar from "./Components/Sidebar";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// //import Home from "./pages/Home";
// import Inventory from "./Inventort";
// import PaymentDetails from "./Components/PaymentDetails";
// import NewBooking from "./Components/NewBooking";

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <div className="flex h-screen">
//           <Sidebar />
//           <div className="flex-1 flex flex-col">
//             <Navbar />

//             <div className="flex-1 overflow-auto ">
//               <Routes>
//                 {/* <Route path="/" element={<Home />} /> */}
//                 <Route path="/" element={<Inventory />} />
//                 <Route path="/payment-details" element={<PaymentDetails />} />
//                 <Route path="/new-booking" element={<NewBooking />} />
//               </Routes>
//             </div>
//           </div>
//             <Navbar /> 
//         <div className="flex-1 overflow-auto ">
//         <Routes>
//         {/* <Route path="/" element={<Home />} /> */}
//         <Route path="/inventory" element={<Inventory />} />
//         </Routes>
//         </div>
//         </div>
//         </div>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
