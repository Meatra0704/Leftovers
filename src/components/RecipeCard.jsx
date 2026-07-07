import { Heart, Utensils } from "lucide-react";
import React, { useContext } from "react";

import Button from "../components/Button";
import FavoriteButton from "../components/FavoriteButton";
import { RecipeContext } from "../context/RecipeContext";

import "./RecipeCard.css";

export default function RecipeCard({
  id,
  title,
  ingredients,
  imageUrl,
  isFavorite,
}) {
  const { toggleFavorite } = useContext(RecipeContext);

  return (
    <article className="recipe-card">
      {imageUrl ? (
        <img alt={title} className="recipe-card__image" src={imageUrl} />
      ) : (
        <div
          aria-label={`Placeholder image for ${title}`}
          className="recipe-card__image recipe-card__image--fallback"
          role="img"
        >
          <Utensils aria-hidden="true" size={48} />
        </div>
      )}

      <div className="recipe-card__content">
        <h3 className="recipe-card__title">{title}</h3>

        <h4 className="recipe-card__subtitle">Main Ingredients</h4>

        <ul className="recipe-card__list">
          {ingredients.slice(0, 3).map((ing) => (
            <li className="recipe-card__item" key={ing.id}>
              {ing.name}
            </li>
          ))}
        </ul>

        <FavoriteButton
          className="recipe-card__btn"
          isFavorite={isFavorite}
          onClick={() => toggleFavorite(id)}
        ></FavoriteButton>
      </div>
    </article>
  );
}
