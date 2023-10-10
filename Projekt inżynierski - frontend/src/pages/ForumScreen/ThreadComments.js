import { useState } from "react";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { v4 as uuid } from "uuid";
import { Input } from "antd";
import { useFirestore } from "../../hooks/useFirestore";
import Avatar from "../../components/Avatar/Avatar";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { MessageOutlined } from "@ant-design/icons";

export default function ThreadComments({ thread }) {
  const { updateDocument, response } = useFirestore("threads");
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();
  const unique_id = uuid();
  const { TextArea } = Input;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: unique_id,
    };
    console.log(commentToAdd);
    await updateDocument(thread.id, {
      comments: [...thread.comments, commentToAdd],
    });
    if (!response.error) {
      setNewComment("");
    }
  };
  return (
    <div className="thread-comments">
      <h4>
        {thread.comments.length > 0 ? (
          thread.comments.length === 1 ? (
            <h4>{thread.comments.length} komentarz</h4>
          ) : (
            <h4>{thread.comments.length} komentarzy</h4>
          )
        ) : (
          <h4>Brak komentarzy!</h4>
        )}
      </h4>
      <ul>
        {thread.comments.length > 0 &&
          thread.comments.map((comment) => (
            <li key={comment.id}>
              <div className="thread-comments__comment-author">
                <Avatar src={comment.photoURL} />
                <p>{comment.displayName}</p>
              </div>
              <div className="thread-comments__comment-date">
                <p>
                  {formatDistanceToNow(comment.createdAt.toDate(), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <div className="thread-comments__coment-content">
                <p>{comment.content}</p>
              </div>
            </li>
          ))}
      </ul>
      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Dodaj nowy komentarz:</span>
          <TextArea
            className="thread-comments__add-comment-text"
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></TextArea>
        </label>
        <button
          className="thread-comments__add-comment-btn"
          icon={<MessageOutlined />}
        >
          Dodaj komentarz
        </button>
      </form>
    </div>
  );
}
