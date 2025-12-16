import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import {
  Alert,
  Container,
  Dialog,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";

import {
  IMyBagProducts,
  ISizeDetail,
  ISizeLocalStorage,
  IProductDetailLocalStorage,
  ISize,
  IMyBagObject,
  IMyBagSummary,
  ICheckOutValidation,
  IError,
} from "../../interface/types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { DialogContent, DialogTitle } from "@mui/material";
import { httpWithoutCredentials } from "../../services/http";
import DeleteConfirmationDialog from "../../pageDialogModels/DeleteConfirmationDialog";
import { useSnackBar } from "../../context/SnackBarContext";
import { Link, useNavigate } from "react-router-dom";
import { DrawerEnum, useDrawer } from "../../context/DrawerContext";
import ProductSizeTable from "./ProductSizeTable";
import NoProductInSizeCard from "./EmptyBag";
import AddToCartDialogModel from "../../pageDialogModels/AddToCartDialog";
import { paths } from "../../routes/paths";
import { useMyBag } from "../../context/MyBagContext";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TermsAndConditionDialog from "../../pageDialogModels/TermsAndConditionDialog";
import { CART_ITEMS_KEY } from "../../constants/Constants";

function ProductWithSizeCard() {
  const { updateMyBagCount } = useMyBag();

  const { updateSnackBarState } = useSnackBar();
  const { drawerState, updateDrawerState } = useDrawer();
  const navigate = useNavigate();

  const [openTermsDialog, setOpenTermsDialog] = useState(false);
  const [myBagProducts, setMyBagProducts] = useState<IMyBagProducts[]>([]);
  const [isGetMyBagIsLoading, setIsGetMyBagIsLoading] = useState(false);
  const [sizeResults, setSizeResults] = useState<ISizeDetail[]>([]);
  const [sizeWithQuantity, setSizeWithQuantity] = useState<ISizeLocalStorage[]>(
    []
  );
  const [selectedProductId, setSelectedProductId] = useState<
    string | undefined
  >();
  const [openAddToCart, setAddToCartOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(
    null
  );
  const [myBagSummary, setMyBagSummary] = useState<IMyBagSummary>({
    itemsPrice: 0,
    itemsCount: 0,
  });
  const [checkOutValidationResult, setCheckOutValidationResult] = useState<
    ICheckOutValidation[]
  >([]);
  const [openCheckOutErrorDialog, setOpenCheckOutErrorDialog] = useState(false);
  const [checkOutErrorMessages, setCheckOutErrorMessages] = useState<IError[]>(
    []
  );

  const fetchMyBagProducts = async () => {
    var localStorageProductData = localStorage.getItem(CART_ITEMS_KEY);

    var localStorageProductParse = localStorageProductData
      ? JSON.parse(localStorageProductData)
      : null;

    const data: IProductDetailLocalStorage[] = localStorageProductParse ?? [];

    if (data && data.length > 0) {
      setIsGetMyBagIsLoading(true);

      await httpWithoutCredentials
        .post<IMyBagObject>("/myBag/getMyBag", data)
        .then((response) => {
          if (response.data && response.data.result) {
            const { result, itemsPrice, itemsCount } = response.data;
            setMyBagProducts(result);
            setMyBagSummary({ itemsPrice, itemsCount });
          } else {
            setMyBagProducts([]);
          }

          setIsGetMyBagIsLoading(false);
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            console.log(error.response.data);
            updateSnackBarState(true, error.response.data.message, "error");
          }
        });
    } else {
      setMyBagProducts([]);
      return;
    }
  };

  useEffect(() => {
    if (drawerState.isMyBagDrawerOpen) {
      fetchMyBagProducts();
    }
  }, [drawerState.isMyBagDrawerOpen]);

  const handleChangeQuantity = (productId: string) => {
    fetchProductSizeResults(productId).then((response) => {
      setSelectedProductId(productId);
      setSizeWithQuantity([]);
      setCheckOutValidationResult([]);
      var localStorageProductData = localStorage.getItem(CART_ITEMS_KEY);

      var localStorageProductParse = localStorageProductData
        ? JSON.parse(localStorageProductData)
        : null;

      const existingCartProducts: IProductDetailLocalStorage[] =
        localStorageProductParse ?? [];

      if (existingCartProducts && existingCartProducts.length > 0) {
        var currentAddToCartProduct = existingCartProducts.find(
          (product) => product.productId === productId
        );

        if (currentAddToCartProduct && currentAddToCartProduct.sizes) {
          var existingSizes = currentAddToCartProduct.sizes;
          setSizeWithQuantity([...existingSizes]);
          setAddToCartOpen(true);
        }
      }
    });
  };

  const fetchProductSizeResults = async (productId: string) => {
    try {
      const response = await httpWithoutCredentials.get<ISize>(
        `/product/getSizesById/${productId}`
      );
      const { sizes } = response.data;
      setSizeResults(sizes);
      setAddToCartOpen(true);
    } catch (error) {
      throw error;
      // console.error("Error fetching size results:", error);
    }
  };

  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmationOpen(false);
    setProductIdToDelete(null);
  };

  const handleDeleteProduct = (product: IMyBagProducts) => {
    setProductIdToDelete(product._id);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
    if (productIdToDelete) {
      var localStorageProductData = localStorage.getItem(CART_ITEMS_KEY);

      var localStorageProductParse = localStorageProductData
        ? JSON.parse(localStorageProductData)
        : null;

      const existingCartProducts: IProductDetailLocalStorage[] =
        localStorageProductParse ?? [];

      const updatedCardProducts = existingCartProducts.filter(
        (item) => item.productId !== productIdToDelete
      );
      localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(updatedCardProducts));

      var _myBagProducts = myBagProducts.filter(
        (item) => item._id !== productIdToDelete
      );
      setMyBagProducts([..._myBagProducts]);
    }

    updateSnackBarState(true, "Product removed successfully.", "success");
    updateMyBagCount();
  };

  const checkProceedToCheckOutValidation = async () => {
    try {
      var localStorageProductData = localStorage.getItem(CART_ITEMS_KEY);
      var localStorageProductParse = localStorageProductData
        ? JSON.parse(localStorageProductData)
        : null;
      const data: IProductDetailLocalStorage[] = localStorageProductParse ?? [];

      const response = await httpWithoutCredentials.post<ICheckOutValidation[]>(
        "/product/checkValidation",
        data
      );

      setCheckOutValidationResult(response.data);

      const hasErrors = response.data.find(
        (validation) => validation.errors.length > 0
      );

      if (hasErrors) {
        let a = (
          <>
            Error! click <ErrorOutlineIcon sx={{ color: "red", ml: 1 }} />
          </>
        );
        updateSnackBarState(true, a, "error");
      } else if (!hasErrors) {
        setOpenTermsDialog(true);
        setCheckOutErrorMessages([]);
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
        updateSnackBarState(true, error.response.data.message, "error");
      }
      // throw(error)
      // console.error("Error fetching size results:", error);
    }
  };

  const handleErrorProduct = (product: IMyBagProducts) => {
    const checkValidationResult = checkOutValidationResult.find(
      (validation) => validation.productId === product._id
    );

    if (checkValidationResult && checkValidationResult.errors.length > 0) {
      setCheckOutErrorMessages(checkValidationResult.errors);
      setOpenCheckOutErrorDialog(true);
    } else {
      // updateSnackBarState(true, "Product removed successfully.", "success");
    }
  };

  const handleTermsAccept = () => {
    setOpenTermsDialog(false);
    navigate(paths.CHECKOUT);
    updateDrawerState(DrawerEnum.MyBag);
  };

  const moveToCheckout = () => {
    checkProceedToCheckOutValidation();
  };
  return (
    <>
      <Container
        sx={{
          overflow: "auto",
          height: "calc(90vh - 100px)",
        }}
      >
        {myBagProducts && myBagProducts.length > 0
          ? myBagProducts.map((product, index) => {
              const checkValidationResult = checkOutValidationResult.find(
                (validation) => validation.productId === product._id
              );

              return (
                <Box my={2} key={index}>
                  <Card sx={{ boxShadow: 1 }} elevation={0}>
                    <Grid
                      container
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      spacing={2}
                      py={1}
                    >
                      <Grid
                        item
                        xs={2}
                        sx={{
                          paddingLeft: "10px !important",
                        }}
                      >
                        <Link to={`/productDetail/${product._id}`}>
                          <CardMedia
                            sx={{
                              overflow: "hidden",
                              objectFit: "contain",
                              height: "100px",
                            }}
                            image={product.posterURL}
                            component={"img"}
                            onClick={() => {
                              updateDrawerState(DrawerEnum.MyBag);
                            }}
                          />
                        </Link>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography
                          sx={{
                            fontSize: "small",
                            fontWeight: 600,
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {product.productCode}&nbsp;&nbsp;{product.title}
                        </Typography>
                        <Box
                          py={0.5}
                          display={"flex"}
                          gap={1}
                          alignItems={"center"}
                        >
                          <ProductSizeTable
                            sizes={product.sizes}
                          ></ProductSizeTable>

                          <Box
                            sx={{
                              marginTop: "-16px",
                            }}
                          >
                            <Button
                              variant="outlined"
                              size="medium"
                              sx={{
                                padding: "2px 5px",
                              }}
                              onClick={() => handleChangeQuantity(product._id)}
                            >
                              <Typography sx={{ fontSize: "0.6rem" }}>
                                Change Qty.
                              </Typography>
                            </Button>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid
                        xs={1}
                        item
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          gap: 3,
                        }}
                      >
                        {checkValidationResult &&
                          checkValidationResult.errors.length > 0 && (
                            <ErrorOutlineIcon
                              sx={{
                                color: "red",
                              }}
                              onClick={() => handleErrorProduct(product)}
                            ></ErrorOutlineIcon>
                          )}

                        <DeleteIcon
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onClick={() => handleDeleteProduct(product)}
                        ></DeleteIcon>
                      </Grid>
                    </Grid>
                  </Card>
                </Box>
              );
            })
          : !isGetMyBagIsLoading && <NoProductInSizeCard></NoProductInSizeCard>}
      </Container>
      {myBagProducts && myBagProducts.length != 0 && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            height: "100px",
            display: "flex",
            paddingX: 2,
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            boxShadow: 2,
          }}
        >
          <Box>
            <Typography sx={{ fontSize: "small", fontWeight: 600 }}>
              {myBagSummary.itemsCount} items
            </Typography>
            <Typography sx={{ fontSize: "1rem", fontWeight: 600 }}>
              &#8377;&nbsp;{myBagSummary.itemsPrice}
            </Typography>
          </Box>
          <Button variant="contained" size="large" onClick={moveToCheckout}>
            Place Order
          </Button>
        </Box>
      )}

      <TermsAndConditionDialog
        open={openTermsDialog}
        onClose={() => setOpenTermsDialog(false)}
        onAccept={handleTermsAccept}
      />
      <AddToCartDialogModel
        openAddToCart={openAddToCart}
        onClose={() => setAddToCartOpen(false)}
        onAddNowClick={() => fetchMyBagProducts()}
        sizeResults={sizeResults}
        productDetailLocalStorage={
          {
            productId: selectedProductId,
            sizes: [...sizeWithQuantity],
          } as IProductDetailLocalStorage
        }
      />

      <DeleteConfirmationDialog
        deleteConfirmationOpen={deleteConfirmationOpen}
        handleDeleteConfirmationClose={handleDeleteConfirmationClose}
        handleDeleteConfirmation={handleDeleteConfirmation}
      />

      <Dialog
        open={openCheckOutErrorDialog}
        onClose={() => setOpenCheckOutErrorDialog(false)}
      >
        <DialogTitle>
          <strong>Error</strong>
          <CloseIcon
            sx={{ position: "absolute", right: 10, top: 20 }}
            onClick={() => setOpenCheckOutErrorDialog(false)}
          />
        </DialogTitle>
        <Divider />
        <DialogContent>
          <List
            sx={{
              listStyleType: "disc",
              pl: 4,
              "& .MuiListItem-root": {
                display: "list-item",
              },
            }}
          >
            {checkOutErrorMessages.map((error, index) => (
              <ListItem key={index}>
                <ListItemText primary={error.error} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProductWithSizeCard;
