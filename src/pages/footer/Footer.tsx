import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import { useCommonGridStyle } from "../../styles/FooterStyle";
import Fade from "react-reveal/Fade";
import DirectionsIcon from "@mui/icons-material/Directions";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import { Instagram } from "@mui/icons-material";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Footer() {
  const socialMediaIconStyles = {
    color: "white",
    fontSize: "2.5rem",
    transition: " 0.2s, transform 0.2s",
    "&:hover": {
      transform: "scale(1.1) translateY(-2px)",
    },
  };

  const classes = useCommonGridStyle();

  return (
    <Box className={`${classes.footerContainer} ${classes.innerBox}`}>
      <Box className={classes.overlay}></Box>
      <Fade top>
        <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
          <Typography variant="h4" fontWeight={600}>
            Contact Us
          </Typography>
        </Box>
      </Fade>
      <Container sx={{ paddingBottom: 2 }}>
        <Grid container sx={{ gap: 2 }}>
          <Grid
            container
            item
            spacing={1}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Grid item lg={3.5} xs={12} className={classes.commonGridStyle}>
              <Fade left>
                <Box sx={{ my: 1 }}>
                  <LocationOnIcon />
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Shop Address
                  </Typography>
                  <Typography variant="h5">
                    Classic Style - Payans Men's Wear
                  </Typography>
                  <Typography>
                    Classic Style Payans Men's Wear, Near Clock Tower Namakkal
                    637001, Namakkal, Tamil Nadu 637001
                  </Typography>
                  <Link
                    to={`${import.meta.env.VITE_C_ASK_LOCATION}`}
                    target="_blank"
                  >
                    <Button
                      startIcon={<DirectionsIcon />}
                      variant="contained"
                      size="small"
                      sx={{ m: 1 }}
                    >
                      Get Direction
                    </Button>
                  </Link>
                </Box>
              </Fade>
            </Grid>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ background: "white" }}
            />
            <Grid item lg={3.5} xs={12} className={classes.commonGridStyle}>
              <Fade bottom delay={300}>
                <Box sx={{ my: 1 }}>
                  <ChatBubbleIcon />
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    General Enquiries
                  </Typography>
                  <Typography>{import.meta.env.VITE_SHOP_MAIL}</Typography>
                  <Box
                    sx={{
                      gap: 2,
                      py: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <a
                      href={`mailto:${import.meta.env.VITE_SHOP_MAIL}`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <Button
                        startIcon={<EmailIcon />}
                        variant="contained"
                        fullWidth
                        sx={{
                          lineHeight: 0,
                          backgroundColor: "#f44336",
                          "&:hover": {
                            backgroundColor: "#f44336",
                          },
                        }}
                      >
                        Send mail
                      </Button>
                    </a>
                    <Link
                      to={`${import.meta.env.VITE_C_ASK_WHATSAPP}`}
                      target="_blank"
                    >
                      <Button
                        startIcon={<WhatsAppIcon />}
                        variant="contained"
                        fullWidth
                        sx={{
                          lineHeight: 0,
                          backgroundColor: "#4caf50",
                          "&:hover": {
                            backgroundColor: "#4caf50",
                          },
                        }}
                      >
                        Chat on Whatsapp
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </Fade>
            </Grid>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ background: "white" }}
            />
            <Grid item lg={3.5} xs={12} className={classes.commonGridStyle}>
              <Fade bottom delay={400}>
                <Box sx={{ my: 1 }}>
                  <PhoneIcon />
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Call us
                  </Typography>
                  <Typography>{import.meta.env.VITE_SHOP_PHONE1}</Typography>
                  <Box mt={1}>
                    {/* <Link
                      to={`${import.meta.env.VITE_C_ASK_FACEBOOK}`}
                      target="_blank"
                    >
                      <IconButton>
                        <FacebookRoundedIcon sx={socialMediaIconStyles} />
                      </IconButton>
                    </Link> */}
                    <Link
                      to={`${import.meta.env.VITE_C_ASK_INSTAGRAM}`}
                      target="_blank"
                    >
                      <IconButton>
                        <Instagram sx={socialMediaIconStyles} />
                      </IconButton>
                    </Link>
                    {/* <Link
                      to={`${import.meta.env.VITE_C_ASK_YOUTUBE}`}
                      target="_blank"
                    >
                      <IconButton>
                        <YouTubeIcon sx={socialMediaIconStyles} />
                      </IconButton>
                    </Link> */}
                  </Box>
                </Box>
              </Fade>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              zIndex: "4",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Grid item>
              <Box>
                <Link to="/privacypolicy" style={{ color: "white" }}>
                  <Typography>Privacy Policy</Typography>
                </Link>
              </Box>
            </Grid>
            <Grid item>
              <Box>
                <Link to="/privacypolicy" style={{ color: "white" }}>
                  <Typography>Terms and Conditions</Typography>
                </Link>
              </Box>
            </Grid>
            <Grid item>
              <Box>
                <Link to="/privacypolicy" style={{ color: "white" }}>
                  <Typography>Shipping Policy</Typography>
                </Link>
              </Box>
            </Grid>
            <Grid item>
              <Box>
                <Link to="/privacypolicy" style={{ color: "white" }}>
                  <Typography>Exchange and Refund Policy</Typography>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
export default Footer;
