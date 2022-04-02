import React, { useEffect, useState } from "react";
import { Table } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Date Added",
    dataIndex: "dateAdded",
    key: "dateAdded",
  },
];

function Records() {
  const [records, setRecords] = useState();

  useEffect(() => {
    const recordsString = localStorage.getItem("records");
    const records = JSON.parse(recordsString ?? "[]");
    setRecords(records);
  }, []);
  return <Table dataSource={records} columns={columns} />;
}

export default Records;
