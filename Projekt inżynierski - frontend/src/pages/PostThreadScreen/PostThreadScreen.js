import "./PostThreadScreen.scss";
import { useState } from "react";
import Select from "react-select";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";
//COOKING BOOK

export default function PostThreadScreen(props) {
  const { onSubmit } = props;
  const navigate = useNavigate();
  const { addDocument, response } = useFirestore("threads");
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);

  const [formError, setFormError] = useState(null);

  const categories = [
    { value: "Cukrzyca typu 1", label: "Cukrzyca typu 1" },
    { value: "Cukrzyca typu 2", label: "Cukrzyca typu 2" },
    { value: "Przyjaciele & rodzina", label: "Przyjaciele & rodzina" },
    { value: "Jedzenie & dieta", label: "Jedzenie & dieta" },
    { value: "Badanie cukru we krwi", label: "Badanie cukru we krwi" },
    { value: "Pompy insulinowe", label: "Pompy insulinowe" },
    { value: "Aktywność fizyczna", label: "Aktywność fizyczna" },
    { value: "Utrata wagi", label: "Utrata wagi" },
    { value: "Powikłania", label: "Powikłania" },
    { value: "Przedstaw się", label: "Przedstaw się" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const thread = {
      title: title,
      description: description,
      comments: [],
      category: category,
      createdBy: createdBy,
    };

    await addDocument(thread);
    if (!response.error) {
      navigate("/forum");
    }
    setTitle("");
    setDescription("");
    setCategory([]);
    onSubmit();
  };

  return (
    <div className="create-thread-form">
      <h2 className="page-title">Dodaj post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Tytuł:</span>
          <input
            required
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <span>Opis:</span>
          <textarea
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </label>
        <label>
          <span>Kategoria:</span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
            placeholder="Szukaj..."
            isMulti
          />
        </label>
        {formError && <p className="error">{formError}</p>}

        <button className="btn">Dodaj post</button>
      </form>
    </div>
  );
}
