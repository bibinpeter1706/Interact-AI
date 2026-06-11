"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Mic, PhoneCall, Sparkles, Zap, Activity, 
  ChevronDown, PhoneOff, User, Phone, Play, Volume2
} from "lucide-react";
import DoodleBackground from "./DoodleBackground";

// Reusable Neural Background
const NeuralBackground = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
    <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="demoLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(245,203,92,0)" />
          <stop offset="50%" stopColor="rgba(245,203,92,0.12)" />
          <stop offset="100%" stopColor="rgba(245,203,92,0)" />
        </linearGradient>
      </defs>
      <motion.path 
        d="M-100,200 C300,100 400,500 1200,300" 
        fill="none" 
        stroke="url(#demoLineGrad)" 
        strokeWidth="1.5"
        animate={{ strokeDashoffset: [1000, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        strokeDasharray="200 800"
      />
      <motion.path 
        d="M0,400 C400,600 600,100 1400,500" 
        fill="none" 
        stroke="url(#demoLineGrad)" 
        strokeWidth="1"
        animate={{ strokeDashoffset: [-1000, 1000] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        strokeDasharray="150 900"
      />
    </svg>
  </div>
);

const useCases = [
  {
    id: "receptionist",
    label: "Receptionist",
    title: "Front Desk AI Receptionist",
    description: "Handles bookings, answers generic inquiries, and routes calls dynamically.",
    greeting: "Thank you for calling Grand Plaza Front Desk! How may I assist you with your booking today?",
    dialogue: [
      { speaker: "AI Agent", text: "Thank you for calling Grand Plaza Front Desk! How may I assist you with your booking today?", duration: 4000 },
      { speaker: "You", text: "Hi, I'd like to reserve a deluxe room for this weekend.", duration: 3000 },
      { speaker: "AI Agent", text: "I can absolutely check availability for you. Is that check-in for Friday, the 14th?", duration: 4500 },
      { speaker: "You", text: "Yes, for two nights, please.", duration: 2500 },
      { speaker: "AI Agent", text: "Perfect. We have a deluxe suite available with king bed at ₹6,500 per night. Shall I book it?", duration: 5000 },
    ]
  },
  {
    id: "support",
    label: "Customer Support",
    title: "Support Specialist AI",
    description: "Resolves queries, retrieves delivery status, and opens tickets automatically.",
    greeting: "InteractAI Support Helpdesk. Please provide your order ID or email address.",
    dialogue: [
      { speaker: "AI Agent", text: "InteractAI Support Helpdesk. Please provide your order ID or email address.", duration: 4000 },
      { speaker: "You", text: "My order ID is #4820 and it hasn't arrived yet.", duration: 3500 },
      { speaker: "AI Agent", text: "Thank you. Let me query the shipment database... Yes, order #4820 is currently with BlueDart and will be delivered today by 5 PM.", duration: 6000 },
      { speaker: "You", text: "Can I receive the tracking link?", duration: 2500 },
      { speaker: "AI Agent", text: "Of course! I have just sent the active BlueDart tracking link directly to your WhatsApp.", duration: 4500 },
    ]
  },
  {
    id: "realestate",
    label: "Real Estate Agent",
    title: "Prop-Tech AI Sales Agent",
    description: "Qualifies buyers, lists properties matching budget, and books property walkthroughs.",
    greeting: "Hi there! Enquiring about our premium apartments in Kochi? Let me know your budget range.",
    dialogue: [
      { speaker: "AI Agent", text: "Hi there! Enquiring about our premium apartments in Kochi? Let me know your budget range.", duration: 4000 },
      { speaker: "You", text: "Hi, yes. I'm looking for a 3BHK with a budget of around 85 Lakhs.", duration: 3500 },
      { speaker: "AI Agent", text: "Excellent choice. We have a premium 3BHK at Kakkanad with lake view starting at 82 Lakhs. Would you like to schedule a site visit this Saturday?", duration: 6000 },
      { speaker: "You", text: "Yes, Saturday morning around 10:30 AM works.", duration: 3000 },
      { speaker: "AI Agent", text: "Perfect! I've scheduled your site visit for Saturday at 10:30 AM. Sales executive Rohan will meet you at the site.", duration: 5500 },
    ]
  },
  {
    id: "debt",
    label: "Debt Collection",
    title: "Compliance-First Recovery AI",
    description: "Friendly and compliant account reminders, payment setup, and details verification.",
    greeting: "Hello, this is a secure line regarding account ref 9081. Am I speaking with the account holder?",
    dialogue: [
      { speaker: "AI Agent", text: "Hello, this is a secure line regarding account ref 9081. Am I speaking with the account holder?", duration: 4500 },
      { speaker: "You", text: "Yes, this is Joseph. What is this about?", duration: 3000 },
      { speaker: "AI Agent", text: "Hi Joseph, this is a quick reminder regarding your outstanding invoice of ₹4,200 due on May 30th. Can we set up a quick UPI payment now?", duration: 6000 },
      { speaker: "You", text: "I can pay only half of it today.", duration: 2500 },
      { speaker: "AI Agent", text: "I understand. I can split the invoice and set up a payment of ₹2,100 today, with the remaining due in 7 days. Does that work?", duration: 5500 },
    ]
  }
];

export default function Demo() {
  const [selectedCaseId, setSelectedCaseId] = useState(useCases[0].id);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  
  // Call States: "idle" | "calling" | "connected" | "ended"
  const [callState, setCallState] = useState<"idle" | "calling" | "connected" | "ended">("idle");
  const [timer, setTimer] = useState(0);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(-1);
  const [speakerText, setSpeakerText] = useState("");
  const [speakerName, setSpeakerName] = useState("");
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const selectedCase = useCases.find(uc => uc.id === selectedCaseId) || useCases[0];

  useEffect(() => {
    if (callState === "connected") {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [callState]);

  // Dialogue simulation loop
  useEffect(() => {
    let activeTimeout: NodeJS.Timeout;
    if (callState === "connected") {
      const playDialogue = async (idx: number) => {
        if (idx >= selectedCase.dialogue.length) {
          setCallState("ended");
          return;
        }
        
        setCurrentDialogueIndex(idx);
        const line = selectedCase.dialogue[idx];
        setSpeakerName(line.speaker === "You" ? (name || "You") : "AI Caller");
        setSpeakerText(line.text);

        activeTimeout = setTimeout(() => {
          playDialogue(idx + 1);
        }, line.duration);
      };
      
      playDialogue(0);
    }

    return () => {
      if (activeTimeout) clearTimeout(activeTimeout);
    };
  }, [callState, selectedCaseId]);

  const handleStartCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Please enter your name and phone number to test the demo call!");
      return;
    }
    setCallState("calling");
    setTimer(0);
    
    // Simulate connection delay
    setTimeout(() => {
      setCallState("connected");
    }, 2000);
  };

  const handleEndCall = () => {
    setCallState("idle");
    setCurrentDialogueIndex(-1);
    setSpeakerText("");
    setSpeakerName("");
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="demo" className="relative py-28 px-[5vw] overflow-hidden bg-[#F9F9F9]">
      <NeuralBackground />
      <DoodleBackground className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply" />
      
      <div className="max-w-[1250px] mx-auto relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col items-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200/60 text-gray-800 text-[0.72rem] font-bold tracking-widest uppercase mb-6 shadow-sm">
            <Activity className="w-3.5 h-3.5 text-yellow-500 animate-pulse" /> Interactive Call Engine
          </div>
          <h2 className="font-syne text-[clamp(2.5rem,5vw,4rem)] font-extrabold tracking-tight leading-[1.1] mb-6 text-gray-900">
            Voice Agent <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">Live Demo</span>
          </h2>
          <p className="text-gray-500 text-[1.1rem] leading-[1.6] max-w-[560px] font-medium">
            Discover the ultra-low latency & natural conversational flow of our customized enterprise AI callers.
          </p>
        </motion.div>

        {/* Two-Column Retell-style Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Visualizer Orb & Pill Selectors */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            
            {/* Visualizer Area */}
            <div className="relative w-[300px] h-[300px] md:w-[350px] md:h-[350px] flex items-center justify-center mb-8">
              
              {/* Outer Pulsing Glow Rings */}
              {callState === "calling" && (
                <>
                  <div className="absolute inset-0 rounded-full border border-yellow-400/30 animate-ping opacity-70"></div>
                  <div className="absolute inset-4 rounded-full border border-yellow-500/20 animate-pulse opacity-40"></div>
                </>
              )}
              
              {callState === "connected" && (
                <>
                  <motion.div 
                    animate={{ scale: [1, 1.12, 1] }} 
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute inset-0 rounded-full bg-yellow-500/5 blur-2xl"
                  />
                  <div className="absolute -inset-4 rounded-full border border-yellow-500/20 animate-ping opacity-40"></div>
                  <div className="absolute -inset-8 rounded-full border border-yellow-500/10 animate-ping opacity-25"></div>
                </>
              )}

              {/* Central Morphing Fluid Sphere */}
              <motion.div
                animate={
                  callState === "connected" 
                    ? { 
                        borderRadius: ["42% 58% 70% 30% / 45% 45% 55% 55%", "70% 30% 52% 48% / 60% 40% 60% 40%", "42% 58% 70% 30% / 45% 45% 55% 55%"],
                        rotate: [0, 180, 360],
                        scale: [1, 1.05, 1]
                      }
                    : callState === "calling"
                    ? {
                        borderRadius: ["50%", "45% 55% 45% 55%", "50%"],
                        scale: [1, 1.1, 1]
                      }
                    : {
                        borderRadius: ["50% 50% 50% 50% / 50% 50% 50% 50%", "48% 52% 52% 48% / 51% 49% 51% 49%", "50% 50% 50% 50% / 50% 50% 50% 50%"],
                        rotate: [0, 45, 0]
                      }
                }
                transition={{ 
                  repeat: Infinity, 
                  duration: callState === "connected" ? 4 : 8, 
                  ease: "easeInOut" 
                }}
                className={`w-[240px] h-[240px] md:w-[280px] md:h-[280px] bg-gradient-to-tr transition-all duration-700 shadow-2xl relative flex flex-col items-center justify-center ${
                  callState === "connected"
                    ? "from-yellow-400 via-emerald-400 to-indigo-500"
                    : callState === "calling"
                    ? "from-yellow-400 via-orange-400 to-red-400"
                    : "from-yellow-200 via-blue-400 to-purple-400"
                }`}
              >
                {/* Floating Wave Inside */}
                <div className="absolute inset-0 bg-white/10 rounded-full backdrop-blur-[2px]"></div>
                
                {/* Status Indicator text overlay on Orb */}
                <div className="relative z-10 flex flex-col items-center text-white text-center px-6">
                  {callState === "idle" && (
                    <>
                      <Volume2 className="w-10 h-10 mb-2 opacity-80" />
                      <span className="text-sm font-bold uppercase tracking-wider">Ready to Call</span>
                    </>
                  )}
                  {callState === "calling" && (
                    <>
                      <Phone className="w-10 h-10 mb-2 animate-bounce" />
                      <span className="text-sm font-bold uppercase tracking-wider animate-pulse">Dialing Agent...</span>
                    </>
                  )}
                  {callState === "connected" && (
                    <>
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                        <span className="text-xs uppercase tracking-widest bg-emerald-500/30 px-2 py-0.5 rounded-full font-bold">In Call</span>
                      </div>
                      <span className="text-2xl font-bold font-mono tracking-wider">{formatTimer(timer)}</span>
                      <span className="text-[0.7rem] uppercase tracking-widest text-white/70 mt-1">Sub-150ms latency</span>
                    </>
                  )}
                  {callState === "ended" && (
                    <>
                      <PhoneOff className="w-10 h-10 mb-2 opacity-80" />
                      <span className="text-sm font-bold uppercase tracking-wider">Call Completed</span>
                    </>
                  )}
                </div>
              </motion.div>

            </div>

            {/* Pill Selectors Grid below Orb */}
            <div className="flex flex-wrap justify-center gap-2 max-w-[480px]">
              {useCases.map((uc) => {
                const isSelected = selectedCaseId === uc.id;
                return (
                  <button
                    key={uc.id}
                    onClick={() => {
                      if (callState === "idle" || callState === "ended") {
                        setSelectedCaseId(uc.id);
                        setCallState("idle");
                      }
                    }}
                    disabled={callState === "calling" || callState === "connected"}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                      isSelected
                        ? "bg-yellow-500 text-black border-yellow-400 shadow-md scale-[1.02]"
                        : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200/80 hover:bg-gray-50 hover:border-gray-300"
                    } disabled:opacity-40 disabled:cursor-not-allowed`}
                  >
                    {uc.label}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Right Column: Dynamic Form / Interactive Panel */}
          <div className="lg:col-span-7">
            <div className="bg-white/70 backdrop-blur-xl border border-white/80 p-8 md:p-10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] h-full flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
                {callState === "idle" || callState === "ended" ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-heading text-xl md:text-2xl font-bold tracking-tight text-gray-950 mb-6 leading-snug">
                      Receive a live call from our agent and discover how our AI caller transforms customer conversations.
                    </h3>
                    
                    <form onSubmit={handleStartCall} className="space-y-6">
                      
                      {/* Use Case Select Dropdown */}
                      <div className="space-y-2">
                        <label className="text-[0.7rem] font-bold text-gray-500 uppercase tracking-wider block">Use Case</label>
                        <div className="relative">
                          <select
                            value={selectedCaseId}
                            onChange={(e) => setSelectedCaseId(e.target.value)}
                            className="w-full bg-white/90 border border-gray-200 rounded-2xl px-5 py-4 text-[0.95rem] font-semibold text-gray-950 appearance-none focus:outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all cursor-pointer"
                          >
                            {useCases.map((uc) => (
                              <option key={uc.id} value={uc.id}>
                                {uc.title}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-5 h-5 text-gray-400 absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      {/* Name Input */}
                      <div className="space-y-2">
                        <label className="text-[0.7rem] font-bold text-gray-500 uppercase tracking-wider block">Name</label>
                        <div className="relative">
                          <User className="w-5 h-5 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-white/90 border border-gray-200 rounded-2xl pl-12 pr-5 py-4 text-[0.95rem] font-semibold text-gray-950 focus:outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all placeholder:text-gray-400"
                          />
                        </div>
                      </div>

                      {/* Phone Input */}
                      <div className="space-y-2">
                        <label className="text-[0.7rem] font-bold text-gray-500 uppercase tracking-wider block">Phone Number</label>
                        <div className="relative">
                          <Phone className="w-5 h-5 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            required
                            placeholder="+15551234567"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-white/90 border border-gray-200 rounded-2xl pl-12 pr-5 py-4 text-[0.95rem] font-semibold text-gray-950 focus:outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 transition-all placeholder:text-gray-400"
                          />
                        </div>
                      </div>

                      {/* Trigger Call Button */}
                      <button
                        type="submit"
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white font-syne font-bold py-4.5 px-6 rounded-2xl transition-all duration-300 hover:scale-[1.01] hover:shadow-lg shadow-md flex items-center justify-center gap-2.5 text-[1.05rem]"
                      >
                        <PhoneCall className="w-5 h-5" /> Start Live Call
                      </button>

                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="active-call"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col h-[400px] justify-between"
                  >
                    {/* Header showing active agent */}
                    <div className="border-b border-gray-100 pb-5 mb-5 flex items-center justify-between">
                      <div>
                        <span className="text-[0.7rem] font-bold text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded border border-yellow-100 uppercase tracking-widest">{selectedCase.label}</span>
                        <h4 className="text-lg font-bold text-gray-900 mt-2">{selectedCase.title}</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-[0.65rem] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-100 uppercase tracking-wider block">Live Dialogue</span>
                      </div>
                    </div>

                    {/* Dialogue Box */}
                    <div className="flex-1 bg-gray-50/70 border border-gray-100/50 rounded-2xl p-6 overflow-y-auto mb-6 flex flex-col justify-center">
                      <AnimatePresence mode="wait">
                        {speakerText ? (
                          <motion.div
                            key={currentDialogueIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-center"
                          >
                            <span className="text-[0.7rem] font-bold uppercase tracking-wider text-gray-400 block mb-2">{speakerName}</span>
                            <p className="text-[1.2rem] md:text-[1.35rem] font-syne font-bold text-gray-950 leading-relaxed max-w-[90%] mx-auto">
                              "{speakerText}"
                            </p>
                          </motion.div>
                        ) : (
                          <div className="text-center text-gray-400">
                            <span className="animate-pulse">Connecting audio routing...</span>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Hang Up Action Button */}
                    <button
                      onClick={handleEndCall}
                      className="w-full bg-red-600 hover:bg-red-500 text-white font-syne font-bold py-4.5 px-6 rounded-2xl transition-all duration-300 hover:scale-[1.01] flex items-center justify-center gap-2.5 text-[1.05rem]"
                    >
                      <PhoneOff className="w-5 h-5" /> Hang Up Call
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
