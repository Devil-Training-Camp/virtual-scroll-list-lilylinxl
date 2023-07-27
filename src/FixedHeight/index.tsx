import * as React from "react";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import "./index.less";
interface Props {
  itemHeight: number;
  boxHeight: number;
  data: Array<any>;
}
const FixedHeight = ({ itemHeight, data, boxHeight }: Props) => {
  const [visibleData, setVisibleData] = useState(Array<any>);
  const areaRef = useRef({} as HTMLElement);
  const visibleLength = Math.ceil(boxHeight / itemHeight);

  const updateVisibleData = useCallback(
    (sTop?: number) => {
      const scrollTop = sTop || 0;
      const beginIndex = Math.floor(scrollTop / itemHeight);
      const endIndex = beginIndex + visibleLength;
      const res = data.slice(beginIndex, endIndex);
      setVisibleData(res);
      if (areaRef.current) {
        areaRef.current.style.webkitTransform = `translate3d(0, ${
          beginIndex * itemHeight
        }px, 0)`;
      }
    },
    [itemHeight, data, visibleLength]
  );

  useEffect(() => {
    updateVisibleData();
  }, [updateVisibleData]);

  const contenHeight = useMemo(
    () => `${data.length * itemHeight}px`,
    [data.length, itemHeight]
  );
  return (
    <div
      className="list-box"
      onScroll={(e) => updateVisibleData((e.target as HTMLElement).scrollTop)}
      style={{ height: `${boxHeight}px` }}
    >
      <div style={{ height: contenHeight }}></div>
      <div ref={areaRef} className="visible-area">
        {visibleData.map((item: string) => (
          <div
            className="item"
            style={{
              height: `${itemHeight}px`
            }}
            key={item}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FixedHeight;
