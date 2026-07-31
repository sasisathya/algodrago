import { memo, useState } from 'react'

interface AlgorithmDetailsProps {
  algorithmName: string
  category: string
  description: string
}

function AlgorithmDetailsImpl({
  algorithmName,
  category,
  description,
}: AlgorithmDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Algorithm details database
  const algorithmDetails: Record<string, {
    howItWorks: string
    steps: string[]
    pros: string[]
    cons: string[]
    bestFor: string
    worstCase: string
    realWorldExample: string
  }> = {
    'Bubble Sort': {
      howItWorks:
        'Bubble Sort repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order. This process continues until the entire array is sorted. It "bubbles" the largest unsorted element to the end of the array in each pass.',
      steps: [
        'Compare first two elements',
        'Swap if they are in wrong order',
        'Move to next pair',
        'After one full pass, the largest element is at the end',
        'Repeat until no swaps are needed',
      ],
      pros: [
        'Easy to understand and implement',
        'No extra space needed (in-place)',
        'Stable sort (maintains relative order of equal elements)',
      ],
      cons: [
        'Very slow for large datasets (O(n²))',
        'Makes many unnecessary comparisons',
        'Not suitable for production systems',
      ],
      bestFor: 'Educational purposes, tiny datasets, nearly sorted arrays',
      worstCase: 'O(n²) - when array is sorted in reverse order',
      realWorldExample:
        'Imagine sorting a hand of playing cards by comparing adjacent cards and swapping them. This is exactly how bubble sort works!',
    },
    'Selection Sort': {
      howItWorks:
        'Selection Sort divides the array into two parts: sorted and unsorted. It repeatedly finds the minimum element from the unsorted part and places it at the beginning of the sorted part.',
      steps: [
        'Find the minimum element in the unsorted part',
        'Place it at the beginning',
        'Move the boundary between sorted and unsorted parts',
        'Repeat for the remaining unsorted elements',
      ],
      pros: [
        'Simple to understand',
        'No extra space needed',
        'Minimum number of swaps (max n-1)',
      ],
      cons: [
        'Always O(n²) regardless of input',
        'Not stable (may change relative order)',
        'Many comparisons even if array is nearly sorted',
      ],
      bestFor: 'When you want to minimize the number of swaps',
      worstCase: 'O(n²) - always, even for sorted input',
      realWorldExample:
        'Like picking the youngest person from a group repeatedly and putting them in a line',
    },
    'Insertion Sort': {
      howItWorks:
        'Insertion Sort builds the sorted array one item at a time by inserting each element into its correct position among the already sorted elements, similar to how people sort playing cards in their hands.',
      steps: [
        'Start with first element (considered sorted)',
        'Take next unsorted element',
        'Shift sorted elements until correct position found',
        'Insert the element',
        'Repeat until array is sorted',
      ],
      pros: [
        'Very efficient for small datasets',
        'Efficient for nearly sorted arrays',
        'Stable sort',
        'No extra space needed',
        'Online algorithm (can sort as it receives data)',
      ],
      cons: [
        'O(n²) in worst case',
        'Many shifts required for large datasets',
      ],
      bestFor: 'Small arrays, nearly sorted data, online sorting',
      worstCase: 'O(n²) when array is sorted in reverse',
      realWorldExample:
        'How you naturally sort a hand of playing cards - pick one card and insert it in its correct position among the cards you already hold',
    },
    'Merge Sort': {
      howItWorks:
        'Merge Sort uses divide-and-conquer: it divides the array into halves recursively until each part is a single element, then merges them back together in sorted order.',
      steps: [
        'Divide array into two halves',
        'Recursively sort each half',
        'Merge the two sorted halves',
        'Return the merged array',
      ],
      pros: [
        'Guaranteed O(n log n) performance',
        'Stable sort',
        'Predictable and reliable',
        'Great for linked lists',
      ],
      cons: [
        'Requires O(n) extra space for merging',
        'Slower than Quick Sort in practice',
        'More complex to implement',
      ],
      bestFor: 'Large datasets, when guaranteed performance is needed, linked lists',
      worstCase: 'O(n log n) - consistent regardless of input',
      realWorldExample:
        'Merging two sorted piles of numbered cards by comparing the top cards of each pile and placing the smaller one first',
    },
    'Quick Sort': {
      howItWorks:
        'Quick Sort selects a "pivot" element and partitions the array so elements smaller than the pivot are on the left and larger elements are on the right. Then it recursively sorts each partition.',
      steps: [
        'Choose a pivot element',
        'Partition: move smaller elements left, larger right',
        'Recursively sort left partition (smaller elements)',
        'Recursively sort right partition (larger elements)',
      ],
      pros: [
        'Very efficient in practice (average O(n log n))',
        'No extra space needed (in-place sorting)',
        'Cache-friendly',
        'Most widely used sorting algorithm',
      ],
      cons: [
        'Worst case O(n²) with bad pivot choices',
        'Not stable',
        'Recursive (uses stack space)',
      ],
      bestFor: 'General-purpose sorting of large datasets',
      worstCase: 'O(n²) - when pivot is always smallest/largest element',
      realWorldExample:
        'Organizing a group of people by height by picking one person as reference, putting shorter people on left and taller on right, then repeating for each group',
    },
    'Linear Search': {
      howItWorks:
        'Linear Search checks each element in the array one by one until it finds the target element or reaches the end of the array.',
      steps: [
        'Start at the first element',
        'Compare with target value',
        'If match found, return position',
        'If not, move to next element',
        'Repeat until found or end of array',
      ],
      pros: [
        'Works on unsorted arrays',
        'Simple to understand and implement',
        'No preprocessing needed',
      ],
      cons: [
        'Very slow for large datasets (O(n))',
        'Checks every element in worst case',
        'Inefficient compared to binary search on sorted data',
      ],
      bestFor: 'Small datasets, unsorted data, when array may change frequently',
      worstCase: 'O(n) - element at end or not present',
      realWorldExample:
        'Looking for a specific person in a crowd by checking each person one at a time from the start',
    },
    'Binary Search': {
      howItWorks:
        'Binary Search works only on sorted arrays. It starts in the middle and eliminates half of the remaining elements with each comparison, making the search extremely efficient.',
      steps: [
        'Start at the middle of the array',
        'Compare with target value',
        'If match found, return position',
        'If target is smaller, search left half',
        'If target is larger, search right half',
        'Repeat until found or no elements remain',
      ],
      pros: [
        'Extremely fast for large datasets (O(log n))',
        'Much better than linear search',
        'Eliminates half the data with each step',
        'Simple to understand',
      ],
      cons: [
        'Requires sorted array',
        'Cannot work on unsorted data',
        'Less efficient than linear for very small arrays',
      ],
      bestFor: 'Large sorted datasets, phone books, dictionaries',
      worstCase: 'O(log n) - consistent regardless of position',
      realWorldExample:
        'Finding a name in a phone book: open to middle, if name is before, search left half, if after, search right half. Keep halving until found.',
    },
    'Jump Search': {
      howItWorks:
        'Jump Search works on sorted arrays by jumping forward by fixed steps until it passes the target, then performs linear search in that block.',
      steps: [
        'Jump forward by sqrt(n) steps',
        'When passed the target, note the block',
        'Perform linear search in that block',
        'Return position if found',
      ],
      pros: [
        'Better than linear search (O(√n))',
        'Simpler than binary search',
        'Works well for arrays where jumping is efficient',
      ],
      cons: [
        'Slower than binary search',
        'Requires sorted array',
        'Jump size must be chosen carefully',
      ],
      bestFor: 'Moderate-sized sorted arrays, when binary search is not applicable',
      worstCase: 'O(√n) - when element is in last block',
      realWorldExample:
        'Looking for a street address: jump forward 100 addresses at a time, then walk forward one by one when you pass your address',
    },
    'Exponential Search': {
      howItWorks:
        'Exponential Search finds a range where the target lies by exponentially increasing the search space, then performs binary search within that range.',
      steps: [
        'Start by checking element at index 1',
        'Double the index (2, 4, 8, 16...)',
        'When you pass the target, note the range',
        'Perform binary search in that range',
      ],
      pros: [
        'Excellent for unbounded arrays',
        'O(log n) for elements near the start',
        'Combines benefits of jump and binary search',
      ],
      cons: [
        'More complex to implement',
        'Not better than binary search for bounded arrays',
        'Requires sorted array',
      ],
      bestFor: 'Unbounded arrays, elements more likely to be near start',
      worstCase: 'O(log n) - very efficient',
      realWorldExample:
        'Searching an infinite list by checking positions 1, 2, 4, 8, 16 to bound the search, then binary searching the bounded range',
    },
    'BFS (Breadth-First Search)': {
      howItWorks:
        'BFS explores a graph level-by-level, starting from a source node. It visits all neighbors of the current node before moving to the next level. Uses a queue data structure to maintain the order of exploration.',
      steps: [
        'Start with the source node, add it to queue',
        'While queue is not empty: dequeue a node',
        'Mark it as visited',
        'Add all unvisited neighbors to the queue',
        'Continue until queue is empty',
      ],
      pros: [
        'Finds shortest path in unweighted graphs',
        'Explores level by level (useful for level-based problems)',
        'Complete and optimal for unweighted graphs',
        'Good for finding connected components',
      ],
      cons: [
        'Uses more memory than DFS (stores all levels)',
        'Not suitable for very deep graphs',
        'Less efficient for weighted graphs without modification',
      ],
      bestFor: 'Finding shortest paths, level-by-level exploration, connected components',
      worstCase: 'O(V + E) - visits each vertex and edge once',
      realWorldExample:
        'Finding the shortest route in a GPS system, finding friends at each degree of separation on social networks',
    },
    'DFS (Depth-First Search)': {
      howItWorks:
        'DFS explores a graph by going as deep as possible along each branch before backtracking. Uses a stack data structure or recursion to maintain the order of exploration.',
      steps: [
        'Start with the source node, add it to stack',
        'While stack is not empty: pop a node',
        'Mark it as visited',
        'Add unvisited neighbors to the stack',
        'Continue until stack is empty',
      ],
      pros: [
        'Uses less memory than BFS (only stores current path)',
        'Good for exploring all paths/vertices',
        'Efficient for detecting cycles',
        'Can be implemented recursively (elegant)',
      ],
      cons: [
        'Does not find shortest path in unweighted graphs',
        'Can get stuck in very deep graphs',
        'Finding shortest path requires modification',
      ],
      bestFor: 'Topological sorting, cycle detection, path existence, backtracking problems',
      worstCase: 'O(V + E) - visits each vertex and edge once',
      realWorldExample:
        'Maze solving (trying one path fully before backtracking), exploring a file system directory recursively',
    },
    'Inorder Traversal': {
      howItWorks:
        'Inorder traversal visits nodes in the order: Left subtree → Current node → Right subtree. For binary search trees, this gives elements in sorted order.',
      steps: [
        'Recursively traverse left subtree',
        'Visit the current node',
        'Recursively traverse right subtree',
      ],
      pros: [
        'Produces sorted output for binary search trees',
        'Simple recursive implementation',
        'Natural for in-order processing',
      ],
      cons: [
        'Only works well with binary trees',
        'Requires recursion or explicit stack',
      ],
      bestFor: 'Getting sorted output from BST, processing tree nodes in sorted order',
      worstCase: 'O(n) - visits each node exactly once',
      realWorldExample: 'Printing elements of a binary search tree in sorted order',
    },
    'Preorder Traversal': {
      howItWorks:
        'Preorder traversal visits nodes in the order: Current node → Left subtree → Right subtree. Useful for creating a copy of the tree.',
      steps: [
        'Visit the current node',
        'Recursively traverse left subtree',
        'Recursively traverse right subtree',
      ],
      pros: [
        'Perfect for creating tree copies',
        'Parent visited before children',
        'Good for expression evaluation',
      ],
      cons: [
        'Requires recursion or explicit stack',
      ],
      bestFor: 'Copying trees, prefix notation expression evaluation',
      worstCase: 'O(n) - visits each node exactly once',
      realWorldExample: 'Creating a prefix expression from a tree, making a complete copy of a tree structure',
    },
    'Postorder Traversal': {
      howItWorks:
        'Postorder traversal visits nodes in the order: Left subtree → Right subtree → Current node. Useful for deleting trees or postfix evaluation.',
      steps: [
        'Recursively traverse left subtree',
        'Recursively traverse right subtree',
        'Visit the current node',
      ],
      pros: [
        'Perfect for deleting trees (children before parent)',
        'Children processed before parent',
        'Good for postfix expression evaluation',
      ],
      cons: [
        'Requires recursion or explicit stack',
      ],
      bestFor: 'Deleting trees, postfix notation evaluation, freeing memory',
      worstCase: 'O(n) - visits each node exactly once',
      realWorldExample: 'Safe deletion of tree nodes, evaluating postfix expressions',
    },
    'Level Order Traversal': {
      howItWorks:
        'Level Order traversal visits all nodes at each level before moving to the next level. Uses a queue to process nodes level by level, similar to BFS for graphs.',
      steps: [
        'Add root to queue',
        'While queue not empty: dequeue level nodes',
        'Process all nodes at current level',
        'Add their children to queue for next level',
      ],
      pros: [
        'Visits nodes in level order (useful for many problems)',
        'Good for finding depth/height of tree',
        'Naturally suited for queue operations',
      ],
      cons: [
        'Requires queue data structure',
        'Uses more memory for wide trees',
      ],
      bestFor: 'Level-based problems, finding specific levels, binary tree properties',
      worstCase: 'O(n) - visits each node exactly once',
      realWorldExample: 'Printing a tree level by level, finding the maximum width of a tree',
    },
    'Tower of Hanoi': {
      howItWorks:
        'Tower of Hanoi is a classic recursive puzzle. Move all disks from source to destination peg following rules: only one disk at a time, never place larger disk on smaller one. The solution shows divide-and-conquer perfectly.',
      steps: [
        'Move n-1 disks from source to auxiliary (using destination)',
        'Move the largest disk from source to destination',
        'Move n-1 disks from auxiliary to destination (using source)',
      ],
      pros: [
        'Classic example of divide-and-conquer',
        'Shows power of recursion clearly',
        'Elegant solution to complex problem',
      ],
      cons: [
        'Exponential complexity (O(2^n)) - grows very quickly',
        'Impractical for large n (n=30 requires billions of moves)',
      ],
      bestFor: 'Teaching recursion and divide-and-conquer concepts',
      worstCase: 'O(2^n) - exponential complexity',
      realWorldExample: 'Demonstrates recursive problem solving, tower backup scenarios with disk reordering',
    },
    'Fibonacci (with Memoization)': {
      howItWorks:
        'Calculate Fibonacci numbers using divide-and-conquer with memoization. Without memoization, it recalculates same values. With memoization, store results to avoid redundant calculations.',
      steps: [
        'Check if result is already computed (in memo table)',
        'If yes, return stored result',
        'If no, recursively compute fib(n-1) + fib(n-2)',
        'Store result in memo table',
        'Return result',
      ],
      pros: [
        'Converts exponential to linear complexity with memoization',
        'Shows benefits of dynamic programming',
        'Simple recursive implementation',
      ],
      cons: [
        'Without memoization, extremely slow',
        'Requires extra memory for memoization table',
      ],
      bestFor: 'Teaching dynamic programming and optimization techniques',
      worstCase: 'O(n) with memoization, O(2^n) without',
      realWorldExample: 'Optimization of recursive algorithms, calculating compound interest over time',
    },
    "Strassen's Matrix Multiplication": {
      howItWorks:
        "Strassen's algorithm multiplies matrices more efficiently using divide-and-conquer. Divides matrices into quadrants, uses 7 multiplications instead of 8, reduces problem size from O(n³) to O(n^2.81).",
      steps: [
        'Divide each matrix into 4 quadrants',
        'Compute 7 products of submatrices (M1-M7)',
        'Combine results to get final product',
        'Recursively apply for submatrix multiplications',
      ],
      pros: [
        'Better asymptotic complexity than standard multiplication',
        'Shows practical benefit of divide-and-conquer',
        'Useful for very large matrices',
      ],
      cons: [
        'Higher constant factors make it slower for small matrices',
        'More complex to implement',
        'Uses more memory due to recursive overhead',
      ],
      bestFor: 'Multiplying very large matrices, studying advanced divide-and-conquer',
      worstCase: 'O(n^2.81) - better than O(n³) for large matrices',
      realWorldExample: 'Computer graphics transformations, large numerical computations, scientific computing',
    },
  }

  const details = algorithmDetails[algorithmName]

  if (!details) {
    return (
      <div style={{ marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
            Detailed information for this algorithm coming soon.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: isExpanded ? '1.5rem' : 0,
          }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>
            📖 How {algorithmName} Works
          </h3>
          <span style={{ fontSize: '1.3rem', color: 'var(--accent-blue)' }}>
            {isExpanded ? '−' : '+'}
          </span>
        </div>

        {isExpanded && (
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            {/* How It Works */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: 'var(--accent-blue)', marginBottom: '0.75rem' }}>
                How It Works
              </h4>
              <p>{details.howItWorks}</p>
            </div>

            {/* Steps */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: 'var(--accent-blue)', marginBottom: '0.75rem' }}>
                Step by Step
              </h4>
              <ol style={{ paddingLeft: '1.5rem' }}>
                {details.steps.map((step, i) => (
                  <li key={i} style={{ marginBottom: '0.5rem' }}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Pros and Cons */}
            <div style={{ marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(52, 211, 153, 0.1)',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(52, 211, 153, 0.3)',
                }}
              >
                <h4 style={{ color: 'var(--state-sorted)', marginBottom: '0.75rem' }}>
                  ✅ Advantages
                </h4>
                <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
                  {details.pros.map((pro, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(251, 113, 133, 0.1)',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(251, 113, 133, 0.3)',
                }}
              >
                <h4 style={{ color: 'var(--state-swapping)', marginBottom: '0.75rem' }}>
                  ❌ Disadvantages
                </h4>
                <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
                  {details.cons.map((con, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Best For & Worst Case */}
            <div style={{ marginBottom: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ padding: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '0.5rem' }}>
                <h4 style={{ color: 'var(--accent-violet)', marginBottom: '0.5rem' }}>
                  🎯 Best Used For
                </h4>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>{details.bestFor}</p>
              </div>

              <div style={{ padding: '1rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '0.5rem' }}>
                <h4 style={{ color: 'var(--accent-pink)', marginBottom: '0.5rem' }}>
                  ⚠️ Worst Case
                </h4>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>{details.worstCase}</p>
              </div>
            </div>

            {/* Real World Example */}
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                borderRadius: '0.5rem',
                border: '1px solid rgba(56, 189, 248, 0.3)',
              }}
            >
              <h4 style={{ color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>
                🌍 Real World Example
              </h4>
              <p style={{ margin: 0 }}>{details.realWorldExample}</p>
            </div>

            {/* Learning Tip */}
            <div
              style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: 'rgba(168, 85, 247, 0.1)',
                borderRadius: '0.5rem',
                border: '1px solid rgba(168, 85, 247, 0.3)',
              }}
            >
              <p style={{ margin: 0, fontSize: '0.9rem' }}>
                <strong>💡 Tip:</strong> Pay attention to the highlighted line in the pseudocode as you watch the
                visualization. See exactly which operation is being performed at each step!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export const AlgorithmDetails = memo(AlgorithmDetailsImpl)
