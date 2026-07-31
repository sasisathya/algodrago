/**
 * Configuration System Exports
 * Central point for importing all configuration utilities
 */

// Visualizer Registry & Factory
export {
  type VisualizerType,
  type VisualizerConfig,
  type PanelConfig,
  type PanelContentConfig,
  type RenderStrategy,
  type RenderStrategyRegistry,
  VisualizerFactory,
  visualizerConfigs,
  renderStrategies,
} from './visualizerRegistry'

// Step Builder
export {
  type StepData,
  StepBuilder,
  createStep,
  StepTemplates,
} from './stepBuilder'

// Algorithm Strategy
export {
  type AlgorithmCategory,
  type AlgorithmDifficulty,
  type AlgorithmStrategy,
  AlgorithmStrategyRegistry,
  AlgorithmComparator,
  AlgorithmValidator,
  algorithmRegistry,
} from './algorithmStrategy'

// UI Configuration
export {
  type ControlType,
  type ButtonVariant,
  type PanelPosition,
  type ControlConfig,
  type LayoutConfig,
  type ThemeConfig,
  UIConfigManager,
  defaultControls,
  layoutConfigs,
  darkTheme,
  uiConfigManager,
} from './uiConfig'
