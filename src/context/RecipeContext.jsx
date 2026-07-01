import React, { createContext, useEffect, useState } from "react";

import { mockRecipes } from "../data/mockRecipes";

export const RecipeContext = createContext(null);

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem("my-recipes");

    return saved ? JSON.parse(saved) : mockRecipes;
  });

  // Overwrite the old saved data when a new recipe is added
  useEffect(() => {
    localStorage.setItem("my-recipes", JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
}
