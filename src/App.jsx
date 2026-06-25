import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import AddRecipe from "./pages/AddRecipe";
import Catalog from "./pages/Catalog";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Catalog />} path="/recipes" />
        <Route element={<RecipeDetails />} path="/recipes/:id" />
        <Route element={<AddRecipe />} path="/add" />
        <Route element={<Favorites />} path="/favorites" />
      </Routes>
    </Router>
  );
}

export default App;
