import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import RecipeSummary from "./RecipeSummary";

import "./RecipeScreen.scss";

export default function RecipeScreen() {
  const { id } = useParams();
  const { error, document } = useDocument("recipes", id);
  console.log(document);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!document) {
    return <div className="loading">Ładowanie...</div>;
  }

  return (
    <div className="recipe-details">
      <RecipeSummary recipe={document} />
    </div>
  );
}
