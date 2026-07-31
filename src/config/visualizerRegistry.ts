/**
 * Visualizer Registry - Factory & Strategy Pattern Implementation
 * Defines and creates visualizers dynamically from JSON config
 */

export type VisualizerType = 'array' | 'graph' | 'tree' | 'divide-conquer' | 'matrix' | 'custom'

export interface RenderStrategy {
  name: string
  render: (canvas: CanvasRenderingContext2D, config: VisualizerConfig, data: any) => void
  calculateLayout?: (canvas: HTMLCanvasElement, data: any) => any
}

export interface VisualizerConfig {
  id: string
  type: VisualizerType
  name: string
  description: string
  canvasWidth: number
  canvasHeight: number
  renderStrategy: string
  panels: PanelConfig[]
  features: string[]
  nodeStyle?: {
    radius?: number
    fontSize?: number
    fillColor?: string
    strokeColor?: string
  }
  edgeStyle?: {
    width?: number
    color?: string
  }
}

export interface PanelConfig {
  id: string
  position: 'left' | 'right' | 'bottom'
  title: string
  minWidth?: number
  content: PanelContentConfig[]
}

export interface PanelContentConfig {
  type: 'complexity' | 'variables' | 'visited' | 'queue' | 'stack' | 'traversal' | 'custom'
  label?: string
  format?: 'text' | 'list' | 'set' | 'badge'
}

/**
 * Visualizer Registry - Centralized configuration for all visualizer types
 */
export const visualizerConfigs: Record<string, VisualizerConfig> = {
  // Array-based visualizer (bar chart for sorting/searching)
  array: {
    id: 'array',
    type: 'array',
    name: 'Array Visualizer',
    description: 'Bar chart for visualizing array elements and sorting/searching',
    canvasWidth: 800,
    canvasHeight: 280,
    renderStrategy: 'barChart',
    panels: [
      {
        id: 'left-panel',
        position: 'left',
        title: 'Algorithm Info',
        minWidth: 320,
        content: [
          { type: 'complexity', label: 'Time Complexity' },
          { type: 'complexity', label: 'Space Complexity' },
        ],
      },
      {
        id: 'right-panel',
        position: 'right',
        title: 'Execution',
        minWidth: 320,
        content: [
          { type: 'variables', format: 'list' },
          { type: 'visited', format: 'text' },
        ],
      },
    ],
    features: ['comparingIndices', 'swappingIndices', 'sortedIndices', 'variableTracking'],
    nodeStyle: {
      fillColor: 'rgba(100, 200, 255, 0.8)',
      strokeColor: '#0ea5e9',
    },
  },

  // Graph visualizer (circular layout)
  graph: {
    id: 'graph',
    type: 'graph',
    name: 'Graph Visualizer',
    description: 'Circular graph layout for BFS/DFS algorithms',
    canvasWidth: 800,
    canvasHeight: 600,
    renderStrategy: 'graphRenderer',
    panels: [
      {
        id: 'left-panel',
        position: 'left',
        title: 'Algorithm Info',
        minWidth: 320,
        content: [
          { type: 'complexity', label: 'Time Complexity' },
          { type: 'complexity', label: 'Space Complexity' },
        ],
      },
      {
        id: 'right-panel',
        position: 'right',
        title: 'Execution',
        minWidth: 320,
        content: [
          { type: 'visited', format: 'set' },
          { type: 'queue', format: 'list' },
          { type: 'stack', format: 'list' },
          { type: 'variables', format: 'list' },
        ],
      },
    ],
    features: ['visitedNodes', 'currentNode', 'queue', 'stack', 'variableTracking'],
    nodeStyle: {
      radius: 30,
      fontSize: 16,
      fillColor: 'rgba(100, 200, 255, 0.8)',
      strokeColor: '#0ea5e9',
    },
    edgeStyle: {
      width: 2,
      color: 'rgba(148, 163, 184, 0.4)',
    },
  },

  // Tree visualizer (hierarchical layout)
  tree: {
    id: 'tree',
    type: 'tree',
    name: 'Tree Visualizer',
    description: 'Hierarchical tree layout for traversal algorithms',
    canvasWidth: 1200,
    canvasHeight: 700,
    renderStrategy: 'treeRenderer',
    panels: [
      {
        id: 'left-panel',
        position: 'left',
        title: 'Algorithm Info',
        minWidth: 320,
        content: [
          { type: 'complexity', label: 'Time Complexity' },
          { type: 'complexity', label: 'Space Complexity' },
        ],
      },
      {
        id: 'right-panel',
        position: 'right',
        title: 'Execution',
        minWidth: 320,
        content: [
          { type: 'traversal', format: 'badge' },
          { type: 'variables', format: 'list' },
        ],
      },
    ],
    features: ['highlightedNode', 'traversalOrder', 'variableTracking'],
    nodeStyle: {
      radius: 45,
      fontSize: 18,
      fillColor: 'rgba(100, 200, 255, 0.8)',
      strokeColor: '#0ea5e9',
    },
    edgeStyle: {
      width: 3,
      color: 'rgba(148, 163, 184, 0.4)',
    },
  },

  // Divide & Conquer visualizer
  divideConquer: {
    id: 'divide-conquer',
    type: 'divide-conquer',
    name: 'Divide & Conquer Visualizer',
    description: 'Step-by-step visualization of divide-and-conquer algorithms',
    canvasWidth: 0,
    canvasHeight: 0,
    renderStrategy: 'divideConquerRenderer',
    panels: [
      {
        id: 'left-panel',
        position: 'left',
        title: 'Algorithm Info',
        minWidth: 320,
        content: [
          { type: 'complexity', label: 'Time Complexity' },
          { type: 'complexity', label: 'Space Complexity' },
        ],
      },
      {
        id: 'right-panel',
        position: 'right',
        title: 'Execution',
        minWidth: 320,
        content: [{ type: 'variables', format: 'list' }],
      },
    ],
    features: ['recursionDepth', 'phase', 'variableTracking'],
  },
}

