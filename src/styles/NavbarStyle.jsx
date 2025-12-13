import { makeStyles } from "@mui/styles";

export const useNavbarStyle = makeStyles((theme) => ({
  root: {},
  activeLink: {
    textDecoration: "none",
    color: `${theme.palette.common.white} !important`,
    "& .MuiTypography-body1	": {
      color: "white",
    },
    "& .MuiSvgIcon-root": {
      color: "white",
    },

    "& .MuiListItemButton-root": {
      backgroundColor: `${theme.palette.primary.main} !important`,
      color: "white",
    },
  },
}));
