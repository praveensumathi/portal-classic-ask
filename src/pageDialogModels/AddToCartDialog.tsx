import React, { useEffect, useState } from "react";
import {
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import {
  ISizeLocalStorage,
  IProductDetailLocalStorage,
  ISizeDetail,
} from "../interface/types";
import { useSnackBar } from "../context/SnackBarContext";
import { useMyBag } from "../context/MyBagContext";
import { NKS_ITEMS } from "../constants/Constants";

interface IProps {
  openAddToCart: boolean;
  onClose: () => void;
  sizeResults: ISizeDetail[];
  productDetailLocalStorage?: IProductDetailLocalStorage;
  onAddNowClick?(): void;
}

function AddToCartDialogModel(props: IProps) {
  const {
    openAddToCart,
    onClose,
    productDetailLocalStorage,
    sizeResults,
    onAddNowClick,
  } = props;

  const [sizeWithQuantity, setSizeWithQuantity] = useState<ISizeLocalStorage[]>(
    []
  );
  const { updateMyBagCount } = useMyBag();

  const { updateSnackBarState } = useSnackBar();

  useEffect(() => {
    if (
      productDetailLocalStorage &&
      productDetailLocalStorage.sizes &&
      productDetailLocalStorage.sizes.length > 0
    ) {
      setSizeWithQuantity([...productDetailLocalStorage.sizes]);
    }
  }, [productDetailLocalStorage]);

  const handleQtyIncrement = (sizeObj: ISizeDetail) => {
    var itemExist =
      sizeWithQuantity &&
      sizeWithQuantity.length > 0 &&
      sizeWithQuantity.find((item) => item.size === sizeObj.size);

    if (!itemExist) {
      var _sizeObj = {
        size: sizeObj.size,
        qty: sizeObj.inStock > 0 ? 1 : 0,
        netWeight: sizeObj.netWeight
      };

      setSizeWithQuantity((prevSizeWithQuantity) => [
        ...prevSizeWithQuantity,
        _sizeObj,
      ]);
    } else {
      var _localSizeWithQuantity = sizeWithQuantity;

      var currentItem = _localSizeWithQuantity.find(
        (item) => item.size === sizeObj.size
      );

      if (currentItem && currentItem.qty < sizeObj.inStock) {
        _localSizeWithQuantity = _localSizeWithQuantity.map((item) => {
          if (item.size === sizeObj.size) {
            return { ...item, qty: item.qty + 1 };
          }
          return item;
        });
      }

      setSizeWithQuantity([..._localSizeWithQuantity]);
    }
  };

  const handleQtyDecrement = (sizeObj: ISizeDetail) => {
    var itemExist =
      sizeWithQuantity &&
      sizeWithQuantity.length > 0 &&
      sizeWithQuantity.find((item) => item.size === sizeObj.size);

    var currentQty = 0;
    if (itemExist) {
      var currentItem = sizeWithQuantity.find(
        (item) => item.size === sizeObj.size
      );

      var _localSizeWithQuantity = sizeWithQuantity;

      if (currentItem && currentItem.qty - 1 === 0) {
        _localSizeWithQuantity = _localSizeWithQuantity.filter(
          (item) => item.size !== sizeObj.size
        );
      } else {
        _localSizeWithQuantity = _localSizeWithQuantity.map((item) => {
          if (item.size === sizeObj.size) {
            item.qty -= 1;
            currentQty = item.qty;
          }
          return item;
          
        });
      }

      setSizeWithQuantity([..._localSizeWithQuantity]);
    }

    return currentQty;
  };

  const handleAddToCartDialogClose = () => {
    onClose();
    setSizeWithQuantity([]);
  };

  const handleAddNowClick = () => {
    const updatedSizes = sizeWithQuantity.filter((size) => size.qty > 0);

    var localStorageProductData = localStorage.getItem(NKS_ITEMS);

    var localStorageProductParse = localStorageProductData
      ? JSON.parse(localStorageProductData)
      : null;

    const existingCartProducts: IProductDetailLocalStorage[] =
      localStorageProductParse ?? [];

    if (updatedSizes.length === 0) {
      // Remove the product from local storage
      var alreadyExist = existingCartProducts.find(
        (product) => product.productId === productDetailLocalStorage?.productId
      );

      const updatedProducts = existingCartProducts.filter(
        (product) => product.productId !== productDetailLocalStorage?.productId
      );
      localStorage.setItem(NKS_ITEMS, JSON.stringify(updatedProducts));

      // Show the snackbar with a success message for product removal
      if (alreadyExist && updatedSizes.length === 0) {
        onClose();
        updateSnackBarState(true, "Product removed successfully.", "success");
        updateMyBagCount();
      }

      if (!alreadyExist && updatedSizes.length === 0) {
        updateSnackBarState(
          true,
          "Please add a quantity more than 0.",
          "error"
        );
      }
    } else {
      // Update the sizes and store in local storage
      const existingProductIndex = existingCartProducts.findIndex(
        (product) => product.productId === productDetailLocalStorage?.productId
      );

      if (existingProductIndex !== -1) {
        existingCartProducts[existingProductIndex].sizes = updatedSizes;
      } else {
        const newItem: IProductDetailLocalStorage = {
          productId: productDetailLocalStorage?.productId!,
          sizes: updatedSizes,
        };
        existingCartProducts.push(newItem);
      }

      localStorage.setItem(NKS_ITEMS, JSON.stringify(existingCartProducts));
      onClose();
      setSizeWithQuantity([]);

      updateSnackBarState(true, "Product added successfully.", "success");
      updateMyBagCount();
    }
    if (onAddNowClick) {
      onAddNowClick();
    }
  };

  return (
    <>
      <Dialog
        fullWidth
        open={openAddToCart}
        onClose={onClose}
        sx={{
          padding: "10px 0",
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            backgroundColor: "#ece7ee",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: 700 }} color="primary">
              Add To Bag
            </Typography>
            <CloseIcon
              onClick={handleAddToCartDialogClose}
              color="primary"
            ></CloseIcon>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            p: "0px 0px",
            ml: "2px",
          }}
        >
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ p: "5px" }}>
                    <strong>Size</strong>
                  </TableCell>
                  <TableCell align="center" sx={{ p: "5px" }}>
                    <strong>InStock</strong>
                  </TableCell>
                  <TableCell align="center" sx={{ p: "5px" }}>
                    <strong>Price</strong>
                  </TableCell>
                  <TableCell align="center" sx={{ p: "5px" }}>
                    <strong>Quantity</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sizeResults &&
                  sizeResults.map((size, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell component="th" scope="row" align="center">
                        {size.size}
                      </TableCell>
                      <TableCell align="center">{size.inStock}</TableCell>
                      <TableCell align="center"> &#8377;{size.price}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <ButtonGroup
                            className="test"
                            sx={{
                              lineHeight: 1,
                              padding: 0,
                              "& .MuiButtonGroup-grouped": {
                                minWidth: "32px !important",
                              },
                            }}
                            size="small"
                            aria-label="small outlined button group"
                          >
                            <Button
                              color="primary"
                              sx={{
                                lineHeight: 1,
                                padding: 0,
                                "& .MuiButtonGroup-grouped": {
                                  minWidth: "32px !important",
                                },
                              }}
                              size="small"
                              aria-label="small outlined button group"
                              onClick={() => {
                                handleQtyDecrement(size);
                              }}
                            >
                              -
                            </Button>
                            <Button
                              sx={{
                                lineHeight: 1.3,
                                fontWeight: 600,
                                color: "black !important",
                              }}
                              disabled
                            >
                              {sizeWithQuantity &&
                              sizeWithQuantity.length > 0 &&
                              sizeWithQuantity.find(
                                (item) => item.size === size.size
                              )
                                ? sizeWithQuantity.find(
                                    (item) => item.size === size.size
                                  )?.qty
                                : 0}
                            </Button>
                            <Button
                              onClick={() => {
                                handleQtyIncrement(size);
                              }}
                              sx={{
                                lineHeight: 1.3,
                              }}
                            >
                              +
                            </Button>
                          </ButtonGroup>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ textTransform: "none" }}
            onClick={handleAddNowClick}
          >
            Add Now
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddToCartDialogModel;
