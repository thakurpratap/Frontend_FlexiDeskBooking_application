// import React, { useState } from "react";
// import { LineChart, Line, XAxis, Tooltip } from "recharts";
// import { FaUserCircle } from "react-icons/fa";

// const data = [
//   { month: "J", occupancy: 30 },
//   { month: "F", occupancy: 35 },
//   { month: "M", occupancy: 50 },
//   { month: "A", occupancy: 60 },
//   { month: "M", occupancy: 72 },
//   { month: "J", occupancy: 68 },
//   { month: "J", occupancy: 65 },
//   { month: "A", occupancy: 70 },
//   { month: "S", occupancy: 60 },
//   { month: "O", occupancy: 58 },
// ];

// const OccupancyChart: React.FC = () => {

//   return (
//     <div style={{ background: "#000", padding: "16px", borderRadius: "8px", color: "#fff", flex: 1 }}>
//       <h3>Occupancy</h3>
//       {/* Average, Peak, and Current */}
//       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", fontSize: "14px" }}>
//         <span>Average: <b>30%</b></span>
//         <span>Peak: <b>72%</b></span>
//         <span>Current: <b>68%</b></span>
//       </div>

//       {/* Dropdown and Icons */}
//       <div style={{ position: "relative", marginBottom: "16px" }}>
//       </div>
//       <LineChart width={300} height={150} data={data}>
//         <XAxis dataKey="month" stroke="#fff" />
//         <Tooltip />
//         <Line type="monotone" dataKey="occupancy" stroke="#5ff" strokeWidth={2} />
//       </LineChart>
//     </div>
//   );
// };

// export default OccupancyChart;


import React, { useState } from "react";
import { LineChart, Line, XAxis, Tooltip } from "recharts";
import { FaUserCircle } from "react-icons/fa";

const data = [
  { month: "J", value: 30 },
  { month: "F", value: 35 },
  { month: "M", value: 50 },
  { month: "A", value: 60 },
  { month: "M", value: 72 },
  { month: "J", value: 68 },
  { month: "J", value: 65 },
  { month: "A", value: 70 },
  { month: "S", value: 60 },
  { month: "O", value: 58 },
];

const OccupancyChart: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("Flexi");

  return (
    <div style={{ background: "#000", padding: "16px", borderRadius: "8px", color: "#fff", width: "30%" }}>
      <h3 style={{ textAlign: "center" }}>Occupancy</h3>
      <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "16px", fontSize: "12px" }}>
        <span>Average: <b>30%</b></span>
        <span>Peak: <b>72%</b></span>
        <span>Current: <b>68%</b></span>
      </div>
      <LineChart width={250} height={100} data={data}>
        <XAxis dataKey="month" stroke="#fff" />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#5ff" strokeWidth={2} />
      </LineChart>
    </div>
  );
};

export default OccupancyChart;

