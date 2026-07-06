import React from "react";
import "./RecipeCard.css";

export default function RecipeCard({ title, ingredients, imageUrl }) {
  return (
    <article className="recipe-card">
      <img alt={title} className="recipe-card__image" src={imageUrl}></img>
      <div className="recipe-card__content">
        <h3 className="recipe-card__title">{title}</h3>
        <h4 className="recipe-card__ingredient-head">Main Ingredients</h4>
        <ul className="recipe-card__list">
          {ingredients.map((ing) => (
            <li className="recipe-card__item" key={ing.id}>
              {ing.name}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
