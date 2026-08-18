import React, { useState } from 'react';
import { DollarSign, TrendingUp, MapPin, Briefcase, Sparkles, Award, ArrowUpRight, Calculator } from 'lucide-react';
import { predictSalary, calculateSkillGapScore } from '../../services/aiEngine';
import { TARGET_ROLES, ALL_SKILLS_DATABASE } from '../../data/mockMarketData';

export default function SalaryIntelligenceScreen({ userProfile, setUserProfile }) {
  const [experienceYears, setExperienceYears] = useState(1);
  const [location, setLocation] = useState(userProfile.targetLocation || "San Francisco, CA (or Remote)");

  const predicted = predictSalary(userProfile.targetRoleId, experienceYears, location, userProfile.currentSkills);
  const gapData = calculateSkillGapScore(userProfile.currentSkills, userProfile.targetRoleId);

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2">
      {/* Header */}
      <div className="p-6 rounded-2xl glass-panel border-cyan-500/20 bg-gradient-to-br from-slate-900 via-[#0b1c2b] to-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <DollarSign className="w-3.5 h-3.5" /> AI SALARY PREDICTION & MONETIZATION
          </div>
          <h2 className="text-3xl font-extrabold text-white font-display">Salary Intelligence & Skill Valuation</h2>
          <p className="text-slate-400 text-sm">
            Predict estimated compensation trajectories based on role benchmarks, candidate experience, location index, and high-value technical skills.
          </p>
        </div>

        {/* Highlight Salary Card */}
        <div className="p-5 px-8 rounded-2xl bg-slate-900/90 border border-emerald-500/40 text-center shrink-0 shadow-xl shadow-emerald-950/40">
          <div className="text-xs font-mono text-slate-400 uppercase">Estimated Compensation</div>
          <div className="text-4xl font-extrabold text-emerald-400 font-display my-1">{predicted.estimatedSalary}</div>
          <div className="text-xs font-mono text-slate-300">{predicted.range}</div>
        </div>
      </div>

      {/* Calculator Controls Grid */}
      <div className="p-6 rounded-2xl glass-panel space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Calculator className="w-5 h-5 text-cyan-400" />
          Interactive Compensation Variables
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300 uppercase">Target Job Role</label>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm font-semibold">
              {gapData.role.title}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300 uppercase">Years of Relevant Experience ({experienceYears} Yrs)</label>
            <input
              type="range"
              min={0}
              max={10}
              value={experienceYears}
              onChange={(e) => setExperienceYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>Entry (0 Yr)</span>
              <span>Mid (5 Yrs)</span>
              <span>Senior (10 Yrs)</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-300 uppercase">Target Work Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 outline-none"
            >
              <option value="San Francisco, CA (or Remote)">San Francisco, CA (Tier 1 US)</option>
              <option value="New York, NY">New York, NY (Tier 1 US)</option>
              <option value="Austin, TX / Seattle, WA">Austin, TX / Seattle, WA (Tier 2 US)</option>
              <option value="European Tech Hubs (London, Berlin)">European Tech Hubs (London, Berlin)</option>
              <option value="India / APAC Region">India / APAC Region</option>
            </select>
          </div>
        </div>
      </div>

      {/* Skill Monetization Matrix */}
      <div className="p-6 rounded-2xl glass-panel space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            Skill Monetization Breakdown ("Learn X to Earn +$Y/yr")
          </h3>
          <p className="text-xs text-slate-400">
            Estimated annual salary premium added upon verifying proficiency in high-demand technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_SKILLS_DATABASE.map((skill, idx) => {
            const isPossessed = userProfile.currentSkills.some(s => s.name.toLowerCase() === skill.name.toLowerCase());
            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                  isPossessed
                    ? "bg-slate-900/60 border-emerald-500/30"
                    : "bg-slate-900 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    {skill.name}
                    {isPossessed && <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">POSSESSED</span>}
                  </div>
                  <div className="text-xs text-slate-400">{skill.category}</div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold text-emerald-400 font-mono">
                    +${skill.salaryBoost.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">Per Year</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
