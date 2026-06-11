"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Shield, Zap } from "lucide-react";

// Custom SVG Icons for Brands (Lucide removed brand icons)
const Twitter = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const Linkedin = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;
const Github = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>;
const Youtube = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>;

const FooterBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#F9F9F9]">
    {/* Subtle Noise */}
    <div className="absolute inset-0 opacity-[0.05] mix-blend-multiply bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>
    
    {/* Soft Ambient Glows */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_bottom,rgba(250,204,21,0.08),transparent_70%)] blur-[120px]"></div>
    
    {/* Giant Background Wordmark */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-syne font-extrabold text-black/[0.015] tracking-tighter whitespace-nowrap pointer-events-none select-none">
      InteractAI
    </div>

    {/* Subtle Neural Mesh */}
    <div className="absolute inset-0 opacity-[0.2]">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="footerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0,0,0,0)" />
            <stop offset="50%" stopColor="rgba(250,204,21,0.1)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
        </defs>
        <motion.path 
          d="M0,800 C400,700 600,900 1400,600" 
          fill="none" stroke="url(#footerGrad)" strokeWidth="1"
          animate={{ strokeDashoffset: [1000, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          strokeDasharray="200 800"
        />
      </svg>
    </div>
  </div>
);

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#F9F9F9] overflow-hidden">
      <FooterBackground />

      <div className="max-w-[1300px] mx-auto relative z-20 px-[5vw]">
        
        {/* Pre-Footer CTA */}
        <div className="py-32 border-b border-gray-200 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <h2 className="font-syne text-[clamp(3rem,5vw,4.5rem)] font-extrabold text-gray-950 tracking-tight mb-8">
              Ready to deploy your <br className="md:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600 drop-shadow-[0_0_20px_rgba(250,204,21,0.1)]">AI agent?</span>
            </h2>
            <Link href="#contact" className="px-10 py-5 rounded-[20px] font-syne font-bold text-[1.1rem] transition-all duration-300 tracking-wide relative overflow-hidden group/btn bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-[0_10px_30px_rgba(250,204,21,0.2)] hover:shadow-[0_15px_40px_rgba(250,204,21,0.35)] hover:scale-[1.02] flex items-center justify-center gap-2">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 opacity-30"></div>
              Start Your Free Trial <ArrowRight className="w-5 h-5 ml-1 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Main Footer Links */}
        <div className="py-20 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-10">
          
          <div className="lg:col-span-5 flex flex-col">
            <Link href="/" className="font-syne font-extrabold text-[1.8rem] text-gray-950 tracking-tight mb-4 flex items-center gap-2">
              Interact<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-700">AI</span>
            </Link>
            <p className="text-gray-600 text-[1.05rem] leading-[1.7] font-medium mb-10 max-w-[340px]">
              The enterprise standard for conversational AI. Automate your operations with world-class voice and text models.
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Github, Youtube].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-12 h-12 rounded-[16px] bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-yellow-600 hover:border-yellow-500/50 hover:bg-yellow-500/10 hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10">
            <div className="flex flex-col gap-6">
              <h4 className="font-syne text-[0.8rem] font-bold uppercase tracking-widest text-gray-950">Platform</h4>
              <ul className="flex flex-col gap-4">
                {["Voice Agents", "WhatsApp Automation", "Web Agents"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-600 text-[0.95rem] font-medium hover:text-gray-950 transition-colors duration-300 relative group inline-block">
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="font-syne text-[0.8rem] font-bold uppercase tracking-widest text-gray-950">Company</h4>
              <ul className="flex flex-col gap-4">
                {["About", "Customers", "Careers", "Security", "Contact"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-600 text-[0.95rem] font-medium hover:text-gray-950 transition-colors duration-300 relative group inline-block">
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="font-syne text-[0.8rem] font-bold uppercase tracking-widest text-gray-950">Legal</h4>
              <ul className="flex flex-col gap-4">
                {["Terms of Service", "Privacy Policy", "DPA", "Cookie Policy"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-600 text-[0.95rem] font-medium hover:text-gray-950 transition-colors duration-300 relative group inline-block">
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Footer Bottom / Meta */}
        <div className="py-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6 relative z-20">
          
          <div className="flex flex-col md:flex-row items-center gap-6 text-[0.85rem] text-gray-600 font-medium">
            <span>© 2026 InteractAI. All rights reserved.</span>
            <div className="hidden md:flex items-center gap-4 border-l border-gray-200 pl-6">
              <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-emerald-600" /> Systems Operational</span>
              <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-yellow-600" /> &lt;200ms Latency</span>
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-blue-600" /> 99.9% Uptime</span>
            </div>
          </div>

          <div className="text-[0.85rem] font-medium text-gray-600">
            Designed and developed by{" "}
            <a 
              href="https://www.linkedin.com/in/jose-roy1/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-950 hover:text-yellow-600 transition-colors duration-300 font-bold relative group inline-block"
            >
              Jose Roy
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-yellow-500 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(250,204,21,0.5)]"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
