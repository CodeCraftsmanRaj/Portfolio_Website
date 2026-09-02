import React, { useState } from 'react';
import { navItems, personalData, OsMode, PageView } from '../data/portfolioData';
import { useDockMagnification } from '../hooks/useDockMagnification';
import { useRevealEffect } from '../hooks/useRevealEffect';

type DockTab = PageView | 'terminal';

interface SidebarProps {
  mode: OsMode;
  activeView: PageView;
  openTabs: DockTab[];
  onViewChange: (view: PageView) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  mode,
  activeView,
  openTabs,
  onViewChange,
  mobileOpen,
  onCloseMobile,
}) => {
  const [bouncingId, setBouncingId] = useState<string | null>(null);

  // Hook for Mac Dock Magnification
  const dockNavRef = useDockMagnification({
    enabled: mode === 'MAC',
    maxScale: 1.32,
    distance: 65,
    axis: 'x',
  });

  // Hook for Windows Fluent Reveal Effect
  const revealRef = useRevealEffect<HTMLElement>({
    enabled: mode === 'WIN',
  });

  const handleItemClick = (view: PageView) => {
    if (mode === 'MAC') {
      setBouncingId(view);
      setTimeout(() => setBouncingId(null), 650);
    }
    onViewChange(view);
    if (mobileOpen) {
      onCloseMobile();
    }
  };

  return (
    <>
      {mobileOpen && (
        <div 
          className="mobile-drawer-backdrop"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}
      <aside
        ref={mode === 'WIN' ? revealRef : undefined}
        className={`sidebar-litho ${mode === 'MAC' ? 'sidebar-mac-dock' : ''} ${mode === 'WIN' ? 'reveal-container' : ''} ${mobileOpen ? 'drawer-open' : ''}`}
      >
      {/* Profile Header */}
      <div className="sidebar-profile">
        <div className="sidebar-avatar-row">
          <div className="sidebar-avatar" title="Root Administrator">
            <span>RM</span>
          </div>
          <div className="sidebar-user-info">
            <h2>{personalData.rootUser}</h2>
            <p>{personalData.version}</p>
          </div>
        </div>

        <button
          type="button"
          className="sidebar-action-btn btn-press"
          onClick={() => handleItemClick('contact')}
        >
          <span>New Instance</span>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
        </button>
      </div>

      {/* Navigation items */}
      <nav
        ref={mode === 'MAC' ? dockNavRef : undefined}
        className="sidebar-nav-list"
      >
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          const isOpen = openTabs.includes(item.id);
          const isBouncing = bouncingId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              data-label={item.sidebarLabel}
              className={`sidebar-nav-item dock-${item.id} ${isActive ? 'active' : ''} ${isOpen ? 'is-open' : ''} ${isBouncing ? 'dock-bouncing' : ''}`}
              onClick={() => handleItemClick(item.id)}
              title={`${item.sidebarLabel}${isOpen ? ' • open' : ''}`}
            >
              <span
                className={`material-symbols-outlined ${isActive ? 'filled' : ''}`}
              >
                {item.icon}
              </span>
              <span>{item.sidebarLabel}</span>
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <button
          type="button"
          data-label="Trash"
          className="sidebar-footer-item"
          onClick={() => handleItemClick('home')}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>delete</span>
          <span>Trash</span>
        </button>
        <button
          type="button"
          data-label="Settings"
          className="sidebar-footer-item"
          onClick={() => handleItemClick('skills')}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>settings</span>
          <span>Settings</span>
        </button>
      </div>
    </aside>
  </>
  );
};
