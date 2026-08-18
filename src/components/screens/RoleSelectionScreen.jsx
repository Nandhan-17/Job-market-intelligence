import React, { useState } from 'react';
import { TARGET_ROLES } from '../../data/mockMarketData';
import { Target, CheckCircle2, ArrowRight, DollarSign, TrendingUp, MapPin, Briefcase } from 'lucide-react';

export default function RoleSelectionScreen({ userProfile, setUserProfile, onNavigate }) {
  const [selectedRoleId, setSelectedRoleId] = useState(userProfile.targetRoleId || "fullstack-eng");
  const [seniority, setSeniority] = useState(userProfile.targetSeniority || "Junior / Associate");
  const [location, setLocation] = useState(userProfile.targetLocation || "San Francisco, CA (or Remote)");

  const selectedRole = TARGET_ROLES.find(r => r.id === selectedRoleId) || TARGET_ROLES[0];

  const handleSaveAndContinue = () => {
    setUserProfile(prev => ({
      ...prev,
      targetRoleId: selectedRoleId,
      targetSeniority: seniority,
      targetLocation: location
    }));
    onNavigate("resume-analysis");
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <Target className="w-3.5 h-3.5" /> STEP 1 OF 3: CAREER GOAL SELECTION
        </div>
        <h2 className="text-3xl font-extrabold text-white font-display">Select Your Target Career Role</h2>
        <p className="text-slate-400 text-base">
          SkillPulse will analyze live job posting metrics and align skill-gap requirements specifically for this target role.
        </p>
      </div>

      {/* Role Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TARGET_ROLES.map((role) => {
          const isSelected = role.id === selectedRoleId;
          return (
            <div
              key={role.id}
              onClick={() => setSelectedRoleId(role.id)}
              className={`p-5 rounded-2xl cursor-pointer transition-all border relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? "bg-slate-900 border-cyan-500/60 ring-2 ring-cyan-500/30 shadow-xl shadow-cyan-950/40"
                  : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80"
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 text-cyan-400">
                  <CheckCircle2 className="w-6 h-6 fill-cyan-500/20" />
                </div>
              )}

              <div className="space-y-3">
                <div className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 w-fit">
                  {role.category}
                </div>
                <h3 className="text-xl font-bold text-white leading-snug">{role.title}</h3>
                <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">{role.description}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 block font-mono">Avg Salary</span>
                  <span className="text-emerald-400 font-bold">{role.avgSalary}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-mono">Demand Growth</span>
                  <span className="text-cyan-400 font-bold">{role.growthRate}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Seniority & Location Customizer */}
      <div className="p-6 rounded-2xl glass-panel space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-cyan-400" />
          Target Work & Seniority Preferences
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Target Seniority Level</label>
            <select
              value={seniority}
              onChange={(e) => setSeniority(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
            >
              <option value="Internship / Co-op">Internship / Co-op</option>
              <option value="Junior / Associate">Junior / Associate (0-2 Years)</option>
              <option value="Mid-Level">Mid-Level (2-5 Years)</option>
              <option value="Senior / Lead">Senior / Lead (5+ Years)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Target Location / Market</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
            >
              <option value="San Francisco, CA (or Remote)">San Francisco, CA (or Remote US)</option>
              <option value="New York, NY">New York, NY</option>
              <option value="Austin, TX / Seattle, WA">Austin, TX / Seattle, WA</option>
              <option value="European Tech Hubs (London, Berlin)">European Tech Hubs (London, Berlin)</option>
              <option value="India / APAC Region">India / APAC Region</option>
            </select>
          </div>
        </div>

        {/* Selected Summary Card */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="text-xs text-cyan-400 font-mono">SELECTED GOAL PROFILE</div>
            <div className="text-lg font-bold text-white flex items-center gap-2">
              {selectedRole.title} <span className="text-sm font-normal text-slate-400">({seniority})</span>
            </div>
          </div>

          <button
            onClick={handleSaveAndContinue}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all"
          >
            Confirm & Proceed to Resume Skill Upload <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
