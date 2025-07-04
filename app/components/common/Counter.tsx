// components/Counter.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
}

const Counter: React.FC<CounterProps> = ({ from = 0, to, duration = 2 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(from);
  const frame = useRef(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        const currentCount = Math.floor(from + (to - from) * progress);
        setCount(currentCount);
        if (progress < 1) {
          frame.current = requestAnimationFrame(animate);
        }
      };

      frame.current = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(frame.current);
  }, [isInView, from, to, duration]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
    >
      {count.toLocaleString()}
    </motion.span>
  );
};

export default Counter;
