import { useCollection } from "../../hooks/useCollection";
import "./ActivityTable.scss";

export default function ActivityTable() {
  const { documents, error } = useCollection("activity");
  const today = new Date().toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  });
  const activity =
    documents &&
    documents
      .filter(
        (activity) =>
          activity.date.toDate().toLocaleDateString("pl-PL", {
            year: "numeric",
            month: "2-digit",
            day: "numeric",
          }) === today
      )
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  console.log(activity);
  return (
    <div>
      <h4 style={{ marginTop: "30px" }}>Dzisiejsza aktywność</h4>
      <div className="dailyStats-activity">
        <div className="dailyStats-activity__headers">
          <p>
            <strong>Data</strong>
          </p>
          <p>
            <strong>Czas trwania</strong>
          </p>
          <p>
            <strong>Komentarz</strong>
          </p>
        </div>
        <ul>
          {activity &&
            activity.map((activity) => (
              <li key={activity.value}>
                <div className="dailyStats-activity__activity">
                  <p>
                    {activity.date.toDate().toLocaleTimeString("pl-PL", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p>{activity.duration}min</p>
                  {/* <div className="recipe-step-text"> */}
                  <p>{activity.comments}</p>
                  {/* </div> */}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
