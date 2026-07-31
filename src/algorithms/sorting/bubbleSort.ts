import { VisualizationEngine, VisualizationStep, AlgorithmConfig } from '../../engines';

export async function bubbleSort(array: number[], config: AlgorithmConfig): Promise<VisualizationEngine> {
  const engine = new VisualizationEngine();
  const arr = [...array];
  const n = arr.length;
  const delay = 101 - config.animationSpeed;

  engine.addStep({
    array: [...arr],
    comparisons: [],
    sorted: [],
  });

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      engine.addStep({
        array: [...arr],
        comparisons: [{ indices: [j, j + 1], color: '#ff6b6b' }],
        sorted: Array.from({ length: n - i }, (_, idx) => n - 1 - idx),
      });

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        engine.addStep({
          array: [...arr],
          swaps: [{ indices: [j, j + 1], color: '#4ecdc4' }],
          sorted: Array.from({ length: n - i }, (_, idx) => n - 1 - idx),
        });
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  engine.addStep({
    array: [...arr],
    comparisons: [],
    sorted: Array.from({ length: n }, (_, i) => i),
  });

  return engine;
}
