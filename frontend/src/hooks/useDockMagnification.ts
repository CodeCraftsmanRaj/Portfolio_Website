import { useRef, useEffect } from 'react';

interface UseDockMagnificationOptions {
  maxScale?: number;
  distance?: number;
  enabled?: boolean;
}

export function useDockMagnification(options: UseDockMagnificationOptions = {}) {
  const dockRef = useRef<HTMLDivElement>(null);
  const { maxScale = 1.35, distance = 70, enabled = true } = options;

  useEffect(() => {
    if (!enabled) return;
    const dock = dockRef.current;
    if (!dock) return;

    const items = dock.querySelectorAll<HTMLElement>('.sidebar-nav-item');

    const handleMouseMove = (e: MouseEvent) => {
      const mousePos = e.clientY; // vertical dock in our layout

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const dist = Math.abs(mousePos - itemCenter);

        if (dist < distance) {
          // Cosine curve interpolation for smooth organic magnification
          const factor = Math.cos((dist / distance) * (Math.PI / 2));
          const scale = 1 + (maxScale - 1) * factor;
          item.style.transform = `scale(${scale})`;
          item.style.zIndex = '10';
        } else {
          item.style.transform = 'scale(1)';
          item.style.zIndex = '1';
        }
      });
    };

    const handleMouseLeave = () => {
      items.forEach((item) => {
        item.style.transform = 'scale(1)';
        item.style.zIndex = '1';
      });
    };

    dock.addEventListener('mousemove', handleMouseMove);
    dock.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      dock.removeEventListener('mousemove', handleMouseMove);
      dock.removeEventListener('mouseleave', handleMouseLeave);
      items.forEach((item) => {
        item.style.transform = 'scale(1)';
        item.style.zIndex = '1';
      });
    };
  }, [enabled, maxScale, distance]);

  return dockRef;
}
