import React from "react";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Typography, Box } from "@mui/material";
import { useTheme } from '@mui/material/styles';

const data = [
  { month: "J", user: 20, capacity: 30 },
  { month: "F", user: 25, capacity: 35 },
  { month: "M", user: 40, capacity: 50 },
  { month: "A", user: 50, capacity: 60 },
  { month: "M", user: 60, capacity: 72 },
  { month: "J", user: 58, capacity: 68 },
  { month: "J", user: 54, capacity: 65 },
  { month: "A", user: 62, capacity: 70 },
  { month: "S", user: 55, capacity: 60 },
  { month: "O", user: 50, capacity: 58 },
];

const CustomChart = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        // backgroundColor: "#000000",
        backgroundColor: theme.background.defaultcolor,
        borderRadius: "5px", 
        padding: "16px",
        color: "#FFFFFF", 
        // width: "440px",
        // height:"220px",
        top:"119px",
        // maxWidth: "500px", 
      }}
    >

<Box
  sx={{
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center",
    marginBottom: "16px", 
  }}
>
  <Typography
    variant="h6"
    sx={{ textAlign: "start", fontWeight: "bold" }}
  >
    Space Growth
  </Typography>
  <Box
    sx={{
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: "8px",
      fontSize: "12px",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <span
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: "#5ff",
          borderRadius: "50%",
        }}
      ></span>
      <Typography>User</Typography>
    </Box>

    {/* Capacity Indicator */}
    <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <span
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: "#fff", 
          borderRadius: "50%",
        }}
      ></span>
      <Typography>Capacity</Typography>
    </Box>
  </Box>
</Box>
      <ResponsiveContainer width="100%" height={155}>
        <LineChart data={data}>
          <XAxis dataKey="month" stroke="#fff" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#222",
              border: "none",
              borderRadius: "4px",
              color: "#fff",
            }}
          />
          <Line
            type="monotone"
            dataKey="user"
            stroke="#5ff"
            strokeWidth={2}
            dot={{ r: 0 }}
          />
          <Line
            type="monotone"
            dataKey="capacity"
            stroke="#fff"
            strokeWidth={2}
            dot={{ r: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CustomChart;

