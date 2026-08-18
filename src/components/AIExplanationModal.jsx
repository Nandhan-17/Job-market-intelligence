import React from 'react';
import { X, Sparkles, TrendingUp, IndianRupee, Briefcase, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import { generateAIExplanation } from '../services/aiEngine';

export default function AIExplanationModal({ skillName, targetRoleTitle, onClose, onAddToRoadmap }) {
  if (!skillName) return null;

  const explanation = generateAIExplanation(skillName, targetRoleTitle);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white border border-[#4285F4]/30 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-white via-blue-50/50 to-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#4285F4]">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-mono text-[#4285F4] uppercase font-bold tracking-widest">AI Intelligence Insight</div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                Why should you learn <span className="text-[#4285F4]">{explanation.skillName}</span>?
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700">
          {/* Overview Banner */}
          <div className="p-4 rounded-xl bg-blue-50/60 border border-[#4285F4]/20 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#4285F4] shrink-0 mt-0.5" />
            <p className="text-sm leading-relaxed text-slate-800 font-medium">{explanation.overview}</p>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <TrendingUp className="w-4 h-4 text-[#34A853] mx-auto mb-1" />
              <div className="text-xs text-slate-500 font-mono font-semibold">Demand Growth</div>
              <div className="text-lg font-bold text-[#34A853]">{explanation.demandGrowth}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <IndianRupee className="w-4 h-4 text-[#4285F4] mx-auto mb-1" />
              <div className="text-xs text-slate-500 font-mono font-semibold">Salary Impact</div>
              <div className="text-lg font-bold text-[#4285F4]">+{explanation.estimatedSalaryBump}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <Briefcase className="w-4 h-4 text-[#FBBC05] mx-auto mb-1" />
              <div className="text-xs text-slate-500 font-mono font-semibold">Openings (India)</div>
              <div className="text-lg font-bold text-slate-900">{explanation.jobOpeningsCount}</div>
            </div>
          </div>

          {/* Key Reasons */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#4285F4]" />
              Market Impact Breakdown
            </h4>
            <div className="space-y-2">
              {explanation.whyCrucial.map((reason, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4] shrink-0 mt-2"></span>
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Projects */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#34A853]" />
              Recommended Portfolio Projects
            </h4>
            <div className="space-y-2">
              {explanation.recommendedProjects.map((proj, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-emerald-50 border border-[#34A853]/30 text-sm text-slate-800 font-medium flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-[#34A853] shrink-0" />
                  <span>{proj}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm text-slate-600 hover:text-slate-900 transition-colors cursor-pointer font-semibold"
          >
            Close
          </button>
          <button
            onClick={() => {
              if (onAddToRoadmap) onAddToRoadmap(skillName);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-[#4285F4] hover:bg-blue-600 text-white font-bold text-sm shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            Add to Learning Roadmap
          </button>
        </div>
      </div>
    </div>
  );
}
