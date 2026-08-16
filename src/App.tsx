import { useState, useEffect } from 'react'
import { Home } from './pages/Home'
import { Visualize } from './pages/Visualize'
import { VisualizersDashboard } from './pages/VisualizersDashboard'
import { Market } from './pages/Market'
import './style.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [algorithmId, setAlgorithmId] = useState('')

  useEffect(() => {
    // Handle URL changes
    const handlePopState = () => {
      const path = window.location.pathname
      if (path === '/market') {
        setCurrentPage('market')
      } else if (path === '/visualizers') {
        setCurrentPage('visualizers')
      } else if (path.startsWith('/visualize/')) {
        const id = path.replace('/visualize/', '')
        setAlgorithmId(id)
        setCurrentPage('visualize')
      } else {
        setCurrentPage('home')
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
            window.history.pushState({}, '', href)
          } else if (href === '/visualizers') {
            e.preventDefault()
            setCurrentPage('visualizers')
            window.history.pushState({}, '', href)
          } else if (href.startsWith('/visualize/')) {
            e.preventDefault()
            const id = href.replace('/visualize/', '')
            setAlgorithmId(id)
            setCurrentPage('visualize')
            window.history.pushState({}, '', href)
          } else if (href === '/') {
            e.preventDefault()
            setCurrentPage('home')
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
    <div>
      {currentPage === 'home' ? (
        <Home />
      ) : currentPage === 'market' ? (
        <Market />
      ) : currentPage === 'visualizers' ? (
        <VisualizersDashboard />
      ) : (
        <Visualize algorithmId={algorithmId} />
      )}
    </div>
  )
}

export default App
