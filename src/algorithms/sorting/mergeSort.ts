import { VisualizationEngine, VisualizationStep, AlgorithmConfig } from '../../engines';

export async function mergeSort(array: number[], config: AlgorithmConfig): Promise<VisualizationEngine> {
  const engine = new VisualizationEngine();
  const arr = [...array];
  const delay = 101 - config.animationSpeed;

  async function mergeSortHelper(left: number, right: number, depth: number = 0): Promise<void> {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    await mergeSortHelper(left, mid, depth + 1);
    await mergeSortHelper(mid + 1, right, depth + 1);

    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      engine.addStep({
        array: [...arr],
        comparisons: [{ indices: [left + i, mid + 1 + j], color: '#ff6b6b' }],
        sorted: [],
      });

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }

      engine.addStep({
        array: [...arr],
        swaps: [{ indices: [k, left + i], color: '#4ecdc4' }],
        sorted: [],
      });

      k++;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      engine.addStep({
        array: [...arr],
        swaps: [{ indices: [k, left + i], color: '#4ecdc4' }],
        sorted: [],
      });
      i++;
      k++;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      engine.addStep({
        array: [...arr],
        swaps: [{ indices: [k, mid + 1 + j], color: '#4ecdc4' }],
        sorted: [],
      });
      j++;
      k++;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  engine.addStep({
    array: [...arr],
    comparisons: [],
    sorted: [],
  });

  await mergeSortHelper(0, arr.length - 1);

  engine.addStep({
    array: [...arr],
    comparisons: [],
    sorted: Array.from({ length: arr.length }, (_, i) => i),
  });

  return engine;
}
