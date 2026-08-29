import React from 'react';
import { OsMode, coreLanguages, frameworkGroups, buildTools } from '../data/portfolioData';
import { WindowCard } from '../components/WindowCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface SkillsPageProps {
  mode: OsMode;
}

export const SkillsPage: React.FC<SkillsPageProps> = ({ mode }) => {
  const containerRef = useScrollReveal();

  return (
    <div ref={containerRef} style={{ maxWidth: '1120px', width: '100%', margin: '0 auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Header Section */}
      <div data-reveal className="skills-page-header">
        <h1>System Dependencies</h1>
        <p>
          A comprehensive overview of the installed packages, frameworks, and core languages operating within this environment. Data is organized by dependency layer.
        </p>
      </div>

      <WindowCard mode={mode} activeView="skills" title="~/skills/dependencies.lock">
        <div style={{ padding: '36px 40px' }}>
          <div className="skills-layout-grid">
            {/* Core Binaries Progress Bars */}
            <div>
              <h2 data-reveal className="skills-section-title">
                <span className="material-symbols-outlined crimson-text">code</span>
                <span>Core Binaries</span>
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {coreLanguages.map((skill) => (
                  <div key={skill.name} data-reveal className="skill-progress-item hover-lift">
                    <div className="skill-progress-header">
                      <span className="name">{skill.name}</span>
                      <span className="version">{skill.version}</span>
                    </div>
                    <div className="skill-progress-bar">
                      <div
                        className="skill-progress-fill"
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Extra OS Environment Info */}
              <div
                data-reveal
                className="hairline-border hover-lift"
                style={{
                  marginTop: '28px',
                  padding: '16px',
                  background: 'var(--surface-container-low)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  lineHeight: 1.8,
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: '6px', color: 'var(--on-surface)' }}>
                  RUNTIME ENVIRONMENT
                </div>
                <div>Runtime: Node.js v20.x / Python 3.12</div>
                <div>Container Engine: Docker 25.0 (rootless)</div>
                <div>Orchestration: Kubernetes / Helm</div>
              </div>
            </div>

            {/* Frameworks Bento 2x2 Grid */}
            <div>
              <h2 data-reveal className="skills-section-title">
                <span className="material-symbols-outlined crimson-text">layers</span>
                <span>Framework Dependencies</span>
              </h2>

              <div className="frameworks-bento-grid">
                {frameworkGroups.map((group) => (
                  <div
                    key={group.title}
                    data-reveal
                    className="os-double-border framework-card hover-lift"
                  >
                    <div className="framework-card-header">
                      <h3>{group.title}</h3>
                      <span className="material-symbols-outlined muted-text" style={{ fontSize: 20 }}>
                        {group.icon}
                      </span>
                    </div>
                    <p>{group.subtitle}</p>
                    <div className="framework-tags">
                      {group.tags.map((tag, idx) => (
                        <span
                          key={tag}
                          className={`tag-badge ${idx === 0 ? 'highlight-tag' : ''}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Build & Deployment Tools */}
              <div className="build-tools-section">
                <h2 data-reveal className="skills-section-title">
                  <span className="material-symbols-outlined crimson-text">build</span>
                  <span>Build &amp; Deployment Tools</span>
                </h2>
                <div className="build-tools-grid">
                  {buildTools.map((tool) => (
                    <div key={tool} data-reveal className="tool-chip hover-lift">
                      <span className="material-symbols-outlined crimson-text" style={{ fontSize: 16 }}>
                        check_circle
                      </span>
                      <span>{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </WindowCard>
    </div>
  );
};
