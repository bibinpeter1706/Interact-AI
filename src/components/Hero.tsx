"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import Link from "next/link";
import MeshCanvas from "./MeshCanvas";
import Particles from "./Particles";
import TextPressure from "./TextPressure";

const stats = [
  { value: 500, suffix: "+", label: "Businesses Deployed" },
  { value: 2, suffix: "M+", label: "Conversations/Month" },
  { value: 99.9, suffix: "%", isFloat: true, label: "Uptime SLA" },
  { value: 200, prefix: "<", suffix: "ms", label: "Response Time" },
];

function StatCounter({ value, prefix = "", suffix = "", isFloat = false }: { value: number, prefix?: string, suffix?: string, isFloat?: boolean }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => isFloat ? latest.toFixed(1) : Math.round(latest));
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 2.5, ease: "easeOut" });
      return controls.stop;
    }
  }, [count, value, inView]);

  return (
    <span ref={ref}>
      {prefix}<motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center text-center px-[5vw] py-[120px] overflow-hidden">
      <MeshCanvas />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={1500}
          particleSpread={20}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      
      <motion.h1
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 font-clash text-[clamp(4.5rem,10vw,9rem)] leading-[0.85] tracking-[-0.05em] mb-8 text-center translate-y-4"
      >
        <span className="font-semibold text-metallic-silver animate-shine block mb-2">
          AI That
        </span>
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="relative h-[clamp(5rem,12vw,10rem)] w-full max-w-[900px] mx-auto"
        >
          <TextPressure
            text="Interacts."
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="transparent"
            className="text-metallic-gold animate-shine soft-glow !normal-case"
            minFontSize={80}
          />
        </motion.div>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="relative z-10 font-general font-medium text-[clamp(1.1rem,1.8vw,1.4rem)] text-mint-muted/80 tracking-[0.03em] max-w-[600px] leading-[1.6] mb-12 text-center antialiased -translate-y-8"
      >
        Intelligent voice and chat agents that think, speak, and solve in real-time.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="relative z-10 flex flex-wrap gap-5 justify-center mb-20 -translate-y-8"
      >
        <Link
          href="#contact"
          className="bg-cream text-bg2 font-satoshi font-medium text-[1.1rem] px-[42px] py-[18px] rounded-xl tracking-wide hover:bg-white hover:-translate-y-[3px] transition-all duration-300 shadow-lg hover:shadow-[0_20px_50px_rgba(232,237,223,0.2)]"
        >
          Try Live Demo
        </Link>
        <Link
          href="#contact"
          className="bg-transparent text-cream border border-cream/30 font-satoshi font-medium text-[1.1rem] px-[42px] py-[18px] rounded-xl tracking-wide hover:bg-cream/5 transition-all duration-300 hover:-translate-y-[3px]"
        >
          Talk to Sales
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 flex flex-wrap gap-16 justify-center -translate-y-8"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="text-center group">
            <div className="font-cabinet text-[3.2rem] font-bold text-metallic-gold animate-shine tracking-tighter leading-none mb-2">
              <StatCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} isFloat={stat.isFloat} />
            </div>
            <div className="font-cabinet text-[0.85rem] text-mint-muted font-medium uppercase tracking-[0.15em] opacity-70 group-hover:opacity-100 transition-opacity">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-[2.5rem] left-1/2 -translate-x-1/2 flex flex-col items-center gap-[8px] pointer-events-none z-10"
      >
        <span className="font-inter text-[0.65rem] tracking-[0.15em] text-white/20 uppercase">Scroll</span>
        <div className="w-[1px] h-[40px] bg-white/10 relative overflow-hidden">
          <div className="absolute top-[-100%] left-0 w-full h-full bg-white/40 animate-scroll-drop" />
        </div>
      </motion.div>
    </section>
  );
}