/**
 * Visualizer Factory - Creates visualizers based on algorithm category
 */
export class VisualizerFactory {
  static getConfigForAlgorithm(algorithmCategory: string): VisualizerConfig {
    const categoryMap: Record<string, string> = {
      Sorting: 'array',
      Searching: 'array',
      Graph: 'graph',
      Tree: 'tree',
      'Divide & Conquer': 'divideConquer',
    }

    const configKey = categoryMap[algorithmCategory] || 'array'
    return visualizerConfigs[configKey]
  }

  static getVisualizer(type: VisualizerType): VisualizerConfig {
    return visualizerConfigs[type] || visualizerConfigs.array
  }

  static getSupportedTypes(): VisualizerType[] {
    return Object.keys(visualizerConfigs) as VisualizerType[]
  }

  static hasPanel(config: VisualizerConfig, position: 'left' | 'right' | 'bottom'): boolean {
    return config.panels.some((p) => p.position === position)
  }

  static getPanel(config: VisualizerConfig, position: 'left' | 'right' | 'bottom'): PanelConfig | undefined {
    return config.panels.find((p) => p.position === position)
  }
}

/**
 * Render Strategy Registry
 */
export interface RenderStrategyRegistry {
  barChart: RenderStrategy
  graphRenderer: RenderStrategy
  treeRenderer: RenderStrategy
  divideConquerRenderer: RenderStrategy
  [key: string]: RenderStrategy
}

export const renderStrategies: RenderStrategyRegistry = {
  barChart: {
    name: 'Bar Chart Renderer',
    render: (ctx, config, data) => {
      // Rendering logic delegated to component
      // This is a placeholder - actual rendering happens in BarChart component
    },
  },
  graphRenderer: {
    name: 'Graph Renderer',
    render: (ctx, config, data) => {
      // Rendering logic delegated to component
    },
  },
  treeRenderer: {
    name: 'Tree Renderer',
    render: (ctx, config, data) => {
      // Rendering logic delegated to component
    },
  },
  divideConquerRenderer: {
    name: 'Divide & Conquer Renderer',
    render: (ctx, config, data) => {
      // Rendering logic delegated to component
    },
  },
}
