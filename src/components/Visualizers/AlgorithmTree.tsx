import { useState } from 'react'
import { algorithms } from '../../data/algorithms'

interface TreeNode {
  category: string
  types: {
    [type: string]: typeof algorithms
  }
}

export function AlgorithmTree() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Sorting']))
  const [expandedTypes, setExpandedTypes] = useState<Set<string>>(new Set())

  // Build tree structure
  const tree: TreeNode[] = []
  const categoryMap = new Map<string, TreeNode>()

  algorithms.forEach((algo) => {
    if (!categoryMap.has(algo.category)) {
      const node: TreeNode = { category: algo.category, types: {} }
      categoryMap.set(algo.category, node)
      tree.push(node)
    }
    const categoryNode = categoryMap.get(algo.category)!
    if (!categoryNode.types[algo.type]) {
      categoryNode.types[algo.type] = []
    }
    categoryNode.types[algo.type].push(algo)
  })

  tree.sort((a, b) => a.category.localeCompare(b.category))

  const toggleCategory = (category: string) => {
    const newSet = new Set(expandedCategories)
    if (newSet.has(category)) {
      newSet.delete(category)
    } else {
      newSet.add(category)
    }
    setExpandedCategories(newSet)
  }

  const toggleType = (typeKey: string) => {
    const newSet = new Set(expandedTypes)
    if (newSet.has(typeKey)) {
      newSet.delete(typeKey)
    } else {
      newSet.add(typeKey)
    }
    setExpandedTypes(newSet)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '#10b981'
      case 'intermediate':
        return '#f59e0b'
      case 'advanced':
        return '#ef4444'
      default:
        return '#6b7280'
    }
  }

  const getDifficultyBgColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '#d1fae5'
      case 'intermediate':
        return '#fef3c7'
      case 'advanced':
        return '#fee2e2'
      default:
        return '#f3f4f6'
    }
  }

  return (
    <div style={{
      backgroundColor: '#0f172a',
      borderRadius: '12px',
      padding: '28px',
      border: '1px solid #1e293b',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '28px',
        color: '#f1f5f9',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span style={{ fontSize: '1.25rem' }}>🌳</span>
        Algorithm Tree
      </h2>

      <div style={{
        maxHeight: '600px',
        overflowY: 'auto',
        paddingRight: '8px'
      }}>
        {tree.map((node) => (
          <div key={node.category} style={{ marginBottom: '16px' }}>
            {/* Category Node */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                paddingLeft: '0'
              }}
            >
              <div style={{ width: '20px', display: 'flex', justifyContent: 'center' }}>
                <span
                  style={{
                    fontSize: '16px',
                    color: '#60a5fa',
                    transform: expandedCategories.has(node.category) ? 'rotate(0deg)' : 'rotate(-90deg)',
                    transition: 'transform 0.2s',
                    cursor: 'pointer'
                  }}
                  onClick={() => toggleCategory(node.category)}
                >
                  ▶
                </span>
              </div>
              <button
                onClick={() => toggleCategory(node.category)}
                style={{
                  flex: 1,
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  border: '2px solid #3b82f6',
                  backgroundColor: '#1e3a8a',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: '#60a5fa',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#1e40af'
                  e.currentTarget.style.borderColor = '#93c5fd'
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(96, 165, 250, 0.3)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#1e3a8a'
                  e.currentTarget.style.borderColor = '#3b82f6'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <span>{node.category}</span>
                <span style={{
                  fontSize: '0.75rem',
                  padding: '4px 10px',
                  backgroundColor: '#374151',
                  borderRadius: '4px',
                  color: '#d1d5db'
                }}>
                  {Object.values(node.types).reduce((sum, algos) => sum + algos.length, 0)} algorithms
                </span>
              </button>
            </div>

            {/* Type Nodes */}
            {expandedCategories.has(node.category) && (
              <div style={{ marginLeft: '20px', marginTop: '12px' }}>
                {Object.entries(node.types).map(([type, algos]) => {
                  const typeKey = `${node.category}-${type}`
                  return (
                    <div key={type} style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', gap: '0' }}>
                        {/* Tree connector */}
                        <div style={{ width: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <div
                            style={{
                              width: '1px',
                              height: '20px',
                              backgroundColor: '#475569',
                              marginBottom: '4px'
                            }}
                          />
                          <div
                            style={{
                              width: '16px',
                              height: '1px',
                              backgroundColor: '#475569',
                              marginLeft: '0'
                            }}
                          />
                        </div>
                        {/* Type Node */}
                        <button
                          onClick={() => toggleType(typeKey)}
                          style={{
                            flex: 1,
                            textAlign: 'left',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '10px 14px',
                            border: '1px solid #8b5cf6',
                            backgroundColor: '#5b21b6',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            color: '#d8b4fe',
                            fontSize: '0.95rem',
                            fontWeight: '500',
                            transition: 'all 0.2s'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#6d28d9'
                            e.currentTarget.style.borderColor = '#c4b5fd'
                            e.currentTarget.style.boxShadow = '0 0 12px rgba(139, 92, 246, 0.3)'
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = '#5b21b6'
                            e.currentTarget.style.borderColor = '#8b5cf6'
                            e.currentTarget.style.boxShadow = 'none'
                          }}
                        >
                          <span
                            style={{
                              fontSize: '14px',
                              transform: expandedTypes.has(typeKey) ? 'rotate(0deg)' : 'rotate(-90deg)',
                              transition: 'transform 0.2s'
                            }}
                          >
                            ▶
                          </span>
                          <span>{type}</span>
                          <span style={{
                            fontSize: '0.7rem',
                            padding: '3px 8px',
                            backgroundColor: '#4c1d95',
                            borderRadius: '3px',
                            color: '#d8b4fe'
                          }}>
                            {algos.length}
                          </span>
                        </button>
                      </div>

                      {/* Algorithm Nodes */}
                      {expandedTypes.has(typeKey) && (
                        <div style={{ marginLeft: '20px', marginTop: '8px' }}>
                          {algos.map((algo) => (
                            <div
                              key={algo.id}
                              style={{
                                display: 'flex',
                                gap: '0',
                                marginBottom: '8px'
                              }}
                            >
                              {/* Tree connector */}
                              <div style={{ width: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div
                                  style={{
                                    width: '1px',
                                    height: '16px',
                                    backgroundColor: '#475569',
                                    marginBottom: '2px'
                                  }}
                                />
                                <div
                                  style={{
                                    width: '16px',
                                    height: '1px',
                                    backgroundColor: '#475569'
                                  }}
                                />
                              </div>
                              {/* Algorithm item */}
                              <a
                                href={`/visualize/${algo.id}`}
                                style={{
                                  flex: 1,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '10px',
                                  padding: '10px 12px',
                                  borderRadius: '6px',
                                  textDecoration: 'none',
                                  fontSize: '0.85rem',
                                  color: '#e2e8f0',
                                  backgroundColor: 'transparent',
                                  borderLeft: `3px solid ${getDifficultyColor(algo.difficulty)}`,
                                  cursor: 'pointer',
                                  transition: 'all 0.2s'
                                }}
                                onMouseOver={(e) => {
                                  e.currentTarget.style.backgroundColor = '#334155'
                                  e.currentTarget.style.color = '#f1f5f9'
                                  e.currentTarget.style.borderLeftColor = getDifficultyColor(algo.difficulty)
                                  e.currentTarget.style.transform = 'translateX(4px)'
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.backgroundColor = 'transparent'
                                  e.currentTarget.style.color = '#e2e8f0'
                                  e.currentTarget.style.transform = 'translateX(0)'
                                }}
                              >
                                <span style={{ fontSize: '12px', color: getDifficultyColor(algo.difficulty) }}>●</span>
                                <span style={{ fontWeight: '500' }}>{algo.name}</span>
                                <span
                                  style={{
                                    fontSize: '0.65rem',
                                    padding: '2px 8px',
                                    borderRadius: '3px',
                                    backgroundColor: getDifficultyBgColor(algo.difficulty),
                                    color: getDifficultyColor(algo.difficulty),
                                    fontWeight: '600',
                                    marginLeft: 'auto'
                                  }}
                                >
                                  {algo.difficulty.toUpperCase()}
                                </span>
                              </a>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        div::-webkit-scrollbar {
          width: 6px;
        }
        div::-webkit-scrollbar-track {
          background: #0f172a;
        }
        div::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 3px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>
    </div>
  )
}
