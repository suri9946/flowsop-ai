"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ListChecks } from 'lucide-react';

interface SopCardProps {
  sop: any;
  index: number;
}

export default function SopCard({ sop, index }: SopCardProps) {
  const stepsCount = sop.steps ? (typeof sop.steps === 'string' ? JSON.parse(sop.steps).length : sop.steps.length) : 0;
  const isProcessing = sop.status === 'processing';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/sop/${sop.id}`}>
        <div className="p-6 rounded-2xl bg-[#0d0d0d] border border-white/10 hover:border-white/30 transition flex flex-col h-full cursor-pointer relative overflow-hidden group">
          {isProcessing && (
            <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
              <div className="h-full bg-accent animate-pulse w-1/2" />
            </div>
          )}

          <div className="flex items-start justify-between mb-4">
            <div className={`px-2 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider ${isProcessing ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'}`}>
              {sop.status}
            </div>
            <span className="text-xs text-white/40">
              {new Date(sop.created_at).toLocaleDateString()}
            </span>
          </div>

          <h3 className="text-lg font-medium mb-2 group-hover:text-accent transition-colors line-clamp-2">{sop.title}</h3>
          
          <div className="mt-auto pt-4 flex items-center gap-4 text-xs text-white/50">
            <div className="flex items-center gap-1.5">
              <ListChecks size={14} />
              {stepsCount} steps
            </div>
            {sop.estimated_time && (
              <div className="flex items-center gap-1.5">
                <Clock size={14} />
                {sop.estimated_time}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
