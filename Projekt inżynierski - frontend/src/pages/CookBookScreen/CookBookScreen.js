import "./CookBookScreen.scss";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import RecipesList from "../../components/RecipesList/RecipesList";
import { useCollection } from "../../hooks/useCollection";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import RecipeFilter from "./RecipeFilter";

export default function CookBookScreen() {
  const { documents, error } = useCollection("recipes");
  const [currentFilter, setCurrentFilter] = useState({
    text: "",
    group: "wszystkie",
  });
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  const recipes = documents
    ? documents
        .filter((document) => {
          switch (currentFilter.group) {
            case "wszystkie":
              return true;
            case "moje":
              return document.createdBy.id === user.uid ? true : false;
            case "obiad":
            case "lunch":
            case "wegańskie":
            case "niskokaloryczne":
            case "deser":
            case "zupy":
            case "wegetariańskie":
            case "koktajle":
            case "śniadanie":
              let haveCategory = false;
              document.category.forEach((c) => {
                if (c.value === currentFilter.group) {
                  haveCategory = true;
                }
              });
              return haveCategory;
            default:
              return false;
          }
        })
        .filter((document) =>
          document.title
            .toString()
            .toLowerCase()
            .includes(currentFilter.text.toString().toLowerCase())
        )
    : null;

  return (
    <div className="cookBook-screen">
      <h2 className="page-title">Przepisy</h2>
      <Button
        icon={<PlusOutlined />}
        className="add-button"
        onClick={() => navigate("/create-recipe")}
      >
        Dodaj przepis
      </Button>

      {error && <p className="error">{error}</p>}
      {documents && (
        <RecipeFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {documents && <RecipesList recipes={recipes} />}
    </div>
  );
}
