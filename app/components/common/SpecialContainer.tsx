'use client';

import { useLayoutEffect, useRef } from 'react';

type Props = {
  /** Which container to mirror (defaults to the first .container) */
  containerSelector?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function SpecialContainer({
  containerSelector = '.container',
  className = '',
  children,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const container = document.querySelector<HTMLElement>(containerSelector);
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

      const leftGap = rect.left;          // distance from viewport left to container left
      const targetWidth = vw - leftGap;   // span from container left to viewport right

      el.style.marginLeft = `${leftGap}px`;
      el.style.width = `${targetWidth}px`;
    };

    measure();

    // Recalculate on resize/orientation
    const onResize = () => measure();
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);

    // Recalculate if the container itself changes size (breakpoints, layout shifts)
    let ro: ResizeObserver | null = null;
    const container = document.querySelector<HTMLElement>(containerSelector);
    if (container && 'ResizeObserver' in window) {
      ro = new ResizeObserver(measure);
      ro.observe(container);
    }

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      if (ro) ro.disconnect();
    };
  }, [containerSelector]);

  return (
    <div ref={ref} className={`box-border ${className}`}>
      {children}
    </div>
  );
}
