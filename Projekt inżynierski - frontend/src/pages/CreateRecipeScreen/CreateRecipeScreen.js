import "./CreateRecipeScreen.scss";
import { useState } from "react";
import Select from "react-select";
import { v4 as uuid } from "uuid";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";
import { projectStorage } from "../../firebase/config";
import { Divider } from "antd";

import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
//COOKING BOOK

export default function CreateRecipeScreen() {
  const navigate = useNavigate();
  const { addDocument, response } = useFirestore("recipes");
  const [source, setSource] = useState("");
  const unique_id = uuid();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [method, setMethod] = useState([]);
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [category, setCategory] = useState([]);

  const [image, setimage] = useState(null);
  const [imageError, setimageError] = useState(null);
  const [calories, setCalories] = useState("");
  const [fat, setFat] = useState("");
  const [carbs, setCarbs] = useState("");
  const [protein, setProtein] = useState("");
  const [servings, setServings] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [formError, setFormError] = useState(null);

  const addIngredient = () => {
    setIngredients((s) => {
      return [
        ...s,
        {
          type: "text",
          value: "",
        },
      ];
    });
  };

  const addStep = () => {
    setMethod((s) => {
      return [
        ...s,
        {
          type: "text",
          value: "",
        },
      ];
    });
  };

  const handleChangeIngredients = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setIngredients((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  };

  const handleChangeMethod = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setMethod((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    const uploadPath = `recipes/${unique_id}/${image.name}`;
    const img = await projectStorage.ref(uploadPath).put(image);
    const imgUrl = await img.ref.getDownloadURL();
    console.log(imgUrl);

    const nutrition = {
      calories: calories,
      fat: fat,
      carbs: carbs,
      protein: protein,
    };

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const recipe = {
      title: title,
      method: method,
      prepTime: prepTime,
      cookTime: cookTime,
      servings: servings,
      ingredients: ingredients,
      category: category,
      image: imgUrl,
      source: source,
      createdBy: createdBy,
      nutrition: nutrition,
    };
    console.log(recipe);
    await addDocument(recipe);
    if (!response.error) {
      navigate("/cook-book");
    }
  };

  const categories = [
    { value: "śniadanie", label: "Śniadanie" },
    { value: "lunch", label: "Lunch" },
    { value: "obiad", label: "Obiad" },
    { value: "deser", label: "Deser" },
    { value: "wegańskie", label: "Wegańskie" },
    { value: "niskokaloryczne", label: "Niskokaloryczne" },
    { value: "zupy", label: "Zupy" },
    { value: "wegetariańskie", label: "Wegetariańskie" },
    { value: "koktajle", label: "Koktajle" },
  ];

  const handleFileChange = (e) => {
    setimage(null);
    let selected = e.target.files[0];
    console.log(selected);

    if (!selected) {
      setimageError("Please select a file");
      return;
    }
    if (!selected.type.includes("image")) {
      setimageError("Selected file must be an image");
      return;
    }
    if (selected.size > 1000000) {
      setimageError("Image file size must be less than 100kb");
      return;
    }

    setimageError(null);
    setimage(selected);
  };

  return (
    <div className="create-form">
      <h2 className="page-title">Dodaj przepis</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span className="label-title">Tytuł:</span>
          <input
            required
            maxLength={40}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <div className="create-form-input-container">
          <label>
            <span className="label-title">Czas przygotowania:</span>
            <div className="create-form__input">
              <input
                type="number"
                onChange={(e) => setPrepTime(e.target.value)}
                value={prepTime}
              />
              <span>mins</span>
            </div>
          </label>
          <label>
            <span className="label-title">Czas gotowania:</span>
            <div className="create-form-input">
              <input
                type="number"
                onChange={(e) => setCookTime(e.target.value)}
                value={cookTime}
              />
              <span>mins</span>
            </div>
          </label>
          <label>
            <span className="label-title">Ilość porcji:</span>
            <div className="create-form-input">
              <input
                type="number"
                onChange={(e) => setServings(e.target.value)}
                value={servings}
              />
            </div>
          </label>
        </div>
        <Divider>Wartości odżywcze</Divider>
        <div className="create-form-input-nutrition">
          <label>
            <span className="label-title">Kalorie:</span>
            <div className="create-form-input">
              <input
                type="number"
                onChange={(e) => setCalories(e.target.value)}
                value={calories}
              />
              <span>kcal</span>
            </div>
          </label>
          <label>
            <span className="label-title">Tłuszcz:</span>
            <div className="create-form-input">
              <input
                type="number"
                onChange={(e) => setFat(e.target.value)}
                value={fat}
              />
              <span>g</span>
            </div>
          </label>
          <label>
            <span className="label-title">Węglowodany:</span>
            <div className="create-form-input">
              <input
                type="number"
                onChange={(e) => setCarbs(e.target.value)}
                value={carbs}
              />
              <span>g</span>
            </div>
          </label>
          <label>
            <span className="label-title">Białko:</span>
            <div className="create-form-input">
              <input
                type="number"
                onChange={(e) => setProtein(e.target.value)}
                value={protein}
              />
              <span>g</span>
            </div>
          </label>
        </div>
        <label>
          <label>
            <span className="label-title">Składniki:</span>

            <div className="add-ingredients">
              <div className="ingredients">
                {ingredients.map((ingredient, i) => {
                  return (
                    <input
                      onChange={handleChangeIngredients}
                      value={ingredient.value}
                      id={i}
                      type={ingredient.type}
                      size="40"
                    />
                  );
                })}
                <Button onClick={addIngredient} icon={<PlusOutlined />}>
                  Dodaj{" "}
                </Button>
              </div>
            </div>
          </label>
          <span className="label-title">Sposób przygotowania:</span>
          <div className="add-method-steps">
            <div className="method-steps">
              {method.map((method, i) => {
                return (
                  <div className="add-method-step">
                    <p>{i + 1}.</p>
                    <textarea
                      onChange={handleChangeMethod}
                      value={method.value}
                      id={i}
                      type={method.type}
                    />
                  </div>
                );
              })}
              <Button onClick={addStep} icon={<PlusOutlined />}>
                Dodaj{" "}
              </Button>
            </div>
          </div>
        </label>
        <label>
          <spa className="label-title">Kategorie:</spa>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
            placeholder="Wybierz..."
            isMulti
          />
        </label>
        <label>
          <span className="label-title">Źródło:</span>
          <div className="create-form-input-source">
            <input
              onChange={(e) => setSource(e.target.value)}
              value={source}
              placeholder="Paste URL"
            />
          </div>
        </label>
        <label>
          <span className="label-title">Image:</span>
          <input type="file" onChange={handleFileChange} />
          {imageError && <div className="error">{imageError}</div>}
        </label>
        {formError && <p className="error">{formError}</p>}

        <button className="create-form__add-button">Dodaj przepis</button>
      </form>
    </div>
  );
}
