import { FormEvent, useState } from 'react'
import { Code2, FolderOpen, Home, Mail, Menu, MonitorCog, Network, PersonStanding, Send, Settings, Terminal, X } from 'lucide-react'

type OsMode = 'MAC' | 'WIN' | 'LINUX'
type View = 'home' | 'profile' | 'skills' | 'projects' | 'contact'

const commands = [
  ['help', 'show this help'],
  ['about', 'bio and contact'],
  ['skills', 'list skill categories'],
  ['projects [name]', 'list or show project details'],
  ['clear', 'clear terminal'],
]

const views: Record<View, { label: string; icon: typeof Home }> = {
  home: { label: 'Home', icon: Home },
  profile: { label: 'Profile', icon: PersonStanding },
  skills: { label: 'Code', icon: Code2 },
  projects: { label: 'Portfolio', icon: FolderOpen },
  contact: { label: 'Contact', icon: Mail },
}

function App() {
  const [mode, setMode] = useState<OsMode>('MAC')
  const [view, setView] = useState<View>('home')
  const [terminalOpen, setTerminalOpen] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [sent, setSent] = useState(false)

  function runCommand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const command = terminalInput.trim().toLowerCase()
    if (!command) return
    if (command === 'clear') setTerminalLines([])
    else if (command === 'about') setView('profile')
    else if (command === 'skills') setView('skills')
    else if (command.startsWith('projects')) setView('projects')
    else setTerminalLines((lines) => [...lines, `guest@portfolio:~$ ${command}`, command === 'help' ? 'Try: about, skills, projects, or clear' : 'command not found — type help for available commands'])
    setTerminalInput('')
  }

  function navigate(nextView: View) {
    setView(nextView)
    setMenuOpen(false)
    if (nextView === 'contact') setTerminalOpen(false)
  }

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: form.get('name'), email: form.get('email'), message: form.get('message') }) })
    if (response.ok) { setSent(true); event.currentTarget.reset() }
  }

  const CurrentIcon = views[view].icon
  return (
    <div className={`os-shell mode-${mode.toLowerCase()}`}>
      <header className="topbar">
        <button className="brand" onClick={() => navigate('home')}>THE ARCHIVAL TERMINAL</button>
        <nav className={menuOpen ? 'top-nav open' : 'top-nav'}>
          <button onClick={() => navigate('home')}>HELP</button><button onClick={() => navigate('profile')}>ABOUT</button><button onClick={() => navigate('skills')}>SKILLS</button><button onClick={() => navigate('projects')}>PROJECTS</button>
        </nav>
        <div className="top-tools"><button title="Settings"><Settings size={20} /></button><button title="Toggle terminal" onClick={() => setTerminalOpen(!terminalOpen)}><Terminal size={20} /></button><button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></div>
      </header>
      <div className="workspace">
        <aside className="sidebar">
          <div className="identity"><img src="/stitch-dock.png" alt="Developer OS archival portrait" /><h2>Shivsharan_Sanjawad</h2><p>V0.4.2-STABLE</p></div>
          <nav className="side-nav">{Object.entries(views).map(([key, item]) => { const Icon = item.icon; return <button className={view === key ? 'active' : ''} key={key} onClick={() => navigate(key as View)}><Icon size={20} /><span>{item.label}</span></button> })}</nav>
          <button className="touch-button" onClick={() => navigate('contact')}>GET IN TOUCH</button>
        </aside>
        <main className="canvas">
          <div className="os-switcher">{(['MAC', 'WIN', 'LINUX'] as OsMode[]).map((os) => <button className={mode === os ? 'selected' : ''} key={os} onClick={() => setMode(os)}>{os}</button>)}</div>
          <section className="window-card">
            <div className="window-bar"><div className="window-dots"><i></i><i></i><i></i></div><span>~/shivsharan/profile.init</span><CurrentIcon size={15} /></div>
            {view === 'home' && <div className="hero-window"><div className="stitch-frame"><img src="/stitch-developer-os.png" alt="Stitch Developer OS portfolio reference" /></div><div className="system-copy"><span className="prompt">&gt;</span><h1>ROOT@<br />DEVELOPER_OS</h1><div className="status-lines"><p>&gt; RUNNING SYSTEM CHECK...</p><p>&gt; STATUS: <b>ONLINE</b></p><p>&gt; ROLE: Full Stack Developer</p><p>&gt; INIT PORTFOLIO SEQUENCE... <em></em></p></div><div className="hero-actions"><button onClick={() => navigate('projects')}>./EXECUTE_PORTFOLIO</button><button className="outline" onClick={() => setTerminalOpen(!terminalOpen)}>VIEW_LOGS</button></div></div></div>}
            {view === 'profile' && <section className="content-view"><span className="prompt">&gt; cat about.md</span><h1>SHIVSHARAN<br /><i>SANJAWAD</i></h1><p>I’m a full stack developer focused on building clear, useful products from complex ideas. I work across product thinking, interface design, and code.</p><p className="muted">Curious by default. Careful with details. Available for select projects in 2026.</p></section>}
            {view === 'skills' && <section className="content-view"><span className="prompt">&gt; ls skills/</span><h1>TECHNICAL<br /><i>SKILLS</i></h1><div className="skill-grid"><span>React / TypeScript</span><span>Python / FastAPI</span><span>Node.js / APIs</span><span>PostgreSQL</span><span>UI systems</span><span>Cloud deployment</span></div></section>}
            {view === 'projects' && <section className="content-view"><span className="prompt">&gt; projects --all</span><h1>SELECTED<br /><i>PROJECTS</i></h1><div className="project-grid"><article><b>01 / HEALTH</b><h2>Care systems</h2><p>Human-centered tools for everyday health teams.</p></article><article><b>02 / CIVIC</b><h2>Commonplace</h2><p>Digital experiences that turn ideas into action.</p></article><article><b>03 / OPEN SOURCE</b><h2>Field Notes</h2><p>Research infrastructure for messy signals.</p></article></div></section>}
            {view === 'contact' && <section className="content-view contact-view"><span className="prompt">&gt; open contact.form</span><h1>START A<br /><i>CONVERSATION</i></h1><form onSubmit={submitContact}><label>NAME<input name="name" required placeholder="Your name" /></label><label>EMAIL<input name="email" required type="email" placeholder="you@somewhere.com" /></label><label>MESSAGE<textarea name="message" required rows={3} placeholder="Tell me about the project..." /></label><button type="submit"><Send size={16} /> {sent ? 'MESSAGE SENT' : 'SEND MESSAGE'}</button></form></section>}
          </section>
          {terminalOpen && <section className="terminal-dock"><div className="terminal-tabs"><span><Terminal size={14} /> Terminal</span><span>Output</span><span>Debug</span><button onClick={() => setTerminalOpen(false)}>×</button></div><div className="terminal-body"><p className="green">Available commands:</p>{commands.map(([command, description]) => <p key={command}><strong>{command}</strong><span>→ {description}</span></p>)}{terminalLines.map((line, index) => <p key={`${line}-${index}`} className="terminal-result">{line}</p>)}<form onSubmit={runCommand}><span>guest@portfolio:~$</span><input value={terminalInput} onChange={(event) => setTerminalInput(event.target.value)} placeholder="Type a command..." aria-label="Terminal command" /></form></div></section>}
        </main>
      </div>
    </div>
  )
}

export default App
