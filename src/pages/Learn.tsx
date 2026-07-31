import { useState } from 'react'
import '../style.css'

export function Learn() {
  const [expandedSection, setExpandedSection] = useState<string | null>('intro')

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div>
      {/* Header */}
      <header>
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <div className="logo-icon">∑</div>
              <h1>Visualize DSA</h1>
            </div>
            <nav>
              <a href="/">Home</a>
              <a href="#learn" className="active">Learn</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container">
        <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
          <h2 className="hero-title">Learn Algorithms & Data Structures</h2>
          <p className="hero-subtitle">Understand how algorithms work with interactive visualizations</p>
        </div>

        {/* Introduction Section */}
        <div className="glass-panel" style={{ marginBottom: '2rem', padding: '2rem' }}>
          <div
            onClick={() => toggleSection('intro')}
            style={{
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', margin: 0 }}>
              📚 What are Algorithms?
            </h3>
            <span style={{ fontSize: '1.5rem' }}>
              {expandedSection === 'intro' ? '−' : '+'}
            </span>
          </div>

          {expandedSection === 'intro' && (
            <div style={{ marginTop: '1.5rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
              <p>
                An <strong>algorithm</strong> is a step-by-step procedure for solving a problem or
                accomplishing a task. In computer science, algorithms are the fundamental building
                blocks of efficient software.
              </p>

              <h4 style={{ color: 'var(--text-primary)', marginTop: '1rem' }}>
                Why Learn Algorithms?
              </h4>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li>
                  <strong>Performance:</strong> Good algorithms solve problems faster and use less
                  memory
                </li>
                <li>
                  <strong>Problem-solving:</strong> Learn different techniques to tackle various
                  problems
                </li>
                <li>
                  <strong>Interviews:</strong> Algorithm knowledge is crucial for tech job interviews
                </li>
                <li>
                  <strong>Real-world applications:</strong> Used in everything from search engines to
                  GPS navigation
                </li>
              </ul>

              <h4 style={{ color: 'var(--text-primary)', marginTop: '1rem' }}>
                How to Use This Visualizer
              </h4>
              <ol style={{ paddingLeft: '1.5rem' }}>
                <li>
                  <strong>Select an algorithm</strong> from the Home page (Sorting or Searching)
                </li>
                <li>
                  <strong>Customize the array</strong> using Settings (size, custom values, sort
                  order)
                </li>
                <li>
                  <strong>Play the visualization</strong> to see the algorithm in action
                </li>
                <li>
                  <strong>Step through</strong> each operation with detailed variable tracking
                </li>
                <li>
                  <strong>Read the pseudocode</strong> to understand the exact logic
                </li>
              </ol>
            </div>
          )}
        </div>

        {/* Sorting Algorithms Section */}
        <div className="glass-panel" style={{ marginBottom: '2rem', padding: '2rem' }}>
          <div
            onClick={() => toggleSection('sorting')}
            style={{
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', margin: 0 }}>
              🔄 Sorting Algorithms
            </h3>
            <span style={{ fontSize: '1.5rem' }}>
              {expandedSection === 'sorting' ? '−' : '+'}
            </span>
          </div>

          {expandedSection === 'sorting' && (
            <div style={{ marginTop: '1.5rem' }}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                Sorting algorithms arrange elements in a specific order (usually ascending or
                descending). They're fundamental in computer science and have many real-world
                applications.
              </p>

              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ color: 'var(--accent-blue)', marginBottom: '1rem' }}>
                  🟢 Beginner Level
                </h4>
                <div style={{ paddingLeft: '1rem', borderLeft: '3px solid var(--accent-blue)' }}>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    <strong>Bubble Sort:</strong> Repeatedly compares adjacent elements and swaps
                    them if they're in the wrong order. Simple to understand but slow for large
                    datasets (O(n²) time complexity).
                  </p>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    <strong>Selection Sort:</strong> Finds the minimum element and places it at the
                    beginning, then repeats for the remaining array. Also O(n²) but with fewer
                    swaps than bubble sort.
                  </p>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    <strong>Insertion Sort:</strong> Builds the sorted array one item at a time by
                    inserting elements into their correct position. Efficient for small arrays and
                    nearly sorted data.
                  </p>
                </div>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ color: 'var(--accent-violet)', marginBottom: '1rem' }}>
                  🟡 Intermediate Level
                </h4>
                <div style={{ paddingLeft: '1rem', borderLeft: '3px solid var(--accent-violet)' }}>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                    <strong>Merge Sort:</strong> Divide-and-conquer algorithm that splits the array
                    in half recursively, then merges sorted subarrays. Stable and O(n log n) time
                    complexity, but requires extra space.
                  </p>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    <strong>Quick Sort:</strong> Divides array using a pivot element, recursively
                    sorts partitions. Average O(n log n) but worst-case O(n²). Very efficient in
                    practice.
                  </p>
                </div>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ color: 'var(--accent-pink)', marginBottom: '1rem' }}>
                  🔴 Advanced Level
                </h4>
                <div style={{ paddingLeft: '1rem', borderLeft: '3px solid var(--accent-pink)' }}>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    <strong>Heap Sort, Shell Sort, Counting Sort:</strong> Advanced techniques
                    optimized for specific scenarios. Used in production systems for their
                    guaranteed performance bounds.
                  </p>
                </div>
              </div>

              <div
                style={{
                  marginTop: '2rem',
                  padding: '1rem',
                  backgroundColor: 'rgba(56, 189, 248, 0.1)',
                  borderRadius: '0.5rem',
                }}
              >
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                  <strong>💡 Tip:</strong> Watch the visualization while reading the pseudocode on
                  the right. Notice how the "comparing" (yellow) and "swapping" (pink) states show
                  exactly which elements are being processed.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Searching Algorithms Section */}
        <div className="glass-panel" style={{ marginBottom: '2rem', padding: '2rem' }}>
          <div
            onClick={() => toggleSection('searching')}
            style={{
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', margin: 0 }}>
              🔍 Searching Algorithms
            </h3>
            <span style={{ fontSize: '1.5rem' }}>
              {expandedSection === 'searching' ? '−' : '+'}
            </span>
          </div>

          {expandedSection === 'searching' && (
            <div style={{ marginTop: '1.5rem' }}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                Searching algorithms find a specific element in a collection. The choice of
                algorithm depends on whether the data is sorted and how often you need to search.
              </p>

              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ color: 'var(--accent-blue)', marginBottom: '1rem' }}>
                  🟢 Beginner: Linear Search
                </h4>
                <div style={{ paddingLeft: '1rem', borderLeft: '3px solid var(--accent-blue)' }}>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    <strong>How it works:</strong> Check each element one by one until you find the
                    target.
                  </p>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    <strong>Time Complexity:</strong> O(n) - must check every element in worst case
                  </p>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    <strong>Use case:</strong> Works on unsorted arrays. Simple but slow for large
                    datasets.
                  </p>
                </div>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ color: 'var(--accent-violet)', marginBottom: '1rem' }}>
                  🟡 Intermediate: Binary Search
                </h4>
                <div style={{ paddingLeft: '1rem', borderLeft: '3px solid var(--accent-violet)' }}>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    <strong>How it works:</strong> Split the sorted array in half. If the target is
                    smaller than the middle, search the left half; otherwise search the right half.
                    Repeat until found.
                  </p>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    <strong>Time Complexity:</strong> O(log n) - eliminates half the elements each
                    step
                  </p>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    <strong>Requirement:</strong> Array must be sorted! That's why you see sort
                    order options.
                  </p>
                </div>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ color: 'var(--accent-pink)', marginBottom: '1rem' }}>
                  🔴 Advanced: Jump Search & Exponential Search
                </h4>
                <div style={{ paddingLeft: '1rem', borderLeft: '3px solid var(--accent-pink)' }}>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    <strong>Jump Search:</strong> Jump forward by fixed intervals, then linear
                    search the block containing the target. Good balance between linear and binary
                    search.
                  </p>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    <strong>Exponential Search:</strong> Find a range by doubling the search space,
                    then binary search within that range. Efficient for unbounded arrays.
                  </p>
                </div>
              </div>

              <div
                style={{
                  marginTop: '2rem',
                  padding: '1rem',
                  backgroundColor: 'rgba(56, 189, 248, 0.1)',
                  borderRadius: '0.5rem',
                }}
              >
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                  <strong>💡 Key Insight:</strong> Binary search is 1,000x faster than linear search
                  for large sorted arrays! Searching 1 million items takes ~20 steps with binary
                  search vs 500,000 steps with linear search.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Complexity Analysis Section */}
        <div className="glass-panel" style={{ marginBottom: '2rem', padding: '2rem' }}>
          <div
            onClick={() => toggleSection('complexity')}
            style={{
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', margin: 0 }}>
              ⏱️ Time & Space Complexity
            </h3>
            <span style={{ fontSize: '1.5rem' }}>
              {expandedSection === 'complexity' ? '−' : '+'}
            </span>
          </div>

          {expandedSection === 'complexity' && (
            <div style={{ marginTop: '1.5rem' }}>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
                What is Big O Notation?
              </h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                Big O describes how an algorithm's performance scales as the input size grows. It
                helps predict which algorithm will be faster for large datasets.
              </p>

              <div
                style={{
                  marginTop: '1.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  fontFamily: 'SF Mono, Monaco, monospace',
                  fontSize: '0.85rem',
                  color: 'var(--accent-blue)',
                }}
              >
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Common complexities (fastest to slowest):</strong>
                </p>
                <p style={{ marginBottom: '0.3rem' }}>O(1) - Constant</p>
                <p style={{ marginBottom: '0.3rem' }}>O(log n) - Logarithmic (binary search)</p>
                <p style={{ marginBottom: '0.3rem' }}>O(n) - Linear (linear search)</p>
                <p style={{ marginBottom: '0.3rem' }}>O(n log n) - Linearithmic (merge sort)</p>
                <p style={{ marginBottom: '0.3rem' }}>O(n²) - Quadratic (bubble sort)</p>
                <p>O(2ⁿ) - Exponential (very slow!)</p>
              </div>

              <div
                style={{
                  marginTop: '1.5rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1rem',
                }}
              >
                <div
                  style={{
                    padding: '1rem',
                    backgroundColor: 'rgba(52, 211, 153, 0.1)',
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(52, 211, 153, 0.3)',
                  }}
                >
                  <p style={{ color: 'var(--state-sorted)', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    Time Complexity
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    How the number of operations grows with input size. Shown for best, average, and worst cases.
                  </p>
                </div>
                <div
                  style={{
                    padding: '1rem',
                    backgroundColor: 'rgba(168, 85, 247, 0.1)',
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                  }}
                >
                  <p
                    style={{
                      color: 'var(--accent-purple)',
                      fontWeight: 'bold',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Space Complexity
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    How much extra memory the algorithm needs. Important for large datasets.
                  </p>
                </div>
              </div>

              <div
                style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  backgroundColor: 'rgba(56, 189, 248, 0.1)',
                  borderRadius: '0.5rem',
                }}
              >
                <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                  <strong>💡 In the visualizer:</strong> Each algorithm shows its time and space
                  complexity in the top-right corner. Use this to compare different algorithms for
                  the same problem!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="glass-panel" style={{ marginBottom: '2rem', padding: '2rem' }}>
          <div
            onClick={() => toggleSection('tips')}
            style={{
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', margin: 0 }}>
              💡 Learning Tips
            </h3>
            <span style={{ fontSize: '1.5rem' }}>
              {expandedSection === 'tips' ? '−' : '+'}
            </span>
          </div>

          {expandedSection === 'tips' && (
            <div style={{ marginTop: '1.5rem' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                <div
                  style={{
                    padding: '1.5rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <h4 style={{ color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>
                    1. Start Small
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                    Begin with small arrays (5-10 elements) to understand the logic before testing
                    on larger datasets.
                  </p>
                </div>

                <div
                  style={{
                    padding: '1.5rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <h4 style={{ color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>
                    2. Read the Code
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                    The pseudocode on the right shows exactly what the algorithm is doing. Match the
                    highlighted lines with the visual changes.
                  </p>
                </div>

                <div
                  style={{
                    padding: '1.5rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <h4 style={{ color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>
                    3. Watch Variables
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                    Pay attention to variable values in the bottom-right. See how "i", "j", and
                    other variables change as the algorithm progresses.
                  </p>
                </div>

                <div
                  style={{
                    padding: '1.5rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <h4 style={{ color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>
                    4. Compare Algorithms
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                    Run the same array through different algorithms. Count the operations and
                    compare time complexity.
                  </p>
                </div>

                <div
                  style={{
                    padding: '1.5rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <h4 style={{ color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>
                    5. Use Custom Arrays
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                    Test with specific cases: already sorted, reverse sorted, or with duplicates. See
                    how algorithms handle edge cases.
                  </p>
                </div>

                <div
                  style={{
                    padding: '1.5rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <h4 style={{ color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>
                    6. Adjust Speed
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                    Slow down the animation to follow each step carefully, or speed it up to see the
                    overall pattern.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div className="glass-panel" style={{ marginBottom: '2rem', padding: '2rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '1rem' }}>
            🚀 Ready to Learn?
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            Head to the Home page and select an algorithm to visualize. Start with simple algorithms
            like Bubble Sort or Linear Search, then progress to more complex ones like Merge Sort or
            Binary Search.
          </p>
          <a
            href="/"
            style={{
              display: 'inline-block',
              padding: '0.75rem 2rem',
              backgroundColor: 'var(--accent-blue)',
              color: '#05050d',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '700',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            → Go to Home & Start Learning
          </a>
        </div>
      </main>
    </div>
  )
}
