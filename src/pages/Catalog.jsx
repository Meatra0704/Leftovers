import React, { useContext, useState } from "react";
import PageHeader from "../components/PageHeader";
import RecipeCard from "../components/RecipeCard";
import RecipeGrid from "../components/RecipeGrid";
import { RecipeContext, RecipeProvider } from "../context/RecipeContext";

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
        <div className="catalog__wrapper">
          <PageHeader
            className="catalog__header"
            subtitle="Explore your favorite cusine"
            subtitleClassName="catalog__subtitle"
            title="Catalog"
            titleClassName="catalog__title"
          ></PageHeader>

          <input
            className="catalog__searchBar"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search"
            type="text"
            value={searchText}
          ></input>
        </div>

        <RecipeGrid recipes={filteredRecipes} />
      </section>
    </main>
  );
}
