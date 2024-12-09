import { Box, Typography, Divider, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ClearIcon from "@mui/icons-material/Clear";
import { ShareIcon, SuccessSign } from "../assets/AllNewBookingIcon";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { usePaymentSuccessContext } from "../context_API/PaymentSuccessContext";
import {
  usePaymentDetailsContext,
} from "../context_API/PaymentDetailsContext";
const PaymentSuccess = ({
  setIsOpenNewBooking,
  setBookingStep,
}: {
  setIsOpenNewBooking: (isOpen: boolean) => void;
  setBookingStep: any;
}) => {
  const theme = createTheme({
    typography: {
      fontFamily: "Roboto",
      h6: {
        fontWeight: "500",
        fontSize: "16px",
        color: "#717171",
        marginBottom:"10px"
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
const {handleDownloadInvoice,handleShareInvoice}=usePaymentSuccessContext()
  const { paymentData } = usePaymentDetailsContext();
  const { payment = {} } = paymentData || {};

  const {
    booking_id = {},
    payment_method = "N/A",
    createdAt,
  } = payment;

  const paymentTime = createdAt
    ? new Date(createdAt).toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "short",
      })
    : "Unknown";

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "500px",
          height: "100vh",
          boxShadow: 3,
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
                setIsOpenNewBooking(false);
                setBookingStep("booking");
              }
            }}
          />
        </Box>

        <Box
          className="Payment success"
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
            {booking_id.booking_type || "N/A"}, {paymentTime}
          </Typography>
        </Box>

        <Box sx={{ mx: "5%", my: "2%" }}>
          <Divider sx={{ border: "1px dotted #E7E7E7", marginBottom: "5%" }} />
          <Typography variant="h6">Sender Name</Typography>
          <Typography variant="body2">{booking_id.guest_name}</Typography>
          <Divider />
          <Typography variant="h6">Booking Type</Typography>
          <Typography variant="body2"> {booking_id.booking_type}</Typography>
          <Divider />
          <Typography variant="h6">Payment Time</Typography>
          <Typography variant="body2">{paymentTime}</Typography>
          <Divider />
          <Typography variant="h6">Payment Method</Typography>
          <Typography variant="body2">{payment_method}</Typography>
        </Box>
        <Box
          className="Btn"
          sx={{
            position: "absolute",

            bottom: "85px",
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
              onClick={handleDownloadInvoice}
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
              onClick={handleShareInvoice}
            >
              Share Invoice
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default PaymentSuccess;
