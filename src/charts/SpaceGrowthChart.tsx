// import React from "react";
// import { LineChart, Line, XAxis, Tooltip, Legend } from "recharts";

// const data = [
//   { month: "J", user: 10, capacity: 30 },
//   { month: "F", user: 15, capacity: 40 },
//   { month: "M", user: 25, capacity: 50 },
//   { month: "A", user: 30, capacity: 55 },
//   { month: "M", user: 35, capacity: 60 },
//   { month: "J", user: 40, capacity: 70 },
//   { month: "J", user: 50, capacity: 80 },
//   { month: "A", user: 55, capacity: 85 },
//   { month: "S", user: 60, capacity: 90 },
//   { month: "O", user: 70, capacity: 100 },
// ];

// const SpaceGrowthChart: React.FC = () => {
//   return (
//     <div style={{ background: "#000", padding: "16px", borderRadius: "8px", color: "#fff", width: "30%" }}>
//       <h3 style={{ textAlign: "center" }}>Space Growth</h3>
//       <LineChart width={250} height={100} data={data}>
//         <XAxis dataKey="month" stroke="#fff" />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="user" stroke="#5ff" strokeWidth={2} />
//         <Line type="monotone" dataKey="capacity" stroke="#fff" strokeWidth={2} />
//       </LineChart>
//     </div>
//   );
// };

// export default SpaceGrowthChart;


import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SpaceGrowthChart: React.FC = () => {
  const data: ChartData<"line"> = {
    labels: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O"],
    datasets: [
      {
        label: "User",
        data: [5, 100, 6, 8, 12, 15, 13, 14, 16, 15],
        borderColor: "white",
        backgroundColor: "white",
        borderWidth: 3,
        pointRadius: 6,
        pointBackgroundColor: "white",
        tension: 0.4, // Smooth curve
      },
      {
        label: "Capacity",
        data: [8, 5, 9, 12, 10, 13, 15, 18, 17, 16],
        borderColor: "#80D0F7",
        backgroundColor: "#80D0F7",
        borderWidth: 3,
        pointRadius: 6,
        pointBackgroundColor: "#80D0F7",
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    // responsive: true,
    // plugins: {
    //   legend: {
    //     display: true,
    //     labels: {
    //       color: "white",
    //       font: {
    //         size: 14,
    //       },
    //     },
    //     position: "top" as const, // Default position for legend
    //     align: "end", // Align to the right
    //   },
    //   title: {
    //     display: true,
    //     text: "Space Growth",
    //     color: "white",
    //     font: {
    //       size: 20,
    //       weight: "bold",
    //     },
    //     align: "start", // Align title to the left
    //   },
    // },
    // layout: {
    //   padding: {
    //     top: 10,
    //     left: 0,
    //     right: 10,
    //     bottom: 10,
    //   },
    // },
    // scales: {
    //   x: {
    //     ticks: {
    //       color: "white",
    //       font: {
    //         size: 14,
    //       },
    //     },
    //     grid: {
    //       display: false, 
    //     },
    //   },
    //   y: {
    //     display: false, 
    //   },
    // },
    // elements: {
    //   point: {
    //     radius: 6, 
    //     hoverRadius: 8,
    //   },
    // },
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        padding: "20px",
        borderRadius: "10px",
        maxWidth: "600px", // Optional: set max width
        margin: "0 auto", // Center the chart
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default SpaceGrowthChart;