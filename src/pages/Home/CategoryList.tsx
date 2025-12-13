import {
  Box,
  Card,
  CardMedia,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import Slider from "react-slick";
import { HomeProductsSliderSettings } from "../../constants/Constants";
import { Link } from "react-router-dom";
import { useGetCategories } from "../../CustomHooksRQ/Category/Hooks";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const CircularSkeleton = () => (
  <Skeleton variant="circular" width={80} height={80} />
);

function CategoryList() {
  const categoryQuery = useGetCategories();
  const theme = useTheme();
  const isMediumAndAboveScreen = useMediaQuery(theme.breakpoints.up("md"));
  const slider = React.useRef<any>(null);

  const sliderSettings = {
    ...HomeProductsSliderSettings,
    slidesToShow: isMediumAndAboveScreen
      ? 8.4
      : HomeProductsSliderSettings.slidesToShow,
    draggable: true,
  };

  return (
    <Box py={1}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography
          sx={{
            margin: "0px 10px 0px 0px",
            fontWeight: 800,
            color: "black",
            lineHeight: 3,
            marginTop: -1,
          }}
          className="topic-head"
        >
          Categories
        </Typography>

        <Box>
          <NavigateBeforeIcon
            sx={{
              cursor: "pointer",
            }}
            onClick={() => slider?.current?.slickPrev()}
            color="primary"
            fontSize={"large"}
          />
          <NavigateNextIcon
            sx={{
              cursor: "pointer",
            }}
            onClick={() => slider?.current?.slickNext()}
            color="primary"
            fontSize={"large"}
          />
        </Box>
      </Box>
      <>
        {categoryQuery.isLoading ? (
          <Slider {...HomeProductsSliderSettings}>
            <Box>
              <CircularSkeleton />
            </Box>
            <Box>
              <CircularSkeleton />
            </Box>
            <Box>
              <CircularSkeleton />
            </Box>
          </Slider>
        ) : (
          <Slider {...sliderSettings} ref={slider}>
            {categoryQuery.isSuccess &&
              categoryQuery.data.length > 0 &&
              categoryQuery.data?.map((category, index) => (
                <Box key={index}>
                  <Link
                    to={`productsByCategory/${category._id}`}
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                  >
                    <Box
                      key={index}
                      sx={{
                        display: "flex !important",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Card
                        sx={{
                          height: "90px",
                          width: "90px",
                          boxShadow: 3,
                          borderRadius: "50%",
                        }}
                      >
                        <CardMedia
                          image={category.image}
                          title={category.name}
                          component={"img"}
                        />
                      </Card>
                      <Box
                        sx={{
                          padding: "6px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
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
                          {category.name}
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                </Box>
              ))}
          </Slider>
        )}
      </>
    </Box>
  );
}

export default CategoryList;
