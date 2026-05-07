"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import StepCard from '@/components/StepCard';
import ChecklistView from '@/components/ChecklistView';
import ExportButton from '@/components/ExportButton';
import { Clock, LayoutList, CheckSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SopResultPage() {
  const { id } = useParams();
  const [sop, setSop] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'steps' | 'checklist'>('steps');

  useEffect(() => {
    if (id) {
      api.getSop(id as string)
        .then(data => {
          // Parse JSON if needed
          if (typeof data.steps === 'string') data.steps = JSON.parse(data.steps);
          if (typeof data.checklist === 'string') data.checklist = JSON.parse(data.checklist);
          if (typeof data.tags === 'string') data.tags = JSON.parse(data.tags);
          if (typeof data.screenshot_urls === 'string') data.screenshot_urls = JSON.parse(data.screenshot_urls);
          setSop(data);
          setLoading(false);
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
    </div>
  );
}
