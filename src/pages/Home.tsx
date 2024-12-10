import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { GuestsIcon, Inventory_Icon, MeetingIcon, RenewalIcon, StaffIcon, TicketIcon } from "../assets/icons/Desk";
import OccupancyChart from "../charts/OccupancyChart";
import SpaceGrowthChart from "../charts/SpaceGrowthChart";
import CompaniesBarChart from "../charts/CompaniesBarChart";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTheme } from '@mui/material/styles';

interface CardData {
  title: string;
  icon: React.ReactNode;
  stats: { label: string; value: string | number }[];
}

const cards: CardData[] = [
  {
    title: "Inventory",
    icon: <Inventory_Icon />,
    stats: [
      { label: "Dedicated", value: 566 },
      { label: "Flexi", value: 8 },
      { label: "Available", value: 150 },
    ],
  },
  {
    title: "Meeting Room",
    icon: <MeetingIcon />,
    stats: [
      { label: "Booked", value: 18 },
      { label: "Available", value: 8 },
    ],
  },
  {
    title: "Tickets",
    icon: <TicketIcon />,
    stats: [
      { label: "New", value: 0 },
      { label: "Open", value: 18 },
      { label: "Closed", value: 22 },
    ],
  },
  {
    title: "Staff",
    icon: <StaffIcon />,
    stats: [
      { label: "Total Staff", value: 30 },
      { label: "Checked-in", value: 12 },
      { label: "Leave", value: 4 },
    ],
  },
  {
    title: "Guests",
    icon: <GuestsIcon />,
    stats: [
      { label: "Total Invited", value: 30 },
      { label: "Checked-in", value: 22 },
      { label: "No-show", value: 8 },
    ],
  },
  {
    title: "Renewal",
    icon: <RenewalIcon/>,
    stats: [
      { label: "10 Days", value: 0 },
      { label: "20 days", value: 4 },
      { label: "1 Months", value: 8 },
    ],
  },
];

const Home = () => {
  const [showCharts, setShowCharts] = useState(true);

  const toggleChartsVisibility = () => {
    setShowCharts((prev) => !prev);
  };
  const theme = useTheme();
  return (
    <>
      <div  style={{marginRight:"80px"}}>
        <div
          style={{
            padding: "20px",
            // paddingLeft:"20px",
            background: "#dddddd54",
            // background: "linear-gradient(180deg, rgba(196, 196, 196, 0) 0%, #000000 78.15%)",
            borderRadius: "5px",
          }}
        >
          <div style={{justifyContent:"space-between", display:"flex" }}>
          <h2 style={{fontWeight:"700px" , fontSize: "16px", lineHeight: "20px", background: ""}} >Overview</h2>
          <KeyboardArrowUpIcon
           onClick={toggleChartsVisibility}/>
          </div>
          {showCharts && ( 
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "24px",
              flexWrap: "wrap", 
            }}
          >
            <div
              style={{
                flex: "1 1 300px", 
                maxWidth: "33%", 
                height: "auto",
              }}
            >
              <OccupancyChart />
            </div>
            <div
              style={{
                flex: "1 1 300px",
                maxWidth: "33%",
                height: "auto",
              }}
            >
              <SpaceGrowthChart />
            </div>
            <div
              style={{
                flex: "1 1 300px",
                maxWidth: "33%",
                height: "auto",
              }}
            >
              <CompaniesBarChart />
            </div>
          </div>
          )}
        </div>

       <Box >
        <Box style={{ padding: "16px" }}>
          <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-[226px]">
            {cards.map((card, index) => (
              <Box
                key={index}
                // className="rounded-lg p-4 border border-solid border-[#B7B7B7] bg-[#FFFEFE]"
                // sx={{ padding: "32px", gap: "10px" }}
                style={{ borderRadius: "8px",padding: "32px",border: "1px solid #B7B7B7",backgroundColor: "#FFFEFE",gap: "10px", }}   
                 >
                <Box style={{ display: "flex", flexDirection: "column", alignItems: "start", marginBottom: "16px" }}>
                  {card.icon}
                  <Typography
                    variant="h6"
                    className="h-[20px] text-[16px] font-medium leading-[20px] text-left underline-from-font text-decoration-skip"
                    style={{ marginTop: "10px" }}
                    // style={{ marginTop: "10px",height: "20px",fontSize: "16px",fontWeight: "500",lineHeight: "20px",textAlign: "left",  color: theme.background.primarycolor,}}
                  >
                    {card.title}
                  </Typography>
                </Box>
                <Box style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                  {card.stats.map((stat, statIndex) => (
                    <Box key={statIndex} style={{ textAlign: "center", marginTop: "40px" }}>
                      <Typography 
                      //  className="text-[#484848] text-[14px] font-normal leading-[20.3px] text-left underline-from-font"
                       sx={{color: "#484848",fontSize: "14px",fontWeight: "400",lineHeight: "20.3px",textAlign: "left",textDecoration: "none",}}
                       >
                        {stat.label}
                      </Typography>
                      <Typography 
                        // className="text-[21px] font-medium leading-[26.25px] text-left underline-from-font" 
                        // sx={{fontSize: "21px",fontWeight: "500",lineHeight: "26.25px",textAlign: "left",textDecoration: "none",}}
                       sx={{fontSize: "19px",fontWeight: "500",lineHeight: "26.25px",textAlign: "left",textDecoration: "none",}}
                        >
                        {stat.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        </Box>
      </div>
    </>
  );
};

export default Home;

// style={{color: "#484848",fontSize: "14px",fontWeight: "400",lineHeight: "20.3px",textAlign: "left",textDecoration: "underline",}}

// style={{fontSize: "21px",fontWeight: "500",lineHeight: "26.25px",textAlign: "left",textDecoration: "underline",}}