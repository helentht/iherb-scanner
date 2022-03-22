import React from "react";
import "./App.css";
import "antd/dist/antd.css";

import MyLayout from "./Components/MyLayout";
import Urls from "./Urls";

function App() {
  return (
    <div className="App">
      <MyLayout>
        <Urls />
      </MyLayout>
    </div>
  );
}

export default App;
