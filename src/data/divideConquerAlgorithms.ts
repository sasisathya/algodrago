export interface RecursionNode {
  id: string
  label: string
  depth: number
  status: 'pending' | 'dividing' | 'conquering' | 'combined' | 'completed' | 'memoized'
  children: RecursionNode[]
  x?: number
  y?: number
  value?: number
  result?: number
}

export interface CallStackEntry {
  functionName: string
  parameters: string
  depth: number
  returnValue?: string
}

export interface DivideConquerStep {
  operation: string
  data?: number[][]
  value?: number
  explanation: string
  line?: number
  variables?: Array<{ name: string; value: string }>
  recursionDepth?: number
  state?: 'divide' | 'conquer' | 'combine'
  // New: Recursion tree visualization
  recursionTree?: RecursionNode
  callStack?: CallStackEntry[]
  subproblemsSolved?: number
  totalSubproblems?: number
}

export interface DivideConquerAlgorithm {
  id: string
  name: string
  category: 'Divide & Conquer'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  description: string
  timeComplexity: string
  spaceComplexity: string
  pseudocode: string[]
  tags: string[]
  implement: (input: any) => Promise<DivideConquerStep[]>
}

// Helper to deep copy recursion tree
function copyRecursionTree(node: RecursionNode): RecursionNode {
  return {
    id: node.id,
    label: node.label,
    depth: node.depth,
    status: node.status,
    children: node.children.map(copyRecursionTree),
    x: node.x,
    y: node.y,
    value: node.value,
    result: node.result,
  }
}

// Helper to mark nodes in path with status
function markNodePath(node: RecursionNode, pathIds: Set<string>, status: RecursionNode['status']) {
  if (pathIds.has(node.id)) {
    node.status = status
  }
  node.children.forEach((child) => markNodePath(child, pathIds, status))
}

// Helper to reset all nodes to pending
function resetNodeStatuses(node: RecursionNode) {
  node.status = 'pending'
  node.children.forEach((child) => resetNodeStatuses(child))
}

// Tower of Hanoi
const hanoyPseudocode = [
  'TowerOfHanoi(n, source, dest, auxiliary):',
  '  if n == 1:',
  '    move disk from source to dest',
  '    return',
  '  TowerOfHanoi(n-1, source, auxiliary, dest)',
  '  move disk n from source to dest',
  '  TowerOfHanoi(n-1, auxiliary, dest, source)',
]

