import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import Slider from "react-slick";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useProductDetailById } from "../../CustomHooksRQ/Category/Hooks";
import {
  CART_ITEMS_KEY,
  ProductDetailsSliderSettings,
} from "../../constants/Constants";
import { IProductDetailLocalStorage } from "../../interface/types";
import { useMyBag } from "../../context/MyBagContext";
import { useSnackBar } from "../../context/SnackBarContext";
import { calculateDiscountPercentage } from "../../common/utils/util";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface ProductState {
  selectedSize: string;
  selectedPrice: number;
  selectedMRPprice: number;
  selectedNetWeight: number;
}

function ProductDetail() {
  const { productId } = useParams();
  const { updateMyBagCount } = useMyBag();
  const { updateSnackBarState } = useSnackBar();

  const slider = React.useRef<any>(null);

  const onError = (error: any) => {
    console.log(error);
    updateSnackBarState(true, error.response.data.message, "error");
  };

  const productDetailQuery = useProductDetailById(productId ?? "", onError);
  const [selectedPriceandSize, setSelectedPriceandSize] =
    useState<ProductState>({
      selectedSize: "",
      selectedPrice: 0,
      selectedMRPprice: 0,
      selectedNetWeight: 0,
    });

  useEffect(() => {
    if (productDetailQuery.data) {
      if (productDetailQuery.data.sizes.length > 0) {
        const { size, price, MRPprice, netWeight } =
          productDetailQuery.data.sizes[0];
        setSelectedPriceandSize({
          selectedSize: size,
          selectedPrice: price,
          selectedMRPprice: MRPprice,
          selectedNetWeight: netWeight,
        });
      }
    }
  }, [productDetailQuery.data]);

  const handleSizeChange = (event: any) => {
    const selectedSize = event.target.value;
    let selectedPrice = 0;
    let selectedMRPprice = 0;
    let selectedNetWeight = 0;
    if (
      productDetailQuery &&
      productDetailQuery.data &&
      productDetailQuery.data?.sizes.length > 0
    ) {
      selectedPrice =
        productDetailQuery.data.sizes.find(
          (option) => option.size === selectedSize
        )?.price || 0;
      selectedMRPprice =
        productDetailQuery.data.sizes.find(
          (option) => option.size === selectedSize
        )?.MRPprice || 0;
      selectedNetWeight =
        productDetailQuery.data.sizes.find(
          (option) => option.size === selectedSize
        )?.netWeight || 0;
    }

    setSelectedPriceandSize({
      selectedSize,
      selectedPrice,
      selectedMRPprice,
      selectedNetWeight,
    });
  };

  const handleAddToCard = () => {
    var localStorageProductData = localStorage.getItem(CART_ITEMS_KEY);

    var localStorageProductParse = localStorageProductData
      ? JSON.parse(localStorageProductData)
      : null;
    const existingProducts: IProductDetailLocalStorage[] =
      localStorageProductParse ?? [];
    const existingProductIndex = existingProducts.findIndex(
      (product) => product.productId === productId
    );
    if (existingProductIndex !== -1) {
      const existingProduct = existingProducts[existingProductIndex];

      const foundSize = existingProduct.sizes.find(
        (size) => size.size === selectedPriceandSize.selectedSize
      );
      if (foundSize) {
        var _updatedSizes = existingProduct.sizes.map((size) => {
          if (size.size === selectedPriceandSize.selectedSize) {
            size.qty += 1;
          }
          return size;
        });

        existingProduct.sizes = _updatedSizes;
      } else {
        existingProduct.sizes.push({
          size: selectedPriceandSize.selectedSize,
          qty: 1,
          netWeight: selectedPriceandSize.selectedNetWeight,
        });
      }
    } else {
      const newItem = {
        productId: productId || "",
        sizes: [
          {
            size: selectedPriceandSize.selectedSize,
            qty: 1,
            netWeight: selectedPriceandSize.selectedNetWeight,
          },
        ],
      };
      existingProducts.push(newItem);
    }

    localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(existingProducts));
    updateMyBagCount();
    updateSnackBarState(true, "Product added successfully.", "success");
  };

  return (
    <>
      {productDetailQuery && productDetailQuery.data ? (
        <>
          <Container maxWidth={false}>
            <Box my={3} position={"relative"}>
              <Slider {...ProductDetailsSliderSettings} ref={slider}>
                {[productDetailQuery.data.posterURL]
                  .concat(productDetailQuery.data.images)
                  .map(
                    (image, index) =>
                      image && (
                        <Box
                          key={index}
                          component="img"
                          sx={{
                            height: "55vh",
                            width: "100%",
                            display: "block",
                            margin: "1px auto",
                            border: "1px solid whitesmoke",
                            borderRadius: "5px",
                            objectFit: "contain",
                          }}
                          alt="product image"
                          src={image}
                        />
                      )
                  )}
              </Slider>
              <Box>
                <NavigateBeforeIcon
                  sx={{
                    cursor: "pointer",
                    position: "absolute",
                    left: 10,
                    top: "45%",
                  }}
                  onClick={() => slider?.current?.slickPrev()}
                  color="primary"
                  fontSize={"large"}
                />
                <NavigateNextIcon
                  sx={{
                    cursor: "pointer",
                    position: "absolute",
                    right: 10,
                    top: "45%",
                  }}
                  onClick={() => slider?.current?.slickNext()}
                  color="primary"
                  fontSize={"large"}
                />
              </Box>
            </Box>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: "bold", fontSize: "20px" }}
            >
              {productDetailQuery.data.productCode}&nbsp;&nbsp;
              {productDetailQuery.data.title}
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{ marginRight: 2, fontWeight: 600, fontSize: "medium" }}
              >
                &#8377;
                {selectedPriceandSize.selectedSize
                  ? selectedPriceandSize.selectedPrice
                  : productDetailQuery?.data?.price}
              </Typography>
              <Typography>
                {selectedPriceandSize.selectedPrice <
                  selectedPriceandSize.selectedMRPprice &&
                  selectedPriceandSize.selectedMRPprice !== 0 &&
                  selectedPriceandSize.selectedSize && (
                    <>
                      <span
                        style={{
                          textDecoration: "line-through",
                          opacity: 0.5,
                        }}
                      >
                        &#8377;{selectedPriceandSize.selectedMRPprice}
                      </span>
                      <b
                        style={{
                          marginLeft: "20px",
                          fontSize: "small",
                          color: "green",
                          opacity: 0.6,
                        }}
                      >
                        {calculateDiscountPercentage(
                          selectedPriceandSize.selectedMRPprice,
                          selectedPriceandSize.selectedPrice
                        )}
                        % Offer
                      </b>
                    </>
                  )}
              </Typography>
            </Box>
            <Box sx={{ mt: 0.5 }}>
              <Typography fontWeight="bold" fontSize="14px">
                Sizes:
              </Typography>
              {productDetailQuery.data.sizes &&
                productDetailQuery.data.sizes.length > 0 && (
                  <Box>
                    {productDetailQuery.data.sizes.map((item) => (
                      <Button
                        key={item.size}
                        variant={
                          selectedPriceandSize.selectedSize === item.size
                            ? "contained"
                            : "outlined"
                        }
                        color="primary"
                        sx={{
                          minWidth: "40px",
                          padding: "6px 6px",
                          marginRight: "5px",
                          maxHeight: "20px",
                        }}
                        onClick={handleSizeChange}
                        value={item.size}
                      >
                        {item.size}
                      </Button>
                    ))}
                  </Box>
                )}
            </Box>
            <Typography
              variant="h6"
              gutterBottom
              mt={2}
              sx={{
                fontWeight: "regular",
                fontSize: "15px",
                whiteSpace: "pre-wrap",
              }}
            >
              {productDetailQuery.data.description}
            </Typography>
          </Container>
          <Box
            style={{
              position: "sticky",
              bottom: 0,
            }}
          >
            <Button
              variant="contained"
              style={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: 500,
                borderRadius: 0,
              }}
              onClick={handleAddToCard}
              fullWidth
            >
              <AddShoppingCartIcon
                style={{ paddingRight: "10px", fontSize: "2rem" }}
              />
              Add to Bag
            </Button>
          </Box>
        </>
      ) : (
        productDetailQuery &&
        productDetailQuery.isSuccess && <Box>Product Not Found</Box>
      )}
    </>
  );
}

export default ProductDetail;
