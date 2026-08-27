import React from 'react';
import { OsMode, personalData, socialLinks } from '../data/portfolioData';
import { WindowCard } from '../components/WindowCard';

interface ResumePageProps {
  mode: OsMode;
}

export const ResumePage: React.FC<ResumePageProps> = ({ mode }) => (
  <div className="resume-page">
    <div className="resume-page-header">
      <div>
        <h1>RESUME.PDF</h1>
        <p>{personalData.name} / verified career dossier</p>
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

    <WindowCard mode={mode} activeView="resume" title="~/documents/Raj-Kalpesh-Mathuria-Resume.pdf">
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
    </WindowCard>
  </div>
);
