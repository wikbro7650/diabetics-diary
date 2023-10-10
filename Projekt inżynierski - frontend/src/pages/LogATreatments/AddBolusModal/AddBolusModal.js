import "./AddBolusModal.scss";
import { useState } from "react";
import { timestamp } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useFirestore } from "../../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";
import { Divider } from "antd";
import { DatePicker } from "antd";

// import moment from "moment";

import dayjs from "dayjs";
export default function AddBolusModal(props) {
  const { onSubmit } = props;
  const navigate = useNavigate();
  const { addDocument, response } = useFirestore("bolus");
  const { user } = useAuthContext();

  const [date, setDate] = useState("");
  const [insulinAmount, setInsulinAmount] = useState("");
  const [glucoseReading, setGlucoseReading] = useState("");
  const [carbs, setCarbs] = useState("");
  const [mealName, setMealName] = useState("");
  const [comment, setComment] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    // console.log("submit");
    e.preventDefault();
    setFormError(null);

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const meal = {
      name: mealName,
      carbs: carbs,
    };

    const bolus = {
      date: timestamp.fromDate(new Date(date)),
      insulinAmount: insulinAmount,
      glucoseReading: glucoseReading,
      createdBy: createdBy,
      comment: comment,
      meal: meal,
    };
    console.log(bolus);

    await addDocument(bolus);
    if (!response.error) {
      navigate("/");
    }
    onSubmit();
  };

  return (
    <div className="create-form">
      <h2 className="page-title">Dodaj bolus</h2>
      <form onSubmit={handleSubmit}>
        <div className="create-form-input-container">
          <label>
            <span>Podana dawka insuliny:</span>
            <div className="create-form-input">
              <input
                type="number"
                onChange={(e) => setInsulinAmount(e.target.value)}
                value={insulinAmount}
              />
              <span>jednostki</span>
            </div>
          </label>

          <label>
            <span>Odczyt z glukometru:</span>
            <div className="create-form-input">
              <input
                type="number"
                onChange={(e) => setGlucoseReading(e.target.value)}
                value={glucoseReading}
              />
              <span>mg/dl</span>
            </div>
          </label>
        </div>
        <Divider>Posiłek</Divider>
        <div className="set-date-meal">
          <div>
            <p>Nazwa/typ</p>
            <input
              type="text"
              onChange={(e) => setMealName(e.target.value)}
              value={mealName}
            />
          </div>
          <div>
            <p>Ilość węglowodanów</p>
            <input
              type="text"
              onChange={(e) => setCarbs(e.target.value)}
              value={carbs}
            />
          </div>
        </div>
        <Divider>Data</Divider>
        <div className="set-date">
          <DatePicker
            className="set-date-date"
            format="YYYY-MM-DD HH:mm"
            showTime={{ defaultValue: dayjs("00:00", "HH:mm") }}
            onChange={(e) => setDate(e)}
            value={date}
          />
        </div>
        <Divider>Notatki/komentarze (opcjonalnie):</Divider>
        <label>
          {/* <span>Additional Notes, Comments:</span> */}
          <textArea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
        </label>

        {formError && <p className="error">{formError}</p>}

        <button className="btn">Zatwierdź</button>
      </form>
    </div>
  );
}
