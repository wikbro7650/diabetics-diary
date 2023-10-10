import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import ThreadDetailsScreen from "./ThreadDetailsScreen";

import "./ForumScreen.scss";
import ThreadComments from "./ThreadComments";

export default function ThreadScreen() {
  const { id } = useParams();
  const { error, document } = useDocument("threads", id);
  console.log(document);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!document) {
    return <div className="loading">Ładuje...</div>;
  }

  return (
    <div className="thread-details">
      <ThreadDetailsScreen thread={document} />
      <ThreadComments thread={document} />
    </div>
  );
}
