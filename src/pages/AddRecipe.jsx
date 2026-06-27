import React, { useState } from "react";

export default function AddRecipe () {
    const [formData, setFormData] = useState({
        title: '',
        ingredients: '',
        instructions:'',
        imageUrl: '',
    });

    const { title, ingredients, instructions, imageUrl} = formData;

    function handleSubmit (e) {
        e.preventDefault();
        console.log('Successfully submitted:', formData);
    };

    function handleChange (e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                    name="title"
                    placeholder="Pizza..."
                    value={title}
                    onChange={handleChange}
                    >
                    </input>
                </label>
                <label>
                    Ingredients:
                    <input
                    name="ingredients"
                    placeholder="Lists your ingredients"
                    value={ingredients}
                    onChange={handleChange}
                    ></input>
                </label>
                <label>
                    Instructions:
                    <input
                    name="instructions"
                    placeholder="Step 1..."
                    value={instructions}
                    onChange={handleChange}
                    >
                    </input>
                </label>
                <label>
                    Share your results:
                    <input
                    name="imageUrl"
                    placeholder="Place your image..."
                    value={imageUrl}
                    onChange={handleChange}
                    >
                    </input>
                </label>
                <button type="submit">Submit Recipe</button>
            </form>
        </>
    )
}



