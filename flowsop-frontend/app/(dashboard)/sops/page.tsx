"use client";
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import SopCard from '@/components/SopCard';

export default function SopsPage() {
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

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-medium tracking-tight mb-1">My SOPs</h1>
          <p className="text-white/50 text-sm">Manage all your generated documentation.</p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-48 bg-white/5 rounded-2xl" />)}
        </div>
      ) : sops.length === 0 ? (
        <div className="text-center py-20 border border-white/10 rounded-3xl bg-[#0d0d0d]">
          <p className="text-white/50 text-sm mb-4">No SOPs found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sops.map((sop, idx) => (
            <SopCard key={sop.id} sop={sop} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}
