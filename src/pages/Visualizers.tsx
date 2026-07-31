import React, { useEffect } from 'react';
import { VisualizationCanvas } from '../components/Visualizers/VisualizationCanvas';
import { ControlPanel } from '../components/ControlPanel/ControlPanel';
import { useAlgorithmStore } from '../hooks/useAlgorithmStore';
import { generateRandomArray } from '../utils/arrayGenerators';

export const Visualizers: React.FC = () => {
  const { setCurrentStepData, setArray } = useAlgorithmStore();

  useEffect(() => {
    const initialArray = generateRandomArray(30);
    setArray(initialArray);
    setCurrentStepData({
      array: initialArray,
      comparisons: [],
      swaps: [],
      sorted: [],
    });
  }, [setArray, setCurrentStepData]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">DSA Visualizer</h1>
          <p className="text-gray-400">Watch sorting algorithms in action with step-by-step visualization</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Visualization</h2>
          <VisualizationCanvas />
        </div>

        <ControlPanel />
      </div>
    </div>
  );
};
