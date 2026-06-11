"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, X, Zap, Server, Activity } from "lucide-react";

const plans = [
  {
    name: "Starter",
    priceMonthly: "4,999",
    priceAnnual: "3,999",
    desc: "Perfect for small businesses launching their first AI agent on one channel.",
    features: [
      "1 AI Agent (Voice or WhatsApp)",
      "500 conversations/month",
      "Basic analytics dashboard",
      "Email support",
      "2 essential integrations",
    ],
    disabled: ["Custom model training", "Multi-language support", "Dedicated manager"],
  },
  {
    name: "Growth",
    priceMonthly: "12,999",
    priceAnnual: "10,399",
    desc: "For growing teams that need multi-channel AI with advanced customisation.",
    popular: true,
    features: [
      "3 AI Agents (All channels)",
      "5,000 conversations/month",
      "Advanced analytics & exports",
      "Priority chat & email support",
      "15+ premium integrations",
      "Custom training on your data",
      "English, Hindi, Malayalam",
    ],
    disabled: ["Dedicated success manager"],
  },
  {
    name: "Enterprise",
    priceMonthly: "Custom",
    priceAnnual: "Custom",
    desc: "For enterprises needing unlimited scale, SLAs, custom integrations and white-labelling.",
    features: [
      "Unlimited AI agents",
      "Unlimited conversations",
      "Custom analytics & reporting",
      "24/7 phone & dedicated support",
      "Unlimited custom integrations",
      "Full model fine-tuning",
      "All languages + custom voice clones",
      "Dedicated account manager",
    ],
    disabled: [],
  },
];

