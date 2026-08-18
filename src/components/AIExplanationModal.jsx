import React from 'react';
import { X, Sparkles, TrendingUp, DollarSign, Briefcase, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import { generateAIExplanation } from '../services/aiEngine';

export default function AIExplanationModal({ skillName, targetRoleTitle, onClose, onAddToRoadmap }) {
  if (!skillName) return null;

  const explanation = generateAIExplanation(skillName, targetRoleTitle);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0f172a] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/50 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-[#122131] to-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">AI Intelligence Insight</div>
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                Why should you learn <span className="text-cyan-400">{explanation.skillName}</span>?
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-300">
          {/* Overview Banner */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <p className="text-sm leading-relaxed text-slate-200">{explanation.overview}</p>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <TrendingUp className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <div className="text-xs text-slate-400 font-mono">Demand Growth</div>
              <div className="text-lg font-bold text-emerald-400">{explanation.demandGrowth}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <DollarSign className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
              <div className="text-xs text-slate-400 font-mono">Avg Salary Impact</div>
              <div className="text-lg font-bold text-cyan-400">+{explanation.estimatedSalaryBump}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <Briefcase className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
              <div className="text-xs text-slate-400 font-mono">Active Job Openings</div>
              <div className="text-lg font-bold text-indigo-400">{explanation.jobOpeningsCount}</div>
            </div>
          </div>

          {/* Key Reasons */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              Market Impact Breakdown
            </h4>
            <div className="space-y-2">
              {explanation.whyCrucial.map((reason, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/80 flex items-start gap-2.5 text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2"></span>
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Projects */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              Recommended Portfolio Projects
            </h4>
            <div className="space-y-2">
              {explanation.recommendedProjects.map((proj, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-sm text-slate-200 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{proj}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-white transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              if (onAddToRoadmap) onAddToRoadmap(skillName);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-medium text-sm shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Add to Learning Roadmap
          </button>
        </div>
      </div>
    </div>
  );
}
