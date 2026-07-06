import { Heart } from "lucide-react";
import React, { useContext } from "react";

import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";
import RecipeCard from "../components/RecipeCard";
import { RecipeContext } from "../context/RecipeContext";

export default function Favorites() {
  const { recipes } = useContext(RecipeContext);

  const favoriteRecipes = recipes.filter((recipe) => recipe.isFavorite);

  return (
    <main className="container page-view">
      <section className="favorites">
        <PageHeader
          subtitle="All your saved recipes in one place."
          title="Your Favorites"
        ></PageHeader>

        {favoriteRecipes.length === 0 ? (
          <EmptyState
            icon={Heart}
            linkText="Browse Catalog"
            linkTo="/recipes"
            message="Tap the heart icon on any recipe to save it for later."
            title="No favorites yet"
          />
        ) : (
          <div className="recipe-grid">
            {favoriteRecipes.map((recipe) => (
              <RecipeCard
                id={recipe.id}
                imageUrl={recipe.imageUrl}
                ingredients={recipe.ingredients}
                isFavorite={recipe.isFavorite}
                key={recipe.id}
                title={recipe.title}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
