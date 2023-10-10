import { NavLink } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState, useEffect } from "react";
import { getGlucoseEntries } from "../../hooks/glucoseServices";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import "./Sidebar.scss";

import {
  BarChartOutlined,
  BookOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import CurrentValueStatistic from "../CurrentValueStatistic/CurrentValueStatistic";

export default function Sidebar() {
  const { user } = useAuthContext();
  const [entries, setEntries] = useState();

  useEffect(() => {
    const fetchEntries = async () => {
      const fetchedEntries = await getGlucoseEntries();
      setEntries(fetchedEntries);
    };
    fetchEntries(entries);

    const interval = setInterval(() => {
      fetchEntries(entries);
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  if (entries === undefined) {
    return null;
  }
  const lastEntry = Object.entries(entries).pop()[1];

  return (
    <div className="sidebar">
      <div className="sidebar__content">
        <div className="sidebar__user">
          <Avatar src={user.photoURL} />
          <p>Cześć {user.displayName}!</p>
        </div>
        {user.uid === "MftKVFhHnTYyuNGqVwqnjV4FAHt2" && (
          <CurrentValueStatistic {...lastEntry} />
        )}

        <nav className="sidebar__links">
          <ul>
            {user.uid === "MftKVFhHnTYyuNGqVwqnjV4FAHt2" && (
              <>
                <li>
                  <NavLink exact to="/">
                    <MdOutlineSpaceDashboard />
                    <span>Strona główna</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink exact to="/statistic">
                    <BarChartOutlined />
                    <span>Statystyki</span>
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink exact to="/cook-book">
                <BookOutlined />
                <span>Przepisy</span>
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/forum">
                <CommentOutlined />
                <span>Forum</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
