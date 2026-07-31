# Algorithm Visualizer - Complete Roadmap

## Currently Implemented ✅

### Sorting Algorithms (15)
- ✅ Bubble Sort
- ✅ Selection Sort
- ✅ Insertion Sort
- ✅ Merge Sort
- ✅ Quick Sort
- ✅ Heap Sort
- ✅ Shell Sort
- ✅ Counting Sort
- ✅ Radix Sort
- ✅ Bucket Sort
- ✅ Cocktail Sort
- ✅ Comb Sort
- ✅ Cycle Sort
- ✅ Gnome Sort
- ✅ Tim Sort

### Searching Algorithms (4)
- ✅ Linear Search
- ✅ Binary Search
- ✅ Jump Search
- ✅ Exponential Search

---

## Available to Add

### 🔴 Sorting Algorithms (Not Yet Added)

#### Beginner Level
1. **Bogosort** (Random/Stupid Sort)
   - Randomly shuffles array and checks if sorted
   - Worst: O(n·n!) - extremely inefficient
   - Best for: Educational/Fun demonstrations
   - Difficulty: ⭐ Easy to understand

2. **Pancake Sort**
   - Sorts by flipping (reversing) segments
   - Interesting visual demonstration
   - Time: O(n²)

#### Intermediate Level
3. **Bitonic Sort**
   - Parallel sorting algorithm
   - Good for GPU visualization
   - Time: O(log² n) with parallelization

4. **Odd-Even Sort**
   - Comparison-based sorting
   - Works similarly to bubble sort
   - Time: O(n²)

5. **Stooge Sort**
   - Recursive sorting algorithm
   - Very inefficient but interesting
   - Time: O(n^2.7)

#### Advanced Level
6. **Sleep Sort**
   - Uses timing/threads (educational)
   - Not practical but fun

7. **Pigeonhole Sort**
   - Non-comparison sort
   - Requires specific conditions

---

### 🔵 Searching Algorithms (Not Yet Added)

#### Intermediate Level
1. **Interpolation Search**
   - Smarter than binary search
   - Estimates position based on value
   - Time: O(log log n) average, O(n) worst
   - Best for: Uniformly distributed data
   - Visual: Shows how it jumps to likely positions

2. **Ternary Search**
   - Divides array into 3 parts instead of 2
   - Time: O(log₃ n)
   - Visual: Nice comparison with binary search

3. **Fibonacci Search**
   - Uses Fibonacci numbers for positions
   - Similar to binary search
   - Time: O(log n)

#### Advanced Level
4. **Exponential Search (improved versions)**
5. **Meta-Binary Search**

---

### 🟢 Graph Algorithms (New Category)

#### Beginner Level
1. **BFS (Breadth-First Search)**
   - Level-by-level traversal
   - Visual: Queue-based exploration
   - Use case: Shortest path, level order

2. **DFS (Depth-First Search)**
   - Deep exploration first
   - Visual: Stack-based backtracking
   - Use case: Path finding, topological sort

#### Intermediate Level
3. **Dijkstra's Algorithm**
   - Shortest path in weighted graphs
   - Visual: Step-by-step distance updates
   - Time: O((V + E) log V)

4. **BFS/DFS with Path Finding**
   - Visualize path discovery
   - Show visited vs unvisited nodes

#### Advanced Level
5. **Bellman-Ford Algorithm**
   - Handles negative weights
   - Time: O(VE)

6. **Floyd-Warshall Algorithm**
   - All-pairs shortest path
   - Time: O(V³)

7. **A* Algorithm**
   - Heuristic-based pathfinding
   - Visual: Show open/closed sets

8. **Kruskal's Algorithm**
   - Minimum spanning tree
   - Visual: Edge selection process

9. **Prim's Algorithm**
   - Alternative MST algorithm
   - Nice comparison with Kruskal's

10. **Topological Sort**
    - DAG ordering
    - Visual: Dependency resolution

---

### 🟣 Tree Algorithms (New Category)

#### Beginner Level
1. **Binary Tree Traversals**
   - Inorder, Preorder, Postorder
   - Level Order (BFS)
   - Visual: Path highlighting

2. **Tree Insertion/Deletion**
   - Basic Binary Search Tree ops
   - Visual: Node movement and rebalancing

#### Intermediate Level
3. **AVL Tree Balancing**
   - Self-balancing rotations
   - Visual: Show LL, LR, RL, RR rotations
   - Time: O(log n)

4. **Red-Black Tree Operations**
   - Color-based balancing
   - More visual than AVL

5. **Heap Operations**
   - Min/Max heap
   - Insertion, deletion, heapify
   - Visual: Bubble up/down animations

#### Advanced Level
6. **B-Tree Operations**
   - Multi-way trees
   - Used in databases
   - Visual: Node splitting/merging

7. **Trie Data Structure**
   - Prefix tree visualization
   - Auto-complete demonstration
   - Visual: Character-by-character path

---

### 🟠 String Algorithms (New Category)

#### Intermediate Level
1. **KMP (Knuth-Morris-Pratt)**
   - Pattern matching
   - Visual: LPS array building
   - Time: O(n + m)

