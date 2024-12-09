// FilterModal.tsx
import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onApplyFilter: (filter: string) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ open, onClose, onApplyFilter }) => {
  const [filter, setFilter] = React.useState("");
   console.log("filter >>>",filter)
  const handleApply = () => {
    onApplyFilter(filter);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ padding: 2, width: 300, margin: "auto", backgroundColor: "white" }}>
        <Typography variant="h6">Filter</Typography>
        <TextField
          fullWidth
          label="Filter Text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ marginTop: 2 }}
        />
        <Button
          fullWidth
          onClick={handleApply}
          sx={{ marginTop: 2 }}
        >
          Apply
        </Button>
      </Box>
    </Modal>
  );
};

export default FilterModal;

