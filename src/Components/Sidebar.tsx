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
import { useTheme } from '@mui/material/styles';

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const theme = useTheme();
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
      <section style={{display:"flex"}}>
        <div
          // className={`bg-[#222222] min-h-screen ${
          //   open ? "w-[204px]" : "w-16"
          // } duration-500 text-[#FFFFFF] px-4 flex flex-col justify-between `}
          style={{backgroundColor: "#222222",minHeight: "100vh",width: open ? "204px" : "64px",transition: "width 0.5s",color: "#FFFFFF",padding: "0 1rem",display: "flex",
            flexDirection: "column",justifyContent: "space-between",fontFamily: "Roboto",fontSize: "14px",fontWeight: 400,lineHeight: "17.5px",}}>
          <div style={{ margin: "20px 76px 10px 10px" }}>
            {open ? (
              <WybridIcon />
            ) : (
              <div style={{display:"flex", justifyContent:"center", marginLeft:"8px"}}>
                <MoreVertIcon fontSize="large" style={{cursor:"pointer"}} />
              </div>
            )}
          </div>

          <div style={{marginTop:"16px", display:"flex", flexDirection: "column",gap: "0.5rem",flexGrow: 1,}}>
            {menus.map((menu, i) => {
              if (menu.name === "Inventory") {
                return (
                  <div key={i}>
                    <div
                      // className=" hover:bg-gray-800 "
                      style={{display: "flex",alignItems: "center",fontSize: "0.875rem",fontWeight: 400,gap: "1.75rem",padding: "0.5rem",borderRadius: "0.375rem",cursor: "pointer",}}
                      onClick={() => {
                        handleMenuClick(menu.name);
                        toggleInventoryDropdown();
                      }}
                    >
                      <div
                        // className={`p-1 rounded-md ${
                        //   activeMenu === menu.name
                        //     ? "bg-[#2F80ED] border border-gray-300"
                        //     : ""
                        // }`}
                        style={{padding: "0.25rem",  borderRadius: "0.375rem", backgroundColor: activeMenu === menu.name ? "#2F80ED" : "transparent", 
                        border: activeMenu === menu.name ? "1px solid #D1D5DB" : "none", }}>
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
                        <ArrowDropDownIcon/>
                      ) : (
                        <ArrowRightIcon/>
                      )}
                    </div>

                    {inventoryOpen && (
                      <>
                        <div
                          style={{ width:"150px",position:"absolute",color:"white",padding:"16px",marginRight:"40px",borderRadius:"6px", top: "127px",zIndex: 1000,
                            left: open ? "210px" : "64px", backgroundColor: theme.background.defaultcolor,  }}>
                            <Link
                              to="/inventory"
                              // className={`hover:bg-[#DEEBFF] hover:text-black`}
                              onClick={() => handleMenuClick("Flexi")}
                                style={{ width: "100%", display:"flex",alignItems:"center",fontSize: "0.875rem",fontWeight: 400,gap: "0.875rem",padding: "0.5rem",borderRadius: "0.375rem", 
                                 }}
                                 onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = "#DEEBFF"; 
                                  e.currentTarget.style.color = "black";           
                                }} onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = "transparent";
                                  e.currentTarget.style.color = "inherit";             
                                }}>
                                {/* ${
                                activeMenu === "Flexi"
                                  ? "bg-[#DEEBFF] text-black"
                                  : ""
                              } */}
                              <h2>Flexi</h2>
                            </Link>
                            <Link
                              to="/inventory/dedicated"
                              // className={`hover:bg-[#DEEBFF] hover:text-black`}
                              style={{ width: "100%", display:"flex",alignItems:"center",fontSize: "0.875rem",fontWeight: 400,gap: "0.875rem",padding: "0.5rem",borderRadius: "0.375rem", }}
                              onClick={() => handleMenuClick("Dedicated")}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#DEEBFF";
                                e.currentTarget.style.color = "black";            
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent"; 
                                e.currentTarget.style.color = "inherit";          
                              }}
                            >
                              <h2 >Dedicated</h2>
                            </Link>
                            <Link
                              to="/inventory/meeting-room"
                              // className={` hover:bg-[#DEEBFF] hover:text-black`}
                              style={{ width: "100%", display:"flex",alignItems:"center",fontSize: "0.875rem",fontWeight: 400,gap: "0.875rem",padding: "0.5rem",borderRadius: "0.375rem",  }}
                              onClick={() => handleMenuClick("Meeting Room")}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#DEEBFF"; 
                                e.currentTarget.style.color = "black";           
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                                e.currentTarget.style.color = "inherit";   
                              }}
                            >
                              <h2 >Meeting Room</h2>
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
                  // className="group hover:bg-gray-800 "
                  style={{display: "flex",alignItems: "center",fontSize: "0.875rem",fontWeight: 400,gap: "1.25rem",padding: "0.5rem",borderRadius: "0.375rem",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2A2A2A")} 
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  onClick={() => handleMenuClick(menu.name)}
                >
                  <div
                    // className={`p-1 mr-3 rounded-md ${
                    //   activeMenu === menu.name
                    //     ? "bg-[#2F80ED] border border-gray-300"
                    //     : ""
                    // }`}
                    style={{padding: "0.25rem",marginRight: "0.75rem",borderRadius: "0.375rem",border: activeMenu === menu.name ? "1px solid #D1D5DB" : "none",    
                      backgroundColor:activeMenu === menu.name ? "#2F80ED" : "transparent",  }}>
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
              {open && <span style={{marginLeft:"24px"}}> User</span>}
            </div>
            <div style={{display:"flex", justifyContent:"end",marginLeft:"8px",paddingTop: "0.75rem",paddingBottom: "0.75rem",}}>
              {open ? (
                <CloseIcon style={{cursor:"pointer"}}
                  onClick={() => setOpen(!open)}
                />
              ) : (
                <OpenIcon style={{marginRight:"35%",cursor:"pointer"}}
                  onClick={() => setOpen(!open)}
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
