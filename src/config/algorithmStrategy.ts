/**
 * Algorithm Strategy Pattern Implementation
 * Defines unified interface for all algorithm types
 */

import type { StepData } from './stepBuilder'

export type AlgorithmCategory = 'Sorting' | 'Searching' | 'Graph' | 'Tree' | 'Divide & Conquer'
export type AlgorithmDifficulty = 'beginner' | 'intermediate' | 'advanced'

/**
 * Base Algorithm Strategy Interface
 * All algorithms implement this interface
 */
export interface AlgorithmStrategy {
  // Metadata
  id: string
  name: string
  category: AlgorithmCategory
  difficulty: AlgorithmDifficulty

  // Display info
  description: string
  timeComplexity: string
  spaceComplexity: string
  pseudocode: string[]
  tags: string[]

  // Algorithm configuration
  requiresSortedArray?: boolean
  visualizerType: 'array' | 'graph' | 'tree' | 'divide-conquer'

  // Execution
  implement: (input?: any, targetValue?: number) => Promise<StepData[]>

  // Additional info
  bestCase?: string
  averageCase?: string
  worstCase?: string
  spaceWorstCase?: string

  // Real world usage
  realWorldExample?: string
  whenToUse?: string
  advantages?: string[]
  disadvantages?: string[]

  // Learning tips
  learningTip?: string
  commonMistakes?: string[]
}

/**
 * Algorithm Strategy Registry
 * Centralized registry for all algorithms
 */
export class AlgorithmStrategyRegistry {
  private strategies: Map<string, AlgorithmStrategy> = new Map()
  private categorizedStrategies: Map<AlgorithmCategory, AlgorithmStrategy[]> = new Map()

  /**
   * Register a single strategy
   */
  register(strategy: AlgorithmStrategy): void {
    this.strategies.set(strategy.id, strategy)

    if (!this.categorizedStrategies.has(strategy.category)) {
      this.categorizedStrategies.set(strategy.category, [])
    }
    this.categorizedStrategies.get(strategy.category)!.push(strategy)
  }

  /**
   * Register multiple strategies
   */
  registerBatch(strategies: AlgorithmStrategy[]): void {
    strategies.forEach((strategy) => this.register(strategy))
  }

  /**
   * Get strategy by ID
   */
  getStrategy(id: string): AlgorithmStrategy | undefined {
    return this.strategies.get(id)
  }

  /**
   * Get all strategies in a category
   */
  getByCategory(category: AlgorithmCategory): AlgorithmStrategy[] {
    return this.categorizedStrategies.get(category) || []
  }

  /**
   * Get all strategies
   */
  getAllStrategies(): AlgorithmStrategy[] {
    return Array.from(this.strategies.values())
  }

  /**
   * Get all categories
   */
  getCategories(): AlgorithmCategory[] {
    return Array.from(this.categorizedStrategies.keys())
  }

  /**
   * Search strategies by tag
   */
  searchByTag(tag: string): AlgorithmStrategy[] {
    return Array.from(this.strategies.values()).filter((s) => s.tags.includes(tag))
  }

  /**
   * Get statistics
   */
  getStats() {
    return {
      totalAlgorithms: this.strategies.size,
      categoryCounts: Object.fromEntries(
        Array.from(this.categorizedStrategies.entries()).map(([cat, strats]) => [cat, strats.length])
      ),
      difficultyDistribution: {
        beginner: Array.from(this.strategies.values()).filter((s) => s.difficulty === 'beginner').length,
        intermediate: Array.from(this.strategies.values()).filter((s) => s.difficulty === 'intermediate')
          .length,
        advanced: Array.from(this.strategies.values()).filter((s) => s.difficulty === 'advanced').length,
      },
    }
  }
}

/**
 * Global Algorithm Registry Instance
 */
export const algorithmRegistry = new AlgorithmStrategyRegistry()

/**
 * Algorithm Comparator - For comparing algorithms
 */
export class AlgorithmComparator {
  static compareComplexity(algo1: AlgorithmStrategy, algo2: AlgorithmStrategy): string {
    return `${algo1.name}: ${algo1.timeComplexity} vs ${algo2.name}: ${algo2.timeComplexity}`
  }

  static compareDifficulty(algorithms: AlgorithmStrategy[]): AlgorithmStrategy[] {
    const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 }
    return [...algorithms].sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty])
  }

  static groupByCategory(algorithms: AlgorithmStrategy[]): Record<AlgorithmCategory, AlgorithmStrategy[]> {
    const grouped: Record<AlgorithmCategory, AlgorithmStrategy[]> = {} as any
    algorithms.forEach((algo) => {
      if (!grouped[algo.category]) {
        grouped[algo.category] = []
      }
      grouped[algo.category].push(algo)
    })
    return grouped
  }
}

/**
 * Validator for Algorithm Strategies
 */
export class AlgorithmValidator {
  static isValid(strategy: AlgorithmStrategy): boolean {
    return (
      strategy.id &&
      strategy.name &&
      strategy.category &&
      strategy.difficulty &&
      strategy.implement &&
      strategy.visualizerType
    )
  }

  static validateAndThrow(strategy: AlgorithmStrategy): void {
    if (!this.isValid(strategy)) {
      throw new Error(`Invalid algorithm strategy: ${JSON.stringify(strategy)}`)
    }
  }
}
