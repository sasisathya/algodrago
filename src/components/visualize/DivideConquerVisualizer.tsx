import { memo } from 'react'
import type { DivideConquerStep } from '../../data/divideConquerAlgorithms'
import { RecursionTreeVisualizer } from './RecursionTreeVisualizer'

interface DivideConquerVisualizerProps {
  steps: DivideConquerStep[]
  currentStepIndex: number
  algorithmName: string
  timeComplexity: string
  spaceComplexity: string
}

function DivideConquerVisualizerImpl({
  steps,
  currentStepIndex,
  algorithmName,
  timeComplexity,
  spaceComplexity,
}: DivideConquerVisualizerProps) {
  // Use step 0 if currentStepIndex is -1 (initial state)
  const stepIndex = currentStepIndex === -1 ? 0 : currentStepIndex
  const currentStep = steps[stepIndex]

  const getPhaseColor = (phase?: string) => {
    switch (phase) {
      case 'divide':
        return 'rgba(251, 191, 36, 0.1)'
      case 'conquer':
        return 'rgba(56, 189, 248, 0.1)'
      case 'combine':
        return 'rgba(168, 85, 247, 0.1)'
      default:
        return 'rgba(255, 255, 255, 0.05)'
    }
  }

  const getPhaseIcon = (phase?: string) => {
    switch (phase) {
      case 'divide':
        return '🔀'
      case 'conquer':
        return '⚔️'
      case 'combine':
        return '🔗'
      default:
        return '▶'
    }
  }

  const getPhaseLabel = (phase?: string) => {
    switch (phase) {
      case 'divide':
        return 'Divide'
      case 'conquer':
        return 'Conquer'
      case 'combine':
        return 'Combine'
      default:
        return 'Step'
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Recursion Tree Visualization */}
      {currentStep?.recursionTree && (
        <RecursionTreeVisualizer
          recursionTree={currentStep.recursionTree}
          callStack={currentStep.callStack}
          algorithmName={algorithmName}
          timeComplexity={timeComplexity}
          spaceComplexity={spaceComplexity}
          subproblemsSolved={currentStep.subproblemsSolved}
          totalSubproblems={currentStep.totalSubproblems}
          currentStepIndex={currentStepIndex}
        />
      )}

      {/* Main Visualization */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem' }}>
          {/* Steps List */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem' }}>
              {algorithmName} - Step by Step
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '500px', overflowY: 'auto' }}>
              {steps.map((step, index) => (
                <div
                  key={index}
                  style={{
                    padding: '1rem',
                    backgroundColor: index === currentStepIndex ? getPhaseColor(step.state) : 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '0.5rem',
                    border:
                      index === currentStepIndex
                        ? '2px solid var(--accent-blue)'
                        : '1px solid var(--border-subtle)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>{getPhaseIcon(step.state)}</span>
                    <div>
                      <p style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)' }}>
                        Step {index + 1} - {getPhaseLabel(step.state)}
                      </p>
                      {step.recursionDepth !== undefined && (
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Recursion Depth: {step.recursionDepth}
                        </p>
                      )}
                    </div>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    {step.operation}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    {step.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', minWidth: '220px' }}>
            <div style={{ padding: '1.25rem', backgroundColor: 'rgba(56, 189, 248, 0.1)', borderRadius: '0.5rem' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginBottom: '0.35rem' }}>
                TIME COMPLEXITY
              </p>
              <p style={{ color: 'var(--accent-blue)', fontSize: '1.1rem', fontWeight: '700' }}>
                {timeComplexity}
              </p>
            </div>

            <div style={{ padding: '1.25rem', backgroundColor: 'rgba(168, 85, 247, 0.1)', borderRadius: '0.5rem' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginBottom: '0.35rem' }}>
                SPACE COMPLEXITY
              </p>
              <p style={{ color: 'var(--accent-purple)', fontSize: '1.1rem', fontWeight: '700' }}>
                {spaceComplexity}
              </p>
            </div>

            {currentStep?.recursionDepth !== undefined && (
              <div style={{ padding: '1.25rem', backgroundColor: 'rgba(251, 191, 36, 0.1)', borderRadius: '0.5rem' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginBottom: '0.35rem' }}>
                  RECURSION DEPTH
                </p>
                <p style={{ color: 'var(--state-comparing)', fontSize: '1.1rem', fontWeight: '700' }}>
                  {currentStep.recursionDepth}
                </p>
              </div>
            )}

            {currentStep?.variables && currentStep.variables.length > 0 && (
              <div style={{ padding: '1.25rem', backgroundColor: 'rgba(52, 211, 153, 0.1)', borderRadius: '0.5rem' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginBottom: '0.75rem' }}>
                  VARIABLES
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {currentStep.variables.map((v) => (
                    <div key={v.name} style={{ fontSize: '0.85rem' }}>
                      <span style={{ color: 'var(--accent-blue)', fontWeight: '700' }}>{v.name}:</span>
                      <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem', fontFamily: 'SF Mono' }}>
                        {v.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Phase Legend */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <p style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          Algorithm Phases
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.25rem' }}>🔀</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Divide</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.25rem' }}>⚔️</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Conquer</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.25rem' }}>🔗</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Combine</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export const DivideConquerVisualizer = memo(DivideConquerVisualizerImpl)
