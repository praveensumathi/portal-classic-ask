import { Box, Button, Container, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";
import Bounce from "react-reveal/Bounce";
import { useEffect, useState, useRef } from "react";
import Confetti from "react-confetti";

function OrderSuccessPage() {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [height, setHeight] = useState<number>(
    typeof window !== "undefined" ? window.innerHeight : 0
  );
  const svgRef = useRef<HTMLDivElement | null>(null);
  const [confettiSource, setConfettiSource] = useState({
    x: Math.round(
      (typeof window !== "undefined" ? window.innerWidth : 0) / 2 - 10
    ),
    y: 0,
    w: 20,
    h: 10,
  });

  useEffect(() => {
    // const redirectTimer = setTimeout(() => {
    //   navigate(paths.ROOT);
    // }, 3000);
    // return () => {
    //   clearTimeout(redirectTimer);
    // };
  }, []);

  useEffect(() => {
    const confettiTimer = setTimeout(() => setShowConfetti(false), 3000);
    const updateSource = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        setConfettiSource({
          x: Math.round(rect.left + rect.width / 2 - 10),
          // place source further below the center so it clearly appears behind the badge
          y: Math.round(rect.top + rect.height / 2 + 26),
          w: 20,
          h: 20,
        });
      } else {
        setConfettiSource({
          x: Math.round(window.innerWidth / 2 - 10),
          y: 0,
          w: 20,
          h: 10,
        });
      }
    };
    updateSource();
    window.addEventListener("resize", updateSource);
    return () => {
      clearTimeout(confettiTimer);
      window.removeEventListener("resize", updateSource);
    };
  }, []);

  return (
    <Container
      sx={{
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* spacer for appbar so we center within available area */}
      {/* <Box sx={(theme) => theme.mixins.toolbar} /> */}

      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            maxWidth: "500px",
            width: "100%",
            minHeight: 300,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            px: 2,
          }}
        >
          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            {showConfetti && (
              <Confetti
                width={width}
                height={height}
                recycle={false}
                numberOfPieces={400}
                gravity={0.9}
                initialVelocityX={20}
                initialVelocityY={20}
                confettiSource={confettiSource}
                //colors={["#4caf50", "#66bb6a", "#ffffff", "#c8e6c9"]}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />
            )}

            <Bounce>
              <Box
                ref={svgRef}
                sx={{
                  position: "relative",
                  zIndex: 9999,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  py: 2,
                }}
              >
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <circle
                    className="success-circle"
                    cx="60"
                    cy="60"
                    r="50"
                    fill="#4caf50"
                  />
                  <path
                    className="success-check"
                    d="M40 64 L54 78 L80 46"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <style>{`
                    .success-circle { transform-origin: 60px 60px; animation: circle-pop 0.45s ease-out forwards; }
                    .success-check { stroke-dasharray: 150; stroke-dashoffset: 150; animation: check-draw 0.5s 0.3s ease-out forwards; }
                    @keyframes circle-pop { 0% { transform: scale(0.6); opacity: 0; } 60% { transform: scale(1.05); opacity: 1; } 100% { transform: scale(1); } }
                    @keyframes check-draw { to { stroke-dashoffset: 0; } }
                  `}</style>
                </svg>
              </Box>
            </Bounce>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Thank You For Ordering
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
              Your order has been placed and will reach you soon.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              py: 5,
              "@media (max-width: 600px)": {
                flexDirection: "column",
              },
            }}
          >
            <Link to={`/${paths.ORDERS}`}>
              <Button variant="outlined" sx={{ alignItems: "center" }}>
                VIEW ORDER
              </Button>
            </Link>
            <Link to={paths.ROOT}>
              <Button variant="contained">CONTINUE SHOPPING</Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default OrderSuccessPage;
