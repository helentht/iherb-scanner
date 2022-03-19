import React, { useEffect, useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import axios from "axios";

function Home() {
  const [data, setData] = useState<String>();

  useEffect(() => {
    if (data) {
      axios
        .get(`http://127.0.0.1:5000/iherbbarcode/${data}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => console.error(error));
    }
  }, [data]);

  return (
    <>
      {data && (
        <iframe
          src={`https://hk.iherb.com/search?kw=${data}`}
          title="iherb-iframe"
          width="100%"
          height={500}
        />
      )}
      {!data && (
        <BarcodeScannerComponent
          width={250}
          height={250}
          onUpdate={(err, result) => {
            if (result) {
              console.log(result.getText().slice(1));
              setData(result.getText().slice(1));
            } else setData("898220010653");
          }}
        />
      )}
    </>
  );
}

export default Home;
