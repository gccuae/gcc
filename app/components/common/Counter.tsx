// components/Counter.tsx
"use client";

import { motion} from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
}

const Counter: React.FC<CounterProps> = ({ from = 0, to, duration = 2 }) => {

  const [count, setCount] = useState(from);
  const frame = useRef(0);

  useEffect(() => {
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
    return () => cancelAnimationFrame(frame.current);
  }, [from, to, duration]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {count.toLocaleString()}
    </motion.span>
  );
};

export default Counter;
