import React from 'react';
import { BarChart3, TrendingUp, Award, AlertCircle } from 'lucide-react';

interface ScoreBreakdown {
  personalInfo: number;
  skills: number;
  experience: number;
  education: number;
  formatting: number;
  keywords: number;
}

interface ScoreBreakdownProps {
  scoreBreakdown: ScoreBreakdown;
  totalScore: number;
}

const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ scoreBreakdown, totalScore }) => {
  const categories = [
    { key: 'personalInfo', label: 'Personal Info', maxScore: 30, icon: '👤' },
    { key: 'skills', label: 'Skills', maxScore: 25, icon: '🛠️' },
    { key: 'experience', label: 'Experience', maxScore: 25, icon: '💼' },
    { key: 'education', label: 'Education', maxScore: 10, icon: '🎓' },
    { key: 'formatting', label: 'Formatting', maxScore: 10, icon: '📝' },
  ];

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'from-green-500 to-emerald-500';
    if (percentage >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getPerformanceLevel = (score: number) => {
    if (score >= 85) return { level: 'ELITE LEVEL', icon: '🏆', color: 'text-yellow-400', description: 'Outstanding resume quality!' };
    if (score >= 70) return { level: 'PROFESSIONAL', icon: '⭐', color: 'text-blue-400', description: 'Strong resume with room for optimization' };
    if (score >= 50) return { level: 'DEVELOPING', icon: '📈', color: 'text-orange-400', description: 'Good foundation, needs enhancement' };
    return { level: 'NEEDS WORK', icon: '🔧', color: 'text-red-400', description: 'Significant improvements needed' };
  };

  const performance = getPerformanceLevel(totalScore);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Score Components */}
      <div className="glass-morphism rounded-2xl p-6 backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl">
        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
          <BarChart3 className="w-6 h-6 mr-2" />
          Score Analysis
        </h2>
        
        <div className="space-y-4">
          {categories.map((category) => {
            const score = scoreBreakdown[category.key as keyof ScoreBreakdown];
            const percentage = (score / category.maxScore) * 100;
            
            return (
              <div key={category.key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white/90 font-medium flex items-center">
                    <span className="text-lg mr-2">{category.icon}</span>
                    {category.label}
                  </span>
                  <span className="text-white font-semibold">
                    {score}/{category.maxScore}
                  </span>
                </div>
                
                <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${getScoreColor(score, category.maxScore)} transition-all duration-1000 ease-out relative`}
                    style={{ width: `${percentage}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className={`text-sm font-medium ${percentage >= 80 ? 'text-green-400' : percentage >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {Math.round(percentage)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="glass-morphism rounded-2xl p-6 backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl">
        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2" />
          Performance Insights
        </h2>

        <div className="text-center mb-6">
          <div className="text-6xl mb-2">{performance.icon}</div>
          <div className={`text-xl font-bold ${performance.color} mb-2`}>
            {performance.level}
          </div>
          <p className="text-white/80">{performance.description}</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-white/80">Overall ATS Score</span>
            <span className="text-2xl font-bold text-white">{Math.round(totalScore)}/100</span>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-white font-medium mb-1">Next Steps</h4>
                <p className="text-white/70 text-sm">
                  {totalScore >= 85 
                    ? "Your resume is in excellent shape! Consider minor tweaks for specific job applications."
                    : totalScore >= 70
                    ? "Focus on expanding your skills section and adding more detailed experience descriptions."
                    : totalScore >= 50
                    ? "Work on completing all personal information fields and improving content structure."
                    : "Start by ensuring all basic information is present and consider professional resume writing assistance."
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
              <Award className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
              <div className="text-white/60 text-xs uppercase tracking-wide">Ranking</div>
              <div className="text-white font-semibold">
                {totalScore >= 85 ? 'Top 10%' : totalScore >= 70 ? 'Top 25%' : totalScore >= 50 ? 'Top 50%' : 'Needs Work'}
              </div>
            </div>
            
            <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
              <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-1" />
              <div className="text-white/60 text-xs uppercase tracking-wide">Potential</div>
              <div className="text-white font-semibold">
                {100 - totalScore > 0 ? `+${Math.round(100 - totalScore)}` : 'Maxed'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBreakdown;