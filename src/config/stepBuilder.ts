/**
 * Step Builder - Builder Pattern Implementation
 * Provides a unified interface for creating algorithm steps
 */

export interface StepData {
  // Core step info
  stepNumber?: number
  line?: number
  operation?: string

  // Array-based visualization
  array?: number[]
  comparingIndices?: number[]
  swappingIndices?: number[]
  sortedIndices?: number[]

  // Graph visualization
  graph?: {
    nodes: any[]
    edges: any[]
  }
  visitedNodes?: Set<string>
  currentNode?: string
  queue?: string[]
  stack?: string[]

  // Tree visualization
  tree?: any
  highlightedNode?: string
  traversalOrder?: string[]

  // Divide & Conquer
  recursionDepth?: number
  phase?: 'Divide' | 'Conquer' | 'Combine'
  subproblems?: any[]

  // General tracking
  variables?: Array<{ name: string; value: string }>
  message?: string
}

/**
 * Step Builder class - Fluent API for building steps
 */
export class StepBuilder {
  private step: StepData = {}

  // Setters for different data types
  setLine(line: number): this {
    this.step.line = line
    return this
  }

  setOperation(operation: string): this {
    this.step.operation = operation
    return this
  }

  // Array operations
  setArray(array: number[]): this {
    this.step.array = [...array]
    return this
  }

  setComparingIndices(indices: number[]): this {
    this.step.comparingIndices = indices
    return this
  }

  setSwappingIndices(indices: number[]): this {
    this.step.swappingIndices = indices
    return this
  }

  setSortedIndices(indices: number[]): this {
    this.step.sortedIndices = indices
    return this
  }

  // Graph operations
  setGraph(graph: { nodes: any[]; edges: any[] }): this {
    this.step.graph = graph
    return this
  }

  setVisitedNodes(visited: Set<string>): this {
    this.step.visitedNodes = new Set(visited)
    return this
  }

  setCurrentNode(nodeId: string): this {
    this.step.currentNode = nodeId
    return this
  }

  setQueue(queue: string[]): this {
    this.step.queue = [...queue]
    return this
  }

  setStack(stack: string[]): this {
    this.step.stack = [...stack]
    return this
  }

  // Tree operations
  setTree(tree: any): this {
    this.step.tree = tree
    return this
  }

  setHighlightedNode(nodeId: string): this {
    this.step.highlightedNode = nodeId
    return this
  }

  setTraversalOrder(order: string[]): this {
    this.step.traversalOrder = [...order]
    return this
  }

  // Divide & Conquer operations
  setRecursionDepth(depth: number): this {
    this.step.recursionDepth = depth
    return this
  }

  setPhase(phase: 'Divide' | 'Conquer' | 'Combine'): this {
    this.step.phase = phase
    return this
  }

  // General operations
  setVariables(variables: Array<{ name: string; value: string }>): this {
    this.step.variables = variables
    return this
  }

  addVariable(name: string, value: string): this {
    if (!this.step.variables) {
      this.step.variables = []
    }
    this.step.variables.push({ name, value })
    return this
  }

  setMessage(message: string): this {
    this.step.message = message
    return this
  }

  // Build and return the step
  build(): StepData {
    return { ...this.step }
  }

  // Reset builder for next step
  reset(): this {
    this.step = {}
    return this
  }

  // Clone current step with modifications
  clone(modifications?: Partial<StepData>): this {
    this.step = { ...this.step, ...modifications }
    return this
  }
}

/**
 * Helper function to create a step builder
 */
export function createStep(): StepBuilder {
  return new StepBuilder()
}

/**
 * Pre-built step creators for common scenarios
 */
export const StepTemplates = {
  // For array-based algorithms
  arrayStep(array: number[], line: number = 0): StepBuilder {
    return createStep().setArray(array).setLine(line)
  },

  // For graph algorithms
  graphStep(graph: any, line: number = 0): StepBuilder {
    return createStep().setGraph(graph).setLine(line)
  },

  // For tree algorithms
  treeStep(tree: any, line: number = 0): StepBuilder {
    return createStep().setTree(tree).setLine(line)
  },

  // For divide & conquer
  divideConquerStep(depth: number, phase: 'Divide' | 'Conquer' | 'Combine', line: number = 0): StepBuilder {
    return createStep().setRecursionDepth(depth).setPhase(phase).setLine(line)
  },
}
