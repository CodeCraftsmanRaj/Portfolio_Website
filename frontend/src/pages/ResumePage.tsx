import React from 'react';
import { OsMode, personalData, socialLinks } from '../data/portfolioData';
import { WindowCard } from '../components/WindowCard';

interface ResumePageProps {
  mode: OsMode;
}

export const ResumePage: React.FC<ResumePageProps> = ({ mode }) => (
  <div className="resume-page">
    <WindowCard mode={mode} activeView="resume" title="~/documents/Raj-Kalpesh-Mathuria-Resume.pdf">
      <div style={{ padding: '24px 32px 48px' }}>
        {/* Resume Top Action Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px', borderBottom: '1px solid var(--outline-variant)', paddingBottom: '16px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 600 }}>{personalData.name} — Curriculum Vitae</h2>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--on-surface-variant)', marginTop: '2px' }}>
              Verified Academic &amp; Professional Dossier (PDF Format)
            </p>
          </div>
          <div className="resume-actions">
            <a className="btn-outline btn-press" href="/Raj_resume.pdf" target="_blank" rel="noopener noreferrer">
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>open_in_new</span>
              <span>Open PDF</span>
            </a>
            <a className="btn-primary btn-press" href="/Raj_resume.pdf" download="Raj-Kalpesh-Mathuria-Resume.pdf">
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>download</span>
              <span>Download</span>
            </a>
          </div>
        </div>

        <div className="resume-layout">
        <div className="resume-pdf-frame">
          <iframe src="/Raj_resume.pdf" title="Raj Mathuria resume" />
        </div>
        <aside className="resume-meta">
          <div>
            <span className="resume-kicker">Identity</span>
            <h2>{personalData.name}</h2>
            <p>{personalData.role}</p>
          </div>
          <div className="resume-meta-block">
            <span className="resume-kicker">Education</span>
            <p>Sardar Patel Institute of Technology</p>
            <p>Indian Institute of Technology Madras</p>
          </div>
          <div className="resume-meta-block">
            <span className="resume-kicker">Network</span>
            {socialLinks.slice(0, 2).map((link) => (
              <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer">{link.target}</a>
            ))}
            <a href="mailto:rajmathuria79@gmail.com">rajmathuria79@gmail.com</a>
            <a href="tel:+918104882231">+91 8104882231</a>
          </div>
        </aside>
      </div>
      </div>
    </WindowCard>
  </div>
);
