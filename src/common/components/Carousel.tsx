import { ICategoryWithProducts } from "../../interface/types";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ProductsSliderSettings } from "../../constants/Constants";
import Slider from "react-slick";
import ProductCard from "./ProductCard";

interface IProps {
  category: ICategoryWithProducts;
}

function Carousel(props: IProps) {
  const { category } = props;

  const navigate = useNavigate();
  const theme = useTheme();
  const isMediumAndAboveScreen = useMediaQuery(theme.breakpoints.up("md"));

  const handleClickViewAll = (categoryId: string) => {
    navigate(`productsByCategory/${categoryId}`);
  };

  const sliderSettings = {
    ...ProductsSliderSettings,
    slidesToShow: isMediumAndAboveScreen
      ? 5
      : ProductsSliderSettings.slidesToShow,
    draggable: true,
  };

  return (
    category &&
    category.products.length > 0 && (
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
            {category.name}
          </Typography>
          <Button
            variant="contained"
            size="small"
            sx={{
              padding: 0.5,
            }}
            onClick={() => handleClickViewAll(category._id)}
          >
            View All
          </Button>
        </Box>
        <Slider {...sliderSettings}>
          {category.products.map((product, index) => (
            <Box key={index}>
              <ProductCard product={product} />
            </Box>
          ))}
        </Slider>
      </Box>
    )
  );
}

export default Carousel;
