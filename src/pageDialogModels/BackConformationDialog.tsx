import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

function BackConformationDialog({ open, onConfirm, onCancel }) {
  return (
    <Dialog open={open}>
      <DialogTitle sx={{ fontWeight: 700 }} color="primary">
        Confirmation
      </DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to go back?</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onCancel} color="primary">
          No
        </Button>
        <Button variant="contained" onClick={onConfirm} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BackConformationDialog;
