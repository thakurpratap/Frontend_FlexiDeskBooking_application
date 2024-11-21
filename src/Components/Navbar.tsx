import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";

const Navbar = () => {
  return (
    // style={{ position: "absolute", width: "1524px", left: "204px" }}
    // <section className="flex gap-0">
    <div style={{left: "204px" }}>
      <AppBar
        position="static"
        className="bg-white"
        style={{
          backgroundColor: "#FFFFFF",
          height: "70px",
          boxShadow: "none",
        }}
      >
        <Toolbar
          className="flex justify-between"
          style={{
            height: "100%",
          }}
        >
          <Typography variant="h6" className="text-black font-semibold">
            67 Kumar Enclave, Thane
          </Typography>
          {/* style={{height:"40px", width:"530px", top:"15px" }} */}
          <div className="flex items-center gap-6" style={{height:"40px", width:"530px", top:"15px" }}>
            <div
              className="px-4 py-2 bg-[#FAFBFC] rounded-full text-[#222222]"
              style={{
                border: "1px solid #BDBDBD",
              }}
              // style={{width:"240px", height:"32px", borderRadius:"30px", border:"1px Dark Grey 04"}}
            >
              <Typography
                component="span"
                style={{
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontWeight: 300,
                  lineHeight: "16px",
                }}
              >
                Dedicated desks available:{" "}
              </Typography>
              <span
                style={{
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "16px",
                }}
              >
                2,100
              </span>
            </div>

            <div
              className="px-4 py-2 bg-[#FAFBFC] rounded-full text-[#222222]"
              style={{
                border: "1px solid #BDBDBD",
              }}
            >
              <Typography
                component="span"
                style={{
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontWeight: 300,
                  lineHeight: "16px",
                }}
              >
                Today's bill amount:{" "}
              </Typography>
              {/* Today's bill amount:{" "} */}
              <span
                className="text-[#000000]"
                style={{
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontWeight: 700,
                  lineHeight: "16px",
                }}
              >
                Rs 00.0
              </span>
            </div>
            <IconButton
              edge="end"
              className="text-[#111111]"
              aria-label="settings"
              style={{
                width:"40px",
                height:"40px",
                border: "1px solid #BDBDBD",
              }}
            >
              <SettingsIcon   style={{
                width:"14.96px",
                height:"14.96px",
                top:"0.68px",
                left:"0.68px"
              }}/>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {/* Horizontal Line */}
      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#DDDDDD",
        }}
      ></div>
    </div>
//    {/* </section> */}
  );
};

export default Navbar;