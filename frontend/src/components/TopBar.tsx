import React, { useState, useEffect } from 'react';
import { Apple } from 'lucide-react';
import { OsMode, PageView, navItems, ThemeName, themes } from '../data/portfolioData';
import { OsSwitcher } from './OsSwitcher';

interface TopBarProps {
  mode: OsMode;
  activeView: PageView;
  onViewChange: (view: PageView) => void;
  onModeChange: (mode: OsMode) => void;
  terminalOpen: boolean;
  onToggleTerminal: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  theme: ThemeName;
  onThemeChange: (theme: ThemeName) => void;
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
  theme,
  onThemeChange,
}) => {
  const [timeString, setTimeString] = useState('');
  const [activitiesOpen, setActivitiesOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = months[now.getMonth()];
      const date = now.getDate();
      setTimeString(`${hours}:${minutes} ${month} ${date}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectActivity = (view: PageView) => {
    onViewChange(view);
    setActivitiesOpen(false);
  };

  const handleSystemPower = () => {
    try {
      window.location.reload();
    } catch {
      onViewChange('home');
    }
  };

  const themePicker = (
    <div className="theme-picker" aria-label="Color theme">
      <span className="material-symbols-outlined" title="Color theme" style={{ fontSize: 16 }}>palette</span>
      {themes.map((option) => (
        <button
          key={option.id}
          type="button"
          className={`theme-swatch ${theme === option.id ? 'active' : ''}`}
          style={{ backgroundColor: option.swatch }}
          title={option.label}
          aria-label={`Use ${option.label} theme`}
          onClick={() => onThemeChange(option.id)}
        />
      ))}
    </div>
  );

  return (
    <>
      {/* Linux GNOME Activities Overlay Modal */}
      {mode === 'LINUX' && activitiesOpen && (
        <div
          className="activities-overlay"
          onClick={() => setActivitiesOpen(false)}
        >
          <div className="activities-panel" onClick={(e) => e.stopPropagation()}>
            <div className="activities-heading">
              <div>
                <span className="activities-kicker">WORKSPACE OVERVIEW</span>
                <h2>Activities</h2>
              </div>
              <button type="button" className="activities-close" onClick={() => setActivitiesOpen(false)} title="Close Activities">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="activities-grid">
            {navItems.map((item) => (
              <div
                key={item.id}
                className="activities-window-preview"
                onClick={() => handleSelectActivity(item.id)}
              >
                <div className="activities-preview-header">
                  <span className="material-symbols-outlined activities-preview-icon">
                    {item.icon}
                  </span>
                  <span className="activities-preview-title">
                    {item.label}
                  </span>
                  <span className="material-symbols-outlined activities-open-icon">arrow_outward</span>
                </div>
                <div className="activities-preview-path">
                  {item.path.linux}
                </div>
              </div>
            ))}
            </div>
            <div className="activities-footer">
              <span className="material-symbols-outlined">keyboard</span>
              Select a workspace to continue
            </div>
          </div>
        </div>
      )}

      {mode === 'LINUX' && (
        <header className="topbar">
          <div className="topbar-left">
            <button
              type="button"
              className="btn-press"
              style={{
                fontWeight: 700,
                color: activitiesOpen ? 'var(--primary-litho)' : 'var(--on-surface)',
                background: activitiesOpen ? 'var(--surface-container-highest)' : 'none',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '13px',
              }}
              onClick={() => setActivitiesOpen(!activitiesOpen)}
            >
              Activities
            </button>
            <button
              type="button"
              className="tag-badge btn-press"
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
            {themePicker}
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>network_wifi</span>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>volume_up</span>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>battery_5_bar</span>
            <span className="topbar-date" style={{ marginLeft: 6, fontWeight: 500 }}>{timeString}</span>
            <button
              type="button"
              className="topbar-icon-btn btn-press"
              title="Restart System"
              onClick={handleSystemPower}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>restart_alt</span>
            </button>
          </div>
        </header>
      )}

      {mode === 'WIN' && (
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
            {themePicker}
            <OsSwitcher mode={mode} onModeChange={onModeChange} />
            <button
              type="button"
              className="topbar-icon-btn btn-press"
              title="Toggle Command Prompt"
              onClick={onToggleTerminal}
            >
              <span className="material-symbols-outlined">terminal</span>
            </button>
            <button
              type="button"
              className="topbar-icon-btn btn-press"
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
      )}

      {mode === 'MAC' && (
        <header className="topbar">
          <div className="topbar-left">
            <button
              type="button"
              className="topbar-brand btn-press"
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
            {themePicker}
            <OsSwitcher mode={mode} onModeChange={onModeChange} />
            <button
              type="button"
              className="topbar-icon-btn btn-press"
              title="Terminal console"
              onClick={onToggleTerminal}
            >
              <span className="material-symbols-outlined">terminal</span>
            </button>
            <button
              type="button"
              className="topbar-icon-btn btn-press"
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
      )}

      {/* Android Material 3 Top App Bar */}
      {mode === 'ANDROID' && (
        <header className="topbar">
          <div className="topbar-left">
            <span className="topbar-brand" aria-label="DevOS Android">
              <span>DevOS</span>
              <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: 22 }}>android</span>
            </span>
          </div>

          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <OsSwitcher mode={mode} onModeChange={onModeChange} />
          </div>

          <div className="topbar-right">
            {themePicker}
            <button
              type="button"
              className="topbar-icon-btn btn-press"
              title="Terminal console"
              onClick={onToggleTerminal}
            >
              <span className="material-symbols-outlined">terminal</span>
            </button>
            <div className="android-status-pill">
              <span className="material-symbols-outlined" style={{ fontSize: 13 }}>signal_cellular_alt</span>
              <span className="material-symbols-outlined" style={{ fontSize: 13 }}>wifi</span>
              <span className="material-symbols-outlined" style={{ fontSize: 13 }}>battery_charging_full</span>
            </div>
          </div>
        </header>
      )}

      {/* iOS Translucent Navigation Bar */}
      {mode === 'IOS' && (
        <header className="topbar">
          <div className="topbar-left">
            <button
              type="button"
              className="topbar-brand btn-press"
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              onClick={() => onViewChange('home')}
            >
              <span>DevOS</span>
              <Apple size={18} strokeWidth={2.2} aria-hidden="true" />
            </button>
          </div>

          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <OsSwitcher mode={mode} onModeChange={onModeChange} />
          </div>

          <div className="topbar-right">
            {themePicker}
            <button
              type="button"
              className="topbar-icon-btn btn-press"
              title="Terminal console"
              onClick={onToggleTerminal}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>terminal</span>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontFamily: '-apple-system, sans-serif', color: 'var(--on-surface-variant)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>signal_cellular_4_bar</span>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>wifi</span>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>battery_full</span>
            </div>
          </div>
        </header>
      )}
    </>
  );
};
