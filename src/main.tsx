import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tokensReducer from "./features/token.ts";
import favouriteTokensReducer from "./features/favouriteTokens.ts";
import { loadState, saveState } from "./utils/localStorage.ts";

const persistedState = loadState();

const rootReducer = combineReducers({
  tokens: tokensReducer,
  favouriteTokens: favouriteTokensReducer,
});

const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState({
    tokens: store.getState().tokens,
    favouriteTokens: store.getState().favouriteTokens,
  });
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

export type RootState = ReturnType<typeof store.getState>;
