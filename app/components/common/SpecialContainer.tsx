'use client';

import { useLayoutEffect, useRef } from 'react';

type Props = {
  /** Which container to mirror (defaults to the first .container) */
  containerSelector?: string;
  className?: string;
  children?: React.ReactNode;
  /** Which side to extend: "left" (default) or "right" */
  side?: 'left' | 'right';
};

export default function SpecialContainer({
  containerSelector = '.container',
  className = '',
  children,
  side = 'right', // default: extend to right edge
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

      if (window.innerWidth > 1279) {
        if (side === 'right') {
          // start where container starts, extend to viewport right
          const leftGap = rect.left;
          const targetWidth = vw - leftGap;
          el.style.marginLeft = `${leftGap}px`;
          el.style.width = `${targetWidth}px`;
        } else {
          // extend from viewport left to container right
          const rightGap = vw - rect.right;
          const targetWidth = vw - rightGap;
          el.style.marginLeft = '0px';
          el.style.width = `${targetWidth}px`;
        }
      }
      else {
        el.classList.add('container');
        el.style.margin = 'auto';
        el.style.paddingRight = '15px';
        el.style.width = '100%';

      }
    };

    measure();

    // Recalculate on resize/orientation
    const onResize = () => measure();
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);

    // Recalculate if the container itself changes size
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
  }, [containerSelector, side]);

  return (
    <div ref={ref} className={` box-border ${className}`} >
      {children}
    </div>
  );
}
