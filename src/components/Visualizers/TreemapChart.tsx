import { useState } from 'react'
import { algorithms } from '../../data/algorithms'

// Category colors - each category gets a unique rich color
const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    'Sorting': '#00d4ff',           // Vibrant Cyan
    'Searching': '#a855f7',         // Rich Violet
    'Graph': '#ff1493',             // Deep Pink
    'Tree': '#10b981',              // Emerald Green
    'Divide & Conquer': '#ff6b35'   // Vibrant Orange
  }
  return colors[category] || '#6b7280'
}

// Calculate text size requirement for an algorithm
const getTextContentValue = (algo: any): number => {
  const nameLength = algo.name.length
  const timeLength = algo.timeComplexity.length
  const spaceLength = algo.spaceComplexity.length

  // Weight: name is most important, then complexities
  // Add at least 2 as base value so all items have size
  const textSize = (nameLength * 0.15) + (timeLength * 0.08) + (spaceLength * 0.08) + 2
  return Math.max(1.5, textSize)
}

interface TreemapRect {
  x: number
  y: number
  w: number
  h: number
}

// Row-based treemap layout with improved height calculation
const computeTreemapLayout = (items: any[], width: number, height: number, isNested: boolean = false): { [key: string]: TreemapRect } => {
  const rects: { [key: string]: TreemapRect } = {}
  const totalValue = items.reduce((sum: number, item: any) => sum + item.value, 0)

  let y = 0
  let rowItems: any[] = []
  let rowValue = 0

  items.forEach((item, index) => {
    rowItems.push(item)
    rowValue += item.value

    const remainingItems = items.length - index - 1
    const remainingValue = totalValue - rowValue
    const remainingHeight = height - y

    // For nested layouts (inside category boxes), use relative minimum height
    // For top-level layout, use absolute minimum
    const minHeight = isNested ? Math.max(35, height / (items.length * 0.8)) : 75
    const rowHeight = Math.max(minHeight, (rowValue / totalValue) * height)

    const shouldFinalize =
      index === items.length - 1 ||
      (remainingValue > 0 && rowHeight > remainingHeight * 0.5)

    if (shouldFinalize) {
      let x = 0
      const actualRowHeight = Math.min(rowHeight, remainingHeight)

      rowItems.forEach((rowItem) => {
        const itemWidth = (rowItem.value / rowValue) * width
        rects[rowItem.id] = {
          x: x,
          y: y,
          w: itemWidth,
          h: actualRowHeight
        }
        x += itemWidth
      })

      y += actualRowHeight
      rowItems = []
      rowValue = 0
    }
  })

  return rects
}

// Calculate optimal font size based on box dimensions
const getOptimalFontSize = (boxWidth: number, boxHeight: number, textLength: number): number => {
  const availableWidth = boxWidth - 16 // 8px padding on each side
  const charWidth = availableWidth / textLength
  const widthBasedSize = Math.max(8, charWidth * 0.8)
  const heightBasedSize = boxHeight / 6 // Roughly 6 lines of text max
  return Math.min(widthBasedSize, heightBasedSize)
}

// Calculate if text fits in box
const getDisplayText = (
  boxWidth: number,
  boxHeight: number,
  name: string,
  timeComplexity: string,
  spaceComplexity: string
) => {
  const padding = 16
  const minHeightForName = boxHeight > 20
  const minHeightForTime = boxHeight > 28
  const minHeightForSpace = boxHeight > 35
  const minWidthForFull = boxWidth > 30

  // Truncate long names
  const truncateName = (n: string, len: number) => n.length > len ? n.substring(0, len - 1) + '…' : n
  const displayName = boxWidth < 60 ? truncateName(name, 20) : boxWidth < 90 ? truncateName(name, 25) : name

  const fontSize = getOptimalFontSize(boxWidth, boxHeight, Math.max(displayName.length, timeComplexity.length))

  return {
    showName: minHeightForName && minWidthForFull,
    showTime: minHeightForTime && minWidthForFull,
    showSpace: minHeightForSpace && minWidthForFull,
    displayName: displayName,
    fontSize: fontSize
  }
}

