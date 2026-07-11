import { Plus, Trash2 } from "lucide-react";
import React, { useContext, useRef, useState } from "react";

import Button from "../components/Button";
import { RecipeContext } from "../context/RecipeContext";

import "./AddRecipe.css";

export default function AddRecipe() {
  const setIngredientsState = () => {
    return { id: Date.now(), name: "", amount: "", unit: "whole" };
  };

  const setStepsState = () => {
    return { id: Date.now(), text: "" };
  };

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([setIngredientsState()]);
  const [steps, setSteps] = useState([setStepsState()]);
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState({});
  const { recipes, addRecipe } = useContext(RecipeContext);
  const ingredientRefs = useRef([]);
  const stepRefs = useRef([]);

  const addRow = (setState, getInitialState) => {
    setState((prev) => [...prev, getInitialState()]);
  };

  const removeRow = (setState, currentList, id, getInitialState) => {
    if (currentList.length <= 1) {
      setState([getInitialState()]);
      return;
    }
    setState(currentList.filter((item) => item.id !== id));
  };

  const updateRow = (setState, id, field, value) => {
    setState((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const handleKeyDown = ({
    e,
    index,
    item,
    list,
    setState,
    getInitialState,
    refsArray,
    emptyFieldToCheck,
  }) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addRow(setState, getInitialState);
      setTimeout(() => {
        if (refsArray.current[index + 1]) {
          refsArray.current[index + 1].focus();
        }
      }, 0);
    }

    if (
      e.key === "Backspace" &&
      item[emptyFieldToCheck] === "" &&
      list.length > 1
    ) {
      e.preventDefault();
      removeRow(setState, list, item.id, getInitialState);
      setTimeout(() => {
        if (refsArray.current[index - 1]) {
          refsArray.current[index - 1].focus();
        }
      }, 0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Please enter a title for your recipe.";
    } else if (
      recipes.some((r) => r.title.toLowerCase() === title.toLowerCase().trim())
    ) {
      newErrors.title = "This recipe already exists";
    }

    const hasEmptyIngredient = ingredients.some(
      (ing) => ing.name.trim() === "",
    );
    if (hasEmptyIngredient || ingredients.length === 0) {
      newErrors.ingredients = "All ingredient fields must be filled.";
    }

    const hasEmptyStep = steps.some((step) => step.text.trim() === "");
    if (hasEmptyStep || steps.length === 0) {
      newErrors.steps = "All instruction fields must be filled.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newRecipe = {
      id: Date.now().toString(),
      title: title.trim(),
      ingredients: ingredients,
      steps: steps.map((step) => step.text.trim()),
      imageUrl: imageUrl.trim(),
    };

    addRecipe(newRecipe);

    setTitle("");
    setIngredients([setIngredientsState()]);
    setSteps([setStepsState()]);
    setImageUrl("");
    setErrors({});
  };

  return (
    <main className="container page-view">
      <form className="add-recipe" onSubmit={handleSubmit}>
        <label className="add-recipe__label">
          <div className="add-recipe__header">
            <span>Title</span>

            {errors.title && (
              <span className="add-recipe__error">{errors.title}</span>
            )}
          </div>

          <input
            className={`add-recipe__input ${errors.title ? "add-recipe__input--error" : ""}`}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Pizza..."
            value={title}
          />
        </label>

        <fieldset className="add-recipe__fieldset">
          <legend className="add-recipe__header">
            <span>Ingredients</span>

            {errors.ingredients && (
              <span className="add-recipe__error">{errors.ingredients}</span>
            )}
          </legend>

          {ingredients.map((ingredient, index) => (
            <div
              className="add-recipe__row add-recipe__row--ingredient"
              key={ingredient.id}
            >
              <input
                className={`add-recipe__input ${errors.ingredients ? "add-recipe__input--error" : ""}`}
                onChange={(e) =>
                  updateRow(
                    setIngredients,
                    ingredient.id,
                    "name",
                    e.target.value,
                  )
                }
                onKeyDown={(e) =>
                  handleKeyDown({
                    e,
                    index,
                    item: ingredient,
                    list: ingredients,
                    setState: setIngredients,
                    getInitialState: setIngredientsState,
                    refsArray: ingredientRefs,
                    emptyFieldToCheck: "name",
                  })
                }
                placeholder="Ingredient (e.g. Salmon)"
                ref={(el) => (ingredientRefs.current[index] = el)}
                value={ingredient.name}
              />

              <input
                className={`add-recipe__input ${errors.ingredients ? "add-recipe__input--error" : ""}`}
                min="0"
                onChange={(e) =>
                  updateRow(
                    setIngredients,
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
                className={`add-recipe__input ${errors.ingredients ? "add-recipe__input--error" : ""}`}
                onChange={(e) =>
                  updateRow(
                    setIngredients,
                    ingredient.id,
                    "unit",
                    e.target.value,
                  )
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

              <Button
                className="add-recipe__btn--remove"
                onClick={() =>
                  removeRow(
                    setIngredients,
                    ingredients,
                    ingredient.id,
                    setIngredientsState,
                  )
                }
                variant="danger"
              >
                <Trash2 size={18} />
              </Button>
            </div>
          ))}

          <Button
            className="add-recipe__btn"
            onClick={() => addRow(setIngredients, setIngredientsState)}
            variant="secondary"
          >
            <Plus size={18} style={{ marginRight: "8px" }} /> Add Ingredient
          </Button>
        </fieldset>

        <fieldset className="add-recipe__fieldset">
          <legend className="add-recipe__header">
            <span>Instructions</span>

            {errors.steps && (
              <span className="add-recipe__error">{errors.steps}</span>
            )}
          </legend>

          {steps.map((step, index) => (
            <div
              className="add-recipe__row add-recipe__row--step"
              key={step.id}
            >
              <span className="add-recipe__step-number">{index + 1}.</span>
              <input
                className={`add-recipe__input ${errors.steps ? "add-recipe__input--error" : ""}`}
                onChange={(e) =>
                  updateRow(setSteps, step.id, "text", e.target.value)
                }
                onKeyDown={(e) =>
                  handleKeyDown({
                    e,
                    index,
                    item: step,
                    list: steps,
                    setState: setSteps,
                    getInitialState: setStepsState,
                    refsArray: stepRefs,
                    emptyFieldToCheck: "text",
                  })
                }
                placeholder="Add..."
                ref={(el) => (stepRefs.current[index] = el)}
                value={step.text}
              />
              <Button
                className="add-recipe__btn--remove"
                onClick={() =>
                  removeRow(setSteps, steps, step.id, setStepsState)
                }
                variant="danger"
              >
                <Trash2 size={18} />
              </Button>
            </div>
          ))}

          <Button
            className="add-recipe__btn"
            onClick={() => addRow(setSteps, setStepsState)}
            variant="secondary"
          >
            <Plus size={18} style={{ marginRight: "8px" }} /> Add Step
          </Button>
        </fieldset>

        <label className="add-recipe__label">
          <div className="add-recipe__header">
            <span>Share your results</span>
          </div>

          <input
            className="add-recipe__input"
            name="imageUrl"
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Place your image..."
            value={imageUrl}
          />
        </label>

        <Button className="add-recipe__btn " type="submit" variant="primary">
          Submit Recipe
        </Button>
      </form>
    </main>
  );
}
