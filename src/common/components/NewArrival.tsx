import { IProduct } from "../../interface/types";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ProductsSliderSettings } from "../../constants/Constants";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import React, { useEffect, useState } from "react";
import { getNewArrivalProductsData } from "../../services/api";

function NewArrival() {
  const theme = useTheme();
  const isMediumAndAboveScreen = useMediaQuery(theme.breakpoints.up("md"));

  const [newArrivalProductsData, setNewArrivalProductsData] = useState<
    IProduct[]
  >([]);

  const sliderSettings = {
    ...ProductsSliderSettings,
    slidesToShow: isMediumAndAboveScreen
      ? 5
      : ProductsSliderSettings.slidesToShow,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
  };

  async function fetchData() {
    try {
      const newArrivalProducts = await getNewArrivalProductsData();
      setNewArrivalProductsData(newArrivalProducts);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box marginTop={1.8}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        pb={1}
      >
        <Typography
          sx={{
            margin: "0px 10px 0px 0px",
            fontWeight: 800,
            color: "black",
            lineHeight: 2,
          }}
        >
          New Arrival
        </Typography>
      </Box>
      <Slider {...sliderSettings}>
        {newArrivalProductsData.map((product, index) => (
          <Box key={index}>
            <ProductCard product={product} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

export default NewArrival;
