"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Products", href: "#products" },
    { name: "Use Cases", href: "#usecases" },
    { name: "Live Demo", href: "#demo" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5vw] h-[68px] transition-all duration-300 ${
          isScrolled
            ? "bg-background/85 backdrop-blur-md border-b border-gold/10"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <Link href="/" className="font-syne font-extrabold text-[1.4rem] text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 tracking-tight">
          Interact<span className="text-cream">AI</span>
        </Link>

        <ul className="hidden md:flex gap-8 items-center list-none">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-mint-muted text-[0.9rem] font-normal hover:text-cream transition-colors tracking-tight"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Link
            href="#contact"
            className="hidden md:block bg-gold text-bg2 font-syne font-bold text-[0.85rem] px-[22px] py-[10px] rounded-[8px] tracking-wide hover:bg-gold-hover hover:-translate-y-px transition-all"
          >
            Try Demo →
          </Link>
          <button
            className="md:hidden text-cream text-[1.5rem]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-bg2 pt-[6rem] px-[2rem] pb-[2rem] flex flex-col gap-[1.5rem] md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-cream font-syne text-[1.4rem] font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
