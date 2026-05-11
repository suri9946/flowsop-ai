"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import StepCard from '@/components/StepCard';
import ChecklistView from '@/components/ChecklistView';
import ExportButton from '@/components/ExportButton';
import { Clock, LayoutList, CheckSquare, History, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';


export default function SopResultPage() {
  const { id } = useParams();
  const [sop, setSop] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'steps' | 'checklist'>('steps');
  const [history, setHistory] = useState<any[]>([]);


  useEffect(() => {
    if (id) {

      api.getSop(id as string)
        .then(data => {
          if (typeof data.steps === 'string') data.steps = JSON.parse(data.steps);
          if (typeof data.checklist === 'string') data.checklist = JSON.parse(data.checklist);
          if (typeof data.tags === 'string') data.tags = JSON.parse(data.tags);
          if (typeof data.screenshot_urls === 'string') data.screenshot_urls = JSON.parse(data.screenshot_urls);
          if (typeof data.diff_result === 'string') data.diff_result = JSON.parse(data.diff_result);
          setSop(data);
          setLoading(false);
          
          // Fetch version history
          supabase.from('sops')
            .select('id, version, parent_sop_id, created_at, title')
            .eq('user_id', data.user_id)
            .order('version', { ascending: true })
            .then(({ data: allSops }) => {
              if (allSops) {
                // Simplified chain detection: items that share any connection in the chain
                // In a real app with deep trees, we'd find the root first.
                // For this, we'll just show all that have a relationship to the same "family"
                // but since we don't have root_id, we'll just show all for now or filter by those in the immediate path.
                setHistory(allSops.filter(s => s.title === data.title || s.parent_sop_id === data.id || data.parent_sop_id === s.id));
              }
            });
        })
        .catch(console.error);
    }
  }, [id]);


  if (loading) {
    return <div className="p-12 text-center animate-pulse text-white/50">Loading SOP...</div>;
  }

  if (!sop) {
    return <div className="p-12 text-center text-white/50">SOP not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto flex gap-8 items-start relative">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            {sop.tags?.map((tag: string) => (
              <span key={tag} className="px-2 py-1 bg-white/5 rounded-full text-xs text-white/60 font-medium tracking-wide border border-white/10">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">{sop.title}</h1>
          <p className="text-white/60 text-lg leading-relaxed">{sop.summary}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-white/10 mb-8 pb-2">
          <button 
            onClick={() => setActiveTab('steps')}
            className={`flex items-center gap-2 pb-2 px-2 transition-colors border-b-2 ${activeTab === 'steps' ? 'border-white text-white' : 'border-transparent text-white/50 hover:text-white/80'}`}
          >
            <LayoutList size={18} /> Steps View
          </button>
          <button 
            onClick={() => setActiveTab('checklist')}
            className={`flex items-center gap-2 pb-2 px-2 transition-colors border-b-2 ${activeTab === 'checklist' ? 'border-white text-white' : 'border-transparent text-white/50 hover:text-white/80'}`}
          >
            <CheckSquare size={18} /> Checklist Mode
          </button>
        </div>

        <div className="pb-20">
          {activeTab === 'steps' ? (
            <div className="space-y-6">
              {sop.steps?.map((step: any, idx: number) => (
                <StepCard 
                  key={idx} 
                  step={step} 
                  imageUrl={sop.screenshot_urls?.[step.screenshotIndex]} 
                  diff={sop.diff_result?.find((d: any) => d.stepNumber === step.stepNumber)}
                />

              ))}
            </div>
          ) : (
            <ChecklistView checklist={sop.checklist} />
          )}
        </div>
      </div>

      {/* Sidebar Panel */}
      <div className="w-72 flex-shrink-0 sticky top-8 hidden lg:block">
        <div className="p-6 rounded-3xl liquid-glass border border-white/10">
          <h3 className="font-medium mb-6">Actions</h3>
          <div className="space-y-3 mb-8">
            <ExportButton sopId={sop.id} />
            <button className="w-full py-2.5 rounded-xl border border-white/20 text-sm font-medium hover:bg-white/5 transition flex justify-center gap-2">
              Copy Link
            </button>
          </div>

          <h3 className="font-medium mb-4 text-sm text-white/50">Details</h3>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-white/40">Time</span>
              <span className="flex items-center gap-1.5"><Clock size={14} className="text-white/60" /> {sop.estimated_time || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Steps</span>
              <span>{sop.steps?.length || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Created</span>
              <span>{new Date(sop.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Version History Section at Bottom */}
      <div className="mt-20 pt-10 border-t border-white/5 w-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-white/5">
            <History size={20} className="text-white/60" />
          </div>
          <h2 className="text-xl font-medium">Version History</h2>
        </div>

        <div className="flex flex-wrap gap-4">
          {history.map((v, i) => (
            <Link 
              key={v.id} 
              href={`/sop/${v.id}`}
              className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${v.id === id ? 'bg-white/10 border-white/20' : 'bg-white/[0.02] border-white/5 hover:bg-white/5 hover:border-white/10'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${v.id === id ? 'bg-white text-black' : 'bg-white/10 text-white/40'}`}>
                v{v.version || 1}
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-white/90">Version {v.version || 1}</div>
                <div className="text-[10px] text-white/30">{new Date(v.created_at).toLocaleDateString()}</div>
              </div>
              {i < history.length - 1 && <ChevronRight size={14} className="text-white/20 ml-2" />}
            </Link>
          ))}
          {history.length === 0 && (
            <div className="text-sm text-white/20 italic">No previous versions found.</div>
          )}
        </div>
      </div>
    </div>

  );
}
