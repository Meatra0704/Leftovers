import { Heart } from "lucide-react";
import React, { useContext } from "react";

import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";
import RecipeCard from "../components/RecipeCard";
import RecipeGrid from "../components/RecipeGrid";
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
          <RecipeGrid recipes={favoriteRecipes}></RecipeGrid>
        )}
      </section>
    </main>
  );
}
