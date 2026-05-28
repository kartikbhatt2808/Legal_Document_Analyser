import React, { useCallback } from 'react';
import { UploadCloud, FileText, CheckCircle } from 'lucide-react';

export default function UploadZone({ onUpload, isUploading }) {
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onUpload(files[0]);
    }
  }, [onUpload]);

  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`relative w-full border-2 border-dashed rounded-3xl p-12 transition-all duration-300 flex flex-col items-center justify-center text-center
        ${isUploading 
          ? 'border-brand-500 bg-brand-500/5' 
          : 'border-dark-700 hover:border-brand-400 bg-dark-800/30 hover:bg-dark-800/50'}`}
    >
      {isUploading ? (
        <div className="flex flex-col items-center animate-pulse">
            <div className="w-20 h-20 rounded-full bg-brand-500/20 flex items-center justify-center mb-6">
                <UploadCloud className="w-10 h-10 text-brand-500 animate-bounce" />
            </div>
            <h3 className="text-xl font-medium text-slate-200 mb-2">Analyzing Document...</h3>
            <p className="text-slate-400 max-w-sm">Running AI legal checks, translating if needed, and generating insights.</p>
        </div>
      ) : (
        <>
            <div className="w-24 h-24 rounded-full bg-dark-700 flex items-center justify-center mb-6 shadow-inner relative group">
                <div className="absolute inset-0 rounded-full bg-brand-500 blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                <FileText className="w-10 h-10 text-brand-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Upload Legal Agreement</h3>
            <p className="text-slate-400 mb-8 max-w-md">Drag and drop your PDF, DOCX, or scanned image here. We support English, Hindi, and regional languages.</p>
            
            <label className="btn-primary cursor-pointer inline-flex items-center gap-2">
                <UploadCloud className="w-5 h-5" />
                Browse Files
                <input type="file" className="hidden" accept=".pdf,.txt,.docx,image/*" onChange={handleChange} />
            </label>
        </>
      )}
    </div>
  );
}
