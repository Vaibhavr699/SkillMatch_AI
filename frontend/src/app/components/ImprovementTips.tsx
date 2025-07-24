"use client";
import { Lightbulb, TrendingUp, Zap } from 'lucide-react';
import { useState } from 'react';

export default function ImprovementTips({ tips }: { tips: (string | { text: string, impact?: string })[] }) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!tips || tips.length === 0) return null;

  const highImpactTips = tips.filter(tip => typeof tip === 'object' && tip.impact === 'High Impact');
  const regularTips = tips.filter(tip => typeof tip === 'string' || (typeof tip === 'object' && tip.impact !== 'High Impact'));

  return (
    <div className="mt-6 w-full max-w-4xl mx-auto">
      {/* Header */}
      <div 
        className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-t-xl p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:shadow-lg"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Lightbulb className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg sm:text-xl">Improvement Tips</h3>
              <p className="text-white/80 text-sm hidden sm:block">
                {tips.length} suggestion{tips.length !== 1 ? 's' : ''} to enhance your performance
              </p>
            </div>
          </div>
          <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`bg-white rounded-b-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-4 sm:p-6 space-y-6 max-h-80 overflow-y-auto custom-scrollbar">
          
          {/* High Impact Tips */}
          {highImpactTips.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-red-600 font-semibold text-sm uppercase tracking-wide">
                <Zap className="w-4 h-4" />
                High Impact Actions
              </div>
              <div className="space-y-3">
                {highImpactTips.map((tip, idx) => {
                  const tipObj = tip as { text: string, impact?: string };
                  return (
                    <div 
                      key={`high-${idx}`}
                      className="group bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                        <div className="flex-1">
                          <p className="text-gray-800 font-medium leading-relaxed">{tipObj.text}</p>
                          <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                            <TrendingUp className="w-3 h-3" />
                            {tipObj.impact}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Regular Tips */}
          {regularTips.length > 0 && (
            <div className="space-y-3">
              {highImpactTips.length > 0 && <div className="border-t border-gray-200"></div>}
              <div className="flex items-center gap-2 text-amber-600 font-semibold text-sm uppercase tracking-wide">
                <Lightbulb className="w-4 h-4" />
                Additional Suggestions
              </div>
              <div className="space-y-3">
                {regularTips.map((tip, idx) => {
                  const tipText = typeof tip === 'string' ? tip : tip.text;
                  const impact = typeof tip === 'object' ? tip.impact : undefined;
                  
                  return (
                    <div 
                      key={`regular-${idx}`}
                      className="group bg-amber-50 border border-amber-200 rounded-lg p-4 hover:shadow-md hover:bg-amber-100 transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                        <div className="flex-1">
                          <p className="text-gray-800 leading-relaxed">{tipText}</p>
                          {impact && impact !== 'High Impact' && (
                            <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
                              {impact}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}