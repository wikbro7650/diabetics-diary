import { Link } from "react-router-dom";

import { Popover } from "antd";
import Avatar from "../Avatar/Avatar";

import "./ThreadsList.scss";
export default function ThreadsList({ threads }) {
  const content = (thread) => (
    <div>
      <p>{thread.createdBy.displayName}</p>
    </div>
  );

  return (
    <div className="thread-list">
      {threads.length === 0 && <p>Brak postów!</p>}
      {threads.map((thread) => (
        <Link to={`thread/${thread.id}`} key={thread.id}>
          <div className="thread-list__header">
            {thread.title.length > 80 ? (
              <h4>{thread.title.substring(0, 80)}...</h4>
            ) : (
              <h4>{thread.title.substring(0, 80)}</h4>
            )}
          </div>
          <div className="thread-list__info">
            <div>
              <div className="thread-statistic">
                <p>Odpowiedzi : {thread.comments.length}</p>
              </div>
              <div className="create-date">
                <p>
                  Stworzone dnia :{" "}
                  {thread.createdAt.toDate().toLocaleString("pl-PL", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="thread-list__created-by">
              <Popover content={content(thread)} trigger="hover">
                <Avatar src={thread.createdBy.photoURL} />
              </Popover>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
