import React, { useState, useEffect } from 'react'
import { OsMode, PageView } from '../data/portfolioData'
import { OsSwitcher } from './OsSwitcher'

interface TopBarProps {
  mode: OsMode
  activeView: PageView
  onViewChange: (view: PageView) => void
  onModeChange: (mode: OsMode) => void
  terminalOpen: boolean
  onToggleTerminal: () => void
  mobileMenuOpen: boolean
  onToggleMobileMenu: () => void
}

export const TopBar: React.FC<TopBarProps> = ({
  mode,
  activeView,
  onViewChange,
  onModeChange,
  terminalOpen,
  onToggleTerminal,
  mobileMenuOpen,
  onToggleMobileMenu,
}) => {
  const [timeString, setTimeString] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const month = months[now.getMonth()]
      const date = now.getDate()
      setTimeString(`${hours}:${minutes} ${month} ${date}`)
    }
    updateTime()
    const interval = setInterval(updateTime, 10000)
    return () => clearInterval(interval)
  }, [])

  if (mode === 'LINUX') {
    return (
      <header className="topbar">
        <div className="topbar-left">
          <span style={{ fontWeight: 700, color: 'var(--on-surface)' }}>Activities</span>
          <button
            type="button"
            className="tag-badge"
            style={{
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '2px 8px',
              background: 'var(--surface-variant)',
            }}
            onClick={onToggleTerminal}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>terminal</span>
            <span>system-root</span>
          </button>
        </div>

        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <OsSwitcher mode={mode} onModeChange={onModeChange} />
        </div>

        <div className="topbar-right" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>network_wifi</span>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>volume_up</span>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>battery_5_bar</span>
          <span style={{ marginLeft: 6, fontWeight: 500 }}>{timeString}</span>
          <button
            type="button"
            className="topbar-icon-btn"
            title="System Power"
            onClick={() => onViewChange('home')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>power_settings_new</span>
          </button>
        </div>
      </header>
    )
  }

  if (mode === 'WIN') {
    return (
      <header className="topbar">
        <div className="topbar-left">
          <span className="topbar-brand">DevOS v1.0</span>
          <nav className={`topbar-nav ${mobileMenuOpen ? 'open' : ''}`}>
            <button
              type="button"
              className={activeView === 'home' ? 'active' : ''}
              onClick={() => { onViewChange('home'); onToggleMobileMenu(); }}
            >
              Home
            </button>
            <button
              type="button"
              className={activeView === 'about' ? 'active' : ''}
              onClick={() => { onViewChange('about'); onToggleMobileMenu(); }}
            >
              Profile
            </button>
            <button
              type="button"
              className={activeView === 'skills' ? 'active' : ''}
              onClick={() => { onViewChange('skills'); onToggleMobileMenu(); }}
            >
              Code
            </button>
            <button
              type="button"
              className={activeView === 'projects' ? 'active' : ''}
              onClick={() => { onViewChange('projects'); onToggleMobileMenu(); }}
            >
              Portfolio
            </button>
            <button
              type="button"
              className={activeView === 'experience' ? 'active' : ''}
              onClick={() => { onViewChange('experience'); onToggleMobileMenu(); }}
            >
              History
            </button>
            <button
              type="button"
              className={activeView === 'leadership' ? 'active' : ''}
              onClick={() => { onViewChange('leadership'); onToggleMobileMenu(); }}
            >
              Manual
            </button>
            <button
              type="button"
              className={activeView === 'contact' ? 'active' : ''}
              onClick={() => { onViewChange('contact'); onToggleMobileMenu(); }}
            >
              Contact
            </button>
          </nav>
        </div>

        <div className="topbar-right">
          <OsSwitcher mode={mode} onModeChange={onModeChange} />
          <button
            type="button"
            className="topbar-icon-btn"
            title="Toggle Command Prompt"
            onClick={onToggleTerminal}
          >
            <span className="material-symbols-outlined">terminal</span>
          </button>
          <button
            type="button"
            className="topbar-icon-btn"
            title="Settings"
            onClick={() => onViewChange('skills')}
          >
            <span className="material-symbols-outlined">settings</span>
          </button>
          <button
            type="button"
            className="mobile-menu-toggle topbar-icon-btn"
            onClick={onToggleMobileMenu}
          >
            <span className="material-symbols-outlined">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </header>
    )
  }

  // DEFAULT / MAC MODE
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="topbar-brand"
          onClick={() => onViewChange('home')}
        >
          <span>THE ARCHIVAL TERMINAL</span>
        </button>

        <nav className={`topbar-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <button
            type="button"
            className={activeView === 'home' ? 'active' : ''}
            onClick={() => { onViewChange('home'); onToggleMobileMenu(); }}
          >
            File
          </button>
          <button
            type="button"
            className={activeView === 'about' ? 'active' : ''}
            onClick={() => { onViewChange('about'); onToggleMobileMenu(); }}
          >
            Edit
          </button>
          <button
            type="button"
            className={activeView === 'projects' || activeView === 'experience' ? 'active' : ''}
            onClick={() => { onViewChange('projects'); onToggleMobileMenu(); }}
          >
            View
          </button>
          <button
            type="button"
            className={terminalOpen ? 'active' : ''}
            onClick={() => { onToggleTerminal(); }}
          >
            Terminal
          </button>
          <button
            type="button"
            className={activeView === 'leadership' ? 'active' : ''}
            onClick={() => { onViewChange('leadership'); onToggleMobileMenu(); }}
          >
            Help
          </button>
        </nav>
      </div>

      <div className="topbar-right">
        <OsSwitcher mode={mode} onModeChange={onModeChange} />
        <button
          type="button"
          className="topbar-icon-btn"
          title="Terminal console"
          onClick={onToggleTerminal}
        >
          <span className="material-symbols-outlined">terminal</span>
        </button>
        <button
          type="button"
          className="topbar-icon-btn"
          title="Settings"
          onClick={() => onViewChange('skills')}
        >
          <span className="material-symbols-outlined">settings</span>
        </button>
        <button
          type="button"
          className="mobile-menu-toggle topbar-icon-btn"
          onClick={onToggleMobileMenu}
        >
          <span className="material-symbols-outlined">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>
    </header>
  )
}
