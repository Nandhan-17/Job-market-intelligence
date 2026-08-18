// SkillPulse AI Core Engine
// India + South India Market Intelligence
// Skill Extraction, Skill Gap, Salary Intelligence,
// Demand Forecasting, AI Recommendations & Learning Roadmap

import {
  TARGET_ROLES,
  ALL_SKILLS_DATABASE
} from "../data/mockMarketData";

/* =========================================================
   INDIA / SOUTH INDIA MARKET CONFIGURATION
========================================================= */

const INDIA_LOCATIONS = {
  "Tamil Nadu": {
    multiplier: 1.0,
    cities: [
      "Chennai",
      "Coimbatore",
      "Madurai",
      "Tiruchirappalli",
      "Salem",
      "Tirunelveli",
      "Thanjavur"
    ]
  },

  Karnataka: {
    multiplier: 1.18,
    cities: [
      "Bengaluru",
      "Mysuru",
      "Mangaluru",
      "Hubballi"
    ]
  },

  Kerala: {
    multiplier: 0.96,
    cities: [
      "Kochi",
      "Thiruvananthapuram",
      "Kozhikode",
      "Thrissur"
    ]
  },

  Telangana: {
    multiplier: 1.10,
    cities: [
      "Hyderabad",
      "Warangal",
      "Nizamabad"
    ]
  },

  "Andhra Pradesh": {
    multiplier: 0.94,
    cities: [
      "Visakhapatnam",
      "Vijayawada",
      "Tirupati",
      "Guntur"
    ]
  },

  "South India": {
    multiplier: 1.05,
    cities: [
      "Chennai",
      "Bengaluru",
      "Hyderabad",
      "Kochi",
      "Coimbatore",
      "Thiruvananthapuram"
    ]
  },

  India: {
    multiplier: 1.0,
    cities: [
      "Chennai",
      "Bengaluru",
      "Hyderabad",
      "Mumbai",
      "Delhi",
      "Pune",
      "Kochi"
    ]
  }
};


/* =========================================================
   CURRENCY HELPERS
========================================================= */

export function formatINR(amount) {
  const numericAmount = Number(amount) || 0;

  return `₹${numericAmount.toLocaleString("en-IN")}`;
}

export function formatINRLakh(amount) {
  const numericAmount = Number(amount) || 0;

  if (numericAmount >= 10000000) {
    return `₹${(numericAmount / 10000000).toFixed(2)} Cr`;
  }

  if (numericAmount >= 100000) {
    return `₹${(numericAmount / 100000).toFixed(2)} L`;
  }

  return formatINR(numericAmount);
}


/* =========================================================
   LOCATION HELPERS
========================================================= */

function normalizeLocation(location = "") {
  return location.toLowerCase().trim();
}

function getIndiaLocationData(location = "India") {
  const normalized = normalizeLocation(location);

  if (
    normalized.includes("chennai") ||
    normalized.includes("coimbatore") ||
    normalized.includes("madurai") ||
    normalized.includes("trichy") ||
    normalized.includes("tiruchirappalli") ||
    normalized.includes("salem") ||
    normalized.includes("tirunelveli") ||
    normalized.includes("thanjavur") ||
    normalized.includes("tamil nadu") ||
    normalized.includes("tamilnadu")
  ) {
    return {
      state: "Tamil Nadu",
      multiplier: INDIA_LOCATIONS["Tamil Nadu"].multiplier
    };
  }

  if (
    normalized.includes("bangalore") ||
    normalized.includes("bengaluru") ||
    normalized.includes("mysuru") ||
    normalized.includes("mangalore") ||
    normalized.includes("mangaluru") ||
    normalized.includes("karnataka")
  ) {
    return {
      state: "Karnataka",
      multiplier: INDIA_LOCATIONS.Karnataka.multiplier
    };
  }

  if (
    normalized.includes("kochi") ||
    normalized.includes("kerala") ||
    normalized.includes("thiruvananthapuram") ||
    normalized.includes("trivandrum") ||
    normalized.includes("kozhikode")
  ) {
    return {
      state: "Kerala",
      multiplier: INDIA_LOCATIONS.Kerala.multiplier
    };
  }

  if (
    normalized.includes("hyderabad") ||
    normalized.includes("telangana")
  ) {
    return {
      state: "Telangana",
      multiplier: INDIA_LOCATIONS.Telangana.multiplier
    };
  }

  if (
    normalized.includes("visakhapatnam") ||
    normalized.includes("vijayawada") ||
    normalized.includes("tirupati") ||
    normalized.includes("andhra")
  ) {
    return {
      state: "Andhra Pradesh",
      multiplier: INDIA_LOCATIONS["Andhra Pradesh"].multiplier
    };
  }

  if (normalized.includes("south india")) {
    return {
      state: "South India",
      multiplier: INDIA_LOCATIONS["South India"].multiplier
    };
  }

  return {
    state: "India",
    multiplier: INDIA_LOCATIONS.India.multiplier
  };
}


