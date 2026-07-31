import React from 'react';
import { useAlgorithmStore } from '../../hooks/useAlgorithmStore';
import { bubbleSort } from '../../algorithms/sorting/bubbleSort';
import { mergeSort } from '../../algorithms/sorting/mergeSort';
import { quickSort } from '../../algorithms/sorting/quickSort';
import { generateRandomArray } from '../../utils/arrayGenerators';

export const ControlPanel: React.FC = () => {
  const {
    selectedAlgorithm,
    arraySize,
    animationSpeed,
    isRunning,
    isPaused,
    currentStep,
    engine,
    setSelectedAlgorithm,
    setArraySize,
    setAnimationSpeed,
    setIsRunning,
    setIsPaused,
    setEngine,
    setCurrentStepData,
    setArray,
    setCurrentStep,
    reset,
  } = useAlgorithmStore();

  const handleGenerateArray = () => {
    const newArray = generateRandomArray(arraySize);
    setArray(newArray);
    reset();
    setCurrentStepData({
      array: newArray,
      comparisons: [],
      swaps: [],
      sorted: [],
    });
  };

  const handleStart = async () => {
    if (isRunning) return;

    const newArray = generateRandomArray(arraySize);
    setArray(newArray);
    reset();
    setIsRunning(true);

    let algorithm;
    switch (selectedAlgorithm) {
      case 'bubble':
        algorithm = bubbleSort;
        break;
      case 'merge':
        algorithm = mergeSort;
        break;
      case 'quick':
        algorithm = quickSort;
        break;
      default:
        algorithm = bubbleSort;
    }

    const newEngine = await algorithm(newArray, {
      arraySize,
      animationSpeed,
    });

    setEngine(newEngine);
    setIsRunning(false);
    setCurrentStep(0);

    const firstStep = newEngine.getStep(0);
    if (firstStep) setCurrentStepData(firstStep);
  };

  const handlePlayPause = () => {
    setIsPaused(!isPaused);
  };

  const handleNextStep = () => {
    if (!engine) return;
    const nextStep = currentStep + 1;
    if (nextStep < engine.getTotalSteps()) {
      setCurrentStep(nextStep);
      const stepData = engine.getStep(nextStep);
      if (stepData) setCurrentStepData(stepData);
    }
  };

  const handlePrevStep = () => {
    if (!engine) return;
    const prevStep = currentStep - 1;
    if (prevStep >= 0) {
      setCurrentStep(prevStep);
      const stepData = engine.getStep(prevStep);
      if (stepData) setCurrentStepData(stepData);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Algorithm</label>
          <select
            value={selectedAlgorithm}
            onChange={(e) => setSelectedAlgorithm(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="bubble">Bubble Sort</option>
            <option value="merge">Merge Sort</option>
            <option value="quick">Quick Sort</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Array Size: {arraySize}</label>
          <input
            type="range"
            min="5"
            max="100"
            value={arraySize}
            onChange={(e) => setArraySize(Number(e.target.value))}
            disabled={isRunning}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Speed: {animationSpeed}</label>
          <input
            type="range"
            min="1"
            max="100"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition"
        >
          Start
        </button>

        <button
          onClick={handlePlayPause}
          disabled={!engine}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition"
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>

        <button
          onClick={handlePrevStep}
          disabled={!engine || currentStep === 0}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition"
        >
          ← Previous
        </button>

        <button
          onClick={handleNextStep}
          disabled={!engine || currentStep >= engine.getTotalSteps() - 1}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition"
        >
          Next →
        </button>

        <button
          onClick={handleGenerateArray}
          disabled={isRunning}
          className="px-6 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition"
        >
          Generate
        </button>

        <button
          onClick={reset}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
        >
          Reset
        </button>
      </div>

      {engine && (
        <div className="text-gray-300 text-sm">
          Step: {currentStep} / {engine.getTotalSteps() - 1}
        </div>
      )}
    </div>
  );
};
