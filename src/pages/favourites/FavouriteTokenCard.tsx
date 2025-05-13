import {
  Box,
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
  Button,
  Container,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState, type FormEvent } from "react";

interface FavouriteTokenCardProps {
  id: number;
  name: string;
  symbol: string;
  price: number;
  icon: string;
  amount: number;
  comment: string;
  onRemove: () => void;
  onAmountChange: (newAmount: number) => void;
  onCommentChange: (newComment: string) => void;
}

const FavouriteTokenCard: React.FC<FavouriteTokenCardProps> = ({
  id,
  name,
  symbol,
  price,
  icon,
  onRemove,
  onAmountChange,
  onCommentChange,
  amount,
  comment,
}) => {
  const [tokAmount, setTokAmount] = useState<string>(amount.toString());
  const [tokComment, setTokComment] = useState<string>(comment);

  const handleTokenSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (parseFloat(tokAmount) >= 0) {
      onAmountChange(parseFloat(tokAmount));
      onCommentChange(tokComment);
    } else {
      alert("Please enter a valid amount");
    }

    const raw = localStorage.getItem("favouriteTokens");
    if (raw) {
      try {
        const arr: Array<{ id: number; amount: number; comment: string }> =
          JSON.parse(raw);
        const entry = arr.find((ft) => ft.id === id);
        if (entry) {
          setTokAmount(entry.amount.toString());
          setTokComment(entry.comment);
          return;
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Card
      sx={{
        backgroundColor: "#332E2E",
        border: "1px solid #000",
        width: { xs: "80vw", sm: "350px" },
        position: "relative",
        padding: { xs: "20px 10px", sm: "30px 10px" },
      }}
    >
      <CardContent component="form" onSubmit={(e) => e.preventDefault}>
        <Box
          component="img"
          src={icon}
          sx={{
            width: { xs: "60px", sm: "80px" },
            height: { xs: "60px", sm: "80px" },
            mx: "auto",
            display: "block",
            mb: { xs: 1, sm: 4 },
          }}
        />
        <Typography
          align="center"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "16px", sm: "24px" },
            color: "#fff",
          }}
        >
          {name} ({symbol})
        </Typography>
        <Typography align="center" sx={{ color: "grey.300" }}>
          Current price: ${price}
        </Typography>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mt: { xs: 1, sm: 3 },
          }}
        >
          <Typography sx={{ color: "white" }}>Amount:</Typography>
          <TextField
            type="number"
            value={tokAmount}
            variant="outlined"
            onChange={(e) => setTokAmount(e.target.value)}
            slotProps={{
              htmlInput: {
                min: 0,
                step: "any",
              },
            }}
            sx={{
              width: "100%",
              mb: { xs: 0, sm: 1 },
              color: "white",
              backgroundColor: "#545454",
              borderRadius: "5px",
              height: { xs: "28px", sm: "35px" },
              border: "1px solid #fff",
              "& .MuiInputBase-input": {
                color: "#fff",
              },
            }}
          />
        </Container>
        <Container
          sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}
        >
          <Typography sx={{ color: "white" }}>Unit:</Typography>
          <TextField
            value={name}
            sx={{
              width: "100%",
              mb: { xs: 0, sm: 1 },
              backgroundColor: "#545454",
              borderRadius: "5px",
              height: { xs: "28px", sm: "35px" },
              border: "1px solid #fff",
              "& .MuiInputBase-input": {
                color: "#fff",
              },
            }}
          />
        </Container>
        <Container
          sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 1 }}
        >
          <Typography sx={{ color: "white" }}>Comment:</Typography>
          <TextField
            value={tokComment}
            onChange={(e) => setTokComment(e.target.value)}
            sx={{
              width: "100%",
              mb: { xs: 0, sm: 1 },
              backgroundColor: "#545454",
              borderRadius: "5px",
              height: { xs: "28px", sm: "35px" },
              border: "1px solid #fff",
              "& .MuiInputBase-input": {
                color: "#fff",
              },
            }}
          />
        </Container>
        <Container
          sx={{ width: "100%", display: "flex", justifyContent: "end", mt: 2 }}
        >
          <Button
            onClick={handleTokenSubmit}
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#2F8D2F",
              border: "1px solid #fff",
              height: "30px",
              textTransform: "none",
            }}
          >
            Submit
          </Button>
        </Container>
      </CardContent>
      <IconButton
        onClick={onRemove}
        sx={{
          position: "absolute",
          bottom: { xs: 2, sm: 10 },
          right: { xs: 2, sm: 10 },
          cursor: "pointer",
          color: "#FF0000",
        }}
      >
        <FavoriteIcon />
      </IconButton>
    </Card>
  );
};

export default FavouriteTokenCard;
