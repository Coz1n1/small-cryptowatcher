import {
  Box,
  Container,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { type Token } from "../../types/types";
import type { RootState } from "../../main";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import FavouriteTokenCard from "./FavouriteTokenCard";
import {
  toggleFavourite,
  setAmount,
  setComment,
} from "../../features/favouriteTokens";
import { useEffect, useState } from "react";
import { useActiveIndex } from "../../hooks/useActiveIndex";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const TOKEN_CARD_WIDTH = 350;
const GAP = 16;

const Favourites = () => {
  const dispatch = useDispatch();

  const tokens = useSelector((state: RootState) => state.tokens.tokens);
  const favDetails = useSelector(
    (state: RootState) => state.favouriteTokens.favouriteTokens
  );

  const items: Array<{ token: Token; detail: (typeof favDetails)[0] }> =
    favDetails
      .map((detail) => {
        const token = tokens.find((t) => t.id === detail.id);
        return token ? { token, detail } : null;
      })
      .filter(Boolean) as any;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [cardWidth, setCardWidth] = useState<number>(TOKEN_CARD_WIDTH);
  const [gap, setGap] = useState<number>(GAP);

  useEffect(() => {
    if (isMobile) {
      setCardWidth(window.innerWidth * 0.8);
      setGap(8);
    } else {
      setCardWidth(TOKEN_CARD_WIDTH);
      setGap(GAP);
    }
  }, [isMobile]);

  const { ref, activeIndex, onScroll, scrollBy } = useActiveIndex(
    cardWidth,
    gap
  );

  const isFirst = activeIndex === 0;
  const isLast = activeIndex === items.length - 1;

  return (
    <Box
      sx={{ backgroundColor: "#5C5C5C", width: "100%", position: "relative" }}
    >
      <Container
        sx={{
          width: "100%",
          textAlign: "center",
          padding: { xs: "20px", sm: "40px" },
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: "22px", sm: "48px" },
            color: "#fff",
          }}
        >
          My cryptocurrencies
        </Typography>
      </Container>

      {items.length > 0 && (
        <Container
          sx={{
            position: "absolute",
            top: "80%",
            left: "0",
            right: "0",
            width: "fit-content",
          }}
        >
          <IconButton
            onClick={() => scrollBy(-(cardWidth + gap))}
            disabled={isFirst}
          >
            <ArrowBackIosIcon
              sx={{ fontSize: 60 }}
              htmlColor={isFirst ? "grey" : "#fff"}
            />
          </IconButton>
          <IconButton
            onClick={() => scrollBy(cardWidth + gap)}
            disabled={isLast}
          >
            <ArrowForwardIosIcon
              sx={{ fontSize: 60 }}
              htmlColor={isLast ? "grey" : "#fff"}
            />
          </IconButton>
        </Container>
      )}

      <Box
        ref={ref}
        onScroll={onScroll}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          px: `calc(50% - ${cardWidth / 2}px)`,
          columnGap: `${gap}px`,
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {items.length > 0 ? (
          items.map(({ token, detail }, i) => {
            const isActive = i === activeIndex;

            return (
              <Box
                key={token.id}
                sx={{
                  flex: "0 0 auto",
                  scrollSnapAlign: "center",
                  transform: isActive ? "scale(1)" : "scale(0.8)",
                  opacity: isActive ? 1 : 0.5,
                  filter: isActive ? "none" : "blur(1px)",
                  transition: "transform 0.3s, opacity 0.3s, filter 0.3s",
                }}
              >
                <FavouriteTokenCard
                  key={token.id}
                  id={token.id}
                  name={token.name}
                  symbol={token.symbol}
                  amount={detail.amount}
                  comment={detail.comment}
                  price={token.current_price}
                  icon={`/icons/${token.symbol.toLowerCase()}.png`}
                  onRemove={() => dispatch(toggleFavourite(token.id))}
                  onAmountChange={(amount: number) =>
                    dispatch(setAmount({ id: token.id, amount }))
                  }
                  onCommentChange={(comment: string) =>
                    dispatch(setComment({ id: token.id, comment }))
                  }
                />
              </Box>
            );
          })
        ) : (
          <Typography
            sx={{
              color: "#fff",
              textAlign: "center",
              fontWeight: 700,
              fontSize: { xs: "16px", sm: "24px" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <AcUnitIcon fontSize="large" sx={{ color: "#4978DF" }} />
            Brrr... No favourties yet. Add some and come back!
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Favourites;
