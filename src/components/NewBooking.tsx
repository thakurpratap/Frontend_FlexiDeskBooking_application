import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Typography,
  Divider,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
const NewBooking = () => {
  const [hotDesk, setHotDesk] = useState<string>("");
  const [document, setDocument] = useState<string>("");
  const [invite, setInvite] = useState<boolean>(false);
  console.log(invite);
  const theme = createTheme({
    typography: {
      fontFamily: "Roboto",
      h6: {
        color: "#6B778C",
        marginBottom: "10px",
        marginTop:"10px"
      },
      subtitle2: {
        color: "#6B778C",
      },
      body2: {
        backgroundColor: "#FCF2DC",
        padding: "8px 5px",
        marginBottom: "15px",
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
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputBase-root": {
              padding: "0px 0px",
            },
            "& input": {
              padding: "10px",
            },
          },
        },
      },
      MuiTypography: {
        defaultProps: {
          marginTop: "15px",
        },
      },
      MuiDivider:{
        styleOverrides:{
          root:{
           marginTop:"20px",
           marginBottom:"20px"
          }
        }
      }
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "500px", height: "1380px", boxShadow: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#F7F7F7",
            height: "65px",
            px: "20px",
            borderBottom:"1px solid #E7E7E7"
          }}
        >
          <Typography variant="h5">New Booking</Typography>
          <ClearIcon sx={{ cursor: "pointer" }} />
        </Box>
        {/* <Divider /> */}
        <Box sx={{ px: "20px" }}>
          <Typography variant="h6">Booking Details</Typography>

          <Typography>Booking Type*</Typography>
          <FormControl fullWidth sx={{ marginTop: "2px" }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={hotDesk}
              onChange={(e: SelectChangeEvent) => {
                setHotDesk(e.target.value);
              }}
              displayEmpty
              sx={{
                "& .MuiSelect-select": {
                  padding: "8px 14px",
                },
              }}
              renderValue={(selected) =>
                selected === "" ? (
                  <Box component="span" sx={{ color: "#6B778C" }}>
                    Please Select
                  </Box>
                ) : (
                  selected
                )
              }
            >
              <MenuItem
                value="Hot Desk"
                sx={{
                  py: "2px",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#42526E",
                    color: "white",
                  },
                }}
              >
                Hot Desk
              </MenuItem>
              <MenuItem
                value="Meeting Room"
                sx={{
                  py: "2px",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#42526E",
                    color: "white",
                  },
                }}
                disabled
              >
                Meeting Room
              </MenuItem>
            </Select>
          </FormControl>

          {hotDesk === "Hot Desk" ? (
            <>
              <FormControl fullWidth>
                {/* Date */}
                <Typography>Select Date*</Typography>
                <TextField type="date" fullWidth />
                <Divider />

                <Typography variant="h6">Guest Details</Typography>

                {/* name */}
                <Typography>Name*</Typography>
                <TextField type="text" fullWidth placeholder="Enter Name" />
                {/* Email */}
                <Typography>Email ID*</Typography>
                <TextField type="emai" fullWidth placeholder="Enter Email ID" />

                {/* phone */}
                <Typography>Ph. No.</Typography>
                <TextField
                  type="number"
                  fullWidth
                  placeholder="Enter Ph. No."
                />
                <Typography>Identification Information</Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={document}
                  sx={{
                    "& .MuiSelect-select": {
                      padding: "8px 14px",
                    },
                  }}
                  displayEmpty
                  renderValue={(selected) =>
                    selected === "" ? (
                      <Box component="span" sx={{ color: "#6B778C" }}>
                        Please Select
                      </Box>
                    ) : (
                      selected
                    )
                  }
                  onChange={(e: SelectChangeEvent) => {
                    setDocument(e.target.value);
                  }}
                >
                  <MenuItem
                    value="GST ID"
                    sx={{
                      py: "2px",
                      color: "black",
                      "&:hover": {
                        backgroundColor: "#42526E",
                        color: "white",
                      },
                    }}
                  >
                    GST ID
                  </MenuItem>
                  <MenuItem
                    value="Aadhar Card / Pan No. / Driver’s Licence / Passport ID"
                    sx={{
                      py: "2px",
                      color: "black",
                      "&:hover": {
                        backgroundColor: "#42526E",
                        color: "white",
                      },
                    }}
                  >
                    Aadhar Card / Pan No. / Driver’s Licence / Passport ID
                  </MenuItem>
                </Select>
                {document === "GST ID" && (
                  <>
                    <Typography>GST ID*</Typography>
                    <TextField
                      type="text"
                      fullWidth
                      placeholder="Enter GST ID"
                    />

                    <Typography>Company Name</Typography>
                    <TextField
                      type="text"
                      fullWidth
                      placeholder="Enter Company Name"
                    />
                  </>
                )}

                {document ===
                  "Aadhar Card / Pan No. / Driver’s Licence / Passport ID" && (
                  <>
                    <Typography>Identification Document*</Typography>
                    <TextField
                      type="text"
                      fullWidth
                      placeholder="Enter Document ID"
                    />
                  </>
                )}
                <Divider />
              </FormControl>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">Add Invitees</Typography>
                {invite ? (
                  <DoNotDisturbOnOutlinedIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setInvite(false);
                    }}
                  />
                ) : (
                  <ControlPointOutlinedIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setInvite(true);
                    }}
                  />
                )}
              </Box>

              {invite && (
                <>
                  {/* name */}
                  <Typography>Name*</Typography>
                  <TextField type="text" fullWidth placeholder="Enter Name" />
                  {/* Email */}
                  <Typography>Email ID*</Typography>
                  <TextField
                    type="emai"
                    fullWidth
                    placeholder="Enter Email ID"
                  />
  <Box
                sx={{
                  display: "flex",
                  gap: "5%",
                  alignItems: "center",
                  marginTop: "15px",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    color: "black",
                    borderColor: "black",
                    "&:hover": {
                      backgroundColor: "black",
                      color: "white",
                    },
                  }}
                >
                  Save
                </Button>
                <ClearIcon sx={{ cursor: "pointer" }} />
              </Box>
                </>
              )}
            
              <Divider />

              <Box className="TotalAmountGenerated">
                <Typography variant="h6">Total Amount Generated</Typography>

                <Box sx={{ display: "flex", gap: "5%" }}>
                  <Box sx={{ width: "216px" }}>
                    <Typography variant="subtitle2">Day Passes</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        mb: "8px",
                        color: "#A5ADBA",
                      }}
                    >
                      10
                    </Box>
                  </Box>

                  <Box sx={{ width: "216px" }}>
                    <Typography variant="subtitle2">
                      Total Cost (Exclusive GST)
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "8px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        color: "#A5ADBA",
                      }}
                    >
                      ₹500
                    </Box>
                  </Box>
                </Box>
                <Divider />
                <Typography variant="subtitle2">
                  Special Requests (If any)
                </Typography>
                <TextField type="text" fullWidth />
              </Box>
              <Divider />

              <Box
                sx={{
                  display: "flex",
                  alignItem: "center",
                  my: "20px",
                  gap: "2%",
                }}
              >
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "black", color: "white" }}
                >
                  Next
                </Button>
                <Button
                  variant="outlined"
                  sx={{ backgroundColor: "white", color: "black" }}
                >
                  Cancel
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography
                variant="body2"
                sx={{
                  backgroundColor: "#FCF2DC",
                  marginTop: "15px",
                  py: "8px",
                  px: "5px",
                }}
              >
                Note: This Booking type offers both Hot desks and Meeting Rooms,
                and You must select one of them to make a Booking.
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default NewBooking;
