import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { paths } from "../routes/paths";
import { DrawerEnum, useDrawer } from "../context/DrawerContext";

interface ITermsAndConditionDialogProps {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
}

function TermsAndConditionDialog(props: ITermsAndConditionDialogProps) {
  const { open, onClose, onAccept } = props;
  const { updateDrawerState } = useDrawer();

  const termsAndConditions = [
    "No cancellation allowed once your orders are booked, so please make sure you select correct sizes and designs.",
    "By proceeding to checkout, you confirm that all information provided is accurate and up-to-date.",
    "We reserve the right to cancel any order placed through the checkout page if deemed necessary.",
    "Shipping times may vary, and we are not responsible for delays beyond our control.",
    <span>
      To know more details about Shipping, Tracking, Return & Exchange Policies,
      Please do checkout &nbsp;
      <Link
        to={paths.PRIVACYPOLICY}
        onClick={() => {
          updateDrawerState(DrawerEnum.MyBag);
        }}
      >
        here
      </Link>
      .
    </span>,
  ];

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>Terms & Conditions</Typography>
            <CloseIcon onClick={onClose}></CloseIcon>
          </Box>
        </DialogTitle>
        <Divider></Divider>
        <DialogContent>
          <Typography variant="body1">
            Please read and agree to the following terms and conditions:
          </Typography>
          {termsAndConditions && termsAndConditions.length > 0 && (
            <ol>
              {termsAndConditions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          )}
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" color="primary" onClick={onAccept}>
            Accept and Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TermsAndConditionDialog;
