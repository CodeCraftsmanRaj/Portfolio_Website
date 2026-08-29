import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { OsMode } from '../data/portfolioData';

interface BootScreenProps {
  mode: OsMode;
  onComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ mode, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [linuxLines, setLinuxLines] = useState<string[]>([]);

  const fullLinuxLog = [
    '[  0.000000] Linux version 6.8.0-devos (raj@craftsman) (gcc 13.2.0)',
    '[  0.024100] ACPI: Core System Architecture initialized (x86_64)',
    '[  0.052010] [  OK  ] Mounted /dev/portfolio on /root/workspace',
    '[  0.114320] [  OK  ] Loaded Engine: Rust | C++20 | Go | TypeScript',
    '[  0.198200] [  OK  ] Started GNOME Display Manager & Wayland Compositor',
    '[  0.284100] [  OK  ] Initialized Litho-Letterpress Visual System',
    '[  0.372000] [  OK  ] System Ready. Starting Developer Shell...',
  ];

  useEffect(() => {
    // Check if user pressed Escape to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  // Linux log streaming
  useEffect(() => {
    if (mode === 'LINUX') {
      let currentIdx = 0;
      const interval = setInterval(() => {
        if (currentIdx < fullLinuxLog.length) {
          setLinuxLines((prev) => [...prev, fullLinuxLog[currentIdx]]);
          currentIdx++;
        } else {
          clearInterval(interval);
          setTimeout(onComplete, 400);
        }
      }, 220);
      return () => clearInterval(interval);
    }
  }, [mode, onComplete]);

  // Windows / Mac / Android / iOS Progress bar & Spinner timing
  useEffect(() => {
    if (mode === 'WIN' || mode === 'MAC' || mode === 'ANDROID' || mode === 'IOS') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(onComplete, 300);
            return 100;
          }
          return prev + (mode === 'MAC' || mode === 'IOS' ? 10 : 12);
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [mode, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#0c0c0b',
        color: '#fcf9f4',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: mode === 'LINUX' ? 'var(--font-mono, monospace)' : 'var(--font-sans, system-ui)',
        userSelect: 'none',
      }}
    >
      {/* Linux Kernel Boot Sequence */}
      {mode === 'LINUX' && (
        <div style={{ width: '90%', maxWidth: '780px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <span style={{ color: '#a6392b', fontSize: '20px' }}>🐧</span>
            <span style={{ fontSize: '13px', letterSpacing: '0.08em', color: '#7c766e' }}>
              DEVOS_KERNEL_BOOT :: INIT_STAGE_3
            </span>
          </div>
          <div style={{ fontSize: '12px', lineHeight: '1.7', color: '#cdc5bc' }}>
            {linuxLines.map((line, idx) => (
              <div key={idx} style={{ opacity: idx === linuxLines.length - 1 ? 1 : 0.85 }}>
                {line.includes('[  OK  ]') ? (
                  <>
                    <span style={{ color: '#7c766e' }}>{line.slice(0, 14)}</span>
                    <span style={{ color: '#4e9a06', fontWeight: 600 }}>[  OK  ]</span>
                    <span>{line.slice(22)}</span>
                  </>
                ) : (
                  line
                )}
              </div>
            ))}
            <span
              style={{
                display: 'inline-block',
                width: '8px',
                height: '14px',
                backgroundColor: '#a6392b',
                marginLeft: '4px',
                verticalAlign: 'middle',
                animation: 'blink-cursor 0.8s infinite',
              }}
            />
          </div>
        </div>
      )}

      {/* Windows 11 Boot Loader */}
      {mode === 'WIN' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
          {/* Windows 4-Square Logo */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 22px)', gap: '4px' }}>
            <div style={{ width: '22px', height: '22px', backgroundColor: '#a6392b' }} />
            <div style={{ width: '22px', height: '22px', backgroundColor: '#a6392b' }} />
            <div style={{ width: '22px', height: '22px', backgroundColor: '#a6392b' }} />
            <div style={{ width: '22px', height: '22px', backgroundColor: '#a6392b' }} />
          </div>

          {/* Windows Ring Spinner */}
          <div
            style={{
              width: '36px',
              height: '36px',
              border: '3px solid rgba(252, 249, 244, 0.1)',
              borderTopColor: '#fcf9f4',
              borderRadius: '50%',
              animation: 'win-spinner-rotate 1s linear infinite',
            }}
          />

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '14px', letterSpacing: '0.04em', color: '#fcf9f4' }}>
              Starting Developer Environment
            </div>
            <div style={{ fontSize: '11px', color: '#7c766e', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
              Loading portfolio dependencies... {progress}%
            </div>
          </div>
        </div>
      )}

      {/* macOS / iOS Boot Screen */}
      {(mode === 'MAC' || mode === 'IOS') && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '36px' }}>
          {/* Minimalist Apple-style Monogram */}
          <div style={{ fontSize: '48px', color: '#fcf9f4', opacity: 0.9 }}>
            
          </div>

          {/* Clean Thin Progress Bar */}
          <div
            style={{
              width: '180px',
              height: '5px',
              backgroundColor: '#262624',
              borderRadius: '3px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                backgroundColor: '#fcf9f4',
                borderRadius: '3px',
                transition: 'width 0.15s linear',
              }}
            />
          </div>
          {mode === 'IOS' && (
            <div style={{ fontSize: '11px', color: '#7c766e', letterSpacing: '0.06em' }}>
              iOS 18 Developer Edition
            </div>
          )}
        </div>
      )}

      {/* Android Boot Screen */}
      {mode === 'ANDROID' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>
          <div style={{ fontSize: '46px', color: '#4ade80' }}>
            🤖
          </div>

          {/* Android Circular Pulsing Dots */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#4ade80', opacity: progress > 25 ? 1 : 0.3 }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#4ade80', opacity: progress > 50 ? 1 : 0.3 }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#4ade80', opacity: progress > 75 ? 1 : 0.3 }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#4ade80', opacity: progress >= 100 ? 1 : 0.3 }} />
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', color: '#fcf9f4' }}>
              DevOS for Android
            </div>
            <div style={{ fontSize: '10px', color: '#7c766e', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
              Initializing ART runtime... {progress}%
            </div>
          </div>
        </div>
      )}

      {/* Skip Button at Bottom */}
      <button
        onClick={onComplete}
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '24px',
          background: 'none',
          border: '1px solid rgba(252, 249, 244, 0.2)',
          color: '#7c766e',
          fontSize: '11px',
          fontFamily: 'var(--font-mono)',
          padding: '6px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#fcf9f4';
          e.currentTarget.style.borderColor = '#fcf9f4';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#7c766e';
          e.currentTarget.style.borderColor = 'rgba(252, 249, 244, 0.2)';
        }}
      >
        Skip [Esc]
      </button>
    </motion.div>
  );
};
