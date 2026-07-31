# Configuration System Architecture

This directory contains the **design-pattern-based, JSON-driven configuration system** for the DSA Visualizer.

## Architecture Overview

The system implements three core design patterns:

### 1. **Factory Pattern** (`visualizerRegistry.ts`)
- `VisualizerFactory`: Creates visualizers dynamically based on algorithm category
- `visualizerConfigs`: JSON configuration for all visualizer types (array, graph, tree, divide-conquer)
- **Benefit**: Adding new chart types requires only JSON config, no code changes

**Usage:**
```typescript
const config = VisualizerFactory.getConfigForAlgorithm('Sorting')
const panelConfig = VisualizerFactory.getPanel(config, 'left')
```

### 2. **Builder Pattern** (`stepBuilder.ts`)
- `StepBuilder`: Fluent API for building algorithm steps with consistent structure
- `StepTemplates`: Pre-built step creators for common scenarios
- **Benefit**: Ensures all algorithm steps have consistent format, enables reusable step generation

**Usage:**
```typescript
const step = createStep()
  .setArray([1, 2, 3])
  .setComparingIndices([0, 1])
  .setVariables([{ name: 'i', value: '0' }])
  .setLine(5)
  .build()
```

### 3. **Strategy Pattern** (`algorithmStrategy.ts`)
- `AlgorithmStrategy`: Unified interface for all algorithms
- `AlgorithmStrategyRegistry`: Centralized registry for pluggable algorithms
- `AlgorithmComparator`: Compare and analyze algorithms
- **Benefit**: Algorithms are interchangeable, easily extended, can be searched/filtered

**Usage:**
```typescript
algorithmRegistry.register(bubbleSortStrategy)
const algo = algorithmRegistry.getStrategy('bubble-sort')
const allSearching = algorithmRegistry.getByCategory('Searching')
```

## File Structure

```
src/config/
├── visualizerRegistry.ts    # Factory + Strategy for visualizers
├── stepBuilder.ts           # Builder pattern for steps
├── algorithmStrategy.ts     # Strategy + Registry for algorithms
├── uiConfig.ts              # UI layout and control configuration
└── README.md                # This file
```

## Key Concepts

### Visualizer Configuration (JSON)
```typescript
{
  id: 'array',
  type: 'array',
  name: 'Array Visualizer',
  canvasWidth: 800,
  canvasHeight: 280,
  renderStrategy: 'barChart',
  panels: [
    { position: 'left', content: [{ type: 'complexity' }] },
    { position: 'right', content: [{ type: 'variables' }] }
  ],
  features: ['comparingIndices', 'swappingIndices', ...]
}
```

### Algorithm Configuration (JSON/Type)
```typescript
{
  id: 'bubble-sort',
  name: 'Bubble Sort',
  category: 'Sorting',
  difficulty: 'beginner',
  visualizerType: 'array',
  timeComplexity: 'O(n²)',
  spaceComplexity: 'O(1)',
  implement: (input) => Promise<StepData[]>
}
```

### Step Configuration (JSON)
```typescript
{
  array: [1, 2, 3, 4, 5],
  comparingIndices: [0, 1],
  sortedIndices: [4],
  variables: [{ name: 'i', value: '0' }],
  line: 5
}
```

## Benefits of This Architecture

1. **JSON-Driven**: Algorithm metadata, visualizer configs, UI layouts all come from JSON
2. **Reusable**: Methods are pluggable strategies that can be swapped easily
3. **Extensible**: Add new algorithms/visualizers without modifying existing code
4. **Testable**: Strategies can be tested independently
5. **Type-Safe**: Full TypeScript support with interfaces
6. **Maintainable**: Logic is separated from data (JSON configs)

## Adding New Algorithm

```typescript
import { algorithmRegistry } from './config/algorithmStrategy'
import { createStep } from './config/stepBuilder'

const newAlgorithm: AlgorithmStrategy = {
  id: 'quick-sort',
  name: 'Quick Sort',
  category: 'Sorting',
  difficulty: 'intermediate',
  visualizerType: 'array',
  timeComplexity: 'O(n log n)',
  spaceComplexity: 'O(log n)',
  pseudocode: [...],
  tags: ['sorting', 'divide-conquer', 'in-place'],
  
  async implement(input?: any) {
    const steps = []
    // Generate steps using StepBuilder
    steps.push(createStep().setArray([...]).setLine(1).build())
    return steps
  }
}

algorithmRegistry.register(newAlgorithm)
```

## Adding New Visualizer

Add configuration to `visualizerConfigs` in `visualizerRegistry.ts`:

```typescript
matrix: {
  id: 'matrix',
  type: 'matrix',
  name: 'Matrix Visualizer',
  canvasWidth: 600,
  canvasHeight: 600,
  renderStrategy: 'matrixRenderer',
  panels: [...]
}
```

Then create a component that uses `VisualizerFactory.getVisualizer('matrix')`.

## Using UI Configuration

```typescript
import { uiConfigManager } from './config/uiConfig'

// Get layout for current setup
const layout = uiConfigManager.getCurrentLayout()
const gridTemplate = layout.gridTemplate // '320px 1fr 320px'

// Get control configuration
const playButton = uiConfigManager.getControl('play')

// Apply theme CSS variables
const theme = uiConfigManager.getTheme()
Object.entries(uiConfigManager.getThemeCSS()).forEach(([key, value]) => {
  document.documentElement.style.setProperty(key, value)
})
```

## Future Extensions

- **Persistence**: Save/load custom algorithms and visualizer configs
- **Plugins**: Load external algorithm strategies at runtime
- **Themes**: Create multiple theme configurations
- **Localization**: i18n support for UI config
- **Performance**: Memoization and caching strategies
