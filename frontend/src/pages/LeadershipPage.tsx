import React from 'react'
import { OsMode, leadershipRoles, extracurricularCards } from '../data/portfolioData'
import { WindowCard } from '../components/WindowCard'

interface LeadershipPageProps {
  mode: OsMode
}

export const LeadershipPage: React.FC<LeadershipPageProps> = ({ mode }) => {
  return (
    <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
      {/* Man Page Header */}
      <div className="man-page-header">
        <h1>Manual Page: `ldext`</h1>
        <p>NAME: ldext — list leadership and extracurricular activities</p>
        <p>SYNOPSIS: ldext [OPTION]... [FILE]...</p>
      </div>

      <WindowCard mode={mode} activeView="leadership" title="man ldext(1)">
        <div style={{ padding: '36px 40px' }}>
          <div className="man-layout-grid">
            {/* Leadership Column */}
            <section>
              <h2 className="man-column-title">Leadership</h2>
              <div className="leadership-timeline-list">
                {leadershipRoles.map((role, idx) => (
                  <article key={idx} className="leadership-article">
                    <div className="leadership-bullet-square"></div>
                    <h3>{role.role}</h3>
                    <div className="org-meta">{role.organization}</div>
                    <p>{role.description}</p>
                    <ul className="leadership-bullets-list">
                      {role.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>
                          <span>&gt;</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            {/* Extracurriculars Column */}
            <section>
              <h2 className="man-column-title">Extracurriculars</h2>
              <div className="extracurricular-cards-list">
                {extracurricularCards.map((extra, idx) => (
                  <div key={idx} className="extra-card group">
                    <div className="extra-card-header">
                      <h3>{extra.title}</h3>
                      <span className="material-symbols-outlined muted-text" style={{ fontSize: 20 }}>
                        {extra.icon}
                      </span>
                    </div>
                    <p>{extra.description}</p>
                    {extra.highlight && (
                      <div className="extra-card-highlight">
                        {extra.highlight}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </WindowCard>
    </div>
  )
}
