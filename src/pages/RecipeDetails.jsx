import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { RecipeContext, RecipeProvider } from "../context/RecipeContext";

export default function RecipeDetials() {
  const { id } = useParams();
  const { recipes } = useContext(RecipeContext);

  const currentRecipe = recipes.find((recipe) => recipe.id === id);

  return (
    <main>
      <h1>
        {currentRecipe.name}
      </h1>
    </main>
  )
}
