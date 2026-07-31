import { useState, useEffect, useRef, useCallback } from 'react'
import type { GraphNode, GraphEdge, GraphStep } from '../../data/graphAlgorithms'

interface GraphVisualizerProps {
  nodes: GraphNode[]
  edges: GraphEdge[]
  steps: GraphStep[]
  currentStepIndex: number
  algorithmName: string
  timeComplexity: string
  spaceComplexity: string
}

export function GraphVisualizer({
  nodes,
  edges,
  steps,
  currentStepIndex,
  algorithmName,
  timeComplexity,
  spaceComplexity,
}: GraphVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  // Calculate node positions in circle layout
  const getNodePositions = useCallback(() => {
    const positions: Record<string, { x: number; y: number }> = {}
    const centerX = 400
    const centerY = 300
    const radius = 150

    nodes.forEach((node, index) => {
      const angle = (index / nodes.length) * Math.PI * 2 - Math.PI / 2
      positions[node.id] = {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
      }
    })

    return positions
  }, [nodes])

  const nodePositions = getNodePositions()

  // Draw graph on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = 'rgba(5, 5, 13, 0.5)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Use step 0 if currentStepIndex is -1 (initial state)
    const stepIndex = currentStepIndex === -1 ? 0 : currentStepIndex
    const currentStep = steps[stepIndex]
    const visitedNodes = currentStep?.visitedNodes || new Set<string>()
    const currentNode = currentStep?.currentNode

    // Draw edges
    edges.forEach((edge) => {
      const from = nodePositions[edge.from]
      const to = nodePositions[edge.to]

      if (from && to) {
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(from.x, from.y)
        ctx.lineTo(to.x, to.y)
        ctx.stroke()

        // Draw arrow
        const angle = Math.atan2(to.y - from.y, to.x - from.x)
        const arrowSize = 12
        ctx.fillStyle = 'rgba(148, 163, 184, 0.4)'
        ctx.beginPath()
        ctx.moveTo(to.x, to.y)
        ctx.lineTo(to.x - arrowSize * Math.cos(angle - Math.PI / 6), to.y - arrowSize * Math.sin(angle - Math.PI / 6))
        ctx.lineTo(to.x - arrowSize * Math.cos(angle + Math.PI / 6), to.y - arrowSize * Math.sin(angle + Math.PI / 6))
        ctx.fill()

        // Draw weight if present
        if (edge.weight) {
          const midX = (from.x + to.x) / 2
          const midY = (from.y + to.y) / 2
          ctx.fillStyle = 'var(--accent-blue)'
          ctx.font = 'bold 12px SF Mono'
          ctx.textAlign = 'center'
          ctx.fillText(edge.weight.toString(), midX, midY - 10)
        }
      }
    })

    // Draw nodes
    nodes.forEach((node) => {
      const pos = nodePositions[node.id]
      if (!pos) return

      const isVisited = visitedNodes.has(node.id)
      const isCurrent = currentNode === node.id

      // Node circle
      ctx.fillStyle = isCurrent
        ? '#38bdf8'
        : isVisited
          ? '#34d399'
          : 'rgba(148, 163, 184, 0.3)'
      ctx.strokeStyle = isCurrent ? '#0ea5e9' : isVisited ? '#10b981' : 'rgba(148, 163, 184, 0.6)'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, 30, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Node label
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 16px SF Mono'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(node.label, pos.x, pos.y)
    })
  }, [nodes, edges, nodePositions, steps, currentStepIndex])

  // Use step 0 if currentStepIndex is -1 (initial state)
  const stepIndex = currentStepIndex === -1 ? 0 : currentStepIndex
  const currentStep = steps[stepIndex]
  const visitedNodes = currentStep?.visitedNodes
  const queue = currentStep?.queue
  const stack = currentStep?.stack

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Canvas */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '700' }}>
          {algorithmName} Visualization
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem' }}>
          <div style={{ position: 'relative', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '0.5rem' }}>
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              style={{ width: '100%', height: 'auto', display: 'block' }}
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

            {visitedNodes && (
              <div style={{ padding: '1rem', backgroundColor: 'rgba(52, 211, 153, 0.1)', borderRadius: '0.5rem' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                  VISITED NODES
                </p>
                <p style={{ color: 'var(--state-sorted)', fontSize: '0.9rem', fontFamily: 'SF Mono' }}>
                  {Array.from(visitedNodes).join(', ')}
                </p>
              </div>
            )}

            {queue && (
              <div style={{ padding: '1rem', backgroundColor: 'rgba(251, 191, 36, 0.1)', borderRadius: '0.5rem' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                  QUEUE
                </p>
                <p style={{ color: 'var(--state-comparing)', fontSize: '0.9rem', fontFamily: 'SF Mono' }}>
                  [{queue.join(', ')}]
                </p>
              </div>
            )}

            {stack && (
              <div style={{ padding: '1rem', backgroundColor: 'rgba(251, 113, 133, 0.1)', borderRadius: '0.5rem' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                  STACK
                </p>
                <p style={{ color: 'var(--state-swapping)', fontSize: '0.9rem', fontFamily: 'SF Mono' }}>
                  [{stack.join(', ')}]
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Step Info */}
      {currentStep && (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h4 style={{ marginBottom: '0.75rem', fontWeight: '700', color: 'var(--accent-blue)' }}>
            Step {currentStepIndex + 1}
          </h4>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            {currentStep.variables?.map((v) => (
              <div key={v.name}>
                <strong>{v.name}:</strong> {v.value}
              </div>
            ))}
          </p>
        </div>
      )}
    </div>
  )
}
