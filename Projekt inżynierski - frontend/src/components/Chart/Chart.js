import "./Chart.scss";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function Chart(entries) {
  console.log(entries);
  return (
    <LineChart
      width={1200}
      height={500}
      // data={entries}
      margin={{
        top: 50,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="sgv"
        stroke="#6a7d8e"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}
