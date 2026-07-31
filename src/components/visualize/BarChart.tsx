import { memo, useMemo } from 'react'
import type { StepVariable } from '../../data/algorithms.ts'

interface BarChartProps {
  array: number[]
  comparingIndices: number[]
  swappingIndices: number[]
  sortedIndices: number[]
  algorithmName: string
  timeComplexity: string
  spaceComplexity: string
  initialArray: number[]
  variables?: StepVariable[]
  targetValue?: number
  currentStepIndex?: number
}

function BarChartImpl({
  array,
  comparingIndices,
  swappingIndices,
  sortedIndices,
  algorithmName,
  timeComplexity,
  spaceComplexity,
  initialArray,
  variables,
  targetValue,
  currentStepIndex = -1,
}: BarChartProps) {
  // Display current array as initial when no steps have been taken
  const displayInitialArray = currentStepIndex === -1 ? array : initialArray
  // Sets give O(1) membership checks instead of Array.includes() (O(n)) per bar
  const comparingSet = useMemo(() => new Set(comparingIndices), [comparingIndices])
  const swappingSet = useMemo(() => new Set(swappingIndices), [swappingIndices])
  const sortedSet = useMemo(() => new Set(sortedIndices), [sortedIndices])

  // Maps array index -> pointer variable names (e.g. "i", "j") currently at that index
  const pointersByIndex = useMemo(() => {
    const map = new Map<number, string[]>()
    for (const v of variables ?? []) {
      if (v.isIndex && v.value >= 0 && v.value < array.length) {
        const names = map.get(v.value) ?? []
        names.push(v.name)
        map.set(v.value, names)
      }
    }
    return map
  }, [variables, array.length])

  const maxValue = useMemo(() => Math.max(...array), [array])

  const tickCount = 5
  const yAxisTicks = useMemo(
    () => Array.from({ length: tickCount }, (_, i) => Math.round((maxValue * i) / (tickCount - 1))),
    [maxValue]
  )

  // Thin out labels as the array grows so they don't overlap in narrow bar columns
  const xLabelStep = useMemo(() => Math.max(1, Math.ceil(array.length / 15)), [array.length])
  const showBarValues = array.length <= 20

  const getBarClass = (index: number) => {
    if (sortedSet.has(index)) return 'bar bar-sorted'
    if (swappingSet.has(index)) return 'bar bar-swapping'
    if (comparingSet.has(index)) return 'bar bar-comparing'
    return 'bar bar-unsorted'
  }

  return (
    <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: 'fit-content' }}>
      {/* Top info row: Initial Array + Complexity + Target */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: targetValue !== undefined ? '1fr auto auto auto' : '1fr auto auto',
        gap: '1.5rem',
        alignItems: 'start',
        marginBottom: '1.5rem',
        paddingBottom: '1.25rem',
        borderBottom: '1px solid var(--border-subtle)',
        flexShrink: 0,
      }}>
        <div style={{ minWidth: 0 }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
            Initial Array
          </p>
          <p style={{ color: 'var(--accent-blue)', fontSize: '0.82rem', fontFamily: 'SF Mono, Monaco, monospace', wordBreak: 'break-word' }}>
            {displayInitialArray.join(' • ')}
          </p>
        </div>

        {targetValue !== undefined && (
          <div style={{ textAlign: 'right' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
              Target
            </p>
            <p style={{ color: 'var(--state-sorted)', fontSize: '0.85rem', fontFamily: 'SF Mono, Monaco, monospace', fontWeight: 700 }}>
              {targetValue}
            </p>
          </div>
        )}

        <div style={{ textAlign: 'right' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
            Time
          </p>
          <p style={{ color: 'var(--accent-blue)', fontSize: '0.85rem', fontFamily: 'SF Mono, Monaco, monospace', fontWeight: 700 }}>
            {timeComplexity}
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
            Space
          </p>
          <p style={{ color: 'var(--accent-purple)', fontSize: '0.85rem', fontFamily: 'SF Mono, Monaco, monospace', fontWeight: 700 }}>
            {spaceComplexity}
          </p>
        </div>
      </div>

      {/* Chart title */}
      <div style={{ marginBottom: '1rem', flexShrink: 0 }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.2rem' }}>
          {algorithmName} Visualization
        </h3>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {array.length} elements · max value {maxValue}
        </p>
      </div>

      {/* Bar Chart with Y-axis + gridlines */}
      <div style={{ display: 'flex', gap: '0.75rem', minHeight: '280px' }}>
        {/* Y-axis labels */}
        <div style={{
          width: '2.25rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          textAlign: 'right',
          flexShrink: 0,
        }}>
          {[...yAxisTicks].reverse().map((t, idx) => (
            <span key={idx} className="chart-ylabel">{t}</span>
          ))}
        </div>

        {/* Plot area */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>
            {/* Gridlines */}
            {yAxisTicks.map((t, idx) => (
              <div
                key={idx}
                className="chart-gridline"
                style={{ bottom: `${maxValue === 0 ? 0 : (t / maxValue) * 100}%` }}
              ></div>
            ))}

            {/* Bars */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              gap: '0.2rem',
            }}>
              {array.map((num, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    minWidth: '0',
                    maxWidth: '36px',
                  }}
                >
                  {/* Fixed-height label slot so it never eats into the bar's own height budget */}
                  {showBarValues && (
                    <div style={{
                      flexShrink: 0,
                      height: '1rem',
                      lineHeight: '1rem',
                      marginBottom: '0.25rem',
                      color: 'var(--text-secondary)',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      whiteSpace: 'nowrap',
                    }}>
                      {num}
                    </div>
                  )}

                  {/* Track fills remaining height; bar is sized relative to the track, not the whole column */}
                  <div style={{ flex: 1, minHeight: 0, width: '100%', position: 'relative' }}>
                    <div
                      className={getBarClass(i)}
                      title={`${num}`}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: `${(num / maxValue) * 100}%`,
                        minHeight: '16px',
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* X-axis labels */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '0.5rem',
            marginTop: '0.5rem',
            flexShrink: 0,
            gap: '0.2rem',
          }}>
            {array.map((_, i) => (
              <div key={i} style={{
                flex: 1,
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontSize: '0.68rem',
                maxWidth: '36px',
                minWidth: 0,
                overflow: 'visible',
                whiteSpace: 'nowrap',
                position: 'relative',
                zIndex: 1,
              }}>
                {(() => {
                  const isLast = i === array.length - 1
                  // Skip a regular step label if it's too close to the always-shown last index
                  const isStep = i % xLabelStep === 0 && (array.length - 1 - i) >= xLabelStep
                  return (isLast || isStep) ? i : ''
                })()}

                {pointersByIndex.has(i) && (
                  <div style={{
                    position: 'absolute',
                    top: '-1.4rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '0.15rem',
                    justifyContent: 'center',
                  }}>
                    {pointersByIndex.get(i)!.map((name) => (
                      <span
                        key={name}
                        style={{
                          fontFamily: 'SF Mono, Monaco, monospace',
                          fontSize: '0.62rem',
                          fontWeight: 700,
                          color: '#0b1220',
                          background: 'var(--accent-blue)',
                          borderRadius: '0.25rem',
                          padding: '0.05rem 0.3rem',
                          lineHeight: 1.4,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const BarChart = memo(BarChartImpl)
