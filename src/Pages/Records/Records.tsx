import React from "react";
import { Typography, Space } from "antd";

const { Text } = Typography;
function Records() {
  return (
    <>
      <Space direction="vertical">
        <Text mark>Scanned name: {localStorage.getItem("name")}</Text>
        <Text keyboard>Price: {localStorage.getItem("price")}</Text>
        <Text type="success">
          Date added: {localStorage.getItem("dateAdded")}
        </Text>
      </Space>
    </>
  );
}

export default Records;
