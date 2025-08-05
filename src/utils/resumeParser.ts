export interface PersonalInfo {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
}

export interface Experience {
  title: string;
  company?: string;
  duration?: string;
  location?: string;
  description: string[];
  technologies?: string[];
}

export interface Education {
  degree: string;
  field: string;
  institution?: string;
  year?: string;
  gpa?: string;
}

export interface ScoreBreakdown {
  personalInfo: number;
  skills: number;
  experience: number;
  education: number;
  formatting: number;
  keywords: number;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  skills: { [category: string]: string[] };
  experience: Experience[];
  education: Education[];
  atsScore: number;
  scoreBreakdown: ScoreBreakdown;
  recommendations: string[];
  wordCount: number;
  skillsCount: number;
  experienceCount: number;
  yearsExperience: number;
  rawText: string;
}

// Enhanced skills database
const skillsDatabase = {
  'Programming Languages': [
    'python', 'java', 'javascript', 'typescript', 'c++', 'c#', 'ruby', 'php', 'go', 'rust',
    'scala', 'kotlin', 'swift', 'r', 'matlab', 'perl', 'lua', 'dart', 'elixir', 'clojure'
  ],
  'Web Development': [
    'react', 'angular', 'vue', 'svelte', 'node.js', 'express', 'django', 'flask', 'fastapi',
    'spring', 'laravel', 'rails', 'html', 'css', 'sass', 'less', 'bootstrap', 'tailwind',
    'material-ui', 'next.js', 'nuxt.js', 'gatsby', 'webpack', 'vite'
  ],
  'Data Science': [
    'pandas', 'numpy', 'scikit-learn', 'tensorflow', 'pytorch', 'keras', 'matplotlib',
    'seaborn', 'plotly', 'jupyter', 'tableau', 'power bi', 'apache spark', 'hadoop',
    'dask', 'xgboost', 'lightgbm', 'catboost', 'mlflow', 'airflow', 'kubeflow'
  ],
  'Databases': [
    'mysql', 'postgresql', 'mongodb', 'redis', 'elasticsearch', 'cassandra', 'oracle',
    'sqlite', 'dynamodb', 'neo4j', 'influxdb', 'firebase', 'supabase', 'prisma'
  ],
  'Cloud & DevOps': [
    'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'terraform', 'ansible', 'jenkins',
    'gitlab ci', 'github actions', 'travis ci', 'helm', 'istio', 'prometheus', 'grafana',
    'elk stack', 'datadog', 'new relic', 'consul', 'vault'
  ],
  'AI & Machine Learning': [
    'machine learning', 'deep learning', 'neural networks', 'nlp', 'computer vision',
    'reinforcement learning', 'transformers', 'bert', 'gpt', 'opencv', 'spacy', 'nltk',
    'hugging face', 'langchain', 'llama', 'stable diffusion'
  ],
  'Mobile Development': [
    'react native', 'flutter', 'ionic', 'xamarin', 'swift', 'kotlin', 'objective-c',
    'android studio', 'xcode', 'cordova', 'phonegap'
  ],
  'Soft Skills': [
    'leadership', 'communication', 'teamwork', 'problem-solving', 'analytical thinking',
    'creative thinking', 'project management', 'agile', 'scrum', 'kanban', 'mentoring',
    'cross-functional collaboration', 'stakeholder management', 'strategic planning'
  ],
  'Tools & Platforms': [
    'git', 'github', 'gitlab', 'bitbucket', 'jira', 'confluence', 'slack', 'microsoft teams',
    'vs code', 'intellij', 'eclipse', 'postman', 'insomnia', 'figma', 'sketch', 'adobe',
    'notion', 'miro', 'lucidchart'
  ]
};

// Extract text from different file types
const extractTextFromFile = async (file: File): Promise<string> => {
  const fileType = file.type;
  
  if (fileType === 'text/plain') {
    return await file.text();
  } else if (fileType === 'application/pdf') {
    // For PDF files, we'll simulate text extraction
    // In a real implementation, you'd use a library like pdf-parse or PDF.js
    return await file.text(); // Simplified for demo
  } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    // For DOCX files, similar approach
    return await file.text(); // Simplified for demo
  }
  
  throw new Error('Unsupported file type');
};

