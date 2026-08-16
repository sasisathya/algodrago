import { useState } from 'react'
import { algorithms } from '../../data/algorithms'

interface AlgoCard {
  id: string
  name: string
  difficulty: string
  timeComplexity: string
  spaceComplexity: string
  category: string
  type: string
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return { bg: '#d1fae5', text: '#065f46', border: '#10b981' }
    case 'intermediate':
      return { bg: '#fef3c7', text: '#92400e', border: '#f59e0b' }
    case 'advanced':
      return { bg: '#fee2e2', text: '#7f1d1d', border: '#ef4444' }
    default:
      return { bg: '#f3f4f6', text: '#374151', border: '#6b7280' }
  }
}

const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    'Sorting': '📊',
    'Searching': '🔍',
    'Graph': '🕸️',
    'Tree': '🌲',
    'Divide & Conquer': '⚔️'
  }
  return icons[category] || '📌'
}

export function MarketView() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  // Build categories
  const categoryMap = new Map<string, AlgoCard[]>()
  algorithms.forEach(algo => {
    if (!categoryMap.has(algo.category)) {
      categoryMap.set(algo.category, [])
    }
    categoryMap.get(algo.category)!.push({
      id: algo.id,
      name: algo.name,
      difficulty: algo.difficulty,
      timeComplexity: algo.timeComplexity,
      spaceComplexity: algo.spaceComplexity,
      category: algo.category,
      type: algo.type
    })
  })

  const categories = Array.from(categoryMap.keys()).sort()

  let displayedAlgos: AlgoCard[] = []
  if (activeCategory === 'all') {
    displayedAlgos = algorithms.map(algo => ({
      id: algo.id,
      name: algo.name,
      difficulty: algo.difficulty,
      timeComplexity: algo.timeComplexity,
      spaceComplexity: algo.spaceComplexity,
      category: algo.category,
      type: algo.type
    }))
  } else {
    displayedAlgos = categoryMap.get(activeCategory) || []
  }

  return (
    <div style={{
      backgroundColor: '#0f172a',
      borderRadius: '12px',
      padding: '28px',
      border: '1px solid #1e293b',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '8px',
          color: '#f1f5f9',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '1.5rem' }}>📈</span>
          Algorithm Market
        </h2>
        <p style={{
          color: '#94a3b8',
          fontSize: '0.875rem'
        }}>
          Explore DSA algorithms by category • Future: Add Patterns, Problems & More
        </p>
      </div>

      {/* Category Tabs */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '28px',
        overflowX: 'auto',
        paddingBottom: '8px',
        borderBottom: '2px solid #1e293b'
      }}>
        <button
          onClick={() => setActiveCategory('all')}
          style={{
            padding: '10px 18px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: activeCategory === 'all' ? '#3b82f6' : 'transparent',
            color: activeCategory === 'all' ? '#fff' : '#94a3b8',
            cursor: 'pointer',
            fontSize: '0.95rem',
            fontWeight: activeCategory === 'all' ? '600' : '500',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
            borderBottom: activeCategory === 'all' ? '2px solid #60a5fa' : '2px solid transparent'
          }}
          onMouseOver={(e) => {
            if (activeCategory !== 'all') {
              e.currentTarget.style.color = '#cbd5e1'
              e.currentTarget.style.backgroundColor = '#1e293b'
            }
          }}
          onMouseOut={(e) => {
            if (activeCategory !== 'all') {
              e.currentTarget.style.color = '#94a3b8'
              e.currentTarget.style.backgroundColor = 'transparent'
            }
          }}
        >
          📌 All ({algorithms.length})
        </button>

        {categories.map(category => {
          const count = categoryMap.get(category)?.length || 0
          const isActive = activeCategory === category
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              style={{
                padding: '10px 18px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: isActive ? '#8b5cf6' : 'transparent',
                color: isActive ? '#fff' : '#94a3b8',
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: isActive ? '600' : '500',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                borderBottom: isActive ? '2px solid #d8b4fe' : '2px solid transparent'
              }}
              onMouseOver={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#cbd5e1'
                  e.currentTarget.style.backgroundColor = '#1e293b'
                }
              }}
              onMouseOut={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#94a3b8'
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              {getCategoryIcon(category)} {category} ({count})
            </button>
          )
        })}
      </div>

      {/* Algorithms Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '16px'
      }}>
        {displayedAlgos.map(algo => {
          const difficultyColor = getDifficultyColor(algo.difficulty)
          const isHovered = hoveredId === algo.id

          return (
            <div
              key={algo.id}
              onMouseEnter={() => setHoveredId(algo.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => {
                window.location.href = `/visualize/${algo.id}?from=market`
              }}
              style={{
                padding: '18px',
                backgroundColor: '#1e293b',
                borderRadius: '10px',
                border: `2px solid ${isHovered ? difficultyColor.border : '#334155'}`,
                cursor: 'pointer',
                transition: 'all 0.2s',
                transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: isHovered ? `0 12px 24px rgba(0, 0, 0, 0.4), 0 0 16px ${difficultyColor.border}40` : 'none'
              }}
            >
              {/* Header with Name and Badge */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '12px'
              }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    color: '#f1f5f9',
                    marginBottom: '4px'
                  }}>
                    {algo.name}
                  </h3>
                  <p style={{
                    fontSize: '0.75rem',
                    color: '#64748b'
                  }}>
                    {algo.type}
                  </p>
                </div>

                {/* Difficulty Badge */}
                <div style={{
                  padding: '6px 12px',
                  backgroundColor: difficultyColor.bg,
                  color: difficultyColor.text,
                  borderRadius: '6px',
                  fontSize: '0.7rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  marginLeft: '8px',
                  border: `1px solid ${difficultyColor.border}`
                }}>
                  {algo.difficulty}
                </div>
              </div>

              {/* Complexity Info - Stock Market Style */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                padding: '12px',
                backgroundColor: '#0f172a',
                borderRadius: '8px',
                marginBottom: '12px'
              }}>
                {/* Time Complexity */}
                <div>
                  <div style={{
                    fontSize: '0.65rem',
                    color: '#64748b',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    marginBottom: '4px'
                  }}>
                    ⏱️ Time
                  </div>
                  <div style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: '#60a5fa',
                    fontFamily: 'monospace'
                  }}>
                    {algo.timeComplexity}
                  </div>
                </div>

                {/* Space Complexity */}
                <div>
                  <div style={{
                    fontSize: '0.65rem',
                    color: '#64748b',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    marginBottom: '4px'
                  }}>
                    💾 Space
                  </div>
                  <div style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: '#a78bfa',
                    fontFamily: 'monospace'
                  }}>
                    {algo.spaceComplexity}
                  </div>
                </div>
              </div>

              {/* Category Tag */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                backgroundColor: 'rgba(139, 92, 246, 0.15)',
                borderRadius: '6px',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                fontSize: '0.8rem',
                color: '#d8b4fe'
              }}>
                <span>{getCategoryIcon(algo.category)}</span>
                <span>{algo.category}</span>
              </div>

              {/* Hover CTA */}
              {isHovered && (
                <div style={{
                  marginTop: '12px',
                  padding: '8px 12px',
                  backgroundColor: difficultyColor.bg,
                  color: difficultyColor.text,
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textAlign: 'center',
                  animation: 'fadeIn 0.2s ease-in'
                }}>
                  → View Visualization
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Stats Footer */}
      <div style={{
        marginTop: '32px',
        padding: '16px',
        backgroundColor: '#1e293b',
        borderRadius: '10px',
        border: '1px solid #334155',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '16px'
      }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>
            Total Algorithms
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#f1f5f9' }}>
            {algorithms.length}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>
            Categories
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#f1f5f9' }}>
            {categories.length}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>
            Difficulty Levels
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#f1f5f9' }}>
            3
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>
            Coming Soon
          </div>
          <div style={{ fontSize: '1rem', fontWeight: '600', color: '#a78bfa' }}>
            Patterns, Problems
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
