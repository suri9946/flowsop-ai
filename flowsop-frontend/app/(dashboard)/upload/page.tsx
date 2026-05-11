"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UploadZone from '@/components/UploadZone';
import ProcessingStages from '@/components/ProcessingStages';
import { api } from '@/lib/api';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [sops, setSops] = useState<any[]>([]);
  const [selectedParentId, setSelectedParentId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    api.getSops().then(setSops).catch(console.error);
  }, []);


  const handleUpload = async () => {
    if (!file) return;
    setIsProcessing(true);
    setCurrentStage(1); // Uploading

    try {
      // In a real app, you'd use SSE or websockets to track true progress.
      // We simulate stages here while waiting for the API.
      const stageInterval = setInterval(() => {
        setCurrentStage(prev => (prev < 5 ? prev + 1 : prev));
      }, 3000);

      const result = await api.uploadVideo(file, selectedParentId || undefined);

      clearInterval(stageInterval);
      setCurrentStage(6); // Finalizing
      
      setTimeout(() => {
        router.push(`/sop/${result.id}`);
      }, 1000);
      
    } catch (error: any) {
      console.error(error);
      if (error.message.includes('Insufficient credits')) {
        alert("You've used all your free generations. Please upgrade to Pro to continue.");
        router.push('/settings'); // Assuming pricing/pro upgrade is in settings or there's a billing link
      } else {
        alert(error.message || "Failed to process video");
      }
      setIsProcessing(false);
      setCurrentStage(0);
    }

  };

  return (
    <div className="max-w-3xl mx-auto py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-medium tracking-tight mb-2">Upload Recording</h1>
        <p className="text-white/50 text-sm">Drop your video file to magically generate documentation.</p>
      </div>

      {!isProcessing ? (
        <div className="space-y-6">
          <UploadZone onFileSelect={setFile} file={file} onRemove={() => setFile(null)} />
          
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-3">
            <label className="text-xs font-medium text-white/40 uppercase tracking-wider">Updating an existing SOP? Select it</label>
            <select 
              value={selectedParentId}
              onChange={(e) => setSelectedParentId(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/80 focus:outline-none focus:ring-1 focus:ring-white/20 appearance-none"
            >
              <option value="">Start from scratch (v1)</option>
              {sops.map(sop => (
                <option key={sop.id} value={sop.id}>{sop.title} (v{sop.version || 1})</option>
              ))}
            </select>
          </div>

          {file && (

            <div className="flex justify-center">
              <button 
                onClick={handleUpload}
                className="px-8 py-3 rounded-full bg-white text-black font-medium text-sm hover:scale-105 transition-transform"
              >
                Generate SOP
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="p-8 rounded-3xl bg-[#0d0d0d] border border-white/10">
          <ProcessingStages currentStage={currentStage} />
        </div>
      )}
    </div>
  );
}
