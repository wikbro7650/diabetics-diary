import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

import "./SignupScreen.scss";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, isPending, error } = useSignup();

  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];
    console.log(selected);

    if (!selected) {
      setThumbnailError("Wybierz plik");
      return;
    }
    if (!selected.type.includes("image")) {
      setThumbnailError("Plik musi być w formacie jpg");
      return;
    }
    if (selected.size > 1000000) {
      setThumbnailError("Zdjęcie musi mieć mniej niż 100kb");
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Zarejestruj się</h2>
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
      <label>
        <span>Nazwa użytkownika:</span>
        <input
          required
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>Zdjęcie profilowe:</span>
        <input required type="file" onChange={handleFileChange} />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      {!isPending && <button className="signin-button">Zarejestruj się</button>}
      {isPending && (
        <button className="signin-button" disabled>
          Ładowanie...
        </button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
}
