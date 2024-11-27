import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import {
  BillingIcon,
  CloseIcon,
  CustomersIcon,
  EventsIcon,
  HomeIcon,
  InventoryIcon,
  OpenIcon,
  ProfileIcon,
  ReportsIcon,
  SalesLeadsIcon,
  TicketsIcon,
  UserMangementIcon,
  WybridIcon,
} from "../assets/icons/Desk";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import RightSidebar from "./Rightsidebar";
import { Menu, MenuItem } from "@mui/material";


const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [inventoryOpen, setInventoryOpen] = useState(false); 

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menus = [
    { name: "Home", link: "/", icon: HomeIcon },
    { name: "Inventory", link: "#", icon: InventoryIcon }, 
    { name: "Customers", link: "/customers", icon: CustomersIcon },
    { name: "Tickets", link: "/tickets", icon: TicketsIcon },
    { name: "Sales Leads", link: "/sales/leads", icon: SalesLeadsIcon },
    { name: "User Management", link: "/usermanagement", icon: UserMangementIcon },
    { name: "Events", link: "/events", icon: EventsIcon },
    { name: "Billing", link: "/billing", icon: BillingIcon },
    { name: "Reports", link: "/reports", icon: ReportsIcon },
  ];

  const toggleInventoryDropdown = () => {
    setInventoryOpen(!inventoryOpen);
  };

  const handleMenuClick = (menuName : string) => {
    setActiveMenu(menuName);
  };

  return (
    <>
    <section className="flex gap-0">
      <div
        className={`bg-[#222222] min-h-screen ${
          open ? "w-[204px]" : "w-16"
        } duration-500 text-[#FFFFFF] px-4 flex flex-col justify-between `}
        style={{
          fontFamily: "Roboto",
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: "17.5px",
        }}
      >
        <div style={{ margin: "20px 76px 10px 10px" }}>
          {open ? (
            <WybridIcon />
          ) : (
            <div className="flex justify-center ml-2">
              <MoreVertIcon fontSize="large" className="cursor-pointer" />
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-2 flex-grow">
          {menus.map((menu, i) => {
            if (menu.name === "Inventory") {
              return (
                <div key={i}>
                  <div
                    className="group flex items-center text-sm font-normal gap-7 p-2 hover:bg-gray-800 rounded-md cursor-pointer"
                    onClick={() => {
                      handleMenuClick(menu.name);
                      toggleInventoryDropdown();
                    }}
                  >
                    {/* mr-5 */}
                    <div 
                     className={`p-1 rounded-md ${
                      activeMenu === menu.name ? "bg-[#2F80ED] border border-gray-300" : ""
                    }`}
                    >{React.createElement(menu.icon)}</div>
                    <h2
                      className={`whitespace-pre duration-500 ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      {menu?.name}
                    </h2>
                    {inventoryOpen ? (
                      <ArrowDropDownIcon className="ml-auto" />
                    ) : (
                      <ArrowRightIcon className="ml-auto" />
                    )}
                  </div>

                  {inventoryOpen && (
                   < >
                   {/* <Menu> */}
                    <div className="pl-14 mt-2 flex flex-col gap-2">
                    <MenuItem>
                      <Link
                        to="/inventory"
                        className="group flex items-center text-sm font-normal gap-3.5 p-2 hover:bg-gray-800 rounded-md"
                        onClick={() => handleMenuClick("Flexi")}
                        
                      >
                        <h2 className="whitespace-pre">Flexi</h2>
                      </Link>
                      </MenuItem>
                      <MenuItem>
                      <Link
                        to="/inventory/dedicated"
                        className="group flex items-center text-sm font-normal gap-3.5 p-2 hover:bg-gray-800 rounded-md"
                        onClick={() => handleMenuClick("Dedicated")}
                      >
                        <h2 className="whitespace-pre">Dedicated</h2>
                      </Link>
                      </MenuItem>
                      <MenuItem>
                      <Link
                        to="/inventory/meeting-room"
                        className="group flex items-center text-sm font-normal gap-3.5 p-2 hover:bg-gray-800 rounded-md"
                        onClick={() => handleMenuClick("Meeting Room")}
                      >
                        <h2 className="whitespace-pre">Meeting Room</h2>
                      </Link>
                      </MenuItem>
                    </div>
                    {/* </Menu> */}
                    </>
                  )}
                </div>
              );
            }
            return (
              <Link
                to={menu?.link}
                key={i}
                className="group flex items-center text-sm font-normal gap-5 p-2 hover:bg-gray-800 rounded-md"
                onClick={() => handleMenuClick(menu.name)}
              >
                {/* className="mr-3" */}
                <div 
                // className="mr-3"
                 className={`p-1 mr-3 rounded-md ${
                  activeMenu === menu.name ? "bg-[#2F80ED] border border-gray-300" : ""
                }`}
                >{React.createElement(menu?.icon)}</div>
                <h2
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>

                <h2
                className={`${
                  open && "hidden"
                 } absolute left-58 bg-neutral-500 font-normal whitespace-pre text-[#ffffff] rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 ml-4 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                   {menu?.name}
               </h2>
              </Link>
            );
          })}
        </div>

        <div className="">
          <div className={`flex items-center ${!open ? "justify-center" : ""}`}>
            <ProfileIcon />
            {open && <span className="ml-6"> User</span>}
          </div>
          <div className="py-3 flex justify-end ml-2">
            {open ? (
              <CloseIcon
                className="cursor-pointer"
                onClick={() => setOpen(!open)}
              />
            ) : (
              <OpenIcon
                className="cursor-pointer"
                onClick={() => setOpen(!open)}
              />
            )}
          </div>
        </div>
      </div>
    </section>
    <div className="absolute top-0 right-0 h-[1000px] flex-1 flex flex-col" >
          <RightSidebar />
        </div> 
</>
  );
};

export default Sidebar;














// import React, { useState } from "react";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { Link } from "react-router-dom";
// import {
//   BillingIcon,
//   CloseIcon,
//   CustomersIcon,
//   EventsIcon,
//   HomeIcon,
//   InventoryIcon,
//   OpenIcon,
//   ProfileIcon,
//   ReportsIcon,
//   SalesLeadsIcon,
//   TicketsIcon,
//   UserMangementIcon,
//   WybridIcon,
// } from "../assets/icons/Desk";

// const Sidebar = () => {
//   const menus = [
//     { name: "Home", link: "/", icon: HomeIcon },
//     { name: "Inventory", link: "/", icon: InventoryIcon },
//     { name: "Customers", link: "/", icon: CustomersIcon },
//     { name: "Tickets", link: "/", icon: TicketsIcon },
//     { name: "Sales Leads", link: "/", icon: SalesLeadsIcon },
//     { name: "User Mangement", link: "/", icon: UserMangementIcon },
//     { name: "Events", link: "/", icon: EventsIcon },
//     { name: "Billing", link: "/", icon: BillingIcon },
//     { name: "Reports", link: "/", icon: ReportsIcon },
//   ];
//   const [open, setOpen] = useState(true);
//   return (
//     <section className="flex gap-0">
//       <div
//         className={`bg-[#222222] min-h-screen ${
//           open ? "w-[204px]" : "w-16"
//         } duration-500 text-[#FFFFFF] px-4 flex flex-col justify-between `}
//         style={{
//           fontFamily: "Roboto",
//           fontSize: "14px",
//           fontWeight: 400,
//           lineHeight: "17.5px",
//         }}
//       >
//         <div style={{ margin: "28px 76px 40px 10px" }}>
//           {open ? (
//             <WybridIcon />
//           ) : (
//             // <MoreVertIcon fontSize="large" className="cursor-pointer" />
//             <div className="flex justify-center  ml-2">
//               <MoreVertIcon fontSize="large" className="cursor-pointer" />
//             </div>
//           )}
//         </div>
//         {/* relative */}
//         <div className="mt-4 flex flex-col gap-4 flex-grow">
//           {menus?.map((menu, i) => (
//             <Link
//               to={menu?.link}
//               key={i}
//               className="group flex items-center text-sm font-normal gap-3.5 p-2 hover:bg-gray-800 rounded-md"
//             >
//               <div className="mr-5">{React.createElement(menu?.icon)}</div>
//               <h2
//                 // style={{
//                 //   transitionDelay: `${i + 3}00ms`,
//                 // }}
//                 className={`whitespace-pre duration-500 ${
//                   !open && "opacity-0 translate-x-28 overflow-hidden"
//                 }`}
//               >
//                 {menu?.name}
//               </h2>
//               <h2
//                 className={`${
//                   open && "hidden"
//                 } absolute left-48 bg-white font-normal whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
//               >
//                 {menu?.name}
//               </h2>
//             </Link>
//           ))}
//         </div>
//         {/* <div className="flex items-center" style={{marginTop:"26vh"}} ><ProfileIcon />Gust</div> */}
//         <div className="pb-5">
//         <div className={`flex items-center ${!open ? "justify-center" : ""}`}>
//           <ProfileIcon />
//           {open && <span className="ml-6"> User</span>}
//         </div>
//         <div className="py-5 flex justify-end mb-3 ml-2">
//           {open ? (
//             <CloseIcon
//               className="cursor-pointer"
//               onClick={() => setOpen(!open)}
//             />
//           ) : (
//             <OpenIcon
//               className="cursor-pointer"
//               onClick={() => setOpen(!open)}
//             />
//           )}
//         </div>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default Sidebar;
