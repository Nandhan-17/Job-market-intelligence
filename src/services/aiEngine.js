// SkillPulse AI Core Engine: Skill Extraction, Gap Scoring, Salary & Demand Forecasting
import { TARGET_ROLES, ALL_SKILLS_DATABASE } from '../data/mockMarketData';

/**
 * Extracts skills from raw text (Resume or Job Description) using NLP keyword matching & taxonomy scanning.
 */
export function extractSkillsFromText(rawText) {
  if (!rawText || typeof rawText !== 'string') return [];

  const textLower = rawText.toLowerCase();
  const extracted = [];

  ALL_SKILLS_DATABASE.forEach(skill => {
    const nameLower = skill.name.toLowerCase();
    
    // Check direct name match or variant matches
    let matched = false;
    let confidence = 0.85;

    if (textLower.includes(nameLower)) {
      matched = true;
    } else {
      // Common alias matching
      const aliases = getSkillAliases(skill.name);
      for (const alias of aliases) {
        if (textLower.includes(alias.toLowerCase())) {
          matched = true;
          break;
        }
      }
    }

    if (matched) {
      // Determine proficiency based on context clues
      let level = 3;
      if (textLower.includes(`senior ${nameLower}`) || textLower.includes(`lead ${nameLower}`) || textLower.includes(`expert ${nameLower}`)) {
        level = 5;
        confidence = 0.95;
      } else if (textLower.includes(`basics of ${nameLower}`) || textLower.includes(`${nameLower} basics`) || textLower.includes(`familiar with ${nameLower}`)) {
        level = 2;
        confidence = 0.75;
      }

      extracted.push({
        ...skill,
        level,
        confidence: Math.round(confidence * 100),
        extractedFrom: textLower.includes("resume") ? "Resume Text" : "Text Parser"
      });
    }
  });

  return extracted;
}

/**
 * Helper to return common aliases for tech terms
 */
function getSkillAliases(skillName) {
  const map = {
    "React": ["reactjs", "react.js"],
    "Node.js": ["nodejs", "node"],
    "TypeScript": ["ts"],
    "JavaScript (ES6+)": ["javascript", "js", "es6"],
    "PostgreSQL": ["postgres", "postgresql"],
    "AWS": ["amazon web services", "aws cloud"],
    "Python": ["python3", "py"],
    "Tailwind CSS": ["tailwindcss", "tailwind"],
    "Machine Learning": ["ml"],
    "Vector Databases": ["pinecone", "qdrant", "chroma"],
    "LangChain": ["langchain"],
    "Next.js": ["nextjs", "next.js"]
  };
  return map[skillName] || [];
}

/**
 * Computes Skill Gap Score & Breakdown for a target role vs user profile
 */
