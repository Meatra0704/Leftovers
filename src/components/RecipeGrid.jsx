import React from "react";
import RecipeCard from "./RecipeCard";

import "./RecipeGrid.css";

export default function RecipeGrid({ recipes }) {
  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <RecipeCard
          id={recipe.id}
          imageUrl={recipe.imageUrl}
          ingredients={recipe.ingredients}
          isFavorite={recipe.isFavorite}
          key={recipe.id}
          title={recipe.title}
        />
      ))}
    </div>
  );
}
