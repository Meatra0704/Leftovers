import { Heart } from "lucide-react";
import React, { useContext, useState } from "react";

import EmptyState from "../components/EmptyState";
import PageBanner from "../components/PageBanner";
import RecipeGrid from "../components/RecipeGrid";
import { RecipeContext } from "../context/RecipeContext";

export default function Favorites() {
  const { recipes } = useContext(RecipeContext);
  const [searchText, setSearchText] = useState("");

  const favoriteRecipes = recipes
    .filter((recipe) => recipe.isFavorite)
    .filter((recipe) =>
      recipe.title.toLowerCase().includes(searchText.toLowerCase()),
    );

  return (
    <main className="container page-view">
      <section className="favorites">
        <PageBanner
          onSearchChange={setSearchText}
          searchValue={searchText}
          subtitle="All your saved recipes in one place."
          title="Your Favorites"
        />
        {favoriteRecipes.length === 0 ? (
          <EmptyState
            icon={Heart}
            linkText="Browse Catalog"
            linkTo="/recipes"
            message="Tap the heart icon on any recipe to save it for later."
            title="No favorites yet"
          />
        ) : (
          <RecipeGrid recipes={favoriteRecipes} />
        )}
      </section>
    </main>
  );
}
