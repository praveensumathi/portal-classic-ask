import { Box, Container } from "@mui/material";
import CategoryList from "./CategoryList";
import Carousel from "../../common/components/Carousel";
import NewArrival from "../../common/components/NewArrival";
import { useGetCategoryWiseProducts } from "../../CustomHooksRQ/Category/Hooks";
import Footer from "../footer/Footer";

function Home() {
  // const theme = useTheme();
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const categoryWithProducts = useGetCategoryWiseProducts();

  return (
    <Box>
      <Container
        sx={{
          maxHeight: "300px",
          marginBottom: "10px",
          height: "20%",
        }}
      >
        <CategoryList />
      </Container>
      <Container>
        <NewArrival />
      </Container>
      <Container>
        {categoryWithProducts.isSuccess &&
          categoryWithProducts.data.map((category, index) => (
            <Box key={index}>
              <Carousel category={category} />
            </Box>
          ))}
      </Container>
      <Box sx={{ pt: 3 }}>
        <Footer />
      </Box>
    </Box>
  );
}

export default Home;
