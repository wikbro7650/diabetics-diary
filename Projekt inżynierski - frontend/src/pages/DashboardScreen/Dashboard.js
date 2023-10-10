import { Button } from "antd";
import { useState, useEffect } from "react";
import AddBolusModal from "../LogATreatments/AddBolusModal/AddBolusModal";
import AddActivityModal from "../LogATreatments/AddActivityModal/AddActivityModal";
import FormModal from "../../components/FormModal/FormModal";
import { getGlucoseEntries } from "../../hooks/glucoseServices";
import { glucoseToday } from "../../utils/glucoseInDate";
import { PieChart, Pie, Cell, Bar } from "recharts";
import { glycatedHemoglobinCalculator } from "../../utils/glucoseData";
import { useCollection } from "../../hooks/useCollection";
import { average } from "../../utils/glucoseData";
import {
  percentOfHigh,
  percentOfLow,
  percentOfInRange,
} from "../../utils/glucoseData";

import { useAuthContext } from "../../hooks/useAuthContext";
import {
  Line,
  XAxis,
  ComposedChart,
  YAxis,
  Scatter,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Legend,
} from "recharts";

import { PlusOutlined } from "@ant-design/icons";

import "./Dashboard.scss";
import ActivityTable from "../../components/ActivityTable/ActivityTable";

