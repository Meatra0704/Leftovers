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
}
