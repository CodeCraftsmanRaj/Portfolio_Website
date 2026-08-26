import React from 'react'
import { OsMode, experienceList } from '../data/portfolioData'
import { WindowCard } from '../components/WindowCard'

interface ExperiencePageProps {
  mode: OsMode
}

export const ExperiencePage: React.FC<ExperiencePageProps> = ({ mode }) => {
  const handleExportPdf = () => {
    window.print()
  }

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
      {/* Page Header */}
      <div className="experience-page-header">
        <h1>/var/log/experience</h1>
        <p>System log entry initialized. Parsing career timeline...</p>
      </div>

      <WindowCard mode={mode} activeView="experience" title="/var/log/experience">
        <div style={{ padding: '40px 32px' }}>
          {/* Vertical Timeline */}
          <div className="timeline-wrapper">
            {experienceList.map((item) => (
              <div key={item.id} className="timeline-entry">
                {/* Timeline Dot Indicator */}
                <div className={`timeline-dot ${item.isActive ? 'active' : ''}`}>
                  <div className="timeline-dot-inner"></div>
                </div>

                {/* Timeline Content Card */}
                <div className={`timeline-card ${item.isActive ? 'active' : ''}`}>
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
          <div className="timeline-footer-end">
            <p>-- End of Log --</p>
            <button
              type="button"
              className="btn-primary"
              onClick={handleExportPdf}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span>
              <span>Export PDF / Resume</span>
            </button>
          </div>
        </div>
      </WindowCard>
    </div>
  )
}
