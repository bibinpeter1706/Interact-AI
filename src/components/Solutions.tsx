"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  ShoppingCart, Building, ConciergeBell,
  CheckCircle2, Zap, TrendingUp, Sparkles, 
  Send, Activity, Users,
  Network
} from "lucide-react";
import DoodleBackground from "./DoodleBackground";

// Extremely refined, outcome-driven copy
const useCases = [
  {
    id: "ecom",
    label: "E-Commerce",
    icon: ShoppingCart,
    bgGlow: "radial-gradient(circle at 80% 50%, rgba(245,203,92,0.15), transparent 50%)",
    title: "Supercharge Sales",
    desc: "Deploy intelligent agents that instantly process returns, track orders, and recover abandoned carts. No human intervention required.",
    outcomes: [
      "Zero-touch returns & refunds",
      "Automated cart recovery",
      "24/7 multilingual support"
    ],
    metrics: [
      { label: "Faster Responses", value: "98%", icon: Zap, pos: "-left-16 top-16", delay: 0.2 },
      { label: "Cart Recovery", value: "3x", icon: TrendingUp, pos: "-right-12 bottom-32", delay: 0.4 }
    ],
    chat: [
      { sender: "InteractAI", msg: "Hi Priya! Your order #4521 is out for delivery. Expected by 4 PM today. 📦", type: "bot" },
      { sender: "Priya", msg: "Can I change the delivery address?", type: "user" },
      { sender: "InteractAI", msg: "Sure! Please share the new address.", type: "bot" },
      { sender: "Priya", msg: "12 MG Road, Kochi", type: "user" },
      { sender: "InteractAI", msg: "✅ Address updated! You'll receive a confirmation SMS shortly.", type: "bot" },
    ],
  },
  {
    id: "realestate",
    label: "Real Estate",
    icon: Building,
    bgGlow: "radial-gradient(circle at 80% 50%, rgba(232,237,223,0.6), transparent 50%)",
    title: "Close Deals Faster",
    desc: "Qualify leads instantly, schedule site visits, and nurture prospects automatically. Free your agents to focus only on hot leads.",
    outcomes: [
      "Instant lead qualification",
      "Automated site visit scheduling",
      "Seamless CRM sync"
    ],
    metrics: [
      { label: "Lead Qual", value: "10x", icon: Zap, pos: "-left-14 top-16", delay: 0.2 },
      { label: "Efficiency", value: "+300%", icon: Users, pos: "-right-10 bottom-24", delay: 0.4 }
    ],
    chat: [
      { sender: "PropertyBot", msg: "Hi! I see you enquired about our 3BHK project. What is your budget?", type: "bot" },
      { sender: "Buyer", msg: "Around 80 lakhs", type: "user" },
      { sender: "PropertyBot", msg: "Perfect! We have 2 premium units. Visit this Saturday at 11 AM?", type: "bot" },
      { sender: "Buyer", msg: "Saturday 11 AM works!", type: "user" },
      { sender: "PropertyBot", msg: "✅ Confirmed! Arjun will call you 1 hour before.", type: "bot" },
    ],
  },
  {
    id: "resort",
    label: "Front Desk",
    icon: ConciergeBell,
    bgGlow: "radial-gradient(circle at 80% 50%, rgba(16,185,129,0.12), transparent 50%)",
    title: "Your 24/7 Front Desk",
    desc: "Welcome guests, manage stay requests, and answer resort questions any time of day.",
    outcomes: [
      "Early check-in & check-out requests",
      "Airport pickup coordination",
      "Instant guest support & local tips"
    ],
    metrics: [
      { label: "Guest Satisfaction", value: "96%", icon: Sparkles, pos: "-left-14 top-16", delay: 0.2 },
      { label: "Response Time", value: "<10s", icon: Zap, pos: "-right-10 bottom-24", delay: 0.4 }
    ],
    chat: [
      { sender: "ResortBot", msg: "Welcome to Coconut Grove Resort. How may I assist you today?", type: "bot" },
      { sender: "Guest", msg: "We are arriving at 11 AM. Can we request an early check-in?", type: "user" },
      { sender: "ResortBot", msg: "Certainly. I have noted your request and will update you as soon as your room is ready.", type: "bot" },
      { sender: "Guest", msg: "Thank you. We also need an airport pickup.", type: "user" },
      { sender: "ResortBot", msg: "Your airport pickup is confirmed for 10:30 AM. Our driver will meet you at the arrivals gate.", type: "bot" },
    ],
  },
];

