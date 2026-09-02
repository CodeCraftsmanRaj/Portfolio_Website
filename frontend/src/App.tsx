import { useState, useEffect } from 'react';
import { OsMode, PageView, ThemeName } from './data/portfolioData';
import { useDeviceDetection } from './hooks/useDeviceDetection';
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
  const { detectedMode, isMobile } = useDeviceDetection();

  // OS mode auto-detected by device (Desktop default: LINUX | Mobile default: ANDROID / IOS)
  const [mode, setMode] = useState<OsMode>(() => {
    try {
      const saved = localStorage.getItem('portfolio-os-mode') as OsMode;
      if (saved && ['LINUX', 'WIN', 'MAC', 'ANDROID', 'IOS'].includes(saved)) {
        const isSavedMobile = saved === 'ANDROID' || saved === 'IOS';
        // Only restore saved mode if it matches the current device form-factor
        if (isSavedMobile === isMobile) {
          return saved;
        }
      }
    } catch {
      // fallback
    }
    return detectedMode;
  });

  // Automatically align mode whenever device form-factor changes (e.g. mobile vs desktop)
  useEffect(() => {
    const isCurrentModeMobile = mode === 'ANDROID' || mode === 'IOS';
    if (isMobile !== isCurrentModeMobile) {
      setMode(detectedMode);
    }
  }, [isMobile, detectedMode, mode]);

  const [activeView, setActiveView] = useState<PageView>('home');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [openTabs, setOpenTabs] = useState<Array<PageView | 'terminal'>>(['home']);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMorphing, setIsMorphing] = useState(false);

  const markTabOpen = (tab: PageView | 'terminal') => {
    setOpenTabs((prev) => (prev.includes(tab) ? prev : [...prev, tab]));
  };

  const handleViewChange = (nextView: PageView) => {
    setActiveView(nextView);
    markTabOpen(nextView);
  };

  const handleToggleTerminal = () => {
    setTerminalOpen((prev) => {
      const nextState = !prev;
      if (nextState) {
        markTabOpen('terminal');
      } else {
        setOpenTabs((current) => current.filter((tab) => tab !== 'terminal'));
      }
      return nextState;
    });
  };

  const handleCloseView = (view: PageView) => {
    setOpenTabs((current) => {
      const filtered = current.filter((tab) => tab !== view);

      if (activeView === view) {
        const nextFallback = filtered.find((tab): tab is PageView => tab !== 'terminal') ?? 'home';
        setActiveView(nextFallback);
      }

      return filtered;
    });
  };

  // Set --taskbar-h variable on document root and reset mobile menu on mode change
  useEffect(() => {
    let taskbarH = '0px';
    if (mode === 'WIN') {
      taskbarH = isMobile ? '58px' : '64px';
    } else if (mode === 'MAC') {
      taskbarH = isMobile ? '68px' : '88px';
    } else if (mode === 'ANDROID') {
      taskbarH = '72px';
    } else if (mode === 'IOS') {
      taskbarH = '68px';
    }
    document.documentElement.style.setProperty('--taskbar-h', taskbarH);
    setMobileMenuOpen(false);
  }, [mode, isMobile]);

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
    try {
      localStorage.setItem('portfolio-os-mode', newMode);
    } catch {
      // ignore
    }
    setIsMorphing(true);
    setTimeout(() => {
      setMode(newMode);
      setTimeout(() => {
        setIsMorphing(false);
      }, 150);
    }, 150);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const allowedTabs = openTabs.filter((tab): tab is PageView => tab !== 'terminal');

      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        handleToggleTerminal();
        return;
      }

      if ((e.altKey || e.metaKey) && e.key === 'Tab') {
        e.preventDefault();
        if (allowedTabs.length === 0) return;

        const currentIndex = allowedTabs.indexOf(activeView);
        const nextIndex = currentIndex >= 0
          ? (currentIndex + (e.shiftKey ? -1 : 1) + allowedTabs.length) % allowedTabs.length
          : 0;

        const nextView = allowedTabs[nextIndex];
        handleViewChange(nextView);
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'Tab') {
        e.preventDefault();
        if (allowedTabs.length === 0) return;

        const currentIndex = allowedTabs.indexOf(activeView);
        const nextIndex = currentIndex >= 0
          ? (currentIndex + 1 + allowedTabs.length) % allowedTabs.length
          : 0;

        handleViewChange(allowedTabs[nextIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeView, openTabs]);

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
          onViewChange={handleViewChange}
          onModeChange={handleModeChange}
          terminalOpen={terminalOpen}
          onToggleTerminal={handleToggleTerminal}
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
            openTabs={openTabs}
            onViewChange={handleViewChange}
            mobileOpen={mobileMenuOpen}
            onCloseMobile={() => setMobileMenuOpen(false)}
          />

          {/* Scrollable Canvas View with OS-Authentic Page Transitions */}
          <main className="main-canvas">
            <PageTransition mode={mode} viewKey={activeView}>
              {activeView === 'home' && (
                <HomePage
                  mode={mode}
                  onViewChange={handleViewChange}
                  onToggleTerminal={handleToggleTerminal}
                  onWindowClose={handleCloseView}
                />
              )}

              {activeView === 'about' && (
                <AboutPage
                  mode={mode}
                  onViewChange={handleViewChange}
                  onWindowClose={handleCloseView}
                />
              )}

              {activeView === 'skills' && (
                <SkillsPage
                  mode={mode}
                  onWindowClose={handleCloseView}
                />
              )}

              {activeView === 'projects' && (
                <ProjectsPage
                  mode={mode}
                  onWindowClose={handleCloseView}
                />
              )}

              {activeView === 'experience' && (
                <ExperiencePage
                  mode={mode}
                  onWindowClose={handleCloseView}
                />
              )}

              {activeView === 'leadership' && (
                <LeadershipPage
                  mode={mode}
                  onWindowClose={handleCloseView}
                />
              )}

              {activeView === 'contact' && (
                <ContactPage
                  mode={mode}
                  onWindowClose={handleCloseView}
                />
              )}

              {activeView === 'resume' && (
                <ResumePage mode={mode} onWindowClose={handleCloseView} />
              )}
            </PageTransition>
          </main>

          {/* Bottom Context-Aware Terminal */}
          <Terminal
            mode={mode}
            activeView={activeView}
            onViewChange={handleViewChange}
            isOpen={terminalOpen}
            onClose={() => {
              setTerminalOpen(false);
              setOpenTabs((current) => current.filter((tab) => tab !== 'terminal'));
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
