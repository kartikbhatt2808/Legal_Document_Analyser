import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Scale, Building2, ShieldCheck, ChevronRight } from 'lucide-react';
import Analyzer from './pages/Analyzer';
import PropertyVerification from './pages/PropertyVerification';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="border-b border-dark-700 bg-dark-900/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-lg shadow-brand-500/30">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                AI Legal Analyzer
              </h1>
              <p className="text-xs text-brand-500 mt-0.5 tracking-wider font-medium">SMART DOCUMENT REVIEW</p>
            </div>
          </div>
          <div className="flex space-x-1 border border-dark-700 p-1 rounded-xl bg-dark-800/50">
            <Link
              to="/"
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                location.pathname === '/' 
                  ? 'bg-dark-700 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-dark-700/50'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Agreement Analyzer
            </Link>
            <Link
              to="/property"
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                location.pathname === '/property' 
                  ? 'bg-dark-700 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-dark-700/50'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Property Verification
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 w-full relative">
          <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-brand-900/20 to-transparent -z-10 pointer-events-none" />
          <Routes>
            <Route path="/" element={<Analyzer />} />
            <Route path="/property" element={<PropertyVerification />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
