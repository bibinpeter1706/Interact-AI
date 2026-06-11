"use client";

import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

const codeSnippet = `import { InteractAI } from '@interactai/sdk';

const client = new InteractAI({
  apiKey: process.env.INTERACT_API_KEY,
});

// Create and deploy a new voice agent
const agent = await client.agents.create({
  name: "Sales Representative",
  language: "en-US",
  voice: "nova-premium",
  prompt: "You are a helpful sales assistant...",
  tools: ["calendar_booking", "crm_lookup"]
});

console.log(\`Agent deployed at: \${agent.url}\`);`;

export default function ApiSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="api" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-sm mb-6">
              Developer First
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Integrate in minutes, <br />
              scale indefinitely.
            </h2>
            <p className="text-silver-gray text-lg mb-8">
              Our robust API and SDKs make it incredibly easy to add powerful conversational AI to your existing apps. Connect to your database, CRM, or custom tools seamlessly.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-background px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors">
                Read Documentation
              </button>
              <button className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors">
                View API Reference
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Window controls */}
            <div className="bg-[#1e1e1e] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-3 bg-[#2d2d2d] border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-xs text-silver-gray font-mono">agent.ts</div>
                <button onClick={handleCopy} className="text-silver-gray hover:text-white transition-colors">
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="p-6 overflow-x-auto">
                <pre className="text-sm font-mono text-silver-gray leading-relaxed">
                  <code dangerouslySetInnerHTML={{
                    __html: codeSnippet
                      .replace(/import/g, '<span class="text-pink-400">import</span>')
                      .replace(/const/g, '<span class="text-blue-400">const</span>')
                      .replace(/new/g, '<span class="text-blue-400">new</span>')
                      .replace(/await/g, '<span class="text-pink-400">await</span>')
                      .replace(/('.*?'|".*?")/g, '<span class="text-green-400">$&</span>')
                      .replace(/(\/\/.*)/g, '<span class="text-gray-500">$&</span>')
                  }} />
                </pre>
              </div>
            </div>
            
            {/* Glow effect behind code block */}
            <div className="absolute -inset-4 bg-electric-blue/20 blur-3xl -z-10 rounded-full opacity-50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
