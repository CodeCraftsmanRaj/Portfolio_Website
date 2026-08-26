import React from 'react'
import { navItems, personalData, OsMode, PageView } from '../data/portfolioData'

interface SidebarProps {
  mode: OsMode
  activeView: PageView
  onViewChange: (view: PageView) => void
  mobileOpen: boolean
  onCloseMobile: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  mode,
  activeView,
  onViewChange,
  mobileOpen,
  onCloseMobile,
}) => {
  const handleItemClick = (view: PageView) => {
    onViewChange(view)
    if (mobileOpen) {
      onCloseMobile()
    }
  }

  return (
    <aside className={`sidebar-litho ${mobileOpen ? 'drawer-open' : ''}`}>
      {/* Profile Header */}
      <div className="sidebar-profile">
        <div className="sidebar-avatar-row">
          <div className="sidebar-avatar" title="Root Administrator">
            <span>SS</span>
          </div>
          <div className="sidebar-user-info">
            <h2>{personalData.rootUser}</h2>
            <p>{personalData.version}</p>
          </div>
        </div>

        <button
          type="button"
          className="sidebar-action-btn"
          onClick={() => handleItemClick('contact')}
        >
          <span>New Instance</span>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
        </button>
      </div>

      {/* Navigation items */}
      <nav className="sidebar-nav-list">
        {navItems.map((item) => {
          const isActive = activeView === item.id
          return (
            <button
              key={item.id}
              type="button"
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => handleItemClick(item.id)}
              title={item.sidebarLabel}
            >
              <span
                className={`material-symbols-outlined ${isActive ? 'filled' : ''}`}
              >
                {item.icon}
              </span>
              <span>{item.sidebarLabel}</span>
            </button>
          )
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <button
          type="button"
          className="sidebar-footer-item"
          onClick={() => handleItemClick('home')}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>delete</span>
          <span>Trash</span>
        </button>
        <button
          type="button"
          className="sidebar-footer-item"
          onClick={() => handleItemClick('skills')}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>settings</span>
          <span>Settings</span>
        </button>
      </div>
    </aside>
  )
}
