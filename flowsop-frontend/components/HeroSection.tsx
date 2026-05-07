"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-20">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl mx-auto text-center z-10"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 text-sm text-white/80"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          AI-Powered SOP Generation
        </motion.div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-0.04em] leading-[1.1] mb-6">
          Turn Screen <span className="font-serif italic text-white/90 pr-2">Recordings</span> <br className="hidden md:block"/>
          Into SOPs Instantly
        </h1>

        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Upload a workflow video and let AI generate step-by-step onboarding guides, SOPs, and training documentation automatically.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup">
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full bg-white text-black font-medium flex items-center gap-2 group w-full sm:w-auto justify-center"
            >
              Try Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-full liquid-glass flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Play size={18} />
            Watch Demo
          </motion.button>
        </div>
      </motion.div>

      {/* Mockup Graphic */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="w-full max-w-4xl mt-20 relative z-10"
      >
        <div className="w-full h-[400px] liquid-glass rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
            
            <div className="flex items-center gap-8 z-10 w-full max-w-2xl">
              {/* Video File Mock */}
              <div className="flex-1 bg-[#0d0d0d] border border-white/10 rounded-xl aspect-[4/3] flex flex-col items-center justify-center gap-3">
                <Play className="text-white/40" size={40} />
                <span className="text-sm text-white/40 font-mono">workflow.mp4</span>
              </div>

              {/* Arrow */}
              <motion.div 
                animate={{ x: [0, 10, 0] }} 
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <ArrowRight size={32} className="text-accent" />
              </motion.div>

              {/* Document Mock */}
              <div className="flex-1 bg-white border border-white/20 rounded-xl aspect-[3/4] p-4 flex flex-col gap-3 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                <div className="w-3/4 h-4 bg-black/10 rounded" />
                <div className="w-1/2 h-3 bg-black/5 rounded mb-4" />
                {[1,2,3].map(i => (
                  <div key={i} className="flex gap-2">
                    <div className="w-4 h-4 rounded bg-black/10 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="w-full h-2 bg-black/5 rounded" />
                      <div className="w-4/5 h-2 bg-black/5 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </motion.div>
    </section>
  );
}
