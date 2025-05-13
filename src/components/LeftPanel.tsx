import {
  Box,
  Drawer,
  IconButton,
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

const LeftPanel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:800px)");
  const [open, setOpen] = useState(false);

  const basicContent = (
    <Box
      sx={{
        background: `linear-gradient(90deg, #332E2E 0%, #515151 100%)`,
        minWidth: 260,
        borderRight: "1px solid #332E2E",
      }}
    >
      <Link
        component={NavLink}
        to="/tokens"
        underline="none"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          color: "#fff",
          padding: "15px 10px",
          fontSize: "16px",
          fontWeight: 700,
          "&.active": {
            background: `linear-gradient(90deg, #8A8A8A 0%, #E0E0E0 100%)`,
            color: "#000",
          },
        }}
      >
        <AttachMoneyIcon />
        Pick Favourites
      </Link>
      <Link
        component={NavLink}
        to="/favourites"
        underline="none"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          color: "#fff",
          padding: "15px 10px",
          fontSize: "16px",
          fontWeight: 700,
          "&.active": {
            background: `linear-gradient(90deg, #8A8A8A 0%, #E0E0E0 100%)`,
            color: "#000",
          },
        }}
      >
        <FavoriteIcon />
        My Cryptocurrencies
      </Link>
    </Box>
  );

  if (!isMobile) {
    return basicContent;
  }

  return (
    <>
      <IconButton
        onClick={() => setOpen(!open)}
        sx={{
          position: "fixed",
          top: 64,
          left: 4,
          zIndex: theme.zIndex.drawer + 1,
          color: "#fff",
        }}
      >
        <MenuIcon fontSize="large" />
      </IconButton>
      <Drawer
        variant="temporary"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          paper: {
            sx: {
              background: `linear-gradient(90deg, #332E2E 0%, #515151 100%)`,
              borderRight: "1px solid #332E2E",
              height: "calc(100vh - 64px)",
              top: 68,
              padding: "45px 0px",
            },
          },
        }}
      >
        {basicContent}
      </Drawer>
    </>
  );
};

export default LeftPanel;
