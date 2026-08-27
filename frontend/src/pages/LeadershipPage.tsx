import React from 'react';
import { OsMode, leadershipRoles, extracurricularCards, achievements, beyondTheCode } from '../data/portfolioData';
import { WindowCard } from '../components/WindowCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface LeadershipPageProps {
  mode: OsMode;
}

export const LeadershipPage: React.FC<LeadershipPageProps> = ({ mode }) => {
  const containerRef = useScrollReveal({ staggerDelayMs: 90 });

  return (
    <div ref={containerRef} style={{ maxWidth: '1120px', margin: '0 auto' }}>
      {/* Man Page Header */}
      <div data-reveal className="man-page-header">
        <h1>Manual Page: `ldext`</h1>
        <p>NAME: ldext — list leadership and extracurricular activities</p>
        <p>SYNOPSIS: ldext [OPTION]... [FILE]...</p>
      </div>

      <WindowCard mode={mode} activeView="leadership" title="man ldext(1)">
        <div style={{ padding: '36px 40px' }}>
          <div className="man-layout-grid">
            {/* Leadership Column */}
            <section>
              <h2 data-reveal className="man-column-title">Leadership</h2>
              <div className="leadership-timeline-list">
                {leadershipRoles.map((role, idx) => (
                  <article key={idx} data-reveal="left" className="leadership-article hover-lift">
                    <div className="leadership-bullet-square"></div>
                    <h3>{role.role}</h3>
                    <div className="org-meta">{role.organization}</div>
                    <p>{role.description}</p>
                    <ul className="leadership-bullets-list">
                      {role.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>
                          <span className="crimson-text">&gt;</span>
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
              <h2 data-reveal className="man-column-title">Extracurriculars</h2>
              <div className="extracurricular-cards-list">
                {extracurricularCards.map((extra, idx) => (
                  <div key={idx} data-reveal="right" className="extra-card group hover-lift">
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

          <section className="leadership-lower-grid">
            <div className="achievement-list">
              <h2 data-reveal className="man-column-title">Achievements</h2>
              {achievements.map((achievement) => (
                <div key={achievement} data-reveal className="achievement-item">
                  <span className="crimson-text">&gt;</span>
                  <span>{achievement}</span>
                </div>
              ))}
            </div>
            <div>
              <h2 data-reveal className="man-column-title">Beyond the Code</h2>
              <div className="sports-grid">
                {beyondTheCode.map((activity) => (
                  <article key={activity.title} data-reveal className="extra-card hover-lift">
                    <span className="material-symbols-outlined crimson-text">{activity.icon}</span>
                    <h3>{activity.title}</h3>
                    <p>{activity.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </WindowCard>
    </div>
  );
};
