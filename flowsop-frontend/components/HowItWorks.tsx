"use client";
import { motion } from 'framer-motion';
import { UploadCloud, Cpu, FileSignature, Download } from 'lucide-react';

const steps = [
  { num: "01", icon: UploadCloud, title: "Upload Recording", desc: "Drop any MP4 or MOV screen recording into the dashboard." },
  { num: "02", icon: Cpu, title: "AI Analyzes", desc: "We extract frames, read text via OCR, and understand the flow." },
  { num: "03", icon: FileSignature, title: "Generate SOP", desc: "A perfectly formatted step-by-step guide is created." },
  { num: "04", icon: Download, title: "Download & Share", desc: "Export to PDF or share a direct link with your team." }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-6 max-w-7xl mx-auto border-t border-white/10">
      <div className="mb-20 text-center">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight">How it works</h2>
      </div>

      <div className="relative flex flex-col md:flex-row gap-8 justify-between">
        <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10" />
        
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="flex-1 flex flex-col items-center text-center relative"
          >
            <div className="w-24 h-24 rounded-full liquid-glass border border-white/10 flex items-center justify-center mb-6 relative group hover:border-white/40 transition">
              <span className="absolute -top-3 -right-3 text-xs font-mono text-white/40">{step.num}</span>
              <step.icon size={32} className="text-white/80 group-hover:text-white group-hover:scale-110 transition-all" />
            </div>
            <h3 className="text-lg font-medium mb-2">{step.title}</h3>
            <p className="text-sm text-white/50 max-w-[200px]">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
