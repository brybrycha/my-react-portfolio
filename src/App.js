import React from "react";
import { Routes, Route } from "react-router-dom"; 
import Portfolio from "./pages/main";
import UCSDClassData from "./pages/ucsd-class-data";
import AccidentRateAnalysis from "./pages/accident-rate-analysis";
import PhonePurchaseAnalysis from "./pages/phone-purchase-analysis";
import PlaylistVisualization from "./pages/playlist-visualization";
import RecipesAndRatings from "./pages/recipes-and-ratings";

const App = () => {
  return (
    // The <Router> wrapper has been removed
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/pages/ucsd-class-data" element={<UCSDClassData />} />
      <Route path="/pages/accident-rate-analysis" element={<AccidentRateAnalysis />} />
      <Route path="/pages/phone-purchase-analysis" element={<PhonePurchaseAnalysis />} />
      <Route path="/pages/playlist-visualization" element={<PlaylistVisualization />} />
      <Route path="/pages/recipes-and-ratings" element={<RecipesAndRatings />} />
    </Routes>
  );
};

export default App;