import { AppBar, Container, Typography, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { walletValue } from "../features/selectors";

const Navbar = () => {
  const totalWalletValue = useSelector(walletValue);
  const isMobile = useMediaQuery("(max-width:500px)");

  return (
    <AppBar position="static">
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          padding: "10px 20px",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#332E2E",
          width: "100vw",
        }}
      >
        <Typography
          noWrap
          sx={{
            fontSize: isMobile ? "22px" : "32px",
            fontFamily: '"Jersey 10", sans-serif',
            fontWeight: 400,
          }}
        >
          CryptoWatcher
        </Typography>
        <Typography>
          {isMobile ? `My Wallet` : `My Wallet USD value`} $
          {totalWalletValue.toFixed(2)}
        </Typography>
      </Container>
    </AppBar>
  );
};

export default Navbar;
