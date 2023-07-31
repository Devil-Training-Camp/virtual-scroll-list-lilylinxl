# 1.FixedHeight 组件

FixedHeight 组件是一个固定高度的虚拟列表组件，可以用来优化长列表的渲染性能。它的使用方式类似于普通的列表组件，但是它只会渲染当前可见区域之内的列表项，而不会渲染所有的列表项，从而减少了页面渲染的时间和资源消耗。

## 使用

```typescript
import FixedHeight from "./index";

const tableData = new Array(1000).fill(0).map((item, index) => {
  return { num: `No:${index}` };
});

const Item = ({ style, index, item }) => {
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

<FixedHeight itemHeight={50} data={tableData} boxHeight={300}>
  {Item}
</FixedHeight>;
```

## 参数

FixedHeight 组件支持以下参数：
| 参数 | 说明 | 类型 | 默认值 |
| ----------- | -------------------------------------------------------- | --------------------------- | ------ |
| itemHeight | 列表项的高度 | number | - |
| data | 列表项的数据 | any[] | [] |
| boxHeight | 列表容器的高度 | number | - |
| renderItem | 列表项的渲染函数，接受三个参数：style、index、item，分别表示当前列表项的样式、索引和数据 | (params: ItemParamsProps) => any | - |

## 注意事项

FixedHeight 组件需要指定列表项的高度和列表容器的高度，否则可能无法正确计算列表项的位置和数量。

FixedHeight 组件是一个高度固定的虚拟列表组件，对于高度不固定的列表，应该使用 VariableSizeList 组件。

# 2.VariableSizeList 组件

VariableSizeList 组件是一个高度可变的虚拟列表组件，可以用来优化长列表的渲染性能。与固定高度的虚拟列表不同，VariableSizeList 组件支持每个列表项的高度不同，同时还可以根据列表项的高度动态更新列表高度，从而提高页面渲染的效率。

## 使用

```typescript
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
```

## 参数

VariableSizeList 组件支持以下参数：
| 参数 | 说明 | 类型 | 默认值 |
| ----------- | -------------------------------------------------------- | --------------------------- | ------ |
| containerHeight | 列表容器的高度 | number | - |
| itemCount | 列表项的数量 | number | - |
| getItemHeight | 获取指定索引的列表项的高度的函数，接受一个参数 index，返回该列表项的高度 | (index: number) => number | - |
| itemData | 列表项的数据 | any[] | [] |
| children | 渲染每个列表项的函数，接受三个参数：style、index、data，分别表示当前列表项的样式、索引和数据 | (params: VLItemProps) => any | - |
