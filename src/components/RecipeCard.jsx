import { Heart } from "lucide-react";
import React, { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";
import "./RecipeCard.css";
import Button from "../components/Button";

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
      <img alt={title} className="recipe-card__image" src={imageUrl}></img>

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

        <Button
          className={`recipe-card__btn ${isFavorite ? "recipe-card__btn--favorite" : ""}`}
          onClick={() => toggleFavorite(id)}
        >
          <Heart className="recipe-card__icon" />
        </Button>
      </div>
    </article>
  );
}
