import React, { useContext, useState } from "react";
import PageHeader from "../components/PageHeader";
import RecipeCard from "../components/RecipeCard";
import { RecipeContext, RecipeProvider } from "../context/RecipeContext";
import "./Catalog.css";

export default function Catalog() {
  const { recipes } = useContext(RecipeContext);
  const [searchText, setSearchText] = useState("");

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
        <div className="recipe-grid">
          {recipes
            .filter((recipe) => {
              const matchSearch = recipe.title
                .toLowerCase()
                .includes(searchText.toLowerCase());
              return matchSearch;
            })
            .map((recipe) => (
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
      </section>
    </main>
  );
}
