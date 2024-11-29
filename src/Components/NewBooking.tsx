import React, { useEffect, useState } from "react";
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
  FormHelperText,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { useNewBookingContext } from "../context_API/NewBookingContext";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { DateIcon } from "../assets/AllNewBookingIcon";
import { EditeIcon } from "../assets/icons/Desk";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { usePaymentDetailsContext } from "../context_API/PaymentDetailsContext";
const NewBooking = ({
  handleControlStep,
  setIsOpenNewBooking,
}: {
  setIsOpenNewBooking: (isOpen: boolean) => void;
  handleControlStep: () => void;
}) => {
  const [hotDesk, setHotDesk] = useState<string>();

  const [document, setDocument] = useState<string>("");
  const [dates, setDates] = useState<Array<Date>>([]);
  const [inviteeData, setInviteeData] = useState<Array<Invitee>>([]);
  const [allDates, setAllDates] = useState<Date[]>([]);

  const [selectedInvitees, setSelectedInvitees] = useState<
    Set<string | undefined>
  >(new Set());
  const [invite, setInvite] = useState<boolean>(false);
  const [invitees, setInvitees] = useState<Invitee[]>([]);
  console.log(invitees);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const { setPaymentDetails } = usePaymentDetailsContext();

  const dayPasses = allDates ? allDates.length * (invitees.length + 1) : 0;
  const totalCost = allDates && invitees ? dayPasses * 1000 : 0;

  useEffect(() => {
    setPaymentDetails(dayPasses, totalCost);
  }, [dayPasses, totalCost, setPaymentDetails]);

  const {
    register: InviteeRegister,
    handleSubmit: handleInvitee,
    formState: { errors: InviteeError },
    reset,
  } = useForm<Invitee>();

  const handleSaveInvitee: SubmitHandler<Invitee> = (data: any) => {
    if (editingIndex !== null) {
      const updatedInvitees = [...invitees];
      updatedInvitees[editingIndex] = data;
      setInvitees(updatedInvitees);
      setEditingIndex(null);
    } else {
      setInvitees([...invitees, data]);
    }
    reset({
      invitee_name: "", // reset invitee_name
      invitee_email: "", // reset invitee_email
    });
  };

  const handleEditInvitee = (index: number) => {
    setEditingIndex(index);
    reset(invitees[index]);
  };

  const handleSelectInvitee = (invitee_email: string) => {
    setSelectedInvitees((prevSelectedInvitees) => {
      const updatedSelectedInvitees = new Set(prevSelectedInvitees);
      if (updatedSelectedInvitees.has(invitee_email)) {
        updatedSelectedInvitees.delete(invitee_email);
      } else {
        updatedSelectedInvitees.add(invitee_email);
      }
      return updatedSelectedInvitees;
    });
  };

  type Invitee = {
    invitee_name?: string;
    invitee_email?: string;
  };

  type NewBookingContextData = {
    booking_type: string;
    visit_dates: Date[];
    guest_name: string;
    guest_email: string;
    guest_phone: number;
    identification_info: string;
    identification_id: string;
    company_name: string;
    invitee: Invitee[];
    special_request?: string;
  };
  const { createNewBooking } = useNewBookingContext();

  const handleDateChange = (dates: DateObject[] | null) => {
    if (!dates) {
      setAllDates([]);
      return;
    }
    const convertedDates = dates.map((dateObject) => dateObject.toDate());
    setAllDates(convertedDates.sort());
    setValue("visit_dates", convertedDates);
  };

  const onSubmit = async (data: any) => {
    try {
      const { invitee_name, invitee_email, ...rest } = data;
      const inviteeArray: Invitee[] =
        invitee_name && invitee_email ? [{ invitee_name, invitee_email }] : [];
      const finalData: NewBookingContextData = {
        ...rest,
        visit_dates: allDates,
        invitee: invitees,
      };

      console.log("Final Form Data:", finalData);
      await createNewBooking(finalData);
      handleControlStep();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleClose = () => {
    if (setIsOpenNewBooking) setIsOpenNewBooking(false);
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
        <Box sx={{ maxHeight: "600px", overflowY: "auto" }}>
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
                  setValue("booking_type", e.target.value);
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
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid #DDDDDD",
                      padding: "8px",
                      borderRadius: "4px",
                    }}
                  >
                    <DatePicker
                      multiple
                      value={allDates.map((date) => new DateObject({ date }))}
                      onChange={handleDateChange}
                      inputClass="datepicker-input"
                      style={{
                        border: "none",
                        width: "20vw",
                      }}
                    />
                    <DateIcon />
                  </Box>

                  {/* {errors.visit_dates && (
                      <FormHelperText sx={{ color: "#D32F2F" }}>
                        {errors.visit_dates.message as string}
                      </FormHelperText>
                    )} */}

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
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: " Name must contain only letters",
                      },
                      minLength: {
                        value: 3,
                        message: "minimum three character",
                      },
                      maxLength: {
                        value: 20,
                        message: "Name cannot exceed 20 characters",
                      },
                    })}
                    error={!!errors.guest_name}
                    helperText={
                      errors.guest_name?.message as string | undefined
                    }
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
                    error={!!errors.guest_email}
                    helperText={
                      errors.guest_email?.message as string | undefined
                    }
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
                    error={!!errors.guest_phone}
                    helperText={
                      errors.guest_phone?.message as number | undefined
                    }
                  />
                  <Typography>Identification Information</Typography>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={document}
                    {...register("identification_info", {
                      required: "Please select a document type",
                    })}
                    onChange={(e: SelectChangeEvent) => {
                      const selectedValue = e.target.value;
                      setDocument(selectedValue); // Update local state
                      setValue("identification_info", selectedValue, {
                        shouldValidate: true,
                      }); // Update form value and trigger validation
                    }}
                    error={!!errors.identification_info}
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
                  {errors.identification_info && (
                    <FormHelperText sx={{ color: "#D32F2F" }}>
                      {errors.identification_info.message as string}
                    </FormHelperText>
                  )}

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
                        error={!!errors.identification_id}
                        helperText={errors.identification_id?.message as string}
                      />

                      <Typography>Company Name</Typography>
                      <TextField
                        type="text"
                        fullWidth
                        placeholder="Enter Company Name"
                        {...register("company_name", {
                          required: "Company Name is required",
                          pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: "Company Name must contain only letters",
                          },
                        })}
                        error={!!errors.company_name}
                        helperText={errors.company_name?.message as string}
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
                          pattern: {
                            value: /^[A-Za-z0-9]+$/,
                            message: "Document ID must be alphanumeric",
                          },
                        })}
                        error={!!errors.identification_id}
                        helperText={errors.identification_id?.message as string}
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
                      onClick={() => setInvite(false)}
                    />
                  ) : (
                    <ControlPointOutlinedIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => setInvite(true)}
                    />
                  )}
                </Box>

                {invite && (
                  <>
                    <Typography>Name*</Typography>
                    <TextField
                      type="text"
                      fullWidth
                      placeholder="Enter Name"
                      {...InviteeRegister("invitee_name", {
                        required: "Name is required",
                        pattern: {
                          value: /^[A-Za-z\s]+$/,
                          message: " Name must contain only letters",
                        },
                        minLength: {
                          value: 3,
                          message: "Minimum three characters required",
                        },
                        maxLength: {
                          value: 20,
                          message: "Name cannot exceed 20 characters",
                        },
                      })}
                      error={!!InviteeError.invitee_name}
                      helperText={InviteeError.invitee_name?.message as string}
                    />
                    <Typography>Email ID*</Typography>
                    <TextField
                      type="email"
                      fullWidth
                      placeholder="Enter Email ID"
                      {...InviteeRegister("invitee_email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Invalid email format",
                        },
                      })}
                      error={!!InviteeError.invitee_email}
                      helperText={InviteeError.invitee_email?.message as string}
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
                        onClick={handleInvitee(handleSaveInvitee)}
                      >
                        {editingIndex !== null ? "Save Changes" : "Save"}
                      </Button>
                      <ClearIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => setInvite(false)}
                      />
                    </Box>
                  </>
                )}

                <Box sx={{ marginTop: "20px" }}>
                  <Typography variant="h6">Invitee List</Typography>
                  {invitees.map((invitee, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                        gap: "10px",
                      }}
                    >
                      <Box
                        onClick={() =>
                          handleSelectInvitee(invitee.invitee_email!)
                        }
                        sx={{
                          width: 16,
                          height: 16,
                          cursor: "pointer",
                          backgroundColor: selectedInvitees.has(
                            invitee.invitee_email
                          )
                            ? ""
                            : "",
                        }}
                      >
                        {selectedInvitees.has(invitee.invitee_email) ? (
                          <CheckBoxOutlineBlankIcon />
                        ) : (
                          <CheckBoxIcon sx={{ color: "black" }} />
                        )}
                      </Box>
                      <Typography sx={{ mx: "10px" }}>
                        {invitee.invitee_name}
                      </Typography>

                      <button
                        onClick={() => handleEditInvitee(index)}
                        style={{ marginTop: "7px" }}
                      >
                        <EditeIcon />
                      </button>
                    </Box>
                  ))}
                </Box>

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
                        {dayPasses}
                        {/* {allDates
                          ? allDates.length * (invitees.length + 1)
                          : ""} */}
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
                        {/* {allDates || invitees
                          ? allDates.length * (invitees.length + 1) * 1000
                          : ""} */}
                        {totalCost}
                      </Box>
                    </Box>
                  </Box>
                  <Divider />
                  <Typography variant="subtitle2">
                    Special Requests (If any)
                  </Typography>
                  <TextField
                    type="text"
                    fullWidth
                    {...register("special_request")}
                  />
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
                    onClick={handleSubmit(onSubmit)}
                  >
                    Next
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ backgroundColor: "white", color: "black" }}
                    onClick={handleClose}
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