/* =========================================================
   SKILL ALIASES
========================================================= */

function getSkillAliases(skillName) {
  const map = {
    React: [
      "reactjs",
      "react.js"
    ],

    "Node.js": [
      "nodejs",
      "node"
    ],

    TypeScript: [
      "typescript",
      "ts"
    ],

    "JavaScript (ES6+)": [
      "javascript",
      "js",
      "es6",
      "ecmascript"
    ],

    PostgreSQL: [
      "postgres",
      "postgresql"
    ],

    AWS: [
      "amazon web services",
      "aws cloud"
    ],

    Python: [
      "python3",
      "py"
    ],

    "Tailwind CSS": [
      "tailwindcss",
      "tailwind"
    ],

    "Machine Learning": [
      "machine learning",
      "ml"
    ],

    "Vector Databases": [
      "vector database",
      "vector databases",
      "pinecone",
      "qdrant",
      "chroma"
    ],

    LangChain: [
      "langchain"
    ],

    "Next.js": [
      "nextjs",
      "next.js"
    ],

    SQL: [
      "structured query language",
      "mysql",
      "postgresql",
      "sql"
    ],

    Docker: [
      "docker container",
      "docker containers"
    ],

    Kubernetes: [
      "k8s"
    ],

    "REST API": [
      "rest api",
      "restful api",
      "restful apis",
      "api architecture"
    ],

    "CI/CD": [
      "ci/cd",
      "continuous integration",
      "continuous deployment",
      "continuous delivery"
    ],

    Git: [
      "github",
      "gitlab",
      "version control"
    ]
  };

  return map[skillName] || [];
}


/* =========================================================
   TEXT SKILL EXTRACTION
========================================================= */

export function extractSkillsFromText(rawText) {
  if (!rawText || typeof rawText !== "string") {
    return [];
  }

  const textLower = rawText.toLowerCase();

  const extracted = [];

  ALL_SKILLS_DATABASE.forEach((skill) => {
    const nameLower = skill.name.toLowerCase();

    let matched = false;
    let confidence = 0.85;

    /* Direct skill match */

    if (textLower.includes(nameLower)) {
      matched = true;
    }

    /* Alias match */

    if (!matched) {
      const aliases = getSkillAliases(skill.name);

      for (const alias of aliases) {
        if (textLower.includes(alias.toLowerCase())) {
          matched = true;
          break;
        }
      }
    }

    if (!matched) {
      return;
    }

    /* ==========================================
       PROFICIENCY DETECTION
    ========================================== */

    let level = skill.level || 3;

    const advancedIndicators = [
      `senior ${nameLower}`,
      `lead ${nameLower}`,
      `expert ${nameLower}`,
      `advanced ${nameLower}`,
      `proficient in ${nameLower}`,
      `proficiency in ${nameLower}`
    ];

    const beginnerIndicators = [
      `basics of ${nameLower}`,
      `${nameLower} basics`,
      `basic ${nameLower}`,
      `familiar with ${nameLower}`,
      `beginner ${nameLower}`
    ];

    if (
      advancedIndicators.some((phrase) =>
        textLower.includes(phrase)
      )
    ) {
      level = 5;
      confidence = 0.95;
    } else if (
      beginnerIndicators.some((phrase) =>
        textLower.includes(phrase)
      )
    ) {
      level = 2;
      confidence = 0.75;
    }

    extracted.push({
      ...skill,
      level,
      confidence: Math.round(confidence * 100),
      extractedFrom: textLower.includes("resume")
        ? "Resume Text"
        : "Text Parser"
    });
  });

  return extracted;
}


