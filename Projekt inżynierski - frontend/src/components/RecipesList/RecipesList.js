import Avatar from "../Avatar/Avatar";
import { Button, Popover } from "antd";
import { useNavigate } from "react-router-dom";

import "./RecipesList.scss";
export default function RecipesList({ recipes }) {
  const navigate = useNavigate();

  const content = (recipe) => (
    <div>
      <p>{recipe.createdBy.displayName}</p>
    </div>
  );

  return (
    <div className="recipe-list">
      {recipes.length === 0 && <p>Brak przepisów!</p>}
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-list__card">
          <div className="recipe-list__header">
            <h2>{recipe.title}</h2>
            <Popover content={content(recipe)} trigger="hover">
              <Avatar src={recipe.createdBy.photoURL} />{" "}
            </Popover>
          </div>
          <p>{recipe.prepTime} minut na przygotowanie</p>
          <div>{recipe.method[0].value.substring(0, 100)}...</div>
          <div className="recipe-list__category">
            <ul>
              <div
                className="recipe-list__category-list"
                style={{ backgroundColor: "transparent" }}
              >
                {recipe.category.slice(0, 2).map((category) => (
                  <li key={category.value}>
                    <div>
                      <p>{category.value} </p>
                    </div>
                  </li>
                ))}
              </div>
            </ul>

            <Button
              className="add-button"
              onClick={() => navigate(`/recipes/${recipe.id}`)}
            >
              Ugotuj to!
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
