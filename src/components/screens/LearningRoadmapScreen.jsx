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
      <div className="p-6 rounded-2xl glass-panel border-cyan-500/20 bg-gradient-to-br from-slate-900 via-[#0c1d2e] to-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <BookOpen className="w-3.5 h-3.5" /> PERSONALIZED 12-WEEK LEARNING PATHWAY
          </div>
          <h2 className="text-3xl font-extrabold text-white font-display">Target Learning Roadmap</h2>
          <p className="text-slate-400 text-sm">
            Step-by-step career preparation plan customized for <span className="text-cyan-400 font-bold">{roadmapData.targetRole}</span>.
          </p>
        </div>

        <div className="p-4 px-6 rounded-2xl bg-slate-900/90 border border-cyan-500/40 text-center shrink-0">
          <div className="text-xs font-mono text-slate-400 uppercase">Total Estimated Duration</div>
          <div className="text-3xl font-extrabold text-cyan-400 font-display my-1">{roadmapData.estimatedTotalWeeks} Weeks</div>
          <div className="text-xs text-slate-400">4 Milestone Phases</div>
        </div>
      </div>

      {/* Phase Roadmap Timeline Cards */}
      <div className="space-y-6">
        {roadmapData.phases.map((phase, pIdx) => (
          <div
            key={pIdx}
            className="p-6 rounded-2xl glass-panel glass-panel-hover border-slate-800 space-y-4 relative overflow-hidden"
          >
            {/* Phase Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold font-mono text-base">
                  0{phase.phase}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                  <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{phase.estimatedWeeks}</span>
                  </div>
                </div>
              </div>

              {/* Focus Skills */}
              <div className="flex items-center gap-2 flex-wrap">
                {phase.skillsToFocus.map((sk, sIdx) => (
                  <span key={sIdx} className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-cyan-300 text-xs font-mono font-medium">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Milestones Checklist */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">Phase Milestones & Deliverables:</div>
              {phase.milestones.map((milestone, mIdx) => {
                const isChecked = !!completedMilestones[`${pIdx}-${mIdx}`];
                return (
                  <div
                    key={mIdx}
                    onClick={() => toggleMilestone(pIdx, mIdx)}
                    className={`p-3.5 rounded-xl cursor-pointer border flex items-center gap-3 transition-all ${
                      isChecked
                        ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-300"
                        : "bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-600 shrink-0" />
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
