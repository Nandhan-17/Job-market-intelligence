import React, { useState } from 'react';
import { Briefcase, Zap, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, FileText } from 'lucide-react';
import { extractSkillsFromText } from '../../services/aiEngine';
import { SAMPLE_JOB_DESCRIPTION } from '../../data/mockMarketData';

export default function JobMatcherScreen({ userProfile, onOpenSkillModal }) {
  const [jobText, setJobText] = useState(SAMPLE_JOB_DESCRIPTION);
  const [analyzed, setAnalyzed] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyzeJob = (textToParse) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const extractedJobSkills = extractSkillsFromText(textToParse);
      const userSkillNames = new Set(userProfile.currentSkills.map(s => s.name.toLowerCase()));

      const matched = extractedJobSkills.filter(s => userSkillNames.has(s.name.toLowerCase()));
      const missing = extractedJobSkills.filter(s => !userSkillNames.has(s.name.toLowerCase()));

      const fitScore = extractedJobSkills.length > 0 ? Math.round((matched.length / extractedJobSkills.length) * 100) : 100;

      setAnalyzed({
        extractedJobSkills,
        matched,
        missing,
        fitScore
      });
      setIsAnalyzing(false);
    }, 500);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2">
      {/* Header */}
      <div className="p-6 rounded-2xl glass-panel border-cyan-500/20 bg-gradient-to-br from-slate-900 via-[#0d1e30] to-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <Zap className="w-3.5 h-3.5" /> REAL-TIME JOB DESCRIPTION MATCH ENGINE
          </div>
          <h2 className="text-3xl font-extrabold text-white font-display">Live Job Posting Scanner & Matcher</h2>
          <p className="text-slate-400 text-sm">
            Paste any job description from LinkedIn, Indeed, or company sites. Extract required skills and verify your exact match score instantenously.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Job Description Input */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-slate-400 uppercase">Paste Job Description Text</label>
              <button
                onClick={() => {
                  setJobText(SAMPLE_JOB_DESCRIPTION);
                  handleAnalyzeJob(SAMPLE_JOB_DESCRIPTION);
                }}
                className="text-xs text-cyan-400 hover:underline font-mono"
              >
                Load Sample Job Posting
              </button>
            </div>

            <textarea
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              rows={12}
              placeholder="Paste job posting contents here..."
              className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 focus:border-cyan-500 outline-none leading-relaxed resize-none"
            ></textarea>

            <button
              onClick={() => handleAnalyzeJob(jobText)}
              disabled={isAnalyzing}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4" /> {isAnalyzing ? "Scanning Job Description..." : "Analyze Job Requirements & Candidate Fit"}
            </button>
          </div>
        </div>

        {/* Right Column: Analysis Results */}
        <div className="lg:col-span-6 space-y-6">
          {analyzed ? (
            <div className="p-6 rounded-2xl glass-panel space-y-6 animate-fadeIn">
              {/* Score Header */}
              <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase">Candidate Role Match</div>
                  <div className="text-3xl font-extrabold text-cyan-400 font-display">{analyzed.fitScore}% Fit Score</div>
                </div>
                <div className="text-right text-xs font-mono text-slate-300">
                  <div>{analyzed.matched.length} Matched Skills</div>
                  <div className="text-rose-400">{analyzed.missing.length} Missing Gaps</div>
                </div>
              </div>

              {/* Missing Skills */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  Missing Required Skills for this Job ({analyzed.missing.length})
                </h4>

                {analyzed.missing.map((s, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-rose-500/30 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-200">{s.name}</span>
                    <button
                      onClick={() => onOpenSkillModal(s.name, "Target Job Posting")}
                      className="text-xs font-mono text-cyan-400 hover:underline"
                    >
                      Why Learn? →
                    </button>
                  </div>
                ))}
              </div>

              {/* Matched Skills */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Matched Candidate Skills ({analyzed.matched.length})
                </h4>

                <div className="flex flex-wrap gap-2">
                  {analyzed.matched.map((s, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                      ✓ {s.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-2xl glass-panel text-center text-slate-400 space-y-3 border-dashed border-slate-800">
              <Briefcase className="w-12 h-12 text-slate-600 mx-auto" />
              <h4 className="text-base font-bold text-slate-300">No Job Description Analyzed Yet</h4>
              <p className="text-xs max-w-sm mx-auto">
                Paste a job posting on the left and click "Analyze Job Requirements" to test your candidate fit score.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
