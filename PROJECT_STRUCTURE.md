# DSA Visualizer - Project Structure

## Overview
DSA Visualizer is an interactive educational platform for visualizing Data Structures and Algorithms. This project currently supports sorting algorithm visualization with step-by-step execution.

## Tech Stack
- **Frontend Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animation**: Custom Canvas-based rendering
- **Additional Libraries**: Framer Motion (for future enhancements)

## Folder Structure

```
dsa-visualizer/
├── src/
│   ├── algorithms/
│   │   ├── sorting/
│   │   │   ├── bubbleSort.ts      # Bubble sort implementation
│   │   │   ├── mergeSort.ts       # Merge sort implementation
│   │   │   └── quickSort.ts       # Quick sort implementation
│   │   ├── searching/             # Placeholder for searching algorithms
│   │   └── graphAlgorithms/       # Placeholder for graph algorithms
│   ├── components/
│   │   ├── Visualizers/
│   │   │   └── VisualizationCanvas.tsx  # Canvas-based visualization renderer
│   │   └── ControlPanel/
│   │       └── ControlPanel.tsx         # Control buttons and settings
│   ├── engines/
│   │   └── VisualizationEngine.ts       # Core visualization engine
│   ├── hooks/
│   │   └── useAlgorithmStore.ts         # Zustand state management
│   ├── utils/
│   │   └── arrayGenerators.ts           # Utility functions for array generation
│   ├── styles/                          # Global styles
│   ├── pages/
│   │   └── Visualizers.tsx              # Main page component
│   ├── App.tsx                          # Root component
│   ├── main.tsx                         # Entry point
│   └── index.css                        # Tailwind directives
├── postcss.config.js                    # PostCSS configuration
├── tailwind.config.js                   # Tailwind CSS configuration
├── vite.config.ts                       # Vite configuration
├── tsconfig.json                        # TypeScript configuration
├── index.html                           # HTML entry point
└── package.json                         # Project dependencies
```

## Key Components

### VisualizationEngine
- Manages visualization steps and animation playback
- Stores algorithm execution steps with visual states (comparisons, swaps, sorted indices)
- Provides methods for step navigation and state management

### Sorting Algorithms
Each sorting algorithm (Bubble, Merge, Quick) follows this pattern:
- Takes an array and configuration (size, speed)
- Executes the algorithm with visualization steps recorded
- Returns a VisualizationEngine instance with all steps

### VisualizationCanvas
- Uses HTML5 Canvas for rendering
- Displays array elements as colored bars
- Color coding:
  - **Red**: Elements being compared
  - **Cyan**: Elements being swapped
  - **Green**: Sorted elements
  - **Yellow**: Pivot element (for Quick Sort)

### ControlPanel
- Algorithm selector dropdown
- Array size slider (5-100 elements)
- Animation speed slider (1-100)
- Playback controls (Start, Play/Pause, Next, Previous, Generate, Reset)
- Step counter display

## How to Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## How to Add New Algorithms

1. Create a new file in `src/algorithms/sorting/` (e.g., `insertionSort.ts`)
2. Implement the algorithm following the existing pattern:
   ```typescript
   export async function insertionSort(
     array: number[],
     config: AlgorithmConfig
   ): Promise<VisualizationEngine> {
     const engine = new VisualizationEngine();
     // ... algorithm implementation
     return engine;
   }
   ```
3. Add it to the ControlPanel dropdown:
   ```typescript
   <option value="insertion">Insertion Sort</option>
   ```
4. Add the import and case in the switch statement in ControlPanel.tsx

## Color Scheme
- **Red (#ff6b6b)**: Comparison operations
- **Cyan (#4ecdc4)**: Swap/Move operations
- **Green (#00d084)**: Sorted elements
- **Yellow (#ffd93d)**: Pivot element
- **Dark gray (#1a1a2e)**: Background

## Future Enhancements
- [ ] Searching algorithms (Binary Search, Linear Search)
- [ ] Graph algorithms (DFS, BFS, Dijkstra)
- [ ] Additional sorting algorithms (Heap Sort, Radix Sort)
- [ ] Code display pane
- [ ] Algorithm complexity analysis
- [ ] Custom array input
- [ ] Comparison mode (run multiple algorithms side-by-side)
- [ ] Step explanations
- [ ] Sound effects for operations
- [ ] Dark/Light theme toggle

## Performance Notes
- Canvas rendering is optimized for arrays up to 200 elements
- Animation speed directly affects step delay (lower = faster)
- Browser performance may vary depending on device and array size
