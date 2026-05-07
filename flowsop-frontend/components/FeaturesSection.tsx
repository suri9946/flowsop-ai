"use client";
import { motion } from 'framer-motion';
import { Brain, Image as ImageIcon, Workflow, CheckSquare, FileText, Zap } from 'lucide-react';

const features = [
  { icon: Brain, title: "AI SOP Generator", desc: "Advanced LLMs understand your workflow and write professional documentation automatically." },
  { icon: ImageIcon, title: "Automatic Screenshots", desc: "Perfectly timed screenshots are captured and embedded into each step." },
  { icon: Workflow, title: "Workflow Understanding", desc: "AI interprets clicks, typing, and transitions to explain the 'why' behind actions." },
  { icon: CheckSquare, title: "Checklist Generator", desc: "Instantly extracts a simple checklist from complex multi-step processes." },
  { icon: FileText, title: "Export as PDF", desc: "Download clean, formatted PDFs ready to share with your team or clients." },
  { icon: Zap, title: "Professional Documentation", desc: "Consistent formatting, tone, and structure across all your company's SOPs." }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
          Everything you need to document <span className="font-serif italic pr-2">faster</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="liquid-glass p-8 rounded-2xl flex flex-col gap-4 border border-white/5 hover:border-white/20 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
              <feat.icon size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-medium">{feat.title}</h3>
            <p className="text-white/60 leading-relaxed text-sm">{feat.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
