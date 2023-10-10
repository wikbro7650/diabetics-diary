import React from "react";
import "./DailyTable.scss";
import { Table, Divider } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
];

export default function DailyTable() {
  return (
    <div>
      <Divider>Middle size table</Divider>
      <Table
        pagination={false}
        columns={columns}
        dataSource={data}
        size="middle"
      />
    </div>
  );
}
