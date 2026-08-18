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
      <div className="p-6 rounded-2xl glass-panel border-[#4285F4]/20 bg-gradient-to-br from-white via-blue-50/40 to-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4285F4]/10 border border-[#4285F4]/20 text-[#4285F4] text-xs font-mono font-bold">
            <Target className="w-3.5 h-3.5" /> SOUTH INDIA SKILL GAP SCORER
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display">Target Role Skill-Gap Analysis</h2>
          <p className="text-slate-600 text-sm">
            Target Role: <span className="text-[#4285F4] font-bold">{gapData.role.title}</span> • Readiness Stage: <span className={`px-2.5 py-0.5 rounded-full border text-xs font-bold font-mono ${gapData.badgeColor}`}>{gapData.readinessLevel}</span>
          </p>
        </div>

        {/* Big Fit Score Scorecard */}
        <div className="p-4 px-6 rounded-2xl bg-white border border-[#4285F4]/40 text-center shrink-0 shadow-md shadow-blue-500/10">
          <div className="text-xs font-mono text-slate-500 uppercase font-semibold">Target Role Match</div>
          <div className="text-5xl font-extrabold text-[#4285F4] font-display my-1">{gapData.totalScore}%</div>
          <div className="text-[11px] text-slate-500 font-medium">Match Accuracy Score</div>
        </div>
      </div>

      {/* Grid: Missing Critical Gaps vs Matched Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Missing Critical Gaps */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl glass-panel bg-white/80 border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[#EA4335]" />
                Missing Critical Role Requirements ({gapData.missingRequired.length})
              </h3>
            </div>

            <p className="text-slate-600 text-xs leading-relaxed">
              These mandatory skills are explicitly specified in modern South Indian tech market postings for {gapData.role.title}.
            </p>

            <div className="space-y-3">
              {gapData.missingRequired.map((skillName, idx) => {
                const dbSkill = ALL_SKILLS_DATABASE.find(s => s.name.toLowerCase() === skillName.toLowerCase());
                const boostLPA = dbSkill ? (dbSkill.salaryBoost / 100000).toFixed(2) : "1.25";
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-red-50/40 border border-[#EA4335]/30 flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        {skillName}
                        <span className="px-2 py-0.5 rounded-md bg-[#EA4335]/10 text-[#EA4335] border border-[#EA4335]/30 text-[10px] font-mono font-bold">
                          HIGH PRIORITY
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 mt-1">
                        Est. Salary Boost: <span className="text-[#34A853] font-bold">+₹{boostLPA} LPA</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenSkillModal(skillName, gapData.role.title)}
                        className="px-3 py-1.5 rounded-lg bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#4285F4] text-xs font-semibold hover:bg-[#4285F4]/20 transition-colors cursor-pointer"
                      >
                        Why Learn?
                      </button>
                      <button
                        onClick={() => handleAddSkillToProfile(skillName)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold transition-colors cursor-pointer"
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
          <div className="p-6 rounded-2xl glass-panel bg-white/80 border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#4285F4]" />
              Recommended & Emerging Industry Skills
            </h3>

            <div className="space-y-3">
              {[...gapData.missingRecommended, ...gapData.missingEmerging].map((skillName, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-800">{skillName}</div>
                  <button
                    onClick={() => onOpenSkillModal(skillName, gapData.role.title)}
                    className="text-xs font-mono text-[#4285F4] font-bold hover:underline cursor-pointer"
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
          <div className="p-6 rounded-2xl glass-panel bg-white/80 border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#34A853]" />
              Acquired & Verified Competencies ({gapData.matchedRequired.length + gapData.matchedRecommended.length})
            </h3>

            <div className="space-y-2">
              {[...gapData.matchedRequired, ...gapData.matchedRecommended].map((skillName, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-emerald-50 border border-[#34A853]/30 text-sm text-[#34A853] font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#34A853]" />
                  <span>{skillName}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick CTA to Personalized Roadmap */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 via-white to-emerald-50/80 border border-[#4285F4]/30 space-y-4 text-center shadow-xs">
            <Cpu className="w-8 h-8 text-[#4285F4] mx-auto" />
            <h4 className="text-lg font-bold text-slate-900">Generate 12-Week Custom Roadmap</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              SkillPulse AI can package all your missing critical gaps into a 4-phase structured timeline with project milestones tailored for South Indian tech hiring.
            </p>
            <button
              onClick={() => onNavigate("learning-roadmap")}
              className="w-full py-3 rounded-xl bg-[#4285F4] hover:bg-blue-600 text-white font-bold text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              View Personalized Learning Roadmap <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
