import { useMemo } from 'react'
import { algorithms } from '../../data/algorithms'

interface ComplexityCount {
  complexity: string
  count: number
  percentage: number
}

interface TypeCount {
  type: string
  count: number
  percentage: number
  color: string
}

export function MetricsCharts() {
  const metrics = useMemo(() => {
    const timeComplexityMap = new Map<string, number>()
    const spaceComplexityMap = new Map<string, number>()
    const typeMap = new Map<string, number>()

    algorithms.forEach((algo) => {
      timeComplexityMap.set(
        algo.timeComplexity,
        (timeComplexityMap.get(algo.timeComplexity) || 0) + 1
      )
      spaceComplexityMap.set(
        algo.spaceComplexity,
        (spaceComplexityMap.get(algo.spaceComplexity) || 0) + 1
      )
      typeMap.set(algo.type, (typeMap.get(algo.type) || 0) + 1)
    })

    const timeComplexities: ComplexityCount[] = Array.from(timeComplexityMap.entries())
      .map(([complexity, count]) => ({
        complexity,
        count,
        percentage: (count / algorithms.length) * 100,
      }))
      .sort((a, b) => b.count - a.count)

    const spaceComplexities: ComplexityCount[] = Array.from(spaceComplexityMap.entries())
      .map(([complexity, count]) => ({
        complexity,
        count,
        percentage: (count / algorithms.length) * 100,
      }))
      .sort((a, b) => b.count - a.count)

    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#6366f1']
    const types: TypeCount[] = Array.from(typeMap.entries())
      .map(([type, count], index) => ({
        type,
        count,
        percentage: (count / algorithms.length) * 100,
        color: colors[index % colors.length],
      }))
      .sort((a, b) => b.count - a.count)

    return { timeComplexities, spaceComplexities, types }
  }, [])

  const ComplexityBar = ({ label, count, percentage }: { label: string; count: number; percentage: number }) => (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#d1d5db' }}>{label}</span>
        <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
          {count} ({percentage.toFixed(1)}%)
        </span>
      </div>
      <div style={{ width: '100%', backgroundColor: '#4b5563', borderRadius: '9999px', height: '8px', overflow: 'hidden' }}>
        <div
          style={{
            background: 'linear-gradient(to right, #3b82f6, #06b6d4)',
            height: '100%',
            borderRadius: '9999px',
            width: `${percentage}%`,
            transition: 'all 0.3s ease'
          }}
        />
      </div>
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Time Complexity Distribution */}
      <div style={{ backgroundColor: '#1f2937', borderRadius: '8px', padding: '24px', border: '1px solid #374151' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>⏱️ Time Complexity Distribution</h3>
        <div>
          {metrics.timeComplexities.map((item) => (
            <ComplexityBar
              key={item.complexity}
              label={item.complexity}
              count={item.count}
              percentage={item.percentage}
            />
          ))}
        </div>
      </div>

      {/* Space Complexity Distribution */}
      <div style={{ backgroundColor: '#1f2937', borderRadius: '8px', padding: '24px', border: '1px solid #374151' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>💾 Space Complexity Distribution</h3>
        <div>
          {metrics.spaceComplexities.map((item) => (
            <ComplexityBar
              key={item.complexity}
              label={item.complexity}
              count={item.count}
              percentage={item.percentage}
            />
          ))}
        </div>
      </div>

      {/* Type Distribution */}
      <div style={{ backgroundColor: '#1f2937', borderRadius: '8px', padding: '24px', border: '1px solid #374151' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>📊 Data Structure Types</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {metrics.types.map((typeItem) => (
            <div
              key={typeItem.type}
              style={{
                backgroundColor: '#374151',
                borderRadius: '8px',
                padding: '16px',
                borderLeft: `4px solid ${typeItem.color}`,
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: '600', color: 'white' }}>{typeItem.type}</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: typeItem.color }}>
                  {typeItem.count}
                </span>
              </div>
              <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '12px' }}>
                {typeItem.percentage.toFixed(1)}% of total
              </div>
              <div style={{ height: '6px', backgroundColor: '#4b5563', borderRadius: '9999px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    borderRadius: '9999px',
                    width: `${typeItem.percentage}%`,
                    backgroundColor: typeItem.color,
                    transition: 'all 0.3s ease'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div style={{ backgroundColor: '#1f2937', borderRadius: '8px', padding: '24px', border: '1px solid #374151' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>📈 Summary Statistics</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
          <div style={{ background: 'linear-gradient(135deg, #2563eb, #1e40af)', borderRadius: '8px', padding: '16px' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'white' }}>{algorithms.length}</div>
            <div style={{ fontSize: '0.875rem', color: '#93c5fd' }}>Total Algorithms</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', borderRadius: '8px', padding: '16px' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'white' }}>{metrics.timeComplexities.length}</div>
            <div style={{ fontSize: '0.875rem', color: '#d8b4fe' }}>Time Complexities</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #ec4899, #be185d)', borderRadius: '8px', padding: '16px' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'white' }}>{metrics.spaceComplexities.length}</div>
            <div style={{ fontSize: '0.875rem', color: '#fbcfe8' }}>Space Complexities</div>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #10b981, #047857)', borderRadius: '8px', padding: '16px' }}>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'white' }}>{metrics.types.length}</div>
            <div style={{ fontSize: '0.875rem', color: '#a7f3d0' }}>Data Structure Types</div>
          </div>
        </div>
      </div>
    </div>
  )
}
