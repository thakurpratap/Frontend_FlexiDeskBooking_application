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
import { usePaymentDetailsContext } from "../context_API/PaymentDetailsContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useNewBookingContext } from "../context_API/NewBookingContext";
// import { usePaymentDetailsContext } from "../context_API/PaymentDetailsContext";

const PaymentDetails = ({
  handleControlStep,
  setIsOpenNewBooking,
  setBookingStep,
}: {
  setIsOpenNewBooking: (isOpen: boolean) => void;
  //  handleControlStep: (step: "booking" | "payment" | "payment_success") => void;
  handleControlStep: (direction: "next" | "back") => void;
  setBookingStep: any;
}) => {
  // handleControlStep: (direction: "next" | "back") => void;
  // handleControlStep: () => void;
  // }
  // ) =>
  //    {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState(false);
  const {
    dayPasses,
    totalCost,
    setPaymentDetails,
    submitPaymentDetails,
    genrateInvoice,
  } = usePaymentDetailsContext();
  const { setIsBackTracker } = usePaymentDetailsContext();
  const gstCharges = totalCost * 0.18;
  const grandTotal = totalCost + gstCharges;

  const { bookingData } = useNewBookingContext();

  const { paymentData } = usePaymentDetailsContext();

  const handleMarkPaid = async () => {
    if (!paymentMethod) {
      setError(true);
      return;
    }
    setError(false);
    try {
      await submitPaymentDetails({
        dayPasses,
        totalCost,
        grandTotal,
        paymentMethod,
      });
      await genrateInvoice();
      toast.success("Payment successful!");
      //handleControlStep("payment_success");
      handleControlStep("next");
    } catch (error) {
      console.error("Error submitting payment details:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

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
          position: "absolute",
          right: "10px",
          backgroundColor: "white",
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
            px: "10px",
            borderBottom: "1px solid #E7E7E7",
          }}
        >
          <Typography variant="h5">Payment Details</Typography>
          <ClearIcon
            sx={{ cursor: "pointer" }}
            onClick={() => {
              if (setIsOpenNewBooking) {
                setIsOpenNewBooking(false) 
                setBookingStep("booking");}
            }}
          />
        </Box>

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
                    {dayPasses}
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
                    ₹{totalCost}
                  </Box>
                </Box>
              </Box>
            </Box>
            <Typography variant="subtitle2">GST Charges</Typography>
            <Box sx={{ marginLeft: "8px", backgroundColor: "#FAFBFC" }}>
              18%
            </Box>
            <Typography variant="subtitle2">Discount</Typography>
            <Box sx={{ marginLeft: "8px", backgroundColor: "#FAFBFC" }}>0%</Box>
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
              ₹{grandTotal}
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
              <RadioGroup
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
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
                  <Radio value="Online" disabled />
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
              bottom: "85px",
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
                onClick={handleMarkPaid}
                disabled={!paymentMethod}
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
                // onClick={() => {
                //   handleControlStep("booking");
                //   setIsBackTracker(true);
                // }}
                onClick={() => {
                  handleControlStep("back");
                  setIsBackTracker(true);
                }}
              >
                Back
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default PaymentDetails;
