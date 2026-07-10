import React, { useContext, useMemo } from "react";

import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import RecipeCarousel from "../components/RecipeCarousel";
import { RecipeContext } from "../context/RecipeContext";

import "./Home.css";

export default function Home() {
  const { recipes } = useContext(RecipeContext);

  const maxCarousel = 6;
  const featuredRecipes = useMemo(() => {
    return [...recipes].sort(() => 0.5 - Math.random()).slice(0, maxCarousel);
  }, [recipes]);

  return (
    <main className="home">
      <section className="hero">
        <div className="container hero__inner">
          <PageHeader
            className="hero__header"
            subtitle="A calm little recipe corner for weeknight dinners, cozy breakfasts,
            and anything that tastes better with a hand-drawn note in the
            margin."
            subtitleClassName="hero__subtitle"
            title="Clean recipes for playful home cooks."
            titleClassName="hero__title"
          ></PageHeader>

          <div className="hero__actions">
            <Button className="hero__btn" to="/recipes">
              Browse Catalog
            </Button>

            <Button className="hero__btn" to="/add" variant="secondary">
              Add Recipe
            </Button>
          </div>
        </div>
      </section>

      <RecipeCarousel
        className="container"
        linkTo="/recipes"
        recipes={featuredRecipes}
        title="Featured Recipes"
      />
    </main>
  );
}
