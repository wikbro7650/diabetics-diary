import { useCollection } from "../../hooks/useCollection";
import Avatar from "../Avatar/Avatar";

import "./OnlineUsers.scss";

export default function OnlineUsers() {
  const { error, documents } = useCollection("users");

  return (
    <div className="user-list">
      <h2>Użytkownicy</h2>
      {error && <div className="error">{error}</div>}
      {documents &&
        documents.map((user) => (
          <div key={user.id} className="user-list__item">
            {user.online && <span className="user-list__online-user"></span>}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </div>
        ))}
    </div>
  );
}
