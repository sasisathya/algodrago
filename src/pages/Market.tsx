import { Header } from '../components/Header'
import { MarketView } from '../components/Visualizers/MarketView'

export function Market() {
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
        <MarketView />
      </div>
      </main>
    </div>
  )
}