async function towerOfHanoi(n: number = 3): Promise<DivideConquerStep[]> {
  const steps: DivideConquerStep[] = []
  let moveCount = 0

  // Build tree structure first
  let nodeIdCounter = 0
  let rootNode: RecursionNode | null = null

  function createNode(
    depth: number,
    num: number,
    source: string,
    dest: string
  ): RecursionNode {
    return {
      id: `hanoi-${nodeIdCounter++}`,
      label: `hanoi(${num}, ${source}→${dest})`,
      depth,
      status: 'pending',
      children: [],
      value: num,
    }
  }

  function buildTree(
    num: number,
    source: string,
    dest: string,
    aux: string,
    depth: number = 0,
    parentNode?: RecursionNode
  ): RecursionNode {
    const node = createNode(depth, num, source, dest)
    if (!rootNode) rootNode = node
    if (parentNode) parentNode.children.push(node)

    if (num > 1) {
      buildTree(num - 1, source, aux, dest, depth + 1, node)
      buildTree(num - 1, aux, dest, source, depth + 1, node)
    }

    return node
  }

  buildTree(n, 'Source', 'Destination', 'Auxiliary')

  // Now simulate execution with path tracking
  const nodeMap = new Map<string, RecursionNode>()

  function mapNodes(node: RecursionNode) {
    nodeMap.set(node.id, node)
    node.children.forEach(mapNodes)
  }

  if (rootNode) mapNodes(rootNode)

  const callStack: Array<{ nodeId: string; node: RecursionNode }> = []

  function solve(
    num: number,
    source: string,
    dest: string,
    aux: string,
    nodeId: string
  ) {
    const node = nodeMap.get(nodeId)
    if (!node) return

    callStack.push({ nodeId, node })

    if (num === 1) {
      moveCount++

      // Mark path as conquering
      if (rootNode) {
        resetNodeStatuses(rootNode)
        callStack.forEach(({ node }) => {
          node.status = 'conquering'
        })

        steps.push({
          operation: `Move disk 1 from ${source} to ${dest}`,
          explanation: `Direct move: n=1`,
          line: 2,
          recursionDepth: callStack.length - 1,
          recursionTree: copyRecursionTree(rootNode),
          callStack: callStack.map(({ node }) => ({
            functionName: node.label,
            parameters: '',
            depth: node.depth,
          })),
          variables: [
            { name: 'n', value: '1' },
            { name: 'moves', value: moveCount.toString() },
          ],
          state: 'conquer',
        })
      }

      callStack.pop()
      return
    }

    // Divide phase
    if (rootNode) {
      resetNodeStatuses(rootNode)
      callStack.forEach(({ node }) => {
        node.status = 'dividing'
      })

      steps.push({
        operation: `Solving for n=${num}: move ${num - 1} disks from ${source} to ${aux}`,
        explanation: `Divide: Move top ${num - 1} disks to auxiliary`,
        recursionDepth: callStack.length - 1,
        recursionTree: copyRecursionTree(rootNode),
        callStack: callStack.map(({ node }) => ({
          functionName: node.label,
          parameters: '',
          depth: node.depth,
        })),
        variables: [{ name: 'n', value: num.toString() }],
        state: 'divide',
      })
    }

    // First recursive call
    const child1Id = node.children[0]?.id
    if (child1Id) solve(num - 1, source, aux, dest, child1Id)

    // Conquer phase
    moveCount++
    if (rootNode) {
      resetNodeStatuses(rootNode)
      callStack.forEach(({ node }) => {
        node.status = 'conquering'
      })

      steps.push({
        operation: `Move disk ${num} from ${source} to ${dest}`,
        explanation: `Conquer: Move largest disk`,
        line: 5,
        recursionDepth: callStack.length - 1,
        recursionTree: copyRecursionTree(rootNode),
        callStack: callStack.map(({ node }) => ({
          functionName: node.label,
          parameters: '',
          depth: node.depth,
        })),
        variables: [{ name: 'moves', value: moveCount.toString() }],
        state: 'conquer',
      })
    }

    // Combine phase
    if (rootNode) {
      resetNodeStatuses(rootNode)
      callStack.forEach(({ node }) => {
        node.status = 'combined'
      })

      steps.push({
        operation: `Solving for n=${num}: move ${num - 1} disks from ${aux} to ${dest}`,
        explanation: `Combine: Move disks from auxiliary to destination`,
        recursionDepth: callStack.length - 1,
        recursionTree: copyRecursionTree(rootNode),
        callStack: callStack.map(({ node }) => ({
          functionName: node.label,
          parameters: '',
          depth: node.depth,
        })),
        variables: [{ name: 'n', value: num.toString() }],
        state: 'combine',
      })
    }

    // Second recursive call
    const child2Id = node.children[1]?.id
    if (child2Id) solve(num - 1, aux, dest, source, child2Id)

    callStack.pop()
  }

  if (rootNode) {
    solve(n, 'Source', 'Destination', 'Auxiliary', rootNode.id)

    steps.push({
      operation: `Complete!`,
      explanation: `Total moves: 2^${n} - 1 = ${Math.pow(2, n) - 1}`,
      recursionTree: copyRecursionTree(rootNode),
      variables: [{ name: 'total_moves', value: moveCount.toString() }],
    })
  }

  return steps
}

