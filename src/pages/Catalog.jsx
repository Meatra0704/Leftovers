import React, { useContext, useState } from "react";
import PageHeader from "../components/PageHeader";
import RecipeCard from "../components/RecipeCard";
import { RecipeContext, RecipeProvider } from "../context/RecipeContext";

export default function Catalog() {
  const { recipes } = useContext(RecipeContext);
  const [searchText, setSearchText] = useState("");

  return (
    <main className="container page-view">
      <section className="catalog">
        <div className="catalog__header">
          <PageHeader
            subtitle="Explore your favorite cusine"
            title="Catalog"
          ></PageHeader>
          <input
            onChange={(e) => setSearchText(e.target.value)}
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
                key={recipe.id}
                title={recipe.title}
              />
            ))}
        </div>
      </section>
    </main>
  );
}
