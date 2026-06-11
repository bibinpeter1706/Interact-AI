"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Clock, Zap, Shield, ArrowRight, Sparkles } from "lucide-react";

// Cinematic Background
const ContactBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#F9F9F9]">
    {/* Subtle Noise */}
    <div className="absolute inset-0 opacity-[0.05] mix-blend-multiply bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>
    
    {/* Soft corner lighting */}
    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_top_right,rgba(250,204,21,0.08),transparent_70%)]"></div>
    <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.02),transparent_70%)]"></div>
  </div>
);

export default function Contact() {
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);

  const toggleRequirement = (req: string) => {
    setSelectedRequirements(prev =>
      prev.includes(req) ? prev.filter(r => r !== req) : [...prev, req]
    );
  };

  return (
    <section id="contact" className="relative z-10 py-32 px-[5vw] overflow-hidden bg-[#F9F9F9]">
      <ContactBackground />

      <div className="max-w-[1300px] mx-auto relative z-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          
          {/* Left Panel: Information & Trust */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            className="lg:col-span-5 flex flex-col pr-0 lg:pr-8 relative z-20"
          >
            {/* Live Indicator */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 shadow-[0_0_15px_rgba(250,204,21,0.05)] mb-10 w-fit backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
              <span className="text-[0.75rem] font-bold text-yellow-500 uppercase tracking-widest">AI Consultants Online</span>
            </div>

            <h2 className="font-syne text-[clamp(2.5rem,5vw,4.2rem)] font-extrabold tracking-tight leading-[1.05] mb-6 text-gray-950">
              Initialize your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-950 via-gray-600 to-gray-400">AI Platform.</span>
            </h2>
            <p className="text-gray-600 text-[1.1rem] leading-[1.6] font-medium mb-12 max-w-[480px]">
              Skip the traditional sales pipeline. Share your operational bottleneck, and our engineers will architect a custom deployment plan for your enterprise.
            </p>

            {/* Floating Glass Contact Cards */}
            <div className="flex flex-col gap-4 mb-12">
              <div className="flex items-center gap-5 p-5 bg-white rounded-[24px] border border-gray-200 backdrop-blur-2xl group hover:bg-gray-50 transition-all duration-300 hover:-translate-y-0.5 cursor-default shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
                <div className="w-14 h-14 rounded-[16px] bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-600 group-hover:text-yellow-600 group-hover:scale-105 transition-all shadow-inner relative overflow-hidden">
                  <div className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity blur-md"></div>
                  <Mail className="w-6 h-6 relative z-10" />
                </div>
                <div>
                  <strong className="block text-gray-950 text-[1rem] mb-1 font-semibold tracking-wide">Direct Email</strong>
                  <span className="text-gray-500 text-[0.95rem] font-medium">hello@interactai.co.in</span>
                </div>
              </div>

              <div className="flex items-center gap-5 p-5 bg-white rounded-[24px] border border-gray-200 backdrop-blur-2xl group hover:bg-gray-50 transition-all duration-300 hover:-translate-y-0.5 cursor-default shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
                <div className="w-14 h-14 rounded-[16px] bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-600 group-hover:text-emerald-600 group-hover:scale-105 transition-all shadow-inner relative overflow-hidden">
                  <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity blur-md"></div>
                  <MessageCircle className="w-6 h-6 relative z-10" />
                </div>
                <div>
                  <strong className="block text-gray-950 text-[1rem] mb-1 font-semibold tracking-wide">WhatsApp Priority</strong>
                  <span className="text-gray-500 text-[0.95rem] font-medium">+91 98765 43210</span>
                </div>
              </div>
            </div>

            {/* Enterprise Trust Meta */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-gray-200">
                <Shield className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-[0.75rem] text-gray-600 font-medium">Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-gray-200">
                <Zap className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-[0.75rem] text-gray-600 font-medium">&lt;200ms Latency</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-gray-200">
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-[0.75rem] text-gray-600 font-medium">24/7 Deployment</span>
              </div>
            </div>
          </motion.div>

          {/* Right Panel: Floating AI Consultation Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.3 }}
            className="lg:col-span-7 relative group perspective-[2000px] z-30"
          >
            {/* Ambient Background Glow behind Form */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none z-0 transition-opacity duration-700 group-hover:opacity-100 opacity-60"></div>

            <div className="relative z-10 bg-white border border-gray-200 rounded-[40px] p-[2.5rem] lg:p-[4rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05),inset_0_0_0_1px_rgba(255,255,255,0.5)] hover:border-gray-300 transition-colors duration-500">
              
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-[1.5rem] font-syne font-bold text-gray-950 tracking-tight">System Configuration</h3>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.1)] border border-yellow-300/50">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2.5">
                    <label className="text-[0.75rem] text-gray-500 font-bold tracking-widest uppercase ml-1">First Name</label>
                    <input type="text" placeholder="Sarah" className="bg-gray-50 border border-gray-200 rounded-[20px] p-4 text-gray-950 text-[1rem] outline-none transition-all duration-300 focus:border-yellow-500/50 focus:bg-white focus:shadow-[0_0_20px_rgba(250,204,21,0.05),inset_0_2px_10px_rgba(0,0,0,0.02)] placeholder:text-gray-400" />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <label className="text-[0.75rem] text-gray-500 font-bold tracking-widest uppercase ml-1">Last Name</label>
                    <input type="text" placeholder="Jenkins" className="bg-gray-50 border border-gray-200 rounded-[20px] p-4 text-gray-950 text-[1rem] outline-none transition-all duration-300 focus:border-yellow-500/50 focus:bg-white focus:shadow-[0_0_20px_rgba(250,204,21,0.05),inset_0_2px_10px_rgba(0,0,0,0.02)] placeholder:text-gray-400" />
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <label className="text-[0.75rem] text-gray-500 font-bold tracking-widest uppercase ml-1">Work Email</label>
                  <input type="email" placeholder="sarah@enterprise.com" className="bg-gray-50 border border-gray-200 rounded-[20px] p-4 text-gray-950 text-[1rem] outline-none transition-all duration-300 focus:border-yellow-500/50 focus:bg-white focus:shadow-[0_0_20px_rgba(250,204,21,0.05),inset_0_2px_10px_rgba(0,0,0,0.02)] placeholder:text-gray-400" />
                </div>

                {/* Multiple Platform Requirements Selection */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-[0.75rem] text-gray-500 font-bold tracking-widest uppercase ml-1">Platform Requirements (Select all that apply)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                    {[
                      "Voice Agent (Inbound/Outbound)",
                      "WhatsApp AI Automation",
                      "Web Agent Integration",
                      "Custom LLM Fine-tuning",
                      "CRM & API Integrations",
                      "Custom Voice Clones"
                    ].map((req) => {
                      const isSelected = selectedRequirements.includes(req);
                      return (
                        <button
                          key={req}
                          type="button"
                          onClick={() => toggleRequirement(req)}
                          className={`flex items-center gap-3 p-3.5 rounded-[18px] border text-left text-sm font-semibold transition-all duration-300 cursor-pointer ${
                            isSelected
                              ? "bg-yellow-500/10 border-yellow-500 text-yellow-700 shadow-[0_4px_15px_rgba(250,204,21,0.08)]"
                              : "bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-100/50"
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            isSelected 
                              ? "bg-yellow-500 border-yellow-500 text-black" 
                              : "border-gray-300 bg-white"
                          }`}>
                            {isSelected && (
                              <svg className="w-3.5 h-3.5 stroke-current stroke-2" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span>{req}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <label className="text-[0.75rem] text-gray-500 font-bold tracking-widest uppercase ml-1">Deployment Context</label>
                  <textarea rows={4} placeholder="Describe your current bottleneck and how AI can solve it..." className="bg-gray-50 border border-gray-200 rounded-[20px] p-4 text-gray-950 text-[1rem] outline-none transition-all duration-300 focus:border-yellow-500/50 focus:bg-white focus:shadow-[0_0_20px_rgba(250,204,21,0.05),inset_0_2px_10px_rgba(0,0,0,0.02)] placeholder:text-gray-400 resize-none custom-scrollbar" />
                </div>

                <button className="w-full mt-6 py-5 rounded-[20px] font-syne font-bold text-[1.1rem] transition-all duration-300 tracking-wide relative overflow-hidden group/btn bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-[0_10px_30px_rgba(250,204,21,0.2)] hover:shadow-[0_15px_40px_rgba(250,204,21,0.35)] hover:scale-[1.01] flex items-center justify-center gap-2">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 opacity-30"></div>
                  Initialize Deployment <ArrowRight className="w-5 h-5 ml-1 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
