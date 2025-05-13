import { Box, Card, Container, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface TokenCardProps {
  name: string;
  symbol: string;
  price: number;
  icon: string;
  isFav?: boolean;
  onToggleFavourite?: () => void;
}

const TokenCard: React.FC<TokenCardProps> = ({
  name,
  symbol,
  price,
  icon,
  isFav,
  onToggleFavourite,
}) => {
  const now = new Date();

  const lastCheck = `${now.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })} ${now
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
    .toLowerCase()}`;

  return (
    <Card
      sx={{
        border: "1px solid #000",
        backgroundColor: "#332E2E",
        width: { xs: "80vw", sm: "460px" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 10px",
        position: "relative",
        gap: "15px",
      }}
    >
      <Box
        component="img"
        src={icon}
        sx={{ width: "100px", height: "100px" }}
      />
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "24px",
          color: "#fff",
          marginTop: "15px",
        }}
      >
        {name} ({symbol})
      </Typography>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          textAlign: "center",
        }}
      >
        <Typography sx={{ color: "grey.300" }}>
          Current price: ${price}
        </Typography>
        <Typography sx={{ color: "grey.300" }}>
          Last check: {lastCheck}
        </Typography>
      </Container>
      <IconButton
        onClick={onToggleFavourite}
        sx={{
          position: "absolute",
          bottom: "4px",
          right: "4px",
          color: "#FF0000",
        }}
      >
        {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Card>
  );
};

export default TokenCard;
