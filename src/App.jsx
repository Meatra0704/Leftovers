import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { RecipeProvider } from "./context/RecipeContext";
import AddRecipe from "./pages/AddRecipe";
import Catalog from "./pages/Catalog";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import RecipeDetails from "./pages/RecipeDetails";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <RecipeProvider>
      <Router>
        <ScrollToTop/>

        <Navbar />

        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Catalog />} path="/recipes" />
          <Route element={<RecipeDetails />} path="/recipes/:id" />
          <Route element={<AddRecipe />} path="/add" />
          <Route element={<Favorites />} path="/favorites" />
          <Route element={<NotFound />} path="*" />
        </Routes>
      </Router>
    </RecipeProvider>
  );
}

export default App;