// Fibonacci with Memoization
const fibonacciPseudocode = [
  'Fibonacci(n, memo):',
  '  if n <= 1:',
  '    return n',
  '  if n in memo:',
  '    return memo[n]',
  '  result = Fibonacci(n-1) + Fibonacci(n-2)',
  '  memo[n] = result',
  '  return result',
]

async function fibonacci(n: number = 5): Promise<DivideConquerStep[]> {
  const steps: DivideConquerStep[] = []
  const memo: Record<number, number> = {}
  let callCount = 0
  let nodeIdCounter = 0
  let rootNode: RecursionNode | null = null

  function createFibNode(depth: number, num: number): RecursionNode {
    return {
      id: `fib-${nodeIdCounter++}`,
      label: `fib(${num})`,
      depth,
      status: 'pending',
      children: [],
      value: num,
    }
  }

  function buildFibTree(num: number, depth: number = 0, parentNode?: RecursionNode): RecursionNode {
    const node = createFibNode(depth, num)
    if (!rootNode) rootNode = node
    if (parentNode) parentNode.children.push(node)

    if (num > 1) {
      buildFibTree(num - 1, depth + 1, node)
      buildFibTree(num - 2, depth + 1, node)
    }

    return node
  }

  buildFibTree(n)

  const nodeMap = new Map<string, RecursionNode>()

  function mapNodes(node: RecursionNode) {
    nodeMap.set(node.id, node)
    node.children.forEach(mapNodes)
  }

  if (rootNode) mapNodes(rootNode)

  const callStack: Array<{ nodeId: string; node: RecursionNode }> = []
  const memoizedNodes = new Set<string>()

  function solve(num: number, nodeId: string): number {
    const node = nodeMap.get(nodeId)
    if (!node) return 0

    callCount++
    callStack.push({ nodeId, node })

    if (num <= 1) {
      node.status = 'completed'
      if (rootNode) {
        resetNodeStatuses(rootNode)
        callStack.forEach(({ node }) => {
          node.status = node.status === 'memoized' ? 'memoized' : 'completed'
        })

        steps.push({
          operation: `Return ${num}`,
          explanation: `Base case: n <= 1`,
          line: 2,
          recursionDepth: callStack.length - 1,
          recursionTree: copyRecursionTree(rootNode),
          callStack: callStack.map(({ node }) => ({
            functionName: node.label,
            parameters: '',
            depth: node.depth,
          })),
          variables: [{ name: 'result', value: num.toString() }],
          state: 'conquer',
        })
      }

      callStack.pop()
      return num
    }

    if (memo[num]) {
      node.status = 'memoized'
      memoizedNodes.add(nodeId)

      if (rootNode) {
        resetNodeStatuses(rootNode)
        memoizedNodes.forEach((id) => {
          const n = nodeMap.get(id)
          if (n) n.status = 'memoized'
        })
        callStack.forEach(({ node }) => {
          if (node.status !== 'memoized') node.status = 'conquering'
        })

        steps.push({
          operation: `Return ${memo[num]} (from memo)`,
          explanation: `Memoized result found`,
          line: 4,
          recursionDepth: callStack.length - 1,
          recursionTree: copyRecursionTree(rootNode),
          callStack: callStack.map(({ node }) => ({
            functionName: node.label,
            parameters: '',
            depth: node.depth,
          })),
          variables: [
            { name: 'result', value: memo[num].toString() },
            { name: 'cached', value: 'true' },
          ],
          state: 'conquer',
        })
      }

      callStack.pop()
      return memo[num]
    }

    node.status = 'dividing'
    if (rootNode) {
      resetNodeStatuses(rootNode)
      memoizedNodes.forEach((id) => {
        const n = nodeMap.get(id)
        if (n) n.status = 'memoized'
      })
      callStack.forEach(({ node }) => {
        node.status = 'dividing'
      })

      steps.push({
        operation: `Fib(${num})`,
        explanation: `Dividing: fib(${num}) = fib(${num - 1}) + fib(${num - 2})`,
        line: 5,
        recursionDepth: callStack.length - 1,
        recursionTree: copyRecursionTree(rootNode),
        callStack: callStack.map(({ node }) => ({
          functionName: node.label,
          parameters: '',
          depth: node.depth,
        })),
        variables: [{ name: 'n', value: num.toString() }],
        state: 'divide',
      })
    }

    const left = solve(num - 1, node.children[0]?.id || '')
    const right = solve(num - 2, node.children[1]?.id || '')

    node.status = 'completed'
    const result = left + right
    memo[num] = result

    if (rootNode) {
      resetNodeStatuses(rootNode)
      memoizedNodes.forEach((id) => {
        const n = nodeMap.get(id)
        if (n) n.status = 'memoized'
      })
      callStack.forEach(({ node }) => {
        node.status = 'conquering'
      })

      steps.push({
        operation: `Fib(${num}) = ${result}`,
        explanation: `Combine: fib(${num - 1}) + fib(${num - 2}) = ${result}`,
        line: 6,
        recursionDepth: callStack.length - 1,
        recursionTree: copyRecursionTree(rootNode),
        callStack: callStack.map(({ node }) => ({
          functionName: node.label,
          parameters: '',
          depth: node.depth,
        })),
        variables: [
          { name: 'left', value: left.toString() },
          { name: 'right', value: right.toString() },
          { name: 'result', value: result.toString() },
        ],
        state: 'conquer',
      })
    }

    callStack.pop()
    return result
  }

  if (rootNode) {
    solve(n, rootNode.id)

    steps.push({
      operation: `Complete!`,
      explanation: `Fibonacci(${n}) = ${memo[n]}`,
      recursionTree: copyRecursionTree(rootNode),
      variables: [
        { name: 'result', value: memo[n].toString() },
        { name: 'memo_hits', value: memoizedNodes.size.toString() },
      ],
    })
  }

  return steps
}

