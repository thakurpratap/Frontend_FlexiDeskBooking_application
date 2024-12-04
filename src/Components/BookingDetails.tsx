import React, { useEffect, useState } from "react";
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
  TextField,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ClearIcon from "@mui/icons-material/Clear";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import axios from "axios";
import { toast } from "react-toastify";
import { CopyIcon, InfoIcon } from "../assets/AllNewBookingIcon";
import formatDatesToOrdinal from "../utils/format";

interface BookingDetailsProps {
  setIsEdit: (edit: boolean) => void;
  isEdit: boolean;
  bookingDetailsData: {
    _id: string;
    booking_type: string;
    visit_dates: string[];
    guest_name: string;
    guest_email: string;
    guest_phone: number;
    guest_checkin_status: boolean;
    guest_assign_desk: string;
    identification_info: string;
    identification_id: string;
    company_name: string;
    invitee: Invitee[];
    special_request: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    bookingId: number;
    __v: number;
    payment_id: Payment;
  };
}

interface Invitee {
  invitee_name: string;
  invitee_email: string;
  invitee_checkin_status: boolean;
  invitee_assign_desk: string;
  _id: string;
}

interface Payment {
  _id: string;
  day_passes: number;
  sub_total_cost: number;
  gst_charges: number;
  discount: number;
  coupon_code: string;
  grand_total: number;
  payment_method: string;
  payment_status: string;
  booking_id: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}
interface InviteeError {
  invitee_name?: string;
  invitee_email?: string;
  invitee_phone?: string;
}

