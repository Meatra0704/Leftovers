import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

import RecipeCard from "./RecipeCard";

import "./RecipeCarousel.css";

export default function RecipeCarousel({ title, recipes, linkTo, className }) {
  const carouselRef = useRef(null);
  const [progress, setProgress] = useState({ width: 33.333, left: 0 });

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const fillWidth = (clientWidth / scrollWidth) * 100;
    const maxScroll = scrollWidth - clientWidth;
    const scrollPct = maxScroll > 0 ? scrollLeft / maxScroll : 0;
    const left = scrollPct * (100 - fillWidth);

    setProgress({ width: fillWidth, left });
  };

  if (!recipes || recipes.length === 0) return null;

  return (
    <section className={`carousel ${className}`}>
      <header className="carousel__header">
        <Link className="carousel__link" to={linkTo}>
          <h2 className="carousel__title">{title}</h2>
        </Link>
      </header>

      <div
        className="carousel__track"
        onScroll={handleScroll}
        ref={carouselRef}
      >
        {recipes.map((recipe) => (
          <div className="carousel__item" key={recipe.id}>
            <RecipeCard {...recipe} className="carousel__card" hideFavorite />
          </div>
        ))}
      </div>

      <div className="carousel__progress">
        <div
          className="carousel__fill"
          style={{ width: `${progress.width}%`, left: `${progress.left}%` }}
        />
      </div>
    </section>
  );
}
