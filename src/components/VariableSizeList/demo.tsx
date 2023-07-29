import "./index.less";
import { useEffect, useRef, useState } from "react";
import VariableSizeList from "./index";
import { faker } from "@faker-js/faker";
import * as React from "react";

interface ItemProps {
  index: number;
  data: Array<any>;
  setHeight: (index: number, height: number) => void;
}
interface VLItemProps {
  index: number;
  style: React.CSSProperties;
  data: Array<any>;
}
// 列表项组件
function Item({ index, data, setHeight }: ItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  // step3
  useEffect(() => {
    setHeight(index, itemRef.current.getBoundingClientRect().height);
  }, [setHeight, index]);

  return (
    <div
      ref={itemRef}
      style={{
        backgroundColor: index % 2 === 0 ? "burlywood" : "cadetblue"
      }}
    >
      {data[index]}
    </div>
  );
}

export default function VariableSizeListDemo() {
  const [list] = useState(
    new Array(1000).fill(0).map(() => faker.lorem.paragraph())
  );
  const listRef = useRef({} as HTMLElement);
  // 保存列表项的高度信息
  const heightsRef = useRef(new Array(100));
  // 预估高度
  const estimatedItemHeight = 40;
  const getHeight = (index: number) => {
    return (heightsRef.current[index] as number) ?? estimatedItemHeight;
  };

  const setHeight = (index: number, height: number) => {
    // step4
    if (heightsRef.current[index] !== height) {
      heightsRef.current[index] = height;
      // 让 VariableSizeList 组件更新高度
      /* eslint-disable */
      listRef.current!.resetHeight();
    }
  };

  return (
    <>
      <h4>列表项高度动态 - 虚拟列表实现</h4>
      <VariableSizeList
        ref={listRef}
        containerHeight={300}
        itemCount={list.length}
        getItemHeight={getHeight}
        itemData={list}
      >
        {({ index, style, data }: VLItemProps) => {
          return (
            <div style={style}>
              <Item {...{ index, data }} setHeight={setHeight} />
            </div>
          );
        }}
      </VariableSizeList>
    </>
  );
}
