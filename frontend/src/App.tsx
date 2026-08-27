import { useState, useEffect } from 'react';
import { OsMode, PageView, ThemeName } from './data/portfolioData';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { Terminal } from './components/Terminal';
import { PageTransition } from './components/PageTransition';
import { BootScreen } from './components/BootScreen';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SkillsPage } from './pages/SkillsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { LeadershipPage } from './pages/LeadershipPage';
import { ContactPage } from './pages/ContactPage';
import { ResumePage } from './pages/ResumePage';

export function App() {
  // Default OS mode set to LINUX
  const [mode, setMode] = useState<OsMode>('LINUX');
  const [activeView, setActiveView] = useState<PageView>('home');
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMorphing, setIsMorphing] = useState(false);
  const [theme, setTheme] = useState<ThemeName>(() => {
    try {
      return (localStorage.getItem('portfolio-theme') as ThemeName) || 'blue';
    } catch {
      return 'blue';
    }
  });

  const handleThemeChange = (nextTheme: ThemeName) => {
    setTheme(nextTheme);
    try {
      localStorage.setItem('portfolio-theme', nextTheme);
    } catch {
      // Theme still applies for this session when storage is unavailable.
    }
  };

  // Boot sequence check (only show once per session)
  const [showBootScreen, setShowBootScreen] = useState(() => {
    try {
      return !sessionStorage.getItem('devos_booted');
    } catch {
      return false;
    }
  });

  const handleBootComplete = () => {
    try {
      sessionStorage.setItem('devos_booted', 'true');
    } catch {
      // ignore
    }
    setShowBootScreen(false);
  };

  // Mode change with smooth morphing transition
  const handleModeChange = (newMode: OsMode) => {
    if (newMode === mode) return;
    setIsMorphing(true);
    setTimeout(() => {
      setMode(newMode);
      setTimeout(() => {
        setIsMorphing(false);
      }, 150);
    }, 150);
  };

  // Keyboard shortcut listener (Ctrl+` or Cmd+` toggles terminal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {showBootScreen && (
        <BootScreen mode={mode} onComplete={handleBootComplete} />
      )}

      <div className={`os-shell mode-${mode.toLowerCase()} theme-${theme} ${terminalOpen ? 'terminal-open' : 'terminal-closed'} ${isMorphing ? 'os-transitioning' : ''}`}>
        {/* OS Top Navigation Bar */}
        <TopBar
          mode={mode}
          activeView={activeView}
          onViewChange={setActiveView}
          onModeChange={handleModeChange}
          terminalOpen={terminalOpen}
          onToggleTerminal={() => setTerminalOpen(!terminalOpen)}
          mobileMenuOpen={mobileMenuOpen}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          theme={theme}
          onThemeChange={handleThemeChange}
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

          {/* Scrollable Canvas View with OS-Authentic Page Transitions */}
          <main className="main-canvas">
            <PageTransition mode={mode} viewKey={activeView}>
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

              {activeView === 'resume' && (
                <ResumePage mode={mode} />
              )}
            </PageTransition>
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
    </>
  );
}

export default App;
