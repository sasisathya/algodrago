import { memo, type CSSProperties } from 'react'

interface ControlsPanelProps {
  algorithmName: string
  isSorting: boolean
  playDisabled: boolean
  stepDisabled: boolean
  arraySize: number
  speed: number
  onPlayPause: () => void
  onStep: () => void
  onReset: () => void
  onRandomize: () => void
  onOpenSettings: () => void
}

function ControlsPanelImpl({
  algorithmName,
  isSorting,
  playDisabled,
  stepDisabled,
  arraySize,
  speed,
  onPlayPause,
  onStep,
  onReset,
  onRandomize,
  onOpenSettings,
}: ControlsPanelProps) {
  return (
    <div>
      {/* Title */}
      <h1 style={{
        fontSize: '2rem',
        fontWeight: '800',
        marginBottom: '2rem',
        letterSpacing: '-0.02em',
        background: 'linear-gradient(135deg, #ffffff, #c4b5fd)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      }}>
        {algorithmName}
      </h1>

      {/* Control Buttons */}
      <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
        {/* Row 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <button
            className="action-btn primary"
            onClick={onPlayPause}
            disabled={playDisabled}
          >
            {isSorting ? '⏸ Pause' : '▶ Play'}
          </button>

          <button
            className="action-btn"
            onClick={onStep}
            disabled={stepDisabled}
          >
            ⏭ Step
          </button>

          <button
            className="action-btn"
            onClick={onReset}
            title="Double-click to reset settings too"
          >
            🔄 Reset
          </button>
        </div>

        {/* Row 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <button className="action-btn" onClick={onRandomize}>
            🎲 Randomize
          </button>

          <button className="action-btn" onClick={onOpenSettings}>
            ⚙ Settings
          </button>
        </div>

        {/* Info */}
        <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Size: <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{arraySize}</span>
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Speed: <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{speed}%</span>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Keyboard Shortcuts
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '0.5rem', columnGap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <kbd style={kbdStyle}>Space</kbd>
              <span>Play/Pause</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <kbd style={kbdStyle}>→</kbd>
              <span>Step</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <kbd style={kbdStyle}>R</kbd>
              <span>Reset</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <kbd style={kbdStyle}>N</kbd>
              <span>Randomize</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <kbd style={kbdStyle}>S</kbd>
              <span>Settings</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const kbdStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '2.25rem',
  padding: '0.15rem 0.3rem',
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid var(--border-strong)',
  borderRadius: '0.3rem',
  fontFamily: 'SF Mono, Monaco, monospace',
  fontSize: '0.65rem',
  marginRight: '0.4rem',
  color: 'var(--text-primary)',
  flexShrink: 0,
}

export const ControlsPanel = memo(ControlsPanelImpl)
