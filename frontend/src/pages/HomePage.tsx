import React from 'react';
import { OsMode, PageView, personalData } from '../data/portfolioData';
import { WindowCard } from '../components/WindowCard';
import { useTypewriter } from '../hooks/useTypewriter';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface HomePageProps {
  mode: OsMode;
  onViewChange: (view: PageView) => void;
  onToggleTerminal: () => void;
  onWindowClose?: (view: PageView) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  mode,
  onViewChange,
  onToggleTerminal,
  onWindowClose,
}) => {
  const containerRef = useScrollReveal();

  // Mac boot lines typewriter
  const macBootLines = [
    '> RUNNING SYSTEM CHECK...',
    '> STATUS: ONLINE [ALL CORES GREEN]',
    `> ROLE: ${personalData.role}`,
    '> INIT PORTFOLIO SEQUENCE... READY',
  ];
  const { lines: typedMacLines } = useTypewriter(macBootLines, {
    osMode: 'MAC',
    speed: 25,
  });

  // LINUX MODE HERO
  if (mode === 'LINUX') {
    return (
      <WindowCard mode={mode} activeView="home" title="~/portfolio/home.md" onClose={() => onWindowClose?.('home')}>
        <div ref={containerRef} style={{ padding: '36px 40px 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '32px' }}>
            <div style={{ gridColumn: 'span 8', paddingRight: '24px', borderRight: '1px solid var(--outline-variant)', display: 'flex', flexDirection: 'column' }}>
              <h1
                data-reveal="left"
                className="hero-main-heading is-revealed"
                style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '16px' }}
              >
                {personalData.linuxHeadline}
              </h1>
              <p
                data-reveal
                style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', lineHeight: 1.7, color: 'var(--on-surface-variant)', marginBottom: '24px' }}
              >
                {personalData.linuxSubHeadline}
              </p>

              {/* Bento Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                <div
                  data-reveal
                  className="os-double-border hover-lift"
                  style={{
                    gridColumn: 'span 2',
                    padding: '20px',
                    cursor: 'pointer',
                  }}
                  onClick={() => onViewChange('projects')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 600 }}>Smart India Hackathon Winner</h3>
                    <span className="material-symbols-outlined crimson-text">arrow_outward</span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', color: 'var(--on-surface-variant)', marginBottom: '14px' }}>
                    A real-time deepfake detection system that reached 98% accuracy and won first place nationally among 87,000 teams.
                  </p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span className="tag-badge active-tag">Python</span>
                    <span className="tag-badge">CNN</span>
                    <span className="tag-badge">DDP</span>
                  </div>
                </div>

                <div data-reveal className="hairline-border hover-lift" style={{ padding: '16px', background: 'var(--surface-container-low)' }}>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', marginBottom: '8px' }}>System Stats</h4>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--on-surface-variant)', lineHeight: 1.7 }}>
                    <div>Experience: 1.5+ years</div>
                    <div>Research: ISRO SAC</div>
                    <div>Focus: AI/ML systems</div>
                  </div>
                </div>

                <div
                  data-reveal
                  className="hairline-border hover-lift btn-press"
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
            <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Linux User Identity Card */}
              <div data-reveal style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', background: 'var(--surface-container-low)', border: '1px solid var(--outline-variant)', borderRadius: '8px' }}>
                <img
                  src="/Raj_Image_500.JPG"
                  alt="Raj Mathuria"
                  style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', objectPosition: '50% 18%', border: '2px solid var(--primary)' }}
                />
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700 }}>raj@devos-kernel</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--on-surface-variant)' }}>uid=1000(raj)</div>
                </div>
              </div>

              <div data-reveal>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--on-surface-variant)', borderBottom: '1px solid var(--outline-variant)', paddingBottom: '8px', marginBottom: '12px' }}>
                  Status
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#4CAF50', display: 'inline-block' }}></span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600 }}>Available for opportunities</span>
                </div>
              </div>

              <div data-reveal>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--on-surface-variant)', borderBottom: '1px solid var(--outline-variant)', paddingBottom: '8px', marginBottom: '12px' }}>
                  Technologies
                </h4>
                <ul style={{ listStyle: 'none', fontFamily: 'var(--font-mono)', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li><span className="crimson-text" style={{ marginRight: 6 }}>&gt;</span> Deep Learning & Computer Vision</li>
                  <li><span className="crimson-text" style={{ marginRight: 6 }}>&gt;</span> Generative AI, LLMs & RAG</li>
                  <li><span className="crimson-text" style={{ marginRight: 6 }}>&gt;</span> Scientific ML & Satellite Data</li>
                  <li><span className="crimson-text" style={{ marginRight: 6 }}>&gt;</span> Production APIs & Azure</li>
                </ul>
              </div>

              <div data-reveal style={{ marginTop: '24px' }}>
                <button
                  type="button"
                  className="btn-primary btn-press"
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
    );
  }

  // WINDOWS MODE HERO
  if (mode === 'WIN') {
    return (
      <WindowCard mode={mode} activeView="home" title="C:\Users\Root\Home.exe" onClose={() => onWindowClose?.('home')}>
        <div ref={containerRef} style={{ padding: '36px 40px 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '32px' }}>
            <div style={{ gridColumn: 'span 7', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div data-reveal="left" style={{ borderBottom: '4px solid var(--primary)', paddingBottom: '16px' }}>
                <h1 className="hero-main-heading" style={{ marginBottom: '8px' }}>
                  AI/ML ENGINEER <br />&amp; RESEARCHER
                </h1>
                <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '18px', color: 'var(--on-surface-variant)' }}>
                  {personalData.subHeadline}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div data-reveal className="hairline-border hover-lift" style={{ padding: '16px', background: 'var(--surface)' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', fontWeight: 600, marginBottom: '8px' }} className="crimson-text">
                    Core Competencies
                  </h3>
                  <ul style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', listStylePosition: 'inside', lineHeight: 1.8 }}>
                    <li>Full-Stack Development</li>
                    <li>System Architecture</li>
                    <li>Cloud Deployment</li>
                    <li>Performance Optimization</li>
                  </ul>
                </div>

                <div data-reveal className="hairline-border hover-lift" style={{ padding: '16px', background: 'var(--surface)' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', fontWeight: 600, marginBottom: '8px' }} className="crimson-text">
                    Recent Deployments
                  </h3>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '13px', color: 'var(--on-surface-variant)', lineHeight: 1.6 }}>
                    Built 5+ production AI solutions at Systems Plus, reducing manual effort by 60-80%.
                  </p>
                </div>
              </div>

              <div data-reveal style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button
                  type="button"
                  className="btn-primary btn-press"
                  style={{ flex: 1 }}
                  onClick={() => onViewChange('projects')}
                >
                  Execute Portfolio
                </button>
                <button
                  type="button"
                  className="btn-outline btn-press"
                  style={{ flex: 1 }}
                  onClick={onToggleTerminal}
                >
                  Open Command Prompt
                </button>
              </div>
            </div>

            {/* Windows Right Column: Portrait Card & Stats */}
            <div style={{ gridColumn: 'span 5', borderLeft: '1px solid var(--outline-variant)', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div data-reveal className="hero-schematic-frame hover-lift" style={{ width: '100%', maxWidth: '340px', margin: '0 auto' }}>
                <img
                  src="/Raj_Image_500.JPG"
                  alt="Raj Mathuria profile portrait"
                  style={{ height: '240px' }}
                />
                <div className="hero-schematic-caption">
                  <span>DEVOS WORKSTATION // RAJ</span>
                  <span>REV. 2026</span>
                </div>
              </div>

              <div data-reveal style={{ background: 'var(--surface-variant)', padding: '14px', border: '1px solid var(--outline-variant)', borderRadius: '4px' }}>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid var(--outline-variant)', paddingBottom: '6px', marginBottom: '8px' }}>
                  System Status
                </h4>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Uptime:</span>
                    <b>1.5+ years</b>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Production AI:</span>
                    <b>5+ systems</b>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Research:</span>
                    <b className="crimson-text">ISRO / NASA</b>
                  </div>
                </div>
              </div>

              <div data-reveal style={{ marginTop: '8px' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', fontWeight: 600, borderBottom: '2px solid var(--primary)', paddingBottom: '6px', marginBottom: '10px' }}>
                  Latest Activity
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
                  <div style={{ borderBottom: '1px solid var(--outline-variant)', paddingBottom: '6px' }}>
                    <span className="crimson-text" style={{ display: 'block', fontSize: '10px' }}>2026-08-20</span>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '13px' }}>Built production AI systems with Azure OpenAI and RAG.</span>
                  </div>
                  <div>
                    <span className="crimson-text" style={{ display: 'block', fontSize: '10px' }}>2026-08-14</span>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '13px' }}>Led satellite-ground data fusion research at ISRO.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WindowCard>
    );
  }

  // DEFAULT / MAC / MOBILE MODE HERO
  return (
    <WindowCard mode={mode} activeView="home" title="~/profile/init.exe" onClose={() => onWindowClose?.('home')}>
      <div ref={containerRef} className="hero-window-content">
        {/* Left: Schematic Frame */}
        <div data-reveal="scale" className="hero-schematic-frame hover-lift">
          <img
            src="/Raj_Image_500.JPG"
            alt="Raj Mathuria profile portrait"
          />
          <div className="hero-schematic-caption">
            <span>DEVELOPER OS INTERFACE // SCHEMATIC</span>
            <span>REV. 1987-STABLE</span>
          </div>
        </div>

        {/* Right: Boot Sequence & Actions */}
        <div className="hero-system-copy">
          <div data-reveal className="hero-prompt-line">&gt; RAJ@AI_RESEARCH_LAB</div>
          <h1 data-reveal className="hero-main-heading">
            RAJ<br />MATHURIA
          </h1>

          <div data-reveal className="hero-status-box hover-lift">
            {typedMacLines.map((line, idx) => (
              <p key={idx}>
                {line.includes('ONLINE') ? (
                  <>
                    &gt; STATUS: <span className="badge-online">ONLINE</span> [ALL CORES GREEN]
                  </>
                ) : (
                  line
                )}
              </p>
            ))}
            <span className="blinking-cursor"></span>
          </div>

          <div data-reveal className="hero-actions">
            <button
              type="button"
              className="btn-primary btn-press"
              onClick={() => onViewChange('projects')}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>play_arrow</span>
              <span>./EXECUTE_PORTFOLIO</span>
            </button>
            <button
              type="button"
              className="btn-outline btn-press"
              onClick={onToggleTerminal}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>terminal</span>
              <span>VIEW_LOGS</span>
            </button>
          </div>
        </div>
      </div>
    </WindowCard>
  );
};
