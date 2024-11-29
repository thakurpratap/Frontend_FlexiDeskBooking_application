import { Box, Typography, Divider, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ClearIcon from "@mui/icons-material/Clear";
import { ShareIcon, SuccessSign } from "../assets/AllNewBookingIcon";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import axios from "axios";

const PaymentSuccess = ({
  setIsOpenNewBooking,
}: {
  setIsOpenNewBooking: (isOpen: boolean) => void;
}) => {
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

  const handleDownloadInvoice = async () => {
    const apiUrl =
      "http://localhost:3001/api/flexibooking/get-invoice-pdf/67480e586ecab7142d993c48";

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

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "500px",
          height: "100vh",
          boxShadow: 3,
          position: "absolute",
          right: "5px",
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
              if (setIsOpenNewBooking) setIsOpenNewBooking(false);
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
            Hot Desk, Mon 19 Jun 10 AM - 11 AM
          </Typography>
        </Box>

        <Box sx={{ mx: "5%", my: "2%" }}>
          <Divider sx={{ border: "1px dotted #E7E7E7", marginBottom: "5%" }} />
          <Typography variant="h6">Sender Name</Typography>
          <Typography variant="body2"> Steve Doe</Typography>
          <Divider />
          <Typography variant="h6">Booking Type</Typography>
          <Typography variant="body2"> Hot Desk</Typography>
          <Divider />
          <Typography variant="h6">Payment Time</Typography>
          <Typography variant="body2"> Mon 16 July, 01:25:43 P.M</Typography>
          <Divider />
          <Typography variant="h6">Payment Method</Typography>
          <Typography variant="body2"> Cash</Typography>
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
