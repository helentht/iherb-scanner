import React, { useEffect, useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import axios from "axios";
import { Button, Typography, Spin } from "antd";

const { Title } = Typography;

function Home() {
  const [data, setData] = useState<String>();
  const [name, setName] = useState<String>();
  const [price, setPrice] = useState<String>();
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      axios
        .get(`/iherbbarcode/${data}`)
        .then((response) => {
          const obj = response.data;
          const name = Object.keys(obj)[0];
          setName(name);
          setPrice(obj[name]);
          setIsSpinning(false);

          const newItem = {
            name: name,
            price: obj[name],
            dateAdded: new Date().toDateString(),
          };

          const originalListString = localStorage.getItem("records");
          const originalList = JSON.parse(originalListString ?? "[]");

          originalList.push(newItem);
          const newListString = JSON.stringify(originalList);
          localStorage.setItem("records", newListString);
        })
        .catch((error) => console.error(error));
    }
  }, [data]);

  return (
    <>
      {data && (
        <>
          <Button
            onClick={() => {
              setData(undefined);
              setName(undefined);
              setPrice(undefined);
            }}
          >
            Scan
          </Button>
          <Title>{name}</Title>
          <Title level={3}>{price}</Title>
        </>
      )}
      <Spin spinning={isSpinning} />
      {!data && (
        <BarcodeScannerComponent
          width={250}
          height={250}
          onUpdate={(err, result) => {
            if (result) {
              console.log(result.getText().slice(1));
              setData(result.getText().slice(1));
              setIsSpinning(true);
            } else setData(undefined);
          }}
        />
      )}
    </>
  );
}

export default Home;
