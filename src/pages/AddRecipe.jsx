import React, { useState } from "react";

export default function AddRecipe() {
  
  const [ingredients, setIngredients] = useState([
    { name: "", amount: "", measurement: "cup" },
  ]);
  const [steps, setSteps] = useState([""]);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");



  //Handle Ingredient Changes
  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const addIngredientRow = () => {
    setIngredients([
      ...ingredients,
      { name: "", amount: "", measurement: "cup" },
    ]);
  };

  const removeIngredientRow = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  //Handle Instructions Changes
  const handleStepChange = (index, value) => {
    const updatedInstructions = [...steps];
    updatedInstructions[index] = value;
    setSteps(updatedInstructions);
  };

  const addStepRow = () => {
    setSteps([...steps, ""]);
  };

  const removeStepRow = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Successfully submitted:", { title, ingredients, steps, imageUrl });

    if (!title.trim()) {
      setError("Please enter a title for your recipe.");
      return;
    }
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
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
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              onChange={(e) =>
                handleIngredientChange(index, "name", e.target.value)
              }
              placeholder="Ingredient (e.g. Salmon)"
              value={ingredient.name}
            />
            <input
              onChange={(e) =>
                handleIngredientChange(index, "amount", e.target.value)
              }
              placeholder="Qty"
              type="number"
              value={ingredient.amount}
            />
            <button onClick={() => removeIngredientRow(index)} type="button">
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
          <div key={index}>
            <input
              onChange={(e) => handleStepChange(index, e.target.value)}
              placeholder="Add..."
              value={step}
            />
            <button onClick={() => removeStepRow(index)} type="button">
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
  );
}
