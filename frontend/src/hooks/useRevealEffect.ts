import { useRef, useEffect } from 'react';

interface UseRevealEffectOptions {
  enabled?: boolean;
}

export function useRevealEffect<T extends HTMLElement = HTMLDivElement>(options: UseRevealEffectOptions = {}) {
  const containerRef = useRef<T>(null);
  const { enabled = true } = options;

  useEffect(() => {
    if (!enabled) return;
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      container.style.setProperty('--mouse-x', `${x}px`);
      container.style.setProperty('--mouse-y', `${y}px`);
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [enabled]);

  return containerRef;
}
