import React, { useEffect, useRef, useState } from "react";
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
import DatePicker, { DateObject } from "react-multi-date-picker";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CloseIcon from "@mui/icons-material/Close";
import PaymentSuccess from "../../Components/PaymentSuccess";
import PaymentDetails from "../../Components/PaymentDetails";
import BookingDetails from "../../Components/BookingDetails";
import { useNavigate } from "react-router-dom";
import CircularLoader from "../../Components/CircularLoader";



interface BookingDetailsDataRow {

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

const Inventory = () => {
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
  const [isBookingDetailsModalOpen, setIsBookingDetailsModalOpen] = useState(false);
  const [isEdit,setIsEdit] = useState(false);
  const [bookingDetailsData, setBookingDetailsData] =
    useState<BookingDetailsDataRow | null>(null);

  console.log("bookingDetailsData", bookingDetailsData);

  const handleOpenNewBooking = () => setIsOpenNewBooking(true);
  const handleCloseNewBooking = () => setIsOpenNewBooking(true);

  const [bookingStep, setBookingStep] = useState<
    "booking" | "payment" | "payment_success"
  >("booking");

  // const handleControlStep = (
  //   step: "booking" | "payment" | "payment_success"
  // ) => {
  //   setBookingStep(step)
    // if (bookingStep === "booking") {
    //   setBookingStep("payment");
    // } else if (bookingStep === "payment") {
    //   setBookingStep("payment_success");
    // }
  // const handleControlStep = () => {
  //   if (bookingStep === "booking") {
  //     setBookingStep("payment");
  //   } else if (bookingStep === "payment") {
  //     setBookingStep("payment_success");
  //   }
  // };

  const handleControlStep = (direction: "next" | "back") => {
    if (direction === "next") {
      if (bookingStep === "booking") {
        setBookingStep("payment");
      } else if (bookingStep === "payment") {
        setBookingStep("payment_success");
      }
    } else if (direction === "back") {
      if (bookingStep === "payment") {
        setBookingStep("booking");
      } else if (bookingStep === "payment_success") {
        setBookingStep("payment");
      }
    }
  };

  const handleSearch = async () => {
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

    // useEffect(() => {
    //   const timer = setTimeout(() => {
    //     if (searchQuery.trim() || dates.length > 0) {
    //       searchBookings(searchQuery, dates);
    //     }
    //   }, 500); // 500ms debounce time
  
    //   return () => clearTimeout(timer); // Cleanup the timeout on every re-render
    // }, [searchQuery]);

  const displayedData =
    searchResults && searchResults.length > 0
      ? searchResults
      : !searchQuery
      ? bookings
      : [];

  const toggleFilterModal = () => {
    setFilterModalOpen(!filterModalOpen);
  };

  const handleClearFilters = () => {
    setFilterModalOpen(false);
    setDates([]);
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

  // const handleConfirmCancel = async () => {
  //   if (selectedBooking) {
  //     await handleUpdateBooking(selectedBooking); 
  //     setOpen(false);
  //     setSelectedBooking(null);
  //     toast.success("Booking canceled successfully!");
  //   }
  // };

  const handleConfirmCancel = async () => {
    if (selectedBooking) {
      try {
        await handleUpdateBooking(selectedBooking); 
        await searchBookings(searchQuery, dates); 
        setOpen(false);
        setSelectedBooking(null);
        toast.success("Booking canceled successfully!");
      } catch (error) {
        toast.error("Failed to cancel booking. Please try again.");
      }
    }
  };
  const [dates, setDates] = useState<Array<Date>>([]);

  console.log(dates, "selected dates >>>>>>>>>>>>");

  const handleDateChange = (selectedDates: any) => {
    const convertedDates = selectedDates.map(
      (date: any) => date.toDate().toISOString().split("T")[0]
    );
    setDates(convertedDates);
    console.log(convertedDates, "Dates in YYYY-MM-DD format");
  };

  const [bookingTypes, setBookingTypes] = useState("Hot Desk");
  const [state, setState] = useState({
    mainPosition: "bottom",
    relativePosition: "center",
    fixMainPosition: true,
    fixRelativePosition: true,
    offsetY: 0,
    offsetX: 5,
  });

  const {
    mainPosition,
    relativePosition,
    fixMainPosition,
    fixRelativePosition,
    offsetY,
    offsetX,
  } = state;

  const [calendarOpen, setCalendarOpen] = useState(false);
  const pickerRef = useRef(null);
  const navigate = useNavigate();

  const handleGetBookingDetails = async (row: any) => {
    setBookingDetailsData(row);
    setIsBookingDetailsModalOpen(true);
    setIsEdit(true);
    // navigate("/booking-details", { state: { row } });
  };

  const handleBookingDetails = async (row: any) => {
    setBookingDetailsData(row);
    setIsBookingDetailsModalOpen(true);
    setIsEdit(false);
    // navigate("/booking-details", { state: { row } });
  };

  const handleOpenBookingDetailsModal = () => {
    setIsBookingDetailsModalOpen(true);
  };

  const handleCloseBookingDetailsModal = () => {
    setIsBookingDetailsModalOpen(false);
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
              right: "72px",
              top: "7.5%",
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
              <PaymentSuccess 
              setIsOpenNewBooking={setIsOpenNewBooking} 
              setBookingStep = {setBookingStep} 
              />
            )}
          </Box>
        </Modal>

     
        <Modal
          open={isBookingDetailsModalOpen}
          onClose={handleCloseBookingDetailsModal}
        >
          <Box
            sx={{
              position: "absolute",
              top: "5%",
              right: "0%",
            }}
          >
            {bookingDetailsData && (
              <BookingDetails bookingDetailsData={bookingDetailsData} setIsEdit = {setIsEdit} isEdit = {isEdit} />
            )}
          </Box>
        </Modal>
          <TableContainer sx={{ maxHeight: "calc(100vh - 290px)" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow style={{ position: "sticky" }}>
                <TableCell>
                  <Typography   sx={{fontSize: "12px",fontWeight: 400,lineHeight: "16px",textAlign: "left",color: "#717171",  whiteSpace: "nowrap", // Prevents text wrapping
      overflow: "hidden", // Ensures the text stays within bounds
      textOverflow: "ellipsis",}}>BOOKING ID</Typography> 
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
                  <TableRow key={row._id}>
                    <TableCell
                      style={{
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20.3px",
                        color: "#222222",
                      }}
                      onClick={() => handleBookingDetails(row)}
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
                     {Array.isArray(row.visit_dates) && row.visit_dates.length > 1
    ? `${new Date(row.visit_dates[0]).toISOString().split('T')[0]} - ${new Date(row.visit_dates[row.visit_dates.length - 1]).toISOString().split('T')[0]}`
    : new Date(row.visit_dates[0] || row.visit_dates).toISOString().split('T')[0]}
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
                          backgroundColor: row.isActive ? "#79F2C0" : "#FFBDAD",
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
                        {row.payment_id?.payment_status ? "Paid" : "Pending"}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <IconButton
                        disabled={!row.isActive}
                        aria-label="more"
                        onClick={(e) => handleMenuOpen(e, row._id)}
                        sx={{
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
                        //  <MenuItem
                        //   onClick={handleMenuClose}
                        //   sx={{ width: "224px", height: "32px" }}
                        // >
                        //   <span>
                        //     <EditeIcon sx={{ marginRight: "14px" }} />
                        //   </span>
                        //   <span
                        //     style={{
                        //       fontSize: "14px",
                        //       padding: "2px 4px",
                        //       color: "#172B4D",
                        //     }}
                        //   >
                        //     Edit Booking
                        //   </span>
                        // </MenuItem> 
                        // <MenuItem>
                          key={row._id}
                          onClick={() => handleGetBookingDetails(row)}
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
                  <CircularLoader />
                   
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                <TableCell colSpan={8} align="center">
                  <CircularLoader />
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
        <IconButton
          aria-label="close"
          onClick={handleClearFilters}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <FormControl sx={{ height: "40px", width: "362px" }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "400", color: "#717171", marginBottom: "10px" }}
            >
              Booking Type *
            </Typography>
            <Select
              value={bookingTypes}
              // displayEmpty
              sx={{ height: "40px" }}
            >
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
              sx={{ fontWeight: "400", color: "#717171", marginBottom: "10px" }}
            >
              Visit Date *
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <DatePicker
                calendarPosition={`${mainPosition}-${relativePosition}`}
                fixMainPosition={fixMainPosition}
                fixRelativePosition={fixRelativePosition}
                offsetY={offsetY}
                offsetX={offsetX}
                // onClose={() => false}
                dateSeparator="to"
                range
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
                      overflow: "auto",
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
                      placeholder="Select dates"
                    />
                    <CalendarTodayIcon style={{ marginLeft: "8px" }} />
                  </Box>
                )}
              />
            </Box>
          </FormControl>
          <FormControl fullWidth sx={{ marginTop: "20px" }}>
            <Typography
              sx={{ fontWeight: "400", color: "#717171", marginBottom: "10px" }}
              className="text-sm font-medium "
            >
              Booking Date
            </Typography>
            <DatePicker
              style={{
                width: "100%",
                height: "26px",
                boxSizing: "border-box",
              }}
              calendarPosition={`${mainPosition}-${relativePosition}`}
              fixMainPosition={fixMainPosition}
              fixRelativePosition={fixRelativePosition}
              offsetY={offsetY}
              offsetX={offsetX}
              // onClose={() => false}
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
                    placeholder="Select dates"
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
            marginBottom: "8px",
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
            {/* clear */}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Inventory;
