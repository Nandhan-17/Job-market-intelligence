import React from 'react';
import { Target, Award, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';
import { calculateSkillGapScore } from '../../services/aiEngine';
import { ALL_SKILLS_DATABASE } from '../../data/mockMarketData';

export default function SkillGapScreen({ userProfile, setUserProfile, onNavigate, onOpenSkillModal }) {
  const gapData = calculateSkillGapScore(userProfile.currentSkills, userProfile.targetRoleId);

  const handleAddSkillToProfile = (skillName) => {
    const exists = userProfile.currentSkills.some(s => s.name.toLowerCase() === skillName.toLowerCase());
    if (!exists) {
      setUserProfile(prev => ({
        ...prev,
        currentSkills: [
          ...prev.currentSkills,
          { name: skillName, level: 3, verified: false, source: "Gap Analysis" }
        ]
      }));
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl glass-panel border-cyan-500/20 bg-gradient-to-br from-slate-900 via-[#0c1c2d] to-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <Target className="w-3.5 h-3.5" /> SKILL GAP & ROLE READINESS SCORER
          </div>
          <h2 className="text-3xl font-extrabold text-white font-display">Target Role Skill-Gap Analysis</h2>
          <p className="text-slate-400 text-sm">
            Target Role: <span className="text-cyan-400 font-bold">{gapData.role.title}</span> • Readiness Stage: <span className={`px-2.5 py-0.5 rounded-full border text-xs font-bold font-mono ${gapData.badgeColor}`}>{gapData.readinessLevel}</span>
          </p>
        </div>

        {/* Big Fit Score Scorecard */}
        <div className="p-4 px-6 rounded-2xl bg-slate-900/90 border border-cyan-500/40 text-center shrink-0 shadow-xl shadow-cyan-950/40">
          <div className="text-xs font-mono text-slate-400 uppercase">Target Role Match</div>
          <div className="text-5xl font-extrabold text-cyan-400 font-display my-1">{gapData.totalScore}%</div>
          <div className="text-[11px] text-slate-400">Match Accuracy Score</div>
        </div>
      </div>

      {/* Grid: Missing Critical Gaps vs Matched Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Missing Critical Gaps */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                Missing Critical Role Requirements ({gapData.missingRequired.length})
              </h3>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              These mandatory skills are explicitly specified in modern job postings for {gapData.role.title}.
            </p>

            <div className="space-y-3">
              {gapData.missingRequired.map((skillName, idx) => {
                const dbSkill = ALL_SKILLS_DATABASE.find(s => s.name.toLowerCase() === skillName.toLowerCase());
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-900/90 border border-rose-500/30 flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        {skillName}
                        <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/30 text-[10px] font-mono">
                          HIGH PRIORITY
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Est. Salary Boost: <span className="text-cyan-400 font-bold">+${dbSkill ? dbSkill.salaryBoost.toLocaleString() : "12,500"}/yr</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenSkillModal(skillName, gapData.role.title)}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-medium hover:bg-cyan-500/20 transition-colors"
                      >
                        Why Learn?
                      </button>
                      <button
                        onClick={() => handleAddSkillToProfile(skillName)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition-colors"
                      >
                        Mark Acquired
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Missing Recommended & Emerging Gaps */}
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Recommended & Emerging Industry Skills
            </h3>

            <div className="space-y-3">
              {[...gapData.missingRecommended, ...gapData.missingEmerging].map((skillName, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-200">{skillName}</div>
                  <button
                    onClick={() => onOpenSkillModal(skillName, gapData.role.title)}
                    className="text-xs font-mono text-cyan-400 hover:underline"
                  >
                    AI Explanation →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Acquired & Verified Skills */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Acquired & Verified Competencies ({gapData.matchedRequired.length + gapData.matchedRecommended.length})
            </h3>

            <div className="space-y-2">
              {[...gapData.matchedRequired, ...gapData.matchedRecommended].map((skillName, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-sm text-emerald-300 font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{skillName}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick CTA to Personalized Roadmap */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/30 space-y-4 text-center">
            <Cpu className="w-8 h-8 text-cyan-400 mx-auto" />
            <h4 className="text-lg font-bold text-white">Generate 12-Week Custom Roadmap</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              SkillPulse AI can package all your missing critical gaps into a 4-phase structured timeline with project milestones.
            </p>
            <button
              onClick={() => onNavigate("learning-roadmap")}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all"
            >
              View Personalized Learning Roadmap <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
