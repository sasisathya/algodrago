import { MarketView } from '../components/Visualizers/MarketView'

export function Market() {
  return (
    <div style={{
      backgroundColor: '#111827',
      color: 'white',
      padding: '32px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <MarketView />
      </div>
    </div>
  )
}
