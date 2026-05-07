"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import UploadZone from '@/components/UploadZone';
import ProcessingStages from '@/components/ProcessingStages';
import { api } from '@/lib/api';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const router = useRouter();

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

      const result = await api.uploadVideo(file);
      clearInterval(stageInterval);
      setCurrentStage(6); // Finalizing
      
      setTimeout(() => {
        router.push(`/sop/${result.id}`);
      }, 1000);
      
    } catch (error) {
      console.error(error);
      alert("Failed to process video");
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
