import { memo } from 'react'
import type { StepVariable } from '../../data/algorithms.ts'

interface CodeVariablesPanelProps {
  pseudocode: string[]
  activeLine?: number
  variables?: StepVariable[]
}

function CodeVariablesPanelImpl({ pseudocode, activeLine, variables }: CodeVariablesPanelProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '100%' }}>
      {/* Pseudocode */}
      <div className="glass-panel" style={{ padding: '1.25rem' }}>
        <h3 style={{
          fontSize: '0.875rem',
          fontWeight: '800',
          color: 'var(--text-secondary)',
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}>
          Code
        </h3>

        <pre style={{
          margin: 0,
          fontFamily: 'SF Mono, Monaco, monospace',
          fontSize: '0.78rem',
          lineHeight: '1.7',
        }}>
          {pseudocode.map((line, i) => {
            const isActive = i === activeLine
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '0.3rem',
                  background: isActive ? 'rgba(52, 211, 153, 0.14)' : 'transparent',
                  boxShadow: isActive ? 'inset 2px 0 0 var(--state-sorted)' : 'none',
                }}
              >
                <span style={{
                  color: isActive ? 'var(--state-sorted)' : 'var(--text-muted)',
                  userSelect: 'none',
                  minWidth: '1.25rem',
                  textAlign: 'right',
                  flexShrink: 0,
                  fontWeight: isActive ? 700 : 400,
                }}>
                  {i + 1}
                </span>
                <span style={{
                  color: isActive ? 'var(--state-sorted)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 700 : 400,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}>
                  {line}
                </span>
              </div>
            )
          })}
        </pre>
      </div>

      {/* Variables */}
      <div className="glass-panel" style={{ padding: '1.25rem' }}>
        <h3 style={{
          fontSize: '0.875rem',
          fontWeight: '800',
          color: 'var(--text-secondary)',
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}>
          Variables
        </h3>

        {variables && variables.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {variables.map((v) => (
              <div
                key={v.name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.45rem 0.65rem',
                  borderRadius: '0.4rem',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <span style={{
                  fontFamily: 'SF Mono, Monaco, monospace',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: v.isIndex ? 'var(--accent-blue)' : 'var(--accent-purple)',
                }}>
                  {v.name}
                </span>
                <span style={{
                  fontFamily: 'SF Mono, Monaco, monospace',
                  fontSize: '0.8rem',
                  color: 'var(--text-primary)',
                }}>
                  {v.value}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
            Play or step through the algorithm to see live variable values.
          </p>
        )}
      </div>
    </div>
  )
}

export const CodeVariablesPanel = memo(CodeVariablesPanelImpl)
