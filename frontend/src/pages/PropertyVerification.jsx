import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Search, CheckCircle2, XCircle, Loader2, MapPin, User, FileSignature } from 'lucide-react';
import axios from 'axios';

export default function PropertyVerification() {
  const [formData, setFormData] = useState({ property_id: '', seller_name: '' });
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!formData.property_id || !formData.seller_name) {
      setError('Please fill in both fields.');
      return;
    }
    
    setIsVerifying(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post('http://localhost:8001/api/verify-property', formData);
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to reach validation server.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="glass-panel p-8 md:p-12 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2" />

        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-dark-700 flex items-center justify-center mb-6 shadow-xl relative inline-flex">
            <Building2 className="w-8 h-8 text-brand-400" />
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-dark-900">
              <CheckCircle2 className="w-3 h-3 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">
            Verify Property Ownership
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Cross-check the seller's details against official government records to prevent fraud and ensure you're dealing with the rightful owner.
          </p>
        </div>

        <form onSubmit={handleVerify} className="max-w-md mx-auto space-y-5 relative z-10">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Property ID / Registration No.</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FileSignature className="w-5 h-5 text-slate-500" />
              </div>
              <input
                type="text"
                placeholder="e.g. PROP12345"
                className="input-field pl-12"
                value={formData.property_id}
                onChange={(e) => setFormData({ ...formData, property_id: e.target.value })}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Seller's Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="w-5 h-5 text-slate-500" />
              </div>
              <input
                type="text"
                placeholder="e.g. Ramesh Kumar"
                className="input-field pl-12"
                value={formData.seller_name}
                onChange={(e) => setFormData({ ...formData, seller_name: e.target.value })}
              />
            </div>
          </div>

          {error && <p className="text-sm text-rose-500 mt-2 text-center">{error}</p>}

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full btn-primary flex items-center justify-center gap-2 mt-4 text-lg py-4"
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Querying Records...
              </>
            ) : (
              <>
                <Search className="w-6 h-6" />
                Verify Ownership
              </>
            )}
          </button>
        </form>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className={`mt-10 p-6 rounded-2xl border ${
                result.status === 'Verified' 
                  ? 'bg-emerald-500/10 border-emerald-500/30' 
                  : 'bg-rose-500/10 border-rose-500/30'
              }`}
            >
              <div className="flex items-start gap-4">
                {result.status === 'Verified' ? (
                  <CheckCircle2 className="w-8 h-8 flex-shrink-0 text-emerald-500 mt-1" />
                ) : (
                  <XCircle className="w-8 h-8 flex-shrink-0 text-rose-500 mt-1" />
                )}
                <div>
                  <h3 className={`text-xl font-bold mb-2 ${result.status === 'Verified' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {result.status}
                  </h3>
                  <p className="text-slate-300 mb-4">{result.message}</p>
                  
                  {result.official_owner && (
                    <div className="bg-dark-900/50 rounded-xl p-4 border border-dark-700 flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex-1">
                        <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Official Owner Name</p>
                        <p className="font-medium text-white">{result.official_owner}</p>
                      </div>
                      {result.location && (
                        <div className="flex-1 px-0 sm:px-4 sm:border-l border-dark-700">
                          <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Location</p>
                          <p className="font-medium text-white flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-brand-500" />
                            {result.location}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
