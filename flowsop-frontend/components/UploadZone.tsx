"use client";
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileVideo, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  file: File | null;
  onRemove: () => void;
}

export default function UploadZone({ onFileSelect, file, onRemove }: UploadZoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4'],
      'video/quicktime': ['.mov']
    },
    maxFiles: 1,
    maxSize: 500 * 1024 * 1024 // 500MB
  });

  if (file) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full p-6 rounded-2xl border border-white/20 bg-white/5 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/20 text-accent flex items-center justify-center">
            <FileVideo size={24} />
          </div>
          <div>
            <p className="font-medium text-sm text-white truncate max-w-xs">{file.name}</p>
            <p className="text-xs text-white/50">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
          </div>
        </div>
        <button 
          onClick={onRemove}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
        >
          <X size={16} className="text-white/80" />
        </button>
      </motion.div>
    );
  }

  return (
    <div 
      {...getRootProps()} 
      className={`w-full border-2 border-dashed rounded-3xl p-16 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
        isDragActive ? 'border-accent bg-accent/5' : 'border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10'
      }`}
    >
      <input {...getInputProps()} />
      <div className="w-20 h-20 rounded-full liquid-glass flex items-center justify-center mb-6">
        <UploadCloud size={32} className={isDragActive ? 'text-accent' : 'text-white/60'} />
      </div>
      <p className="text-lg font-medium mb-2">Drag and drop your video</p>
      <p className="text-white/40 text-sm max-w-sm">
        Supports MP4, MOV up to 500MB. Make sure the recording clearly shows the entire workflow.
      </p>
    </div>
  );
}
