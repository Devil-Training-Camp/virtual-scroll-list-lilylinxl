import "./App.css";
import * as React from "react";
import VariableSizeListDemo from "./components/VariableSizeList/demo";
import FixedHeightDemo from "./components/FixedHeight/demo";
function App() {
  return (
    <>
      <FixedHeightDemo />
      <VariableSizeListDemo />
    </>
  );
}

export default App;
