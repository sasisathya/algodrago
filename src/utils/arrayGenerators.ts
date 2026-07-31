export function generateRandomArray(size: number, minValue: number = 10, maxValue: number = 100): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue);
}

export function generateSortedArray(size: number, minValue: number = 10, maxValue: number = 100): number[] {
  const step = (maxValue - minValue) / size;
  return Array.from({ length: size }, (_, i) => Math.floor(minValue + i * step));
}

export function generateReverseSortedArray(size: number, minValue: number = 10, maxValue: number = 100): number[] {
  return generateSortedArray(size, minValue, maxValue).reverse();
}

export function generateNearlySortedArray(size: number, minValue: number = 10, maxValue: number = 100): number[] {
  const arr = generateSortedArray(size, minValue, maxValue);
  const swaps = Math.floor(size * 0.1);
  for (let i = 0; i < swaps; i++) {
    const randomIndex1 = Math.floor(Math.random() * size);
    const randomIndex2 = Math.floor(Math.random() * size);
    [arr[randomIndex1], arr[randomIndex2]] = [arr[randomIndex2], arr[randomIndex1]];
  }
  return arr;
}
