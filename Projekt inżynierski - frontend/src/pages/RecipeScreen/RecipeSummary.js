import Avatar from "../../components/Avatar/Avatar";
import { BsDot } from "react-icons/bs";
import { FieldTimeOutlined, UserOutlined } from "@ant-design/icons";

import { Divider } from "antd";
import NutritionFacts from "../../components/NutritionFacts/NutritionFacts";

export default function RecipeSummary({ recipe }) {
  return (
    <div className="recipe-summary">
      <div className="recipe-summary__header">
        <div>
          <h2 className="recipe-summary__page-title">{recipe.title}</h2>
          <div className="recipe-summary__recipe-info">
            <p>
              <FieldTimeOutlined />
              <strong>{recipe.cookTime}</strong> minut{" "}
            </p>
            <p style={{ marginRight: "20px", marginLeft: "20px" }}> | </p>
            <p>
              <strong>
                <UserOutlined />
                {recipe.servings}
              </strong>{" "}
              porcji
            </p>
            <p style={{ marginRight: "20px", marginLeft: "20px" }}> | </p>
            <p>
              <strong>{recipe.nutrition.carbs / recipe.servings}</strong> g
              węglowodany/porcja
            </p>
          </div>
          <div className="recipe-summary__created-by-container">
            <h4>Stworzone przez </h4>
            <div className="recipe-summary__created-by">
              <Avatar src={recipe.createdBy.photoURL} />
            </div>
          </div>
        </div>
      </div>
      <div className="recipe-summary__image-ingredients">
        <div className="recipe-summary__image">
          <img width={"300px"} src={recipe.image} />
        </div>

        <Divider type="vertical" />
        <div className="recipe-summary__recipe-ingredients">
          <h4 className="recipe-summary__label-title">Składniki</h4>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient.ingredient}>
                <p>
                  <BsDot />
                  {ingredient.value}{" "}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="recipe-summary__recipe-method">
        <h4 className="recipe-summary__label-title">Sposób przygotowania</h4>
        <ul>
          {recipe.method.map((method, index) => (
            <li key={method.value}>
              <div className="recipe-summary__step">
                <div className="recipe-summary__step__index">
                  <p>{index + 1}.</p>
                </div>
                <div className="recipe-summary__step__text">
                  <p>{method.value} </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <NutritionFacts {...recipe.nutrition} servings={recipe.servings} />
      <p className="recipe-summary__source">
        <strong>Źródło: </strong>
        <a
          target="_blank"
          href="https://www.simplyrecipes.com/chickpea-panini-recipe-6281064"
          rel="noreferrer"
        >
          https://www.simplyrecipes.com/chickpea-panini-recipe-6281064
        </a>
      </p>
    </div>
  );
}
