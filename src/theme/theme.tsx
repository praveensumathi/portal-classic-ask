import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1B4C8C",
    },
    secondary: {
      main: "#ece7ee",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: "Inter-Regular",
    button: {
      textTransform: "none",
      fontWeight: 500,
      textDecoration: "none",
    },
  },
});

export default theme;
