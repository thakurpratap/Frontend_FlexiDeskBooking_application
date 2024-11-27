import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonBase,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
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
import Modal from "@mui/material/Modal";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  DeleteIcon,
  EditeIcon,
  FilterIcon,
  ResentIcon,
  SearchIcon,
} from "./assets/icons/Desk";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useDataContext } from "./pages/DataContext";
import NewBooking from "./Components/NewBooking";
const Inventory = () => {
  const { bookings, isLoading, searchBookings, searchResults, isSearching } =
    useDataContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<number | string | null>(null);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpenNewBooking, setIsOpenNewBooking] = useState(false);

  const handleOpenNewBooking = () => setIsOpenNewBooking(true);
  const handleCloseNewBooking = () => setIsOpenNewBooking(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await searchBookings(searchQuery);
    }
  };

  const displayedBookings =
    searchResults && searchResults.length > 0 ? searchResults : bookings;

  const toggleFilterModal = () => {
    setFilterModalOpen(!filterModalOpen);
  };

  const handleApplyFilters = () => {
    setFilterModalOpen(false);
  };

  const handleClearFilters = () => {
    setFilterModalOpen(false);
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    rowId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(rowId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  if (isLoading || isSearching) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <>
      <div
        style={{
          height: "78px",
        }}
      >
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
        style={{ width: "100%", height: "1px", backgroundColor: "#DDDDDD" }}
      ></div>
      <Box sx={{ padding: 2, marginLeft: "2px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Paper
            onSubmit={handleSearch}
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
              marginLeft: "35%",
            }}
            onClick={handleOpenNewBooking}
          >
            + New Booking
          </Button>
          <Modal open={isOpenNewBooking} onClose={handleCloseNewBooking}>
            <Box
              sx={{
                position: "absolute",
                right: "60px",
                top: "9%",
              }}
            >
              <NewBooking setIsOpenNewBooking={setIsOpenNewBooking} />
            </Box>
          </Modal>
        </Box>

        <TableContainer>
          <Table>
            {/* <TableHead> */}
            {/* <TableRow > */}
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
            {/* <TableCell>
                  <Typography sx={{ fontSize: "12px",fontWeight: 400,lineHeight: "16px",color: "#717171",}}>BOOKING STATUS</Typography>
                </TableCell> */}
            <TableCell>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "16px",
                  color: "#717171",
                }}
              >
                STATUS
              </Typography>
            </TableCell>
            {/* </TableRow> */}
            {/* </TableHead> */}
            <TableBody>
              {bookings.length > 0 ? (
                bookings.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell
                      style={{
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20.3px",
                        color: "#222222",
                      }}
                    >
                      {row._id.slice(0, 5)}
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
                      {row.createdAt.substring(0, 10)}
                    </TableCell>
                    {/* <TableCell style={{fontSize: "14px",fontWeight: 400,lineHeight: "20.3px",color: "#222222",}}>{row.company_name}</TableCell> */}

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
                          backgroundColor: row.guest_checkin_status
                            ? "#FFBDAD"
                            : "#79F2C0",
                          color: "#42526E",
                          fontWeight: "bold",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          textAlign: "center",
                          width: "auto",
                        }}
                      >
                        {/* {row.guest_checkin_status} */}
                        {row.payment_status ? "PAID" : "Pending"}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <IconButton
                        aria-label="more"
                        onClick={(e) => handleMenuOpen(e, row.id)}
                        sx={{
                          transform: "translateX(-5%)",
                          backgroundColor: "transparent",
                          boxShadow: "none",
                          border: "none",
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && selectedRow === row.id}
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
                          onClick={handleMenuClose}
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
                        <MenuItem
                          onClick={handleMenuClose}
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

      {/* Filter Modal */}
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
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "18px" }}>
          Filter Options
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ marginBottom: "16px" }}>
            <Typography variant="subtitle1">Booking Type</Typography>
            <Select
              // value={bookingType}
              // onChange={(e) => setBookingType(e.target.value)}
              displayEmpty
              sx={{ marginTop: "8px" }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Hot Desk">Hot Desk</MenuItem>
              <MenuItem value="Meeting Room">Meeting Room</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: "16px" }}>
            <Typography className="text-sm font-medium">Visit Date</Typography>
            <TextField
              // value={visitDate}
              // onChange={(e) => setVisitDate(e.target.value)}
              className="mt-1 border border-gray-300 rounded-lg"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <CalendarTodayIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: "16px" }}>
            <Typography className="text-sm font-medium">
              Booking Date
            </Typography>
            <TextField
              // value={bookingDate}
              // onChange={(e) => setBookingDate(e.target.value)}
              className="mt-1 border border-gray-300 rounded-lg"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <CalendarTodayIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </DialogContent>

        <DialogActions className="space-x-4">
          <Button
            onClick={handleClearFilters}
            className="bg-[#F7F7F7] rounded-md px-4 py-2"
          >
            Cancel
          </Button>
          <Button
            onClick={handleApplyFilters}
            className="bg-[#343434] rounded-md px-4 py-2"
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Inventory;
