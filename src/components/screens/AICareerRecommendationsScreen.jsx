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

  const topSkillObj = ALL_SKILLS_DATABASE.find(s => s.name === currentGap.missingRequired[0]);
  const boostLPA = topSkillObj ? (topSkillObj.salaryBoost / 100000).toFixed(2) : "1.25";

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2">
      {/* Header */}
      <div className="p-6 rounded-2xl glass-panel border-[#4285F4]/20 bg-gradient-to-br from-white via-blue-50/40 to-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4285F4]/10 border border-[#4285F4]/20 text-[#4285F4] text-xs font-mono font-bold">
            <Brain className="w-3.5 h-3.5" /> AI CAREER COACH RECOMMENDATIONS
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display">Personalized AI Career Insights</h2>
          <p className="text-slate-600 text-sm">
            AI-generated strategic guidance based on your verified skill profile, South Indian target role benchmarks, and market hiring velocity.
          </p>
        </div>
      </div>

      {/* AI Recommendation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl glass-panel bg-white/80 border-slate-200 space-y-4 border-l-4 border-l-[#4285F4]">
          <div className="w-10 h-10 rounded-xl bg-[#4285F4]/10 border border-[#4285F4]/20 flex items-center justify-center text-[#4285F4]">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">#1 Top Strategic Priority</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            Prioritize acquiring <strong className="text-[#4285F4]">{currentGap.missingRequired[0] || "AWS"}</strong> first.
            This single skill unlocks <strong className="text-[#34A853]">+₹{boostLPA} LPA</strong> in compensation and resolves your biggest role gap.
          </p>
          <button
            onClick={() => onOpenSkillModal(currentGap.missingRequired[0] || "AWS", currentGap.role.title)}
            className="text-xs font-mono text-[#4285F4] font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            Why Learn {currentGap.missingRequired[0] || "AWS"}? →
          </button>
        </div>

        <div className="p-6 rounded-2xl glass-panel bg-white/80 border-slate-200 space-y-4 border-l-4 border-l-[#34A853]">
          <div className="w-10 h-10 rounded-xl bg-[#34A853]/10 border border-[#34A853]/20 flex items-center justify-center text-[#34A853]">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">#2 Future-Proofing Move</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            Integrate <strong className="text-[#34A853]">Vector Databases (Pinecone/Qdrant)</strong> and AI APIs into your Next.js/Node projects to stand out to Bengaluru and Hyderabad AI tech startups.
          </p>
          <button
            onClick={() => onOpenSkillModal("Vector Databases", currentGap.role.title)}
            className="text-xs font-mono text-[#34A853] font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            Why Learn Vector Databases? →
          </button>
        </div>

        <div className="p-6 rounded-2xl glass-panel bg-white/80 border-slate-200 space-y-4 border-l-4 border-l-[#FBBC05]">
          <div className="w-10 h-10 rounded-xl bg-[#FBBC05]/10 border border-[#FBBC05]/20 flex items-center justify-center text-[#FBBC05]">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">#3 Portfolio Capstone Idea</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            Build a full-stack SaaS project using React, TypeScript, PostgreSQL, and Docker. Deploy it live on cloud infrastructure with automated GitHub Actions CI/CD.
          </p>
          <button
            onClick={() => onNavigate("learning-roadmap")}
            className="text-xs font-mono text-[#4285F4] font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            View Roadmap Capstone →
          </button>
        </div>
      </div>

      {/* Career Pivot & Alternative Role Matcher */}
      <div className="p-6 rounded-2xl glass-panel bg-white/80 border-slate-200 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#4285F4]" />
            Alternative Career Role Matcher (Transferable Skills)
          </h3>
          <p className="text-xs text-slate-500">
            See how your current skill profile translates into adjacent high-demand tech roles across South India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allRoleFits.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
                item.role.id === userProfile.targetRoleId
                  ? "bg-white border-[#4285F4] ring-1 ring-[#4285F4]/30 shadow-xs"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500 font-semibold uppercase">{item.role.category}</span>
                  <span className="text-sm font-bold text-[#4285F4] font-mono">{item.score}% Match</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 mt-1">{item.role.title}</h4>
                <div className="text-xs text-slate-500 mt-1">Avg Salary: <span className="text-[#34A853] font-bold">{item.role.avgSalary}</span></div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono font-semibold">{item.missingCount} Missing Gaps</span>
                <button
                  onClick={() => {
                    setUserProfile(prev => ({ ...prev, targetRoleId: item.role.id }));
                    onNavigate("gap-analysis");
                  }}
                  className="text-[#4285F4] font-bold hover:underline cursor-pointer"
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
