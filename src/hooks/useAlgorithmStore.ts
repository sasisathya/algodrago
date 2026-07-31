import { create } from 'zustand';
import { VisualizationStep, VisualizationEngine } from '../engines';

interface AlgorithmState {
  selectedAlgorithm: string;
  arraySize: number;
  animationSpeed: number;
  currentStep: number;
  isRunning: boolean;
  isPaused: boolean;
  engine: VisualizationEngine | null;
  currentStepData: VisualizationStep | null;
  array: number[];

  setSelectedAlgorithm: (algorithm: string) => void;
  setArraySize: (size: number) => void;
  setAnimationSpeed: (speed: number) => void;
  setCurrentStep: (step: number) => void;
  setIsRunning: (running: boolean) => void;
  setIsPaused: (paused: boolean) => void;
  setEngine: (engine: VisualizationEngine | null) => void;
  setCurrentStepData: (data: VisualizationStep | null) => void;
  setArray: (array: number[]) => void;
  reset: () => void;
}

export const useAlgorithmStore = create<AlgorithmState>((set) => ({
  selectedAlgorithm: 'bubble',
  arraySize: 30,
  animationSpeed: 50,
  currentStep: 0,
  isRunning: false,
  isPaused: false,
  engine: null,
  currentStepData: null,
  array: [],

  setSelectedAlgorithm: (algorithm) => set({ selectedAlgorithm: algorithm }),
  setArraySize: (size) => set({ arraySize: size }),
  setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
  setCurrentStep: (step) => set({ currentStep: step }),
  setIsRunning: (running) => set({ isRunning: running }),
  setIsPaused: (paused) => set({ isPaused: paused }),
  setEngine: (engine) => set({ engine }),
  setCurrentStepData: (data) => set({ currentStepData: data }),
  setArray: (array) => set({ array }),
  reset: () =>
    set({
      currentStep: 0,
      isRunning: false,
      isPaused: false,
      engine: null,
      currentStepData: null,
    }),
}));
