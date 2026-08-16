import { Header } from '../components/Header'
import { AlgorithmTree } from '../components/Visualizers/AlgorithmTree'
import { MetricsCharts } from '../components/Visualizers/MetricsCharts'
import { TreemapChart } from '../components/Visualizers/TreemapChart'

export function VisualizersDashboard() {
  return (
    <div>
      <Header />
      <main style={{
        minHeight: 'calc(100vh - 100px)',
        backgroundColor: '#111827',
        color: 'white',
        padding: '32px'
      }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Page Title */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '2.25rem',
            fontWeight: 'bold',
            marginBottom: '8px',
            color: 'white'
          }}>
            Algorithm Visualizers Dashboard
          </h1>
          <p style={{
            color: '#9ca3af',
            fontSize: '1rem'
          }}>
            Explore all algorithms with metrics, treemap, and hierarchical organization
          </p>
        </div>

        {/* Treemap Section */}
        <div style={{ marginBottom: '32px' }}>
          <TreemapChart />
        </div>

        {/* Tree and Metrics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '32px',
          marginBottom: '32px'
        }}>
          {/* Left Sidebar - Tree Structure */}
          <div>
            <AlgorithmTree />
          </div>

          {/* Right Content - Metrics */}
          <div>
            <MetricsCharts />
          </div>
        </div>
      </div>
      </main>
    </div>
  )
}
