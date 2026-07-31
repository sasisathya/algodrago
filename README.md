# AlgoDrago - DSA Visualizer

A comprehensive, interactive algorithm visualizer for learning Data Structures and Algorithms. Watch 67+ algorithms across 8 categories execute step-by-step with real-time visualization, pseudocode highlighting, variable tracking, and educational explanations.

![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)
![Vite](https://img.shields.io/badge/vite-8.x-646CFF)
![React](https://img.shields.io/badge/react-19.x-61DAFB)
![TypeScript](https://img.shields.io/badge/typescript-5.x-3178C6)

## 🎯 Overview

AlgoDrago is a modern, interactive platform for visualizing algorithms in real-time. It supports multiple data structure types with beautiful, responsive visualizations powered by Canvas API.

### Supported Algorithm Categories

| Category | Count | Visualizer |
|----------|-------|-----------|
| **Sorting** | 8 | Array/Bar Chart |
| **Searching** | 7 | Array/Bar Chart |
| **Graph** | 2 | Graph (Circular Layout) |
| **Tree** | 4 | Tree (Hierarchical Layout) |
| **Divide & Conquer** | 3 | Recursion Tree |
| **Other Categories** | 43+ | Various |
| **Total** | 67+ | 4 Visualizer Types |

## ✨ Key Features

### Visualization & Animation
- 🎬 **Play / Pause / Step** — Run algorithms automatically or manually step through them
- ⏱️ **Speed Control** — Adjust animation speed (0.5x to 3x)
- 🔄 **Reset** — Restore to initial state with one click
- 🎲 **Randomize** — Generate fresh random arrays instantly

### Algorithm Exploration
- 🔍 **Search & Filter** — Find algorithms by name, category, difficulty, or tag
- 📊 **Complexity Display** — Real-time Time & Space complexity info
- 📖 **Algorithm Explanations** — "How It Works", "Step by Step", "When to Use", "Real-World Examples"
- 💡 **Learning Tips** — Common mistakes and optimization insights

### Data Structure Support
- **Array-based** — Sorting, Searching (bar chart visualization)
- **Graph-based** — BFS, DFS with circular node layout
- **Tree-based** — Tree traversals with hierarchical layout
- **Recursion Trees** — Divide & Conquer with call stack visualization

### Code & Variables
- ⌨️ **Pseudocode Highlighting** — Lines highlight as they execute
- 📝 **Variable Tracking** — Watch variables change in real-time
- 📊 **State Panel** — View algorithm state, comparisons, swaps, visited nodes
- 🎨 **Color Coding** — Visual indicators (pending, comparing, swapping, completed, memoized)

### Interactive Controls
- ⚙️ **Settings Modal** — Customize array size, sort order, and input values
- ✏️ **Custom Input** — Type comma-separated values or generate random arrays
- 📋 **Copy/Paste** — Easily share array configurations

## 🏗️ Architecture

Built with **Design Patterns** for scalability and maintainability:

### Core Patterns
- **Factory Pattern** — `VisualizerFactory` creates visualizers dynamically
- **Strategy Pattern** — Pluggable algorithm strategies in `AlgorithmStrategyRegistry`
- **Builder Pattern** — `StepBuilder` for consistent step creation

### Configuration-Driven
- All algorithms defined in JSON-like TypeScript configs
- Visualizer types are JSON-configurable
- UI layout driven by configuration

```
src/
├── config/                      # Design patterns & configurations
│   ├── visualizerRegistry.ts    # Factory pattern for visualizers
│   ├── algorithmStrategy.ts     # Strategy pattern for algorithms
│   ├── stepBuilder.ts           # Builder pattern for steps
│   └── uiConfig.ts              # UI configuration
├── data/                        # Algorithm implementations
│   ├── algorithms.ts            # Sorting & Searching
│   ├── graphAlgorithms.ts       # BFS, DFS
│   ├── treeAlgorithms.ts        # Tree traversals
│   └── divideConquerAlgorithms.ts
├── components/visualize/        # Visualizer components
│   ├── BarChart.tsx             # Array visualizer
│   ├── GraphVisualizer.tsx      # Graph visualizer
│   ├── TreeVisualizer.tsx       # Tree visualizer
│   └── RecursionTreeVisualizer.tsx
├── pages/
│   ├── Home.tsx                 # Algorithm browser
│   └── Visualize.tsx            # Main visualizer page
└── utils/                       # Helpers
```

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/sasisathya/algodrago.git
cd algodrago

# Install dependencies
npm install
```

### Run Development Server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Outputs optimized production build to `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 🎮 How to Use

### 1. Browse Algorithms
- Visit Home page to see all algorithms
- Filter by category, difficulty, or search by name
- Click any algorithm card to open visualizer

### 2. Configure Algorithm
- Adjust array size (5-50 elements)
- Choose sort order (ascending/descending)
- Enter custom array values
- Set target value for searching algorithms

### 3. Run Visualization
- Click **Play** to run automatically
- Click **Next Step** to manually step through
- Click **Pause** to stop
- Click **Reset** to restart
- Use **Speed** slider to adjust animation speed

### 4. Monitor Execution
- Watch pseudocode lines highlight as they execute
- Track variables in real-time
- View complexity metrics
- See state changes (visited nodes, call stack, etc.)

### 5. Learn
- Read algorithm explanation (How It Works)
- Study Time & Space complexity
- View real-world examples
- Learn when to use each algorithm

## 📚 Algorithm Categories

### Sorting (8)
Bubble, Selection, Insertion, Merge, Quick, Heap, Counting, Radix

### Searching (7)
Linear, Binary, Jump, Exponential, Interpolation, Fibonacci, Ternary

### Graph (2)
BFS (Breadth-First Search), DFS (Depth-First Search)

### Tree (4)
Inorder, Preorder, Postorder, Level Order Traversal

### Divide & Conquer (3)
Tower of Hanoi, Fibonacci (Memoization), Strassen's Matrix Multiplication

### And More...
Dynamic Programming, Greedy, Backtracking, Bit Manipulation, and more.

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite 8
- **Styling**: Custom CSS with glassmorphism design
- **Canvas**: Native Canvas API for graph/tree rendering
- **State Management**: Zustand
- **Linting**: Oxlint
- **Package Manager**: npm

## 🎨 Design System

- **Theme**: Dark mode with glassmorphism UI
- **Colors**: Custom CSS variables for consistent theming
- **Animations**: Smooth transitions and step animations
- **Responsive**: Works on desktop, tablet, mobile
- **Accessibility**: Keyboard shortcuts for navigation

### Keyboard Shortcuts
- `Space` — Play/Pause
- `→` — Next Step
- `←` — Previous Step
- `R` — Reset
- `Ctrl+L` — Focus search

## 📖 Adding New Algorithms

The architecture makes adding new algorithms simple:

### 1. Create Algorithm Function

```typescript
async function myAlgorithm(array: number[], target?: number): Promise<DivideConquerStep[]> {
  const steps: DivideConquerStep[] = []
  
  // Generate steps using StepBuilder
  steps.push(
    createStep()
      .setArray([...array])
      .setComparingIndices([0, 1])
      .setLine(1)
      .build()
  )
  
  return steps
}
```

### 2. Register Algorithm

```typescript
const algorithm: AlgorithmStrategy = {
  id: 'my-algorithm',
  name: 'My Algorithm',
  category: 'Sorting',
  difficulty: 'intermediate',
  visualizerType: 'array',
  timeComplexity: 'O(n log n)',
  spaceComplexity: 'O(1)',
  // ... other metadata ...
  implement: myAlgorithm
}

algorithmRegistry.register(algorithm)
```

### 3. That's It!
Algorithm automatically appears in the UI with full visualization support.

## 📊 Project Statistics

- **Total Lines of Code**: 13,000+
- **Components**: 15+
- **Visualizers**: 4 types
- **Algorithms**: 67+
- **Configuration Files**: 5
- **Design Patterns**: 3 (Factory, Strategy, Builder)

## 🐛 Known Issues & Future Enhancements

### Planned Features
- [ ] More sorting algorithms (Cocktail Sort, Comb Sort, etc.)
- [ ] Advanced graph algorithms (Dijkstra, BFS shortest path)
- [ ] Dynamic programming algorithms
- [ ] Animation speed profiles
- [ ] Theme customization
- [ ] Mobile app version
- [ ] Algorithm comparison tool

### Known Limitations
- Very large arrays (100+) may have performance issues
- Some mobile devices may have rendering performance variations

## 📄 License

This project is provided as-is for educational purposes.

## 👨‍💻 Author

**sasisathya** — Created as a comprehensive learning tool for Data Structures and Algorithms

## 🤝 Contributing

Contributions are welcome! To add:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/add-algorithm`)
3. Commit your changes
4. Push to branch and open a Pull Request

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing issues first to avoid duplicates

---

**Happy Learning! 🚀**

Visit [AlgoDrago](https://github.com/sasisathya/algodrago) to get started.
