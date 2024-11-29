import React from "react";
import { Box, Typography } from "@mui/material";
import { GuestsIcon, Inventory_Icon, MeetingIcon, RenewalIcon, StaffIcon, TicketIcon } from "../assets/icons/Desk";
import OccupancyChart from "../charts/OccupancyChart";
import SpaceGrowthChart from "../charts/SpaceGrowthChart";
import CompaniesBarChart from "../charts/CompaniesBarChart";

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
  return (
    <>



{/* <div style={{ border: "2px solid #0074E1", borderRadius: "8px", padding: "16px", background: "#f5f5f5" }}>
      <h2 style={{ marginBottom: "16px", textAlign: "center", color: "#000" }}>Overview</h2>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
        <OccupancyChart />
        <SpaceGrowthChart />
        <CompaniesBarChart />
      </div>
    </div> */}

{/* <div style={{ border: "2px solid #0074E1", borderRadius: "8px", padding: "16px" }}>
      <h2 style={{ marginBottom: "16px" }}>Overview</h2>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
        <OccupancyChart />
        <SpaceGrowthChart />
        <CompaniesBarChart />
      </div>
    </div> */}
    <div className="mr-20">
    <div style={{ padding: "20px", background: "#f5f5f5", borderRadius: "8px" }}>
      <h2>Overview</h2>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
        <OccupancyChart />
        <SpaceGrowthChart />
        <CompaniesBarChart />
      </div>
    </div>
    <Box className="p-4 bg-[#F7F7F7]">
      <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-[556px]  ">
        {cards.map((card, index) => (
          <Box
            key={index}
            className="rounded-lg p-4 border border-solid border-[#B7B7B7] bg-[#FFFEFE] " sx={{padding:"32px", gap:"10px"}} 
            // className="w-[458px] h-[266px]  gap-3  bg-[#FFFEFE] border-solid border-gray-400 rounded-tl-[10px] rounded-tr-[10px] opacity-100"
          >
            <Box className="flex flex-col items-start mb-4">
              {card.icon}
              <Typography variant="h6" className="h-[20px] text-[#222222] text-[16px] font-medium leading-[20px] text-left underline-from-font text-decoration-skip" style={{marginTop:"10px"}} >
                {card.title}
              </Typography>
            </Box>
            <Box className="grid grid-cols-3 gap-4">
              {card.stats.map((stat, statIndex) => (
                <Box key={statIndex} className="text-center mt-10">
                  <Typography className="text-[#484848] text-[14px] font-normal leading-[20.3px] text-left underline-from-font">
                    {stat.label}
                  </Typography>
                  <Typography className="text-[21px] font-medium leading-[26.25px] text-left underline-from-font">
                    {stat.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
    </div>
    </>
  );
};

export default Home;










// import React from "react";
// import { Box, Typography } from "@mui/material";
// import InventoryIcon from "@mui/icons-material/Inventory2Outlined"; // Replace with a suitable icon
// import MeetingRoomIcon from "@mui/icons-material/MeetingRoomOutlined";
// import WarningIcon from "@mui/icons-material/WarningAmberOutlined";

// interface CardProps {
//   title: string;
//   stats: { label: string; value: number }[];
//   Icon: React.ElementType;
// }

// const StatCard: React.FC<CardProps> = ({ title, stats, Icon }) => {
//   return (
//     <Box
//       className="flex flex-col items-center justify-between bg-white shadow-md p-4 rounded-lg border border-gray-200"
//       sx={{ minWidth: 250, height: 150 }}
//     >
//       <Box className="flex items-center space-x-2 mb-4">
//         <Icon className="text-3xl text-gray-700" />
//         <Typography variant="h6" className="font-semibold">
//           {title}
//         </Typography>
//       </Box>
//       <Box className="grid grid-cols-3 gap-4 w-full text-center">
//         {stats.map((stat) => (
//           <Box key={stat.label}>
//             <Typography className="text-sm text-gray-500">{stat.label}</Typography>
//             <Typography className="text-lg font-bold">{stat.value}</Typography>
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// const Dashboard = () => {
//   return (
//     <>
//     <Box className="grid grid-cols-3 gap-6 p-6 bg-gray-100 min-h-screen">
//       <StatCard
//         title="Inventory"
//         stats={[
//           { label: "Dedicated", value: 566 },
//           { label: "Flexi", value: 8 },
//           { label: "Available", value: 150 },
//         ]}
//         Icon={InventoryIcon}
//       />
//       <StatCard
//         title="Meeting Room"
//         stats={[
//           { label: "Booked", value: 18 },
//           { label: "Available", value: 8 },
//         ]}
//         Icon={MeetingRoomIcon}
//       />
//       <StatCard
//         title="Tickets"
//         stats={[
//           { label: "New", value: 0 },
//           { label: "Open", value: 18 },
//           { label: "Closed", value: 22 },
//         ]}
//         Icon={WarningIcon}
//       />
//     </Box>
// </>
//   );
// };

// export default Dashboard;









// import React from "react";
// import { Box, Grid, Paper, Typography } from "@mui/material";
// import InventoryIcon from "@mui/icons-material/Inventory";
// import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
// import ReportProblemIcon from "@mui/icons-material/ReportProblem";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import PeopleIcon from "@mui/icons-material/People";
// import GroupIcon from "@mui/icons-material/Group";
// import { Line } from "react-chartjs-2";
// import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js";

// ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

// const Home: React.FC = () => {
//   // Chart Data
//   const chartData = {
//     labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O"],
//     datasets: [
//       {
//         label: "Users",
//         data: [20, 30, 40, 50, 60, 70, 80, 85, 90, 95],
//         borderColor: "#36A2EB",
//         fill: false,
//         tension: 0.3,
//       },
//       {
//         label: "Capacity",
//         data: [10, 20, 30, 40, 50, 60, 70, 75, 80, 85],
//         borderColor: "#FF6384",
//         fill: false,
//         tension: 0.3,
//       },
//     ],
//   };

//   // Card Component
//   const DashboardCard = ({
//     icon,
//     title,
//     content,
//   }: {
//     icon: React.ReactNode;
//     title: string;
//     content: string[];
//   }) => (
//     <Paper
//       elevation={2}
//       className="p-4 flex flex-col items-center justify-center text-center shadow-md rounded-lg border border-gray-200"
//     >
//       <Box className="text-primary mb-2">{icon}</Box>
//       <Typography variant="h6" className="font-medium text-gray-800">
//         {title}
//       </Typography>
//       {content.map((line, index) => (
//         <Typography
//           key={index}
//           variant="body2"
//           className="text-gray-600"
//         >
//           {line}
//         </Typography>
//       ))}
//     </Paper>
//   );

//   return (
//     <Box className="p-6 font-sans">
//       {/* Header */}
//       <Typography variant="h4" className="mb-6 font-semibold text-gray-800">
//         Overview
//       </Typography>

//       {/* Charts Section */}
//       <Grid container spacing={4} className="mb-6">
//         <Grid item xs={12} md={4}>
//           <Paper
//             elevation={3}
//             className="p-4 rounded-lg bg-black text-white"
//           >
//             <Typography variant="h6" className="mb-4">
//               Occupancy
//             </Typography>
//             <Line data={chartData} options={{ maintainAspectRatio: true }} height={120} />
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Paper
//             elevation={3}
//             className="p-4 rounded-lg bg-black text-white"
//           >
//             <Typography variant="h6" className="mb-4">
//               Space Growth
//             </Typography>
//             <Line data={chartData} options={{ maintainAspectRatio: true }} height={120} />
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Paper
//             elevation={3}
//             className="p-4 rounded-lg bg-black text-white"
//           >
//             <Typography variant="h6" className="mb-4">
//               Companies
//             </Typography>
//             <Line data={chartData} options={{ maintainAspectRatio: true }} height={120} />
//           </Paper>
//         </Grid>
//       </Grid>

//       {/* Info Cards Section */}
//       <Grid container spacing={4}>
//         <Grid item xs={12} sm={6} md={4}>
//           <DashboardCard
//             icon={<InventoryIcon fontSize="large" />}
//             title="Inventory"
//             content={["Dedicated: 566", "Flexi: 8", "Available: 150"]}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={4}>
//           <DashboardCard
//             icon={<MeetingRoomIcon fontSize="large" />}
//             title="Meeting Room"
//             content={["Booked: 18", "Available: 8"]}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={4}>
//           <DashboardCard
//             icon={<ReportProblemIcon fontSize="large" />}
//             title="Tickets"
//             content={["New: 0", "Open: 18", "Closed: 22"]}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={4}>
//           <DashboardCard
//             icon={<GroupIcon fontSize="large" />}
//             title="Staff"
//             content={["Total Staff: 30", "Checked-in: 12", "Leave: 4"]}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={4}>
//           <DashboardCard
//             icon={<PeopleIcon fontSize="large" />}
//             title="Guests"
//             content={["Total Invited: 30", "Checked-in: 22", "No-show: 8"]}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={4}>
//           <DashboardCard
//             icon={<RefreshIcon fontSize="large" />}
//             title="Renewal"
//             content={["10 Days: 0", "20 Days: 4", "1 Month: 8"]}
//           />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Home;