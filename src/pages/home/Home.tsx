import { Box, Container, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#5C5C5C",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0px 15px 100px 15px",
      }}
    >
      <Container
        sx={{
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontFamily: '"Jersey 10", sans-serif',
            fontSize: { xs: "30px", sm: "64px" },
            color: "#fff",
          }}
        >
          Welcome to CryptoWatcher!
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "16px", sm: "28px" },
            color: "#fff",
            fontWeight: 600,
          }}
        >
          Explore the world of cryptocurrencies
          <br /> and track your portfolio.
        </Typography>
        <Container
          sx={{
            display: "flex",
            gap: { xs: 1, sm: 3 },
            marginTop: 3,
            justifyContent: "center",
          }}
        >
          <MuiLink
            component={RouterLink}
            to="/tokens"
            sx={{
              textDecoration: "none",
              color: "#fff",
              backgroundColor: "#FF0000",
              padding: { xs: "5px 10px", sm: "10px 20px" },
              borderRadius: "5px",
            }}
          >
            Cryptocurrencies
          </MuiLink>
          <MuiLink
            component={RouterLink}
            to="/favourites"
            sx={{
              textDecoration: "none",
              color: "#fff",
              backgroundColor: "#2F8D2F",
              padding: { xs: "5px 10px", sm: "10px 20px" },
              borderRadius: "5px",
            }}
          >
            Favourites
          </MuiLink>
        </Container>
      </Container>
    </Box>
  );
};

export default Home;
