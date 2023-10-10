import "./AddActivityModal.scss";
import { useState } from "react";
import { timestamp } from "../../../firebase/config";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useFirestore } from "../../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";
import { Divider } from "antd";
import { DatePicker } from "antd";

// import moment from "moment";

import dayjs from "dayjs";
export default function AddActivityModal(props) {
  const { onSubmit } = props;
  const navigate = useNavigate();
  const { addDocument, response } = useFirestore("activity");
  const { user } = useAuthContext();

  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [comments, setComments] = useState("");
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

    const activity = {
      date: timestamp.fromDate(new Date(date)),
      duration: duration,
      createdBy: createdBy,
      comments: comments,
    };
    console.log(activity);

    await addDocument(activity);
    if (!response.error) {
      navigate("/");
    }
    onSubmit();
  };

  return (
    <div className="create-form">
      <h2 className="page-title">Dodaj aktywność</h2>
      <form onSubmit={handleSubmit}>
        <div className="create-form__input-container">
          <label>
            <Divider>Czas trwania</Divider>
            <div className="create-form__input">
              <input
                type="number"
                onChange={(e) => setDuration(e.target.value)}
                value={duration}
              />
              <span>minut</span>
            </div>
          </label>
        </div>
        {/* </div> */}
        <Divider>Data</Divider>
        <div className="create-form__set-date">
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
          <textArea
            onChange={(e) => setComments(e.target.value)}
            value={comments}
          />
        </label>

        {formError && <p className="error">{formError}</p>}

        <button className="btn">Zatwierdź</button>
      </form>
    </div>
  );
}