// Neural Lines Background Component
const NeuralBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-70">
    <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(245,203,92,0)" />
          <stop offset="50%" stopColor="rgba(245,203,92,0.15)" />
          <stop offset="100%" stopColor="rgba(245,203,92,0)" />
        </linearGradient>
      </defs>
      {/* Abstract neural pathways */}
      <motion.path 
        d="M-100,200 C300,100 400,500 1200,300" 
        fill="none" 
        stroke="url(#lineGrad)" 
        strokeWidth="1.5"
        animate={{ strokeDashoffset: [1000, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        strokeDasharray="200 800"
      />
      <motion.path 
        d="M0,400 C400,600 600,100 1400,500" 
        fill="none" 
        stroke="url(#lineGrad)" 
        strokeWidth="1"
        animate={{ strokeDashoffset: [-1000, 1000] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        strokeDasharray="150 900"
      />
    </svg>
  </div>
);

type ChatMessage = {
  sender: string;
  msg: string;
  type: "bot" | "user";
};

function ChatDemoMessages({ activeCase, messages, isReplying }: { activeCase: typeof useCases[0]; messages: ChatMessage[]; isReplying: boolean }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const botName = activeCase.chat.find((m) => m.type === "bot")?.sender || "AI Agent";

  useEffect(() => {
    let isMounted = true;
    setVisibleCount(0);
    setIsTyping(false);

    const runSequence = async () => {
      await new Promise(r => setTimeout(r, 600));

      for (let i = 0; i < activeCase.chat.length; i++) {
        if (!isMounted) return;
        const msg = activeCase.chat[i];
        
        if (msg.type === "bot") {
          setIsTyping(true);
          await new Promise(r => setTimeout(r, 1200 + Math.random() * 400));
          if (!isMounted) return;
          setIsTyping(false);
        } else {
          await new Promise(r => setTimeout(r, 800 + Math.random() * 300));
        }
        
        if (!isMounted) return;
        setVisibleCount(i + 1);
      }
    };

    runSequence();
    return () => { isMounted = false; };
  }, [activeCase]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleCount, isTyping, messages, isReplying]);

  const visibleMessages = [...activeCase.chat.slice(0, visibleCount), ...messages];

  return (
    <div
      ref={scrollRef}
      data-lenis-prevent
      className="min-h-0 flex-1 p-6 lg:p-8 overflow-y-auto overscroll-contain flex flex-col gap-6 custom-scrollbar scroll-smooth"
    >
      <AnimatePresence>
        {visibleMessages.map((msg, idx) => {
          const isBot = msg.type === "bot";
          return (
            <motion.div
              key={`${activeCase.id}-${idx}-${msg.msg}`}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
              className={`flex flex-col w-full ${isBot ? "items-start" : "items-end"}`}
            >
              <span className="text-[0.7rem] text-gray-500 mb-1.5 ml-1 flex items-center gap-1.5 font-medium tracking-wide">
                {isBot && <Sparkles className="w-3 h-3 text-yellow-500" />}
                {msg.sender}
              </span>
              <div
                className={`relative p-[16px_20px] rounded-[20px] text-[0.95rem] max-w-[88%] leading-[1.6] shadow-sm backdrop-blur-xl transition-all duration-300 ${
                  isBot
                    ? "bg-white/80 border border-white/60 text-gray-800 rounded-tl-[6px] hover:shadow-md hover:bg-white"
                    : "bg-gradient-to-br from-gold to-yellow-500 border border-yellow-400/50 text-bg2 rounded-tr-[6px] font-medium shadow-[0_10px_20px_rgba(245,203,92,0.15)]"
                }`}
              >
                {msg.msg}
              </div>
              {!isBot && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-[0.65rem] text-gray-400 mt-1.5 mr-1 flex items-center gap-1 font-medium"
                >
                  <CheckCircle2 className="w-3 h-3 text-yellow-500" /> Delivered
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {(isTyping || isReplying) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="flex flex-col items-start"
        >
          <span className="text-[0.7rem] text-gray-500 mb-1.5 ml-1 flex items-center gap-1.5 font-medium tracking-wide">
            <Sparkles className="w-3 h-3 text-yellow-500" />
            {botName}
          </span>
          <div className="bg-white/80 border border-white/60 rounded-[20px] rounded-tl-[6px] px-5 py-4 flex gap-1.5 backdrop-blur-xl w-fit shadow-sm">
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 bg-gray-300 rounded-full" />
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-gray-300 rounded-full" />
            <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-gray-300 rounded-full" />
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default function Solutions() {
  const [activeTab, setActiveTab] = useState(useCases[0].id);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isChatReplying, setIsChatReplying] = useState(false);
  const replyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeCase = useCases.find((uc) => uc.id === activeTab)!;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    return () => {
      if (replyTimeoutRef.current) clearTimeout(replyTimeoutRef.current);
    };
  }, []);

  const handleTabChange = (tabId: string) => {
    if (replyTimeoutRef.current) clearTimeout(replyTimeoutRef.current);
    setActiveTab(tabId);
    setChatInput("");
    setChatMessages([]);
    setIsChatReplying(false);
  };

  const handleChatSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = chatInput.trim();
    if (!question || isChatReplying) return;

    const botName = activeCase.chat.find((message) => message.type === "bot")?.sender || "AI Agent";
    setChatMessages((messages) => [...messages, { sender: "You", msg: question, type: "user" }]);
    setChatInput("");
    setIsChatReplying(true);

    replyTimeoutRef.current = setTimeout(() => {
      setChatMessages((messages) => [
        ...messages,
        {
          sender: botName,
          msg: `Thanks for your message. I can help with ${activeCase.outcomes[0].toLowerCase()}—what details can I check for you?`,
          type: "bot",
        },
      ]);
      setIsChatReplying(false);
      replyTimeoutRef.current = null;
    }, 800);
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const leftColY = useTransform(scrollYProgress, [0, 1], [50, -80]);
  const rightColY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section ref={sectionRef} id="usecases" className="relative py-32 px-[5vw] bg-[#F9F9F9] overflow-hidden">
      
      {/* 1. Atmospheric Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Animated Doodle Art */}
        <DoodleBackground 
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden mix-blend-multiply opacity-80" 
          svgClassName="w-full h-full text-black" 
        />
        {/* Soft Noise Texture */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-multiply bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>
        
        {/* Dynamic Warm Radial Gradient */}
        <div 
          className="absolute inset-0 transition-all duration-1000 ease-in-out opacity-60"
          style={{ background: activeCase.bgGlow }}
        />
        
        {/* Animated Neural/Signal Lines */}
        <NeuralBackground />
        
        {/* Ambient Top/Bottom Fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#F9F9F9] to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F9F9F9] to-transparent"></div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col items-center">
        
        {/* 2. Header Section */}
        <motion.div 
          style={{ y: headerY }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 max-w-2xl"
        >

          <h2 className="font-syne text-[clamp(2.5rem,4vw,4rem)] font-extrabold tracking-tight leading-[1.05] mb-6 text-gray-900">
            Built for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 drop-shadow-sm">Every Enterprise</span>
          </h2>
          <p className="text-gray-500 text-[1.15rem] leading-[1.6] font-medium max-w-xl mx-auto">
            Transform customer engagement with domain-specific AI models that instantly understand your workflows.
          </p>
        </motion.div>

        {/* 3. Interactive Tab System (Pill Switcher) */}
        <div className="flex flex-wrap justify-center gap-2 mb-20 p-1.5 bg-black/90 backdrop-blur-2xl rounded-full border border-white/10 shadow-2xl relative">
          {useCases.map((uc) => {
            const isActive = activeTab === uc.id;
            const Icon = uc.icon;
            return (
              <button
                key={uc.id}
                onClick={() => handleTabChange(uc.id)}
                className={`relative px-8 py-3 rounded-full flex items-center gap-2.5 text-[0.95rem] font-semibold transition-all duration-300 z-10 ${
                  isActive ? "text-white" : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-white/10 rounded-full shadow-[0_8px_30px_rgba(255,255,255,0.05)] border border-white/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className={`w-4 h-4 relative z-10 transition-colors ${isActive ? "text-yellow-500" : "text-gray-500"}`} />
                <span className="relative z-10">{uc.label}</span>
              </button>
            )
          })}
        </div>

        {/* 4. Tighter Integrated Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center w-full max-w-6xl mx-auto">
          
          {/* Left Column: Focused Copy & Outcomes */}
          <motion.div 
            style={{ y: leftColY }}
            className="lg:col-span-5 flex flex-col relative z-20 h-full items-center lg:items-start"
          >
            <div className="w-full max-w-[520px] h-[600px] bg-white/40 backdrop-blur-xl border border-white/60 rounded-[32px] p-8 lg:p-12 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.05)] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <h3 className="font-syne text-[2.4rem] font-bold mb-5 tracking-tight leading-[1.1] text-gray-900">
                    {activeCase.title}
                  </h3>
                  <p className="text-gray-500 text-[1.1rem] leading-[1.6] mb-10 font-medium">
                    {activeCase.desc}
                  </p>
                  <div className="flex flex-col gap-5">
                    {activeCase.outcomes.map((item, idx) => (
                      <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + idx * 0.1 }}
                        className="group flex items-center gap-4 bg-white/60 p-4 rounded-2xl border border-white shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:bg-white cursor-default"
                      >
                        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 p-1.5 rounded-full shadow-inner border border-yellow-200/50 group-hover:scale-110 transition-transform">
                          <CheckCircle2 className="w-4 h-4 text-yellow-600 shrink-0" />
                        </div>
                        <span className="text-gray-800 text-[0.95rem] font-semibold">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Column: 3D Floating Demo Interface */}
          <motion.div 
            style={{ y: rightColY }}
            className="lg:col-span-7 relative h-[700px] w-full flex items-center justify-center lg:justify-end mt-10 lg:mt-0 perspective-[2000px]"
          >
            
            {/* Ambient Background Glow behind UI */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-yellow-400/10 blur-[100px] rounded-full pointer-events-none z-0"></div>



            {/* Premium 3D Glassmorphic Chat Panel */}
            <motion.div
              initial={{ rotateY: -5, rotateX: 2 }}
              animate={{ 
                y: [-10, 10, -10],
                rotateY: [-5, -3, -5],
                rotateX: [2, 1, 2]
              }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="w-full max-w-[520px] bg-white/40 backdrop-blur-3xl border border-white/80 rounded-[32px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15),inset_0_0_0_1px_rgba(255,255,255,1)] overflow-hidden flex flex-col h-[600px] relative z-20 origin-right"
            >
              {/* Top Bar / Header */}
              <div className="p-5 px-6 border-b border-white/50 bg-white/60 backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-[0_8px_16px_rgba(245,203,92,0.3)] border border-yellow-300/50">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-[1.05rem] text-gray-900 tracking-tight">InteractAI Agent</div>
                    <div className="text-[0.75rem] text-emerald-600 flex items-center gap-1.5 font-bold mt-0.5 uppercase tracking-wide">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      Active Session
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-200 shadow-inner"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-200 shadow-inner"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-200 shadow-inner"></div>
                </div>
              </div>

              {/* Chat Messages Area */}
              <div className="whatsapp-chat-wallpaper min-h-0 flex-1 relative overflow-hidden flex flex-col">
                <ChatDemoMessages activeCase={activeCase} messages={chatMessages} isReplying={isChatReplying} />
              </div>

              {/* Input Field */}
              <div className="p-5 px-6 border-t border-white/50 bg-white/60 backdrop-blur-md">
                <form onSubmit={handleChatSubmit} className="bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 flex items-center gap-3 shadow-sm transition-all hover:border-gray-300 focus-within:border-yellow-400 focus-within:ring-4 focus-within:ring-yellow-400/10">
                  <input 
                    type="text" 
                    placeholder={chatMessages.length > 0 ? "Message" : "Try Demo"}
                    className="bg-transparent border-none outline-none flex-1 text-[1rem] text-gray-800 placeholder:text-gray-400 font-medium"
                    value={chatInput}
                    onChange={(event) => setChatInput(event.target.value)}
                    disabled={isChatReplying}
                    aria-label="Message the AI agent"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim() || isChatReplying}
                    aria-label="Send message"
                    className="bg-gray-900 p-3 rounded-full text-white hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-md disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                  >
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                </form>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