interface Errors {
  [inviteeId: string]: InviteeError;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({
  bookingDetailsData,
  setIsEdit,
  isEdit,
}) => {
  if (!bookingDetailsData) {
    console.log("loading...");
  }

  // const [isEdit, setIsEdit] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [clearButton, setClearButton] = useState(true);
  const [updateData, setUpdateData] = useState(bookingDetailsData || {});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [inviteErrors, setInviteErrors] = useState<Errors>({});

  const handleEditClick = () => {
    setIsEdit(true); // Switch to edit mode
  };

  const handleCloseNewBooking = () => {
    setClearButton(!clearButton);
    window.location.reload();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "guest_name") {
      if (value === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Name is required",
        }));
      } else if (!/^[A-Za-z\s]+$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Name must contain only letters",
        }));
      } else if (value.trimStart() !== value) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "No leading spaces",
        }));
      } else if (value.length < 3) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Name must be at least 3 characters",
        }));
      } else if (value.length > 25) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Name cannot exceed 25 characters",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      }
    }

    if (name === "guest_email") {
      if (!value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Email is required",
        }));
      } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
      ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Enter a valid email address",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      }
    }

    if (name === "identification_id") {
      // Regular expression to check for at least one uppercase letter
      const hasUppercase = /[A-Z]/.test(value);

      if (value === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Field cannot be empty",
        }));
      } else if (value.length !== 15) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Must be exactly 15 characters long",
        }));
      } else if (!hasUppercase) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Characters Must be capital letters",
        }));
      } else {
        // Clear the error message if all validations pass
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    }

    if (name === "guest_phone") {
      if (!value.trim()) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Phone number is required",
        }));
      } else if (!/^[6-9]\d{9}$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Phone number must be 10 digits and not start with 0-5",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      }
    }

    setUpdateData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleInviteeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    inviteeId: string
  ) => {
    const { name, value } = e.target;

    // Copy current errors state
    let updatedErrors = { ...inviteErrors };

    // Validate name field
    if (name === "invitee_name") {
      if (value === "") {
        updatedErrors[inviteeId] = {
          ...updatedErrors[inviteeId],
          invitee_name: "Name is required",
        };
      } else if (!/^[A-Za-z\s]+$/.test(value)) {
        updatedErrors[inviteeId] = {
          ...updatedErrors[inviteeId],
          invitee_name: "Name must contain only letters",
        };
      } else if (value.trimStart() !== value) {
        updatedErrors[inviteeId] = {
          ...updatedErrors[inviteeId],
          invitee_name: "No leading spaces",
        };
      } else if (value.length > 25) {
        updatedErrors[inviteeId] = {
          ...updatedErrors[inviteeId],
          invitee_name: "Name cannot exceed 25 characters",
        };
      } else {
        updatedErrors[inviteeId] = {
          ...updatedErrors[inviteeId],
          invitee_name: "", // Clear the error
        };
      }
    }

    // Validate email field
    if (name === "invitee_email") {
      if (!value.trim()) {
        updatedErrors[inviteeId] = {
          ...updatedErrors[inviteeId],
          invitee_email: "Email is required",
        };
      } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
      ) {
        updatedErrors[inviteeId] = {
          ...updatedErrors[inviteeId],
          invitee_email: "Enter a valid email address",
        };
      } else {
        updatedErrors[inviteeId] = {
          ...updatedErrors[inviteeId],
          invitee_email: "", // Clear the error
        };
      }
    }

    // Update the inviteErrors state with the new error messages
    setInviteErrors(updatedErrors);

    // Update the invitee data
    const updatedInvitees = updateData.invitee.map((invitee) =>
      invitee._id === inviteeId ? { ...invitee, [name]: value } : invitee
    );
    setUpdateData({ ...updateData, invitee: updatedInvitees });
  };

  const handleSaveClick = async (id: any) => {
    console.log("updateData", updateData);

    const hasErrors = Object.values(errors).some((error) => error); // Check if there are any global errors
    const hasInviteeErrors = Object.values(inviteErrors).some((error) =>
      Object.values(error).some((fieldError) => fieldError)
    ); // Check if there are any invitee errors

    if (hasErrors || hasInviteeErrors) {
      // Display an error message or simply return if there are validation errors
      toast.error("Invalid input");
      return; // Do not proceed with the update if there are errors
    }

    // Ensure invitee is defined and is an array before using map
    const inviteeData = Array.isArray(updateData.invitee)
      ? updateData.invitee.map((invitee) => ({
          invitee_name: invitee.invitee_name,
          invitee_email: invitee.invitee_email,
        }))
      : []; // Use an empty array if invitee is not available

    const apiUrl = `https://flexi-desk-booking.onrender.com/api/flexibooking/update-booking/${id}`;

    try {
      const response = await axios.put(
        apiUrl,
        {
          guest_name: updateData.guest_name,
          guest_email: updateData.guest_email,
          guest_phone: updateData.guest_phone,
          identification_id: updateData.identification_id,
          invitee: inviteeData,
          special_request: updateData.special_request,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Update successful:", response.data);

      setUpdateData(response.data.booking);
      setIsEdit(false); // Switch to view mode after saving
      setIsSaved(true); // Mark as saved
      toast.success("Update successfully");

      // Trigger the toast notification for success

      const apiUrlgenerateInvoice = `https://flexi-desk-booking.onrender.com/api/flexibooking/generate-invoice-pdf/${id}`;
      const generateResponse = await axios.post(apiUrlgenerateInvoice);
      console.log("generate invoice response", generateResponse.data);
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  console.log(bookingDetailsData, "bookingDetailsData");

  const handleDownloadInvoice = async (ID: string) => {
    const apiUrlgetInvoice = `https://flexi-desk-booking.onrender.com/api/flexibooking/get-invoice-pdf/${ID}`;

    try {
      const response = await axios.get(apiUrlgetInvoice, {
        responseType: "blob",
      });
      console.log("get Invoice", response);

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

  const copyContent = async (elementId: string) => {
    try {
      const textElement = document.getElementById(elementId);

      if (textElement) {
        let text: string;

        if (
          textElement instanceof HTMLInputElement ||
          textElement instanceof HTMLTextAreaElement
        ) {
          text = textElement.value; // Use value for input/textarea
        } else {
          text = textElement.textContent || ""; // Use textContent for other elements
        }

        // Copy text to clipboard
        await navigator.clipboard.writeText(text);
        // console.log("Copied to clipboard:", text);
      }
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {clearButton ? (
        <FormControl>
          <Box
            className="Booking Details"
            sx={{
              position: "absolute",
              right: "70px",
              width: "500px",
              my: "10px",
              backgroundColor: "white",
              overflowY: "auto",
              height: "900px",
              maxHeight: "1000px",
              paddingBottom: "50px",
              padding: "12px",
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
                padding: "10px",
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
                Booking ID:{bookingDetailsData.bookingId}
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
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                  // Pass handleUpdate function as callback, not the result of calling it.
                  onClick={
                    isEdit
                      ? () => handleSaveClick(bookingDetailsData._id)
                      : handleEditClick
                  }
                  aria-label={isEdit ? "Save" : "Edit"}
                >
                  {isEdit ? "Save" : "Edit"}
                </Button>

                <ClearIcon
                  onClick={handleCloseNewBooking}
                  sx={{ cursor: "pointer", marginLeft: "5px" }}
                />
              </Box>
            </Box>

            <Box sx={{ padding: "10px" }}>
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
                {!isEdit ? (
                  updateData.guest_name
                ) : (
                  <TextField
                    name="guest_name"
                    value={updateData.guest_name}
                    onChange={handleOnChange}
                    error={!!errors.guest_name}
                    helperText={errors.guest_name}
                  />
                )}
              </Typography>

              <Grid className="bookingDetals" container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2">Email ID</Typography>

                  <Typography variant="subtitle1" sx={{ display: "flex" }}>
                    {!isEdit ? (
                      <>
                        <span id="guest_email_display">
                          {updateData.guest_email}
                        </span>
                        <Box
                          sx={{ marginLeft: "10px" }}
                          onClick={() => copyContent("guest_email_display")}
                        >
                          <CopyIcon />
                        </Box>
                      </>
                    ) : (
                      <TextField
                        id="guest_email_input"
                        name="guest_email"
                        value={updateData.guest_email}
                        onChange={handleOnChange}
                        error={!!errors.guest_email}
                        helperText={errors.guest_email}
                      />
                    )}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2">Ph. No</Typography>

                  <Typography variant="subtitle1" sx={{ display: "flex" }}>
                    {!isEdit ? (
                      <>
                        <span id="guest_phone_input">
                          {updateData.guest_phone}
                        </span>
                        <Box
                          sx={{ marginLeft: "10px" }}
                          onClick={() => copyContent("guest_phone_input")}
                        >
                          <CopyIcon />
                        </Box>
                      </>
                    ) : (
                      // updateData.guest_phone
                      <TextField
                        id="guest_phone_input"
                        name="guest_phone"
                        value={updateData.guest_phone}
                        onChange={handleOnChange}
                        error={!!errors.guest_phone}
                        helperText={errors.guest_phone}
                      />
                    )}
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
                    {formatDatesToOrdinal([bookingDetailsData.createdAt])}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2">Day Passes</Typography>

                  <Typography variant="subtitle1">
                    {bookingDetailsData.payment_id?.day_passes}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2">Visit Date</Typography>

                  <Typography variant="subtitle1">
                    {Array.isArray(bookingDetailsData.visit_dates)
                      ? bookingDetailsData.visit_dates.map((date: string) =>
                          formatDatesToOrdinal([date])
                        )
                      : null}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2">
                    Total Cost (Exclusive GST)
                  </Typography>

                  <Typography variant="subtitle1" sx={{ display: "flex" }}>
                    ₹{bookingDetailsData.payment_id?.sub_total_cost}
                    <Box sx={{ marginLeft: "8px", marginTop: "4px" }}>
                      <InfoIcon />
                    </Box>
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2">Payment Method</Typography>

                  <Typography variant="subtitle1">
                    {bookingDetailsData.payment_id?.payment_method ?? "Pending"}
                  </Typography>
                </Grid>
              </Grid>

              <Divider />

              <Typography variant="h6" sx={{ my: "10px" }}>
                Guest Details
              </Typography>

              <Typography variant="body2">Name</Typography>

              <Typography variant="subtitle1" sx={{ marginBottom: "0px" }}>
                {!isEdit ? (
                  updateData.guest_name
                ) : (
                  <TextField name="guest_name" value={updateData.guest_name} />
                )}
              </Typography>

              <Typography
                variant="subtitle2"
                sx={{ marginTop: "0px", marginBottom: "10px" }}
              >
                Reserver
              </Typography>

              <Typography variant="body2">
                {bookingDetailsData.identification_info}
              </Typography>

              <Typography variant="subtitle1" sx={{ display: "flex" }}>
                {/* {bookingDetailsData.identification_id} */}

                {!isEdit ? (
                  <>
                    <span id="guest_identification_id">
                      {bookingDetailsData.identification_id}
                    </span>
                    <Box
                      sx={{ marginLeft: "10px", color: "skyblue" }}
                      onClick={() => copyContent("guest_identification_id")}
                    >
                      <CopyIcon />
                    </Box>
                  </>
                ) : (
                  <TextField
                    name="identification_id"
                    value={updateData.identification_id}
                    onChange={handleOnChange}
                    error={!!errors.identification_id}
                    helperText={errors.identification_id}
                  />
                )}
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "space-between",  }}>
                <Typography variant="subtitle2">Check-In Status</Typography>

                <Switch   inputProps={{ "aria-label": "controlled" }} defaultChecked color="default" />
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
              {updateData.invitee?.length > 0 ? (
                updateData.invitee.map((inviteDetails: any) => {
                  const inviteeErrors = inviteErrors[inviteDetails._id] || {};
                  return (
                    <React.Fragment key={inviteDetails._id}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Typography variant="body2">Name</Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ marginBottom: "0px" }}
                          >
                            {!isEdit ? (
                              inviteDetails.invitee_name
                            ) : (
                              <TextField
                                name="invitee_name"
                                value={inviteDetails.invitee_name}
                                onChange={(e) =>
                                  handleInviteeChange(e, inviteDetails._id)
                                }
                                error={!!inviteeErrors.invitee_name}
                                helperText={inviteeErrors.invitee_name}
                              />
                            )}
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
                            {!isEdit ? (
                              inviteDetails.invitee_email
                            ) : (
                              <TextField
                                name="invitee_email"
                                value={inviteDetails.invitee_email}
                                onChange={(e) =>
                                  handleInviteeChange(e, inviteDetails._id)
                                }
                                error={!!inviteeErrors.invitee_email}
                                helperText={inviteeErrors.invitee_email}
                              />
                            )}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          
                        }}
                      >
                        <Typography variant="subtitle2">
                          Check-In Status
                        </Typography>

                        <Switch inputProps={{ "aria-label": "controlled" }} defaultChecked color="default" />
                      </Box>

                      <Typography variant="subtitle2">Assign Desk</Typography>
                      <FormControl fullWidth sx={{ py: "6px" }}>
                        <InputLabel
                          sx={{ color: "black", position: "absolute" }}
                        >
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
                    </React.Fragment>
                  );
                })
              ) : (
                <Typography>No invitees available.</Typography>
              )}

              <Divider />

              <Typography variant="h6">Special Requests</Typography>

              <Typography variant="subtitle2">
                {!isEdit ? (
                  updateData.special_request
                ) : (
                  <TextField
                    name="special_request"
                    value={updateData.special_request}
                    onChange={handleOnChange}
                  />
                )}
              </Typography>

              <Divider />

              <Typography variant="h6">Promotions Applied</Typography>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2">Discount Given</Typography>

                  <Typography variant="subtitle1">
                    {bookingDetailsData.payment_id?.discount}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2">Coupon Used</Typography>

                  <Typography variant="subtitle1">
                    {bookingDetailsData.payment_id?.coupon_code}
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
                      sx={{
                        fontWeight: "400",
                        fontSize: "14px",
                        color: "#717171",
                      }}
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
        </FormControl>
      ) : null}
    </ThemeProvider>
  );
};

export default BookingDetails;
