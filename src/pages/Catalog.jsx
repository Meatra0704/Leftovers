import React, { useContext } from "react";
import RecipeCard from "../components/RecipeCard";
import { RecipeContext, RecipeProvider } from "../context/RecipeContext";
  
export default function Catalog() {
  const { recipes } = useContext(RecipeContext);

  return (
    <div className="catalog-container">
      {recipes.map((recipe) => (
        <RecipeCard
          imageUrl={recipe.imageUrl}
          ingredients={recipe.ingredients}
          key={recipe.id}
          title={recipe.title}
        />
      ))}
    </div>
  );
}
