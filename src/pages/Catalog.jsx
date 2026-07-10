import React, { useContext, useState } from "react";

import PageBanner from "../components/PageBanner";
import RecipeGrid from "../components/RecipeGrid";
import { RecipeContext } from "../context/RecipeContext";

import "./Catalog.css";

export default function Catalog() {
  const { recipes } = useContext(RecipeContext);
  const [searchText, setSearchText] = useState("");

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <main className="container page-view">
      <section className="catalog">
        <PageBanner
          onSearchChange={setSearchText}
          searchValue={searchText}
          subtitle="Explore your favorite cuisine"
          title="Catalog"
        />
        <RecipeGrid recipes={filteredRecipes} />
      </section>
    </main>
  );
}
