import { PieChart, Pie, Cell } from "recharts";
import {
  average,
  percentOfHigh,
  percentOfLow,
  percentOfInRange,
  glycatedHemoglobinCalculator,
} from "../../utils/glucoseData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { dateFromNow } from "../../utils/dateConverter";
import { glucoseToday, glucoseByDays } from "../../utils/glucoseInDate";
import { useEffect, useState } from "react";
import { Table } from "antd";
import "./PieChart.scss";

export default function StatisticDetails(props) {
  const { entries, value, range } = props;

  const today = new Date().toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  });
  const todayGlucose = glucoseToday(Object.values(entries), today);
  const [date, setDate] = useState(todayGlucose);

  useEffect(() => {
    switch (value) {
      case 1:
        return setDate(todayGlucose);
      case 2:
        return setDate(
          glucoseByDays(Object.values(entries), dateFromNow(14, new Date()))
        );
      case 3:
        return setDate(
          glucoseByDays(Object.values(entries), dateFromNow(30, new Date()))
        );
      case 4:
        return setDate(
          glucoseByDays(Object.values(entries), dateFromNow(90, new Date()))
        );
      case 5:
        return setDate(glucoseToday(Object.values(entries), range));
      default:
        return;
    }
  }, [value]);

  const columns = [
    {
      title: "Data",
      dataIndex: "date",
      key: "date",
      render: (date) => (
        <p>
          {new Date(date).toLocaleTimeString("pl-PL", {
            year: "numeric",
            month: "2-digit",
            day: "numeric",
          })}
        </p>
      ),
      sorter: (a, b) => a.date - b.date,
    },
    {
      title: "Poziom cukru",
      dataIndex: "sgv",
      key: "sgv",
      render: (sgv) => <p>{sgv} mg/dL</p>,
    },
  ];
  const pieChartData = [
    {
      name: "niski",
      value: Number(percentOfLow(date)),
    },
    {
      name: "wysoki",
      value: Number(percentOfHigh(date)),
    },
    {
      name: "w zakresie",
      value: Number(percentOfInRange(date)),
    },
  ];

  const chartArray = date.map((entry) => {
    return {
      glucose: entry.sgv,
      date: new Date(entry.date).toLocaleTimeString("pl-PL", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  });

  return (
    <>
      <div className="statistic-charts">
        <div>
          <div className="dailyStats">
            <div className="dailyStats-data">
              <p>
                <strong>Średnia</strong>
              </p>
              <p>{average(date)}mg/dL</p>
              <br />
              <p>
                <strong>HbA1c</strong>
              </p>
              <p>{glycatedHemoglobinCalculator(date)}%</p>
              <br />
              <p>
                <strong>Ilość odczytów</strong>
              </p>
              <p>{Object.keys(date).length} </p>
            </div>
            <div className="dailyStats-percents">
              <p>
                <strong style={{ color: "#e79228" }}>Wysoki</strong> (&#62;180)
              </p>
              <p>{percentOfHigh(date)}%</p>
              <br></br>
              <p>
                <strong style={{ color: "#d9363e" }}>Niski</strong>(&#60;70)
              </p>
              <p>{percentOfLow(date)}%</p>
              <br></br>
              <p>
                <strong style={{ color: "#4bb149" }}>W zakresie</strong>
              </p>
              <p>{percentOfInRange(date)}%</p>
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
          <LineChart
            width={800}
            height={400}
            data={chartArray}
            margin={{
              top: 50,
              right: 10,
              bottom: 80,
            }}
          >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey={"date"} angle={-45} textAnchor="end" />
            <YAxis domain={[0, 250]} ticks={[0, 70, 125, 180, 250]} />
            <Tooltip />
            {/* <Legend /> */}
            <ReferenceLine y={180} label="Max" stroke="red" />
            <ReferenceLine y={70} label="Min" stroke="red" />

            <Line
              type="monotone"
              dataKey="glucose"
              stroke="#6a7d8e"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
        <div className="statistic-charts__table">
          <Table columns={columns} dataSource={date} />
        </div>
      </div>
    </>
  );
}
