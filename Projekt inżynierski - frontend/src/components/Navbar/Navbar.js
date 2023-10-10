import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Button } from "antd";

import "./Navbar.scss";
import Logo from "../../assets/logo.png";

export default function Navbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className="navbar">
      <ul>
        <li className="navbar__logo">
          <img src={Logo} alt="Diabetes diary logo" />
        </li>
        {!user ? (
          <>
            <li>
              <Link to="/login">Zaloguj się</Link>
            </li>
            <li>
              <Link to="/signup">Zarejestruj się</Link>
            </li>
          </>
        ) : (
          <li>
            {!isPending ? (
              <Button className="navbar__logout-button" onClick={logout}>
                Wyloguj
              </Button>
            ) : (
              <Button
                className="navbar__logout-button"
                onClick={logout}
                disabled
              >
                Logging out...
              </Button>
            )}
          </li>
        )}
      </ul>
    </div>
  );
}
