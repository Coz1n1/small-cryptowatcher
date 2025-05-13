import {
  Box,
  Container,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../main";
import type { Token } from "../../types/types";
import TokenCard from "./TokenCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useActiveIndex } from "../../hooks/useActiveIndex";
import { toggleFavourite } from "../../features/favouriteTokens";
import { useEffect, useState } from "react";

const TOKEN_CARD_WIDTH = 460;
const GAP = 16;

const Tokens = () => {
  const dispatch = useDispatch();

  const tokens = useSelector((state: RootState) => state.tokens.tokens);
  const favIds = useSelector((state: RootState) =>
    state.favouriteTokens.favouriteTokens.map((e) => e.id)
  );

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
  const isLast = activeIndex === tokens.length - 1;

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
          Pick Favourites
        </Typography>
      </Container>
      <Container
        sx={{
          position: "absolute",
          top: "70%",
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
        <IconButton onClick={() => scrollBy(cardWidth + gap)} disabled={isLast}>
          <ArrowForwardIosIcon
            sx={{ fontSize: 60 }}
            htmlColor={isLast ? "grey" : "#fff"}
          />
        </IconButton>
      </Container>
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
        {tokens.map((token: Token, i: number) => {
          const isActive = i === activeIndex;
          const isFav = favIds.includes(token.id);

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
              <TokenCard
                key={i}
                isFav={isFav}
                onToggleFavourite={() => dispatch(toggleFavourite(token.id))}
                name={token.name}
                symbol={token.symbol}
                price={token.current_price}
                icon={`/icons/${token.symbol.toLowerCase()}.png`}
              ></TokenCard>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Tokens;
