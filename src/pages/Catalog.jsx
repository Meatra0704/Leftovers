import React, { useContext } from "react";
import PageHeader from "../components/PageHeader";
import RecipeCard from "../components/RecipeCard";
import { RecipeContext, RecipeProvider } from "../context/RecipeContext";

export default function Catalog() {
  const { recipes } = useContext(RecipeContext);

  return (
    <div className="container page-view">
      <div className="catalog">
        <PageHeader
          subtitle="Explore your favorite cusine"
          title="Catalog"
        ></PageHeader>
        {recipes.map((recipe) => (
          <RecipeCard
            id={recipe.id}
            imageUrl={recipe.imageUrl}
            ingredients={recipe.ingredients}
            key={recipe.id}
            title={recipe.title}
          />
        ))}
      </div>
    </div>
  );
}
