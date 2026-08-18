import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, TrendingUp, Cpu, Award, Target, FileText, CheckCircle2 } from 'lucide-react';
import { TARGET_ROLES } from '../../data/mockMarketData';

export default function WelcomeScreen({ onStart, userProfile, setUserProfile }) {
  const [selectedRole, setSelectedRole] = useState(userProfile.targetRoleId || "fullstack-eng");

  const handleContinue = () => {
    setUserProfile(prev => ({
      ...prev,
      targetRoleId: selectedRole
    }));
    onStart("role-selection");
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto py-4">
      {/* Hero Header */}
      <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-[#0c1a29] to-slate-900 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wider">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            AI-POWERED CAREER INTELLIGENCE & SKILL FORECASTING
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-tight">
            Stop Guessing. <br />
            Know <span className="gradient-text-cyan-indigo">Which Skills Companies Want Next.</span>
          </h1>

          <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
            SkillPulse continuously analyzes over 250,000+ real-time job postings to reveal your skill gaps, predict target salaries, and generate personalized learning roadmaps.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-2xl font-bold text-cyan-400 font-mono">250K+</div>
              <div className="text-xs text-slate-400">Job Postings Scanned</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-2xl font-bold text-emerald-400 font-mono">300+</div>
              <div className="text-xs text-slate-400">Skills Tracked</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-2xl font-bold text-indigo-400 font-mono">94.2%</div>
              <div className="text-xs text-slate-400">Match Accuracy</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="text-2xl font-bold text-amber-400 font-mono">+$18.5k</div>
              <div className="text-xs text-slate-400">Avg Salary Lift</div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={handleContinue}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-lg shadow-xl shadow-cyan-500/25 flex items-center gap-3 transition-all transform hover:-translate-y-0.5"
            >
              Analyze My Career Fit <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onStart("dashboard")}
              className="px-6 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-medium text-base transition-colors flex items-center gap-2"
            >
              Explore Live Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Cpu className="w-6 h-6 text-cyan-400" />
          Complete AI Intelligence Suite
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl glass-panel glass-panel-hover space-y-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Automatic Skill Extraction</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Upload your resume or paste a job description. Our NLP engine parses technologies, tools, and experience levels with instant confidence ratings.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel glass-panel-hover space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Skill Demand Forecasting</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Stay ahead of market shifts. Track which skills are exploding (+140% growth) versus legacy technologies losing market demand.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel glass-panel-hover space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Skill-Gap & Salary Intelligence</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Get an exact Fit Score for your dream job. See how adding key missing skills directly increases your predicted salary trajectory.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
