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
import { IconButton } from "@mui/material";

const Sidebar = () => {
  const menus = [
    { name: "Home", link: "/", icon: HomeIcon },
    { name: "Inventory", link: "/inventory", icon: InventoryIcon },
    { name: "Customers", link: "/", icon: CustomersIcon },
    { name: "Tickets", link: "/", icon: TicketsIcon },
    { name: "Sales Leads", link: "/", icon: SalesLeadsIcon },
    { name: "User Mangement", link: "/", icon: UserMangementIcon },
    { name: "Events", link: "/", icon: EventsIcon },
    { name: "Billing", link: "/", icon: BillingIcon },
    { name: "Reports", link: "/", icon: ReportsIcon },
  ];
  const [open, setOpen] = useState(true);
  return (
    <section className="flex gap-0">
      <div
        className={`bg-[#222222] min-h-screen ${
          open ? "w-[204px]" : "w-16"
        } duration-500 text-[#FFFFFF] px-4`}
        style={{
          fontFamily: "Roboto",
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: "17.5px",
        }}
      >
        <div style={{ margin: "24px 76px 40px 10px" }}>
          {open ? (
            <WybridIcon />
          ) : (
            // <MoreVertIcon fontSize="large" className="cursor-pointer" />
            <div className="flex justify-center  ml-2">
              <MoreVertIcon fontSize="large" className="cursor-pointer" />
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className="group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
            >
              <div>{React.createElement(menu?.icon)}</div>
              <h2
                // style={{
                //   transitionDelay: `${i + 3}00ms`,
                // }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
        {/* <div className="flex items-center" style={{marginTop:"26vh"}} ><ProfileIcon />Gust</div> */}
        <div
          className={`flex items-center ${!open ? "justify-center" : ""}`}
          style={{ marginTop: "30vh" }}
        >
          <ProfileIcon />
          {open && <span className="ml-2"> User</span>}
        </div>
        <div className=" flex justify-end py-5 mb-3 ml-2">
          {open ? (
            <CloseIcon
              className="cursor-pointer "
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
    </section>
  );
};

export default Sidebar;
