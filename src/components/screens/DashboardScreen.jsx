import React from 'react';
import { TrendingUp, Briefcase, IndianRupee, Award, Sparkles, ArrowRight, ShieldCheck, Cpu, Layers } from 'lucide-react';
import { TARGET_ROLES, ALL_SKILLS_DATABASE } from '../../data/mockMarketData';
import { calculateSkillGapScore } from '../../services/aiEngine';

export default function DashboardScreen({ userProfile, onNavigate, onOpenSkillModal }) {
  const gapData = calculateSkillGapScore(userProfile.currentSkills, userProfile.targetRoleId);
  const targetRole = TARGET_ROLES.find(r => r.id === userProfile.targetRoleId) || TARGET_ROLES[0];

  // Exploding skills
  const explodingSkills = ALL_SKILLS_DATABASE.filter(s => s.velocity === "Exploding").slice(0, 5);

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl glass-panel border-[#4285F4]/20 bg-gradient-to-br from-white via-blue-50/40 to-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4285F4]/10 border border-[#4285F4]/20 text-[#4285F4] text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#4285F4]" /> SOUTH INDIA MARKET PULSE
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display">Executive Job Market Intelligence</h2>
          <p className="text-slate-600 text-sm">
            Target Role: <span className="text-[#4285F4] font-bold">{targetRole.title}</span> • South India Demand Index: <span className="text-[#34A853] font-bold">{targetRole.demandIndex}/100</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate("gap-analysis")}
            className="px-5 py-3 rounded-xl bg-[#4285F4] hover:bg-blue-600 text-white font-bold text-sm shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" /> Run Full Skill-Gap Analysis
          </button>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl glass-panel space-y-2 border-slate-200/80 bg-white/70">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 font-semibold">Target Role Fit Score</span>
            <Award className="w-5 h-5 text-[#4285F4]" />
          </div>
          <div className="text-3xl font-extrabold text-[#4285F4] font-display">{gapData.totalScore}%</div>
          <div className="text-xs text-slate-500 flex items-center justify-between">
            <span>Readiness:</span>
            <span className="font-semibold text-slate-800">{gapData.readinessLevel}</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel space-y-2 border-slate-200/80 bg-white/70">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 font-semibold">Target Benchmark Salary</span>
            <IndianRupee className="w-5 h-5 text-[#34A853]" />
          </div>
          <div className="text-3xl font-extrabold text-[#34A853] font-display">{targetRole.avgSalary}</div>
          <div className="text-xs text-slate-500 flex items-center justify-between">
            <span>Range:</span>
            <span className="font-mono text-slate-700">₹{(targetRole.minSalary / 100000).toFixed(1)}L - ₹{(targetRole.maxSalary / 100000).toFixed(1)}L</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel space-y-2 border-slate-200/80 bg-white/70">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 font-semibold">Active Job Openings</span>
            <Briefcase className="w-5 h-5 text-[#FBBC05]" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-display">{targetRole.openingsCount.toLocaleString('en-IN')}</div>
          <div className="text-xs text-slate-500 flex items-center justify-between">
            <span>Role Growth Rate:</span>
            <span className="font-semibold text-[#34A853]">{targetRole.growthRate} YoY</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel space-y-2 border-slate-200/80 bg-white/70">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 font-semibold">Potential Salary Boost</span>
            <TrendingUp className="w-5 h-5 text-[#EA4335]" />
          </div>
          <div className="text-3xl font-extrabold text-[#EA4335] font-display">+₹{(gapData.totalBoostPotential / 100000).toFixed(2)} LPA</div>
          <div className="text-xs text-slate-500 flex items-center justify-between">
            <span>By Learning Top Gaps</span>
            <span className="font-mono text-slate-700">{gapData.missingRequired.length} Critical Gaps</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Target Role Gaps vs Exploding Tech Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Missing Required Skills Breakdown */}
        <div className="lg:col-span-7 p-6 rounded-2xl glass-panel bg-white/80 border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#4285F4]" />
              Target Role Core Requirements
            </h3>
            <span className="text-xs font-mono text-[#4285F4] font-bold">{gapData.matchedRequired.length} / {targetRole.requiredSkills.length} Matched</span>
          </div>

          <div className="space-y-3">
            {targetRole.requiredSkills.map((skillName, idx) => {
              const isMatched = gapData.matchedRequired.includes(skillName);
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                    isMatched
                      ? "bg-emerald-50/60 border-[#34A853]/30"
                      : "bg-red-50/40 border-[#EA4335]/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${isMatched ? "bg-[#34A853]" : "bg-[#EA4335]"}`}></div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{skillName}</div>
                      <div className="text-xs text-slate-500">
                        {isMatched ? "Verified in candidate profile" : "Missing required skill"}
                      </div>
                    </div>
                  </div>

                  {!isMatched && (
                    <button
                      onClick={() => onOpenSkillModal(skillName, targetRole.title)}
                      className="px-3 py-1.5 rounded-lg bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#4285F4] text-xs font-semibold hover:bg-[#4285F4]/20 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      Why learn this? <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Exploding Tech Leaderboard */}
        <div className="lg:col-span-5 p-6 rounded-2xl glass-panel bg-white/80 border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#34A853]" />
              Exploding Skills Leaderboard
            </h3>
            <button
              onClick={() => onNavigate("demand-trends")}
              className="text-xs font-mono text-[#4285F4] font-bold hover:underline cursor-pointer"
            >
              View All Trends
            </button>
          </div>

          <div className="space-y-3">
            {explodingSkills.map((skill, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-between hover:bg-slate-100/60 transition-colors">
                <div>
                  <div className="text-sm font-bold text-slate-900">{skill.name}</div>
                  <div className="text-xs text-slate-500">{skill.category} • +₹{(skill.salaryBoost / 100000).toFixed(2)} LPA</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-[#34A853] font-mono">{skill.demandTrend}</div>
                  <div className="text-[10px] font-mono text-slate-400">Growth Velocity</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