export function calculateSkillGapScore(userSkills, targetRoleId) {
  const role = TARGET_ROLES.find(r => r.id === targetRoleId) || TARGET_ROLES[0];
  const userSkillNames = new Set((userSkills || []).map(s => s.name.toLowerCase()));

  const required = role.requiredSkills || [];
  const recommended = role.recommendedSkills || [];
  const emerging = role.emergingSkills || [];

  const matchedRequired = required.filter(s => userSkillNames.has(s.toLowerCase()));
  const missingRequired = required.filter(s => !userSkillNames.has(s.toLowerCase()));

  const matchedRecommended = recommended.filter(s => userSkillNames.has(s.toLowerCase()));
  const missingRecommended = recommended.filter(s => !userSkillNames.has(s.toLowerCase()));

  const matchedEmerging = emerging.filter(s => userSkillNames.has(s.toLowerCase()));
  const missingEmerging = emerging.filter(s => !userSkillNames.has(s.toLowerCase()));

  // Score Calculation (Weighted: Required = 60%, Recommended = 30%, Emerging = 10%)
  const reqScore = required.length > 0 ? (matchedRequired.length / required.length) * 60 : 60;
  const recScore = recommended.length > 0 ? (matchedRecommended.length / recommended.length) * 30 : 30;
  const emgScore = emerging.length > 0 ? (matchedEmerging.length / emerging.length) * 10 : 10;

  const totalScore = Math.min(100, Math.round(reqScore + recScore + emgScore));

  // Determine readiness stage
  let readinessLevel = "Developing Candidate";
  let badgeColor = "text-amber-400 border-amber-400/30 bg-amber-400/10";
  if (totalScore >= 85) {
    readinessLevel = "Job Ready (High Match)";
    badgeColor = "text-emerald-400 border-emerald-400/30 bg-emerald-400/10";
  } else if (totalScore >= 65) {
    readinessLevel = "Competitive Candidate";
    badgeColor = "text-cyan-400 border-cyan-400/30 bg-cyan-400/10";
  } else if (totalScore < 45) {
    readinessLevel = "Foundational Stage";
    badgeColor = "text-rose-400 border-rose-400/30 bg-rose-400/10";
  }

  // Calculate potential salary boost if top 3 missing skills are learned
  let totalBoostPotential = 0;
  const missingSkillDetails = [...missingRequired, ...missingRecommended].map(name => {
    const dbSkill = ALL_SKILLS_DATABASE.find(s => s.name.toLowerCase() === name.toLowerCase());
    const boost = dbSkill ? dbSkill.salaryBoost : 10000;
    totalBoostPotential += boost;
    return {
      name,
      priority: missingRequired.includes(name) ? "Critical" : "Recommended",
      salaryBoost: boost,
      demandTrend: dbSkill ? dbSkill.demandTrend : "+25%",
      description: dbSkill ? dbSkill.description : `Key skill required for ${role.title}`
    };
  });

  return {
    role,
    totalScore,
    readinessLevel,
    badgeColor,
    matchedRequired,
    missingRequired,
    matchedRecommended,
    missingRecommended,
    matchedEmerging,
    missingEmerging,
    missingSkillDetails,
    totalBoostPotential
  };
}

/**
 * Predicts salary based on role, location multiplier, experience, and skill set
 */
export function predictSalary(roleId, experienceYears = 1, location = "San Francisco, CA", userSkills = []) {
  const role = TARGET_ROLES.find(r => r.id === roleId) || TARGET_ROLES[0];
  let baseSalary = role.minSalary + (role.maxSalary - role.minSalary) * 0.35;

  // Location multipliers
  let locMultiplier = 1.0;
  if (location.includes("San Francisco") || location.includes("New York")) locMultiplier = 1.25;
  else if (location.includes("Remote")) locMultiplier = 1.10;
  else if (location.includes("Austin") || location.includes("Seattle")) locMultiplier = 1.15;
  else if (location.includes("India") || location.includes("APAC")) locMultiplier = 0.55;

  // Experience multiplier
  const expMultiplier = 1 + (experienceYears * 0.08);

  // Skill bonus
  let skillBonus = 0;
  userSkills.forEach(s => {
    const dbSkill = ALL_SKILLS_DATABASE.find(d => d.name.toLowerCase() === s.name.toLowerCase());
    if (dbSkill) {
      skillBonus += (dbSkill.salaryBoost * 0.3); // Partial realization based on skills possessed
    }
  });

  const estimatedSalary = Math.round((baseSalary * expMultiplier * locMultiplier) + skillBonus);
  const minPredicted = Math.round(estimatedSalary * 0.88);
  const maxPredicted = Math.round(estimatedSalary * 1.18);

  return {
    estimatedSalary: `$${estimatedSalary.toLocaleString()}`,
    range: `$${minPredicted.toLocaleString()} - $${maxPredicted.toLocaleString()}`,
    baseSalary: Math.round(baseSalary),
    skillBonus: Math.round(skillBonus),
    locationMultiplier: locMultiplier
  };
}

/**
 * Generates an AI Explanation ("Why should you learn this skill?")
 */
