"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import clsx from 'clsx';

export default function ChecklistView({ checklist }: { checklist: string[] }) {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const toggleItem = (idx: number) => {
    const newSet = new Set(checkedItems);
    if (newSet.has(idx)) newSet.delete(idx);
    else newSet.add(idx);
    setCheckedItems(newSet);
  };

  const progress = Math.round((checkedItems.size / (checklist?.length || 1)) * 100);

  return (
    <div className="max-w-3xl">
      <div className="mb-8 p-6 rounded-2xl liquid-glass border border-white/10">
        <div className="flex justify-between items-end mb-2">
          <h3 className="font-medium text-white/80">Completion</h3>
          <span className="text-2xl font-serif text-accent">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {checklist?.map((item, idx) => {
          const isChecked = checkedItems.has(idx);
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => toggleItem(idx)}
              className={clsx(
                "p-4 rounded-xl border flex items-center gap-4 cursor-pointer transition-all",
                isChecked ? "bg-accent/10 border-accent/30 text-white/50" : "bg-[#0d0d0d] border-white/10 text-white/90 hover:border-white/30"
              )}
            >
              <div className={clsx(
                "w-6 h-6 rounded-md flex items-center justify-center border transition-colors flex-shrink-0",
                isChecked ? "bg-accent border-accent text-black" : "border-white/30 text-transparent"
              )}>
                <Check size={14} />
              </div>
              <span className={clsx("flex-1 text-sm md:text-base", isChecked && "line-through")}>
                {item}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
