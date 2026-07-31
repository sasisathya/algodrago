export interface TreeNode {
  id: string
  value: number
  left?: TreeNode
  right?: TreeNode
  height?: number
  balanceFactor?: number
}

export interface TreeStep {
  tree: TreeNode | null
  highlightedNode?: string
  traversalOrder?: string[]
  operation?: string
  line?: number
  variables?: Array<{ name: string; value: string }>
}

export interface TreeAlgorithm {
  id: string
  name: string
  category: 'Tree'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  description: string
  timeComplexity: string
  spaceComplexity: string
  pseudocode: string[]
  tags: string[]
  implement: (tree?: TreeNode) => Promise<TreeStep[]>
}

// Sample Binary Search Tree
function createSampleTree(): TreeNode {
  return {
    id: '1',
    value: 50,
    left: {
      id: '2',
      value: 30,
      left: { id: '4', value: 20 },
      right: { id: '5', value: 40 },
    },
    right: {
      id: '3',
      value: 70,
      left: { id: '6', value: 60 },
      right: { id: '7', value: 80 },
    },
  }
}

// Inorder Traversal (Left, Root, Right)
const inorderPseudocode = [
  'Inorder(node):',
  '  if node is null:',
  '    return',
  '  Inorder(node.left)',
  '  process(node.value)',
  '  Inorder(node.right)',
]

async function inorderTraversal(tree?: TreeNode): Promise<TreeStep[]> {
  const treeToUse = tree || createSampleTree()
  const steps: TreeStep[] = []
  const traversalOrder: string[] = []

  function traverse(node: TreeNode | undefined, depth: number = 0) {
    if (!node) return

    steps.push({
      tree: treeToUse,
      highlightedNode: node.id,
      traversalOrder: [...traversalOrder],
      variables: [{ name: 'visiting', value: node.value.toString() }],
      line: 3,
    })

    traverse(node.left, depth + 1)

    traversalOrder.push(node.value.toString())
    steps.push({
      tree: treeToUse,
      highlightedNode: node.id,
      traversalOrder: [...traversalOrder],
      variables: [{ name: 'processed', value: node.value.toString() }],
      line: 4,
    })

    traverse(node.right, depth + 1)
  }

  traverse(treeToUse)

  steps.push({
    tree: treeToUse,
    traversalOrder,
    variables: [{ name: 'result', value: traversalOrder.join(',') }],
    line: 5,
  })

  return steps
}

// Preorder Traversal (Root, Left, Right)
const preorderPseudocode = [
  'Preorder(node):',
  '  if node is null:',
  '    return',
  '  process(node.value)',
  '  Preorder(node.left)',
  '  Preorder(node.right)',
]

async function preorderTraversal(tree?: TreeNode): Promise<TreeStep[]> {
  const treeToUse = tree || createSampleTree()
  const steps: TreeStep[] = []
  const traversalOrder: string[] = []

  function traverse(node: TreeNode | undefined) {
    if (!node) return

    traversalOrder.push(node.value.toString())
    steps.push({
      tree: treeToUse,
      highlightedNode: node.id,
      traversalOrder: [...traversalOrder],
      variables: [{ name: 'processed', value: node.value.toString() }],
      line: 3,
    })

    traverse(node.left)
    traverse(node.right)
  }

  traverse(treeToUse)

  steps.push({
    tree: treeToUse,
    traversalOrder,
    variables: [{ name: 'result', value: traversalOrder.join(',') }],
    line: 5,
  })

  return steps
}

// Postorder Traversal (Left, Right, Root)
const postorderPseudocode = [
  'Postorder(node):',
  '  if node is null:',
  '    return',
  '  Postorder(node.left)',
  '  Postorder(node.right)',
  '  process(node.value)',
]

