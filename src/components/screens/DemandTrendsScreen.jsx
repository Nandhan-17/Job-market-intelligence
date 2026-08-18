import React, { useState } from 'react';
import { TrendingUp, Search, Filter, Sparkles, ArrowUpRight, ArrowDownRight, Zap } from 'lucide-react';
import { ALL_SKILLS_DATABASE } from '../../data/mockMarketData';

export default function DemandTrendsScreen({ onOpenSkillModal, targetRoleTitle }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [velocityFilter, setVelocityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const velocities = ['All', 'Exploding', 'Steady Growth', 'Stable', 'Declining'];

  const filteredSkills = ALL_SKILLS_DATABASE.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) || skill.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVel = velocityFilter === 'All' || skill.velocity === velocityFilter;
    const matchesCat = categoryFilter === 'All' || skill.category === categoryFilter;
    return matchesSearch && matchesVel && matchesCat;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2">
      {/* Header */}
      <div className="p-6 rounded-2xl glass-panel border-[#4285F4]/20 bg-gradient-to-br from-white via-blue-50/40 to-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4285F4]/10 border border-[#4285F4]/20 text-[#4285F4] text-xs font-mono font-bold">
            <TrendingUp className="w-3.5 h-3.5" /> SOUTH INDIA SKILL DEMAND FORECAST
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display">Skill-Demand Trends & Market Velocity</h2>
          <p className="text-slate-600 text-sm max-w-2xl">
            Continuously tracking job posting volume and predicting technology demand trajectories across major South Indian tech hubs (Bengaluru, Chennai, Hyderabad, Kochi).
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-5 rounded-2xl glass-panel bg-white/80 border-slate-200 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g., PyTorch, Docker, React)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:border-[#4285F4] outline-none"
            />
          </div>

          {/* Velocity Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <span className="text-xs text-slate-500 font-mono mr-1 shrink-0 font-semibold">Velocity:</span>
            {velocities.map(vel => (
              <button
                key={vel}
                onClick={() => setVelocityFilter(vel)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  velocityFilter === vel
                    ? "bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#4285F4] font-bold"
                    : "bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900"
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
              className="p-5 rounded-2xl glass-panel glass-panel-hover bg-white/80 border-slate-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#4285F4] uppercase font-bold tracking-wider">{skill.category}</span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${
                    isDeclining
                      ? "bg-red-50 text-[#EA4335] border border-red-200"
                      : "bg-emerald-50 text-[#34A853] border border-emerald-200"
                  }`}>
                    {isDeclining ? <ArrowDownRight className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                    {skill.demandTrend}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900">{skill.name}</h3>
                <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">{skill.description}</p>
              </div>

              {/* Metrics */}
              <div className="pt-3 border-t border-slate-200/80 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block font-mono">Openings (India)</span>
                  <span className="text-slate-800 font-bold">{skill.openings.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-mono">Salary Impact</span>
                  <span className="text-[#34A853] font-bold">+₹{(skill.salaryBoost / 100000).toFixed(2)} LPA</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onOpenSkillModal(skill.name, targetRoleTitle)}
                className="w-full py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-[#4285F4]" /> AI Skill Explanation
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
