import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Records from "./Pages/Records";

function Urls() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/records" element={<Records />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Urls;
