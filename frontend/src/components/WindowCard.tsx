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
  const displayPath = title || currentNav.path[mode.toLowerCase() as 'mac' | 'win' | 'linux'];
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
        <div className="window-header">
          <div className="mac-traffic-dots">
            <button type="button" className="dot-red" onClick={closeWindow} title="Close"></button>
            <button type="button" className="dot-yellow" onClick={() => setIsMinimized(!isMinimized)} title="Minimize"></button>
            <button type="button" className="dot-green" onClick={() => { setIsMaximized(!isMaximized); setIsMinimized(false); }} title="Zoom"></button>
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
            <button type="button" className="win-btn btn-press" title="Minimize" onClick={() => setIsMinimized(!isMinimized)}>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>remove</span>
            </button>
            <button type="button" className="win-btn btn-press" title="Maximize" onClick={() => { setIsMaximized(!isMaximized); setIsMinimized(false); }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>crop_square</span>
            </button>
            <button type="button" className="win-btn close btn-press" title="Close" onClick={closeWindow}>
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
            <button type="button" className="linux-dot-btn btn-press" title="Minimize" onClick={() => setIsMinimized(!isMinimized)}>
              <span className="material-symbols-outlined" style={{ fontSize: 10, color: 'var(--surface)' }}>remove</span>
            </button>
            <button type="button" className="linux-dot-btn btn-press" title="Maximize" onClick={() => { setIsMaximized(!isMaximized); setIsMinimized(false); }}>
              <span className="material-symbols-outlined" style={{ fontSize: 10, color: 'var(--surface)' }}>crop_square</span>
            </button>
            <button type="button" className="linux-dot-btn close btn-press" title="Close" onClick={closeWindow}>
              <span className="material-symbols-outlined" style={{ fontSize: 10, color: '#ffffff' }}>close</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Body */}
      {!isMinimized && <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</div>}
    </section>
  );
};
