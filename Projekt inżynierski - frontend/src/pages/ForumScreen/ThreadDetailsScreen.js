import Avatar from "../../components/Avatar/Avatar";

export default function ThreadDetailsScreen({ thread }) {
  return (
    <div className="thread-details">
      <div className="thread-details__info">
        <div>
          <h2 className="page-title">{thread.title}</h2>
          <p className="thread-details__info__created-date">
            Post stworzony{" "}
            {thread.createdAt.toDate().toLocaleString("pl-PL", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="created-by-container">
          {/* <h4>Created By </h4> */}
          <div className="thread-details__info__created-by">
            <Avatar src={thread.createdBy.photoURL} />
          </div>
        </div>
      </div>
      <p className="thread-details__details">{thread.description}</p>
      <ul>
        <div
          className="thread-details__category-list"
          style={{ backgroundColor: "transparent" }}
        >
          {thread.category.slice(0, 2).map((category) => (
            <li key={category.value}>
              <div>
                <p>{category.value} </p>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}
