"use client";

import { motion } from "framer-motion";
import { Quote, TrendingDown, Zap, Building2, Star } from "lucide-react";

const testimonials = [
  {
    quote: "InteractAI didn't just improve our support—it entirely reinvented it. We deployed their voice agents across all our international lines. Wait times vanished, our CSAT scores hit an all-time high, and we immediately saw a 40% reduction in operational costs. It feels like having a thousand expert agents working simultaneously.",
    author: "Sarah Jenkins",
    role: "VP of Operations, TechFlow",
    featured: true,
    initials: "SJ",
    gradient: "from-yellow-400 to-yellow-600",
  },
  {
    quote: "The API integration was flawless. Within 48 hours, we had an AI voice agent booking appointments directly into our CRM. The latency is practically zero—it sounds indistinguishable from a human.",
    author: "David Chen",
    role: "CTO, HealthSync",
    featured: false,
    initials: "DC",
    gradient: "from-blue-400 to-emerald-500",
  },
  {
    quote: "Our conversion rates jumped 32% after implementing the WhatsApp AI assistant. It answers complex product queries instantly and drives sales 24/7. An absolute game-changer.",
    author: "Elena Rodriguez",
    role: "Director of E-commerce, StyleHouse",
    featured: false,
    initials: "ER",
    gradient: "from-purple-400 to-pink-500",
  },
];

// Cinematic Background
const TestimonialGlow = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    {/* Featured Testimonial Ambient Glow */}
    <div className="absolute top-[30%] left-[10%] w-[600px] h-[600px] bg-yellow-500/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>
  </div>
);

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative z-10 py-32 px-[5vw] overflow-hidden bg-transparent">
      <TestimonialGlow />

      <div className="max-w-[1300px] mx-auto relative z-20">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col items-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-sm mb-6">
            <Building2 className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[0.7rem] font-bold text-gray-300 uppercase tracking-widest">Trusted by 500+ Businesses</span>
          </div>
          
          <h2 className="font-syne text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold tracking-tight leading-[1.05] mb-6 text-white">
            Don't just take <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 drop-shadow-[0_0_30px_rgba(250,204,21,0.2)]">our word for it.</span>
          </h2>
          <p className="text-gray-400 text-[1.15rem] leading-[1.6] font-medium max-w-[560px]">
            See how industry leaders are leveraging our AI agents to cut costs, increase sales, and scale operations overnight.
          </p>
        </motion.div>

        {/* Asymmetrical Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Featured Testimonial (Dominant, Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotateY: 5 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="lg:col-span-7 relative group perspective-[2000px]"
          >
            {/* Ambient Background Glow behind Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-yellow-500/10 blur-[100px] rounded-[40px] pointer-events-none z-0 transition-opacity duration-700 group-hover:opacity-100 opacity-60"></div>
            
            <div className="relative z-10 bg-white/[0.02] backdrop-blur-3xl border border-white/[0.1] rounded-[40px] p-[3rem] lg:p-[4rem] h-full flex flex-col shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.05)] transition-all duration-500 hover:bg-white/[0.03] hover:border-yellow-500/30 hover:shadow-[0_40px_100px_-20px_rgba(250,204,21,0.15)] overflow-hidden">
              
              <Quote className="absolute top-[3rem] right-[3rem] w-24 h-24 text-white/[0.03] rotate-12 pointer-events-none" />

              <div className="flex gap-1.5 mb-8">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 fill-yellow-500 text-yellow-500 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                ))}
              </div>
              
              <p className="text-white text-[1.4rem] lg:text-[1.8rem] leading-[1.5] font-medium tracking-tight mb-12 relative z-10">
                "{testimonials[0].quote}"
              </p>
              
              <div className="mt-auto flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonials[0].gradient} flex items-center justify-center text-black font-syne font-bold text-xl shadow-[0_8px_20px_rgba(250,204,21,0.3)] border border-white/20`}>
                    {testimonials[0].initials}
                  </div>
                  <div>
                    <div className="font-bold text-white text-[1.1rem] tracking-tight">{testimonials[0].author}</div>
                    <div className="text-gray-400 text-[0.9rem] font-medium">{testimonials[0].role}</div>
                  </div>
                </div>

                {/* Floating Metric Badge */}
                <div className="hidden sm:flex flex-col items-end">
                  <div className="flex items-center gap-1.5 text-yellow-500 font-bold text-[1.2rem] bg-yellow-500/10 px-3 py-1 rounded-lg border border-yellow-500/20 shadow-sm">
                    <TrendingDown className="w-4 h-4" /> 40%
                  </div>
                  <div className="text-[0.7rem] text-gray-500 font-medium uppercase tracking-wider mt-1">Cost Reduction</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Secondary Testimonials (Stacked, Right) */}
          <div className="lg:col-span-5 flex flex-col gap-8 perspective-[2000px]">
            {testimonials.slice(1).map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30, rotateY: -5 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + idx * 0.1, type: "spring", bounce: 0.3 }}
                className="group relative bg-white/[0.02] backdrop-blur-3xl border border-white/[0.05] rounded-[32px] p-[2.5rem] flex flex-col flex-1 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3),inset_0_0_0_1px_rgba(255,255,255,0.02)] transition-all duration-500 hover:bg-white/[0.03] hover:border-white/[0.1] hover:-translate-y-1"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                
                <p className="text-gray-300 text-[1.1rem] leading-[1.6] mb-8 font-medium">
                  "{testimonial.quote}"
                </p>
                
                <div className="mt-auto flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-syne font-bold text-lg shadow-lg border border-white/20`}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-bold text-gray-100 text-[1rem] tracking-tight">{testimonial.author}</div>
                    <div className="text-gray-500 text-[0.85rem] font-medium">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
