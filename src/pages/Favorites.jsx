import { Heart, SearchX } from "lucide-react";
import React, { useContext, useState } from "react";

import EmptyState from "../components/EmptyState";
import PageBanner from "../components/PageBanner";
import RecipeGrid from "../components/RecipeGrid";
import { RecipeContext } from "../context/RecipeContext";

export default function Favorites() {
  const { recipes } = useContext(RecipeContext);
  const [searchText, setSearchText] = useState("");

  const allFavorites = recipes.filter((recipe) => recipe.isFavorite);

  const filteredFavorites = allFavorites.filter((recipe) =>
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

        {allFavorites.length === 0 ? (
          <EmptyState
            icon={Heart}
            linkText="Browse Catalog"
            linkTo="/recipes"
            message="Tap the heart icon on any recipe to save it for later."
            title="No favorites yet"
          />
        ) : filteredFavorites.length === 0 ? (
          <EmptyState
            icon={SearchX}
            message={`You don't have any favorite recipes matching "${searchText}".`}
            title="No matches found"
          />
        ) : (
          <RecipeGrid recipes={filteredFavorites} />
        )}
      </section>
    </main>
  );
}