// Extract personal information
const extractPersonalInfo = (text: string): PersonalInfo => {
  const personalInfo: PersonalInfo = {};
  
  // Extract email
  const emailMatch = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
  if (emailMatch) {
    personalInfo.email = emailMatch[0];
  }
  
  // Extract phone
  const phoneMatch = text.match(/(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (phoneMatch) {
    personalInfo.phone = phoneMatch[0];
  }
  
  // Extract LinkedIn
  const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/i);
  if (linkedinMatch) {
    personalInfo.linkedin = `https://${linkedinMatch[0]}`;
  }
  
  // Extract GitHub
  const githubMatch = text.match(/github\.com\/[\w-]+/i);
  if (githubMatch) {
    personalInfo.github = `https://${githubMatch[0]}`;
  }
  
  // Extract name (simplified heuristic)
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  for (const line of lines.slice(0, 5)) {
    if (line.length > 5 && line.length < 50 && /^[A-Za-z\s.-']+$/.test(line.trim())) {
      const words = line.trim().split(/\s+/);
      if (words.length >= 2 && words.length <= 4) {
        personalInfo.name = line.trim();
        break;
      }
    }
  }
  
  return personalInfo;
};

// Extract skills
const extractSkills = (text: string): { [category: string]: string[] } => {
  const foundSkills: { [category: string]: string[] } = {};
  const textLower = text.toLowerCase();
  
  for (const [category, skills] of Object.entries(skillsDatabase)) {
    const categorySkills: string[] = [];
    
    for (const skill of skills) {
      const skillRegex = new RegExp(`\\b${skill.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (skillRegex.test(textLower)) {
        categorySkills.push(skill.charAt(0).toUpperCase() + skill.slice(1));
      }
    }
    
    if (categorySkills.length > 0) {
      foundSkills[category] = [...new Set(categorySkills)]; // Remove duplicates
    }
  }
  
  return foundSkills;
};

// Extract experience (simplified)
const extractExperience = (text: string): Experience[] => {
  const experience: Experience[] = [];
  const lines = text.split('\n');
  
  // Look for job titles and companies
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Simple heuristic: look for lines with dates and assume they're job entries
    if (line.match(/\b(20\d{2}|19\d{2})\b/) && line.length > 10) {
      const exp: Experience = {
        title: line,
        description: []
      };
      
      // Look for bullet points in following lines
      for (let j = i + 1; j < Math.min(i + 10, lines.length); j++) {
        const descLine = lines[j].trim();
        if (descLine.startsWith('•') || descLine.startsWith('-') || descLine.startsWith('*')) {
          exp.description.push(descLine.substring(1).trim());
        } else if (descLine.length === 0) {
          break;
        }
      }
      
      experience.push(exp);
      if (experience.length >= 5) break; // Limit to 5 entries
    }
  }
  
  return experience;
};

// Extract education (simplified)
const extractEducation = (text: string): Education[] => {
  const education: Education[] = [];
  const textLower = text.toLowerCase();
  
  // Look for degree keywords
  const degreeKeywords = ['bachelor', 'master', 'phd', 'doctorate', 'associate', 'diploma', 'b.s.', 'm.s.', 'b.a.', 'm.a.', 'mba'];
  
  for (const keyword of degreeKeywords) {
    const regex = new RegExp(`${keyword}[^\\n]*`, 'i');
    const match = text.match(regex);
    if (match) {
      education.push({
        degree: keyword.charAt(0).toUpperCase() + keyword.slice(1),
        field: 'Computer Science', // Simplified
        year: text.match(/\b(20\d{2}|19\d{2})\b/)?.[0]
      });
      break; // Just find the first one for simplicity
    }
  }
  
  return education;
};

// Calculate ATS score
const calculateATSScore = (data: Partial<ResumeData>): { score: number; breakdown: ScoreBreakdown } => {
  const breakdown: ScoreBreakdown = {
    personalInfo: 0,
    skills: 0,
    experience: 0,
    education: 0,
    formatting: 0,
    keywords: 0
  };
  
  // Personal info scoring (30 points max)
  if (data.personalInfo?.name) breakdown.personalInfo += 10;
  if (data.personalInfo?.email) breakdown.personalInfo += 10;
  if (data.personalInfo?.phone) breakdown.personalInfo += 5;
  if (data.personalInfo?.linkedin) breakdown.personalInfo += 3;
  if (data.personalInfo?.github) breakdown.personalInfo += 2;
  
  // Skills scoring (25 points max)
  const skillsCount = data.skillsCount || 0;
  breakdown.skills = Math.min(25, skillsCount * 2);
  
  // Experience scoring (25 points max)
  const experienceCount = data.experienceCount || 0;
  breakdown.experience = Math.min(25, experienceCount * 8);
  
  // Education scoring (10 points max)
  const educationCount = data.education?.length || 0;
  breakdown.education = Math.min(10, educationCount * 5);
  
  // Formatting scoring (10 points max)
  const wordCount = data.wordCount || 0;
  if (wordCount >= 300 && wordCount <= 800) {
    breakdown.formatting = 10;
  } else if (wordCount >= 200) {
    breakdown.formatting = 7;
  } else {
    breakdown.formatting = 3;
  }
  
  const totalScore = Object.values(breakdown).reduce((sum, score) => sum + score, 0);
  return { score: Math.min(100, totalScore), breakdown };
};

// Generate recommendations
const generateRecommendations = (data: ResumeData): string[] => {
  const recommendations: string[] = [];
  
  // Personal info recommendations
  if (!data.personalInfo.name) {
    recommendations.push('🏷️ Add your full name prominently at the top of your resume');
  }
  if (!data.personalInfo.email) {
    recommendations.push('📧 Include a professional email address');
  }
  if (!data.personalInfo.phone) {
    recommendations.push('📞 Add your phone number for direct contact');
  }
  if (!data.personalInfo.linkedin) {
    recommendations.push('💼 Add your LinkedIn profile URL to increase professional visibility');
  }
  if (!data.personalInfo.github && data.skillsCount > 5) {
    recommendations.push('💻 Include your GitHub profile to showcase your technical projects');
  }
  
  // Skills recommendations
  if (data.skillsCount < 8) {
    recommendations.push('🛠️ Add more relevant skills to strengthen your profile (aim for 10-15 skills)');
  } else if (data.skillsCount > 25) {
    recommendations.push('🎯 Focus on your most relevant skills (consider reducing to 15-20 core skills)');
  }
  
  // Experience recommendations
  if (data.experienceCount === 0) {
    recommendations.push('💼 Add your work experience, internships, or relevant projects');
  } else if (data.experienceCount < 2) {
    recommendations.push('📈 Include additional work experience or significant projects');
  }
  
  // Content recommendations
  if (data.wordCount < 300) {
    recommendations.push('📄 Expand your resume content with more detailed descriptions');
  } else if (data.wordCount > 800) {
    recommendations.push('✂️ Consider condensing your resume content to improve readability');
  }
  
  // ATS recommendations
  if (data.atsScore < 70) {
    recommendations.push('🤖 Improve ATS compatibility by addressing missing sections and optimizing keywords');
  }
  
  return recommendations.slice(0, 8); // Limit to top 8 recommendations
};

// Main parsing function
export const parseResume = async (file: File, jobDescription: string = ''): Promise<ResumeData> => {
  const text = await extractTextFromFile(file);
  const personalInfo = extractPersonalInfo(text);
  const skills = extractSkills(text);
  const experience = extractExperience(text);
  const education = extractEducation(text);
  
  const wordCount = text.split(/\s+/).length;
  const skillsCount = Object.values(skills).flat().length;
  const experienceCount = experience.length;
  
  // Estimate years of experience
  const years = text.match(/\b(20\d{2}|19\d{2})\b/g) || [];
  const yearsExperience = years.length >= 2 ? 
    new Date().getFullYear() - Math.min(...years.map(y => parseInt(y))) : 0;
  
  // Create partial data for scoring
  const partialData = {
    personalInfo,
    skillsCount,
    experienceCount,
    education,
    wordCount
  };
  
  const { score: atsScore, breakdown: scoreBreakdown } = calculateATSScore(partialData);
  
  const resumeData: ResumeData = {
    personalInfo,
    skills,
    experience,
    education,
    atsScore,
    scoreBreakdown,
    recommendations: [],
    wordCount,
    skillsCount,
    experienceCount,
    yearsExperience,
    rawText: text
  };
  
  // Generate recommendations based on complete data
  resumeData.recommendations = generateRecommendations(resumeData);
  
  return resumeData;
};