export function TreemapChart() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  // Group algorithms by category and calculate category sizes
  const categories = algorithms.reduce((acc, algo) => {
    const existing = acc.find(cat => cat.name === algo.category)
    if (existing) {
      existing.algorithms.push(algo)
    } else {
      acc.push({
        id: algo.category.toLowerCase().replace(/ /g, '-'),
        name: algo.category,
        algorithms: [algo],
        value: 0,
        color: getCategoryColor(algo.category)
      })
    }
    return acc
  }, [] as any[])

  // Set category values based on text content of algorithms
  categories.forEach(cat => {
    cat.value = cat.algorithms.reduce((sum: number, algo: any) => sum + getTextContentValue(algo), 0)
  })

  const width = 1200
  const height = 700

  // Layout categories
  const categoryRects = computeTreemapLayout(categories, width, height)

  // For each category, layout its algorithms
  const algorithmRects: { [algoId: string]: TreemapRect & { categoryId: string; categoryColor: string } } = {}
  categories.forEach(category => {
    const categoryRect = categoryRects[category.id]
    if (!categoryRect) return

    // Layout algorithms within this category using text content as value
    const algoRects = computeTreemapLayout(
      category.algorithms.map((algo: any) => ({
        ...algo,
        value: getTextContentValue(algo)
      })),
      categoryRect.w,
      categoryRect.h,
      true // isNested - use relative sizing for nested items
    )

    // Offset algo positions by category position
    Object.entries(algoRects).forEach(([algoId, algoRect]) => {
      algorithmRects[algoId] = {
        x: algoRect.x + categoryRect.x,
        y: algoRect.y + categoryRect.y,
        w: algoRect.w,
        h: algoRect.h,
        categoryId: category.id,
        categoryColor: category.color
      }
    })
  })

  const isHovered = (algoId: string) => hoveredId === algoId

  return (
    <div style={{
      backgroundColor: '#0f172a',
      borderRadius: '12px',
      padding: '24px',
      border: '1px solid #1e293b'
    }}>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '16px',
        color: '#f1f5f9'
      }}>
        🗺️ Algorithm Treemap (Finviz Style)
      </h2>

      {/* Legend */}
      <div style={{
        marginBottom: '20px',
        padding: '14px',
        backgroundColor: '#1e293b',
        borderRadius: '6px',
        border: '1px solid #334155'
      }}>
        <div style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '12px', color: '#cbd5e1' }}>
          Category Colors
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {categories.map(cat => (
            <div key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: cat.color, borderRadius: '3px' }}></div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{cat.name} ({cat.algorithms.length})</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: `${width}px`,
        margin: '0 auto',
        backgroundColor: '#1a2332',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <svg
          width="100%"
          height="auto"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ display: 'block', backgroundColor: '#1a2332' }}
        >
          {/* Draw category backgrounds */}
          {categories.map(category => {
            const rect = categoryRects[category.id]
            if (!rect) return null

            return (
              <g key={`cat-${category.id}`}>
                <rect
                  x={rect.x}
                  y={rect.y}
                  width={rect.w}
                  height={rect.h}
                  fill={category.color}
                  opacity="0.3"
                  stroke={category.color}
                  strokeWidth="2"
                />
                <text
                  x={rect.x + 12}
                  y={rect.y + 28}
                  fill={category.color}
                  fontSize="16"
                  fontWeight="bold"
                  style={{ pointerEvents: 'none' }}
                >
                  {category.name}
                </text>
              </g>
            )
          })}

          {/* Draw algorithm boxes */}
          {Object.entries(algorithmRects).map(([algoId, algoRect]) => {
            const algo = algorithms.find(a => a.id === algoId)
            if (!algo) return null

            const hovered = isHovered(algoId)
            const categoryColor = algoRect.categoryColor
            const textDisplay = getDisplayText(algoRect.w, algoRect.h, algo.name, algo.timeComplexity, algo.spaceComplexity)

            return (
              <g key={algoId}>
                <rect
                  x={algoRect.x}
                  y={algoRect.y}
                  width={algoRect.w}
                  height={algoRect.h}
                  fill={categoryColor}
                  opacity={hovered ? 0.85 : 0.55}
                  stroke={hovered ? categoryColor : 'rgba(255,255,255,0.1)'}
                  strokeWidth={hovered ? '2' : '1'}
                  onMouseEnter={() => setHoveredId(algoId)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => {
                    window.location.href = `/visualize/${algoId}`
                  }}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    filter: hovered ? 'brightness(1.2)' : 'brightness(1)'
                  }}
                />

                {/* Calculate text layout based on what's being shown */}
                {(() => {
                  const lineHeight = Math.max(8, textDisplay.fontSize * 0.9)
                  let yOffset = 0

                  if (textDisplay.showName && textDisplay.showTime && textDisplay.showSpace) {
                    yOffset = -lineHeight
                  } else if (textDisplay.showName && textDisplay.showTime) {
                    yOffset = -lineHeight / 2
                  } else if (textDisplay.showName) {
                    yOffset = 0
                  }

                  return (
                    <>
                      {/* Algorithm name */}
                      {textDisplay.showName && (
                        <text
                          x={algoRect.x + algoRect.w / 2}
                          y={algoRect.y + algoRect.h / 2 + yOffset}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize={Math.max(9, textDisplay.fontSize)}
                          fontWeight="bold"
                          style={{ pointerEvents: 'none', overflow: 'hidden' }}
                        >
                          {textDisplay.displayName}
                        </text>
                      )}

                      {/* Time complexity */}
                      {textDisplay.showTime && (
                        <text
                          x={algoRect.x + algoRect.w / 2}
                          y={algoRect.y + algoRect.h / 2 + yOffset + lineHeight}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize={Math.max(7, textDisplay.fontSize * 0.75)}
                          style={{ pointerEvents: 'none', overflow: 'hidden' }}
                        >
                          T: {algo.timeComplexity}
                        </text>
                      )}

                      {/* Space complexity */}
                      {textDisplay.showSpace && (
                        <text
                          x={algoRect.x + algoRect.w / 2}
                          y={algoRect.y + algoRect.h / 2 + yOffset + lineHeight * 2}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize={Math.max(7, textDisplay.fontSize * 0.75)}
                          style={{ pointerEvents: 'none', overflow: 'hidden' }}
                        >
                          S: {algo.spaceComplexity}
                        </text>
                      )}
                    </>
                  )
                })()}
              </g>
            )
          })}

          {/* Tooltip on Hover */}
          {hoveredId && algorithmRects[hoveredId] && algorithms.find(a => a.id === hoveredId) && (() => {
            const algo = algorithms.find(a => a.id === hoveredId)!
            const rect = algorithmRects[hoveredId]
            const categoryColor = rect.categoryColor

            // Position tooltip above the box or below if not enough space
            const tooltipWidth = 200
            const tooltipHeight = 110
            let tooltipX = rect.x + rect.w / 2 - tooltipWidth / 2
            let tooltipY = rect.y - tooltipHeight - 12

            // Keep tooltip within bounds
            if (tooltipX < 5) tooltipX = 5
            if (tooltipX + tooltipWidth > width - 5) tooltipX = width - tooltipWidth - 5
            if (tooltipY < 5) tooltipY = rect.y + rect.h + 12

            return (
              <g key="tooltip">
                {/* Background */}
                <rect
                  x={tooltipX}
                  y={tooltipY}
                  width={tooltipWidth}
                  height={tooltipHeight}
                  fill="#1a2332"
                  stroke={categoryColor}
                  strokeWidth="2"
                  rx="6"
                  style={{ pointerEvents: 'none' }}
                />

                {/* Algorithm name */}
                <text
                  x={tooltipX + 10}
                  y={tooltipY + 20}
                  fill={categoryColor}
                  fontSize="12"
                  fontWeight="bold"
                  style={{ pointerEvents: 'none' }}
                >
                  {algo.name}
                </text>

                {/* Category */}
                <text
                  x={tooltipX + 10}
                  y={tooltipY + 37}
                  fill="#94a3b8"
                  fontSize="9"
                  style={{ pointerEvents: 'none' }}
                >
                  📁 {algo.category}
                </text>

                {/* Time Complexity */}
                <text
                  x={tooltipX + 10}
                  y={tooltipY + 51}
                  fill="#cbd5e1"
                  fontSize="9"
                  style={{ pointerEvents: 'none' }}
                >
                  ⏱️ Time: {algo.timeComplexity}
                </text>

                {/* Space Complexity */}
                <text
                  x={tooltipX + 10}
                  y={tooltipY + 65}
                  fill="#cbd5e1"
                  fontSize="9"
                  style={{ pointerEvents: 'none' }}
                >
                  💾 Space: {algo.spaceComplexity}
                </text>

                {/* Type */}
                <text
                  x={tooltipX + 10}
                  y={tooltipY + 79}
                  fill="#94a3b8"
                  fontSize="9"
                  style={{ pointerEvents: 'none' }}
                >
                  🔷 {algo.type}
                </text>
              </g>
            )
          })()}
        </svg>
      </div>
    </div>
  )
}
