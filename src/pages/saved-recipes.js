import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { useCookies } from "react-cookie";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://mern-stack-recipe-app-backend.onrender.com/recipes/user/${userID}`,
          {
            headers: { authorization: `Bearer ${cookies.access_token}` },
          }
        );
        setSavedRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, [userID, cookies.access_token]);

  return (
    <div>
      <h1>My Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <p>{recipe.instructions}</p>
            <p>{recipe.description}</p>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Ingredients: {recipe.ingredients.join(", ")}</p>
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
