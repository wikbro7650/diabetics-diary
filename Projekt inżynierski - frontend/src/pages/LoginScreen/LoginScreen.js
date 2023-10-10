import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import "./LoginScreen.scss";
import { Button } from "antd";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Zaloguj się</h2>
      <label>
        <span>Email:</span>
        <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Hasło:</span>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {!isPending && <button className="login-button">Zaloguj się</button>}
      {isPending && (
        <button className="login-button" disabled>
          Ładuj
        </button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
}
