import React, { useState } from 'react';
import { User, Plus, Sparkles, Star, ShieldCheck, Trash2, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { TARGET_ROLES, ALL_SKILLS_DATABASE } from '../../data/mockMarketData';

export default function SkillProfileScreen({ userProfile, setUserProfile, onNavigate }) {
  const [newSkillName, setNewSkillName] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

  const targetRole = TARGET_ROLES.find(r => r.id === userProfile.targetRoleId) || TARGET_ROLES[0];

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    const exists = userProfile.currentSkills.some(s => s.name.toLowerCase() === newSkillName.trim().toLowerCase());
    if (!exists) {
      setUserProfile(prev => ({
        ...prev,
        currentSkills: [
          ...prev.currentSkills,
          { name: newSkillName.trim(), level: 3, verified: false, source: "Manual" }
        ]
      }));
    }
    setNewSkillName('');
  };

  const handleRemoveSkill = (skillName) => {
    setUserProfile(prev => ({
      ...prev,
      currentSkills: prev.currentSkills.filter(s => s.name !== skillName)
    }));
  };

  const handleUpdateLevel = (skillName, newLevel) => {
    setUserProfile(prev => ({
      ...prev,
      currentSkills: prev.currentSkills.map(s => s.name === skillName ? { ...s, level: newLevel } : s)
    }));
  };

  // Categories
  const categories = ['All', 'Frontend', 'Backend', 'Cloud & DevOps', 'Data & AI', 'Languages', 'Databases', 'Tools'];

  const filteredSkills = userProfile.currentSkills.filter(s => {
    if (selectedCategoryFilter === 'All') return true;
    const dbItem = ALL_SKILLS_DATABASE.find(d => d.name.toLowerCase() === s.name.toLowerCase());
    return dbItem && dbItem.category === selectedCategoryFilter;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Profile Banner */}
      <div className="p-6 rounded-2xl glass-panel flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-cyan-500/20 bg-gradient-to-r from-slate-900 via-[#0d1e30] to-slate-900">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-cyan-500/20">
            {userProfile.name ? userProfile.name.charAt(0) : "A"}
          </div>
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Candidate Skill Matrix</div>
            <h2 className="text-2xl font-bold text-white">{userProfile.name || "Alex Morgan"}</h2>
            <p className="text-sm text-slate-400 flex items-center gap-2">
              <span>Target Role: <strong className="text-cyan-400">{targetRole.title}</strong></span>
              <span>•</span>
              <span>{userProfile.targetLocation}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate("gap-analysis")}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all"
          >
            Run Skill-Gap Analysis <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Add Skill & Filter Toolbar */}
      <div className="p-5 rounded-2xl glass-panel space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
              placeholder="Add skill to profile..."
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:border-cyan-500 outline-none w-full md:w-72"
            />
            <button
              onClick={handleAddSkill}
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shrink-0 transition-colors flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add Skill
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  selectedCategoryFilter === cat
                    ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-300"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSkills.map((skill, index) => {
          const dbItem = ALL_SKILLS_DATABASE.find(d => d.name.toLowerCase() === skill.name.toLowerCase());
          return (
            <div
              key={index}
              className="p-5 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                    {dbItem ? dbItem.category : "Technical Competency"}
                  </div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {skill.name}
                    {skill.verified && (
                      <ShieldCheck className="w-4 h-4 text-emerald-400" title="Verified Skill" />
                    )}
                  </h3>
                </div>

                <button
                  onClick={() => handleRemoveSkill(skill.name)}
                  className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {dbItem && (
                <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">{dbItem.description}</p>
              )}

              {/* Proficiency Level Selector */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Proficiency Level:</span>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() => handleUpdateLevel(skill.name, level)}
                      className={`w-6 h-6 rounded-md text-xs font-bold font-mono transition-all ${
                        level <= skill.level
                          ? "bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/30"
                          : "bg-slate-900 text-slate-600 hover:bg-slate-800"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