export function generateAIExplanation(skillName, targetRoleTitle) {
  const skill = ALL_SKILLS_DATABASE.find(s => s.name.toLowerCase() === skillName.toLowerCase()) || {
    name: skillName,
    category: "Technical Skill",
    demandTrend: "+35%",
    velocity: "Exploding",
    salaryBoost: 14500,
    openings: 24000,
    description: "High demand industry technology."
  };

  return {
    skillName: skill.name,
    category: skill.category,
    marketDemandVelocity: skill.velocity,
    demandGrowth: skill.demandTrend,
    estimatedSalaryBump: `$${skill.salaryBoost.toLocaleString()}/yr`,
    jobOpeningsCount: skill.openings.toLocaleString(),
    overview: `Learning ${skill.name} directly bridges a key competency gap for ${targetRoleTitle || "your target role"}.`,
    whyCrucial: [
      `Appears in over ${Math.round(skill.openings * 0.7).toLocaleString()} active job descriptions nationwide.`,
      `Engineers proficient in ${skill.name} command an average +${Math.round(skill.salaryBoost / 1000)}k higher baseline compensation.`,
      `Market trajectory indicates a ${skill.demandTrend} continuous increase in company adoption over the next 12-24 months.`
    ],
    recommendedProjects: [
      `Build a microservice utilizing ${skill.name} and host it live on cloud infrastructure.`,
      `Integrate ${skill.name} into your current portfolio project to demonstrate end-to-end proficiency.`
    ],
    topLearningResources: [
      { name: "Official Documentation & Interactive Tutorials", type: "Free", duration: "1-2 Weeks" },
      { name: "Production Mastery Crash Course", type: "Video Guide", duration: "10 Hours" }
    ]
  };
}

/**
 * Generates a step-by-step Personalized Learning Roadmap
 */
export function generateLearningRoadmap(userSkills, targetRoleId) {
  const gapData = calculateSkillGapScore(userSkills, targetRoleId);
  const missing = gapData.missingSkillDetails;

  const phases = [
    {
      phase: 1,
      title: "Phase 1: Core Foundation Gaps",
      estimatedWeeks: "Weeks 1 - 3",
      status: "In Progress",
      skillsToFocus: missing.slice(0, 2).map(s => s.name),
      milestones: [
        "Master syntax, core paradigms, and CLI toolchains.",
        "Build 2 mini-projects implementing fundamental concepts.",
        "Pass skill self-assessment test with >80% score."
      ]
    },
    {
      phase: 2,
      title: "Phase 2: Architectural Integration & Frameworks",
      estimatedWeeks: "Weeks 4 - 6",
      status: "Upcoming",
      skillsToFocus: missing.slice(2, 4).map(s => s.name),
      milestones: [
        "Connect client applications with backend database systems and APIs.",
        "Implement authentication, error handling, and performance caching.",
        "Deploy application to staging environments using CI/CD."
      ]
    },
    {
      phase: 3,
      title: "Phase 3: Advanced Cloud & System Scaling",
      estimatedWeeks: "Weeks 7 - 9",
      status: "Upcoming",
      skillsToFocus: missing.slice(4, 6).map(s => s.name),
      milestones: [
        "Containerize microservices with Docker & Kubernetes.",
        "Implement monitoring, logging, and automated testing suites.",
        "Optimize cloud database queries and vector indexes."
      ]
    },
    {
      phase: 4,
      title: "Phase 4: Industry Portfolio Capstone",
      estimatedWeeks: "Weeks 10 - 12",
      status: "Upcoming",
      skillsToFocus: ["End-to-End Capstone Architecture"],
      milestones: [
        "Architect and launch a production-grade full-stack project.",
        "Publish open-source repository with comprehensive README and documentation.",
        "Perform mock AI technical interviews & showcase portfolio to recruiters."
      ]
    }
  ];

  return {
    targetRole: gapData.role.title,
    currentScore: gapData.totalScore,
    estimatedTotalWeeks: 12,
    phases
  };
}
