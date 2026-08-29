import React, { useState } from 'react';
import { OsMode } from '../data/portfolioData';

interface OsSwitcherProps {
  mode: OsMode;
  onModeChange: (mode: OsMode) => void;
  isMobileDevice?: boolean;
}

export const OsSwitcher: React.FC<OsSwitcherProps> = ({ mode, onModeChange }) => {
  const isCurrentMobile = mode === 'ANDROID' || mode === 'IOS';
  const [showAll, setShowAll] = useState(false);

  const desktopModes: OsMode[] = ['LINUX', 'WIN', 'MAC'];
  const mobileModes: OsMode[] = ['ANDROID', 'IOS'];

  const displayedModes = showAll 
    ? (['LINUX', 'WIN', 'MAC', 'ANDROID', 'IOS'] as OsMode[])
    : (isCurrentMobile ? mobileModes : desktopModes);

  return (
    <div className={`os-switcher-pill mode-${mode.toLowerCase()}`}>
      {displayedModes.map((m) => (
        <button
          key={m}
          type="button"
          className={mode === m ? 'active' : ''}
          onClick={() => onModeChange(m)}
          title={`Switch to ${m} OS mode`}
        >
          {m}
        </button>
      ))}

      {/* Toggle button to expand/switch between desktop and mobile modes */}
      <button
        type="button"
        className="os-switcher-toggle-btn"
        onClick={() => {
          if (showAll) {
            setShowAll(false);
          } else {
            // Toggle between groups
            if (isCurrentMobile) {
              onModeChange('LINUX');
            } else {
              onModeChange('ANDROID');
            }
          }
        }}
        title={isCurrentMobile ? 'Switch to Desktop OS (Linux/Win/Mac)' : 'Switch to Mobile OS (Android/iOS)'}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4px 6px',
          opacity: 0.8,
          fontSize: '12px',
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
          {isCurrentMobile ? 'laptop' : 'smartphone'}
        </span>
      </button>
    </div>
  );
};
