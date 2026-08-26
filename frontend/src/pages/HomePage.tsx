import React from 'react'
import { OsMode, PageView, personalData } from '../data/portfolioData'
import { WindowCard } from '../components/WindowCard'

interface HomePageProps {
  mode: OsMode
  onViewChange: (view: PageView) => void
  onToggleTerminal: () => void
}

export const HomePage: React.FC<HomePageProps> = ({
  mode,
  onViewChange,
  onToggleTerminal,
}) => {
  // LINUX MODE HERO
  if (mode === 'LINUX') {
    return (
      <WindowCard mode={mode} activeView="home" title="~/portfolio/home.md">
        <div style={{ padding: '36px 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '32px' }}>
            <div style={{ gridColumn: 'span 8', paddingRight: '24px', borderRight: '1px solid var(--outline-variant)' }}>
              <h1 className="hero-main-heading" style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '16px' }}>
                {personalData.linuxHeadline}
              </h1>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', lineHeight: 1.7, color: 'var(--on-surface-variant)', marginBottom: '32px' }}>
                {personalData.linuxSubHeadline}
              </p>

              {/* Bento Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '24px' }}>
                <div
                  className="os-double-border"
                  style={{
                    gridColumn: 'span 2',
                    padding: '20px',
                    cursor: 'pointer',
                  }}
                  onClick={() => onViewChange('projects')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 600 }}>Core Distributed System</h3>
                    <span className="material-symbols-outlined crimson-text">arrow_outward</span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', color: 'var(--on-surface-variant)', marginBottom: '14px' }}>
                    Rust-based consensus protocol implementation handling 10k+ TPS with zero-cost abstractions.
                  </p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span className="tag-badge active-tag">Rust</span>
                    <span className="tag-badge">Raft</span>
                    <span className="tag-badge">Tokio</span>
                  </div>
                </div>

                <div className="hairline-border" style={{ padding: '16px', background: 'var(--surface-container-low)' }}>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', marginBottom: '8px' }}>System Stats</h4>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--on-surface-variant)', lineHeight: 1.7 }}>
                    <div>Uptime: 99.999%</div>
                    <div>Commits: 14,203</div>
                    <div>Clusters: 12 Nodes</div>
                  </div>
                </div>

                <div
                  className="hairline-border"
                  style={{
                    padding: '16px',
                    background: 'var(--surface-container-low)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                  }}
                  onClick={onToggleTerminal}
                >
                  <span className="material-symbols-outlined crimson-text" style={{ fontSize: 28 }}>terminal</span>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '16px' }}>CLI Tooling & Logs</h4>
                </div>
              </div>
            </div>

            {/* Linux Right Column */}
            <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--on-surface-variant)', borderBottom: '1px solid var(--outline-variant)', paddingBottom: '8px', marginBottom: '12px' }}>
                  Status
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#4CAF50', display: 'inline-block' }}></span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600 }}>Available for opportunities</span>
                </div>
              </div>

              <div>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--on-surface-variant)', borderBottom: '1px solid var(--outline-variant)', paddingBottom: '8px', marginBottom: '12px' }}>
                  Technologies
                </h4>
                <ul style={{ listStyle: 'none', fontFamily: 'var(--font-mono)', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li><span className="crimson-text" style={{ marginRight: 6 }}>&gt;</span> Linux Kernel & Containers</li>
                  <li><span className="crimson-text" style={{ marginRight: 6 }}>&gt;</span> Rust / TypeScript / Python</li>
                  <li><span className="crimson-text" style={{ marginRight: 6 }}>&gt;</span> Kubernetes & Microservices</li>
                  <li><span className="crimson-text" style={{ marginRight: 6 }}>&gt;</span> PostgreSQL & Redis</li>
                </ul>
              </div>

              <div style={{ marginTop: 'auto' }}>
                <button
                  type="button"
                  className="btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => onViewChange('projects')}
                >
                  Inspect Repositories
                </button>
              </div>
            </div>
          </div>
        </div>
      </WindowCard>
    )
  }

  // WINDOWS MODE HERO
  if (mode === 'WIN') {
    return (
      <WindowCard mode={mode} activeView="home" title="C:\Users\Root\Home.exe">
        <div style={{ padding: '36px 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '32px' }}>
            <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ borderBottom: '4px solid var(--primary)', paddingBottom: '16px' }}>
                <h1 className="hero-main-heading" style={{ marginBottom: '8px' }}>
                  SYSTEM ARCHITECT <br />&amp; LEAD DEVELOPER
                </h1>
                <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '20px', color: 'var(--on-surface-variant)' }}>
                  {personalData.subHeadline}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="hairline-border" style={{ padding: '16px', background: 'var(--surface)' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 600, marginBottom: '10px' }} className="crimson-text">
                    Core Competencies
                  </h3>
                  <ul style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', listStylePosition: 'inside', lineHeight: 1.8 }}>
                    <li>Full-Stack Development</li>
                    <li>System Architecture</li>
                    <li>Cloud Deployment</li>
                    <li>Performance Optimization</li>
                  </ul>
                </div>

                <div className="hairline-border" style={{ padding: '16px', background: 'var(--surface)' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 600, marginBottom: '10px' }} className="crimson-text">
                    Recent Deployments
                  </h3>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', color: 'var(--on-surface-variant)' }}>
                    Successfully launched v2.0 of the enterprise data visualization suite, reducing load times by 40%.
                  </p>
                </div>
              </div>

              <div className="hero-schematic-frame" style={{ maxWidth: '100%' }}>
                <img
                  src="/stitch-developer-os.png"
                  alt="System Architecture Interface Schematic"
                  style={{ height: '220px' }}
                />
                <div className="hero-schematic-caption">
                  <span>INTERFACE WORKSPACE // HARDWARE &amp; LOGIC</span>
                  <span>REV. 2026</span>
                </div>
              </div>
            </div>

            {/* Windows Right Column: Stats & Logs */}
            <div style={{ gridColumn: 'span 4', borderLeft: '1px solid var(--outline-variant)', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ background: 'var(--surface-variant)', padding: '16px', border: '1px solid var(--outline-variant)' }}>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid var(--outline-variant)', paddingBottom: '6px', marginBottom: '10px' }}>
                  System Status
                </h4>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Uptime:</span>
                    <b>99.99%</b>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Projects:</span>
                    <b>42 Active</b>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Coffee:</span>
                    <b className="crimson-text">Critical</b>
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 600, borderBottom: '2px solid var(--primary)', paddingBottom: '8px', marginBottom: '14px' }}>
                  Latest Logs
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                  <div style={{ borderBottom: '1px solid var(--outline-variant)', paddingBottom: '8px' }}>
                    <span className="crimson-text" style={{ display: 'block', fontSize: '11px' }}>2026-08-20</span>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '14px' }}>Refactored distributed authentication pipeline.</span>
                  </div>
                  <div style={{ borderBottom: '1px solid var(--outline-variant)', paddingBottom: '8px' }}>
                    <span className="crimson-text" style={{ display: 'block', fontSize: '11px' }}>2026-08-14</span>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '14px' }}>Published new technical breakdown on consensus algorithms.</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => onViewChange('projects')}
                >
                  Execute Portfolio
                </button>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={onToggleTerminal}
                >
                  Open Command Prompt
                </button>
              </div>
            </div>
          </div>
        </div>
      </WindowCard>
    )
  }

  // DEFAULT / MAC MODE HERO
  return (
    <WindowCard mode={mode} activeView="home" title="~/profile/init.exe">
      <div className="hero-window-content">
        {/* Left: Schematic Frame */}
        <div className="hero-schematic-frame">
          <img
            src="/stitch-developer-os.png"
            alt="Developer OS Interface Schematic"
          />
          <div className="hero-schematic-caption">
            <span>DEVELOPER OS INTERFACE // SCHEMATIC</span>
            <span>REV. 1987-STABLE</span>
          </div>
        </div>

        {/* Right: Boot Sequence & Actions */}
        <div className="hero-system-copy">
          <div className="hero-prompt-line">&gt; ROOT@DEVELOPER_OS</div>
          <h1 className="hero-main-heading">
            SHIVSHARAN<br />SANJAWAD
          </h1>

          <div className="hero-status-box">
            <p>&gt; RUNNING SYSTEM CHECK...</p>
            <p>&gt; STATUS: <span className="badge-online">ONLINE</span></p>
            <p>&gt; ROLE: {personalData.role}</p>
            <p>
              &gt; INIT PORTFOLIO SEQUENCE... <span className="blinking-cursor"></span>
            </p>
          </div>

          <div className="hero-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={() => onViewChange('projects')}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>play_arrow</span>
              <span>./EXECUTE_PORTFOLIO</span>
            </button>
            <button
              type="button"
              className="btn-outline"
              onClick={onToggleTerminal}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>terminal</span>
              <span>VIEW_LOGS</span>
            </button>
          </div>
        </div>
      </div>
    </WindowCard>
  )
}