/* =========================================================
   SKILL MATCH HELPER
========================================================= */

function hasSkill(userSkillNames, requiredSkill) {
  const required = requiredSkill.toLowerCase();

  if (userSkillNames.has(required)) {
    return true;
  }

  const aliases = getSkillAliases(requiredSkill);

  return aliases.some((alias) =>
    userSkillNames.has(alias.toLowerCase())
  );
}


/* =========================================================
   SKILL GAP SCORE
========================================================= */

export function calculateSkillGapScore(
  userSkills = [],
  targetRoleId
) {
  const role =
    TARGET_ROLES.find(
      (r) => r.id === targetRoleId
    ) || TARGET_ROLES[0];

  const userSkillNames = new Set(
    (userSkills || [])
      .filter(Boolean)
      .map((s) => s.name?.toLowerCase())
      .filter(Boolean)
  );

  const required = role.requiredSkills || [];
  const recommended = role.recommendedSkills || [];
  const emerging = role.emergingSkills || [];

  const matchedRequired = required.filter((skill) =>
    hasSkill(userSkillNames, skill)
  );

  const missingRequired = required.filter(
    (skill) =>
      !hasSkill(userSkillNames, skill)
  );

  const matchedRecommended = recommended.filter((skill) =>
    hasSkill(userSkillNames, skill)
  );

  const missingRecommended = recommended.filter(
    (skill) =>
      !hasSkill(userSkillNames, skill)
  );

  const matchedEmerging = emerging.filter((skill) =>
    hasSkill(userSkillNames, skill)
  );

  const missingEmerging = emerging.filter(
    (skill) =>
      !hasSkill(userSkillNames, skill)
  );

  /* ==========================================
     WEIGHTED SCORE
     Required = 60%
     Recommended = 30%
     Emerging = 10%
  ========================================== */

  const reqScore =
    required.length > 0
      ? (matchedRequired.length / required.length) * 60
      : 60;

  const recScore =
    recommended.length > 0
      ? (matchedRecommended.length / recommended.length) * 30
      : 30;

  const emgScore =
    emerging.length > 0
      ? (matchedEmerging.length / emerging.length) * 10
      : 10;

  const totalScore = Math.min(
    100,
    Math.round(
      reqScore +
      recScore +
      emgScore
    )
  );

  /* ==========================================
     READINESS LEVEL
  ========================================== */

  let readinessLevel = "Developing Candidate";
  let badgeColor =
    "text-amber-400 border-amber-400/30 bg-amber-400/10";

  if (totalScore >= 85) {
    readinessLevel = "Job Ready (High Match)";
    badgeColor =
      "text-emerald-400 border-emerald-400/30 bg-emerald-400/10";
  } else if (totalScore >= 65) {
    readinessLevel = "Competitive Candidate";
    badgeColor =
      "text-cyan-400 border-cyan-400/30 bg-cyan-400/10";
  } else if (totalScore < 45) {
    readinessLevel = "Foundational Stage";
    badgeColor =
      "text-rose-400 border-rose-400/30 bg-rose-400/10";
  }

  /* ==========================================
     MISSING SKILL DETAILS
  ========================================== */

  const missingSkillDetails = [
    ...missingRequired,
    ...missingRecommended,
    ...missingEmerging
  ].map((name) => {
    const dbSkill =
      ALL_SKILLS_DATABASE.find(
        (skill) =>
          skill.name.toLowerCase() ===
          name.toLowerCase()
      );

    const boost =
      dbSkill?.salaryBoost || 10000;

    let priority = "Emerging";

    if (missingRequired.includes(name)) {
      priority = "Critical";
    } else if (
      missingRecommended.includes(name)
    ) {
      priority = "Recommended";
    }

    return {
      name,
      priority,
      salaryBoost: boost,
      demandTrend:
        dbSkill?.demandTrend || "+25%",
      velocity:
        dbSkill?.velocity || "Growing",
      category:
        dbSkill?.category || "Technical Skill",
      description:
        dbSkill?.description ||
        `Key skill required for ${role.title}`
    };
  });

  /* ==========================================
     TOP 3 SKILL SALARY POTENTIAL
  ========================================== */

  const topMissingSkills =
    missingSkillDetails.slice(0, 3);

  const totalBoostPotential =
    topMissingSkills.reduce(
      (total, skill) =>
        total + skill.salaryBoost,
      0
    );

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

    topMissingSkills,

    totalBoostPotential,

    scoreBreakdown: {
      required: Math.round(reqScore),
      recommended: Math.round(recScore),
      emerging: Math.round(emgScore)
    }
  };
}


