import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { RecipeContext, RecipeProvider } from "../context/RecipeContext";

export default function RecipeDetials() {
  const { id } = useParams();
  const { recipes } = useContext(RecipeContext);

  const currentRecipe = recipes.find((recipe) => recipe.id === id);

  return (
    <main className="container page-view">
      <section className="recipe-detail">
        <div className="recipe-detail__image-box">
          <h1 className="recipe-detail__title">{currentRecipe.title}</h1>
          <img
            alt={currentRecipe.title}
            className="recipe-detail__image"
            src={currentRecipe.imageUrl}
          ></img>
        </div>
        <div className="recipe-detail__ingredient-box">
          <h2 className="recipe-detail__ingredient-title">Ingredients</h2>
          <ul className="recipe-detail__ingredient-list">
            {currentRecipe.ingredients.map((ing) => (
              <li key={ing.id}>
                {ing.amount} {ing.unit} of {ing.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="recipe-detail__step-box">
          <h2 className="recipe-detail__step-title">Steps</h2>
          <ol className="recipe-detial__step-list">
            {currentRecipe.steps.map((step) => (
              <li key={step.id}>{step}</li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
