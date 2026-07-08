import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { RecipeContext, RecipeProvider } from "../context/RecipeContext";

export default function RecipeDetials() {
  const { id } = useParams();
  const { recipes } = useContext(RecipeContext);

  const currentRecipe = recipes.find((recipe) => recipe.id === id);

  return (
    <main>
      <img alt={currentRecipe.title} src={currentRecipe.imageUrl}></img>
      <h1>{currentRecipe.title}</h1>
      <h2>Ingredients</h2>
      <ul>
        {currentRecipe.ingredients.map((ing) => (
          <li key={ing.id}>{ing.amount} {ing.unit} of {ing.name}</li>
        ))}
      </ul>
    </main>
  );
}
