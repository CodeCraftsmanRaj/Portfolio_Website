import React from 'react';
import { OsMode, PageView, experienceList } from '../data/portfolioData';
import { WindowCard } from '../components/WindowCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ExperiencePageProps {
  mode: OsMode;
  onWindowClose?: (view: PageView) => void;
}

export const ExperiencePage: React.FC<ExperiencePageProps> = ({ mode, onWindowClose }) => {
  const containerRef = useScrollReveal({ staggerDelayMs: 100 });

  const handleExportPdf = () => {
    window.print();
  };

  return (
    <div ref={containerRef} style={{ maxWidth: '1080px', width: '100%', margin: '0 auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <WindowCard mode={mode} activeView="experience" title="/var/log/experience" onClose={() => onWindowClose?.('experience')}>
        <div style={{ padding: '36px 36px 48px' }}>
          {/* Vertical Timeline */}
          <div className="timeline-wrapper">
            {experienceList.map((item) => (
              <div key={item.id} data-reveal className="timeline-entry">
                {/* Timeline Dot Indicator */}
                <div className={`timeline-dot ${item.isActive ? 'active' : ''}`}>
                  <div className="timeline-dot-inner"></div>
                </div>

                {/* Timeline Content Card */}
                <div className={`timeline-card hover-lift ${item.isActive ? 'active' : ''}`}>
                  <div className="timeline-card-header">
                    <div>
                      <h3>{item.role}</h3>
                      <div className="company">{item.company}</div>
                    </div>
                    <span className="period">{item.period}</span>
                  </div>

                  <ul className="timeline-achievements">
                    {item.achievements.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline Footer End */}
          <div data-reveal className="timeline-footer-end">
            <p>-- End of Log --</p>
            <button
              type="button"
              className="btn-primary btn-press"
              onClick={handleExportPdf}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span>
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </WindowCard>
    </div>
  );
};
