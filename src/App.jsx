import React, { useState, useEffect } from 'react';
import {
  Sparkles, LayoutDashboard, Target, FileText, User, TrendingUp, ShieldAlert,
  DollarSign, Brain, BookOpen, Briefcase, ChevronRight, Menu, X
} from 'lucide-react';

import { INITIAL_USER_PROFILE, TARGET_ROLES } from './data/mockMarketData';
import WelcomeScreen from './components/screens/WelcomeScreen';
import RoleSelectionScreen from './components/screens/RoleSelectionScreen';
import ResumeUploadScreen from './components/screens/ResumeUploadScreen';
import SkillProfileScreen from './components/screens/SkillProfileScreen';
import DashboardScreen from './components/screens/DashboardScreen';
import DemandTrendsScreen from './components/screens/DemandTrendsScreen';
import SkillGapScreen from './components/screens/SkillGapScreen';
import SalaryIntelligenceScreen from './components/screens/SalaryIntelligenceScreen';
import AICareerRecommendationsScreen from './components/screens/AICareerRecommendationsScreen';
import LearningRoadmapScreen from './components/screens/LearningRoadmapScreen';
import JobMatcherScreen from './components/screens/JobMatcherScreen';

import AIExplanationModal from './components/AIExplanationModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('welcome');
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('skillpulse_user_profile');
    return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
  });

  const [modalSkill, setModalSkill] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Save user profile state changes
  useEffect(() => {
    localStorage.setItem('skillpulse_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  const targetRole = TARGET_ROLES.find(r => r.id === userProfile.targetRoleId) || TARGET_ROLES[0];

  const handleOpenSkillModal = (skillName) => {
    setModalSkill(skillName);
  };

  const navItems = [
    { id: 'welcome', label: 'Welcome / Onboarding', icon: Sparkles },
    { id: 'role-selection', label: 'Career Goal Selection', icon: Target },
    { id: 'resume-analysis', label: 'Resume Skill Extractor', icon: FileText },
    { id: 'skill-profile', label: 'Skill Profile Matrix', icon: User },
    { id: 'dashboard', label: 'Market Dashboard', icon: LayoutDashboard },
    { id: 'demand-trends', label: 'Skill Demand Trends', icon: TrendingUp },
    { id: 'gap-analysis', label: 'Skill-Gap Analysis', icon: ShieldAlert },
    { id: 'salary-intelligence', label: 'Salary Intelligence', icon: DollarSign },
    { id: 'ai-recommendations', label: 'AI Career Recommendations', icon: Brain },
    { id: 'learning-roadmap', label: 'Learning Roadmap', icon: BookOpen },
    { id: 'job-matcher', label: 'Job Description Matcher', icon: Briefcase }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans selection:bg-[#4285F4] selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div
            onClick={() => setActiveTab('welcome')}
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#4285F4] via-[#34A853] to-[#FBBC05] flex items-center justify-center text-white shadow-md shadow-blue-500/15 group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="text-lg font-extrabold font-display tracking-tight text-slate-900 flex items-center gap-1.5">
                SkillPulse <span className="text-[#4285F4] font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#4285F4]/10 border border-[#4285F4]/20">SOUTH INDIA</span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Job Market Intelligence & Skill-Gap Predictor</div>
            </div>
          </div>
        </div>

        {/* Current Active Goal Badge */}
        <div className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-xl bg-white/90 border border-slate-200 text-xs shadow-xs">
          <span className="text-slate-500 font-mono">Target Role:</span>
          <span className="font-bold text-[#4285F4]">{targetRole.title}</span>
          <span className="text-slate-300">•</span>
          <span className="text-[#34A853] font-mono font-bold">{userProfile.currentSkills.length} Verified Skills</span>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Main Secondary Sub-header Navigation Bar */}
      <div className="bg-white/60 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-2 overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max max-w-7xl mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#4285F4] font-bold shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#4285F4]" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 px-4 lg:px-8 py-6 max-w-7xl mx-auto w-full">
        {activeTab === 'welcome' && (
          <WelcomeScreen
            onStart={(tab) => setActiveTab(tab)}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
          />
        )}
        {activeTab === 'role-selection' && (
          <RoleSelectionScreen
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        )}
        {activeTab === 'resume-analysis' && (
          <ResumeUploadScreen
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        )}
        {activeTab === 'skill-profile' && (
          <SkillProfileScreen
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        )}
        {activeTab === 'dashboard' && (
          <DashboardScreen
            userProfile={userProfile}
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenSkillModal={handleOpenSkillModal}
          />
        )}
        {activeTab === 'demand-trends' && (
          <DemandTrendsScreen
            onOpenSkillModal={handleOpenSkillModal}
            targetRoleTitle={targetRole.title}
          />
        )}
        {activeTab === 'gap-analysis' && (
          <SkillGapScreen
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenSkillModal={handleOpenSkillModal}
          />
        )}
        {activeTab === 'salary-intelligence' && (
          <SalaryIntelligenceScreen
            userProfile={userProfile}
            setUserProfile={setUserProfile}
          />
        )}
        {activeTab === 'ai-recommendations' && (
          <AICareerRecommendationsScreen
            userProfile={userProfile}
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenSkillModal={handleOpenSkillModal}
          />
        )}
        {activeTab === 'learning-roadmap' && (
          <LearningRoadmapScreen
            userProfile={userProfile}
          />
        )}
        {activeTab === 'job-matcher' && (
          <JobMatcherScreen
            userProfile={userProfile}
            onOpenSkillModal={handleOpenSkillModal}
          />
        )}
      </main>

      {/* AI Explanation Modal */}
      {modalSkill && (
        <AIExplanationModal
          skillName={modalSkill}
          targetRoleTitle={targetRole.title}
          onClose={() => setModalSkill(null)}
          onAddToRoadmap={() => setActiveTab('learning-roadmap')}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 px-4 text-center text-xs text-slate-500 bg-[#04101d]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-300">SkillPulse AI</span> • AI-Powered Job Market Intelligence Platform
          </div>
          <div>Continuously analyzing 250,000+ real-time tech job postings</div>
        </div>
      </footer>
    </div>
  );
}
