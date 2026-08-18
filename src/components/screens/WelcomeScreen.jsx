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
      <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden border border-[#4285F4]/20 bg-gradient-to-br from-white via-blue-50/50 to-white shadow-sm">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 bg-[#4285F4]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-96 h-96 bg-[#34A853]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#4285F4] text-xs font-mono font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#4285F4]" />
            SOUTH INDIA AI CAREER INTELLIGENCE & SKILL FORECASTING
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-slate-900 leading-tight">
            Stop Guessing. <br />
            Know <span className="gradient-text-cyan-indigo">Which Skills South Indian Tech Hubs Want Next.</span>
          </h1>

          <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-normal">
            SkillPulse continuously analyzes real-time job postings across Bengaluru, Chennai, Hyderabad, and Kochi to reveal your skill gaps, predict target salaries in LPA, and generate personalized learning roadmaps.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-white/90 border border-slate-200 shadow-xs">
              <div className="text-2xl font-bold text-[#4285F4] font-mono">150K+</div>
              <div className="text-xs text-slate-500 font-medium">India Postings Scanned</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/90 border border-slate-200 shadow-xs">
              <div className="text-2xl font-bold text-[#34A853] font-mono">300+</div>
              <div className="text-xs text-slate-500 font-medium">Tech Skills Tracked</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/90 border border-slate-200 shadow-xs">
              <div className="text-2xl font-bold text-[#FBBC05] font-mono">94.2%</div>
              <div className="text-xs text-slate-500 font-medium">Match Accuracy</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/90 border border-slate-200 shadow-xs">
              <div className="text-2xl font-bold text-[#EA4335] font-mono">+₹2.8 LPA</div>
              <div className="text-xs text-slate-500 font-medium">Avg Salary Lift</div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={handleContinue}
              className="px-8 py-4 rounded-2xl bg-[#4285F4] hover:bg-blue-600 text-white font-bold text-lg shadow-md shadow-blue-500/20 flex items-center gap-3 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Analyze My Career Fit <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onStart("dashboard")}
              className="px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-base transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              Explore Live Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Cpu className="w-6 h-6 text-[#4285F4]" />
          Complete AI Intelligence Suite
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl glass-panel glass-panel-hover bg-white/80 border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#4285F4]/10 border border-[#4285F4]/20 flex items-center justify-center text-[#4285F4]">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Automatic Skill Extraction</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Upload your resume or paste a job description. Our NLP engine parses technologies, tools, and experience levels with instant confidence ratings.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel glass-panel-hover bg-white/80 border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#34A853]/10 border border-[#34A853]/20 flex items-center justify-center text-[#34A853]">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Skill Demand Forecasting</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Stay ahead of market shifts in South India. Track which skills are exploding (+140% growth) versus legacy technologies losing market demand.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel glass-panel-hover bg-white/80 border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#FBBC05]/10 border border-[#FBBC05]/20 flex items-center justify-center text-[#FBBC05]">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Skill-Gap & Salary Intelligence</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Get an exact Fit Score for your dream job. See how adding key missing skills directly increases your predicted salary trajectory in LPA.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
