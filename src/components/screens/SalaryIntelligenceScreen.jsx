import React, { useState } from 'react';
import { IndianRupee, TrendingUp, MapPin, Briefcase, Sparkles, Award, ArrowUpRight, Calculator } from 'lucide-react';
import { predictSalary, calculateSkillGapScore } from '../../services/aiEngine';
import { TARGET_ROLES, ALL_SKILLS_DATABASE } from '../../data/mockMarketData';

export default function SalaryIntelligenceScreen({ userProfile, setUserProfile }) {
  const [experienceYears, setExperienceYears] = useState(1);
  const [location, setLocation] = useState(userProfile.targetLocation || "Chennai, Tamil Nadu");

  const predicted = predictSalary(userProfile.targetRoleId, experienceYears, location, userProfile.currentSkills);
  const gapData = calculateSkillGapScore(userProfile.currentSkills, userProfile.targetRoleId);

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2">
      {/* Header */}
      <div className="p-6 rounded-2xl glass-panel border-[#4285F4]/20 bg-gradient-to-br from-white via-blue-50/40 to-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#34A853]/10 border border-[#34A853]/20 text-[#34A853] text-xs font-mono font-bold">
            <IndianRupee className="w-3.5 h-3.5" /> AI SALARY PREDICTION & MONETIZATION
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 font-display">Salary Intelligence & Skill Valuation</h2>
          <p className="text-slate-600 text-sm">
            Predict estimated compensation trajectories based on South Indian role benchmarks, candidate experience, location index, and high-value technical skills.
          </p>
        </div>

        {/* Highlight Salary Card */}
        <div className="p-5 px-8 rounded-2xl bg-white border border-[#34A853]/40 text-center shrink-0 shadow-md shadow-emerald-500/10">
          <div className="text-xs font-mono text-slate-500 uppercase font-semibold">Estimated Compensation</div>
          <div className="text-4xl font-extrabold text-[#34A853] font-display my-1">{predicted.estimatedSalary}</div>
          <div className="text-xs font-mono text-slate-600 font-medium">{predicted.range}</div>
        </div>
      </div>

      {/* Calculator Controls Grid */}
      <div className="p-6 rounded-2xl glass-panel bg-white/80 border-slate-200 space-y-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-[#4285F4]" />
          Interactive South India Compensation Variables
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-600 uppercase font-semibold">Target Job Role</label>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold">
              {gapData.role.title}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-600 uppercase font-semibold">Years of Relevant Experience ({experienceYears} Yrs)</label>
            <input
              type="range"
              min={0}
              max={10}
              value={experienceYears}
              onChange={(e) => setExperienceYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#4285F4]"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>Entry (0 Yr)</span>
              <span>Mid (5 Yrs)</span>
              <span>Senior (10 Yrs)</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-600 uppercase font-semibold">Target South India Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-[#4285F4] outline-none font-medium cursor-pointer"
            >
              <option value="Bengaluru, Karnataka">Bengaluru, Karnataka (Silicon Valley of India)</option>
              <option value="Chennai, Tamil Nadu">Chennai, Tamil Nadu (SaaS & Enterprise Hub)</option>
              <option value="Hyderabad, Telangana">Hyderabad, Telangana (Global Dev Center)</option>
              <option value="Kochi, Kerala">Kochi, Kerala (Tech & Startup Hub)</option>
              <option value="Visakhapatnam, Andhra Pradesh">Visakhapatnam, Andhra Pradesh (Emerging IT Hub)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Skill Monetization Matrix */}
      <div className="p-6 rounded-2xl glass-panel bg-white/80 border-slate-200 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#34A853]" />
            Skill Monetization Breakdown ("Learn X to Earn +₹Y/yr")
          </h3>
          <p className="text-xs text-slate-500">
            Estimated annual salary premium added upon verifying proficiency in high-demand technologies in the South Indian market.
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
                    ? "bg-emerald-50/60 border-[#34A853]/30"
                    : "bg-slate-50/60 border-slate-200 hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    {skill.name}
                    {isPossessed && <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#34A853]/10 text-[#34A853] font-bold">POSSESSED</span>}
                  </div>
                  <div className="text-xs text-slate-500">{skill.category}</div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold text-[#34A853] font-mono">
                    +₹{(skill.salaryBoost / 100000).toFixed(2)} LPA
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">Per Year</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
