export interface VisualizationStep {
  array: number[];
  comparisons?: { indices: number[]; color: string }[];
  swaps?: { indices: number[]; color: string }[];
  sorted?: number[];
  pivotIndex?: number;
}

export interface AlgorithmConfig {
  arraySize: number;
  animationSpeed: number;
  onStep?: (step: VisualizationStep) => void;
}

export class VisualizationEngine {
  private steps: VisualizationStep[] = [];
  private currentStep: number = 0;
  private isRunning: boolean = false;

  addStep(step: VisualizationStep) {
    this.steps.push(step);
  }

  getStep(index: number): VisualizationStep | null {
    return this.steps[index] || null;
  }

  getAllSteps(): VisualizationStep[] {
    return this.steps;
  }

  getTotalSteps(): number {
    return this.steps.length;
  }

  getCurrentStep(): number {
    return this.currentStep;
  }

  setCurrentStep(step: number) {
    this.currentStep = Math.min(Math.max(step, 0), this.steps.length - 1);
  }

  reset() {
    this.currentStep = 0;
    this.steps = [];
    this.isRunning = false;
  }

  isAlgorithmRunning(): boolean {
    return this.isRunning;
  }

  setRunning(running: boolean) {
    this.isRunning = running;
  }
}

export default VisualizationEngine;
