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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

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
    {
      name: "User Management",
      link: "/usermanagement",
      icon: UserMangementIcon,
    },
    { name: "Events", link: "/events", icon: EventsIcon },
    { name: "Billing", link: "/billing", icon: BillingIcon },
    { name: "Reports", link: "/reports", icon: ReportsIcon },
  ];

  const toggleInventoryDropdown = () => {
    setInventoryOpen(!inventoryOpen);
  };

  const handleMenuClick = (menuName: string) => {
    setActiveMenu(menuName);
    if (menuName !== "Inventory") {
      setInventoryOpen(false); // Close inventory dropdown if any other menu is clicked
    }
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
                          activeMenu === menu.name
                            ? "bg-[#2F80ED] border border-gray-300"
                            : ""
                        }`}
                      >
                        {React.createElement(menu.icon)}
                      </div>
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
                      <>
                        <div
                          className={`absolute bg-[#000000] text-white p-4 rounded-md shadow-lg mr-10`}
                          style={{
                            width:"150px",
                            // height:"104px",
                            left: open ? "210px" : "64px",
                            top: "127px",
                            zIndex: 1000,
                          }}
                        >
                            <Link
                              to="/inventory"
                              // className="flex items-center text-sm font-normal gap-3.5 p-2 hover:bg-[#DEEBFF] rounded-md"
                              className={`flex items-center text-sm font-normal gap-3.5 p-2 rounded-md ${
                                activeMenu === "Flexi"
                                  ? "bg-[#DEEBFF] text-black"
                                  : ""
                              }`}
                              onClick={() => handleMenuClick("Flexi")}
                                style={{ width: "100%", }}
                            >
                              <h2 className="whitespace-pre w-full">Flexi</h2>
                            </Link>
                            <Link
                              to="/inventory/dedicated"
                              // className="flex items-center text-sm font-normal gap-3.5 p-2 hover:bg-[#DEEBFF] rounded-md"
                              className={`flex items-center text-sm font-normal gap-3.5 p-2 rounded-md ${
                                activeMenu === "Dedicated"
                                  ? "bg-[#DEEBFF] text-black"
                                  : ""
                              }`}
                              style={{ width: "100%", }}
                              onClick={() => handleMenuClick("Dedicated")}
                            >
                              <h2 className="whitespace-pre">Dedicated</h2>
                            </Link>
                            <Link
                              to="/inventory/meeting-room"
                              // className="flex items-center text-sm font-normal gap-3.5 p-2 hover:bg-[#DEEBFF] rounded-md"
                              className={`flex items-center text-sm font-normal gap-3.5 p-2 rounded-md ${
                                activeMenu === "Meeting Room"
                                  ? "bg-[#DEEBFF] text-black"
                                  : ""
                              }`}
                              style={{ width: "100%", }}
                              onClick={() => handleMenuClick("Meeting Room")}
                            >
                              <h2 className="whitespace-pre">Meeting Room</h2>
                            </Link>
                        </div>
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
                      activeMenu === menu.name
                        ? "bg-[#2F80ED] border border-gray-300"
                        : ""
                    }`}
                  >
                    {React.createElement(menu?.icon)}
                  </div>
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
            <div
              className={`flex items-center ${!open ? "justify-center" : ""}`}
            >
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
                  style={{marginRight:"35%"}}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
