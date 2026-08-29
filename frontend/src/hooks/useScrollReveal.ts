import { useEffect, useRef } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  staggerDelayMs?: number;
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { threshold = 0.05, rootMargin = '50px 0px 0px 0px', staggerDelayMs = 40 } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!elements.length) return;

    // Reveal immediately if IntersectionObserver is unsupported
    if (typeof IntersectionObserver === 'undefined') {
      elements.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const index = Number(el.getAttribute('data-reveal-index') || 0);
            const delay = Math.min(index * staggerDelayMs, 300);
            
            setTimeout(() => {
              el.classList.add('is-revealed');
            }, delay);

            observer.unobserve(el);
          }
        });
      },
      { threshold, rootMargin }
    );

    elements.forEach((el, idx) => {
      if (!el.getAttribute('data-reveal-index')) {
        el.setAttribute('data-reveal-index', String(idx));
      }
      observer.observe(el);
    });

    // Fallback safety timer: Ensure all content is revealed after 350ms even if observer misses
    const safetyTimer = setTimeout(() => {
      elements.forEach((el) => el.classList.add('is-revealed'));
    }, 350);

    return () => {
      clearTimeout(safetyTimer);
      observer.disconnect();
    };
  });

  return containerRef;
}

