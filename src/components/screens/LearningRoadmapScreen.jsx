import React, { useState } from 'react';
import { BookOpen, CheckCircle2, Clock, Sparkles, ArrowRight, Layers, Award, Circle } from 'lucide-react';
import { generateLearningRoadmap } from '../../services/aiEngine';

export default function LearningRoadmapScreen({ userProfile }) {
  const roadmapData = generateLearningRoadmap(userProfile.currentSkills, userProfile.targetRoleId);
  const [completedMilestones, setCompletedMilestones] = useState({});

  const toggleMilestone = (phaseIdx, msIdx) => {
    const key = `${phaseIdx}-${msIdx}`;
    setCompletedMilestones(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div className="p-6 rounded-2xl glass-panel border-[#4285F4]/20 bg-gradient-to-br from-white via-blue-50/40 to-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4285F4]/10 border border-[#4285F4]/20 text-[#4285F4] text-xs font-mono font-bold">
            <BookOpen className="w-3.5 h-3.5" /> PERSONALIZED 12-WEEK LEARNING PATHWAY
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display">Target Learning Roadmap</h2>
          <p className="text-slate-600 text-sm">
            Step-by-step career preparation plan customized for <span className="text-[#4285F4] font-bold">{roadmapData.targetRole}</span> in South India.
          </p>
        </div>

        <div className="p-4 px-6 rounded-2xl bg-white border border-[#4285F4]/40 text-center shrink-0 shadow-md shadow-blue-500/10">
          <div className="text-xs font-mono text-slate-500 uppercase font-semibold">Total Estimated Duration</div>
          <div className="text-3xl font-extrabold text-[#4285F4] font-display my-1">{roadmapData.estimatedTotalWeeks} Weeks</div>
          <div className="text-xs text-slate-500 font-medium">4 Milestone Phases</div>
        </div>
      </div>

      {/* Phase Roadmap Timeline Cards */}
      <div className="space-y-6">
        {roadmapData.phases.map((phase, pIdx) => (
          <div
            key={pIdx}
            className="p-6 rounded-2xl glass-panel glass-panel-hover bg-white/80 border-slate-200 space-y-4 relative overflow-hidden"
          >
            {/* Phase Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-200/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#4285F4]/10 border border-[#4285F4]/20 flex items-center justify-center text-[#4285F4] font-bold font-mono text-base">
                  0{phase.phase}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{phase.title}</h3>
                  <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#4285F4]" />
                    <span>{phase.estimatedWeeks}</span>
                  </div>
                </div>
              </div>

              {/* Focus Skills */}
              <div className="flex items-center gap-2 flex-wrap">
                {phase.skillsToFocus.map((sk, sIdx) => (
                  <span key={sIdx} className="px-3 py-1 rounded-lg bg-blue-50 border border-[#4285F4]/30 text-[#4285F4] text-xs font-mono font-bold">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Milestones Checklist */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">Phase Milestones & Deliverables:</div>
              {phase.milestones.map((milestone, mIdx) => {
                const isChecked = !!completedMilestones[`${pIdx}-${mIdx}`];
                return (
                  <div
                    key={mIdx}
                    onClick={() => toggleMilestone(pIdx, mIdx)}
                    className={`p-3.5 rounded-xl cursor-pointer border flex items-center gap-3 transition-all ${
                      isChecked
                        ? "bg-emerald-50 border-[#34A853]/30 text-[#34A853] font-medium"
                        : "bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300"
                    }`}
                  >
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-[#34A853] shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                    <span className={`text-sm ${isChecked ? "line-through text-slate-400" : ""}`}>{milestone}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
