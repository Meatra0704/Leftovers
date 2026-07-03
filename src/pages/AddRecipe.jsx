import React, { useContext, useState } from "react";
import { RecipeContext } from "../context/RecipeContext";

export default function AddRecipe() {
  const setIngredientsState = () => {
    return { id: Date.now(), name: "", amount: "", unit: "whole" };
  };

  const [ingredients, setIngredients] = useState([setIngredientsState()]);
  const [steps, setSteps] = useState([{ id: Date.now(), text: "" }]);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const { recipes, addRecipe } = useContext(RecipeContext);

  //Handle Ingredient Changes
  const handleIngredientChange = (id, field, value) => {
    // const updatedIngredients = [...ingredients];
    // updatedIngredients[id][field] = value;
    // setIngredients(updatedIngredients);
    setIngredients(
      ingredients.map((ing) =>
        ing.id === id ? { ...ing, [field]: value } : ing,
      ),
    );
  };

  const addIngredientRow = () => {
    setIngredients([...ingredients, setIngredientsState()]);
  };

  const removeIngredientRow = (id) => {
    //If last row reset the input
    if (ingredients.length <= 1) {
      setIngredients([setIngredientsState()]);
      return;
    }
    setIngredients(ingredients.filter((ing) => ing.id !== id));
  };

  //Handle Instructions Changes
  const handleStepChange = (id, value) => {
    setSteps(
      steps.map((step) => (step.id === id ? { ...step, text: value } : step)),
    );
  };

  const addStepRow = () => {
    setSteps([...steps, { id: Date.now(), text: "" }]);
  };

  const removeStepRow = (id) => {
    if (steps.length <= 1) {
      setSteps([{ id: Date.now(), text: "" }]);
      return;
    }
    setSteps(steps.filter((step) => step.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Please enter a title for your recipe.");
      return;
    }

    const validIngredient = ingredients.filter((ing) => ing.name.trim() !== "");
    const validStep = steps.filter((step) => step.text.trim() !== "");

    if (validIngredient.length === 0 || validStep.length === 0) {
      setError("Must provide ingredients and instructions before submitting");
      return;
    }

    const isDuplicate = recipes.some(
      (r) => r.title.toLowerCase() === title.toLowerCase().trim(),
    );
    if (isDuplicate) {
      setError("This recipe already exists");
      return;
    }

    setError("");

    const newRecipe = {
      id: Date.now().toString(),
      title: title.trim(),
      ingredients: validIngredient,
      steps: validStep,
      imageUrl: imageUrl.trim(),
    };

    addRecipe(newRecipe);

    setTitle("");
    setImageUrl("");
    setIngredients([setIngredientsState()]);
    setSteps([""]);
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            name="title"
            onChange={handleChange}
            placeholder="Pizza..."
            value={title}
          />
        </label>

        <fieldset>
          <legend>Ingredients</legend>
          {ingredients.map((ingredient) => (
            <div key={ingredient.id}>
              <input
                onChange={(e) =>
                  handleIngredientChange(ingredient.id, "name", e.target.value)
                }
                placeholder="Ingredient (e.g. Salmon)"
                value={ingredient.name}
              />
              <input
                min="0"
                onChange={(e) =>
                  handleIngredientChange(
                    ingredient.id,
                    "amount",
                    e.target.value,
                  )
                }
                placeholder="Qty"
                step="any"
                type="number"
                value={ingredient.amount}
              />

              <select
                onChange={(e) =>
                  handleIngredientChange(ingredient.id, "unit", e.target.value)
                }
                value={ingredient.unit}
              >
                <option value="whole">Whole / Item</option>
                <option value="clove">Clove(s)</option>
                <option value="pinch">Pinch / Dash</option>
                <optgroup label="US Volume">
                  <option value="tsp">Teaspoon (tsp)</option>
                  <option value="tbsp">Tablespoon (tbsp)</option>
                  <option value="fl oz">Fluid Ounce (fl oz)</option>
                  <option value="cup">Cup</option>
                  <option value="pint">Pint</option>
                  <option value="qt">Quart (qt)</option>
                  <option value="gal">Gallon (gal)</option>
                </optgroup>
                <optgroup label="US Weight">
                  <option value="oz">Ounce (oz)</option>
                  <option value="lb">Pound (lb)</option>
                </optgroup>
                <optgroup label="Metric Volume">
                  <option value="ml">Milliliter (ml)</option>
                  <option value="l">Liter (L)</option>
                </optgroup>
                <optgroup label="Metric Weight">
                  <option value="mg">Milligram (mg)</option>
                  <option value="g">Gram (g)</option>
                  <option value="kg">Kilogram (kg)</option>
                </optgroup>
              </select>

              <button
                onClick={() => removeIngredientRow(ingredient.id)}
                type="button"
              >
                Remove
              </button>
            </div>
          ))}
          <button onClick={addIngredientRow} type="button">
            Add Ingredient
          </button>
        </fieldset>

        <fieldset>
          <legend>Instructions</legend>
          {steps.map((step, index) => (
            <div key={step.id}>
              <span>{index + 1}.</span>
              <input
                onChange={(e) => handleStepChange(step.id, e.target.value)}
                placeholder="Add..."
                value={step.text}
              />
              <button onClick={() => removeStepRow(step.id)} type="button">
                Remove
              </button>
            </div>
          ))}

          <button onClick={addStepRow} type="button">
            Add Step
          </button>
        </fieldset>

        <label>
          Share your results:
          <input
            name="imageUrl"
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Place your image..."
            value={imageUrl}
          />
        </label>

        <button type="submit">Submit Recipe</button>
      </form>
    </>
  );
}
