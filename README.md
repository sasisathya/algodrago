# Visualize DSA

An interactive, browser-based visualizer for classic sorting algorithms — watch Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort run step-by-step with color-coded comparisons, swaps, and sorted state.

![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)
![Vite](https://img.shields.io/badge/vite-8.x-646CFF)
![React](https://img.shields.io/badge/react-19.x-61DAFB)
![TypeScript](https://img.shields.io/badge/typescript-6.x-3178C6)

## Features

- 🎬 **Play / Pause / Step** — run the algorithm automatically or walk through it one step at a time, resuming from wherever you paused
- 🎲 **Randomize** — generate a fresh random array without touching your other settings
- 🔄 **Two-tier Reset** — a single click restores the initial array, a double click resets the array *and* all settings
- ⚙️ **Settings panel** — customize array size (5–50 elements), playback speed, or type in your own comma-separated array
- ⌨️ **Keyboard shortcuts** — `Space` to play/pause, `→` to step forward, `R` to reset
- 🔍 **Search & filter** — find algorithms by name, category, difficulty, or visualization type
- 🎨 **Color-coded visualization** — grey (unsorted), yellow (comparing), red (swapping), green (sorted)

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 8](https://vitejs.dev/) for dev server & build tooling
- Plain CSS (custom design system in `src/style.css`) — no CSS framework dependency at runtime
- [Oxlint](https://oxc.rs/) for fast linting

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (bundled with Node.js)

Check your versions:

```bash
node -v
npm -v
```

### Installation

1. Clone or download this repository
2. Install dependencies:

   ```bash
   npm install
   ```

### Run the app locally

```bash
npm run dev
```

This starts the Vite dev server (default: [http://localhost:5173](http://localhost:5173)). If that port is busy, Vite will automatically pick the next available one — check the terminal output for the actual URL.

### Build for production

```bash
npm run build
```

Type-checks the project with `tsc` and outputs an optimized production build to the `dist/` folder.

### Preview the production build

```bash
npm run preview
```

Serves the contents of `dist/` locally so you can sanity-check the production build before deploying.

### Lint

```bash
npm run lint
```

Runs [Oxlint](https://oxc.rs/) against the codebase.

## Project Structure

```
dsa-visualizer/
├── src/
│   ├── data/
│   │   └── algorithms.ts      # Algorithm registry — metadata + step-generating implementations
│   ├── pages/
│   │   ├── Home.tsx            # Landing page: search, filters, algorithm cards
│   │   └── Visualize.tsx       # Detail page: bar chart, controls, legend, settings modal
│   ├── App.tsx                  # Lightweight client-side router (Home ↔ Visualize)
│   ├── style.css                # Design system: CSS variables, glassmorphism, gradients, animations
│   └── main.tsx                 # React entry point
├── index.html
├── package.json
└── vite.config.ts
```

## Adding a New Algorithm

The app is data-driven, so adding an algorithm doesn't require touching any page component:

1. Open `src/data/algorithms.ts`
2. Write an `implement` function with the signature `(array: number[]) => Promise<AlgorithmStep[]>` that pushes a step for every comparison/swap:

   ```ts
   async function mySort(array: number[]): Promise<AlgorithmStep[]> {
     const steps: AlgorithmStep[] = []
     // ... push steps as you compare/swap/mark sorted ...
     return steps
   }
   ```

3. Add an entry to the `algorithms` array with its metadata (name, difficulty, complexity, tags, etc.) and point `implement` at your function
4. That's it — it will automatically appear on the Home page and be fully playable on the Visualize page

## Browser Support

Latest versions of Chrome, Firefox, Safari, and Edge. The UI relies on modern CSS (`backdrop-filter`, CSS custom properties), so very old browsers are not supported.

## License

This project is provided as-is for educational purposes.
