import {
  Box,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  Typography,
  Card,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IDateWiseOrders } from "../../interface/types";
import ProductSizeTable from "../../common/components/ProductSizeTable";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { paths } from "../../routes/paths";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useSnackBar } from "../../context/SnackBarContext";
import { useAuthContext } from "../../context/AuthContext";
import { fetchLoggedInUserOrders } from "../../services/api";
import { OrderStatusEnum } from "../../enums/OrderStatusEnum";

function ShowOrdersByDate() {
  const navigate = useNavigate();
  const [dateWiseOrders, setDateWiseOrders] = useState<IDateWiseOrders[]>([]);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);

  const { updateSnackBarState } = useSnackBar();
  const { user } = useAuthContext();

  const returnExchangeInfo = [
    "Return or Exchange accepted only for Damaged, Wrong product, Wrong size received from us. [No other reasons are accepted]",
    "Parcel opening video is mandatory for reporting any of these above-mentioned issues.",
    "Contact for any other Inquiries: +91 7010456239",
  ];

  const fetchOrdersByUserId = async () => {
    try {
      setIsLoading(true);
      if (user && user.userId) {
        const { userId } = user;
        const orders = await fetchLoggedInUserOrders(userId);
        setDateWiseOrders(orders);
      } else {
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      updateSnackBarState(true, error.response.data.message, "error");
    }
  };

  useEffect(() => {
    fetchOrdersByUserId();
  }, [user]);

  const moveToHome = () => {
    navigate(paths.ROOT);
  };

  const renderOrderStatus = (status: number) => {
    return (
      <>
        {OrderStatusEnum.Pending == status && (
          <Chip
            label="Placed"
            variant="outlined"
            size="small"
            color="default"
          />
        )}
        {OrderStatusEnum.Accepted == status && (
          <Chip label="Accepted" variant="outlined" size="small" color="info" />
        )}
        {OrderStatusEnum.Packed == status && (
          <Chip
            label="Packed"
            variant="outlined"
            size="small"
            color="warning"
          />
        )}
        {OrderStatusEnum.Completed == status && (
          <Chip
            label="Dispatched"
            variant="filled"
            size="small"
            color="success"
          />
        )}
        {OrderStatusEnum.Cancelled == status && (
          <Chip
            label="Cancelled"
            variant="outlined"
            size="small"
            color="error"
          />
        )}
      </>
    );
  };

  return (
    <Container>
      <Typography variant="h6" fontWeight="bold" mt={1}>
        Orders
      </Typography>
      <Typography variant="body2" sx={{ p: 1, opacity: 0.9 }}>
        Note:
        <ol style={{ margin: 0, paddingInlineStart: "1.5rem" }}>
          {returnExchangeInfo.map((info, index) => (
            <li key={index}>{info}</li>
          ))}
        </ol>
      </Typography>
      {dateWiseOrders && dateWiseOrders.length > 0 ? (
        dateWiseOrders.map((dateWiseOrder) => (
          <Box key={dateWiseOrder.orderedDate}>
            <Divider>
              <Chip label={dateWiseOrder.orderedDate} />
            </Divider>
            {dateWiseOrder.orders &&
              dateWiseOrder.orders.length > 0 &&
              dateWiseOrder.orders.map((order, index) => (
                <Box key={order._id} mt={2} mb={4}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`label-${index}`}
                      id={`id-${index}`}
                      sx={{
                        margin: "10px 0px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <Typography
                            noWrap
                            sx={{
                              flex: 1,
                              width: "150spx",
                              maxWidth: "auto",
                              fontWeight: "bold",
                              fontSize: "small",
                            }}
                          >
                            Order No.&nbsp;
                            <span>({order.orderNumber})</span>
                          </Typography>
                          <Box sx={{ flex: 0.2 }}>
                            {renderOrderStatus(order.status)}
                          </Box>
                        </Box>
                        <Box>
                          {order.image && (
                            <Typography>
                              Tracking Detail:&nbsp;
                              <a
                                href={order.image}
                                download={order.image.split("/").pop()}
                                style={{ textDecoration: "none" }}
                              >
                                Download Now
                              </a>
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </AccordionSummary>

                    <AccordionDetails
                      sx={{
                        backgroundColor: "#ece7ee",
                      }}
                    >
                      <Box textAlign={"right"}>
                        <Typography fontWeight={"bold"} fontSize={"small"}>
                          Order Total: ₹{order.totalPrice}
                        </Typography>
                      </Box>
                      {order.productdetail.map((product, productIndex) => (
                        <Box my={2} key={product.productId}>
                          <Card elevation={0}>
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
                                  paddingLeft: "0px !important",
                                }}
                              >
                                <CardMedia
                                  sx={{
                                    overflow: "hidden",
                                    objectFit: "contain",
                                    height: "100px",
                                  }}
                                  image={product.posterURL}
                                  title=""
                                  component={"img"}
                                  loading="lazy"
                                />
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
                                  {product.productcode}&nbsp;&nbsp;
                                  {product.title}
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
                                </Box>
                              </Grid>
                            </Grid>
                          </Card>
                          <Divider
                            sx={{
                              display:
                                productIndex === order.productdetail.length - 1
                                  ? "none"
                                  : "block",
                            }}
                          />
                        </Box>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                </Box>
              ))}
          </Box>
        ))
      ) : (
        <>
          {isLoading != null && dateWiseOrders.length == 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                minHeight: "70vh",
              }}
            >
              <ShoppingCartCheckoutIcon
                sx={{ fontSize: "6rem", opacity: 0.5 }}
              ></ShoppingCartCheckoutIcon>
              <Typography sx={{ textAlign: "center", paddingBottom: "15px" }}>
                There are no orders, so it's time to go shopping!
              </Typography>
              <Button variant="contained" fullWidth onClick={moveToHome}>
                Return to Shop
                <ArrowRightAltIcon />
              </Button>
            </Box>
          )}
        </>
      )}
    </Container>
  );
}

export default ShowOrdersByDate;
