import React from 'react';
import { TrendingUp, Briefcase, DollarSign, Award, Sparkles, ArrowRight, ShieldCheck, Cpu, Layers } from 'lucide-react';
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
      <div className="p-6 rounded-2xl glass-panel border-cyan-500/20 bg-gradient-to-br from-slate-900 via-[#0a1826] to-slate-900 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" /> LIVE MARKET INTELLIGENCE PULSE
          </div>
          <h2 className="text-3xl font-extrabold text-white font-display">Executive Job Market Intelligence</h2>
          <p className="text-slate-400 text-sm">
            Target Role: <span className="text-cyan-400 font-bold">{targetRole.title}</span> • Market Demand Index: <span className="text-emerald-400 font-bold">{targetRole.demandIndex}/100</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate("gap-analysis")}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4" /> Run Full Skill-Gap Analysis
          </button>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl glass-panel space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Target Role Fit Score</span>
            <Award className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-cyan-400 font-display">{gapData.totalScore}%</div>
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Readiness:</span>
            <span className="font-semibold text-slate-200">{gapData.readinessLevel}</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Target Benchmark Salary</span>
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 font-display">{targetRole.avgSalary}</div>
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Range:</span>
            <span className="font-mono text-slate-300">${targetRole.minSalary / 1000}k - ${targetRole.maxSalary / 1000}k</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Active Job Openings</span>
            <Briefcase className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-3xl font-extrabold text-indigo-400 font-display">{targetRole.openingsCount.toLocaleString()}</div>
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Role Growth Rate:</span>
            <span className="font-semibold text-emerald-400">{targetRole.growthRate} YoY</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">Potential Salary Boost</span>
            <TrendingUp className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-400 font-display">+${gapData.totalBoostPotential.toLocaleString()}</div>
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>By Learning Top Gaps</span>
            <span className="font-mono text-slate-300">{gapData.missingRequired.length} Critical Gaps</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Target Role Gaps vs Exploding Tech Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Missing Required Skills Breakdown */}
        <div className="lg:col-span-7 p-6 rounded-2xl glass-panel space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              Target Role Core Requirements
            </h3>
            <span className="text-xs font-mono text-cyan-400">{gapData.matchedRequired.length} / {targetRole.requiredSkills.length} Matched</span>
          </div>

          <div className="space-y-3">
            {targetRole.requiredSkills.map((skillName, idx) => {
              const isMatched = gapData.matchedRequired.includes(skillName);
              const dbSkill = ALL_SKILLS_DATABASE.find(s => s.name.toLowerCase() === skillName.toLowerCase());
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                    isMatched
                      ? "bg-slate-900/60 border-emerald-500/30"
                      : "bg-slate-900 border-rose-500/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${isMatched ? "bg-emerald-400" : "bg-rose-400"}`}></div>
                    <div>
                      <div className="text-sm font-bold text-white">{skillName}</div>
                      <div className="text-xs text-slate-400">
                        {isMatched ? "Verified in candidate profile" : "Missing required skill"}
                      </div>
                    </div>
                  </div>

                  {!isMatched && (
                    <button
                      onClick={() => onOpenSkillModal(skillName, targetRole.title)}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-medium hover:bg-cyan-500/20 transition-colors flex items-center gap-1"
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
        <div className="lg:col-span-5 p-6 rounded-2xl glass-panel space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Exploding Skills Leaderboard
            </h3>
            <button
              onClick={() => onNavigate("demand-trends")}
              className="text-xs font-mono text-cyan-400 hover:underline"
            >
              View All Trends
            </button>
          </div>

          <div className="space-y-3">
            {explodingSkills.map((skill, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">{skill.name}</div>
                  <div className="text-xs text-slate-400">{skill.category} • +${skill.salaryBoost.toLocaleString()}/yr</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-emerald-400 font-mono">{skill.demandTrend}</div>
                  <div className="text-[10px] font-mono text-slate-500">Growth Velocity</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
