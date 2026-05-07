"use client";
import { useState } from 'react';
import { api } from '@/lib/api';
import { FileDown, Loader2 } from 'lucide-react';

export default function ExportButton({ sopId }: { sopId: string }) {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      await api.exportPdf(sopId);
    } catch (error) {
      console.error(error);
      alert('Failed to export PDF');
    } finally {
      setExporting(false);
    }
  };

  return (
    <button 
      onClick={handleExport}
      disabled={exporting}
      className="w-full py-2.5 rounded-xl bg-white text-black text-sm font-medium hover:bg-white/90 transition flex justify-center items-center gap-2 disabled:opacity-50"
    >
      {exporting ? <Loader2 size={16} className="animate-spin" /> : <FileDown size={16} />}
      {exporting ? 'Generating PDF...' : 'Export PDF'}
    </button>
  );
}
