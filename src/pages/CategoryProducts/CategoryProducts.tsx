import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import ProductCard from "../../common/components/ProductCard";
import AddToCartDialogModel from "../../pageDialogModels/AddToCartDialog";
import Slider from "react-slick";
import {
  ICategoryWithProducts,
  IProduct,
  IProductDetailLocalStorage,
  ISize,
  ISizeDetail,
  ISizeLocalStorage,
} from "../../interface/types";
import { httpWithoutCredentials } from "../../services/http";
import { useSnackBar } from "../../context/SnackBarContext";
import { useGetProductsByCategoryId } from "../../CustomHooksRQ/Category/Hooks";
import { CART_ITEMS_KEY } from "../../constants/Constants";
import theme from "../../theme/theme";

function CategoryProducts() {
  const [sizeResults, setSizeResults] = useState<ISizeDetail[]>([]);
  const [sizeWithQuantity, setSizeWithQuantity] = useState<ISizeLocalStorage[]>(
    []
  );
  const [selectedProductId, setSelectedProductId] = useState<
    string | undefined
  >();
  const [openAddToCart, setAddToCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState<IProduct[]>([]);
  const [sortByPriceMode, setSortByPriceMode] = useState<string>("");
  const [selectedSizeForFilter, setSelectedSizeForFilter] =
    useState<string>("");

  const isBelowMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { categoryId } = useParams();
  const { updateSnackBarState } = useSnackBar();

  const onError = (error: any) => {
    console.log(error);
    updateSnackBarState(true, error.response.data.message, "error");
  };

  const settings = {
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4.6,
          slidesToScroll: 1,
          arrows: !isBelowMediumScreen,
        },
      },
    ],
  };

  const handleAddToCart = (productId: string) => {
    fetchProductSizeResults(productId)
      .then((res) => {
        setSelectedProductId(productId);
        setSizeWithQuantity([]);

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
            var existingSizesWithQuantity = currentAddToCartProduct.sizes;
            setSizeWithQuantity([...existingSizesWithQuantity]);
            setAddToCartOpen(true);
          }
        }
        console.log(sizeWithQuantity);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.log(error.response.data);
          updateSnackBarState(true, error.response.data.message, "error");
        }
      });
  };

  const fetchProductSizeResults = async (productId: string) => {
    try {
      const response = await httpWithoutCredentials.get<ISize>(
        `/product/getSizesById/${productId}`
      );
      const filteredSizes = response.data.sizes.filter(
        (size) => size.inStock > 0
      );

      setSizeResults(filteredSizes);
      setAddToCartOpen(true);
    } catch (error) {
      throw error;
    }
  };

  const categoryWithProducts = useGetProductsByCategoryId(
    categoryId ?? "",
    onError
  );
  useEffect(() => {
    if (categoryWithProducts.data && selectedSizeForFilter == "") {
      if (categoryWithProducts.data.products.length > 0) {
        setProductData(categoryWithProducts.data.products);
      }
      setLoading(false);
    }
  }, [categoryWithProducts.data, selectedSizeForFilter]);

  // Sort based on price
  if (sortByPriceMode == "lowToHigh") {
    productData?.sort((a, b) => a.price - b.price);
  } else if (sortByPriceMode == "highToLow") {
    productData?.sort((a, b) => b.price - a.price);
  }
  // Sort based on size
  const allSizesPresentInProducts =
    categoryWithProducts?.data?.products.flatMap((product) => product.sizes);
  const allUniqueSizes = [...new Set(allSizesPresentInProducts)];

  const filteredProducts = categoryWithProducts?.data?.products.filter(
    (product) => product.sizes.includes(selectedSizeForFilter)
  );
  useEffect(() => {
    if (
      filteredProducts &&
      filteredProducts.length > 0 &&
      selectedSizeForFilter != ""
    ) {
      setProductData(filteredProducts);
    }
  }, [filteredProducts]);

  return (
    <>
      {categoryWithProducts && categoryWithProducts.data && (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
            p={1}
          >
            <Box
              sx={{
                paddingRight: 1,
              }}
            >
              <Card
                sx={{
                  height: "60px",
                  width: "60px",
                  boxShadow: 3,
                  borderRadius: "50%",
                }}
              >
                <CardMedia
                  image={categoryWithProducts.data.image}
                  component={"img"}
                  sx={{
                    height: "100%",
                  }}
                />
              </Card>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
              }}
              gap={1}
            >
              <Box width="45%">
                <Typography
                  sx={{
                    fontWeight: 600,
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  variant="h6"
                >
                  {categoryWithProducts.data.name}
                </Typography>
              </Box>
              {productData.length > 0 && (
                <Box width="55%">
                  <FormControl fullWidth>
                    <InputLabel id="sortby-size-label" sx={{ mt: "-5px" }}>
                      Sort By Price
                    </InputLabel>
                    <Select
                      labelId="sortby-size-label"
                      id="demo-simple-select"
                      label="sortby-size-label-id"
                      size="small"
                      value={sortByPriceMode}
                      onChange={(e) => setSortByPriceMode(e.target.value)}
                    >
                      <MenuItem value={"lowToHigh"}>Low To High</MenuItem>
                      <MenuItem value={"highToLow"}>High To Low</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              )}
            </Box>
          </Box>
          <Container>
            <Grid container sx={{ justifyContent: "space-between" }}>
              <Grid item xs={12} md={6}>
                {allUniqueSizes.length > 0 && productData.length > 0 && (
                  <Slider {...settings}>
                    <Box>
                      <Button
                        variant={
                          selectedSizeForFilter === ""
                            ? "contained"
                            : "outlined"
                        }
                        size="small"
                        sx={{ borderRadius: "40px", m: "0 2px" }}
                        onClick={() => setSelectedSizeForFilter("")}
                      >
                        All
                      </Button>
                    </Box>
                    {allUniqueSizes.map(
                      (size, index) =>
                        size !== "" && (
                          <Box key={index}>
                            <Button
                              variant={
                                size === selectedSizeForFilter
                                  ? "contained"
                                  : "outlined"
                              }
                              size="small"
                              sx={{
                                borderRadius: "40px",
                                m: "2px",
                              }}
                              onClick={() => setSelectedSizeForFilter(size)}
                            >
                              {size}
                            </Button>
                          </Box>
                        )
                    )}
                  </Slider>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                {allUniqueSizes.length > 0 && productData.length > 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      paddingTop: isBelowMediumScreen ? "10px" : "0",
                      color: "primary.main",
                    }}
                  >
                    <Typography
                      onClick={() => {
                        setSelectedSizeForFilter("");
                        setSortByPriceMode("");
                      }}
                    >
                      clear filter
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Container>
        </>
      )}
      <Box>
        {loading ? (
          ""
        ) : productData.length === 0 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{
              height: "60vh",
              overflow: "hidden",
            }}
          >
            <StoreIcon sx={{ fontSize: "5rem", opacity: 0.5 }}></StoreIcon>
            <Typography sx={{ opacity: 0.5 }}>No products available</Typography>
          </Box>
        ) : (
          <Container sx={{ padding: "10px" }}>
            <Grid container spacing={1}>
              {productData &&
                productData.length > 0 &&
                productData.map((product, index) => (
                  <Grid item key={index} xs={6} md={3} lg={3}>
                    <ProductCard product={product}>
                      <Button
                        variant="contained"
                        size="small"
                        fullWidth
                        onClick={() => handleAddToCart(product._id)}
                        sx={{
                          boxShadow: 4,
                          textTransform: "none",
                          display: "flex",
                          gap: 1,
                        }}
                      >
                        <AddShoppingCartIcon sx={{ fontSize: "medium" }} /> Add
                        to Bag
                      </Button>
                    </ProductCard>
                  </Grid>
                ))}
            </Grid>
          </Container>
        )}
      </Box>
      {/* <div ref={observerRef} style={{ height: "1px" }}></div> */}
      <AddToCartDialogModel
        openAddToCart={openAddToCart}
        onClose={() => {
          setAddToCartOpen(false);
          setSizeWithQuantity([]);
        }}
        sizeResults={sizeResults}
        productDetailLocalStorage={
          {
            productId: selectedProductId,
            sizes: [...sizeWithQuantity],
          } as IProductDetailLocalStorage
        }
        onAddNowClick={() => setSizeWithQuantity([])}
      />
    </>
  );
}

export default CategoryProducts;
