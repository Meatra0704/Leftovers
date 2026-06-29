import React, { useState, } from "react";

export default function AddRecipe() {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    imageUrl: "",
  });

  const { title, ingredients, instructions, imageUrl } = formData;

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Successfully submitted:", formData);
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

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
      <label>
        Ingredients:
        <input
          name="ingredients"
          onChange={handleChange}
          placeholder="Lists your ingredients"
          value={ingredients}
        />
      </label>
      <label>
        Instructions:
        <input
          name="instructions"
          onChange={handleChange}
          placeholder="Step 1..."
          value={instructions}
        />
      </label>
      <label>
        Share your results:
        <input
          name="imageUrl"
          onChange={handleChange}
          placeholder="Place your image..."
          value={imageUrl}
        />
      </label>
      <button type="submit">Submit Recipe</button>
    </form>
  );
}
