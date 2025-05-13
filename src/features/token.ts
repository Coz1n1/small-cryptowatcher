import { createSlice } from "@reduxjs/toolkit";
import tokens from "../data/tokensData.json";
import { type Token } from "../types/types";

interface TokensState {
  tokens: Token[];
}

const initialState: TokensState = {
  tokens: tokens,
};

const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    incrementPrices(state) {
      state.tokens = state.tokens.map((token) => ({
        ...token,
        current_price: +(token.current_price + 1).toFixed(2),
      }));
    },
  },
});

export const { incrementPrices } = tokensSlice.actions;
export default tokensSlice.reducer;
