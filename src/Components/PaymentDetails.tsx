import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  Radio,
  RadioGroup,
  Divider,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ClearIcon from "@mui/icons-material/Clear";
import { ShareIcon, SuccessSign } from "../assets/AllNewBookingIcon";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useNavigate } from "react-router-dom";

const PaymentDetails = () => {
  const [isClicked, setIsClicked] = useState<boolean>(true);
  const navigate=useNavigate()
  const theme = createTheme({
    typography: {
      fontFamily: "Roboto",
      h6: {
        fontWeight: "500",
        fontSize: "16px",
        color: "#717171",
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
      body1: {
        fontSize: "14px",
        fontWeight: "400",
      },
      body2: {
        fontSize: "14px",
        fontWeight: "600",
        marginTop: "5px",
      },
      h5: {
        fontSize: "18px",
      },
      h4: {
        fontSize: "21px",
        fontWeight: "500",
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
            // marginTop: "20px",
            margin: "10px 0",
          },
        },
      },
    },
  });


  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "500px",
          height: "100vh",
          boxShadow: 3,
          position: "relative",
        }}
      >
        <Box className="Nav"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#F7F7F7",
            height: "65px",
            px: "10px",
            borderBottom: "1px solid #E7E7E7",
          }}
        >
          <Typography variant="h5">Payment Details</Typography>
          <ClearIcon sx={{ cursor: "pointer" }} />
        </Box>
        {isClicked ? (
          <>
            <Box className="mainPart">
              <Box sx={{ px: "15px" }} className="Price Breakup">
                <Box className="Price Breakup">
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#6B778C",
                      marginBottom: "10px",
                      marginTop: "10px",
                    }}
                  >
                    Price Breakup
                  </Typography>
                  <Box sx={{ display: "flex", gap: "5%" }}>
                    <Box sx={{ width: "216px" }}>
                      <Typography variant="subtitle2">Day Passes</Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "4px",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          mb: "8px",
                        }}
                      >
                        10
                      </Box>
                    </Box>

                    <Box sx={{ width: "216px" }}>
                      <Typography variant="subtitle2">Sub Total</Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "4px",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                        }}
                      >
                        ₹500
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Typography variant="subtitle2">GST Charges</Typography>
                <Box sx={{ marginLeft: "8px", backgroundColor: "#FAFBFC" }}>
                  18%
                </Box>
                <Typography variant="subtitle2">Discount</Typography>
                <Box sx={{ marginLeft: "8px", backgroundColor: "#FAFBFC" }}>
                  0%
                </Box>
                <Typography variant="subtitle2">Coupon Code</Typography>
                <Box sx={{ marginLeft: "8px", backgroundColor: "#FAFBFC" }}>
                  FREECOFFEE
                </Box>
                <Typography variant="subtitle2">Grand Total</Typography>
                <Box
                  sx={{
                    marginLeft: "8px",
                    backgroundColor: "#FAFBFC",
                    color: "#A5ADBA",
                  }}
                >
                  ₹6949.00
                </Box>

                <Typography variant="subtitle1">Payment Options</Typography>

                <FormControl
                  sx={{
                    width: "448px",
                    border: "1px solid #DDDDDD",
                    height: "108px",
                    borderRadius: "8px",
                  }}
                >
                  <RadioGroup>
                    <Box sx={{ display: "flex" }}>
                      <Radio value="Cash" />
                      <Typography
                        variant="body1"
                        sx={{ color: "#333", marginTop: "8px" }}
                      >
                        Cash
                      </Typography>
                    </Box>

                    <Divider
                      sx={{
                        backgroundColor: "#DDDDDD",
                        my: "5px",
                        mx: "12px",
                      }}
                    />
                    <Box sx={{ display: "flex" }}>
                      <Radio value="Online" />
                      <Typography
                        variant="body1"
                        sx={{ color: "#333", marginTop: "8px" }}
                      >
                        Online
                      </Typography>
                    </Box>
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box
                className="Btn"
                sx={{
                  position: "absolute",
                  bottom: "10px",
                  width: "100%",
                }}
              >
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    alignItem: "center",
                    gap: "2%",
                    marginLeft: "20px",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "black",
                      color: "white",
                      textTransform: "none",
                      width: "143px",
                      height: "48px",
                      padding: "12px 25px",
                    }}
                    onClick={() => {
                      setIsClicked(!isClicked);
                    }}
                  >
                    Mark as Paid
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      backgroundColor: "white",
                      color: "black",
                      border: "1px solid #DADADA",
                      textTransform: "none",
                      width: "86px",
                      height: "48px",
                      padding: "12px 25px",
                    }}
                    onClick={()=>{
                      navigate("/new-booking")
                    }}
                  >
                    Back
                  </Button>
                </Box>
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Box  className="Payment success"
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: " #27AE60",
                  height: "76px",
                  width: "76px",
                  color: "white",
                  borderRadius: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SuccessSign />
              </Box>
              <Typography variant="h4">Payment Success!</Typography>
              <Typography variant="body1" sx={{ color: "#6B778C" }}>
                Hot Desk, Mon 19 Jun 10 AM - 11 AM
              </Typography>
            </Box>

            <Box sx={{ mx: "5%", my: "7%" }}>
              <Divider
                sx={{ border: "1px dotted #E7E7E7", marginBottom: "7%" }}
              />
              <Typography variant="h6">Sender Name</Typography>
              <Typography variant="body2"> Steve Doe</Typography>
              <Divider />
              <Typography variant="h6">Booking Type</Typography>
              <Typography variant="body2"> Hot Desk</Typography>
              <Divider />
              <Typography variant="h6">Payment Time</Typography>
              <Typography variant="body2">
                {" "}
                Mon 16 July, 01:25:43 P.M
              </Typography>
              <Divider />
              <Typography variant="h6">Payment Method</Typography>
              <Typography variant="body2"> Cash</Typography>
            </Box>
            <Box className="Btn"
              sx={{
                position: "absolute",
                bottom: "10px",
                width: "100%",
                paddingLeft: "5%",
              }}
            >
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  alignItem: "center",
                  gap: "2%",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    textTransform: "none",
                    width: "200px",
                    height: "48px",
                    padding: "12px 25px",
                  }}
                >
                  <FileDownloadOutlinedIcon /> Download Invoice
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    border: "1px solid #DADADA",
                    textTransform: "none",
                    width: "174px",
                    height: "48px",
                    padding: "12px 25px",
                  }}
                  startIcon={<ShareIcon />}
                >
                  Share Invoice
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default PaymentDetails;
