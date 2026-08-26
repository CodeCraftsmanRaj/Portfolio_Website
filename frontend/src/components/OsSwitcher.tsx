import React from 'react'
import { OsMode } from '../data/portfolioData'

interface OsSwitcherProps {
  mode: OsMode
  onModeChange: (mode: OsMode) => void
}

export const OsSwitcher: React.FC<OsSwitcherProps> = ({ mode, onModeChange }) => {
  const modes: OsMode[] = ['LINUX', 'WIN', 'MAC']

  return (
    <div className={`os-switcher-pill mode-${mode.toLowerCase()}`}>
      {modes.map((m) => (
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
    </div>
  )
}
