import { VisualizationEngine, VisualizationStep, AlgorithmConfig } from '../../engines';

export async function quickSort(array: number[], config: AlgorithmConfig): Promise<VisualizationEngine> {
  const engine = new VisualizationEngine();
  const arr = [...array];
  const delay = 101 - config.animationSpeed;

  async function quickSortHelper(left: number, right: number): Promise<void> {
    if (left >= right) return;

    const pivotIndex = await partition(left, right);
    await quickSortHelper(left, pivotIndex - 1);
    await quickSortHelper(pivotIndex + 1, right);
  }

  async function partition(left: number, right: number): Promise<number> {
    const pivot = arr[right];
    let i = left - 1;

    for (let j = left; j < right; j++) {
      engine.addStep({
        array: [...arr],
        comparisons: [{ indices: [j, right], color: '#ff6b6b' }],
        pivotIndex: right,
        sorted: [],
      });

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];

        engine.addStep({
          array: [...arr],
          swaps: [{ indices: [i, j], color: '#4ecdc4' }],
          pivotIndex: right,
          sorted: [],
        });
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    engine.addStep({
      array: [...arr],
      swaps: [{ indices: [i + 1, right], color: '#4ecdc4' }],
      pivotIndex: i + 1,
      sorted: [],
    });

    await new Promise((resolve) => setTimeout(resolve, delay));
    return i + 1;
  }

  engine.addStep({
    array: [...arr],
    comparisons: [],
    sorted: [],
  });

  await quickSortHelper(0, arr.length - 1);

  engine.addStep({
    array: [...arr],
    comparisons: [],
    sorted: Array.from({ length: arr.length }, (_, i) => i),
  });

  return engine;
}