2. **Boyer-Moore**
   - Fast pattern matching
   - Visual: Character skipping
   - Often faster than KMP

3. **Rabin-Karp**
   - Hash-based pattern matching
   - Rolling hash visualization
   - Time: O(n + m)

#### Advanced Level
4. **Z-Algorithm**
   - Linear pattern matching
   - Z-array building
   - Time: O(n)

5. **Aho-Corasick**
   - Multiple pattern matching
   - Complex but powerful

---

### 🔶 Array Algorithms (New Category)

#### Beginner Level
1. **Two Pointer Technique**
   - Reverse array
   - Two sum problem
   - Visual: Pointer movement

2. **Sliding Window**
   - Max subarray sum
   - Find substring
   - Visual: Window expansion/contraction

3. **Prefix Sum**
   - Range sum queries
   - Visual: Cumulative sum building

#### Intermediate Level
4. **Binary Search Variations**
   - First/Last occurrence
   - Rotated array search
   - Peak element

5. **Merge Intervals**
   - Overlap detection
   - Visual: Interval merging

6. **Dutch National Flag Problem**
   - 3-way partitioning
   - Visual: Color segregation

---

### 🟡 Backtracking Algorithms (New Category)

#### Beginner Level
1. **N-Queens Problem**
   - Place N queens on board
   - Visual: Conflict detection, placement

2. **Permutations/Combinations**
   - Generate all possibilities
   - Visual: Tree exploration

#### Intermediate Level
3. **Maze Solving**
   - DFS through maze
   - Visual: Path discovery, backtracking

4. **Sudoku Solver**
   - Constraint satisfaction
   - Visual: Cell filling, backtracking

---

### 🔵 Dynamic Programming (New Category)
*Hard to visualize, but possible*

#### Beginner Level
1. **Fibonacci Sequence**
   - Memoization vs Recursion
   - Visual: Dependency tree

2. **Longest Common Subsequence (LCS)**
   - Matrix filling visualization
   - Visual: DP table building

#### Intermediate Level
3. **0/1 Knapsack Problem**
   - Weight-value optimization
   - Visual: DP table

4. **Coin Change Problem**
   - Minimum coins needed
   - Visual: DP progression

5. **Edit Distance (Levenshtein)**
   - String transformation cost
   - Visual: Character alignment

---

## Recommended Priority for Adding

### Phase 1 (Easy - Good Learning Value)
- [ ] Interpolation Search
- [ ] Ternary Search
- [ ] BFS (Graph)
- [ ] DFS (Graph)

### Phase 2 (Intermediate - High Visual Appeal)
- [ ] Dijkstra's Algorithm
- [ ] Binary Tree Traversals
- [ ] Sliding Window
- [ ] KMP Algorithm

### Phase 3 (Advanced - Complex)
- [ ] AVL Tree Rotations
- [ ] A* Algorithm
- [ ] Maze Solving (Backtracking)
- [ ] Trie Data Structure

### Phase 4 (Nice to Have)
- [ ] Pancake Sort
- [ ] Bitonic Sort
- [ ] Red-Black Trees
- [ ] N-Queens Problem

---

## Implementation Difficulty Levels

### 🟢 Easy (1-2 hours each)
- Similar to existing searches/sorts
- Single-pass or simple recursion
- Linear visualization (array-based)

### 🟡 Medium (2-4 hours each)
- Require intermediate data structures (stack, queue)
- Multiple passes or complex comparisons
- 2D visualization (matrix/grid)

### 🔴 Hard (4+ hours each)
- Complex data structures (trees, graphs)
- Advanced recursion/backtracking
- Network/3D visualization
- Heavy state management

---

## Data Structure Visualizations Needed

To implement the above algorithms, we'd need visualizers for:

1. **Graph/Network**
   - Nodes and edges
   - Weighted/unweighted
   - Directed/undirected

2. **Tree**
   - Hierarchical layout
   - Node connections
   - Balance indicators

3. **Matrix/Grid**
   - 2D array display
   - Cell highlighting
   - Color-coded states

4. **String**
   - Character-by-character comparison
   - Pattern matching visualization
   - Pointer tracking

5. **Stack/Queue**
   - LIFO/FIFO visualization
   - Push/Pop animations

---

## Summary Statistics

| Category | Implemented | Available | Total |
|----------|-------------|-----------|-------|
| Sorting | 15 | 7 | 22 |
| Searching | 4 | 4 | 8 |
| Graph | 0 | 10 | 10 |
| Tree | 0 | 7 | 7 |
| String | 0 | 5 | 5 |
| Array | 0 | 6 | 6 |
| Backtracking | 0 | 4 | 4 |
| DP | 0 | 5 | 5 |
| **TOTAL** | **19** | **48** | **67** |

---

## Next Steps

1. **User Request**: Which category interests you most?
2. **Choose Algorithm**: Pick 1-2 algorithms to add next
3. **Create Visualizer**: Build the UI component
4. **Add Details**: Write algorithm explanations
5. **Test**: Verify visualization works correctly

Which algorithms would you like to add next? 🚀
