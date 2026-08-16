# Algorithm Data Structure Guide

## Overview

All algorithms are stored in the `data/` directory and exported through `algorithms.ts`. The structure is organized by category for maintainability and scalability.

## Current Structure

### Files
- `algorithms.ts` - Main export combining all algorithms + helper functions
- `graphAlgorithms.ts` - Graph-based algorithms (BFS, DFS, etc.)
- `treeAlgorithms.ts` - Tree-based algorithms
- `divideConquerAlgorithms.ts` - Divide & Conquer algorithms
- `sortingAlgorithms.ts` (inline in algorithms.ts) - Sorting algorithms
- `searchingAlgorithms.ts` (inline in algorithms.ts) - Searching algorithms

### Algorithm Interface

```typescript
interface Algorithm {
  id: string                          // Unique identifier (kebab-case)
  name: string                        // Display name
  category: string                    // Category (Sorting, Searching, Graph, Tree, Divide & Conquer)
  type: string                        // Type/Subtype (e.g., 'Array', 'Graph', 'Divide & Conquer')
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  description: string                 // Brief description
  timeComplexity: string              // e.g., 'O(n²)', 'O(n log n)'
  spaceComplexity: string             // e.g., 'O(1)', 'O(n)'
  tags: string[]                      // Search tags
  pseudocode: string[]                // Algorithm pseudocode
  implement: (input?: any) => Promise<any[]>  // Implementation function
}
```

## Usage Across Pages

### 1. Home.tsx (Algorithm Browsing)
```typescript
import { algorithms, filterAlgorithms } from '../../data/algorithms'

// Filter by category and difficulty
const filtered = filterAlgorithms({
  category: 'Sorting',
  difficulty: 'beginner'
})
```

### 2. Market.tsx (Algorithm Market View)
```typescript
import { algorithms, getAlgorithmCountByCategory } from '../../data/algorithms'

// Get all algorithms for card view
algorithms.forEach(algo => {
  // Display in card grid
})
```

### 3. VisualizersDashboard.tsx (Treemap View)
```typescript
import { algorithms } from '../../data/algorithms'

// All algorithms displayed in treemap
// Grouped by category, sized by content, colored by difficulty
```

## Available Helper Functions

### Query Functions
```typescript
// Get single algorithm
getAlgorithmById('bubble-sort')

// Get algorithms by category
getAlgorithmsByCategory('Sorting')

// Get algorithms by difficulty
getAlgorithmsByDifficulty('beginner')

// Get all categories
getUniqueCategories()

// Get count per category
getAlgorithmCountByCategory()

// Advanced filtering
filterAlgorithms({
  category: 'Graph',
  difficulty: 'intermediate',
  type: 'Graph',
  searchTerm: 'traversal'
})
```

## Adding New Algorithms

### Option 1: Add to Existing Category File

For Graph, Tree, or Divide & Conquer algorithms:

```typescript
// In graphAlgorithms.ts, treeAlgorithms.ts, etc.

export const graphAlgorithms: GraphAlgorithm[] = [
  {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    category: 'Graph',
    type: 'Graph',
    difficulty: 'advanced',
    description: 'Finds shortest path from source to all other nodes using greedy approach.',
    timeComplexity: 'O(V² + E)',
    spaceComplexity: 'O(V)',
    tags: ['graph', 'shortest-path', 'greedy', 'dijkstra'],
    pseudocode: [
      'Dijkstra(graph, source):',
      '  distances = {source: 0, others: ∞}',
      '  visited = Set()',
      '  while unvisited nodes:',
      '    current = unvisited with min distance',
      '    for neighbor in current.neighbors:',
      '      newDist = distances[current] + weight',
      '      if newDist < distances[neighbor]:',
      '        distances[neighbor] = newDist'
    ],
    implement: dijkstra,  // Function defined above
  },
  // ... other algorithms
]
```

### Option 2: Add to Main Sorting/Searching Array

For Sorting or Searching algorithms (currently inline in algorithms.ts):

```typescript
// In algorithms.ts, add before the export const algorithms = [...]

const myNewAlgorithmCode = [
  'MyAlgorithm(array):',
  '  // pseudocode steps'
]

async function myNewAlgorithm(array: number[]): Promise<AlgorithmStep[]> {
  const steps: AlgorithmStep[] = []
  const arr = [...array]
  
  // Implementation
  // steps.push({ array: [...arr], ... })
  
  return steps
}

// Then add to the algorithms array:
{
  id: 'my-new-algorithm',
  name: 'My New Algorithm',
  difficulty: 'intermediate',
  category: 'Sorting',
  type: 'Array',
  description: 'Description of the algorithm',
  timeComplexity: 'O(n log n)',
  spaceComplexity: 'O(1)',
  tags: ['sorting', 'comparison'],
  pseudocode: myNewAlgorithmCode,
  implement: myNewAlgorithm,
}
```

## Best Practices

1. **Unique IDs**: Use kebab-case, globally unique across all categories
2. **Consistency**: Match the interface exactly for all algorithms
3. **Tags**: Use lowercase, descriptive tags for search/filtering
4. **Complexity**: Express as Big-O notation (O(n), O(n log n), etc.)
5. **Pseudocode**: Clear, indented, 5-15 lines typically
6. **Implement**: Should return array of steps with current state

## Data Flow

```
algorithms.ts (main export)
    ↓
┌───────────────────────────┐
│  Home.tsx                 │  (Carousel browsing)
│  Market.tsx               │  (Card grid view)
│  VisualizersDashboard.tsx │  (Treemap visualization)
└───────────────────────────┘
```

All three pages pull from the same `algorithms` array, ensuring:
- ✓ Single source of truth
- ✓ Consistent data across views
- ✓ Easy future additions
- ✓ No duplicate data

## Migration Path (Future)

To separate Sorting/Searching into dedicated files:
1. Create `sortingAlgorithms.ts`
2. Create `searchingAlgorithms.ts`
3. Move implementations and interfaces
4. Update imports in `algorithms.ts`
5. Spread into main export (like Graph, Tree, DivideConquer)

## Example: Complete Algorithm

```typescript
// Pseudocode
const linearSearchCode = [
  'LinearSearch(array, target):',
  '  for i = 0 to array.length - 1:',
  '    if array[i] equals target:',
  '      return i',
  '  return -1'
]

// Implementation
async function linearSearch(array: number[], targetValue: number): Promise<AlgorithmStep[]> {
  const steps: AlgorithmStep[] = []

  for (let i = 0; i < array.length; i++) {
    steps.push({
      array: [...array],
      comparingIndices: [i],
      sortedIndices: [],
      variables: [p('target', targetValue), p('i', i)],
      line: 1
    })

    if (array[i] === targetValue) {
      steps.push({
        array: [...array],
        comparingIndices: [i],
        sortedIndices: [i],
        variables: [p('target', targetValue), p('i', i)],
        line: 3
      })
      break
    }
  }

  return steps
}

// Algorithm definition
{
  id: 'linear-search',
  name: 'Linear Search',
  category: 'Searching',
  type: 'Array',
  difficulty: 'beginner',
  description: 'Sequentially checks each element until finding the target or reaching the end.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  tags: ['searching', 'linear', 'sequential'],
  pseudocode: linearSearchCode,
  implement: linearSearch
}
```
