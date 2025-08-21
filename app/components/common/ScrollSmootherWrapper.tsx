"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollSmootherWrapper({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2, // smoothing speed
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
      syncTouch: false, // replaces smoothTouch
    });

    // RAF loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Fade-in effect when ready
    if (contentRef.current) {
      gsap.to(contentRef.current, { autoAlpha: 1, duration: 0.3 });
    }

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <div ref={contentRef} className="opacity-0 will-change-transform">
        {children}
      </div>
    </div>
  );
}
