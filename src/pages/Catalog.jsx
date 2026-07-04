import React, { useContext } from "react";
import RecipeCard from "../components/RecipeCard";
import { RecipeContext, RecipeProvider } from "../context/RecipeContext";

export default function Catalog() {
  const { recipes } = useContext(RecipeContext);

  return (
    <>
      <div className="catalog-container">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </>
  );
}
