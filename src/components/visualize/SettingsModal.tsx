import { memo } from 'react'

interface SettingsModalProps {
  open: boolean
  arraySize: number
  speed: number
  customArray: string
  sortOrder?: 'ascending' | 'descending'
  requiresSortedArray?: boolean
  onArraySizeChange: (size: number) => void
  onSpeedChange: (speed: number) => void
  onCustomArrayChange: (value: string) => void
  onSortOrderChange?: (order: 'ascending' | 'descending') => void
  onApply: () => void
  onCancel: () => void
}

function SettingsModalImpl({
  open,
  arraySize,
  speed,
  customArray,
  sortOrder = 'ascending',
  requiresSortedArray,
  onArraySizeChange,
  onSpeedChange,
  onCustomArrayChange,
  onSortOrderChange,
  onApply,
  onCancel,
}: SettingsModalProps) {
  if (!open) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(2, 2, 8, 0.75)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div className="glass-panel" style={{
        padding: '2rem',
        maxWidth: '500px',
        width: '90%',
      }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.4rem', fontWeight: '800' }}>Settings</h2>

        {/* Array Size */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '600' }}>
            Array Size: {arraySize}
          </label>
          <input
            type="range"
            min="5"
            max="50"
            value={arraySize}
            onChange={(e) => onArraySizeChange(Number(e.target.value))}
          />
        </div>

        {/* Speed */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '600' }}>
            Speed: {speed}%
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
          />
        </div>

        {/* Custom Array */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '600' }}>
            Custom Array (comma-separated)
          </label>
          <textarea
            value={customArray}
            onChange={(e) => onCustomArrayChange(e.target.value)}
            placeholder="e.g., 5, 3, 8, 1, 9"
            className="rich-textarea"
            style={{ minHeight: '80px', resize: 'vertical' }}
          />
        </div>

        {/* Sort Order - Only for algorithms that require sorted arrays */}
        {requiresSortedArray && (
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '600' }}>
              Sort Order
            </label>
            <select
              value={sortOrder}
              onChange={(e) => onSortOrderChange?.(e.target.value as 'ascending' | 'descending')}
              className="rich-select"
            >
              <option value="ascending">Ascending (A-Z)</option>
              <option value="descending">Descending (Z-A)</option>
            </select>
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            className="btn-primary"
            onClick={onApply}
            style={{ flex: 1 }}
          >
            Apply
          </button>
          <button
            className="btn-secondary"
            onClick={onCancel}
            style={{ flex: 1 }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export const SettingsModal = memo(SettingsModalImpl)
