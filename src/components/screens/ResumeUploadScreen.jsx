import React, { useState } from 'react';
import { FileText, Upload, Sparkles, CheckCircle2, Plus, Trash2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { extractSkillsFromText } from '../../services/aiEngine';
import { SAMPLE_RESUME_TEXT } from '../../data/mockMarketData';

export default function ResumeUploadScreen({ userProfile, setUserProfile, onNavigate }) {
  const [resumeText, setResumeText] = useState(SAMPLE_RESUME_TEXT);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedSkills, setExtractedSkills] = useState(userProfile.currentSkills || []);
  const [customSkillInput, setCustomSkillInput] = useState('');

  // Handle live extraction
  const handleExtractSkills = (textToParse) => {
    setIsExtracting(true);
    setTimeout(() => {
      const skills = extractSkillsFromText(textToParse);
      if (skills.length > 0) {
        setExtractedSkills(skills.map(s => ({
          name: s.name,
          level: s.level || 3,
          verified: true,
          source: "Resume Extraction"
        })));
      }
      setIsExtracting(false);
    }, 600);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        setResumeText(text);
        handleExtractSkills(text);
      };
      reader.readAsText(file);
    }
  };

  const handleAddCustomSkill = () => {
    if (!customSkillInput.trim()) return;
    const exists = extractedSkills.some(s => s.name.toLowerCase() === customSkillInput.trim().toLowerCase());
    if (!exists) {
      setExtractedSkills(prev => [
        ...prev,
        { name: customSkillInput.trim(), level: 3, verified: false, source: "Manual Input" }
      ]);
    }
    setCustomSkillInput('');
  };

  const handleRemoveSkill = (skillName) => {
    setExtractedSkills(prev => prev.filter(s => s.name !== skillName));
  };

  const handleSaveProfile = () => {
    setUserProfile(prev => ({
      ...prev,
      currentSkills: extractedSkills
    }));
    onNavigate("skill-profile");
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <FileText className="w-3.5 h-3.5" /> STEP 2 OF 3: RESUME SKILL EXTRACTION
        </div>
        <h2 className="text-3xl font-extrabold text-white font-display">Resume Automatic Skill Extractor</h2>
        <p className="text-slate-400 text-base">
          Upload your resume PDF/Text or paste raw resume text. Our NLP engine will extract technical competencies and proficiency levels automatically.
        </p>
      </div>

      {/* Grid Layout: Left Upload, Right Extracted Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input Dropzone & Text Area */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-cyan-400" />
              Upload Resume File
            </h3>

            {/* Dropzone */}
            <label className="border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-2xl p-6 text-center cursor-pointer transition-all bg-slate-900/60 hover:bg-slate-900 flex flex-col items-center justify-center space-y-2 block">
              <input type="file" accept=".txt,.pdf,.doc,.docx" onChange={handleFileUpload} className="hidden" />
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <FileText className="w-6 h-6" />
              </div>
              <div className="text-sm font-semibold text-slate-200">Click to upload PDF or TXT</div>
              <div className="text-xs text-slate-500">Supports PDF, TXT, DOCX files</div>
            </label>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
              <span>Or test with sample data:</span>
              <button
                onClick={() => {
                  setResumeText(SAMPLE_RESUME_TEXT);
                  handleExtractSkills(SAMPLE_RESUME_TEXT);
                }}
                className="text-cyan-400 hover:text-cyan-300 underline font-mono text-xs"
              >
                Load Sample Resume
              </button>
            </div>
          </div>

          {/* Raw Resume Text Preview */}
          <div className="p-5 rounded-2xl glass-panel space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-slate-400 uppercase">Resume Content Inspector</label>
              <button
                onClick={() => handleExtractSkills(resumeText)}
                className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-medium hover:bg-cyan-500/20 transition-colors flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5" /> Re-extract Skills
              </button>
            </div>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={10}
              placeholder="Paste raw resume text here..."
              className="w-full p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 focus:border-cyan-500 outline-none leading-relaxed resize-none"
            ></textarea>
          </div>
        </div>

        {/* Right Column: Extracted Skills Review */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl glass-panel space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  Extracted Skill Profile ({extractedSkills.length})
                </h3>
                <p className="text-xs text-slate-400">Review and adjust skills parsed by SkillPulse AI</p>
              </div>

              {isExtracting && (
                <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono animate-pulse">
                  <Sparkles className="w-4 h-4" /> Analyzing NLP taxonomy...
                </div>
              )}
            </div>

            {/* Quick Add Custom Skill */}
            <div className="flex gap-2">
              <input
                type="text"
                value={customSkillInput}
                onChange={(e) => setCustomSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddCustomSkill()}
                placeholder="Add missing skill (e.g. AWS, Docker, PyTorch)..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:border-cyan-500 outline-none"
              />
              <button
                onClick={handleAddCustomSkill}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>

            {/* Skills List Table / Pills */}
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {extractedSkills.map((skill, index) => (
                <div
                  key={index}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-xs font-mono">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                        {skill.name}
                        {skill.verified && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
                            <ShieldCheck className="w-3 h-3" /> Extracted
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400">Source: {skill.source || "Resume"}</div>
                    </div>
                  </div>

                  {/* Level rating */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <button
                          key={lvl}
                          onClick={() => {
                            setExtractedSkills(prev => prev.map((s, idx) => idx === index ? { ...s, level: lvl } : s));
                          }}
                          className={`w-5 h-5 rounded-md text-[10px] font-bold font-mono transition-colors ${
                            lvl <= skill.level
                              ? "bg-cyan-500 text-slate-950"
                              : "bg-slate-800 text-slate-500 hover:bg-slate-700"
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handleRemoveSkill(skill.name)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-400">
                Total Skills Extracted: <span className="text-cyan-400 font-mono font-bold">{extractedSkills.length}</span>
              </div>

              <button
                onClick={handleSaveProfile}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all"
              >
                Save & View Master Skill Profile <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
