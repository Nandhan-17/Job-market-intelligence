import React from 'react';
import { Sparkles, Brain, ArrowRight, Zap, Target, Award, CheckCircle2, TrendingUp } from 'lucide-react';
import { calculateSkillGapScore } from '../../services/aiEngine';
import { TARGET_ROLES, ALL_SKILLS_DATABASE } from '../../data/mockMarketData';

export default function AICareerRecommendationsScreen({ userProfile, onNavigate, onOpenSkillModal }) {
  const currentGap = calculateSkillGapScore(userProfile.currentSkills, userProfile.targetRoleId);

  // Calculate fit across all target roles for career pivot recommendations
  const allRoleFits = TARGET_ROLES.map(role => {
    const gap = calculateSkillGapScore(userProfile.currentSkills, role.id);
    return {
      role,
      score: gap.totalScore,
      missingCount: gap.missingRequired.length
    };
  }).sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2">
      {/* Header */}
      <div className="p-6 rounded-2xl glass-panel border-cyan-500/20 bg-gradient-to-br from-slate-900 via-[#0a1a2b] to-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <Brain className="w-3.5 h-3.5" /> AI CAREER COACH RECOMMENDATIONS
          </div>
          <h2 className="text-3xl font-extrabold text-white font-display">Personalized AI Career Insights</h2>
          <p className="text-slate-400 text-sm">
            AI-generated strategic guidance based on your verified skill profile, target role benchmarks, and market hiring velocity.
          </p>
        </div>
      </div>

      {/* AI Recommendation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl glass-panel space-y-4 border-cyan-500/30">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">#1 Top Strategic Priority</h3>
          <p className="text-slate-300 text-xs leading-relaxed">
            Prioritize acquiring <strong className="text-cyan-400">{currentGap.missingRequired[0] || "AWS"}</strong> first.
            This single skill unlocks +${ALL_SKILLS_DATABASE.find(s => s.name === currentGap.missingRequired[0])?.salaryBoost || 14000}/yr in compensation and resolves your biggest role gap.
          </p>
          <button
            onClick={() => onOpenSkillModal(currentGap.missingRequired[0] || "AWS", currentGap.role.title)}
            className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
          >
            Why Learn {currentGap.missingRequired[0] || "AWS"}? →
          </button>
        </div>

        <div className="p-6 rounded-2xl glass-panel space-y-4 border-emerald-500/30">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">#2 Future-Proofing Move</h3>
          <p className="text-slate-300 text-xs leading-relaxed">
            Integrate <strong className="text-emerald-400">Vector Databases (Pinecone/Qdrant)</strong> and AI APIs into your Next.js/Node projects to stand out to modern AI tech startups.
          </p>
          <button
            onClick={() => onOpenSkillModal("Vector Databases", currentGap.role.title)}
            className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
          >
            Why Learn Vector Databases? →
          </button>
        </div>

        <div className="p-6 rounded-2xl glass-panel space-y-4 border-indigo-500/30">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">#3 Portfolio Capstone Idea</h3>
          <p className="text-slate-300 text-xs leading-relaxed">
            Build a full-stack SaaS project using React, TypeScript, PostgreSQL, and Docker. Deploy it live on cloud infrastructure with automated GitHub Actions CI/CD.
          </p>
          <button
            onClick={() => onNavigate("learning-roadmap")}
            className="text-xs font-mono text-indigo-400 hover:underline flex items-center gap-1"
          >
            View Roadmap Capstone →
          </button>
        </div>
      </div>

      {/* Career Pivot & Alternative Role Matcher */}
      <div className="p-6 rounded-2xl glass-panel space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            Alternative Career Role Matcher (Transferable Skills)
          </h3>
          <p className="text-xs text-slate-400">
            See how your current skill profile translates into adjacent high-demand tech roles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allRoleFits.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
                item.role.id === userProfile.targetRoleId
                  ? "bg-slate-900 border-cyan-500/60 ring-1 ring-cyan-500/30"
                  : "bg-slate-900/60 border-slate-800"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">{item.role.category}</span>
                  <span className="text-sm font-bold text-cyan-400 font-mono">{item.score}% Match</span>
                </div>
                <h4 className="text-base font-bold text-white mt-1">{item.role.title}</h4>
                <div className="text-xs text-slate-400 mt-1">Avg Salary: <span className="text-emerald-400 font-bold">{item.role.avgSalary}</span></div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">{item.missingCount} Missing Gaps</span>
                <button
                  onClick={() => {
                    setUserProfile(prev => ({ ...prev, targetRoleId: item.role.id }));
                    onNavigate("gap-analysis");
                  }}
                  className="text-cyan-400 hover:underline font-semibold"
                >
                  Switch Target Goal →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
