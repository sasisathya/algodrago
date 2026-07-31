/**
 * UI Configuration - JSON-driven UI layout system
 * Defines panels, buttons, controls, and layout from configuration
 */

export type ControlType = 'button' | 'slider' | 'select' | 'input' | 'toggle' | 'range'
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'
export type PanelPosition = 'left' | 'right' | 'center' | 'bottom'

export interface ControlConfig {
  id: string
  type: ControlType
  label?: string
  action?: string
  variant?: ButtonVariant
  disabled?: boolean
  tooltip?: string
  icon?: string
  options?: Array<{ label: string; value: string | number }>
  min?: number
  max?: number
  step?: number
  placeholder?: string
}

export interface LayoutConfig {
  id: string
  name: string
  template: 'sidebar' | 'centered' | 'fullwidth' | '3-column'
  leftPanelWidth?: number
  rightPanelWidth?: number
  gridTemplate?: string
  gap?: string
}

export interface ThemeConfig {
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textMuted: string
    border: string
    success: string
    warning: string
    error: string
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  typography: {
    fontFamily: string
    baseFontSize: string
    headingScale: number
  }
  borderRadius: {
    sm: string
    md: string
    lg: string
  }
}

/**
 * Default UI Controls Configuration
 */
export const defaultControls: Record<string, ControlConfig> = {
  play: {
    id: 'play',
    type: 'button',
    label: 'Play',
    action: 'play',
    variant: 'primary',
    tooltip: 'Execute all steps automatically',
  },
  pause: {
    id: 'pause',
    type: 'button',
    label: 'Pause',
    action: 'pause',
    variant: 'secondary',
    tooltip: 'Pause execution',
  },
  reset: {
    id: 'reset',
    type: 'button',
    label: 'Reset',
    action: 'reset',
    variant: 'secondary',
    tooltip: 'Reset to initial state',
  },
  randomize: {
    id: 'randomize',
    type: 'button',
    label: 'Randomize',
    action: 'randomize',
    variant: 'secondary',
    tooltip: 'Generate random array',
  },
  nextStep: {
    id: 'nextStep',
    type: 'button',
    label: 'Next Step',
    action: 'nextStep',
    variant: 'primary',
    tooltip: 'Execute next step',
  },
  prevStep: {
    id: 'prevStep',
    type: 'button',
    label: 'Previous Step',
    action: 'prevStep',
    variant: 'secondary',
    tooltip: 'Go to previous step',
  },
  arraySize: {
    id: 'arraySize',
    type: 'range',
    label: 'Array Size',
    min: 5,
    max: 50,
    step: 1,
    tooltip: 'Set the size of array to sort/search',
  },
  sortOrder: {
    id: 'sortOrder',
    type: 'select',
    label: 'Sort Order',
    options: [
      { label: 'Ascending', value: 'asc' },
      { label: 'Descending', value: 'desc' },
    ],
    tooltip: 'Choose sorting direction',
  },
  speed: {
    id: 'speed',
    type: 'range',
    label: 'Speed',
    min: 0.5,
    max: 3,
    step: 0.1,
    tooltip: 'Control animation speed',
  },
}

/**
 * Layout Configurations
 */
export const layoutConfigs: Record<string, LayoutConfig> = {
  default: {
    id: 'default',
    name: 'Default Layout',
    template: '3-column',
    leftPanelWidth: 320,
    rightPanelWidth: 320,
    gridTemplate: '320px 1fr 320px',
    gap: '1.5rem',
  },
  compact: {
    id: 'compact',
    name: 'Compact Layout',
    template: 'sidebar',
    leftPanelWidth: 280,
    rightPanelWidth: 280,
    gridTemplate: '280px 1fr',
    gap: '1rem',
  },
  fullwidth: {
    id: 'fullwidth',
    name: 'Full Width Layout',
    template: 'fullwidth',
    gridTemplate: '1fr',
    gap: '1.5rem',
  },
}

/**
 * Theme Configuration - Glass morphism dark theme
 */
export const darkTheme: ThemeConfig = {
  name: 'Dark Glass',
  colors: {
    primary: '#0ea5e9',
    secondary: '#8b5cf6',
    accent: '#38bdf8',
    background: '#05050d',
    surface: 'rgba(30, 30, 50, 0.5)',
    text: '#f1f5f9',
    textMuted: '#94a3b8',
    border: 'rgba(148, 163, 184, 0.2)',
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  typography: {
    fontFamily: '"SF Mono", "Courier New", monospace',
    baseFontSize: '16px',
    headingScale: 1.2,
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
  },
}

/**
 * UI Configuration Manager
 */
export class UIConfigManager {
  private controls: Map<string, ControlConfig> = new Map()
  private layouts: Map<string, LayoutConfig> = new Map()
  private currentLayout: string = 'default'
  private currentTheme: ThemeConfig = darkTheme

  constructor() {
    // Initialize default controls and layouts
    Object.entries(defaultControls).forEach(([key, config]) => {
      this.controls.set(key, config)
    })
    Object.entries(layoutConfigs).forEach(([key, config]) => {
      this.layouts.set(key, config)
    })
  }

  /**
   * Get control configuration
   */
  getControl(id: string): ControlConfig | undefined {
    return this.controls.get(id)
  }

  /**
   * Get multiple controls
   */
  getControls(ids: string[]): ControlConfig[] {
    return ids.map((id) => this.controls.get(id)!).filter(Boolean)
  }

  /**
   * Register custom control
   */
  registerControl(config: ControlConfig): void {
    this.controls.set(config.id, config)
  }

  /**
   * Get layout configuration
   */
  getLayout(id: string = this.currentLayout): LayoutConfig | undefined {
    return this.layouts.get(id)
  }

  /**
   * Set active layout
   */
  setLayout(id: string): void {
    if (this.layouts.has(id)) {
      this.currentLayout = id
    }
  }

  /**
   * Get current layout
   */
  getCurrentLayout(): LayoutConfig | undefined {
    return this.getLayout(this.currentLayout)
  }

  /**
   * Get theme configuration
   */
  getTheme(): ThemeConfig {
    return this.currentTheme
  }

  /**
   * Get CSS Grid template for current layout
   */
  getGridTemplate(): string {
    const layout = this.getCurrentLayout()
    return layout?.gridTemplate || '1fr'
  }

  /**
   * Get gap for current layout
   */
  getGap(): string {
    const layout = this.getCurrentLayout()
    return layout?.gap || '1rem'
  }

  /**
   * Get CSS variables as string for theme
   */
  getThemeCSS(): Record<string, string> {
    const theme = this.currentTheme
    return {
      '--primary': theme.colors.primary,
      '--secondary': theme.colors.secondary,
      '--accent': theme.colors.accent,
      '--background': theme.colors.background,
      '--surface': theme.colors.surface,
      '--text': theme.colors.text,
      '--text-muted': theme.colors.textMuted,
      '--border': theme.colors.border,
      '--success': theme.colors.success,
      '--warning': theme.colors.warning,
      '--error': theme.colors.error,
      '--spacing-md': theme.spacing.md,
      '--spacing-lg': theme.spacing.lg,
      '--radius-md': theme.borderRadius.md,
      '--font-family': theme.typography.fontFamily,
    }
  }
}

/**
 * Global UI Config Manager Instance
 */
export const uiConfigManager = new UIConfigManager()
