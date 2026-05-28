import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import {
  FileWarning,
  ShieldAlert,
  Sparkles,
  AlertTriangle,
  FileCheck,
  Info,
  FileText
} from 'lucide-react';

import axios from 'axios';
import UploadZone from '../components/UploadZone';

export default function Analyzer() {

  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // =========================
  // FILE UPLOAD HANDLER
  // =========================
  const handleUpload = async (file) => {

    setIsUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {

      const response = await axios.post(
        'http://127.0.0.1:8001/api/analyze/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log("API RESPONSE:", response.data);

      setResult(response.data);

    } catch (err) {

      console.error(err);

      if (err.response) {
        console.log("BACKEND ERROR:", err.response.data);
      }

      setError('Failed to analyze the document. Please try again.');

    } finally {

      setIsUploading(false);

    }
  };

  // =========================
  // SEVERITY COLORS
  // =========================
  const getSeverityColor = (severity) => {

    if (!severity) {
      return 'text-slate-400 border-slate-700 bg-slate-800';
    }

    switch (severity.toLowerCase()) {

      case 'high':
        return 'text-rose-500 border-rose-500/30 bg-rose-500/10';

      case 'medium':
        return 'text-amber-500 border-amber-500/30 bg-amber-500/10';

      case 'low':
        return 'text-blue-500 border-blue-500/30 bg-blue-500/10';

      default:
        return 'text-slate-400 border-slate-700 bg-slate-800';
    }
  };

  // =========================
  // UI
  // =========================
  return (

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6">

          <div className="glass-panel p-8">

            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">

              <Sparkles className="w-5 h-5 text-brand-400" />

              AI Document Analysis

            </h2>

            <UploadZone
              onUpload={handleUpload}
              isUploading={isUploading}
            />

            {/* ERROR */}
            {error && (

              <div className="mt-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-start gap-3">

                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />

                <p className="text-sm">{error}</p>

              </div>
            )}

            {/* FILE INFO */}
            {result && (

              <div className="mt-8 flex items-center justify-between p-4 rounded-xl bg-dark-700/50 border border-dark-600">

                <div className="flex items-center gap-3">

                  <FileCheck className="w-5 h-5 text-emerald-400" />

                  <div>

                    <p className="text-sm font-medium text-white">

                      {result.filename || "Uploaded Document"}

                    </p>

                    <p className="text-xs text-slate-400">

                      Language:
                      {" "}
                      {result.language_detected?.toUpperCase() || "EN"}

                    </p>

                  </div>

                </div>

                <button
                  onClick={() => setResult(null)}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Clear
                </button>

              </div>
            )}

          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-12 xl:col-span-7">

          <AnimatePresence mode="wait">

            {/* EMPTY STATE */}
            {!result && !isUploading && (

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex items-center justify-center border-2 border-dashed border-dark-700 rounded-3xl p-12 opacity-50"
              >

                <div className="text-center text-slate-500">

                  <Info className="w-12 h-12 mx-auto mb-4 opacity-50" />

                  <p>
                    Upload a document to see the AI analysis results here.
                  </p>

                </div>

              </motion.div>
            )}

            {/* RESULT SECTION */}
            {result && (

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-6"
              >

                {/* SUMMARY CARD */}
                <div className="glass-panel p-8 relative overflow-hidden">

                  <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">

                    <FileText className="w-32 h-32" />

                  </div>

                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">

                    <FileText className="w-5 h-5 text-brand-400" />

                    Executive Summary

                  </h3>

                  <p className="text-slate-300 leading-relaxed z-10 relative">

                    {result.summary || "No summary generated."}

                  </p>

                </div>

                {/* RISKS */}
                <div className="glass-panel p-8">

                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">

                    <ShieldAlert className="w-5 h-5 text-rose-400" />

                    Detected Risks & Clauses

                  </h3>

                  <div className="space-y-4">

                    {result.risks?.length > 0 ? (

                      result.risks.map((risk, index) => (

                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-5 rounded-xl bg-dark-900 border border-dark-700 hover:border-dark-600 transition-colors"
                        >

                          <div className="flex justify-between items-start mb-3">

                            <span
                              className={`px-2.5 py-1 rounded-md text-xs font-bold border uppercase tracking-wider ${getSeverityColor(risk.severity)}`}
                            >

                              {risk.severity || "Medium"} Risk

                            </span>

                          </div>

                          <p className="font-serif italic text-slate-300 border-l-2 border-slate-600 pl-4 mb-4">

                            "{risk.clause || "Clause not available"}"

                          </p>

                          <div className="flex gap-2 text-sm text-slate-400 items-start">

                            <FileWarning className="w-4 h-4 flex-shrink-0 mt-0.5 text-brand-400" />

                            <p>

                              {risk.explanation || "No explanation available."}

                            </p>

                          </div>

                        </motion.div>

                      ))

                    ) : (

                      <div className="p-5 rounded-xl bg-dark-900 border border-dark-700">

                        <p className="text-slate-400">

                          No risks detected.

                        </p>

                      </div>

                    )}

                  </div>

                </div>

                {/* WARNINGS */}
                {result.warnings?.length > 0 && (

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {result.warnings.map((warning, i) => (

                      <div
                        key={i}
                        className="glass-panel p-5 flex items-start gap-3 border-amber-500/20 bg-amber-500/5"
                      >

                        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />

                        <p className="text-sm text-amber-200/80">

                          {warning}

                        </p>

                      </div>

                    ))}

                  </div>
                )}

              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}