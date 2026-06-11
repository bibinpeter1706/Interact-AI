"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FrequencyBars() {
  const [bars, setBars] = useState<number[]>([]);

  useEffect(() => {
    // Generate 80 bars for higher density
    const initialBars = Array.from({ length: 80 }, () => Math.random() * 80 + 20);
    setBars(initialBars);

    const interval = setInterval(() => {
      setBars((prev) => prev.map((h) => {
        const delta = (Math.random() - 0.5) * 20;
        const newH = Math.max(10, Math.min(100, h + delta));
        return newH;
      }));
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-between px-2 pointer-events-none opacity-30">
      {bars.map((height, i) => (
        <div key={i} className="flex flex-col gap-[3px] items-center h-full justify-center">
          {/* 20 dots per bar for more detail */}
          {Array.from({ length: 20 }).map((_, j) => {
            const threshold = (20 - j) * 5;
            const isVisible = height > threshold;
            
            return (
              <motion.div
                key={j}
                initial={false}
                animate={{ 
                  opacity: isVisible ? 1 : 0.05,
                  scale: isVisible ? 1 : 0.7,
                  backgroundColor: isVisible ? "#ffffff" : "rgba(255,255,255,0.05)"
                }}
                transition={{ duration: 0.25 }}
                className="w-[2px] h-[2px] rounded-full shadow-[0_0_5px_rgba(255,255,255,0.3)]"
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
