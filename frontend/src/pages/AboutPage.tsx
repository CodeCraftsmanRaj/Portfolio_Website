import React from 'react';
import { OsMode, PageView, personalData, education, publications } from '../data/portfolioData';
import { WindowCard } from '../components/WindowCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface AboutPageProps {
  mode: OsMode;
  onViewChange: (view: PageView) => void;
  onWindowClose?: (view: PageView) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ mode, onViewChange, onWindowClose }) => {
  const containerRef = useScrollReveal();

  return (
    <div ref={containerRef} style={{ maxWidth: '1120px', width: '100%', margin: '0 auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <WindowCard mode={mode} activeView="about" title="/sys/users/admin/bio.txt" onClose={() => onWindowClose?.('about')}>
        <div className="about-grid-layout">
          {/* Left Column: Editorial Bio */}
          <div className="about-editorial-col">
            <div data-reveal="scale" className="about-portrait-card hover-lift">
              <img
                src="/Raj_Image_500.JPG"
                alt="Raj Mathuria archival portrait"
              />
            </div>

            <p data-reveal>
              <span className="about-drop-cap">{personalData.bioDropCap}</span>
              {personalData.bioLead}
            </p>

            <p data-reveal>{personalData.bioParagraph2}</p>

            <p data-reveal>{personalData.bioParagraph3}</p>

            {/* Signature block */}
            <div data-reveal className="about-signature-block">
              <span>Authenticated by:</span>
              <h4>{personalData.shortName}</h4>
            </div>
          </div>

          {/* Right Column: System Status & Specifications */}
          <div className="about-specs-col">
            {/* System Status Widget */}
            <div data-reveal>
              <h3 className="about-widget-title">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>sensors</span>
                <span>System Status</span>
              </h3>
              <div className="about-status-list hover-lift">
                <div className="about-status-row">
                  <span className="muted-text">Availability</span>
                  <span className="crimson-text" style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span className="pulse-active" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--secondary)', display: 'inline-block' }}></span>
                    {personalData.availability}
                  </span>
                </div>
                <div className="about-status-row">
                  <span className="muted-text">Current Focus</span>
                  <span style={{ fontWeight: 500 }}>{personalData.currentFocus}</span>
                </div>
                <div className="about-status-row">
                  <span className="muted-text">Location</span>
                  <span>{personalData.location}</span>
                </div>
                <div className="about-status-row">
                  <span className="muted-text">Timezone</span>
                  <span>{personalData.timezone}</span>
                </div>
              </div>
            </div>

            {/* Specifications Widget */}
            <div data-reveal>
              <h3 className="about-widget-title">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>memory</span>
                <span>Specifications</span>
              </h3>
              <div className="about-specs-list hover-lift">
                <div>
                  <span className="label">Primary Stack</span>
                  <p>{personalData.primaryStack.join(', ')}</p>
                </div>
                <div>
                  <span className="label">Core Disciplines</span>
                  <ul className="about-disciplines-list">
                    {personalData.coreDisciplines.map((d) => (
                      <li key={d}>- {d}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="label">Uptime (Experience)</span>
                  <p>{personalData.uptime}</p>
                </div>

                <button
                  type="button"
                  className="btn-primary btn-press"
                  style={{ width: '100%', marginTop: '12px' }}
                  onClick={() => onViewChange('contact')}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>mail</span>
                  <span>Get In Touch</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </WindowCard>

      <div className="profile-detail-grid">
        <section className="profile-detail-section">
          <h2>Education</h2>
          {education.map((item) => (
            <article key={item.institution}>
              <h3>{item.institution}</h3>
              <p>{item.degree}</p>
              <span>{item.detail} / {item.period} / {item.result}</span>
            </article>
          ))}
        </section>
        <section className="profile-detail-section">
          <h2>Publications</h2>
          {publications.map((item) => (
            <article key={item.venue}>
              <div className="publication-status">{item.status}</div>
              <h3>{item.venue}</h3>
              <p>{item.title}</p>
              <span>{item.detail}</span>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};
