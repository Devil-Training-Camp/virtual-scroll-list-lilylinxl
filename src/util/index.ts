const binarySearch = <T>(arr: T[], target: T): number => {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    if (arr[mid] === target) {
      // 继续向右搜索
      while (mid < arr.length && arr[mid] === target) {
        mid++;
      }
      return mid;
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return low;
};
export { binarySearch };
