import React, { useState } from 'react';
import { TrendingUp, Search, Filter, Sparkles, ArrowUpRight, ArrowDownRight, Zap } from 'lucide-react';
import { ALL_SKILLS_DATABASE } from '../../data/mockMarketData';

export default function DemandTrendsScreen({ onOpenSkillModal, targetRoleTitle }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [velocityFilter, setVelocityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const velocities = ['All', 'Exploding', 'Steady Growth', 'Stable', 'Declining'];
  const categories = ['All', 'Frontend', 'Backend', 'Cloud & DevOps', 'Data & AI', 'Languages', 'Databases', 'Security'];

  const filteredSkills = ALL_SKILLS_DATABASE.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) || skill.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVel = velocityFilter === 'All' || skill.velocity === velocityFilter;
    const matchesCat = categoryFilter === 'All' || skill.category === categoryFilter;
    return matchesSearch && matchesVel && matchesCat;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2">
      {/* Header */}
      <div className="p-6 rounded-2xl glass-panel border-cyan-500/20 bg-gradient-to-br from-slate-900 via-[#0a1b2b] to-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <TrendingUp className="w-3.5 h-3.5" /> 24-MONTH SKILL DEMAND FORECASTING
          </div>
          <h2 className="text-3xl font-extrabold text-white font-display">Skill-Demand Trends & Market Velocity</h2>
          <p className="text-slate-400 text-sm max-w-2xl">
            Continuously tracking historical job posting volume and predicting 2026-2027 technology demand trajectories across 250,000+ postings.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-5 rounded-2xl glass-panel space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g., PyTorch, Docker, React)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:border-cyan-500 outline-none"
            />
          </div>

          {/* Velocity Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <span className="text-xs text-slate-500 font-mono mr-1 shrink-0">Velocity:</span>
            {velocities.map(vel => (
              <button
                key={vel}
                onClick={() => setVelocityFilter(vel)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  velocityFilter === vel
                    ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-300"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                {vel}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Demand Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSkills.map((skill, idx) => {
          const isDeclining = skill.velocity === "Declining";
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">{skill.category}</span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${
                    isDeclining
                      ? "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                      : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                  }`}>
                    {isDeclining ? <ArrowDownRight className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                    {skill.demandTrend}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">{skill.description}</p>
              </div>

              {/* Metrics */}
              <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 block font-mono">Job Openings</span>
                  <span className="text-slate-200 font-bold">{skill.openings.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-mono">Avg Salary Impact</span>
                  <span className="text-cyan-400 font-bold">+${skill.salaryBoost.toLocaleString()}/yr</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onOpenSkillModal(skill.name, targetRoleTitle)}
                className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Zap className="w-3.5 h-3.5 text-cyan-400" /> AI Skill Explanation
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
