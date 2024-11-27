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
import DatePicker from "react-multi-date-picker";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import { useNewBookingContext } from "../context_API/NewBookingContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
const NewBooking = ({
  setIsOpenNewBooking,
}: {
  setIsOpenNewBooking: (isOpen: boolean) => void;
}) => {
  const [hotDesk, setHotDesk] = useState<string>("");
  const [document, setDocument] = useState<string>("");
  const [invite, setInvite] = useState<boolean>(false);
  const [dates, setDates] = useState<Array<Date>>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  // type Invitee = {
  //   invitee_name?: string;
  //   invitee_email?: string;
  // };

  // type NewBookingContextData = {
  //   visit_dates: Date[];
  //   guest_name: string;
  //   guest_email: string;
  //   guest_phone: number;
  //   identification_info: string;
  //   identification_id: string;
  //   company_name: string;
  //   invitee: Invitee[];
  // };
  // const { useNewBookingContext } = useNewBookingContext();
  const navigate = useNavigate();
  const handleDateChange = (selectedDates: any) => {
    const convertedDates = selectedDates.map((date: any) => date.toDate());
    setDates(convertedDates);
  };
  const onSubmit = async (data: any) => {
    try {
      // Process data
      console.log("Form Data:", data);
      // await useNewBookingContext(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleClose = () => {
    if (setIsOpenNewBooking) setIsOpenNewBooking(false); // Check if prop is provided
  };
  const theme = createTheme({
    typography: {
      fontFamily: "Roboto",
      h6: {
        color: "#6B778C",
        marginBottom: "10px",
        marginTop: "10px",
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
      MuiDivider: {
        styleOverrides: {
          root: {
            marginTop: "20px",
            marginBottom: "20px",
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
          height: "1500px",
          boxShadow: 3,
          position: "absolute",
          right: "0",
        }}
      >
        <Box
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
          <Typography variant="h5">New Booking</Typography>
          <ClearIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
        </Box>
        <Box sx={{ maxHeight: "600px",overflowY: "auto" }}>
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
                <FormControl fullWidth onSubmit={handleSubmit(onSubmit)}>
                  {/* Date */}
                  <Typography>Select Date*</Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <DatePicker
                      multiple
                      minDate={new Date()}
                      value={dates.map((date) => new Date(date))}
                      onChange={handleDateChange}
                      render={(value, openCalendar) => (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            padding: "4px 8px",
                            cursor: "pointer",
                            width: "454px",
                          }}
                          onClick={openCalendar}
                        >
                          <input
                            readOnly
                            value={value}
                            style={{
                              border: "none",
                              outline: "none",
                              flex: 1,
                              fontSize: "16px",
                            }}
                          />
                          <CalendarTodayIcon style={{ marginLeft: "8px" }} />
                        </Box>
                      )}
                    />
                  </Box>

                  <Divider />

                  <Typography variant="h6">Guest Details</Typography>

                  {/* name */}
                  <Typography>Name*</Typography>
                  <TextField
                    type="text"
                    fullWidth
                    placeholder="Enter Name"
                    {...register("guest_name", {
                      required: "Name is required",
                      minLength: {
                        value: 3,
                        message: "minimum three character",
                      },
                      maxLength: {
                        value: 20,
                        message: "Name cannot exceed 20 characters",
                      },
                    })}
                    error={!!errors.name}
                    helperText={errors.name?.message as string | undefined}
                  />

                  {/* Email */}
                  <Typography>Email ID*</Typography>
                  <TextField
                    type="emai"
                    fullWidth
                    placeholder="Enter Email ID"
                    {...register("guest_email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email format",
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message as string | undefined}
                  />

                  {/* phone */}
                  <Typography>Ph. No.</Typography>
                  <TextField
                    type="number"
                    fullWidth
                    placeholder="Enter Ph. No."
                    {...register("guest_phone", {
                      required: "Phone is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Phone number must be 10 digits",
                      },
                    })}
                    error={!!errors.phone}
                    helperText={errors.phone?.message as number | undefined}
                  />
                  <Typography>Identification Information</Typography>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={document}
                    {...register("identification_info", {
                      required: "Please select a document type",
                    })}
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
                        {...register("identification_id", {
                          required: "GST ID is required",
                        })}
                      />

                      <Typography>Company Name</Typography>
                      <TextField
                        type="text"
                        fullWidth
                        placeholder="Enter Company Name"
                        {...register("company_name", {
                          required: "Company Name is required",
                        })}
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
                        {...register("identification_id", {
                          required: "Document ID is required",
                        })}
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
                    <TextField
                      type="text"
                      fullWidth
                      placeholder="Enter Name"
                      {...register("invitee_name", {
                        required: "Name is required",

                        minLength: {
                          value: 3,
                          message: "minimum three character",
                        },
                        maxLength: {
                          value: 20,
                          message: "Name cannot exceed 20 characters",
                        },
                      })}
                    />
                    {/* Email */}
                    <Typography>Email ID*</Typography>
                    <TextField
                      type="emai"
                      fullWidth
                      placeholder="Enter Email ID"
                      {...register("guest_email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Invalid email format",
                        },
                      })}
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
                    onClick={() => navigate("/payment-details")}
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
                  Note: This Booking type offers both Hot desks and Meeting
                  Rooms, and You must select one of them to make a Booking.
                </Typography>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default NewBooking;
