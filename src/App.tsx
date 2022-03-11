import React, { useEffect, useState } from "react";
import "./App.css";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import axios from "axios";
import * as cheerio from "cheerio";
import { setMaxListeners } from "process";

function App() {
  const [data, setData] = useState<String>();
  const [name, setName] = useState<String>();

  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://www.iherb.com/search?kw=${data}`
      )
      .then((response) => {
        const $ = cheerio.load(response.data);
        $.html();
        setName(
          $(".product-inner").children().first().children().first().attr().title
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, [data]);

  return (
    <div className="App">
      <header className="App-header">
        {name}
        {!data && (
          <BarcodeScannerComponent
            width={250}
            height={250}
            onUpdate={(err, result) => {
              if (result) {
                console.log(result.getText());
                setData(result.getText().slice(1));
              } else setData(undefined);
            }}
          />
        )}
      </header>
    </div>
  );
}

export default App;
