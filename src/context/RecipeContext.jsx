import React, { createContext, useEffect, useState } from "react";

export const RecipeContext = createContext(null);

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem("my-recipes");
    if (!saved) {
      return [];
    }

    return JSON.parse(saved);
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
