import React from 'react'
import { OsMode, PageView, navItems } from '../data/portfolioData'

interface WindowCardProps {
  mode: OsMode
  activeView: PageView
  title?: string
  children: React.ReactNode
  onClose?: () => void
}

export const WindowCard: React.FC<WindowCardProps> = ({
  mode,
  activeView,
  title,
  children,
  onClose,
}) => {
  const currentNav = navItems.find((n) => n.id === activeView) || navItems[0]
  const displayPath = title || currentNav.path[mode.toLowerCase() as 'mac' | 'win' | 'linux']

  return (
    <section className="window-container os-double-border">
      {/* OS Mode-Specific Title Bar */}
      {mode === 'MAC' && (
        <div className="window-header">
          <div className="mac-traffic-dots">
            <i className="dot-red" onClick={onClose} title="Close"></i>
            <i className="dot-yellow" title="Minimize"></i>
            <i className="dot-green" title="Zoom"></i>
          </div>
          <div className="window-title">
            <span>{displayPath}</span>
          </div>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
            {currentNav.icon}
          </span>
        </div>
      )}

      {mode === 'WIN' && (
        <div className="window-header" style={{ background: 'var(--surface-variant)' }}>
          <div className="window-title">
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
              {currentNav.icon}
            </span>
            <span style={{ fontWeight: 700 }}>{displayPath}</span>
          </div>
          <div className="win-window-controls">
            <button type="button" className="win-btn" title="Minimize">
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>remove</span>
            </button>
            <button type="button" className="win-btn" title="Maximize">
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>crop_square</span>
            </button>
            <button type="button" className="win-btn close" title="Close" onClick={onClose}>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>close</span>
            </button>
          </div>
        </div>
      )}

      {mode === 'LINUX' && (
        <div className="window-header" style={{ background: 'var(--surface-container-highest)' }}>
          <div className="window-title">
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--on-surface-variant)' }}>
              article
            </span>
            <span style={{ fontWeight: 500 }}>{displayPath}</span>
          </div>
          <div className="linux-window-controls">
            <button type="button" className="linux-dot-btn" title="Minimize">
              <span className="material-symbols-outlined" style={{ fontSize: 10, color: 'var(--surface)' }}>remove</span>
            </button>
            <button type="button" className="linux-dot-btn" title="Maximize">
              <span className="material-symbols-outlined" style={{ fontSize: 10, color: 'var(--surface)' }}>crop_square</span>
            </button>
            <button type="button" className="linux-dot-btn close" title="Close" onClick={onClose}>
              <span className="material-symbols-outlined" style={{ fontSize: 10, color: '#ffffff' }}>close</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Body */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </section>
  )
}
