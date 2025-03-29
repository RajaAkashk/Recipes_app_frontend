import React, { useEffect, useState } from "react";
import useFetch from "../UseFetch";
import { useParams } from "react-router-dom";

function RecipeDetailPage() {
  const { id } = useParams();

  const [recipeData, setRecipeData] = useState([]);

  const { data, loading, error } = useFetch(
    `https://recipes-app-backend.vercel.app/recipe/${id}`
  );

  useEffect(() => {
    setRecipeData(data?.recipe);
    console.log("RecipeDetailPage setRecipeData ", data?.recipe);
  });
  return (
    <div className="container py-4">
      {loading === true ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="row customPadding">
          <h2 className="display-6 mb-4 fw-medium p-0">{recipeData?.name}</h2>
          <div className="card mb-3 p-0">
            <div className="custom-row g-0 ">
              <div className="col-md-4">
                <img
                  src={recipeData?.dishImage}
                  className="img-fluid custom-img"
                  style={{ minHeight: "100%", objectFit: "cover" }}
                  alt={recipeData?.name}
                />
              </div>
              <div className="col-md-8 custom-horizontal-padding">
                <div className="card-body">
                  <div className="mb-2">
                    <span className="fs-4 fw-medium">
                      Cuisine:{" "}
                      <span className="fs-4">{recipeData?.cuisine}</span>
                    </span>
                  </div>

                  <div>
                    <p className="fs-4 fw-medium">Ingredients</p>
                    <p className="fs-5">{recipeData?.ingredients}</p>
                  </div>

                  <div>
                    <p className="fs-4 fw-medium">Instructions</p>
                    <ol>
                      {recipeData?.instructions
                        ?.split(". ")
                        ?.map((step, index) =>
                          step ? (
                            <li key={index} className="fs-5">
                              {step}
                            </li>
                          ) : null
                        )}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeDetailPage;
