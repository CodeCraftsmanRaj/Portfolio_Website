import { useEffect, useRef } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  staggerDelayMs?: number;
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { threshold = 0.1, rootMargin = '0px 0px -40px 0px', staggerDelayMs = 60 } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const index = Number(el.getAttribute('data-reveal-index') || 0);
            const delay = index * staggerDelayMs;
            
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

    return () => observer.disconnect();
  }, [threshold, rootMargin, staggerDelayMs]);

  return containerRef;
}