// Strassen's Matrix Multiplication (2x2 example)
const strassenPseudocode = [
  'Strassen(A, B):',
  '  if size == 1:',
  '    return A * B',
  '  divide A and B into quadrants',
  '  compute 7 products using divide and conquer',
  '  combine products into result',
]

async function strassen(size: number = 2): Promise<DivideConquerStep[]> {
  const steps: DivideConquerStep[] = []

  const rootNode: RecursionNode = {
    id: 'strassen-root',
    label: `Strassen(${size}x${size})`,
    depth: 0,
    status: 'dividing',
    children: [
      {
        id: 'm1',
        label: 'M1: (A11+A22)*(B11+B22)',
        depth: 1,
        status: 'pending',
        children: [],
      },
      {
        id: 'm2',
        label: 'M2: (A21+A22)*B11',
        depth: 1,
        status: 'pending',
        children: [],
      },
      {
        id: 'm3',
        label: 'M3: A11*(B12-B22)',
        depth: 1,
        status: 'pending',
        children: [],
      },
      {
        id: 'm4',
        label: 'M4: A22*(B21-B11)',
        depth: 1,
        status: 'pending',
        children: [],
      },
      {
        id: 'm5',
        label: 'M5: (A11+A12)*B22',
        depth: 1,
        status: 'pending',
        children: [],
      },
      {
        id: 'm6',
        label: 'M6: (A21-A11)*(B11+B12)',
        depth: 1,
        status: 'pending',
        children: [],
      },
      {
        id: 'm7',
        label: 'M7: (A12-A22)*(B21+B22)',
        depth: 1,
        status: 'pending',
        children: [],
      },
    ],
  }

  steps.push({
    operation: `Initialize matrices (${size}x${size})`,
    explanation: `Start Strassen algorithm`,
    line: 0,
    recursionTree: copyRecursionTree(rootNode),
    callStack: [{ functionName: `Strassen(${size}x${size})`, parameters: '', depth: 0 }],
    variables: [{ name: 'matrix_size', value: `${size}x${size}` }],
    state: 'divide',
  })

  steps.push({
    operation: `Divide into 4 quadrants`,
    explanation: `Split A and B into A11,A12,A21,A22 and B11,B12,B21,B22`,
    line: 3,
    recursionTree: copyRecursionTree(rootNode),
    callStack: [{ functionName: `Strassen(${size}x${size})`, parameters: '', depth: 0 }],
    variables: [{ name: 'quadrants', value: '4' }],
    state: 'divide',
  })

  for (let i = 1; i <= 7; i++) {
    rootNode.children[i - 1].status = 'conquering'

    steps.push({
      operation: `Compute M${i}`,
      explanation: `M${i} = product of submatrices`,
      line: 4,
      recursionTree: copyRecursionTree(rootNode),
      callStack: [
        { functionName: `Strassen(${size}x${size})`, parameters: '', depth: 0 },
        {
          functionName: `M${i}`,
          parameters: 'matrix multiplication',
          depth: 1,
        },
      ],
      subproblemsSolved: i,
      totalSubproblems: 7,
      variables: [{ name: 'product', value: `M${i}` }],
      state: 'conquer',
    })

    rootNode.children[i - 1].status = 'completed'
  }

  rootNode.status = 'conquering'
  steps.push({
    operation: `Combine results`,
    explanation: `C = combination of M1...M7`,
    line: 5,
    recursionTree: copyRecursionTree(rootNode),
    callStack: [{ functionName: `Strassen(${size}x${size})`, parameters: '', depth: 0 }],
    variables: [
      { name: 'C11', value: 'M1 + M4 - M5 + M7' },
      { name: 'C12', value: 'M3 + M5' },
      { name: 'C21', value: 'M2 + M4' },
      { name: 'C22', value: 'M1 - M2 + M3 + M6' },
    ],
    state: 'combine',
  })

  return steps
}

