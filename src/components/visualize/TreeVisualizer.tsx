import { useEffect, useRef } from 'react'
import type { TreeNode, TreeStep } from '../../data/treeAlgorithms'

interface TreeVisualizerProps {
  steps: TreeStep[]
  currentStepIndex: number
  algorithmName: string
  timeComplexity: string
  spaceComplexity: string
}

export function TreeVisualizer({
  steps,
  currentStepIndex,
  algorithmName,
  timeComplexity,
  spaceComplexity,
}: TreeVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Draw tree recursively with proper positioning
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
    if (!currentStep?.tree) return

    const highlightedNode = currentStep.highlightedNode
    const traversalOrder = currentStep.traversalOrder || []

    interface TreeDrawNode extends TreeNode {
      x?: number
      y?: number
    }

    // Calculate positions for all nodes
    const calculatePositions = (
      node: TreeNode | undefined,
      x: number,
      y: number,
      offset: number,
      positions: Map<string, { x: number; y: number }>
    ) => {
      if (!node) return

      positions.set(node.id, { x, y })

      const verticalGap = 120
      const nextOffset = offset / 2

      if (node.left) {
        calculatePositions(node.left, x - offset, y + verticalGap, nextOffset, positions)
      }
      if (node.right) {
        calculatePositions(node.right, x + offset, y + verticalGap, nextOffset, positions)
      }
    }

    const positions = new Map<string, { x: number; y: number }>()
    calculatePositions(currentStep.tree, canvas.width / 2, canvas.height / 2 - 150, 150, positions)

    // Draw edges first
    const drawEdges = (node: TreeNode | undefined) => {
      if (!node) return

      const nodePos = positions.get(node.id)
      if (!nodePos) return

      if (node.left) {
        const leftPos = positions.get(node.left.id)
        if (leftPos) {
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)'
          ctx.lineWidth = 3
          ctx.beginPath()
          ctx.moveTo(nodePos.x, nodePos.y)
          ctx.lineTo(leftPos.x, leftPos.y)
          ctx.stroke()
        }
        drawEdges(node.left)
      }

      if (node.right) {
        const rightPos = positions.get(node.right.id)
        if (rightPos) {
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)'
          ctx.lineWidth = 3
          ctx.beginPath()
          ctx.moveTo(nodePos.x, nodePos.y)
          ctx.lineTo(rightPos.x, rightPos.y)
          ctx.stroke()
        }
        drawEdges(node.right)
      }
    }

    drawEdges(currentStep.tree)

    // Draw nodes
    const drawNodes = (node: TreeNode | undefined) => {
      if (!node) return

      const pos = positions.get(node.id)
      if (!pos) return

      const isHighlighted = node.id === highlightedNode
      const isInTraversal = traversalOrder.includes(node.value.toString())
      const traversalIndex = traversalOrder.indexOf(node.value.toString())

      // Node circle
      ctx.fillStyle = isHighlighted ? '#38bdf8' : isInTraversal ? '#34d399' : 'rgba(148, 163, 184, 0.3)'
      ctx.strokeStyle = isHighlighted ? '#0ea5e9' : isInTraversal ? '#10b981' : 'rgba(148, 163, 184, 0.6)'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, 45, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Node value
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 18px SF Mono'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(node.value.toString(), pos.x, pos.y)

      // Traversal order badge
      if (isInTraversal && traversalIndex >= 0) {
        ctx.fillStyle = '#34d399'
        ctx.fillRect(pos.x + 20, pos.y - 30, 22, 22)
        ctx.fillStyle = '#05050d'
        ctx.font = 'bold 12px SF Mono'
        ctx.fillText((traversalIndex + 1).toString(), pos.x + 31, pos.y - 19)
      }

      drawNodes(node.left)
      drawNodes(node.right)
    }

    drawNodes(currentStep.tree)
  }, [steps, currentStepIndex])

  // Use step 0 if currentStepIndex is -1 (initial state)
  const stepIndex = currentStepIndex === -1 ? 0 : currentStepIndex
  const currentStep = steps[stepIndex]
  const traversalOrder = currentStep?.traversalOrder || []

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
              width={1200}
              height={700}
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

            {traversalOrder.length > 0 && (
              <div style={{ padding: '1rem', backgroundColor: 'rgba(52, 211, 153, 0.1)', borderRadius: '0.5rem' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                  TRAVERSAL ORDER
                </p>
                <p style={{ color: 'var(--state-sorted)', fontSize: '0.9rem', fontFamily: 'SF Mono' }}>
                  {traversalOrder.join(' → ')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
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
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Unvisited</span>
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
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Visited</span>
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
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Current</span>
          </div>
        </div>
      </div>
    </div>
  )
}
