import { useState, useEffect } from 'react'
import { OsMode, PageView } from './data/portfolioData'
import { TopBar } from './components/TopBar'
import { Sidebar } from './components/Sidebar'
import { Terminal } from './components/Terminal'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { SkillsPage } from './pages/SkillsPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { ExperiencePage } from './pages/ExperiencePage'
import { LeadershipPage } from './pages/LeadershipPage'
import { ContactPage } from './pages/ContactPage'

export function App() {
  // Default OS mode set to LINUX
  const [mode, setMode] = useState<OsMode>('LINUX')
  const [activeView, setActiveView] = useState<PageView>('home')
  const [terminalOpen, setTerminalOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Keyboard shortcut listener (Ctrl+` or Cmd+` toggles terminal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault()
        setTerminalOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className={`os-shell mode-${mode.toLowerCase()}`}>
      {/* OS Top Navigation Bar */}
      <TopBar
        mode={mode}
        activeView={activeView}
        onViewChange={setActiveView}
        onModeChange={setMode}
        terminalOpen={terminalOpen}
        onToggleTerminal={() => setTerminalOpen(!terminalOpen)}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* Main Workspace Layout */}
      <div className="workspace-wrapper">
        {/* Left Adaptive OS Sidebar / Dock */}
        <Sidebar
          mode={mode}
          activeView={activeView}
          onViewChange={setActiveView}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Scrollable Canvas View */}
        <main className="main-canvas">
          {activeView === 'home' && (
            <HomePage
              mode={mode}
              onViewChange={setActiveView}
              onToggleTerminal={() => setTerminalOpen(!terminalOpen)}
            />
          )}

          {activeView === 'about' && (
            <AboutPage
              mode={mode}
              onViewChange={setActiveView}
            />
          )}

          {activeView === 'skills' && (
            <SkillsPage
              mode={mode}
            />
          )}

          {activeView === 'projects' && (
            <ProjectsPage
              mode={mode}
            />
          )}

          {activeView === 'experience' && (
            <ExperiencePage
              mode={mode}
            />
          )}

          {activeView === 'leadership' && (
            <LeadershipPage
              mode={mode}
            />
          )}

          {activeView === 'contact' && (
            <ContactPage
              mode={mode}
            />
          )}
        </main>

        {/* Bottom Context-Aware Terminal */}
        <Terminal
          mode={mode}
          activeView={activeView}
          onViewChange={setActiveView}
          isOpen={terminalOpen}
          onClose={() => setTerminalOpen(false)}
        />
      </div>
    </div>
  )
}

export default App
