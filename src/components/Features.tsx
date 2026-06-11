"use client";

import { motion } from "framer-motion";
import { Mic, MessageSquare, Globe, Cpu, Layers, BarChart3, ArrowRight } from "lucide-react";
import MeshCanvas from "./MeshCanvas";
import FrequencyBars from "./FrequencyBars";

const products = [
  {
    icon: <Mic className="w-5 h-5" />,
    name: "Voice Agent",
    desc: "Human-like AI calls with ultra-low latency and precision.",
    tag: "Voice",
    image: "/products/voice-agent.webp",
    featured: true
  },
  {
    icon: <MessageSquare className="w-5 h-5" />,
    name: "WhatsApp Agent",
    desc: "Automate support and qualification inside WhatsApp Business.",
    tag: "WhatsApp",
    image: "/products/whatsapp.webp",
    featured: false
  },
  {
    icon: <Globe className="w-5 h-5" />,
    name: "Web Agent",
    desc: "Smart 24/7 support embedded on your website in minutes.",
    tag: "Web Agent",
    image: "/products/web-assistant.webp",
    featured: false
  },
];

export default function Features() {
  return (
    <section id="products" className="py-[100px] px-[5vw] bg-[#000000] relative overflow-hidden">
      {/* Global Dotted Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.2] pointer-events-none"
        style={{ 
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold tracking-tight leading-[1.1] mb-4">
            Every Channel. <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">One Platform.</span>
          </h2>
          <p className="text-white/40 text-[clamp(0.9rem,1.2vw,1.1rem)] font-light max-w-[500px] mx-auto">
            High-performance AI agents purpose-built for the modern enterprise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`group relative min-h-[180px] p-8 rounded-[20px] border flex flex-col justify-center overflow-hidden transition-all duration-400 cursor-pointer ${
                product.featured 
                ? 'bg-white/[0.04] border-gold/20 shadow-[inset_0_0_20px_rgba(245,203,92,0.05)]' 
                : 'bg-white/[0.02] border-white/5 shadow-inner'
              } hover:bg-white/[0.06] hover:border-gold/40 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)]`}
            >
              {/* Dotted Grid Background */}
              <div 
                className="absolute inset-0 z-0 opacity-[0.1] pointer-events-none"
                style={{ 
                  backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', 
                  backgroundSize: '24px 24px' 
                }}
              />

              {/* Abstract Visual Background */}
              <div 
                className={`absolute inset-0 z-0 opacity-[0.25] group-hover:opacity-[0.45] transition-all duration-700 bg-cover bg-center grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 ${product.featured ? 'opacity-[0.35]' : ''}`}
                style={{ backgroundImage: `url(${product.image})` }}
              />
              <div className="absolute inset-0 z-1 bg-gradient-to-r from-background via-background/80 to-transparent" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 bg-gold/20 text-gold shadow-[0_0_15px_rgba(245,203,92,0.1)]">
                  {product.icon}
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-heading text-xl font-bold tracking-tight group-hover:text-gold transition-colors duration-300">
                      {product.name}
                    </h3>
                    <span className="text-[0.6rem] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md border border-gold/30 bg-gold/10 text-gold transition-all duration-300">
                      {product.tag}
                    </span>
                  </div>
                  <p className="text-white/50 text-sm font-light leading-relaxed max-w-[280px] group-hover:text-white/80 transition-colors duration-300">
                    {product.desc}
                  </p>
                </div>
              </div>

              {/* Accent Glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
