import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormHelperText,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CloseIcon from "@mui/icons-material/Close";
import CallIcon from "@mui/icons-material/Call";
import { ICheckOutValidation } from "../interface/types";

interface IOrderErrorDialogProps {
  openOrderNowErrorDialog: boolean;
  onClose: () => void;
  checkOrderValidation: ICheckOutValidation[];
  openMyBagDrawer: () => void;
}

function OrderErrorDialog(props: IOrderErrorDialogProps) {
  const {
    openOrderNowErrorDialog,
    onClose,
    checkOrderValidation,
    openMyBagDrawer,
  } = props;

  return (
    <Dialog open={openOrderNowErrorDialog} onClose={onClose}>
      <DialogTitle>
        <strong>Error</strong>
        <CloseIcon
          sx={{ position: "absolute", right: 10, top: 20 }}
          onClick={onClose}
        />
      </DialogTitle>
      <Divider />
      <DialogContent
        sx={{
          minHeight: "380px",
          overflowY: "auto",
          padding: "0",
          paddingRight: "12px",
          margin: "0",
          fontSize: "15px",
        }}
      >
        <List
          sx={{
            listStyleType: "disc",
            pl: 3,
            "& .MuiListItem-root": {
              display: "list-item",
            },
          }}
        >
          {checkOrderValidation.length > 0 &&
            checkOrderValidation.map((validation) => (
              <React.Fragment key={validation.productId}>
                <ListItem>
                  <b>Product Code:</b>&nbsp;{validation.productCode ?? ""}
                </ListItem>
                {validation.errors.length > 0 &&
                  validation.errors.map((error, index) => (
                    <Typography
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        fontSize: "15px",
                      }}
                    >
                      <b>
                        <ErrorOutlineIcon fontSize="small" />
                      </b>
                      &nbsp; {error.error}
                    </Typography>
                  ))}
              </React.Fragment>
            ))}
        </List>
      </DialogContent>
      <Box
        position="sticky"
        bottom={0}
        p={1}
        mt={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "#fff",
          boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Button
          variant="contained"
          size="small"
          fullWidth
          onClick={openMyBagDrawer}
        >
          Check MyBag
        </Button>
        <FormHelperText sx={{ fontWeight: "bold", mt: 1, padding: "0" }}>
          (Note: The chosen products are already sold out. Please check your bag
          and review your products)
        </FormHelperText>
      </Box>
    </Dialog>
  );
}

export default OrderErrorDialog;
