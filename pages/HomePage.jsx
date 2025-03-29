import { useState, useEffect } from "react";
import useFetch from "../UseFetch";
import { Link } from "react-router-dom";

function HomePage() {
  const [message, setMessage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recipiesData, setRecipiesData] = useState([]);
  const { data, loading, error } = useFetch(
    "https://recipes-app-backend.vercel.app/recipes"
  );

  useEffect(() => {
    if (data?.allRecipes) {
      setRecipiesData(data?.allRecipes);
    }
  }, [data]);

  const handleDeleteRecipe = async (id) => {
    console.log("handleDeleteRecipe", id);
    try {
      const response = await fetch(
        `https://recipes-app-backend.vercel.app/recipe/${id}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        alert("Failed to delete the recipe.");
        return;
      }
      const data = await response.json();
      console.log("Delete response:", data.recipe);

      setRecipiesData((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== data.recipe._id)
      );

      setMessage(true);
      setTimeout(() => setMessage(false), 1500);
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Error deleting recipe");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
    if (e.target.value.length > 0) {
      const filteredData = data.allRecipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setRecipiesData(filteredData);
    } else {
      setRecipiesData(data.allRecipes);
    }
  };

  return (
    <div className="container py-4">
      <div className="mb-3">
        <input
          className="form-control me-2"
          type="text"
          placeholder="Search for your favourite recipe here"
          aria-label="Search"
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <div className="row">
        <h3>All Recipes</h3>
        {message === true && (
          <div className="fixed-top d-flex justify-content-center pt-5">
            <div className="w-50 text-center alert alert-success" role="alert">
              Recipe deleted successfully!
            </div>
          </div>
        )}
        {loading === true ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : recipiesData.length > 0 ? (
          recipiesData.map((recipe) => (
            <div key={recipe._id} className="col-12 col-lg-4 col-md-6 mb-4">
              <div className="card">
                <img
                  // style={{ height: "50vh", objectFit: "cover" }}
                  src={recipe.dishImage}
                  className="card-img-top dishImage"
                  alt={recipe.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{recipe.name}</h5>
                  <p className="card-text mb-0">
                    <strong>Cuisine:</strong> {recipe.cuisine}
                  </p>
                  <p className="card-text">
                    <strong>Ingredients:</strong>{" "}
                    {recipe.ingredients.slice(0, 100)}...
                  </p>
                  <Link
                    to={`/recipe/${recipe._id}`}
                    className="btn btn-outline-secondary"
                  >
                    View Recipe
                  </Link>
                  <button
                    onClick={() => handleDeleteRecipe(recipe._id)}
                    className="float-end btn btn-outline-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No Recipe Found</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
