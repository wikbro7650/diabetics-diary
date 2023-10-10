import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import Avatar from "../../components/Avatar/Avatar";

import "./CookBookScreen.scss";
// import ThreadComments from "./ThreadComments";

export default function RecipeScreen() {
  const { id } = useParams();
  const { error, document } = useDocument("recipes", id);
  // const [arr, setArr] = useState(inputArr);

  console.log(document);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!document) {
    return <div className="loading">Ładowanie...</div>;
  }
  return (
    <div className="thread-details">
      <div className="thread-details-container">
        <div className="thread-details-container-info">
          <div>
            <h2 className="page-title">{document.title}</h2>
            <p className="created-date">
              Thread created{" "}
              {document.createdAt.toDate().toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="created-by-container">
            <div className="created-by">
              <Avatar src={document.createdBy.photoURL} />
            </div>
            <img src={document.image} alt="Recipe" />
          </div>
        </div>
        <p className="details">{document.description}</p>
      </div>
    </div>
  );
}
