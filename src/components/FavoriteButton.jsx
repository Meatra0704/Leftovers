import { Heart } from "lucide-react";
import React, { useState } from "react";
import Button from "./Button";

import "./FavoriteButton.css";

export default function FavoriteButton({
  isFavorite,
  onClick,
  className = "",
}) {
  const [isAnimating, setIsAnimating] = useState(false);

  const classes = [
    "favorite-btn",
    isFavorite && "favorite-btn--active",
    isAnimating && "favorite-btn--animating",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = (e) => {
    if (!isFavorite) setIsAnimating(true);
    onClick();
  };

  return (
    <Button
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={isFavorite}
      className={classes}
      onAnimationEnd={() => setIsAnimating(false)}
      onClick={handleClick}
      variant="ghost"
    >
      <Heart className="favorite-btn__icon" size={28} />
    </Button>
  );
}