async function postorderTraversal(tree?: TreeNode): Promise<TreeStep[]> {
  const treeToUse = tree || createSampleTree()
  const steps: TreeStep[] = []
  const traversalOrder: string[] = []

  function traverse(node: TreeNode | undefined) {
    if (!node) return

    traverse(node.left)
    traverse(node.right)

    traversalOrder.push(node.value.toString())
    steps.push({
      tree: treeToUse,
      highlightedNode: node.id,
      traversalOrder: [...traversalOrder],
      variables: [{ name: 'processed', value: node.value.toString() }],
      line: 5,
    })
  }

  traverse(treeToUse)

  steps.push({
    tree: treeToUse,
    traversalOrder,
    variables: [{ name: 'result', value: traversalOrder.join(',') }],
    line: 5,
  })

  return steps
}

// Level Order Traversal (BFS on Tree)
const levelorderPseudocode = [
  'LevelOrder(root):',
  '  queue = Queue()',
  '  queue.enqueue(root)',
  '  while queue is not empty:',
  '    node = queue.dequeue()',
  '    process(node.value)',
  '    if node.left:',
  '      queue.enqueue(node.left)',
  '    if node.right:',
  '      queue.enqueue(node.right)',
]

async function levelorderTraversal(tree?: TreeNode): Promise<TreeStep[]> {
  const treeToUse = tree || createSampleTree()
  const steps: TreeStep[] = []
  const traversalOrder: string[] = []
  const queue: TreeNode[] = [treeToUse]

  steps.push({
    tree: treeToUse,
    traversalOrder: [],
    variables: [{ name: 'queue_size', value: '1' }],
    line: 2,
  })

  while (queue.length > 0) {
    const node = queue.shift()!

    traversalOrder.push(node.value.toString())
    steps.push({
      tree: treeToUse,
      highlightedNode: node.id,
      traversalOrder: [...traversalOrder],
      variables: [{ name: 'current', value: node.value.toString() }],
      line: 5,
    })

    if (node.left) {
      queue.push(node.left)
    }
    if (node.right) {
      queue.push(node.right)
    }
  }

  steps.push({
    tree: treeToUse,
    traversalOrder,
    variables: [{ name: 'result', value: traversalOrder.join(',') }],
    line: 9,
  })

  return steps
}

export const treeAlgorithms: TreeAlgorithm[] = [
  {
    id: 'inorder',
    name: 'Inorder Traversal',
    category: 'Tree',
    type: 'Tree',
    difficulty: 'beginner',
    description:
      'Traverses tree in order: Left subtree → Root → Right subtree. For BST, produces sorted sequence.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    pseudocode: inorderPseudocode,
    tags: ['tree', 'traversal', 'dfs', 'recursion'],
    implement: inorderTraversal,
  },
  {
    id: 'preorder',
    name: 'Preorder Traversal',
    category: 'Tree',
    type: 'Tree',
    difficulty: 'beginner',
    description:
      'Traverses tree in order: Root → Left subtree → Right subtree. Useful for copying trees.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    pseudocode: preorderPseudocode,
    tags: ['tree', 'traversal', 'dfs', 'recursion'],
    implement: preorderTraversal,
  },
  {
    id: 'postorder',
    name: 'Postorder Traversal',
    category: 'Tree',
    type: 'Tree',
    difficulty: 'beginner',
    description:
      'Traverses tree in order: Left subtree → Right subtree → Root. Useful for deleting trees.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    pseudocode: postorderPseudocode,
    tags: ['tree', 'traversal', 'dfs', 'recursion'],
    implement: postorderTraversal,
  },
  {
    id: 'levelorder',
    name: 'Level Order Traversal',
    category: 'Tree',
    type: 'Tree',
    difficulty: 'beginner',
    description:
      'Traverses tree level by level from top to bottom (BFS). Useful for finding nodes at specific depths.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(w)',
    pseudocode: levelorderPseudocode,
    tags: ['tree', 'traversal', 'bfs', 'queue'],
    implement: levelorderTraversal,
  },
]
