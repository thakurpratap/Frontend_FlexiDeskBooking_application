import { Typography } from "@mui/material";
import React from "react";

function Inventory() {
  return (
    <>
      <div
        style={{
          height: "78px",
        }}
      >
        <Typography
          variant="h5"
          className="text-[#222222] flex "
          sx={{
            // width: "109px",
            height: "23px",
            gap: "0px",
            // fontFamily: "Roboto",
            fontSize: "18px",
            fontWeight: 600,
            lineHeight: "22.5px",
            textAlign: "left",
            textUnderlinePosition: "from-font",
            textDecorationSkipInk: "none",
            paddingTop: "28px",
            marginLeft: "32px",
          }}
        >
          Flexi Booking
        </Typography>
      </div>
      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#DDDDDD",
        }}
      ></div>
    </>
  );
}

export default Inventory;
