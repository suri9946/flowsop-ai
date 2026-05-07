"use client";
import { motion } from 'framer-motion';
import { Upload, Camera, FileSearch, BrainCircuit, PenTool, CheckCircle } from 'lucide-react';
import clsx from 'clsx';

const stages = [
  { label: "Uploading video", icon: Upload },
  { label: "Extracting screenshots", icon: Camera },
  { label: "Reading text (OCR)", icon: FileSearch },
  { label: "Understanding workflow", icon: BrainCircuit },
  { label: "Generating SOP", icon: PenTool },
  { label: "Finalizing output", icon: CheckCircle }
];

export default function ProcessingStages({ currentStage }: { currentStage: number }) {
  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {stages.map((stage, idx) => {
        const isActive = idx === currentStage - 1;
        const isDone = idx < currentStage - 1;
        const isPending = idx > currentStage - 1;

        return (
          <div key={idx} className="flex items-center gap-4">
            <div className="relative">
              {idx !== stages.length - 1 && (
                <div className={clsx(
                  "absolute top-10 left-1/2 -translate-x-1/2 w-px h-6 transition-colors",
                  isDone ? "bg-accent" : "bg-white/10"
                )} />
              )}
              
              <div className={clsx(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
                isDone ? "bg-accent/20 text-accent" : isActive ? "bg-white/10 text-white animate-pulse" : "bg-white/5 text-white/20"
              )}>
                {isDone ? <CheckCircle size={18} /> : <stage.icon size={18} />}
              </div>
            </div>
            
            <div className={clsx(
              "flex-1 font-medium transition-colors",
              isDone ? "text-white/80" : isActive ? "text-white" : "text-white/30"
            )}>
              {stage.label}
              {isActive && (
                <motion.span 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="ml-1"
                >...</motion.span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
