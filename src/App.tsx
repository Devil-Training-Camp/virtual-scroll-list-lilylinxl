import "./App.css";
import * as React from "react";
import FixedHeight from "./FixedHeight/index";
import { CSSProperties } from "react";

export type Item = {
  num: number;
};
interface ItemParamsProps {
  style: CSSProperties;
  index: number;
  item: Item;
}
function App() {
  const tableData = new Array(1000).fill(0).map((item, index) => {
    console.log("item", item);
    return { num: `No:${index}` };
  });
  const Item = ({ style, index, item }: ItemParamsProps) => {
    return (
      <div
        className="item"
        style={{
          ...style,
          backgroundColor: index % 2 === 0 ? "burlywood" : "cadetblue"
        }}
      >
        {item.num}
      </div>
    );
  };
  return (
    <>
      <h4>固定高度虚拟列表</h4>
      <FixedHeight itemHeight={50} data={tableData} boxHeight={300}>
        {Item}
      </FixedHeight>
    </>
  );
}

export default App;
