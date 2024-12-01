import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography } from "@mui/material";

const data = [
  { name: "Active", value: 40 },
  { name: "Expire", value: 20 },
  { name: "Pipeline", value: 60 },
];

const CompaniesChart = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#000000", // Black background
        borderRadius: "5px", // Rounded corners
        padding: "16px",
        color: "#FFFFFF", // White text
        // width: "440px",
        // height:"220px",
        top:"119px",
        // maxWidth: "500px", 
      }}
    >
      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          textAlign: "start",
          fontWeight: "bold",
          marginBottom: "16px",
        }}
      >
        Companies
      </Typography>

      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={155}>
        <BarChart data={data}>
          {/* Grid Lines */}
          <CartesianGrid
            strokeDasharray="3 3" // Dashed grid lines
            horizontal={true} // Enable horizontal grid lines
            vertical={false} // Disable vertical grid lines
            stroke="#444" // Grid line color (dark gray)
          />
          {/* X-Axis */}
          <XAxis
            dataKey="name"
            stroke="#fff"
            tick={{ fontSize: 14, fill: "#fff", fontWeight: "bold" }}
            tickLine={false} // Remove small ticks under labels
            axisLine={false} // Remove the X-axis line
          />
          {/* Y-Axis */}
          <YAxis
            tickFormatter={() => ""} // Remove Y-axis labels
            tickLine={false} // Remove small ticks beside labels
            axisLine={false} // Remove the Y-axis line
            domain={[0, 60]} // Set the range from 0 to 60
          />
          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#222",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
          {/* Bar */}
          <Bar
            dataKey="value"
            fill="#5ac8fa" // Light blue color
            barSize={50}
            radius={[8, 8, 0, 0]} // Rounded top corners
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CompaniesChart;