export const divideConquerAlgorithms: DivideConquerAlgorithm[] = [
  {
    id: 'tower-of-hanoi',
    name: 'Tower of Hanoi',
    category: 'Divide & Conquer',
    type: 'Divide & Conquer',
    difficulty: 'intermediate',
    description:
      'Classic puzzle: Move n disks from one peg to another following rules. Shows recursive divide and conquer with visualization of recursion tree.',
    timeComplexity: 'O(2^n)',
    spaceComplexity: 'O(n)',
    pseudocode: hanoyPseudocode,
    tags: ['recursion', 'divide-and-conquer', 'puzzle', 'graph-visualization'],
    implement: () => towerOfHanoi(3),
  },
  {
    id: 'fibonacci-memo',
    name: 'Fibonacci (with Memoization)',
    category: 'Divide & Conquer',
    type: 'Divide & Conquer',
    difficulty: 'intermediate',
    description:
      'Calculate Fibonacci numbers using divide and conquer with memoization. Visualizes recursion tree with memoized branches highlighted.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    pseudocode: fibonacciPseudocode,
    tags: ['recursion', 'dynamic-programming', 'divide-and-conquer', 'memoization'],
    implement: () => fibonacci(5),
  },
  {
    id: 'strassen',
    name: "Strassen's Matrix Multiplication",
    category: 'Divide & Conquer',
    type: 'Divide & Conquer',
    difficulty: 'advanced',
    description:
      'Efficient matrix multiplication using divide and conquer. Reduces multiplications from 8 to 7 per step. Shows 7 subproblems in recursion tree.',
    timeComplexity: 'O(n^2.81)',
    spaceComplexity: 'O(n^2)',
    pseudocode: strassenPseudocode,
    tags: ['matrix', 'divide-and-conquer', 'advanced', 'graph-visualization'],
    implement: () => strassen(2),
  },
]
