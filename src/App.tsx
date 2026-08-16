import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { Visualize } from './pages/Visualize'
import { VisualizersDashboard } from './pages/VisualizersDashboard'
import { Market } from './pages/Market'
import './style.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [algorithmId, setAlgorithmId] = useState('')
  const [referrerPage, setReferrerPage] = useState('home')

  useEffect(() => {
    // Handle URL changes
    const handlePopState = () => {
      const path = window.location.pathname
      const params = new URLSearchParams(window.location.search)
      const from = params.get('from') || 'home'

      if (path === '/market') {
        setCurrentPage('market')
        setReferrerPage('market')
      } else if (path === '/visualizers') {
        setCurrentPage('visualizers')
        setReferrerPage('visualizers')
      } else if (path.startsWith('/visualize/')) {
        const id = path.replace('/visualize/', '')
        setAlgorithmId(id)
        setCurrentPage('visualize')
        setReferrerPage(from)
      } else {
        setCurrentPage('home')
        setReferrerPage('home')
      }
    }

    // Set initial page based on URL
    handlePopState()

    // Listen for browser back/forward
    window.addEventListener('popstate', handlePopState)

    // Listen for link clicks
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A') {
        const href = target.getAttribute('href')
        if (href) {
          if (href === '/market') {
            e.preventDefault()
            setCurrentPage('market')
            setReferrerPage('market')
            window.history.pushState({}, '', href)
          } else if (href === '/visualizers') {
            e.preventDefault()
            setCurrentPage('visualizers')
            setReferrerPage('visualizers')
            window.history.pushState({}, '', href)
          } else if (href.startsWith('/visualize/')) {
            e.preventDefault()
            const id = href.replace(/\/visualize\//, '').split('?')[0]
            const params = new URLSearchParams(window.location.search)
            const from = params.get('from') || 'home'
            setAlgorithmId(id)
            setCurrentPage('visualize')
            setReferrerPage(from)
            window.history.pushState({}, '', href)
          } else if (href === '/') {
            e.preventDefault()
            setCurrentPage('home')
            setReferrerPage('home')
            window.history.pushState({}, '', '/')
          }
        }
      }
    }

    document.addEventListener('click', handleLinkClick)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      document.removeEventListener('click', handleLinkClick)
    }
  }, [])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        {currentPage === 'home' ? (
          <Home />
        ) : currentPage === 'market' ? (
          <Market />
        ) : currentPage === 'visualizers' ? (
          <VisualizersDashboard />
        ) : (
          <Visualize algorithmId={algorithmId} referrerPage={referrerPage} />
        )}
      </main>
    </div>
  )
}

export default App
