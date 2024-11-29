import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Divider,
  Switch,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
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
      body2: {
        fontSize: "13px",
        color: "#717171",
      },
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
            margin: "15px 0",
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "500px" }}>
        <Box
          className="Nav"
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

        <Box sx={{ p: "10px" }}>
          <Box
            className="Booking Details"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              my: "10px",
            }}
          >
            <Typography variant="h6">Booking Details</Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "12px ",
                fontWeight: "600",
                color: "#006644",
                px: "4px",
                borderRadius: "3px",
                backgroundColor: "#79F2C0",
                display: "flex",
                alignItems: "center",
              }}
            >
              CONFIRMED
            </Typography>
          </Box>

          <Typography variant="body2">Reserver</Typography>
          <Typography variant="subtitle1">Steve Doe</Typography>

          <Grid className="bookingDetals" container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2">Email ID</Typography>
              <Typography variant="subtitle1">steve.doe@mail.com</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Ph. No</Typography>
              <Typography variant="subtitle1">steve.doe@mail.com</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Booking Type</Typography>
              <Typography variant="subtitle1">Hot Desk</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Booking Date</Typography>
              <Typography variant="subtitle1">16th July</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Day Passes</Typography>
              <Typography variant="subtitle1">0</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Visit Date</Typography>
              <Typography variant="subtitle1">
                18th, 20th & 23rd July
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                Total Cost (Exclusive GST)
              </Typography>
              <Typography variant="subtitle1">₹6000.00</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Payment Method</Typography>
              <Typography variant="subtitle1">Cash</Typography>
            </Grid>
          </Grid>
          <Divider />
          <Typography variant="h6" sx={{ my: "10px" }}>
            Guest Details
          </Typography>
          <Typography variant="body2">Name</Typography>
          <Typography variant="subtitle1" sx={{ marginBottom: "0px" }}>
            Steve Doe
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ marginTop: "0px", marginBottom: "10px" }}
          >
            Reserver
          </Typography>
          <Typography variant="body2">Identification Information</Typography>
          <Typography variant="subtitle1">4423-4234-3423-2454 </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle2">Check-In Status</Typography>
            <Switch inputProps={{ "aria-label": "controlled" }} />
          </Box>
          <Typography variant="subtitle2">Assign Desk</Typography>
          <FormControl fullWidth sx={{ py: "6px" }}>
            <InputLabel sx={{ color: "black", postion: "absolute" }}>
              Common Area (Default)
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              displayEmpty
              sx={{
                "& .MuiSelect-select": {
                  padding: "8px 14px",
                },
              }}
            ></Select>
          </FormControl>

          <Divider />

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="body2">Name</Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: "0px" }}>
                Steve Doe
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ marginTop: "0px", marginBottom: "10px" }}
              >
                Reserver
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2">Email ID</Typography>
              <Typography variant="subtitle1">steve.doe@mail.com</Typography>
            </Box>
          </Box>
          <Typography variant="subtitle2">Assign Desk</Typography>
          <FormControl fullWidth sx={{ py: "6px" }}>
            <InputLabel sx={{ color: "black", postion: "absolute" }}>
              Common Area (Default)
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              displayEmpty
              sx={{
                "& .MuiSelect-select": {
                  padding: "8px 14px",
                },
              }}
            ></Select>
          </FormControl>
          <Divider />

          <Typography variant="h6">Special Requests</Typography>
          <Typography variant="subtitle2">
            Guest will need 2 additional coffee mugs and water bottles.
          </Typography>

          <Divider />

          <Typography variant="h6">Promotions Applied</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2">Discount Given</Typography>
              <Typography variant="subtitle1">0%</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Coupon Used</Typography>
              <Typography variant="subtitle1">FREECOFFEE</Typography>
            </Grid>
          </Grid>

          <Box
            className="Download"
            sx={{
              width: "332px",
              height: "131px",
              borderRadius: "10px",
              border: "1px solid #E7E7E7",
              display: "flex",
              alignItems: "center",
              padding:"20px"
            }}
          >
            <Box>
              <InsertDriveFileOutlinedIcon />
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "400", fontSize: "16px", color:"black" }}
              >
                Invoice
              </Typography>
              <Box sx={{display:"flex"}}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "400", fontSize: "14px" ,color:"#717171"}}
                >
                  {" "}
                  Hot-Desk_19-07.pdf
                </Typography>
                <Box sx={{color:"#2F80ED",marginLeft:'131px'}}><FileDownloadOutlinedIcon/></Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default BookingDetails;
