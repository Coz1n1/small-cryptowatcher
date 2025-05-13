import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface FavouriteDetails {
  id: number;
  amount: number;
  comment: string;
}

interface FavouriteTokensState {
  favouriteTokens: FavouriteDetails[];
}

const initialState: FavouriteTokensState = {
  favouriteTokens: [],
};

const favouriteTokensSlice = createSlice({
  name: "favouiriteTokens",
  initialState,
  reducers: {
    toggleFavourite(state, action: PayloadAction<number>) {
      const id = state.favouriteTokens.findIndex(
        (token) => token.id === action.payload
      );
      if (id >= 0) {
        state.favouriteTokens.splice(id, 1);
        toast.success("Deleted from favourites!");
      } else {
        state.favouriteTokens.push({
          id: action.payload,
          amount: 0,
          comment: "",
        });
        toast.success("Added to favourites!");
      }
    },
    setAmount(state, action: PayloadAction<{ id: number; amount: number }>) {
      const el = state.favouriteTokens.find((t) => t.id === action.payload.id);
      if (el) el.amount = action.payload.amount;
    },
    setComment(state, action: PayloadAction<{ id: number; comment: string }>) {
      const el = state.favouriteTokens.find((t) => t.id === action.payload.id);
      if (el) el.comment = action.payload.comment;
    },
  },
});

export const { toggleFavourite, setAmount, setComment } =
  favouriteTokensSlice.actions;
export default favouriteTokensSlice.reducer;
