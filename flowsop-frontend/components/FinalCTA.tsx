"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="py-32 px-6 border-t border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/20 rounded-full blur-[120px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-5xl md:text-7xl font-medium tracking-tight mb-8">
          Start <span className="font-serif italic pr-2">documenting</span> in minutes
        </h2>
        <p className="text-xl text-white/50 mb-10">Join thousands of teams streamlining their operations.</p>
        
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 focus:outline-none focus:border-white/40 transition placeholder:text-white/30 text-sm"
          />
          <Link href="/signup">
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-medium hover:scale-[1.03] transition-transform text-sm">
              Get Started Free
            </button>
          </Link>
        </form>
      </motion.div>
    </section>
  );
}
