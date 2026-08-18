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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4285F4]/10 border border-[#4285F4]/20 text-[#4285F4] text-xs font-mono font-bold">
          <FileText className="w-3.5 h-3.5" /> STEP 2 OF 3: RESUME SKILL EXTRACTION
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 font-display">Resume Automatic Skill Extractor</h2>
        <p className="text-slate-600 text-base">
          Upload your resume PDF/Text or paste raw resume text. Our NLP engine will extract technical competencies and proficiency levels automatically.
        </p>
      </div>

      {/* Grid Layout: Left Upload, Right Extracted Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input Dropzone & Text Area */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl glass-panel bg-white/80 border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Upload className="w-4 h-4 text-[#4285F4]" />
              Upload Resume File
            </h3>

            {/* Dropzone */}
            <label className="border-2 border-dashed border-slate-300 hover:border-[#4285F4] rounded-2xl p-6 text-center cursor-pointer transition-all bg-slate-50/60 hover:bg-slate-100/80 flex flex-col items-center justify-center space-y-2 block">
              <input type="file" accept=".txt,.pdf,.doc,.docx" onChange={handleFileUpload} className="hidden" />
              <div className="w-12 h-12 rounded-xl bg-[#4285F4]/10 border border-[#4285F4]/20 flex items-center justify-center text-[#4285F4]">
                <FileText className="w-6 h-6" />
              </div>
              <div className="text-sm font-semibold text-slate-800">Click to upload PDF or TXT</div>
              <div className="text-xs text-slate-500">Supports PDF, TXT, DOCX files</div>
            </label>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200">
              <span>Or test with sample data:</span>
              <button
                onClick={() => {
                  setResumeText(SAMPLE_RESUME_TEXT);
                  handleExtractSkills(SAMPLE_RESUME_TEXT);
                }}
                className="text-[#4285F4] hover:underline font-mono text-xs font-bold cursor-pointer"
              >
                Load Sample Resume
              </button>
            </div>
          </div>

          {/* Raw Resume Text Preview */}
          <div className="p-5 rounded-2xl glass-panel bg-white/80 border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-slate-500 uppercase font-semibold">Resume Content Inspector</label>
              <button
                onClick={() => handleExtractSkills(resumeText)}
                className="px-3 py-1 rounded-lg bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#4285F4] text-xs font-semibold hover:bg-[#4285F4]/20 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" /> Re-extract Skills
              </button>
            </div>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={10}
              placeholder="Paste raw resume text here..."
              className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 focus:border-[#4285F4] outline-none leading-relaxed resize-none"
            ></textarea>
          </div>
        </div>

        {/* Right Column: Extracted Skills Review */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl glass-panel bg-white/80 border-slate-200 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#4285F4]" />
                  Extracted Skill Profile ({extractedSkills.length})
                </h3>
                <p className="text-xs text-slate-500">Review and adjust skills parsed by SkillPulse AI</p>
              </div>

              {isExtracting && (
                <div className="flex items-center gap-2 text-xs text-[#4285F4] font-mono animate-pulse font-bold">
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
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:border-[#4285F4] outline-none font-medium"
              />
              <button
                onClick={handleAddCustomSkill}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>

            {/* Skills List Table / Pills */}
            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {extractedSkills.map((skill, index) => (
                <div
                  key={index}
                  className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 flex items-center justify-between gap-4 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#4285F4]/10 border border-[#4285F4]/20 flex items-center justify-center text-[#4285F4] font-bold text-xs font-mono">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                        {skill.name}
                        {skill.verified && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-[#34A853]/30 text-[#34A853] text-[10px] font-mono font-bold">
                            <ShieldCheck className="w-3 h-3" /> Extracted
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500">Source: {skill.source || "Resume"}</div>
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
                          className={`w-5 h-5 rounded-md text-[10px] font-bold font-mono transition-colors cursor-pointer ${
                            lvl <= skill.level
                              ? "bg-[#4285F4] text-white"
                              : "bg-slate-200 text-slate-500 hover:bg-slate-300"
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handleRemoveSkill(skill.name)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#EA4335] hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                Total Skills Extracted: <span className="text-[#4285F4] font-mono font-bold">{extractedSkills.length}</span>
              </div>

              <button
                onClick={handleSaveProfile}
                className="px-6 py-3 rounded-xl bg-[#4285F4] hover:bg-blue-600 text-white font-bold text-sm shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all cursor-pointer"
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
