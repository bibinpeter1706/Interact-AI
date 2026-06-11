"use client";

import { motion } from "framer-motion";

export default function UnifiedContourBackground() {
  const horizontalPaths = [
    "M-100,200 C100,100 300,300 500,200 C700,100 900,300 1100,200",
    "M-100,400 C100,300 300,500 500,400 C700,300 900,500 1100,400",
    "M-100,600 C100,500 300,700 500,600 C700,500 900,700 1100,600",
    "M-100,800 C100,700 300,900 500,800 C700,700 900,900 1100,800",
    "M-100,1000 C100,900 300,1100 500,1000 C700,900 900,1100 1100,1000",
    "M-100,1200 C100,1100 300,1300 500,1200 C700,1100 900,1300 1100,1200",
    "M-100,1400 C100,1300 300,1500 500,1400 C700,1300 900,1500 1100,1400",
    "M-100,1600 C100,1500 300,1700 500,1600 C700,1500 900,1700 1100,1600",
    "M-100,1800 C100,1700 300,1900 500,1800 C700,1700 900,1900 1100,1800",
  ];

  const verticalPaths = [
    "M200,-100 C100,400 300,600 200,1000 C100,1400 300,1600 200,2100",
    "M400,-100 C300,400 500,600 400,1000 C300,1400 500,1600 400,2100",
    "M600,-100 C500,400 700,600 600,1000 C500,1400 700,1600 600,2100",
    "M800,-100 C700,400 900,600 800,1000 C700,1400 900,1600 800,2100",
  ];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
      {/* Deep Noise */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-screen bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>
      
      {/* Continuous Contour Lines (Topographic) */}
      <div className="absolute inset-0 opacity-[0.25]">
        <svg className="w-full h-full" viewBox="0 0 1000 2000" preserveAspectRatio="none">
          <g fill="none" stroke="white" strokeWidth="1.2">
            {horizontalPaths.map((d, i) => (
              <motion.path
                key={`h-${i}`}
                d={d}
                strokeOpacity={0.8}
                animate={{
                  y: [0, 15, 0],
                  strokeOpacity: [0.6, 0.9, 0.6],
                }}
                transition={{
                  duration: 4 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * -0.8,
                }}
              />
            ))}
            
            {verticalPaths.map((d, i) => (
              <motion.path
                key={`v-${i}`}
                d={d}
                strokeOpacity={0.8}
                animate={{
                  x: [0, 10, 0],
                  strokeOpacity: [0.6, 0.9, 0.6],
                }}
                transition={{
                  duration: 5 + i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * -1,
                }}
              />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
