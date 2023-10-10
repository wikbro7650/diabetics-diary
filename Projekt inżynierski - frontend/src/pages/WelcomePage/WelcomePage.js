import "./WelcomePage.scss";
import { useAuthContext } from "../../hooks/useAuthContext";
import Welcome from "../../assets/welcome.png";
import LineChart from "../../assets/lineChart.png";
import Stats from "../../assets/stats.png";
export default function WelcomePage() {
  const { user } = useAuthContext();

  return (
    <div className="welcome-page">
      <div className="welcome-page__header">
        <div>
          <h1>Witaj na stronie Diabetes Dairy, {user.displayName}</h1>
          <h1>Wspaniale, że jesteś!</h1>
        </div>
        <img src={Welcome} alt="Welcome"></img>
      </div>
      <p>
        Od teraz możesz w pełni korzystać z funkcjonalności dostępnych dla
        Ciebie takich jak <a href="/cook-book">Przepisy</a> i{" "}
        <a href="/forum">Forum</a> - dodawaj przepisy i wątki do woli!<br></br>
        <br></br>Jeśli chcesz połączyć dane konto ze swoją bazą danych, która
        gromadzi informacje o Twoim poziomie cukru i mieć dostęp do takich
        wykresów i statystyk
      </p>
      <div className="welcome-page__images">
        <img src={LineChart} alt="Welcome"></img>
        <img src={Stats} alt="Welcome"></img>
      </div>
      <p>
        napisz wiadomość na adres{" "}
        <a href="mailto:wbronowska648@gmail.com">wbronowska648@gmail.com</a>a
        dostosuje stronę tak, aby bez problemu łączyła się z Twoją bazą danych!
      </p>
    </div>
  );
}
