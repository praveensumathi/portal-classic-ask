import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { DebounceInput } from "react-debounce-input";
import { useNavigate } from "react-router-dom";
import { DrawerEnum, useDrawer } from "../context/DrawerContext";
import { ISearchProduct } from "../interface/types";
import { httpWithoutCredentials } from "../services/http";

function SearchProductDrawer() {
  const { updateDrawerState } = useDrawer();

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<ISearchProduct[]>([]);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const fetchSearchProduct = async () => {
    try {
      const response = await httpWithoutCredentials.get<ISearchProduct[]>(
        `/product/searchProduct?searchTerm=${searchTerm.toLocaleUpperCase()}`
      );

      setProducts(response.data || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (searchTerm && searchTerm.trim() !== "") {
      fetchSearchProduct();
    }
  }, [searchTerm]);

  const handleProductClick = (productId: string) => {
    navigate(`productDetail/${productId}`);
    updateDrawerState(DrawerEnum.Search);
  };

  return (
    <Box>
      <Container>
        <Box
          sx={{
            position: "sticky",
            top: 0,
            height: "50px",
            display: "flex",
            justifyContent: "space-between",
            overflow: "auto",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "large", fontWeight: 600 }}>
            Search Product
          </Typography>
          <CloseIcon
            onClick={() => updateDrawerState(DrawerEnum.Search)}
          ></CloseIcon>
        </Box>
      </Container>
      <Divider />
      <Container>
        <Box
          sx={{
            paddingTop: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <DebounceInput
            element={TextField}
            debounceTimeout={1000}
            fullWidth
            sx={{
              "& .MuiInputBase-input": {
                padding: 1,
              },
            }}
            value={searchTerm}
            onChange={(event) => handleInputChange(event)}
            placeholder="Search code,name,..."
            autoComplete="new"
            autoFocus
          />
        </Box>
        <Box
          my={1}
          sx={{
            height: "80vh",
            overflow: "auto",
          }}
        >
          {searchTerm.trim() !== "" && products.length > 0 ? (
            products.map((product, index) => (
              <Box key={index}>
                <Box
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleProductClick(product._id)}
                >
                  <Card sx={{ padding: 1 }} elevation={0}>
                    <Grid
                      container
                      spacing={2}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Grid item xs={3}>
                        <CardMedia
                          sx={{
                            overflow: "hidden",
                            objectFit: "contain",
                            height: "60px",
                            width: "100%",
                          }}
                          image={product.posterURL}
                          title={product.productCode}
                          component={"img"}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <Box>
                          <Typography
                            sx={{ fontSize: "small", fontWeight: 600 }}
                          >
                            {product.productCode}&nbsp;{product.title}
                          </Typography>
                          <Typography sx={{ fontSize: "small" }}>
                            Sizes:&nbsp;
                            {product.sizes.join(", ")}
                          </Typography>
                          <Typography sx={{ fontSize: "0.9rem" }}>
                            &#8377; {product.price}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Card>
                  <Divider />
                </Box>
              </Box>
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingTop: "160px",
              }}
            >
              <SearchOffIcon
                sx={{ fontSize: "5rem", opacity: 0.5 }}
              ></SearchOffIcon>
              <Typography sx={{ opacity: 0.5 }}>No Result Found</Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default SearchProductDrawer;