// Reusable Neural/Grid Background
const PricingGlow = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
    {/* Central Glow for Growth Plan */}
    <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-yellow-500/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none"></div>
  </div>
);

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="relative z-10 py-32 px-[5vw] overflow-hidden bg-transparent">
      <PricingGlow />

      <div className="max-w-[1300px] mx-auto relative z-20">
        
        {/* Floating AI Infrastructure Metadata */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-sm">
            <Server className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[0.7rem] font-bold text-gray-300 uppercase tracking-widest">Enterprise Infrastructure</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-sm">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[0.7rem] font-bold text-gray-300 uppercase tracking-widest">99.9% Uptime SLA</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-sm hidden sm:flex">
            <Zap className="w-3.5 h-3.5 text-yellow-500" />
            <span className="text-[0.7rem] font-bold text-gray-300 uppercase tracking-widest">Low Latency AI</span>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col items-center mb-16"
        >
          <h2 className="font-syne text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold tracking-tight leading-[1.05] mb-6 text-white">
            Pricing that scales <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 drop-shadow-[0_0_30px_rgba(250,204,21,0.2)]">with your growth.</span>
          </h2>
          <p className="text-gray-400 text-[1.15rem] leading-[1.6] font-medium max-w-[560px]">
            Deploy powerful AI agents without unpredictable costs. Simple, transparent tiers designed for real business impact.
          </p>
        </motion.div>

        {/* Cinematic Toggle */}
        <div className="flex items-center justify-center mb-20 relative z-30">
          <div className="bg-white/[0.02] p-1.5 rounded-full border border-white/[0.08] backdrop-blur-2xl flex items-center relative shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <button
              onClick={() => setIsAnnual(false)}
              className={`relative z-10 px-8 py-3 rounded-full text-[0.95rem] font-semibold transition-colors duration-300 ${!isAnnual ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
            >
              {!isAnnual && (
                <motion.div
                  layoutId="activePricingPill"
                  className="absolute inset-0 bg-white/10 rounded-full border border-white/20 shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.05)] -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`relative z-10 px-8 py-3 rounded-full text-[0.95rem] font-semibold transition-colors duration-300 flex items-center gap-2 ${isAnnual ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
            >
              {isAnnual && (
                <motion.div
                  layoutId="activePricingPill"
                  className="absolute inset-0 bg-white/10 rounded-full border border-white/20 shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.05)] -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              Annually
              <span className={`relative z-10 text-[0.65rem] px-2.5 py-1 rounded-full font-bold uppercase tracking-wide transition-colors ${isAnnual ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 shadow-[0_0_10px_rgba(250,204,21,0.2)]" : "bg-white/[0.05] text-gray-400 border border-white/10"}`}>
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 perspective-[2000px] items-center">
          {plans.map((plan, index) => {
            const isPopular = plan.popular;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30, rotateY: index === 0 ? 5 : index === 2 ? -5 : 0 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1, type: "spring", bounce: 0.3 }}
                className={`relative bg-white/[0.02] backdrop-blur-3xl border rounded-[32px] p-[3rem_2.5rem] flex flex-col transition-all duration-500 group
                  ${isPopular 
                    ? "border-yellow-500/30 lg:scale-105 z-20 shadow-[0_30px_80px_-20px_rgba(250,204,21,0.15),inset_0_0_0_1px_rgba(250,204,21,0.1)] hover:shadow-[0_40px_100px_-20px_rgba(250,204,21,0.25)] hover:border-yellow-500/50" 
                    : "border-white/[0.05] z-10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.02)] hover:border-white/[0.15] hover:bg-white/[0.03] hover:-translate-y-2"}
                `}
              >
                {/* Internal Glow for Popular */}
                {isPopular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[30%] bg-gradient-to-b from-yellow-500/10 to-transparent pointer-events-none rounded-t-[32px]"></div>
                )}

                {isPopular && (
                  <div className="absolute -top-[16px] left-1/2 -translate-x-1/2 flex items-center justify-center z-30">
                    <div className="absolute inset-0 bg-yellow-500 blur-md opacity-50 rounded-full animate-pulse"></div>
                    <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-syne text-[0.75rem] font-bold px-5 py-1.5 rounded-full uppercase tracking-widest shadow-lg border border-yellow-300/50 flex items-center gap-1.5">
                      <Zap className="w-3 h-3" /> Most Popular
                    </div>
                  </div>
                )}

                <div className="text-[0.85rem] uppercase tracking-widest font-bold mb-4 flex items-center gap-2 relative z-20">
                  <span className={isPopular ? "text-yellow-500 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" : "text-gray-400"}>{plan.name}</span>
                </div>

                <div className="font-syne text-[3.5rem] font-extrabold tracking-tight leading-[1] mb-2 flex items-start relative z-20">
                  {plan.priceMonthly !== "Custom" && <sup className={`text-[1.5rem] font-bold mr-1 mt-2 ${isPopular ? "text-yellow-500" : "text-gray-500"}`}>₹</sup>}
                  <span className={`text-transparent bg-clip-text ${isPopular ? "bg-gradient-to-br from-white to-yellow-100 drop-shadow-sm" : "bg-gradient-to-br from-white to-gray-500"}`}>
                    {isAnnual ? plan.priceAnnual : plan.priceMonthly}
                  </span>
                </div>
                
                <div className="text-[0.9rem] text-gray-500 mb-8 font-medium relative z-20">
                  per month · billed {isAnnual ? "annually" : "monthly"}
                </div>
                
                <p className="text-[0.95rem] text-gray-400 leading-[1.6] mb-8 pb-8 border-b border-white/[0.08] font-medium relative z-20">
                  {plan.desc}
                </p>

                <ul className="flex flex-col gap-4 mb-10 flex-grow relative z-20">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[0.95rem] text-gray-300 font-medium">
                      <div className={`mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center shadow-inner ${isPopular ? "bg-yellow-500/10" : "bg-white/5"}`}>
                        <CheckCircle2 className={`w-4 h-4 ${isPopular ? "text-yellow-500" : "text-gray-400"}`} />
                      </div>
                      {f}
                    </li>
                  ))}
                  {plan.disabled?.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[0.95rem] text-gray-600 font-medium">
                      <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-transparent">
                        <X className="w-4 h-4 text-gray-700" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="#contact"
                  className={`w-full py-4 rounded-[16px] font-syne font-bold text-[1.05rem] text-center transition-all duration-300 tracking-wide relative overflow-hidden group/btn z-20 ${
                    isPopular
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-[0_10px_30px_rgba(250,204,21,0.3)] hover:shadow-[0_15px_40px_rgba(250,204,21,0.4)] hover:scale-[1.02]"
                      : "bg-white/[0.05] border border-white/10 text-white hover:bg-white/[0.1] hover:border-white/20 hover:scale-[1.02]"
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 ${isPopular ? "opacity-30" : "opacity-10"}`}></div>
                  {plan.priceMonthly === "Custom" ? "Talk to Sales" : "Get Started Now"}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
