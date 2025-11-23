import React, { useState, useEffect } from 'react';
import { PlanetData } from '../types';
import { getPlanetFact } from '../services/geminiService';

interface InfoPanelProps {
  planet: PlanetData | null;
  onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ planet, onClose }) => {
  const [aiFact, setAiFact] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Reset fact when planet changes
  useEffect(() => {
    setAiFact("");
  }, [planet]);

  const handleAskAI = async () => {
    if (!planet) return;
    setLoading(true);
    const fact = await getPlanetFact(planet.name);
    setAiFact(fact);
    setLoading(false);
  };

  if (!planet) return null;

  return (
    <div className="fixed top-4 right-4 z-50 w-80 sm:w-96 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl text-white overflow-hidden transition-all duration-300 transform translate-x-0 animate-fade-in-right">
      <div className="relative h-32 bg-gradient-to-br from-slate-800 to-black p-4 flex items-center justify-between overflow-hidden">
         {/* Decorative circle in header */}
         <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-20 ${planet.color}`} />
         
        <h2 className="text-3xl font-bold z-10">{planet.name}</h2>
        <button 
            onClick={onClose}
            className="z-10 bg-black/30 hover:bg-black/50 rounded-full p-2 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-6 space-y-6">
        <p className="text-gray-300 leading-relaxed text-sm">
          {planet.description}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
            <span className="block text-slate-400 text-xs uppercase tracking-wider">Type</span>
            <span className="font-semibold text-cyan-400">{planet.details.type}</span>
          </div>
          <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
            <span className="block text-slate-400 text-xs uppercase tracking-wider">Moons</span>
            <span className="font-semibold text-cyan-400">{planet.details.moons}</span>
          </div>
          <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
            <span className="block text-slate-400 text-xs uppercase tracking-wider">Avg Temp</span>
            <span className="font-semibold text-orange-400">{planet.details.temp}</span>
          </div>
          <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
            <span className="block text-slate-400 text-xs uppercase tracking-wider">Day Length</span>
            <span className="font-semibold text-purple-400">{planet.details.day}</span>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-4">
          <button 
            onClick={handleAskAI}
            disabled={loading}
            className="w-full group relative flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-2.5 px-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-indigo-500/25"
          >
             {loading ? (
                 <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
             ) : (
                <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Gemini AI: 告诉我更多</span>
                </>
             )}
          </button>
          
          {aiFact && (
            <div className="mt-4 p-4 bg-indigo-900/30 border border-indigo-500/30 rounded-xl animate-fade-in-up">
              <div className="flex gap-2 mb-2">
                <span className="text-xs font-bold text-indigo-400 px-2 py-0.5 rounded bg-indigo-950">AI FACT</span>
              </div>
              <p className="text-gray-200 text-sm leading-relaxed">{aiFact}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
