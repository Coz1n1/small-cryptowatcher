import { createSelector } from "@reduxjs/toolkit";
import { type RootState } from "../main";
import { type Token } from "../types/types";

const allTokens = (state: RootState) => state.tokens.tokens;
const allFavouritesTokens = (state: RootState) =>
  state.favouriteTokens.favouriteTokens;

export const walletValue = createSelector(
  [allTokens, allFavouritesTokens],
  (tokens: Token[], favs) =>
    favs.reduce((acc, fav) => {
      const token = tokens.find((t) => t.id === fav.id);
      if (!token) return acc;
      return acc + fav.amount * token.current_price;
    }, 0)
);
