import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { RecipeContext, RecipeProvider } from "../context/RecipeContext";
import "./RecipeDetails.css";
import { Frown, ListChecks, ShoppingBasket } from "lucide-react";
import EmptyState from "../components/EmptyState";

export default function RecipeDetials() {
  const { id } = useParams();
  const { recipes } = useContext(RecipeContext);

  const currentRecipe = recipes.find((recipe) => recipe.id === id);

  if (!currentRecipe) {
    return (
      <EmptyState
        icon={Frown}
        linkText="Browse Catalog"
        linkTo="/recipes"
        message="Try something else."
        title="Couldn't find the food"
      />
    );
  }

  return (
    <main className="container page-view">
      <section className="recipe-detail">
        <div className="recipe-detail__image-box">
          <img
            alt={currentRecipe.title}
            className="recipe-detail__image"
            src={currentRecipe.imageUrl}
          ></img>
          <h1 className="recipe-detail__title">{currentRecipe.title}</h1>
        </div>
        <div className="recipe-detail__box">
          <header className="recipe-detail__box-header recipe-detail__box-header--left">
            <span className="icon-basket">
              <ShoppingBasket className="recipe-detail__svg" />
            </span>
            <h2 className="recipe-detail__ingredient-title">Ingredients</h2>
          </header>
          <ul className="recipe-detail__ingredient-list">
            {currentRecipe.ingredients.map((ing) => (
              <li key={ing.id}>
                {ing.amount} {ing.unit} of {ing.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="recipe-detail__step-box">
          <header className="recipe-detail__step-header">
            <span className="icon-list">
              <ListChecks className="recipe-detail__svg" />
            </span>
            <h2 className="recipe-detail__step-title">Directions</h2>
          </header>
          <ol className="recipe-detail__step-list">
            {currentRecipe.steps.map((step, index) => (
              <li className="recipe-detail__step-item" key={index}>
                <h2 className="recipe-detail__step-item-title">
                  Step {index + 1}
                </h2>
                <p key={step.id}>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
