export interface GraphNode {
  id: string
  label: string
  x?: number
  y?: number
}

export interface GraphEdge {
  from: string
  to: string
  weight?: number
}

export interface GraphStep {
  graph: {
    nodes: GraphNode[]
    edges: GraphEdge[]
  }
  visitedNodes?: Set<string>
  currentNode?: string
  queue?: string[]
  stack?: string[]
  distances?: Record<string, number>
  parent?: Record<string, string>
  line?: number
  variables?: Array<{ name: string; value: string }>
}

export interface GraphAlgorithm {
  id: string
  name: string
  category: 'Graph'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  description: string
  timeComplexity: string
  spaceComplexity: string
  pseudocode: string[]
  tags: string[]
  implement: (graph: { nodes: GraphNode[]; edges: GraphEdge[] }) => Promise<GraphStep[]>
}

// Sample Graph for BFS/DFS
const sampleGraph = {
  nodes: [
    { id: '0', label: '0' },
    { id: '1', label: '1' },
    { id: '2', label: '2' },
    { id: '3', label: '3' },
    { id: '4', label: '4' },
    { id: '5', label: '5' },
  ],
  edges: [
    { from: '0', to: '1' },
    { from: '0', to: '2' },
    { from: '1', to: '3' },
    { from: '2', to: '4' },
    { from: '3', to: '5' },
    { from: '4', to: '5' },
  ],
}

// BFS Algorithm
const bfsPseudocode = [
  'BFS(graph, start):',
  '  queue = Queue([start])',
  '  visited = Set([start])',
  '  while queue is not empty:',
  '    node = queue.dequeue()',
  '    for neighbor in graph[node]:',
  '      if neighbor not in visited:',
  '        visited.add(neighbor)',
  '        queue.enqueue(neighbor)',
]

async function bfs(graph: { nodes: GraphNode[]; edges: GraphEdge[] }): Promise<GraphStep[]> {
  const steps: GraphStep[] = []
  const visited = new Set<string>()
  const queue: string[] = []
  const startNode = graph.nodes[0].id

  queue.push(startNode)
  visited.add(startNode)

  steps.push({
    graph,
    visitedNodes: new Set([startNode]),
    queue: [...queue],
    currentNode: startNode,
    variables: [{ name: 'start', value: startNode }],
    line: 1,
  })

  while (queue.length > 0) {
    const node = queue.shift()!

    steps.push({
      graph,
      currentNode: node,
      visitedNodes: new Set(visited),
      queue: [...queue],
      variables: [{ name: 'current', value: node }],
      line: 4,
    })

    const neighbors = graph.edges
      .filter((e) => e.from === node)
      .map((e) => e.to)

    for (const neighbor of neighbors) {
      steps.push({
        graph,
        currentNode: node,
        visitedNodes: new Set(visited),
        queue: [...queue],
        variables: [
          { name: 'current', value: node },
          { name: 'neighbor', value: neighbor },
        ],
        line: 6,
      })

      if (!visited.has(neighbor)) {
        steps.push({
          graph,
          currentNode: node,
          visitedNodes: new Set(visited),
          queue: [...queue],
          variables: [
            { name: 'current', value: node },
            { name: 'neighbor', value: neighbor },
          ],
          line: 7,
        })

        visited.add(neighbor)
        queue.push(neighbor)

        steps.push({
          graph,
          visitedNodes: new Set(visited),
          queue: [...queue],
          variables: [
            { name: 'current', value: node },
            { name: 'neighbor', value: neighbor },
          ],
          line: 8,
        })
      }
    }
  }

  steps.push({
    graph,
    visitedNodes: visited,
    variables: [{ name: 'visited', value: Array.from(visited).join(',') }],
    line: 3,
  })

  return steps
}

// DFS Algorithm
const dfsPseudocode = [
  'DFS(graph, start, visited):',
  '  stack = Stack([start])',
  '  while stack is not empty:',
  '    node = stack.pop()',
  '    if node not in visited:',
  '      visited.add(node)',
  '      for neighbor in graph[node]:',
  '        if neighbor not in visited:',
  '          stack.push(neighbor)',
  '  return visited',
]

async function dfs(graph: { nodes: GraphNode[]; edges: GraphEdge[] }): Promise<GraphStep[]> {
  const steps: GraphStep[] = []
  const visited = new Set<string>()
  const stack: string[] = [graph.nodes[0].id]

  steps.push({
    graph,
    stack: [...stack],
    variables: [{ name: 'start', value: graph.nodes[0].id }],
    line: 1,
  })

  while (stack.length > 0) {
    const node = stack.pop()!

    steps.push({
      graph,
      visitedNodes: new Set(visited),
      stack: [...stack],
      variables: [{ name: 'current', value: node }],
      line: 3,
    })

    if (!visited.has(node)) {
      visited.add(node)

      steps.push({
        graph,
        currentNode: node,
        visitedNodes: new Set(visited),
        stack: [...stack],
        variables: [{ name: 'current', value: node }],
        line: 5,
      })

      const neighbors = graph.edges
        .filter((e) => e.from === node)
        .map((e) => e.to)
        .reverse()

      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          steps.push({
            graph,
            visitedNodes: new Set(visited),
            stack: [...stack],
            variables: [
              { name: 'current', value: node },
              { name: 'neighbor', value: neighbor },
            ],
            line: 7,
          })

          stack.push(neighbor)

          steps.push({
            graph,
            visitedNodes: new Set(visited),
            stack: [...stack],
            variables: [{ name: 'neighbor', value: neighbor }],
            line: 8,
          })
        }
      }
    }
  }

  steps.push({
    graph,
    visitedNodes: visited,
    variables: [{ name: 'visited', value: Array.from(visited).join(',') }],
    line: 9,
  })

  return steps
}

export const graphAlgorithms: GraphAlgorithm[] = [
  {
    id: 'bfs',
    name: 'BFS (Breadth-First Search)',
    category: 'Graph',
    type: 'Graph',
    difficulty: 'beginner',
    description:
      'Explores a graph level-by-level, visiting all neighbors before going deeper. Uses a queue to track nodes to visit.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    pseudocode: bfsPseudocode,
    tags: ['graph', 'search', 'traversal', 'queue'],
    implement: bfs,
  },
  {
    id: 'dfs',
    name: 'DFS (Depth-First Search)',
    category: 'Graph',
    type: 'Graph',
    difficulty: 'beginner',
    description:
      'Explores a graph by going as deep as possible before backtracking. Uses a stack to track nodes to visit.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    pseudocode: dfsPseudocode,
    tags: ['graph', 'search', 'traversal', 'stack'],
    implement: dfs,
  },
]
