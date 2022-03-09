import React, { useRef, useState } from "react";
import "./App.css";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

function App() {
  const [data, setData] = useState<String>();

  const iherbIframe = useRef<HTMLIFrameElement>(null);

  const checkIherbIframeContent = () => {
    const currentIframe = iherbIframe.current;
    if (currentIframe) {
      console.log(currentIframe.contentWindow?.document);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {`https://hk.iherb.com/search?kw=${data}`}
        {data && (
          <iframe
            src={`https://hk.iherb.com/search?kw=${data}`}
            title="iherb-iframe"
            width={"100%"}
            height={"100%"}
            ref={iherbIframe}
            onLoad={checkIherbIframeContent}
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
