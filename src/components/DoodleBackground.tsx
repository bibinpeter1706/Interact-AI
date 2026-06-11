"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const doodles = [
  // Squiggle
  "M10,50 Q25,25 40,50 T70,50 T100,50",
  // Star
  "M50,10 L60,40 L90,40 L65,60 L75,90 L50,70 L25,90 L35,60 L10,40 L40,40 Z",
  // Circle scribble
  "M50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50 C10,30 30,10 50,10 C60,10 80,20 85,40",
  // Arrow
  "M10,50 L80,50 M60,30 L80,50 L60,70",
  // Cross
  "M20,20 L80,80 M80,20 L20,80",
  // Spring/Loops
  "M10,50 C20,10 40,10 50,50 C60,90 80,90 90,50",
  // Triangle
  "M50,15 L85,80 L15,80 Z",
  // Sparkle
  "M50,10 Q50,50 90,50 Q50,50 50,90 Q50,50 10,50 Q50,50 50,10 Z"
];

export default function DoodleBackground({ 
  className = "fixed inset-0 z-0 pointer-events-none overflow-hidden mix-blend-screen opacity-50",
  svgClassName = "w-full h-full text-gold/40"
}: { 
  className?: string;
  svgClassName?: string;
}) {
  const [elements, setElements] = useState<Array<any>>([]);

  useEffect(() => {
    // Generate random doodles
    const newElements = Array.from({ length: 120 }).map((_, i) => ({
      id: i,
      path: doodles[Math.floor(Math.random() * doodles.length)],
      top: Math.random() * 100, // percentage
      left: Math.random() * 100,
      size: Math.random() * 50 + 20, // 20 to 70px
      rotation: Math.random() * 360,
      duration: Math.random() * 40 + 30, // 30-70s
      delay: Math.random() * -50, // negative delay so they are already moving
      opacity: Math.random() * 0.4 + 0.1, // 0.1 to 0.5
    }));
    setElements(newElements);
  }, []);

  return (
    <div className={className}>
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute"
          style={{
            top: `${el.top}%`,
            left: `${el.left}%`,
            width: el.size,
            height: el.size,
            opacity: el.opacity,
          }}
          animate={{
            y: [0, -150, 0],
            rotate: [el.rotation, el.rotation + 180, el.rotation],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            ease: "linear",
            delay: el.delay,
          }}
        >
          <svg viewBox="0 0 100 100" className={svgClassName} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d={el.path} />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
