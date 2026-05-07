"use client";
import { motion } from 'framer-motion';

export default function StepCard({ step, imageUrl }: { step: any, imageUrl?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 rounded-3xl bg-[#0d0d0d] border border-white/10 flex flex-col md:flex-row gap-8"
    >
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm font-serif">
            {step.stepNumber}
          </div>
          <h3 className="text-lg font-medium text-white/90">Step {step.stepNumber}</h3>
        </div>
        <p className="text-white/70 leading-relaxed">{step.instruction}</p>
      </div>

      {imageUrl && (
        <div className="md:w-1/2 flex-shrink-0">
          <div className="rounded-xl overflow-hidden border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <img src={imageUrl} alt={`Step ${step.stepNumber} screenshot`} className="w-full h-auto object-cover" />
          </div>
        </div>
      )}
    </motion.div>
  );
}
