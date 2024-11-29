import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  DeleteIcon,
  EditeIcon,
  FilterIcon,
  ResentIcon,
  SearchIcon,
} from "../../assets/icons/Desk";
import { useDataContext } from "../DataContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "@mui/material/Modal";
import NewBooking from "../../Components/NewBooking";
import PaymentDetails from "../../Components/PaymentDetails";
import PaymentSuccess from "../../Components/PaymentSuccess";
import DatePicker from "react-multi-date-picker";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const Inventort = () => {
  const {
    bookings,
    isLoading,
    searchBookings,
    searchResults,
    isSearching,
    searchError,
    handleUpdateBooking,
    handleResendPaymentEmail,
  } = useDataContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<Object | string | null>(null);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [booking_type, setBookingType] = useState("");
  const [isOpenNewBooking, setIsOpenNewBooking] = useState(false);

  // const handleOpenNewBooking = () => setIsOpenNewBooking(true);
  // const handleCloseNewBooking = () => setIsOpenNewBooking(false);

  const [bookingStep, setBookingStep] = useState<
    "booking" | "payment" | "payment_success"
  >("booking");
  console.log("bookingStep ::", bookingStep);
  const handleOpenNewBooking = () => setIsOpenNewBooking(true);
  const handleCloseNewBooking = () => setIsOpenNewBooking(true);

  const handleSearch = async () => {
    debugger;
    if (searchQuery.trim() && dates.length > 0) {
      await searchBookings(searchQuery, dates);
      setFilterModalOpen(false);
    } else if (searchQuery.trim() && dates.length == 0) {
      await searchBookings(searchQuery, dates);
    } else if (dates.length > 0) {
      setFilterModalOpen(false);
      await searchBookings(searchQuery, dates);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const displayedData =
    searchResults && searchResults.length > 0
      ? searchResults
      : !searchQuery.trim()
      ? bookings
      : [];
  console.log(displayedData, "all data");

  const toggleFilterModal = () => {
    setFilterModalOpen(!filterModalOpen);
  };

  // const handleApplyFilters = () => {
  //   setFilterModalOpen(false);
  // };

  const handleClearFilters = () => {
    setFilterModalOpen(false);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, rowId: any) => {
    debugger;
    setAnchorEl(event.currentTarget);
    setSelectedRow(rowId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const [open, setOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  // const handleOpenDialog = (booking: any, bookingdata: any) => {
  //   // console.log(booking, ">>>>>>>>>>>>>>>>>>>booking 75");
  //   setBookingType(bookingdata.booking_type);
  // }
  const handleOpenDialog = (booking: any, bookingdata: any) => {
    console.log(booking, ">>>>>>>>>>>>>>>>>>>booking 75");
    setBookingType(bookingdata.booking_type);
    setSelectedBooking(booking);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedBooking(null);
  };

  const handleConfirmCancel = async () => {
    if (selectedBooking) {
      await handleUpdateBooking(selectedBooking);
      setOpen(false);
      setSelectedBooking(null);
      toast.success("Booking canceled successfully!");
    }
  };
  const [dates, setDates] = useState<Array<Date>>([]);

  const handleControlStep = () => {
    if (bookingStep === "booking") {
      setBookingStep("payment");
    } else if (bookingStep === "payment") {
      setBookingStep("payment_success");
      // setBookingStep("booking");
    }
  };
   // const [dates, setDates] = useState<Array<Date>>([]);

    console.log(dates, "selected dates >>>>>>>>>>>>");

    const handleDateChange = (selectedDates: any) => {
      const convertedDates = selectedDates.map(
        (date: any) => date.toDate().toISOString().split("T")[0]
      );
      setDates(convertedDates);
      console.log(convertedDates, "Dates in YYYY-MM-DD format");
    };
  
    return (
      <>
        <div
          style={{
            height: "78px",
          }}
        >
          <ToastContainer position="top-right" autoClose={2000} />
          <Typography
            variant="h5"
            className="text-[#222222] flex "
            sx={{
              height: "23px",
              gap: "0px",
              fontSize: "18px",
              fontWeight: 600,
              lineHeight: "22.5px",
              textAlign: "left",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
              paddingTop: "28px",
              marginLeft: "32px",
            }}
          >
            Flexi Booking
          </Typography>
        </div>
        <div
          style={{ width: "95%", height: "1px", backgroundColor: "#DDDDDD" }}
        ></div>
        <Box sx={{ padding: 2, marginLeft: "2px", width: "98%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Paper
                component="form"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "640px",
                  height: "40px",
                  padding: "0 8px",
                  border: "1px solid #BDBDBD",
                  boxShadow: "none",
                  borderRadius: "4px",
                  marginBottom: "16px",
                  background: "#F7F7F7",
                  marginLeft: "13px",
                }}
              >
                <SearchIcon />
                <InputBase
                  style={{ flex: 1, marginLeft: "6px" }}
                  placeholder="Search"
                  inputProps={{ "aria-label": "search" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Paper>

              <ButtonBase
                sx={{ marginLeft: "9px", marginBottom: "12px" }}
                onClick={toggleFilterModal}
              >
                <FilterIcon />
              </ButtonBase>
            </Box>
            <Button
              variant="contained"
              className="font-normal text-base leading-6"
              sx={{
                width: "168px",
                height: "40px",
                textTransform: "none",
                background: "#343434",
                boxShadow:
                  "0px 3px 2px -2px rgba(0, 0, 0, 0.06), 0px 5px 3px -2px rgba(0, 0, 0, 0.02)",
                borderRadius: "5px",
                marginRight: "3%",
              }}
              onClick={handleOpenNewBooking}
            >
              + New Booking
            </Button>
          </Box>
          <Modal open={isOpenNewBooking} onClose={handleCloseNewBooking}>
            <Box
              sx={{
                position: "absolute",
                right: "60px",
                top: "7%",
              }}
            >
              {bookingStep === "booking" && (
                <NewBooking
                  setIsOpenNewBooking={setIsOpenNewBooking}
                  handleControlStep={handleControlStep}
                />
              )}
              {bookingStep === "payment" && (
                <PaymentDetails
                  handleControlStep={handleControlStep}
                  setIsOpenNewBooking={setIsOpenNewBooking}
                />
              )}

              {bookingStep === "payment_success" && (
                <PaymentSuccess setIsOpenNewBooking={setIsOpenNewBooking} />
              )}
            </Box>
          </Modal>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ position: "sticky" }}>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 400,
                        lineHeight: "16px",
                        textAlign: "left",
                        color: "#717171",
                      }}
                    >
                      BOOKING ID
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 400,
                        lineHeight: "16px",
                        color: "#717171",
                      }}
                    >
                      USER NAME
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 400,
                        lineHeight: "16px",
                        color: "#717171",
                      }}
                    >
                      EMAIL ID
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 400,
                        lineHeight: "16px",
                        color: "#717171",
                      }}
                    >
                      BOOKING TYPE
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 400,
                        lineHeight: "16px",
                        color: "#717171",
                      }}
                    >
                      INVITEES
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 400,
                        lineHeight: "16px",
                        color: "#717171",
                      }}
                    >
                      BOOKING DATE
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 400,
                        lineHeight: "16px",
                        color: "#717171",
                      }}
                    >
                      BOOKING STATUS
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: 400,
                        lineHeight: "16px",
                        color: "#717171",
                      }}
                    >
                      PAYMENT STATUS
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedData.length > 0 ? (
                  displayedData.map((row) => (
                    <TableRow
                      key={row._id}
                      // style={{ backgroundColor: !row.isActive ? "#f5f5f5" : "transparent", pointerEvents: !row.isActive ? "none" : "auto",opacity: !row.isActive ? 0.6 : 1,}}
                    >
                      <TableCell
                        style={{
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "20.3px",
                          color: "#222222",
                        }}
                      >
                        {row.bookingId}
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "20.3px",
                          color: "#222222",
                        }}
                      >
                        {row.guest_name}
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "20.3px",
                          color: "#222222",
                        }}
                      >
                        {row.guest_email}
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "20.3px",
                          color: "#222222",
                        }}
                      >
                        {row.booking_type}
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "20.3px",
                          color: "#222222",
                        }}
                      >
                        {row.invitee.length > 0
                          ? `${row.invitee[0].invitee_name}${
                              row.invitee.length > 1
                                ? ` +${row.invitee.length - 1}`
                                : ""
                            }`
                          : "No Invitees"}
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "20.3px",
                          color: "#222222",
                        }}
                      >
                        {row.visit_dates}
                      </TableCell>
                      <TableCell
                        style={{
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "20.3px",
                          color: "#222222",
                        }}
                      >
                        <Typography
                          sx={{
                            display: "inline-block",
                            backgroundColor: row.isActive
                              ? "#79F2C0"
                              : "#FFBDAD",
                            color: "#42526E",
                            fontWeight: "bold",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            textAlign: "center",
                            width: "auto",
                          }}
                        >
                          {row.isActive ? "Confirmed" : "Cancelled"}
                        </Typography>
                      </TableCell>

                      <TableCell
                        style={{
                          fontSize: "14px",
                          fontWeight: 400,
                          lineHeight: "20.3px",
                          color: "#222222",
                        }}
                      >
                        <Typography
                          sx={{
                            display: "inline-block",
                            backgroundColor: row.payment_id?.payment_status
                              ? "#79F2C0"
                              : "#FFBDAD",
                            color: "#42526E",
                            fontWeight: "bold",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            textAlign: "center",
                            width: "auto",
                          }}
                        >
                          {row.payment_id?.payment_status ? "pending" : "paid"}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <IconButton
                          disabled={!row.isActive}
                          aria-label="more"
                          onClick={(e) => handleMenuOpen(e, row._id)}
                          sx={{
                            // transform: 'translateX(-5%)',
                            backgroundColor: "transparent",
                            boxShadow: "none",
                            border: "none",
                          }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={selectedRow === row._id}
                          onClose={handleMenuClose}
                          sx={{
                            transform: "translateX(-5%)",
                            "& .MuiPaper-root": {
                              boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.05)",
                              border: "1px solid rgba(0, 0, 0, 0.12)",
                            },
                          }}
                        >
                          <MenuItem
                            onClick={() => {
                              handleResendPaymentEmail(row._id);
                              handleMenuClose();
                            }}
                            sx={{ width: "224px", height: "32px" }}
                          >
                            <span style={{ marginRight: "14px" }}>
                              <ResentIcon />
                            </span>
                            <span
                              style={{
                                fontSize: "14px",
                                padding: "2px 4px",
                                color: "#172B4D",
                              }}
                            >
                              {" "}
                              Resend Payment Email
                            </span>
                          </MenuItem>
                          <MenuItem
                            onClick={handleMenuClose}
                            sx={{ width: "224px", height: "32px" }}
                          >
                            <span>
                              <EditeIcon sx={{ marginRight: "14px" }} />
                            </span>
                            <span
                              style={{
                                fontSize: "14px",
                                padding: "2px 4px",
                                color: "#172B4D",
                              }}
                            >
                              Edit Booking
                            </span>
                          </MenuItem>
                          {/* selectedRow */}
                          <MenuItem
                            onClick={() => {
                              handleOpenDialog(selectedRow, row);
                              handleMenuClose();
                            }}
                            sx={{ width: "224px", height: "32px" }}
                          >
                            <span>
                              <DeleteIcon sx={{ marginRight: "14px" }} />
                            </span>
                            <span
                              style={{
                                fontSize: "14px",
                                padding: "2px 4px",
                                color: "#172B4D",
                              }}
                            >
                              {" "}
                              Cancel Booking
                            </span>
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : searchQuery.trim() ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No bookings found for .
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No data Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Dialog Box */}
        <Dialog
          open={open}
          onClose={handleCloseDialog}
          aria-labelledby="confirm-cancel-dialog"
          aria-describedby="confirm-cancel-description"
        >
          <DialogTitle id="confirm-cancel-dialog">
            <span>{"Cancel Booking"}</span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="confirm-cancel-description">
              Are you sure you want to cancel{" "}
              <span className="font-bold">{booking_type} ?</span>
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: "flex-start",
              paddingLeft: "26px",
              width: "199px",
              height: "40px",
              gap: "10px",
              marginBottom: "16px",
            }}
          >
            <Button
              onClick={handleConfirmCancel}
              sx={{
                width: "90px",
                height: "40px",
                padding: "8px 25px",
                gap: "8px",
                background: "#343434",
                color: "#ffffff",
                textTransform: "none",
              }}
              autoFocus
            >
              Confirm
            </Button>
            <Button
              onClick={handleCloseDialog}
              className="bg-[#F7F7F7] rounded-md px-4 py-2"
              sx={{
                background: "#F7F7F7",
                color: "#565E6F",
                width: "90px",
                textTransform: "none",
                height: "40px",
                padding: "8px 25px",
                border: "1px solid #BDBDBD",
                gap: "8px",
                borderRadius: "5px 0px 0px 0px",
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        {/* filter Box */}
        <Dialog
          open={filterModalOpen}
          onClose={toggleFilterModal}
          sx={{
            "& .MuiDialog-paper": {
              width: "426px",
              height: "404px",
            },
          }}
        >
          <DialogTitle sx={{ fontSize: "16px", fontWeight: 500 }}>
            Filters
          </DialogTitle>
          <DialogContent>
            <FormControl sx={{ height: "40px", width: "362px" }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "400",
                  color: "#717171",
                  marginBottom: "10px",
                }}
              >
                Booking Type
              </Typography>
              <Select displayEmpty sx={{ height: "40px" }}>
                <MenuItem value="All" disabled>
                  All
                </MenuItem>
                <MenuItem value="Hot Desk">Hot Desk</MenuItem>
                <MenuItem value="Meeting Room" disabled>
                  Meeting Room
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ marginTop: "50px" }}>
              <Typography
                className="text-sm font-medium"
                sx={{
                  fontWeight: "400",
                  color: "#717171",
                  marginBottom: "10px",
                }}
              >
                Visit Date
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <DatePicker
                  // multiple
                  // minDate={new Date()}
                  range
                  dateSeparator="to"
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
                        height: "40px",
                        width: "362px",
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
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: "20px" }}>
              <Typography
                sx={{
                  fontWeight: "400",
                  color: "#717171",
                  marginBottom: "10px",
                }}
                className="text-sm font-medium "
              >
                Booking Date
              </Typography>
              <DatePicker
                range
                dateSeparator="to"
                render={(value, openCalendar) => (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      padding: "4px 8px",
                      cursor: "pointer",
                      height: "40px",
                      width: "362px",
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
            </FormControl>
          </DialogContent>

          <DialogActions
            className="space-x-4"
            sx={{
              justifyContent: "flex-start",
              paddingLeft: "26px",
              width: "199px",
              height: "40px",
              gap: "6px",
              marginBottom: "26px",
            }}
          >
            <Button
              onClick={handleSearch}
              sx={{
                width: "90px",
                height: "40px",
                padding: "8px 25px",
                gap: "8px",
                background: "#343434",
                color: "#ffffff",
                textTransform: "none",
              }}
            >
              Apply{" "}
            </Button>
            <Button
              onClick={handleClearFilters}
              className="bg-[#F7F7F7] rounded-md px-4 py-2"
              sx={{
                background: "#F7F7F7",
                color: "#565E6F",
                width: "90px",
                textTransform: "none",
                height: "40px",
                padding: "8px 25px",
                border: "1px solid #BDBDBD",
                gap: "8px",
                borderRadius: "5px 0px 0px 0px",
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };


export default Inventort;
