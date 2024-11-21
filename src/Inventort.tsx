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
          className="text-[#222222] flex h-[23px]  gap-0 text-[18px] font-semibold leading-[22.5px] pt-7 ml-8 "
          sx={{
            // width: "109px",
            // height: "23px",
            // gap: "0px",
            // fontSize: "18px",
            // fontWeight: 600,
            // lineHeight: "22.5px",
            // textAlign: "left",
            // textUnderlinePosition: "from-font",
            // textDecorationSkipInk: "none",
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
