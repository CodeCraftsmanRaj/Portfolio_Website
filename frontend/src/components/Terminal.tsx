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
  const [terminalHeight, setTerminalHeight] = useState(220)
  const [isResizing, setIsResizing] = useState(false)
  const [history, setHistory] = useState<CommandHistoryItem[]>([])
  const [asciiPortrait, setAsciiPortrait] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const tabOrder = ['terminal', 'output', 'debug'] as const
  // Ref to the terminal dock element so we can update height synchronously during drag
  const terminalDockRef = useRef<HTMLDivElement>(null)
  // Track the "live" height during drag without re-rendering
  const liveHeightRef = useRef(220)

  useEffect(() => {
    let cancelled = false

    fetch('/Raj_Image_500.txt')
      .then((response) => response.ok ? response.text() : '')
      .then((text) => {
        if (!cancelled) setAsciiPortrait(text)
      })
      .catch(() => {
        if (!cancelled) setAsciiPortrait('')
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!isResizing) return

    const handlePointerMove = (event: PointerEvent) => {
      const headerHeight = mode === 'LINUX' ? 36 : 48
      const bottomOffset = mode === 'MAC' ? 88 : mode === 'WIN' ? 64 : 0
      const maxHeight = Math.max(180, window.innerHeight - headerHeight - bottomOffset)
      const nextHeight = Math.min(maxHeight, Math.max(120, window.innerHeight - event.clientY))
      liveHeightRef.current = nextHeight
      if (terminalDockRef.current) {
        terminalDockRef.current.style.height = `${nextHeight}px`
      }
      document.documentElement.style.setProperty('--terminal-h', `${nextHeight}px`)
    }
    const stopResizing = () => {
      // Sync React state with final drag value on release
      setTerminalHeight(liveHeightRef.current)
      setIsResizing(false)
    }

    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerup', stopResizing)
    document.body.style.cursor = 'ns-resize'
    document.body.style.userSelect = 'none'

    return () => {
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerup', stopResizing)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isResizing])

  // Expose terminal height as CSS custom property for responsive canvas fitting
  useEffect(() => {
    let effectiveHeight = 0
    if (isOpen) {
      if (isMinimized) {
        effectiveHeight = 36
      } else if (isMaximized) {
        effectiveHeight = window.innerHeight
      } else {
        effectiveHeight = terminalHeight
      }
    }
    document.documentElement.style.setProperty('--terminal-h', `${effectiveHeight}px`)
  }, [isOpen, isMinimized, isMaximized, terminalHeight])

  useEffect(() => {
    if (!isOpen) return

    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const isTypingInInput = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement

      if ((event.ctrlKey || event.metaKey || event.altKey) && event.key === 'Tab') {
        event.preventDefault()
        const currentIndex = tabOrder.indexOf(activeTab)
        const direction = event.shiftKey ? -1 : 1
        const nextIndex = (currentIndex + direction + tabOrder.length) % tabOrder.length
        setActiveTab(tabOrder[nextIndex])
        return
      }

      if (event.key === 'Tab' && isTypingInInput) {
        event.preventDefault()
        const value = inputVal.trim()
        if (!value) return

        const token = value.split(/\s+/).at(-1) ?? value
        const suggestions = [
          'about', 'bio', 'skills', 'code', 'projects', 'repos', 'experience', 'exp', 'leadership',
          'ldext', 'man', 'contact', 'ping', 'mail', 'resume', 'cv', 'home', 'desktop', 'help',
          'whoami', 'date', 'clear', 'cls', 'neofetch',
        ]

        const match = suggestions.find((cmd) => cmd.startsWith(token.toLowerCase()))
        if (!match) return

        const prefix = value.slice(0, value.length - token.length)
        setInputVal(`${prefix}${match}`)
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [isOpen, activeTab, inputVal])

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
      } else if (mode === 'ANDROID') {
        initialText = `Android Debug Bridge Shell (adb)\nDevice: Pixel 8 Pro [Android 14 (API 34)]\nHost: devos-mobile.local\n\nshell@android:/ $ getprop ro.build.version.release\n14\nshell@android:/ $ uname -a\nLinux localhost 6.1.57-android14 #1 SMP PREEMPT aarch64\n\nType 'help' to view available commands.`
      } else if (mode === 'IOS') {
        initialText = `Darwin Kernel Version 23.4.0: root:xnu-10063.101.17~1/RELEASE_ARM64_T8120\niPhone 15 Pro Max (iPhone16,2) - iOS 18.0 (22A3354)\n\niPhone:~ mobile$ sysctl -n hw.model\niPhone16,2\niPhone:~ mobile$ uptime\n14:32 up 6 days, 22 hrs, 1 user, load averages: 1.12 1.05 0.98\n\nType 'help' for available commands.`
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
    if (mode === 'ANDROID') return 'shell@android:/ $'
    if (mode === 'IOS') return 'iPhone:~ mobile$ '
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

  const renderHistory = () => history.map((item, idx) => (
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
      {item.type === 'success' && <div className="output-green">{item.text}</div>}
      {item.type === 'error' && <div className="output-crimson">{item.text}</div>}
    </div>
  ))

  return (
    <div
      ref={terminalDockRef}
      className={`terminal-dock ${!isOpen ? 'closed' : ''} ${isMinimized ? 'collapsed' : ''} ${isMaximized ? 'fullscreen' : ''} ${isOpen ? 'is-open' : ''}`}
      style={isMinimized ? { height: '36px' } : isMaximized ? undefined : { height: `${terminalHeight}px` }}
      aria-live="polite"
    >
      <div
        className="terminal-resize-handle"
        role="separator"
        aria-label="Resize terminal"
        onPointerDown={() => {
          if (!isMaximized && !isMinimized) setIsResizing(true)
        }}
      />
      {/* Terminal Header & Tabs */}
      <div className="terminal-header">
        {(mode === 'ANDROID' || mode === 'IOS') && (
          <div
            className="terminal-bottom-sheet-handle"
            onClick={() => setIsMinimized(!isMinimized)}
            style={{ cursor: 'pointer' }}
            title="Drag to resize / collapse"
          />
        )}
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
              {activeView === 'home' && (
                <div className="terminal-neofetch-layout">
                  <div className="terminal-neofetch-art">
                    <pre>{asciiPortrait || 'profile.art // loading Raj_Image_500.txt'}</pre>
                    <span>profile.art // Raj_Image_500.txt</span>
                  </div>
                  <div className="terminal-neofetch-details">
                    {renderHistory()}
                  </div>
                </div>
              )}
              {activeView !== 'home' && renderHistory()}

              <form onSubmit={handleCommand} className="terminal-prompt-row">
                <span className="terminal-prompt-label">{getPromptString()}</span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Tab') {
                      e.preventDefault()
                      const value = inputVal.trim()
                      if (!value) return

                      const token = value.split(/\s+/).at(-1) ?? value
                      const suggestions = [
                        'about', 'bio', 'skills', 'code', 'projects', 'repos', 'experience', 'exp', 'leadership',
                        'ldext', 'man', 'contact', 'ping', 'mail', 'resume', 'cv', 'home', 'desktop', 'help',
                        'whoami', 'date', 'clear', 'cls', 'neofetch',
                      ]

                      const match = suggestions.find((cmd) => cmd.startsWith(token.toLowerCase()))
                      if (!match) return

                      const prefix = value.slice(0, value.length - token.length)
                      setInputVal(`${prefix}${match}`)
                    }
                  }}
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
