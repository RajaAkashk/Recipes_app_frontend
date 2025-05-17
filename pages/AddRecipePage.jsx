import React, { useState } from "react";

function AddRecipePage() {
  const [message, setMessage] = useState(false);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    cuisine: "",
    dishImage: "",
  });

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting recipe:", recipe);
    try {
      const response = await fetch(
        "https://recipes-app-backend.vercel.app/recipe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recipe),
        }
      );
      if (!response.ok) {
        alert("Failed to add new recipe");
        console.error(response);
        return;
      }
      const data = await response.json();
      console.log("response.data", data);
      setMessage(true);
      setTimeout(() => {
        setMessage(false);
      }, 1500);
      setRecipe({
        name: "",
        ingredients: "",
        instructions: "",
        cuisine: "",
        dishImage: "",
      });
    } catch (error) {
      alert("Error in adding new recipe");
      console.error(error);
    }
  };

  return (
    <div className="container my-5">
      {message === true && (
        <div className="fixed-top d-flex justify-content-center pt-5">
          <div className="w-50 text-center alert alert-success" role="alert">
            Recipe Added successfully!
          </div>
        </div>
      )}
      <h2 className="mb-4">Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Recipe Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Ingredients</label>
          <textarea
            className="form-control"
            name="ingredients"
            value={recipe.ingredients}
            placeholder="Separated by commas and space, e.g., oil, chilli, potato"
            onChange={handleChange}
            required
             rows={4}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Instructions</label>
          <textarea
            className="form-control"
            name="instructions"
            value={recipe.instructions}
            placeholder="Separated by commas and space, e.g., Heat oil, Add onions, Cook until golden"
            onChange={handleChange}
            required
             rows={4}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Cuisine</label>
          <input
            type="text"
            className="form-control"
            name="cuisine"
            value={recipe.cuisine}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            name="dishImage"
            value={recipe.dishImage}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-outline-secondary">
          Add Recipe
        </button>
      </form>
    </div>
  );
}

export default AddRecipePage;
