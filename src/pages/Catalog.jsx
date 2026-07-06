import React, { useContext } from "react";

import PageHeader from "../components/PageHeader";
import RecipeCard from "../components/RecipeCard";
import { RecipeContext, RecipeProvider } from "../context/RecipeContext";

export default function Catalog() {
  const { recipes } = useContext(RecipeContext);

  return (
    <main className="container page-view">
      <section className="catalog">
        <PageHeader
          subtitle="Explore your favorite cusine"
          title="Catalog"
        ></PageHeader>

        <div className="recipe-grid">
          {recipes.map((recipe) => (
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
