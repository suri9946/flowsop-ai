"use client";
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import SopCard from '@/components/SopCard';
import Link from 'next/link';
import { UploadCloud, FileText, Settings2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [sops, setSops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getSops()
      .then(data => {
        setSops(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const stats = [
    { label: "Total SOPs", value: sops.length, icon: FileText },
    { label: "Hours Saved", value: Math.round(sops.length * 1.5), icon: Zap },
    { label: "Generations Left", value: Math.max(0, 3 - sops.length), icon: Settings2 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-medium tracking-tight mb-2">Welcome back</h1>
        <p className="text-white/50 text-sm">Here's what's happening with your documentation.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={idx} 
            className="p-6 rounded-2xl liquid-glass border border-white/10 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
              <stat.icon size={20} className="text-white/80" />
            </div>
            <div>
              <p className="text-white/50 text-sm">{stat.label}</p>
              <p className="text-2xl font-medium">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Upload CTA */}
      <Link href="/upload" className="block group">
        <div className="w-full border-2 border-dashed border-white/20 rounded-3xl p-12 flex flex-col items-center justify-center text-center hover:border-accent/50 hover:bg-accent/5 transition cursor-pointer">
          <div className="w-16 h-16 rounded-full liquid-glass flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <UploadCloud size={24} className="text-white/80" />
          </div>
          <h3 className="text-xl font-medium mb-2">Create New SOP</h3>
          <p className="text-white/50 text-sm">Drag and drop your screen recording here to start.</p>
        </div>
      </Link>

      {/* Recent SOPs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium tracking-tight">Recent SOPs</h2>
          <Link href="/sops" className="text-sm text-white/50 hover:text-white transition">View all →</Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
            {[1, 2, 3].map(i => <div key={i} className="h-48 bg-white/5 rounded-2xl" />)}
          </div>
        ) : sops.length === 0 ? (
          <div className="text-center py-12 border border-white/10 rounded-2xl bg-[#0d0d0d]">
            <p className="text-white/50 text-sm">No SOPs generated yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sops.slice(0, 3).map((sop, idx) => (
              <SopCard key={sop.id} sop={sop} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