/* =========================================================
   INDIA SALARY INTELLIGENCE
========================================================= */

export function predictSalary(
  roleId,
  experienceYears = 1,
  location = "Chennai, Tamil Nadu",
  userSkills = []
) {
  const role =
    TARGET_ROLES.find(
      (r) => r.id === roleId
    ) || TARGET_ROLES[0];

  /*
    Original mock salary values are USD.
    Convert the market baseline into an
    India-oriented INR equivalent.
  */

  const baseINR =
    role.minSalary +
    (role.maxSalary - role.minSalary) * 0.35;

  const indiaBaseSalary = baseINR;

  const locationData =
    getIndiaLocationData(location);

  const locationMultiplier =
    locationData.multiplier;

  /* ==========================================
     EXPERIENCE
  ========================================== */

  const safeExperience =
    Math.max(
      0,
      Number(experienceYears) || 0
    );

  const experienceMultiplier =
    1 +
    Math.min(
      safeExperience * 0.08,
      0.80
    );

  /* ==========================================
     SKILL BONUS
  ========================================== */

  let skillBonus = 0;

  (userSkills || []).forEach((userSkill) => {
    if (!userSkill?.name) return;

    const dbSkill =
      ALL_SKILLS_DATABASE.find(
        (skill) =>
          skill.name.toLowerCase() ===
          userSkill.name.toLowerCase()
      );

    if (dbSkill) {
      skillBonus += (dbSkill.salaryBoost || 50000) * 0.35;
    }
  });

  const estimatedSalary = Math.round(
    (
      indiaBaseSalary *
      experienceMultiplier *
      locationMultiplier
    ) +
    skillBonus
  );

  const minPredicted =
    Math.round(
      estimatedSalary * 0.88
    );

  const maxPredicted =
    Math.round(
      estimatedSalary * 1.18
    );

  return {
    estimatedSalary:
      formatINR(estimatedSalary),

    estimatedSalaryValue:
      estimatedSalary,

    range:
      `${formatINR(minPredicted)} - ${formatINR(maxPredicted)}`,

    minSalary:
      minPredicted,

    maxSalary:
      maxPredicted,

    baseSalary:
      Math.round(indiaBaseSalary),

    baseSalaryFormatted:
      formatINR(
        Math.round(indiaBaseSalary)
      ),

    skillBonus:
      Math.round(skillBonus),

    skillBonusFormatted:
      formatINR(
        Math.round(skillBonus)
      ),

    locationMultiplier,

    locationState:
      locationData.state,

    currency: "INR",

    currencySymbol: "₹",

    market:
      "India / South India"
  };
}


/* =========================================================
   DEMAND TREND FORECAST
========================================================= */

export function forecastDemand(
  skillName
) {
  const skill =
    ALL_SKILLS_DATABASE.find(
      (s) =>
        s.name.toLowerCase() ===
        skillName.toLowerCase()
    );

  if (!skill) {
    return {
      skillName,
      demandTrend: "+25%",
      velocity: "Growing",
      openings: 0,
      forecast: "Positive",
      market: "India"
    };
  }

  const trendValue =
    parseFloat(
      String(skill.demandTrend)
        .replace("%", "")
    ) || 0;

  let forecast = "Stable";

  if (trendValue >= 50) {
    forecast = "Explosive Growth";
  } else if (trendValue >= 20) {
    forecast = "Strong Growth";
  } else if (trendValue > 0) {
    forecast = "Moderate Growth";
  } else {
    forecast = "Declining";
  }

  return {
    skillName: skill.name,

    category: skill.category,

    demandTrend:
      skill.demandTrend,

    velocity:
      skill.velocity,

    trendValue,

    forecast,

    openings:
      skill.openings,

    openingsFormatted:
      skill.openings.toLocaleString("en-IN"),

    market:
      "India",

    region:
      "South India"
  };
}


