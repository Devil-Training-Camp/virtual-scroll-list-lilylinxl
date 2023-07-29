import * as React from "react";
import { forwardRef, useState } from "react";
import { flushSync } from "react-dom";
import { binarySearch } from "../util/index";
interface Props {
  containerHeight: number;
  getItemHeight: (index: number) => number;
  itemCount: number;
  itemData: Array<any>;
  children: React.ReactNode;
}

// 动态列表组件
const VariableSizeList = forwardRef(
  (
    { containerHeight, getItemHeight, itemCount, itemData, children }: Props,
    ref
  ) => {
    ref.current = {
      resetHeight: () => {
        setOffsets(genOffsets());
      }
    };

    // children 语义不好，赋值给 Component
    const Component = children;
    const [scrollTop, setScrollTop] = useState(0); // 滚动高度

    const genOffsets = () => {
      // step1
      const a = [];
      a[0] = getItemHeight(0);
      for (let i = 1; i < itemCount; i++) {
        a[i] = getItemHeight(i) + a[i - 1];
      }
      return a;
    };

    // 所有 items 的位置
    const [offsets, setOffsets] = useState(() => {
      return genOffsets();
    });
    // step2

    // 二分查找 startIdx 和 endIdx

    let startIdx = binarySearch(offsets, scrollTop);
    let endIdx = binarySearch(offsets, scrollTop + containerHeight);
    console.log("startIdx", startIdx);
    console.log("endIdx", endIdx);
    if (endIdx === -1) endIdx = itemCount;

    // 上下扩展补充几个 item
    const paddingCount = 2;
    startIdx = Math.max(startIdx - paddingCount, 0); // 处理越界情况
    endIdx = Math.min(endIdx + paddingCount, itemCount - 1);

    // 计算高度
    const contentHeight = offsets[offsets.length - 1];

    // 需要渲染的 items
    const items = [];
    for (let i = startIdx; i <= endIdx; i++) {
      const top = i === 0 ? 0 : offsets[i - 1];
      const height = i === 0 ? offsets[0] : offsets[i] - offsets[i - 1];
      items.push(
        <Component
          key={i}
          index={i}
          style={{
            position: "absolute",
            left: 0,
            top,
            width: "100%",
            height
          }}
          data={itemData}
        />
      );
    }

    return (
      <div
        style={{
          height: containerHeight,
          overflow: "auto",
          position: "relative"
        }}
        onScroll={(e: React.UIEvent<HTMLDivElement>) => {
          flushSync(() => {
            setScrollTop(e.currentTarget.scrollTop);
          });
        }}
      >
        <div style={{ height: contentHeight }}>{items}</div>
      </div>
    );
  }
);
VariableSizeList.displayName = "VariableSizeList";
export default VariableSizeList;
