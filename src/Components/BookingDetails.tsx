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
  MenuItem,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import axios from "axios";
interface BookingDetailsProps {
  bookingDetailsData: {
    _id: string;
    booking_type: string;
    company_name: string;
    createdAt: string;
    guest_assign_desk: string;
    guest_checkin_status: boolean;
    guest_email: string;
    guest_name: string;
    guest_phone: number;
    identification_id: string;
    identification_info: string;
    invitee: Array<{ name: string; email: string }>;
    isActive: boolean;
    updatedAt: string;
    visit_dates: string[];
    __v: number;
  };
}
const BookingDetails: React.FC<BookingDetailsProps> = ({
  bookingDetailsData,
}) => {
  if (!bookingDetailsData) {
    console.log("loading...");
  }
 
  console.log(bookingDetailsData, "bookingDetailsData");

  const handleDownloadInvoice = async (ID: any) => {
    const apiUrl = `https://flexi-desk-booking.onrender.com/api/flexibooking/get-invoice-pdf/${ID}`;

    try {
      const response = await axios.get(apiUrl, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", "invoice.pdf");

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the PDF:", error);

      alert("Failed to download the PDF. Please try again.");
    }
  };

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
      <Box
        className="Booking Details"
        sx={{
          position: "absolute",
          right: "70px",
          width: "500px",
          my: "10px",
          backgroundColor: "white",
          overflowY: "auto",
          maxHeight: "800px",
        }}
      >
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
            Booking ID:
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
              overflowY: "scroll",
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
                backgroundColor: bookingDetailsData.isActive
                  ? "#79F2C0"
                  : "#FFBDAD",
                display: "flex",
                alignItems: "center",
              }}
            >
              {bookingDetailsData.isActive ? "CONFIRMED" : "CANCELLED"}
            </Typography>
          </Box>

          <Typography variant="body2">Reserver</Typography>

          <Typography variant="subtitle1">
            {bookingDetailsData.guest_name}
          </Typography>

          <Grid className="bookingDetals" container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2">Email ID</Typography>

              <Typography variant="subtitle1">
                {bookingDetailsData.guest_email}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2">Ph. No</Typography>

              <Typography variant="subtitle1">
                {bookingDetailsData.guest_phone}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2">Booking Type</Typography>

              <Typography variant="subtitle1">
                {bookingDetailsData.booking_type}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2">Booking Date</Typography>

              <Typography variant="subtitle1">
                {bookingDetailsData.createdAt}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2">Day Passes</Typography>

              <Typography variant="subtitle1">
                {/* {bookingDetailsData.payment_id?.day_passes} */}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2">Visit Date</Typography>

              <Typography variant="subtitle1">
                {Array.isArray(bookingDetailsData.visit_dates)
                  ? bookingDetailsData.visit_dates.map(
                      (date: string) =>
                        new Date(date).toISOString().split("T")[0] + " "
                    )
                  : null}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2">
                Total Cost (Exclusive GST)
              </Typography>

              <Typography variant="subtitle1">
                {/* ₹{bookingDetailsData.payment_id?.sub_total_cost} */}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2">Payment Method</Typography>

              <Typography variant="subtitle1">
                {/* {bookingDetailsData.payment_id?.payment_method} */}
              </Typography>
            </Grid>
          </Grid>

          <Divider />

          <Typography variant="h6" sx={{ my: "10px" }}>
            Guest Details
          </Typography>

          <Typography variant="body2">Name</Typography>

          <Typography variant="subtitle1" sx={{ marginBottom: "0px" }}>
            {bookingDetailsData.guest_name}
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{ marginTop: "0px", marginBottom: "10px" }}
          >
            Reserver
          </Typography>

          <Typography variant="body2">Identification Information</Typography>

          <Typography variant="subtitle1">
            {bookingDetailsData.identification_id}
          </Typography>

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

          {bookingDetailsData.invitee.map((inviteDetails: any) => {
            return (
              <>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>
                    <Typography variant="body2">Name</Typography>

                    <Typography
                      variant="subtitle1"
                      sx={{ marginBottom: "0px" }}
                    >
                      {inviteDetails.invitee_name}
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

                    <Typography variant="subtitle1">
                      {inviteDetails.invitee_email}
                    </Typography>
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
                  >
                    <MenuItem value="Common Area">Common Area</MenuItem>
                  </Select>
                </FormControl>

                <Divider />
              </>
            );
          })}

          <Divider />

          <Typography variant="h6">Special Requests</Typography>

          <Typography variant="subtitle2">
            {/* {bookingDetailsData.special_request} */}
          </Typography>

          <Divider />

          <Typography variant="h6">Promotions Applied</Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2">Discount Given</Typography>

              <Typography variant="subtitle1">
                {/* {bookingDetailsData.payment_id?.discount} */}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2">Coupon Used</Typography>

              <Typography variant="subtitle1">
                {/* {bookingDetailsData.payment_id?.coupon_code} */}
              </Typography>
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
              padding: "20px",
            }}
          >
            <Box>
              <InsertDriveFileOutlinedIcon />

              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "400", fontSize: "16px", color: "black" }}
              >
                Invoice
              </Typography>

              <Box sx={{ display: "flex" }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "400", fontSize: "14px", color: "#717171" }}
                >
                  {" "}
                  Hot-Desk_19-07.pdf
                </Typography>

                <Box sx={{ color: "#2F80ED", marginLeft: "131px" }}>
                  <FileDownloadOutlinedIcon
                    onClick={() =>
                      handleDownloadInvoice(bookingDetailsData._id)
                    }
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default BookingDetails;
