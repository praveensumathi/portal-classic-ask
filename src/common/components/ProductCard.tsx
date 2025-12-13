import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { IProduct } from "../../interface/types";
import { useMediaQuery, useTheme } from "@mui/material";
import { calculateDiscountPercentage } from "../utils/util";

interface IProps {
  product: IProduct;
  children?: React.ReactNode;
}

function ProductCard(props: IProps) {
  const { product, children } = props;

  const theme = useTheme();
  const isMediumAndAboveScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <Box
        sx={{
          padding: 0.2,
        }}
      >
        <Card
          sx={{
            height: "100%",
            boxShadow: 2,
            boxSizing: "border-box",
            display: "block",
          }}
          elevation={0}
        >
          <Link
            to={`/productDetail/${product._id}`}
            style={{
              textDecoration: "none",
            }}
          >
            <CardMedia
              sx={{
                padding: 0,
                transform: isMediumAndAboveScreen ? "scale(0.9)" : "none",
                ":hover": {
                  transform: isMediumAndAboveScreen ? "scale(1)" : "none",
                  transitionDuration: "0.5s",
                },
              }}
              image={product.posterURL}
              title={product.productCode}
              component={"img"}
            />
          </Link>
          <Box
            sx={{
              padding: "6px",
              maxHeight: "100%",
            }}
          >
            <Typography
              sx={{
                paddingBottom: 0,
                fontSize: "small",
                fontWeight: 600,
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              variant="h6"
            >
              {product.productCode}&nbsp;&nbsp;{product.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "baseline" }}>
              <Typography sx={{ fontWeight: 600 }}>
                &#8377;{product.price}
              </Typography>
              {product.MRPprice > product.price && product.MRPprice > 0 && (
                <>
                  <Typography
                    sx={{
                      textDecoration: "line-through",
                      fontSize: "small",
                      opacity: 0.5,
                      ml: 1,
                    }}
                  >
                    &#8377;{product.MRPprice}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "small",
                      fontWeight: 600,
                      color: "green",
                      ml: 1,
                    }}
                  >
                    {calculateDiscountPercentage(
                      product.MRPprice,
                      product.price
                    )}
                    % Off
                  </Typography>
                </>
              )}
            </Box>
          </Box>
          {children && <Box p={1}>{children}</Box>}
        </Card>
      </Box>
    </>
  );
}

export default ProductCard;