export default function Dashboard() {
  const { documents, error } = useCollection("bolus");
  const { user } = useAuthContext();
  console.log(documents);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [bolusModalOpen, setBolusModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [activityModalOpen, setActivityModalOpen] = useState(false);
  const [entries, setEntries] = useState();
  // const [modalText, setModalText] = useState("Content of the modal");
  const today = new Date().toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  });
  useEffect(() => {
    if (user.uid === "MftKVFhHnTYyuNGqVwqnjV4FAHt2") {
      const fetchEntries = async () => {
        const fetchedEntries = await getGlucoseEntries();
        setEntries(fetchedEntries);
        setIsLoading(false);
      };
      fetchEntries(entries);

      const interval = setInterval(() => {
        fetchEntries(entries);
      }, 60000);
      return () => clearInterval(interval);
    } else {
      return <div> No data available</div>;
    }
  }, []);
  if (!entries) {
    return <div class="lds-dual-ring"></div>;
  }
  if (entries === undefined) {
    return null;
  }

  if (entries === undefined) {
    return null;
  }

  const handleOk = () => {
    // setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setBolusModalOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setBolusModalOpen(false);
    setActivityModalOpen(false);
  };

  const newArray = entries.slice(-50).map((entry) => {
    return {
      glucose: entry.sgv,
      date: new Date(entry.date).toLocaleTimeString("pl-PL", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  });

  const bolusArray = documents
    .filter(
      (entry) =>
        entry.date.toDate().toLocaleDateString("pl-PL", {
          year: "numeric",
          month: "2-digit",
          day: "numeric",
        }) === today
    )
    .filter(
      (entry) =>
        entry.date.toDate().toLocaleTimeString("pl-PL", {
          hour: "2-digit",
          minute: "2-digit",
        }) >= newArray[0].date
    )
    .filter(
      (entry) =>
        entry.date.toDate().toLocaleTimeString("pl-PL", {
          hour: "2-digit",
          minute: "2-digit",
        }) <= newArray[newArray.length - 1].date
    )
    .map((entry) => {
      return {
        insulin: entry.insulinAmount,
        carbs: entry.meal.carbs,
        meal: entry.meal.name,
        comments: entry.comments,
        date: entry.date.toDate().toLocaleTimeString("pl-PL", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        glucose: entry.glucoseReading,
      };
    });
  console.log(bolusArray);
  const multipleArray = [...newArray, ...bolusArray].sort((a, b) =>
    a.date > b.date ? 1 : -1
  );
  console.log(multipleArray);

  const pieChartArray = glucoseToday(entries, today);

  const pieChartData = [
    {
      name: "niski",
      value: Number(percentOfLow(glucoseToday(pieChartArray, today))),
    },
    {
      name: "wysoki",
      value: Number(percentOfHigh(glucoseToday(pieChartArray, today))),
    },
    {
      name: "w zakresie",
      value: Number(percentOfInRange(glucoseToday(pieChartArray, today))),
    },
  ];
  console.log(pieChartData);

  return (
    <div className="dashboard">
      <h2 className="page-title">Strona główna</h2>
      {/* {error && <p className="error">{error}</p>} */}
      <div className="dashboard__buttons">
        <Button
          icon={<PlusOutlined />}
          className="dashboard__add-button"
          onClick={() => setBolusModalOpen(true)}
        >
          Dodaj bolus
        </Button>
        {bolusModalOpen && (
          <FormModal
            title=""
            isVisible={bolusModalOpen}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <AddBolusModal onSubmit={handleCancel} />
          </FormModal>
        )}
        <Button
          icon={<PlusOutlined />}
          className="dashboard__add-button"
          onClick={() => setActivityModalOpen(true)}
        >
          Dodaj aktywność
        </Button>
        <FormModal
          title=""
          isVisible={activityModalOpen}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <AddActivityModal onSubmit={handleCancel} />
        </FormModal>
      </div>
      <div className="dashboard__daily-statistic">
        <ComposedChart
          width={1200}
          height={500}
          data={multipleArray}
          margin={{
            top: 50,
            right: 10,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey={"date"} interval={5} name="hour" />
          <YAxis domain={[0, 250]} ticks={[0, 70, 125, 180, 250]} />
          <YAxis
            orientation="right"
            domain={[0, 250]}
            ticks={[0, 70, 125, 180, 250]}
          />
          <Tooltip />
          <Legend />
          <ReferenceLine y={180} label="Max" stroke="red" />
          <ReferenceLine y={70} label="Min" stroke="red" />

          <Line
            data={multipleArray}
            type="monotone"
            name="Glukoza"
            dataKey="glucose"
            stroke="#6a7d8e"
            activeDot={{ r: 8 }}
          />
          <Bar dataKey="carbs" name="Węglowodany" fill="#e79228" barSize={50} />
          <Scatter
            name="Insulina"
            dataKey="insulin"
            fill="blue"
            shape="cross"
          />
        </ComposedChart>
        <div style={{ display: "flex" }}>
          <div>
            <h4 style={{ marginTop: "30px" }}>Dzisiejsze statystyki</h4>
            <div className="dashboard__dailyStats">
              <div className="dailyStats-data">
                <p>
                  <strong>Średnia</strong>
                </p>
                <p>{average(pieChartArray)}mg/dL</p>
                <br />
                <p>
                  <strong>HbA1c</strong>
                </p>
                <p>{glycatedHemoglobinCalculator(pieChartArray)}%</p>
                <br />
                <p>
                  <strong>Ilość odczytów</strong>
                </p>
                <p>{Object.keys(pieChartArray).length} </p>
              </div>
              <div className="dailyStats-percents">
                <p>
                  <strong style={{ color: "#e79228" }}>Wysoki</strong>{" "}
                  (&#62;180)
                </p>
                <p>{percentOfHigh(pieChartArray)}%</p>
                <br></br>
                <p>
                  <strong style={{ color: "#d9363e" }}>Niski </strong>(&#60;70)
                </p>
                <p>{percentOfLow(pieChartArray)}%</p>
                <br></br>
                <p>
                  <strong style={{ color: "#4bb149" }}>W zakresie</strong>
                </p>
                <p>{percentOfInRange(pieChartArray)}%</p>
              </div>
              <PieChart width={300} height={300}>
                <Pie
                  data={pieChartData}
                  cx={150}
                  cy={150}
                  labelLine={false}
                  // label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={
                        entry.name === "niski"
                          ? "#d9363e"
                          : entry.name === "w zakresie"
                          ? "#4bb149"
                          : "#e79228"
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </div>
          <ActivityTable />
        </div>
      </div>
    </div>
  );
}
//14.20.1
