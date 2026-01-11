import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface AddressConfirmDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const AddressConfirmDialog = ({
  open,
  onCancel,
  onConfirm,
}: AddressConfirmDialogProps) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Confirm Address</DialogTitle>

      <DialogContent>
        <Typography>Are you sure you want to save this address?</Typography>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>

        <Button variant="contained" onClick={onConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressConfirmDialog;
