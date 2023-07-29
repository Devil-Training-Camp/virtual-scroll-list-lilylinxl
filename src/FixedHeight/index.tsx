import * as React from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import "./index.less";
type Item = {
  num: number;
};
interface Props {
  itemHeight: number;
  boxHeight: number;
  data: Array<Item>;
  children: React.ReactNode;
}
const FixedHeight = ({ itemHeight, data, boxHeight, children }: Props) => {
  const contenHeight = data.length * itemHeight;
  const areaRef = useRef({} as HTMLElement);
  const visibleLength = Math.ceil(boxHeight / itemHeight);
  const Component = children;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const paddingCount = 2;
  const updateVisibleData = useCallback(
    (sTop?: number) => {
      const scrollTop = sTop || 0;
      let beginIndex = Math.floor(scrollTop / itemHeight);
      let endIndex = beginIndex + visibleLength;
      // 上下额外多渲染几个 item，解决滚动时来不及加载元素出现短暂的空白区域的问题

      beginIndex = Math.max(beginIndex - paddingCount, 0);
      endIndex = Math.min(endIndex + paddingCount, data.length);

      setStartIndex(beginIndex);
      setEndIndex(endIndex);
      if (areaRef.current) {
        areaRef.current.style.transform = `translate3d(0, ${
          beginIndex * itemHeight
        }px, 0)`;
      }
    },
    [itemHeight, data, visibleLength]
  );

  useEffect(() => {
    updateVisibleData();
  }, [updateVisibleData]);

  const items = [];
  for (let i = startIndex; i < endIndex; i++) {
    items.push(
      <Component
        key={i}
        index={i}
        style={{ height: itemHeight }}
        item={data[i]}
      />
    );
  }

  return (
    <div
      className="list-box"
      onScroll={(e) => updateVisibleData((e.target as HTMLElement).scrollTop)}
      style={{ height: `${boxHeight}px` }}
    >
      <div style={{ height: `${contenHeight}px` }}></div>
      <div ref={areaRef} className="visible-area">
        {items}
      </div>
    </div>
  );
};

export default FixedHeight;
