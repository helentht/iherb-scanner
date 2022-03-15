import React, { useEffect, useState } from "react";
import "./App.css";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import script from "./test.py";

declare global {
  interface Window {
    loadPyodide: any;
  }
}

const runScript = async (code: string) => {
  const pyodide = await window.loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.19.1/full/",
  });

  return await pyodide.runPythonAsync(code);
};

function App() {
  const [data, setData] = useState<String>();
  const [pythonOutput, setPythonOutput] = useState<String>();

  useEffect(() => {
    const run = async () => {
      const scriptText = await (await fetch(script)).text();
      const output = await runScript(scriptText);
      setPythonOutput(output);
    };
    run();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {pythonOutput}
        {data && (
          <iframe
            src={`https://hk.iherb.com/search?kw=${data}`}
            title="iherb-iframe"
            width={"100%"}
            height={"100%"}
          />
        )}
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
