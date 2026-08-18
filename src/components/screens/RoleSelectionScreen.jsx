import React, { useState } from 'react';
import { TARGET_ROLES } from '../../data/mockMarketData';
import { Target, CheckCircle2, ArrowRight, IndianRupee, TrendingUp, MapPin, Briefcase } from 'lucide-react';

export default function RoleSelectionScreen({ userProfile, setUserProfile, onNavigate }) {
  const [selectedRoleId, setSelectedRoleId] = useState(userProfile.targetRoleId || "fullstack-eng");
  const [seniority, setSeniority] = useState(userProfile.targetSeniority || "Junior / Associate");
  const [location, setLocation] = useState(userProfile.targetLocation || "Chennai, Tamil Nadu, India");

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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4285F4]/10 border border-[#4285F4]/20 text-[#4285F4] text-xs font-mono font-bold">
          <Target className="w-3.5 h-3.5" /> STEP 1 OF 3: CAREER GOAL SELECTION
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 font-display">Select Your Target Career Role</h2>
        <p className="text-slate-600 text-base">
          SkillPulse will analyze live job posting metrics across South India and align skill-gap requirements specifically for this target role.
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
                  ? "bg-white border-[#4285F4] ring-2 ring-[#4285F4]/20 shadow-md shadow-blue-500/10"
                  : "bg-white/70 border-slate-200 hover:border-slate-300 hover:bg-white"
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 text-[#4285F4]">
                  <CheckCircle2 className="w-6 h-6 fill-[#4285F4]/10 text-[#4285F4]" />
                </div>
              )}

              <div className="space-y-3">
                <div className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold w-fit">
                  {role.category}
                </div>
                <h3 className="text-xl font-bold text-slate-900 leading-snug">{role.title}</h3>
                <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">{role.description}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/80 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 block font-mono">Avg Salary</span>
                  <span className="text-[#34A853] font-bold">{role.avgSalary}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-mono">Demand Growth</span>
                  <span className="text-[#4285F4] font-bold">{role.growthRate}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Seniority & Location Customizer */}
      <div className="p-6 rounded-2xl glass-panel bg-white/80 border-slate-200 space-y-6">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-[#4285F4]" />
          Target Work & Seniority Preferences
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Target Seniority Level</label>
            <select
              value={seniority}
              onChange={(e) => setSeniority(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-[#4285F4] outline-none font-medium cursor-pointer"
            >
              <option value="Internship / Co-op">Internship / Trainee</option>
              <option value="Junior / Associate">Junior / Associate (0-2 Years)</option>
              <option value="Mid-Level">Mid-Level (2-5 Years)</option>
              <option value="Senior / Lead">Senior / Lead (5+ Years)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Target South India Location / Market</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:border-[#4285F4] outline-none font-medium cursor-pointer"
            >
              <option value="Chennai, Tamil Nadu, India">Chennai, Tamil Nadu (SaaS & Enterprise Hub)</option>
              <option value="Bengaluru, Karnataka, India">Bengaluru, Karnataka (Silicon Valley of India)</option>
              <option value="Hyderabad, Telangana, India">Hyderabad, Telangana (Global Dev Center)</option>
              <option value="Kochi, Kerala, India">Kochi, Kerala (Tech & Startup Hub)</option>
              <option value="Visakhapatnam, Andhra Pradesh, India">Visakhapatnam, Andhra Pradesh (Emerging IT Hub)</option>
            </select>
          </div>
        </div>

        {/* Selected Summary Card */}
        <div className="p-4 rounded-xl bg-slate-50 border border-[#4285F4]/30 flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="text-xs text-[#4285F4] font-mono font-bold">SELECTED GOAL PROFILE</div>
            <div className="text-lg font-bold text-slate-900 flex items-center gap-2">
              {selectedRole.title} <span className="text-sm font-normal text-slate-600">({seniority} • {location.split(',')[0]})</span>
            </div>
          </div>

          <button
            onClick={handleSaveAndContinue}
            className="px-6 py-3 rounded-xl bg-[#4285F4] hover:bg-blue-600 text-white font-bold text-sm shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all cursor-pointer"
          >
            Confirm & Proceed to Resume Skill Upload <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
