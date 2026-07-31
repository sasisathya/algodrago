import { useEffect, useRef } from 'react'
import type { RecursionNode, CallStackEntry } from '../../data/divideConquerAlgorithms'

interface RecursionTreeVisualizerProps {
  recursionTree?: RecursionNode
  callStack?: CallStackEntry[]
  algorithmName: string
  timeComplexity: string
  spaceComplexity: string
  subproblemsSolved?: number
  totalSubproblems?: number
  currentStepIndex?: number
}

export function RecursionTreeVisualizer({
  recursionTree,
  callStack,
  algorithmName,
  timeComplexity,
  spaceComplexity,
  subproblemsSolved,
  totalSubproblems,
  currentStepIndex,
}: RecursionTreeVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !recursionTree) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = 'rgba(5, 5, 13, 0.5)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Calculate positions for all nodes using improved layout algorithm
    const getTreeWidth = (node: RecursionNode, depth: number = 0): number => {
      if (node.children.length === 0) return 120
      const childrenWidth = node.children.reduce((sum, child) => sum + getTreeWidth(child, depth + 1), 0)
      return Math.max(120, childrenWidth + 60)
    }

    const calculatePositions = (
      node: RecursionNode,
      x: number,
      y: number,
      positions: Map<string, { x: number; y: number }>
    ) => {
      positions.set(node.id, { x, y })

      const verticalGap = 140

      if (node.children.length > 0) {
        const childrenWidth = node.children.reduce((sum, child) => sum + getTreeWidth(child), 0)
        const horizontalGap = Math.max(150, (childrenWidth + 100) / node.children.length)

        let currentX = x - ((node.children.length - 1) * horizontalGap) / 2

        node.children.forEach((child) => {
          calculatePositions(child, currentX, y + verticalGap, positions)
          currentX += horizontalGap
        })
      }
    }

    const positions = new Map<string, { x: number; y: number }>()
    calculatePositions(recursionTree, canvas.width / 2, 80, positions)

    // Draw edges first
    const drawEdges = (node: RecursionNode) => {
      const nodePos = positions.get(node.id)
      if (!nodePos) return

      node.children.forEach((child) => {
        const childPos = positions.get(child.id)
        if (childPos) {
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)'
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(nodePos.x, nodePos.y)
          ctx.lineTo(childPos.x, childPos.y)
          ctx.stroke()
        }
        drawEdges(child)
      })
    }

    drawEdges(recursionTree)

    // Draw nodes
    const drawNodes = (node: RecursionNode) => {
      const pos = positions.get(node.id)
      if (!pos) return

      // Determine color based on status
      let fillColor = 'rgba(148, 163, 184, 0.3)'
      let strokeColor = 'rgba(148, 163, 184, 0.6)'

      if (node.status === 'completed') {
        fillColor = '#34d399'
        strokeColor = '#10b981'
      } else if (node.status === 'memoized') {
        fillColor = 'rgba(168, 85, 247, 0.3)'
        strokeColor = 'rgba(168, 85, 247, 0.6)'
      } else if (node.status === 'conquering') {
        fillColor = '#38bdf8'
        strokeColor = '#0ea5e9'
      } else if (node.status === 'dividing') {
        fillColor = '#fbbf24'
        strokeColor = '#f59e0b'
      }

      // Node circle
      const nodeRadius = 50
      ctx.fillStyle = fillColor
      ctx.strokeStyle = strokeColor
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, nodeRadius, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Node label
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 16px SF Mono'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // Split label if too long
      const lines = node.label.split('(')
      if (lines.length > 1) {
        ctx.fillText(lines[0] + '(', pos.x, pos.y - 12)
        ctx.font = 'bold 15px SF Mono'
        ctx.fillText(lines[1], pos.x, pos.y + 12)
      } else {
        ctx.fillText(node.label, pos.x, pos.y - 5)
      }

      // Memoized indicator
      if (node.status === 'memoized') {
        ctx.fillStyle = '#a855f7'
        ctx.font = 'bold 12px SF Mono'
        ctx.fillText('memo', pos.x, pos.y + 28)
      }

      // Draw child nodes
      node.children.forEach((child) => drawNodes(child))
    }

    drawNodes(recursionTree)
  }, [recursionTree, currentStepIndex, callStack])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Canvas */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '700' }}>
          {algorithmName} - Recursion Tree
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1.5rem' }}>
          <div style={{ position: 'relative', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '0.5rem' }}>
            <canvas
              ref={canvasRef}
              width={1400}
              height={900}
              style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '90vh' }}
            />
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '200px' }}>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(56, 189, 248, 0.1)', borderRadius: '0.5rem' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                TIME COMPLEXITY
              </p>
              <p style={{ color: 'var(--accent-blue)', fontSize: '1rem', fontWeight: '700' }}>
                {timeComplexity}
              </p>
            </div>

            <div style={{ padding: '1rem', backgroundColor: 'rgba(168, 85, 247, 0.1)', borderRadius: '0.5rem' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                SPACE COMPLEXITY
              </p>
              <p style={{ color: 'var(--accent-purple)', fontSize: '1rem', fontWeight: '700' }}>
                {spaceComplexity}
              </p>
            </div>

            {subproblemsSolved !== undefined && totalSubproblems !== undefined && (
              <div style={{ padding: '1rem', backgroundColor: 'rgba(52, 211, 153, 0.1)', borderRadius: '0.5rem' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                  SUBPROBLEMS SOLVED
                </p>
                <p style={{ color: 'var(--state-sorted)', fontSize: '1rem', fontWeight: '700' }}>
                  {subproblemsSolved} / {totalSubproblems}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Call Stack Panel */}
      {callStack && callStack.length > 0 && (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '700' }}>
            Call Stack
          </h3>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column-reverse',
              gap: '0.5rem',
              maxHeight: '200px',
              overflowY: 'auto',
              fontFamily: 'SF Mono',
              fontSize: '0.9rem',
            }}
          >
            {callStack.map((entry, index) => (
              <div
                key={index}
                style={{
                  padding: '0.75rem',
                  backgroundColor: index === 0 ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '0.375rem',
                  borderLeft: `3px solid ${index === 0 ? '#0ea5e9' : '#64748b'}`,
                  paddingLeft: `${1 + entry.depth * 0.5}rem`,
                }}
              >
                <div style={{ color: 'var(--accent-blue)', fontWeight: '700' }}>
                  {entry.functionName}
                </div>
                {entry.parameters && (
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                    {entry.parameters}
                  </div>
                )}
                {entry.returnValue && (
                  <div style={{ color: 'var(--state-sorted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                    → {entry.returnValue}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <p style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          Node States
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'rgba(148, 163, 184, 0.3)',
                border: '2px solid rgba(148, 163, 184, 0.6)',
              }}
            />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Pending</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: '#fbbf24',
                border: '2px solid #f59e0b',
              }}
            />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Dividing</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: '#38bdf8',
                border: '2px solid #0ea5e9',
              }}
            />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Conquering</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: '#34d399',
                border: '2px solid #10b981',
              }}
            />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Completed</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'rgba(168, 85, 247, 0.3)',
                border: '2px solid rgba(168, 85, 247, 0.6)',
              }}
            />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Memoized</span>
          </div>
        </div>
      </div>
    </div>
  )
}
