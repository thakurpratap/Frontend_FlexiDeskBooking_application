import React, { useState } from "react";
import {Box,Button,ButtonBase,IconButton,InputBase,Menu,MenuItem,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography,} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DeleteIcon, EditeIcon, FilterIcon, ResentIcon, SearchIcon } from "./assets/icons/Desk";

const Inventory = () => {
  const rows = [
    {id: 10001,name: "Dianne Russell",email: "dianne.r@mail.com",type: "Hot Desk",invitees: "Steve Doe +2", date: "18-07-2023",status: "PENDING",},
    {id: 10002,name: "Jerome Bell", email: "jerome@mail.com",type: "Hot Desk",invitees: "Michael Scott +2",date: "19-07-2023", status: "PAID",  },
    { id: 10003, name: "Wade Warren", email: "w.wade@mail.com", type: "Meeting Room", invitees: "Jim Halpert +5", date: "12-07-2023", status: "PAID" }, 
    { id: 10004, name: "Ralph Edwards", email: "ralph@mail.com", type: "Hot Desk", invitees: "Steve Doe +2", date: "10-07-2023", status: "PAID" }, 
    { id: 10005, name: "Cody Fisher", email: "codyfisher@mail.com", type: "Meeting Room", invitees: "Jim Halpert +3", date: "08-07-2023", status: "PAID" }, 
    { id: 10006, name: "Eleanor Pena", email: "e.pena@mail.com", type: "Meeting Room", invitees: "Dwight Shrute +2", date: "18-06-2023", status: "PAID" }
  ];
 
  return (
    <>
      <div
        style={{
          height: "78px",
        }}
      >
        <Typography variant="h5" className="text-[#222222] flex "
          sx={{height: "23px",gap: "0px",fontSize: "18px",fontWeight: 600,lineHeight: "22.5px",textAlign: "left",textUnderlinePosition: "from-font",
            textDecorationSkipInk: "none",paddingTop: "28px", marginLeft: "32px",}} >Flexi Booking</Typography>
            </div>
      <div
        style={{width: "100%",height: "1px",backgroundColor: "#DDDDDD", }}>
            </div> 
      <Box sx={{ padding: 2 }}>
        <Box
          sx={{display: "flex",justifyContent: "",alignItems: "center",marginBottom: 2, }}>
          <Paper     
            component="form"
            sx={{display: "flex",alignItems: "center",width: "640px",height: "40px",padding: "0 8px",border: "1px solid #BDBDBD",boxShadow: "none",borderRadius: "4px",
              marginBottom: "16px",background:"#F7F7F7", }}>
            <SearchIcon/>
            <InputBase
              style={{ flex: 1, marginLeft:"6px" }} placeholder="Search" inputProps={{ "aria-label": "search" }}/>
          </Paper>
            <ButtonBase sx={{marginLeft: "9px", marginBottom:"12px",}}>   
               <FilterIcon/> 
               </ButtonBase>
          <Button
            variant="contained"
            className="font-normal text-base leading-6"
            sx={{
              width: "168px",
              height: "40px",
              textTransform: "none",
              background: "#343434",
              boxShadow:"0px 3px 2px -2px rgba(0, 0, 0, 0.06), 0px 5px 3px -2px rgba(0, 0, 0, 0.02)",
              borderRadius: "5px",
              marginLeft:"35%"
            }}
          >
            + New Booking
          </Button>
        </Box>

        <TableContainer>
          <Table>
            {/* <TableHead> */}
              {/* <TableRow > */}
                <TableCell>
                  <Typography   sx={{fontSize: "12px",fontWeight: 400,lineHeight: "16px",textAlign: "left",color: "#717171",}}>BOOKING ID</Typography> 
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: "12px",fontWeight: 400,lineHeight: "16px",color: "#717171",}}>USER NAME</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: "12px",fontWeight: 400,lineHeight: "16px",color: "#717171",}}>EMAIL ID</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: "12px",fontWeight: 400,lineHeight: "16px",color: "#717171",}}>BOOKING TYPE</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: "12px",fontWeight: 400,lineHeight: "16px",color: "#717171",}}>INVITEES</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: "12px",fontWeight: 400,lineHeight: "16px",color: "#717171",}}>BOOKING DATE</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: "12px",fontWeight: 400,lineHeight: "16px",color: "#717171",}}>STATUS</Typography>
                </TableCell>
              {/* </TableRow> */}
            {/* </TableHead> */}
            <TableBody>
              {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{fontSize: "14px",fontWeight: 400,lineHeight: "20.3px",color: "#222222",}} >{row.id}</TableCell>
                  <TableCell style={{fontSize: "14px",fontWeight: 400,lineHeight: "20.3px",color: "#222222",}}>{row.name}</TableCell>
                  <TableCell style={{fontSize: "14px",fontWeight: 400,lineHeight: "20.3px",color: "#222222",}}>{row.email}</TableCell>
                  <TableCell style={{fontSize: "14px",fontWeight: 400,lineHeight: "20.3px",color: "#222222",}}>{row.type}</TableCell>
                  <TableCell style={{fontSize: "14px",fontWeight: 400,lineHeight: "20.3px",color: "#222222",}}>{row.invitees}</TableCell>
                  <TableCell style={{fontSize: "14px",fontWeight: 400,lineHeight: "20.3px",color: "#222222",}}>{row.date}</TableCell>
                  <TableCell style={{fontSize: "14px",fontWeight: 400,lineHeight: "20.3px",color: "#222222",}}>
                    <Typography
                      sx={{display: "inline-block",backgroundColor:row.status === "PENDING" ? "#FFBDAD" : "#79F2C0",color: "#42526E",fontWeight: "bold",padding: "4px 8px",
                        borderRadius: "4px",textAlign: "center", width: "auto" }} >
                      {row.status}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <IconButton
                      aria-label="more"
                      // onClick={(e) => handleMenuOpen(e, row.id)}
                    >
                      <MoreVertIcon />
                    </IconButton>

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
              {/* ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Inventory;
