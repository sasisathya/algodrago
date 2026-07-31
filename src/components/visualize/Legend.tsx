import { memo } from 'react'

function LegendImpl() {
  return (
    <div className="glass-panel" style={{ padding: '1.25rem' }}>
      <h3 style={{ fontSize: '0.875rem', fontWeight: '800', color: 'var(--text-secondary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        Legend
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <div className="legend-color" style={{ backgroundColor: 'var(--state-comparing)', color: 'var(--state-comparing)', marginTop: '3px' }}></div>
          <div>
            <div style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: '600' }}>Comparing</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Elements being compared</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <div className="legend-color" style={{ backgroundColor: 'var(--state-swapping)', color: 'var(--state-swapping)', marginTop: '3px' }}></div>
          <div>
            <div style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: '600' }}>Swapping</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Elements being swapped</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <div className="legend-color" style={{ backgroundColor: 'var(--state-sorted)', color: 'var(--state-sorted)', marginTop: '3px' }}></div>
          <div>
            <div style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: '600' }}>Sorted</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Elements in final position</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <div className="legend-color" style={{ backgroundColor: 'var(--state-unsorted)', color: 'var(--state-unsorted)', marginTop: '3px' }}></div>
          <div>
            <div style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: '600' }}>Unsorted</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Elements not yet processed</div>
          </div>
        </div>
      </div>

      {/* How to read */}
      <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', lineHeight: '1.7' }}>
          <div style={{ fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>How to read the visualization:</div>
          <div>• Numbers show element values</div>
          <div>• Watch colors change as algorithm runs</div>
          <div>• Green elements are fully sorted</div>
        </div>
      </div>
    </div>
  )
}

export const Legend = memo(LegendImpl)
