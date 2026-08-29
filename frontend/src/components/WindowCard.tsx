import React from 'react';
import { OsMode, PageView, navItems } from '../data/portfolioData';

interface WindowCardProps {
  mode: OsMode;
  activeView: PageView;
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export const WindowCard: React.FC<WindowCardProps> = ({
  mode,
  activeView,
  title,
  children,
  onClose,
}) => {
  const [isMinimized, setIsMinimized] = React.useState(false);
  const [isMaximized, setIsMaximized] = React.useState(false);
  const [isClosed, setIsClosed] = React.useState(false);
  const currentNav = navItems.find((n) => n.id === activeView) || navItems[0];
  const modeKey = mode.toLowerCase() as 'mac' | 'win' | 'linux' | 'android' | 'ios';
  const displayPath = title || currentNav.path[modeKey] || currentNav.path.linux;
  const closeWindow = () => {
    setIsClosed(true);
    onClose?.();
  };

  if (isClosed) {
    return (
      <section className="window-closed-state">
        <span className="material-symbols-outlined">close</span>
        <span>{displayPath} closed</span>
        <button type="button" className="btn-outline btn-press" onClick={() => setIsClosed(false)}>Reopen window</button>
      </section>
    );
  }

  return (
    <section className={`window-container os-double-border hover-lift ${isMinimized ? 'is-minimized' : ''} ${isMaximized ? 'is-maximized' : ''}`}>
      {/* OS Mode-Specific Title Bar */}
      {mode === 'MAC' && (
        <div
          className="window-header"
          onDoubleClick={() => { setIsMaximized(!isMaximized); setIsMinimized(false); }}
          style={isMinimized ? { cursor: 'pointer' } : undefined}
          title={isMinimized ? 'Double click to restore' : undefined}
        >
          <div className="mac-traffic-dots">
            <button type="button" className="dot-red" onClick={closeWindow} title="Close"></button>
            <button type="button" className="dot-yellow" onClick={() => setIsMinimized(!isMinimized)} title={isMinimized ? "Restore" : "Minimize"}></button>
            <button type="button" className="dot-green" onClick={() => { setIsMaximized(!isMaximized); setIsMinimized(false); }} title={isMaximized ? "Exit Fullscreen" : "Zoom"}></button>
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
        <div
          className="window-header"
          style={{ background: 'var(--surface-variant)', ...(isMinimized ? { cursor: 'pointer' } : {}) }}
          onDoubleClick={() => { setIsMaximized(!isMaximized); setIsMinimized(false); }}
          title={isMinimized ? 'Double click to restore' : undefined}
        >
          <div className="window-title">
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
              {currentNav.icon}
            </span>
            <span style={{ fontWeight: 700 }}>{displayPath}</span>
          </div>
          <div className="win-window-controls">
            <button type="button" className="win-btn btn-press" title={isMinimized ? "Restore" : "Minimize"} onClick={() => setIsMinimized(!isMinimized)}>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{isMinimized ? 'expand_less' : 'remove'}</span>
            </button>
            <button type="button" className="win-btn btn-press" title={isMaximized ? "Restore" : "Maximize"} onClick={() => { setIsMaximized(!isMaximized); setIsMinimized(false); }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{isMaximized ? 'filter_none' : 'crop_square'}</span>
            </button>
            <button type="button" className="win-btn close btn-press" title="Close" onClick={closeWindow}>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>close</span>
            </button>
          </div>
        </div>
      )}

      {mode === 'LINUX' && (
        <div
          className="window-header"
          style={{ background: 'var(--surface-container-highest)', ...(isMinimized ? { cursor: 'pointer' } : {}) }}
          onDoubleClick={() => { setIsMaximized(!isMaximized); setIsMinimized(false); }}
          title={isMinimized ? 'Double click to restore' : undefined}
        >
          <div className="window-title">
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--on-surface-variant)' }}>
              article
            </span>
            <span style={{ fontWeight: 500 }}>{displayPath}</span>
          </div>
          <div className="linux-window-controls">
            <button type="button" className="linux-dot-btn btn-press" title={isMinimized ? "Restore" : "Minimize"} onClick={() => setIsMinimized(!isMinimized)}>
              <span className="material-symbols-outlined" style={{ fontSize: 11, color: '#ffffff' }}>{isMinimized ? 'expand_less' : 'remove'}</span>
            </button>
            <button type="button" className="linux-dot-btn btn-press" title={isMaximized ? "Restore" : "Maximize"} onClick={() => { setIsMaximized(!isMaximized); setIsMinimized(false); }}>
              <span className="material-symbols-outlined" style={{ fontSize: 11, color: '#ffffff' }}>{isMaximized ? 'filter_none' : 'crop_square'}</span>
            </button>
            <button type="button" className="linux-dot-btn close btn-press" title="Close" onClick={closeWindow}>
              <span className="material-symbols-outlined" style={{ fontSize: 11, color: '#ffffff' }}>close</span>
            </button>
          </div>
        </div>
      )}

      {mode === 'ANDROID' && (
        <div className="window-header" style={{ background: 'var(--surface-container-high)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="window-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--secondary)' }}>
              {currentNav.icon}
            </span>
            <span style={{ fontWeight: 600, fontSize: '13px' }}>{displayPath}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button type="button" className="topbar-icon-btn btn-press" onClick={() => setIsMinimized(!isMinimized)} title={isMinimized ? "Expand" : "Minimize"}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{isMinimized ? 'expand_more' : 'expand_less'}</span>
            </button>
          </div>
        </div>
      )}

      {mode === 'IOS' && (
        <div className="window-header" style={{ background: 'var(--surface-container-low)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="window-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--secondary)' }}>
              {currentNav.icon}
            </span>
            <span style={{ fontWeight: 600, fontSize: '13px', fontFamily: '-apple-system, sans-serif' }}>{displayPath}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button type="button" className="topbar-icon-btn btn-press" onClick={() => setIsMinimized(!isMinimized)} title={isMinimized ? "Expand" : "Collapse"}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{isMinimized ? 'unfold_more' : 'unfold_less'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Body */}
      {!isMinimized && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      )}
    </section>
  );
};
