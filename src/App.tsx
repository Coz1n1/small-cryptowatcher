import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tokens from "./pages/tokens/Tokens";
import Favourites from "./pages/favourites/Favourites";
import LeftPanel from "./components/LeftPanel";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { incrementPrices } from "./features/token";
import Home from "./pages/home/Home";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(incrementPrices());
    }, 30000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <Router>
      <Toaster />
      <Navbar />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <LeftPanel />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tokens" element={<Tokens />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
