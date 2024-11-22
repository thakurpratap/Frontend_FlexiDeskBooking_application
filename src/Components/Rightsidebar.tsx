import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { BookingNotificationIcon, NotificationIcon, PhonebookIcon , CalenderIcon , MessageIcon,QuestionIcon} from "../assets/icons/Desk";

const RightSidebar: React.FC = () => {
  return (
    <Box
      sx={{
        width: "70px", 
        height: "875px", 
        position: "fixed", 
        top: "71px",
        left: "1664px",
        gap: "0px", 
        opacity: "1", 
        boxShadow: "-7px 4px 10px 0px rgba(0, 0, 0, 0.1)", 
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        alignItems: "center",
        padding: "10px 0",
        marginLeft :"-1%"
      }}
    >
      {/* Top Section Icons */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Tooltip title="Notification" placement="left">
          <IconButton className="bg-white border border-gray-300 p-2 hover:shadow-md">
            <NotificationIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="spaces" placement="left">
          <IconButton >
            <BookingNotificationIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Calendar" placement="left">
          <IconButton >
            <CalenderIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Profile" placement="left">
          <IconButton >
            <PhonebookIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="support" placement="left">
          <IconButton >
            <MessageIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Bottom Section Icon */}
      <Tooltip title="Help" placement="left">
        <IconButton >
          <QuestionIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default RightSidebar;

