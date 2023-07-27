import "./App.css";
import * as React from "react";
import FixedHeight from "./FixedHeight/index";
const getData = () => {
  const data = [];
  for (let index = 0; index < 500; index++) {
    data.push(index);
  }
  return data;
};
function App() {
  const tableData = getData();

  return (
    <>
      <h4>固定高度虚拟列表</h4>
      <FixedHeight itemHeight={50} data={tableData} boxHeight={400} />
    </>
  );
}

export default App;
