import { useState, useEffect, useRef } from 'react'
import { algorithms } from '../data/algorithms.ts'
import '../style.css'

export function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Levels')
  const [selectedType, setSelectedType] = useState('All Types')
  const sortingCarouselRef = useRef<HTMLDivElement>(null)
  const searchingCarouselRef = useRef<HTMLDivElement>(null)
  const graphCarouselRef = useRef<HTMLDivElement>(null)
  const treeCarouselRef = useRef<HTMLDivElement>(null)
  const divideConquerCarouselRef = useRef<HTMLDivElement>(null)

  const sortingAutoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const searchingAutoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const graphAutoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const treeAutoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const divideConquerAutoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const sortingIdleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const searchingIdleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const graphIdleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const treeIdleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const divideConquerIdleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const sortingIsAutoScrollingRef = useRef(true)
  const searchingIsAutoScrollingRef = useRef(true)
  const graphIsAutoScrollingRef = useRef(true)
  const treeIsAutoScrollingRef = useRef(true)
  const divideConquerIsAutoScrollingRef = useRef(true)

  const filteredAlgorithms = algorithms.filter(algo => {
    const matchesSearch = algo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      algo.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All Categories' || algo.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'All Levels' || algo.difficulty === selectedDifficulty.toLowerCase()
    const matchesType = selectedType === 'All Types' || algo.type === selectedType

    return matchesSearch && matchesCategory && matchesDifficulty && matchesType
  })

  // Separate algorithms by category
  const sortingAlgorithms = filteredAlgorithms.filter(algo => algo.category === 'Sorting')
  const searchingAlgorithms = filteredAlgorithms.filter(algo => algo.category === 'Searching')
  const graphAlgorithms = filteredAlgorithms.filter(algo => algo.category === 'Graph')
  const treeAlgorithms = filteredAlgorithms.filter(algo => algo.category === 'Tree')
  const divideConquerAlgorithms = filteredAlgorithms.filter(algo => algo.category === 'Divide & Conquer')

  // Get unique categories and types
  const categories = ['All Categories', ...new Set(algorithms.map(a => a.category))]
  const types = ['All Types', ...new Set(algorithms.map(a => a.type))]

  // Setup auto-scroll for a carousel
  const setupCarouselAutoScroll = (
    carouselRef: React.RefObject<HTMLDivElement>,
    autoScrollRef: React.MutableRefObject<ReturnType<typeof setInterval> | null>,
    isAutoScrollingRef: React.MutableRefObject<boolean>,
    idleTimeoutRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
  ) => {
    const carousel = carouselRef.current
    if (!carousel) return

    const scroll = () => {
      if (!carousel || !isAutoScrollingRef.current) return
      const maxScroll = carousel.scrollWidth - carousel.clientWidth
      carousel.scrollLeft += 2
      if (carousel.scrollLeft >= maxScroll) {
        carousel.scrollLeft = 0
      }
    }

    autoScrollRef.current = setInterval(scroll, 30)

    const handleUserInteraction = () => {
      isAutoScrollingRef.current = false
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current)
      idleTimeoutRef.current = setTimeout(() => {
        isAutoScrollingRef.current = true
      }, 5000)
    }

    carousel.addEventListener('scroll', handleUserInteraction)
    carousel.addEventListener('wheel', handleUserInteraction)
    carousel.addEventListener('touchstart', handleUserInteraction)

    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current)
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current)
      carousel.removeEventListener('scroll', handleUserInteraction)
      carousel.removeEventListener('wheel', handleUserInteraction)
      carousel.removeEventListener('touchstart', handleUserInteraction)
    }
  }

  // Auto-scroll sorting carousel
  useEffect(() => {
    return setupCarouselAutoScroll(sortingCarouselRef, sortingAutoScrollRef, sortingIsAutoScrollingRef, sortingIdleTimeoutRef)
  }, [])

  // Auto-scroll searching carousel
  useEffect(() => {
    return setupCarouselAutoScroll(searchingCarouselRef, searchingAutoScrollRef, searchingIsAutoScrollingRef, searchingIdleTimeoutRef)
  }, [])

  // Auto-scroll graph carousel
  useEffect(() => {
    return setupCarouselAutoScroll(graphCarouselRef, graphAutoScrollRef, graphIsAutoScrollingRef, graphIdleTimeoutRef)
  }, [])

  // Auto-scroll tree carousel
  useEffect(() => {
    return setupCarouselAutoScroll(treeCarouselRef, treeAutoScrollRef, treeIsAutoScrollingRef, treeIdleTimeoutRef)
  }, [])

  // Auto-scroll divide and conquer carousel
  useEffect(() => {
    return setupCarouselAutoScroll(divideConquerCarouselRef, divideConquerAutoScrollRef, divideConquerIsAutoScrollingRef, divideConquerIdleTimeoutRef)
  }, [])

  const AlgorithmCard = ({ algo }: { algo: any }) => (
    <a
      key={algo.id}
      href={`/visualize/${algo.id}`}
      style={{
        textDecoration: 'none',
        flex: '0 0 380px',
        scrollSnapAlign: 'start',
      }}
    >
      <div className="card" style={{ height: '100%', cursor: 'pointer' }}>
        <div className="algorithm-title">
          <h3>{algo.name}</h3>
          <span className={`badge badge-${algo.difficulty}`}>{algo.difficulty}</span>
          <span className="badge badge-array">{algo.type}</span>
        </div>

        <p className="algorithm-description">
          {algo.description}
        </p>

        <div className="complexity">
          <div className="complexity-item">
            <span className="complexity-label">⏱ Time:</span>
            <span className="complexity-value">{algo.timeComplexity}</span>
          </div>
          <div className="complexity-item">
            <span className="complexity-label">💾 Space:</span>
            <span className="complexity-value">{algo.spaceComplexity}</span>
          </div>
        </div>

        <div className="tags">
          {algo.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </a>
  )

  const AlgorithmSection = ({
    title,
    icon,
    algoList,
    carouselRef,
  }: {
    title: string
    icon: string
    algoList: any[]
    carouselRef: React.RefObject<HTMLDivElement>
  }) => (
    <div style={{ marginTop: '4rem' }}>
      <div className="section-title">
        <div className="section-icon">{icon}</div>
        <h2>{title}</h2>
      </div>
      <p className="section-subtitle">{algoList.length} algorithm{algoList.length !== 1 ? 's' : ''}</p>

      <div
        ref={carouselRef}
        style={{
          display: 'flex',
          gap: '1.5rem',
          overflowX: 'auto',
          overflowY: 'hidden',
          paddingBottom: '0.75rem',
          marginBottom: '3rem',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory',
        }}
      >
        {algoList.map((algo) => (
          <AlgorithmCard key={algo.id} algo={algo} />
        ))}
      </div>

      {algoList.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          color: 'var(--text-muted)',
        }}>
          <p>No {title.toLowerCase()} found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  )

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
              <a href="/" className="active">Home</a>
              <a href="#visualizers">Visualizers</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container">
        {/* Welcome Section */}
        <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
          <h2 className="hero-title">Algorithm Visualizer</h2>
          <p className="hero-subtitle">Explore and understand data structures and algorithms through interactive visualizations</p>
        </div>

        {/* Filters & Search */}
        <div className="glass-panel" style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2rem' }}>
            <span style={{ fontSize: '1.25rem' }}>🔍</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Filters &amp; Search</h3>
          </div>

          {/* Search Bar */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 500 }}>
              Search
            </label>
            <input
              type="text"
              placeholder="Search algorithms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rich-input"
            />
          </div>

          {/* Filter Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}>
            {/* Category */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 500 }}>
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rich-select"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 500 }}>
                Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="rich-select"
              >
                <option>All Levels</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 500 }}>
                Visualization
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="rich-select"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Sorting Algorithms Section */}
        <div>
          <div className="section-title">
            <div className="section-icon">📊</div>
            <h2>Sorting Algorithms</h2>
          </div>
          <p className="section-subtitle">{sortingAlgorithms.length} algorithm{sortingAlgorithms.length !== 1 ? 's' : ''}</p>

          <div
            ref={sortingCarouselRef}
            style={{
              display: 'flex',
              gap: '1.5rem',
              overflowX: 'auto',
              overflowY: 'hidden',
              paddingBottom: '0.75rem',
              marginBottom: '3rem',
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x mandatory',
            }}
          >
            {sortingAlgorithms.map((algo) => (
              <AlgorithmCard key={algo.id} algo={algo} />
            ))}
          </div>

          {sortingAlgorithms.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              color: 'var(--text-muted)',
            }}>
              <p>No sorting algorithms found. Try adjusting your filters.</p>
            </div>
          )}
        </div>

        {/* Searching Algorithms Section */}
        <AlgorithmSection
          title="Searching Algorithms"
          icon="🔍"
          algoList={searchingAlgorithms}
          carouselRef={searchingCarouselRef}
        />

        {/* Graph Algorithms Section */}
        <AlgorithmSection
          title="Graph Algorithms"
          icon="🔗"
          algoList={graphAlgorithms}
          carouselRef={graphCarouselRef}
        />

        {/* Tree Algorithms Section */}
        <AlgorithmSection
          title="Tree Algorithms"
          icon="🌳"
          algoList={treeAlgorithms}
          carouselRef={treeCarouselRef}
        />

        {/* Divide & Conquer Section */}
        <AlgorithmSection
          title="Divide & Conquer Algorithms"
          icon="🔀"
          algoList={divideConquerAlgorithms}
          carouselRef={divideConquerCarouselRef}
        />
      </main>
    </div>
  )
}
