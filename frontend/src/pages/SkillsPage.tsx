import React from 'react';
import { OsMode, PageView, coreLanguages, frameworkGroups, buildTools } from '../data/portfolioData';
import { WindowCard } from '../components/WindowCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface SkillsPageProps {
  mode: OsMode;
  onWindowClose?: (view: PageView) => void;
}

export const SkillsPage: React.FC<SkillsPageProps> = ({ mode, onWindowClose }) => {
  const containerRef = useScrollReveal();

  return (
    <div ref={containerRef} style={{ maxWidth: '1120px', width: '100%', margin: '0 auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <WindowCard mode={mode} activeView="skills" title="~/skills/dependencies.lock" onClose={() => onWindowClose?.('skills')}>
        <div style={{ padding: '36px 40px' }}>
          <div className="skills-layout-grid">
            <div className="mobile-stack-overview">
              <h2 data-reveal className="skills-section-title">
                <span className="material-symbols-outlined crimson-text">code</span>
                <span>Primary Stack</span>
              </h2>
              <p className="mobile-stack-intro">
                Tools I use to move from research ideas to production systems.
              </p>
              <div className="mobile-stack-list">
                {coreLanguages.map((skill) => (
                  <article key={skill.name} data-reveal className="mobile-stack-card">
                    <span className="mobile-stack-icon material-symbols-outlined">terminal</span>
                    <div>
                      <h3>{skill.name}</h3>
                      <p>{skill.version}</p>
                    </div>
                    <span className="material-symbols-outlined mobile-stack-arrow">arrow_outward</span>
                  </article>
                ))}
              </div>
              <div data-reveal className="runtime-environment">
                <span className="runtime-label">Runtime Environment</span>
                <div>Node.js v20.x / Python 3.12</div>
                <div>Docker 25.0 (rootless) / Kubernetes / Helm</div>
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
