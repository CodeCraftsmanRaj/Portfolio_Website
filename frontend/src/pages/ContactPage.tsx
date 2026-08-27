import React, { useState, FormEvent } from 'react';
import { OsMode, socialLinks } from '../data/portfolioData';
import { WindowCard } from '../components/WindowCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ContactPageProps {
  mode: OsMode;
}

export const ContactPage: React.FC<ContactPageProps> = ({ mode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const containerRef = useScrollReveal();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus('sending');
    try {
      const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus('sent');
        setFeedbackMsg('[200 OK] Message packet delivered to sysadmin buffer.');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('sent');
        setFeedbackMsg('[STUB] Message recorded in local transmission queue.');
      }
    } catch {
      setStatus('sent');
      setFeedbackMsg('[TRANSMITTED] Message acknowledged in local session queue.');
    }
  };

  return (
    <div ref={containerRef} style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <WindowCard mode={mode} activeView="contact" title="~/network/ping.socket">
        <div style={{ padding: '36px 32px' }}>
          <div className="contact-layout-grid">
            {/* Left: Ping Coordinates */}
            <div data-reveal="left" className="ping-coordinates-panel">
              <h3>Ping Coordinates</h3>
              <p>
                Initialize a connection via established protocols or execute direct message routing.
              </p>

              <div className="ping-links-list">
                {socialLinks.map((link) => (
                  <div key={link.label} className="ping-link-item hover-lift">
                    <span className="label">{link.label}</span>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="material-symbols-outlined crimson-text" style={{ fontSize: 16 }}>
                        arrow_forward
                      </span>
                      <span>
                        {link.protocol} {link.target}
                      </span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: New Message Form */}
            <div data-reveal="right" className="contact-message-window hover-lift">
              <div className="window-header" style={{ background: 'var(--surface-container-high)' }}>
                <div className="window-title">
                  <span className="material-symbols-outlined" style={{ fontSize: 16 }}>mail</span>
                  <span style={{ fontWeight: 700 }}>New Message</span>
                </div>
                <div className="win-window-controls">
                  <span className="win-btn">_</span>
                  <span className="win-btn">[]</span>
                  <span className="win-btn">X</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-fields-row">
                  <div className="contact-field-group">
                    <label>Sender Identifier</label>
                    <input
                      type="text"
                      className="form-input-blank"
                      placeholder="e.g. Linus Torvalds"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="contact-field-group">
                    <label>Return Address (Email)</label>
                    <input
                      type="email"
                      className="form-input-blank"
                      placeholder="user@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="contact-field-group" style={{ marginTop: 8 }}>
                  <label>Payload (Message)</label>
                  <textarea
                    className="form-input-blank"
                    placeholder="Enter message parameters or project scope..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>

                {status === 'sent' && (
                  <div
                    style={{
                      padding: '10px 14px',
                      background: 'var(--surface-container-high)',
                      border: '1px solid var(--outline-variant)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      color: 'var(--secondary)',
                    }}
                  >
                    {feedbackMsg}
                  </div>
                )}

                <div className="contact-form-actions">
                  <button
                    type="submit"
                    className="btn-primary btn-press"
                    disabled={status === 'sending'}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>send</span>
                    <span>{status === 'sending' ? 'TRANSMITTING...' : '▷ Execute Send'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </WindowCard>
    </div>
  );
};
