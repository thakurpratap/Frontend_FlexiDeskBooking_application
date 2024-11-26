import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const BookingDetails = () => {
  const theme = createTheme({
    typography: {
      fontFamily: "Roboto",
      h6: {
        fontWeight: "500",
        fontSize: "16px",
        color: "#484848",
      },
      subtitle2: {
        color: "#6B778C",
        fontSize: "13px",
        fontWeight: "400",
        marginTop: "10px",
      },
      subtitle1: {
        fontSize: "14px",
        fontWeight: "600",
        margin: "10px 0px",
      },
      h5: {
        fontSize: "18px",
      },
      h4: {
        fontSize: "21px",
        fontWeight: "500",
      },
      body2:{
        fontSize:"13px",
        color:"#717171"
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            boxSizing: "border-box",
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            margin: "10px 0",
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "500px" }}>
        <Box className="Nav"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#F7F7F7",
            height: "65px",
            px: "20px",
            borderBottom: "1px solid #E7E7E7",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              padding: "6px 16px",
              borderRadius: "30px",
              border: "1px solid #DDDDDD",
            }}
          >
            Booking ID:10004
          </Typography>
          <Box>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "white",
                color: "#222222",
                border: "1px solid #BDBDBD",
                textTransform: "none",
                width: "54px",
                height: "32px",
                padding: "4px 15px",
                fontSize: "14px",
                borderRadius: "5px",
              }}
            >
              Edit
            </Button>
            <ClearIcon sx={{ cursor: "pointer", marginLeft: "5px" }} />
          </Box>
        </Box>

         <Box sx={{p:"10px"}}>
         <Box  className="Booking Details"
         sx={{ display: "flex", justifyContent: "space-between", my:"10px" }}>
          <Typography variant="h6">Booking Details</Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "12px ",
              fontWeight: "600",
              color: "#006644",
              px:"4px",
              borderRadius:"3px",
              backgroundColor:"#79F2C0",
              display:"flex",
              alignItems:"center"
            }}
          >
            CONFIRMED
          </Typography>
        </Box>

           <Typography variant="body2">Reserver</Typography>
           <Typography variant="subtitle1">Steve Doe</Typography>

           <Box>
             <Typography variant="body2">
                Email ID
             </Typography>
             
           </Box>

         </Box>

      </Box>
    </ThemeProvider>
  );
};

export default BookingDetails;
