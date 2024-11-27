// CancelBookingDialog.tsx
import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

interface CancelBookingDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const CancelBookingDialog: React.FC<CancelBookingDialogProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cancel Booking</DialogTitle>
      <DialogContent>
        Are you sure you want to cancel the booking?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CancelBookingDialog;