/* =========================================================
   AI SKILL EXPLANATION
========================================================= */

export function generateAIExplanation(
  skillName,
  targetRoleTitle
) {
  const skill =
    ALL_SKILLS_DATABASE.find(
      (s) =>
        s.name.toLowerCase() ===
        skillName.toLowerCase()
    ) || {
      name: skillName,
      category: "Technical Skill",
      demandTrend: "+35%",
      velocity: "Growing",
      salaryBoost: 14500,
      openings: 24000,
      description:
        "High demand industry technology."
    };

  const salaryBoostINR =
    Math.round(
      skill.salaryBoost *
      84 *
      0.12
    );

  return {
    skillName: skill.name,

    category:
      skill.category,

    marketDemandVelocity:
      skill.velocity,

    demandGrowth:
      skill.demandTrend,

    estimatedSalaryBump:
      formatINR(salaryBoostINR) +
      "/year",

    estimatedSalaryBumpValue:
      salaryBoostINR,

    jobOpeningsCount:
      skill.openings.toLocaleString(
        "en-IN"
      ),

    overview:
      `Learning ${skill.name} directly bridges a key competency gap for ${
        targetRoleTitle ||
        "your target role"
      } in the Indian technology market.`,

    whyCrucial: [
      `${Math.round(
        skill.openings * 0.7
      ).toLocaleString(
        "en-IN"
      )}+ relevant job opportunities are represented by this market signal.`,

      `${skill.name} can improve your earning potential by approximately ${formatINR(
        salaryBoostINR
      )} per year depending on role, experience and location.`,

      `Current demand trajectory shows ${skill.demandTrend} growth, making ${skill.name} a valuable skill for the next 12-24 months.`
    ],

    recommendedProjects: [
      `Build a practical ${skill.name} project and deploy it live.`,

      `Integrate ${skill.name} into your existing portfolio project to demonstrate real-world proficiency.`,

      `Create a GitHub project with documentation, screenshots and measurable results.`
    ],

    topLearningResources: [
      {
        name:
          "Official Documentation & Interactive Tutorials",
        type: "Free",
        duration: "1-2 Weeks"
      },
      {
        name:
          "Production Mastery Crash Course",
        type: "Video Guide",
        duration: "10 Hours"
      }
    ],

    market: "India",
    region: "South India"
  };
}


/* =========================================================
   AI RECOMMENDED SKILLS
========================================================= */

export function generateAIRecommendations(
  userSkills = [],
  targetRoleId
) {
  const gapData =
    calculateSkillGapScore(
      userSkills,
      targetRoleId
    );

  return gapData.missingSkillDetails
    .slice(0, 6)
    .map((skill, index) => ({
      ...skill,

      rank: index + 1,

      reason:
        skill.priority === "Critical"
          ? `Critical requirement for ${gapData.role.title}.`
          : skill.priority === "Recommended"
          ? `Recommended skill to improve your competitiveness.`
          : `Emerging technology that can strengthen your future readiness.`,

      recommendationScore:
        Math.max(
          95 - index * 8,
          55
        ),

      salaryImpact:
        formatINR(
          Math.round(
            skill.salaryBoost *
            84 *
            0.12
          )
        )
    }));
}


/* =========================================================
   PERSONALIZED LEARNING ROADMAP
========================================================= */

