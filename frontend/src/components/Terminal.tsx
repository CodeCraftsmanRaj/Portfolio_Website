import React, { useState, useEffect, useRef, FormEvent } from 'react'
import { OsMode, PageView } from '../data/portfolioData'

interface TerminalProps {
  mode: OsMode
  activeView: PageView
  onViewChange: (view: PageView) => void
  isOpen: boolean
  onClose: () => void
}

interface CommandHistoryItem {
  type: 'command' | 'output' | 'error' | 'success' | 'raw'
  text: string
  prompt?: string
}

export const Terminal: React.FC<TerminalProps> = ({
  mode,
  activeView,
  onViewChange,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'terminal' | 'output' | 'debug'>('terminal')
  const [inputVal, setInputVal] = useState('')
  const [isMaximized, setIsMaximized] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [history, setHistory] = useState<CommandHistoryItem[]>([])
  const bottomRef = useRef<HTMLDivElement>(null)

  // Contextual initial lines based on active page & OS
  useEffect(() => {
    let initialText = ''
    if (activeView === 'home') {
      if (mode === 'LINUX') {
        initialText = `user@devos:~$ neofetch\n` +
`       _,met$$$$$gg.          OS: DevOS Linux x86_64\n` +
`    ,g$$$$$$$$$$$$$$$P.       Kernel: 6.5.0-generic\n` +
`  ,g$$P"     """Y$$.".        Uptime: 14 days, 3 hours\n` +
` ,$$P'              \`$$$.     Packages: 2405 (dpkg)\n` +
`',$$P       ,ggs.     \`$$b:   Shell: bash 5.1.16\n` +
`\`d$$'     ,$P"'   .    $$$    Theme: Warm Newsprint [GTK3]\n` +
` $$P      d$'     ,    $$P    Icons: Material Symbols [GTK3]\n` +
` $$:      $$.   -    ,d$$'    Terminal: dev-term\n` +
` $$;      Y$b._   _,d$P'      Font: JetBrains Mono\n` +
` Y$$.    \`.\`"Y$$$$P"'\n` +
` \`$$b      "-.__\n` +
`  \`Y$$\n` +
`   \`Y$$.\n` +
`     \`$$b.\n` +
`       \`Y$$b.\n` +
`          \`"Y$b._\n` +
`              \`"""`
      } else if (mode === 'WIN') {
        initialText = `Microsoft Windows [Version 10.0.19045.3570]\n(c) Microsoft Corporation. All rights reserved.\n\nC:\\Users\\Root> systeminfo\nHost Name: DEVOS-WORKSTATION\nOS Name: DevOS Windows Edition v1.0\nSystem Status: ONLINE\nReady for command dispatch.`
      } else {
        initialText = `Last login: Wed Oct 25 14:32:11 on ttys001\nType 'help' to inspect available system commands.\n\n[INFO] DevOS Archival Terminal initialized.\n[READY] Listening for input.`
      }
    } else if (activeView === 'about') {
      initialText = `root@devos ~% cat bio.txt\nLoading biographical data...\nInitializing stylistic parsers...\nDone. (Refer to main window buffer)`
    } else if (activeView === 'skills') {
      initialText = `user@devos:~/skills$ dpkg --list --status=installed\nScanning core binaries and framework dependencies...\n[OK] JavaScript/TS, Python, Go, Rust, PostgreSQL active.\n[STATUS] All packages operational.`
    } else if (activeView === 'projects') {
      initialText = `user@devos:~/workspace/repositories$ ls -la\ndrwxr-xr-x  4 root root 4096 Oct 26 12:00 core_engine_v3.rs\ndrwxr-xr-x  2 root root 4096 Oct 25 18:30 lexer.c\ndrwxr-xr-x  3 root root 4096 Oct 24 14:15 neural_vis.py\ndrwxr-xr-x  5 root root 4096 Oct 22 09:40 thesis_sim.go`
    } else if (activeView === 'experience') {
      initialText = `root@devos ~/experience$ cat status.log\nLoading career milestones...\n[OK] Systems Architect profile loaded.\n[OK] Engineering history verified.`
    } else if (activeView === 'leadership') {
      initialText = `DevOS v2.0.4 - System initialized.\nroot@devos:~$ tail -f /var/log/leadership.log\n[INFO] Loading mentorship records... OK\n[INFO] Compiling speaking engagements... OK`
    } else if (activeView === 'contact') {
      initialText = `[system@devos ~]$ Initializing contact module... Ready for input.\nraj@network:~$ ping -c 3 raj-mathuria.dev\n64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.042 ms\n64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=0.038 ms\nConnection established.`
    } else if (activeView === 'resume') {
      initialText = `user@devos:~/documents$ open Raj_resume.pdf\nLoading verified career dossier...\n[OK] Resume PDF mounted in workspace.`
    }

    setHistory([{ type: 'raw', text: initialText }])
  }, [activeView, mode])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const getPromptString = () => {
    if (mode === 'WIN') return 'C:\\Users\\Root>'
    if (mode === 'LINUX') return 'user@devos:~$'
    return 'guest@portfolio:~$'
  }

  const handleCommand = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = inputVal.trim()
    if (!trimmed) return

    const promptStr = getPromptString()
    const cmd = trimmed.toLowerCase()

    const newHistory = [...history, { type: 'command' as const, text: trimmed, prompt: promptStr }]

    if (cmd === 'clear' || cmd === 'cls') {
      setHistory([])
      setInputVal('')
      return
    }

    if (cmd === 'help') {
      newHistory.push({
        type: 'output',
        text: `Available commands:\n` +
          `  about / bio        - Display biographical metadata\n` +
          `  skills / code      - Inspect system dependencies\n` +
          `  projects / repos   - Browse repositories & work\n` +
          `  experience / exp   - View career timeline\n` +
          `  leadership / man   - View manual page ldext\n` +
          `  contact / ping     - Open network ping coordinates\n` +
          `  resume / cv        - Open the verified resume PDF\n` +
          `  home / desktop     - Return to home workspace\n` +
          `  neofetch           - Run system hardware report\n` +
          `  whoami             - Show current user session\n` +
          `  date               - Print current system timestamp\n` +
          `  clear              - Clear terminal display`,
      })
    } else if (cmd === 'about' || cmd === 'bio') {
      newHistory.push({ type: 'success', text: 'Navigating to [Profile / bio.txt]...' })
      onViewChange('about')
    } else if (cmd === 'skills' || cmd === 'code' || cmd === 'deps') {
      newHistory.push({ type: 'success', text: 'Navigating to [Code / System Dependencies]...' })
      onViewChange('skills')
    } else if (cmd.startsWith('project') || cmd === 'repos') {
      newHistory.push({ type: 'success', text: 'Navigating to [Portfolio / Repositories]...' })
      onViewChange('projects')
    } else if (cmd === 'experience' || cmd === 'exp' || cmd === 'history') {
      newHistory.push({ type: 'success', text: 'Navigating to [History / /var/log/experience]...' })
      onViewChange('experience')
    } else if (cmd === 'leadership' || cmd === 'ldext' || cmd === 'man') {
      newHistory.push({ type: 'success', text: 'Navigating to [Manual / man ldext]...' })
      onViewChange('leadership')
    } else if (cmd === 'contact' || cmd === 'ping' || cmd === 'mail') {
      newHistory.push({ type: 'success', text: 'Navigating to [Network / Ping Coordinates]...' })
      onViewChange('contact')
    } else if (cmd === 'resume' || cmd === 'cv') {
      newHistory.push({ type: 'success', text: 'Navigating to [Resume / Raj_resume.pdf]...' })
      onViewChange('resume')
    } else if (cmd === 'home' || cmd === 'desktop') {
      newHistory.push({ type: 'success', text: 'Navigating to [Home Desktop]...' })
      onViewChange('home')
    } else if (cmd === 'whoami') {
      newHistory.push({ type: 'output', text: 'raj (Raj Mathuria) - AI/ML Researcher, System: DevOS Press v2.0.4' })
    } else if (cmd === 'date') {
      newHistory.push({ type: 'output', text: new Date().toString() })
    } else if (cmd === 'neofetch') {
      newHistory.push({
        type: 'raw',
        text: `       _,met$$$$$gg.          OS: DevOS Linux x86_64\n` +
`    ,g$$$$$$$$$$$$$$$P.       Kernel: 6.5.0-generic\n` +
`  ,g$$P"     """Y$$.".        Uptime: 14 days, 3 hours\n` +
` ,$$P'              \`$$$.     Packages: 2405 (dpkg)\n` +
`',$$P       ,ggs.     \`$$b:   Shell: bash 5.1.16\n` +
`\`d$$'     ,$P"'   .    $$$    Theme: Warm Newsprint [GTK3]\n` +
` $$P      d$'     ,    $$P    Icons: Material Symbols [GTK3]\n` +
` $$:      $$.   -    ,d$$'    Terminal: dev-term\n` +
` $$;      Y$b._   _,d$P'      Font: JetBrains Mono\n` +
` Y$$.    \`.\`"Y$$$$P"'\n` +
` \`$$b      "-.__\n` +
`  \`Y$$\n` +
`   \`Y$$.\n` +
`     \`$$b.\n` +
`       \`Y$$b.\n` +
`          \`"Y$b._\n` +
`              \`"""`,
      })
    } else {
      newHistory.push({
        type: 'error',
        text: `zsh: command not found: ${trimmed}. Type 'help' for valid operations.`,
      })
    }

    setHistory(newHistory)
    setInputVal('')
  }

  return (
    <div
      className={`terminal-dock ${!isOpen ? 'closed' : ''} ${isMinimized ? 'collapsed' : ''} ${isMaximized ? 'fullscreen' : ''}`}
      style={isMinimized ? { height: '36px' } : undefined}
    >
      {/* Terminal Header & Tabs */}
      <div className="terminal-header">
        <div className="terminal-tabs">
          <button
            type="button"
            className={`terminal-tab-btn ${activeTab === 'terminal' ? 'active' : ''}`}
            onClick={() => { setActiveTab('terminal'); setIsMinimized(false); }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>terminal</span>
            <span>Terminal</span>
          </button>
          <button
            type="button"
            className={`terminal-tab-btn ${activeTab === 'output' ? 'active' : ''}`}
            onClick={() => { setActiveTab('output'); setIsMinimized(false); }}
          >
            <span>Output</span>
          </button>
          <button
            type="button"
            className={`terminal-tab-btn ${activeTab === 'debug' ? 'active' : ''}`}
            onClick={() => { setActiveTab('debug'); setIsMinimized(false); }}
          >
            <span>Debug</span>
          </button>
        </div>

        <div className="terminal-window-actions">
          <button
            type="button"
            title={isMinimized ? 'Expand terminal' : 'Minimize terminal'}
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
              {isMinimized ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            </span>
          </button>
          <button
            type="button"
            title={isMaximized ? 'Restore height' : 'Maximize terminal'}
            onClick={() => { setIsMaximized(!isMaximized); setIsMinimized(false); }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
              {isMaximized ? 'close_fullscreen' : 'open_in_full'}
            </span>
          </button>
          <button
            type="button"
            title="Close terminal"
            onClick={onClose}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      {!isMinimized && (
        <div className="terminal-body">
          {activeTab === 'terminal' && (
            <>
              {history.map((item, idx) => (
                <div key={idx} className="terminal-line">
                  {item.type === 'command' && (
                    <div className="terminal-prompt-row">
                      <span className="terminal-prompt-label">{item.prompt}</span>
                      <span>{item.text}</span>
                    </div>
                  )}
                  {item.type === 'raw' && (
                    <pre style={{ margin: 0, fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>
                      {item.text}
                    </pre>
                  )}
                  {item.type === 'output' && (
                    <div className="output-dim" style={{ whiteSpace: 'pre-wrap' }}>
                      {item.text}
                    </div>
                  )}
                  {item.type === 'success' && (
                    <div className="output-green">{item.text}</div>
                  )}
                  {item.type === 'error' && (
                    <div className="output-crimson">{item.text}</div>
                  )}
                </div>
              ))}

              <form onSubmit={handleCommand} className="terminal-prompt-row">
                <span className="terminal-prompt-label">{getPromptString()}</span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Type a command (e.g. 'help', 'projects', 'about', 'skills')..."
                  className="terminal-input-field"
                  autoFocus
                />
              </form>
            </>
          )}

          {activeTab === 'output' && (
            <div className="output-dim" style={{ lineHeight: 1.8 }}>
              <div>[BUILD] Vite production bundle compiled (dist/index.html 0.49 kB)</div>
              <div>[HMR] Dev server running on http://localhost:5173/</div>
              <div>[FASTAPI] Backend proxy active on http://localhost:8000/api/</div>
              <div>[STATUS] System status: ONLINE | Latency: 4ms | WebSockets: connected</div>
            </div>
          )}

          {activeTab === 'debug' && (
            <div className="output-dim" style={{ lineHeight: 1.8 }}>
              <div>[DBG] OS Mode: {mode}</div>
              <div>[DBG] Active View: {activeView}</div>
              <div>[DBG] Viewport: {typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '1920x1080'}</div>
              <div>[DBG] Memory Heap: 28.4 MB / 64 MB</div>
              <div>[DBG] Network state: ONLINE (0 packet loss)</div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  )
}
