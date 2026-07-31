import React, { useEffect, useRef } from 'react';
import { useAlgorithmStore } from '../../hooks/useAlgorithmStore';

export const VisualizationCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { currentStepData } = useAlgorithmStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !currentStepData) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const array = currentStepData.array;
    if (!array || array.length === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const barWidth = canvasWidth / array.length;
    const maxValue = Math.max(...array);

    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const comparisons = currentStepData.comparisons || [];
    const swaps = currentStepData.swaps || [];
    const sorted = currentStepData.sorted || [];

    const comparisonIndices = new Set(comparisons.flatMap((c) => c.indices));
    const swapIndices = new Set(swaps.flatMap((s) => s.indices));
    const sortedIndices = new Set(sorted);

    array.forEach((value, index) => {
      const barHeight = (value / maxValue) * (canvasHeight - 40);
      const x = index * barWidth;
      const y = canvasHeight - barHeight - 20;

      let color = '#4ecdc4';

      if (sortedIndices.has(index)) {
        color = '#00d084';
      } else if (swapIndices.has(index)) {
        color = '#4ecdc4';
      } else if (comparisonIndices.has(index)) {
        color = '#ff6b6b';
      } else if (currentStepData.pivotIndex === index) {
        color = '#ffd93d';
      }

      ctx.fillStyle = color;
      ctx.fillRect(x + 2, y, barWidth - 4, barHeight);

      ctx.fillStyle = '#e8e8e8';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(value.toString(), x + barWidth / 2, canvasHeight - 5);
    });
  }, [currentStepData]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={400}
      className="border border-gray-600 bg-gray-900 rounded-lg w-full"
    />
  );
};