export function generateLearningRoadmap(
  userSkills = [],
  targetRoleId
) {
  const gapData =
    calculateSkillGapScore(
      userSkills,
      targetRoleId
    );

  const missing =
    gapData.missingSkillDetails;

  const phase1Skills =
    missing
      .slice(0, 2)
      .map((s) => s.name);

  const phase2Skills =
    missing
      .slice(2, 4)
      .map((s) => s.name);

  const phase3Skills =
    missing
      .slice(4, 6)
      .map((s) => s.name);

  const phases = [
    {
      phase: 1,

      title:
        "Phase 1: Core Foundation Gaps",

      estimatedWeeks:
        "Weeks 1 - 3",

      status:
        "In Progress",

      skillsToFocus:
        phase1Skills,

      milestones: [
        "Master core concepts and practical fundamentals.",
        "Build 2 mini-projects implementing the selected skills.",
        "Pass a skill self-assessment test with >80% score."
      ]
    },

    {
      phase: 2,

      title:
        "Phase 2: Architectural Integration & Frameworks",

      estimatedWeeks:
        "Weeks 4 - 6",

      status:
        "Upcoming",

      skillsToFocus:
        phase2Skills,

      milestones: [
        "Connect applications with backend systems, databases and APIs.",
        "Implement authentication, error handling and performance optimization.",
        "Deploy the application using a basic CI/CD workflow."
      ]
    },

    {
      phase: 3,

      title:
        "Phase 3: Advanced Cloud & System Scaling",

      estimatedWeeks:
        "Weeks 7 - 9",

      status:
        "Upcoming",

      skillsToFocus:
        phase3Skills,

      milestones: [
        "Containerize the application using Docker.",
        "Implement monitoring, logging and automated testing.",
        "Optimize database queries and application performance."
      ]
    },

    {
      phase: 4,

      title:
        "Phase 4: Industry Portfolio Capstone",

      estimatedWeeks:
        "Weeks 10 - 12",

      status:
        "Upcoming",

      skillsToFocus: [
        "End-to-End Capstone Architecture"
      ],

      milestones: [
        "Build and launch a production-style project.",
        "Publish the project on GitHub with a professional README.",
        "Prepare the project for recruiter and technical interview presentation."
      ]
    }
  ];

  return {
    targetRole:
      gapData.role.title,

    currentScore:
      gapData.totalScore,

    readinessLevel:
      gapData.readinessLevel,

    estimatedTotalWeeks:
      12,

    phases
  };
}


/* =========================================================
   PROFILE MARKET SUMMARY
========================================================= */

export function generateProfileMarketSummary(
  userSkills = [],
  targetRoleId,
  location = "Chennai, Tamil Nadu",
  experienceYears = 1
) {
  const gapData =
    calculateSkillGapScore(
      userSkills,
      targetRoleId
    );

  const salary =
    predictSalary(
      targetRoleId,
      experienceYears,
      location,
      userSkills
    );

  const recommendations =
    generateAIRecommendations(
      userSkills,
      targetRoleId
    );

  return {
    targetRole:
      gapData.role.title,

    readinessScore:
      gapData.totalScore,

    readinessLevel:
      gapData.readinessLevel,

    location,

    locationState:
      salary.locationState,

    salary,

    matchedSkills:
      [
        ...gapData.matchedRequired,
        ...gapData.matchedRecommended
      ],

    missingSkills:
      gapData.missingSkillDetails,

    aiRecommendations:
      recommendations,

    market:
      "India",

    region:
      "South India"
  };
}


/* =========================================================
   DASHBOARD MARKET SNAPSHOT
========================================================= */

export function generateMarketSnapshot(
  targetRoleId
) {
  const role =
    TARGET_ROLES.find(
      (r) => r.id === targetRoleId
    ) || TARGET_ROLES[0];

  const salaryBase =
    Math.round(
      (
        role.minSalary +
        (role.maxSalary - role.minSalary) *
          0.35
      ) *
      84 *
      0.12
    );

  return {
    role:
      role.title,

    demandIndex:
      role.demandIndex,

    growthRate:
      role.growthRate,

    openingsCount:
      role.openingsCount,

    openingsFormatted:
      role.openingsCount.toLocaleString(
        "en-IN"
      ),

    estimatedSalary:
      formatINR(salaryBase),

    currency:
      "INR",

    currencySymbol:
      "₹",

    market:
      "India",

    region:
      "South India",

    states: [
      "Tamil Nadu",
      "Karnataka",
      "Kerala",
      "Telangana",
      "Andhra Pradesh"
    ]
  };
}
