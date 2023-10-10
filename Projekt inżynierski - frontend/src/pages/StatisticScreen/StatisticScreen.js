import "./StatisticScreen.scss";

import { DatePicker, Radio, Space } from "antd";
import { useState, useEffect } from "react";
import { getGlucoseEntries } from "../../hooks/glucoseServices";
import StatisticDetails from "../../components/PieChart/PieChart";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function StatisticScreen() {
  const [entries, setEntries] = useState();
  const [value, setValue] = useState(1);
  const [range, setRange] = useState("");
  const { user } = useAuthContext();

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  useEffect(() => {
    if (user.uid === "MftKVFhHnTYyuNGqVwqnjV4FAHt2") {
      const fetchEntries = async () => {
        const fetchedEntries = await getGlucoseEntries();
        setEntries(fetchedEntries);
      };
      fetchEntries(entries);
      console.log(entries);

      const interval = setInterval(() => {
        fetchEntries(entries);
      }, 300000);
      return () => clearInterval(interval);
    } else {
      return <div> No data available</div>;
    }
  }, []);

  if (entries === undefined) {
    return null;
  }

  return (
    <>
      <h2 className="page-title">Statystyki</h2>
      <div className="statistic">
        <div>
          <Radio.Group onChange={onChange} value={value}>
            <Space direction="horizontal">
              <Radio value={1}>Dziś</Radio>
              <Radio value={2}>14 dni</Radio>
              <Radio value={3}>30 dni</Radio>
              <Radio value={4}>90 dni</Radio>
              <Radio value={5}>
                Wybrany dzień...
                {value === 5 ? (
                  <DatePicker
                    style={{ width: 200, marginLeft: 20 }}
                    onChange={(value) =>
                      setRange(
                        new Date(value).toLocaleDateString("pl-PL", {
                          year: "numeric",
                          month: "2-digit",
                          day: "numeric",
                        })
                      )
                    }
                  />
                ) : null}
              </Radio>
            </Space>
          </Radio.Group>
        </div>
        <StatisticDetails entries={entries} value={value} range={range} />
      </div>
    </>
  );
}
