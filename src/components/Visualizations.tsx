import React from 'react';
import { BarChart3, PieChart, Activity, TrendingUp } from 'lucide-react';
import { ResumeData } from '../utils/resumeParser';

interface VisualizationsProps {
  resumeData: ResumeData;
}

const Visualizations: React.FC<VisualizationsProps> = ({ resumeData }) => {
  // Prepare data for skill categories chart
  const skillsData = Object.entries(resumeData.skills).map(([category, skills]) => ({
    category: category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
    count: skills.length,
    percentage: (skills.length / resumeData.skillsCount) * 100
  })).sort((a, b) => b.count - a.count);

  // Generate colors for categories
  const getColorForCategory = (index: number) => {
    const colors = [
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-purple-500 to-pink-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-blue-500',
      'from-teal-500 to-cyan-500',
      'from-yellow-500 to-orange-500',
      'from-pink-500 to-rose-500',
      'from-gray-500 to-slate-500'
    ];
    return colors[index % colors.length];
  };

  // Score progression data
  const scoreCategories = [
    { name: 'Personal Info', score: resumeData.scoreBreakdown.personalInfo, max: 30 },
    { name: 'Skills', score: resumeData.scoreBreakdown.skills, max: 25 },
    { name: 'Experience', score: resumeData.scoreBreakdown.experience, max: 25 },
    { name: 'Education', score: resumeData.scoreBreakdown.education, max: 10 },
    { name: 'Formatting', score: resumeData.scoreBreakdown.formatting, max: 10 }
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Skills Distribution Chart */}
      <div className="glass-morphism rounded-2xl p-6 backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <PieChart className="w-5 h-5 mr-2" />
          Skills Distribution
        </h3>
        
        <div className="space-y-4">
          {skillsData.map((item, index) => (
            <div key={item.category} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-white/90 text-sm font-medium">{item.category}</span>
                <span className="text-white/80 text-sm">{item.count} skills</span>
              </div>
              
              <div className="relative">
                <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${getColorForCategory(index)} transition-all duration-1000 ease-out relative`}
                    style={{ width: `${item.percentage}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                  </div>
                </div>
                <div className="absolute right-0 top-0 mt-4 text-white/60 text-xs">
                  {Math.round(item.percentage)}%
                </div>
              </div>
            </div>
          ))}
        </div>

        {skillsData.length === 0 && (
          <div className="text-center py-8 text-white/60">
            <PieChart className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No skills data available for visualization</p>
          </div>
        )}
      </div>

      {/* Score Breakdown Radar */}
      <div className="glass-morphism rounded-2xl p-6 backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Score Performance
        </h3>
        
        <div className="space-y-4">
          {scoreCategories.map((category, index) => {
            const percentage = (category.score / category.max) * 100;
            const getScoreColor = () => {
              if (percentage >= 80) return 'from-green-500 to-emerald-500';
              if (percentage >= 60) return 'from-yellow-500 to-orange-500';
              return 'from-red-500 to-pink-500';
            };

            return (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white/90 text-sm font-medium">{category.name}</span>
                  <span className="text-white/80 text-sm">{category.score}/{category.max}</span>
                </div>
                
                <div className="relative">
                  <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${getScoreColor()} transition-all duration-1000 ease-out relative`}
                      style={{ width: `${percentage}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                    </div>
                  </div>
                  <div className="absolute right-0 top-0 mt-4 text-white/60 text-xs">
                    {Math.round(percentage)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Overall Performance Indicator */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/80 font-medium">Overall Performance</span>
            <span className="text-white font-bold text-lg">{Math.round(resumeData.atsScore)}/100</span>
          </div>
          
          <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-1000 ease-out relative"
              style={{ width: `${resumeData.atsScore}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Stats */}
      <div className="glass-morphism rounded-2xl p-6 backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          Resume Analytics
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
            <div className="text-2xl font-bold text-white mb-1">{resumeData.wordCount}</div>
            <div className="text-blue-200 text-xs uppercase tracking-wide">Total Words</div>
          </div>
          
          <div className="text-center p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
            <div className="text-2xl font-bold text-white mb-1">{resumeData.skillsCount}</div>
            <div className="text-green-200 text-xs uppercase tracking-wide">Skills Count</div>
          </div>
          
          <div className="text-center p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
            <div className="text-2xl font-bold text-white mb-1">{resumeData.experienceCount}</div>
            <div className="text-purple-200 text-xs uppercase tracking-wide">Jobs Listed</div>
          </div>
          
          <div className="text-center p-4 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
            <div className="text-2xl font-bold text-white mb-1">{resumeData.yearsExperience}+</div>
            <div className="text-orange-200 text-xs uppercase tracking-wide">Years Exp</div>
          </div>
        </div>

        {/* Content Quality Metrics */}
        <div className="mt-6 space-y-3">
          <h4 className="text-white/90 font-medium text-sm">Content Quality</h4>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white/70 text-sm">Word Count</span>
              <span className={`text-sm font-medium ${
                resumeData.wordCount >= 300 && resumeData.wordCount <= 800 ? 'text-green-400' :
                resumeData.wordCount < 300 ? 'text-yellow-400' : 'text-orange-400'
              }`}>
                {resumeData.wordCount < 300 ? 'Too Short' :
                 resumeData.wordCount > 800 ? 'Too Long' : 'Optimal'}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-white/70 text-sm">Skills Diversity</span>
              <span className={`text-sm font-medium ${
                Object.keys(resumeData.skills).length >= 3 ? 'text-green-400' :
                Object.keys(resumeData.skills).length >= 2 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {Object.keys(resumeData.skills).length >= 3 ? 'Diverse' :
                 Object.keys(resumeData.skills).length >= 2 ? 'Moderate' : 'Limited'}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-white/70 text-sm">Experience Depth</span>
              <span className={`text-sm font-medium ${
                resumeData.experienceCount >= 3 ? 'text-green-400' :
                resumeData.experienceCount >= 2 ? 'text-yellow-400' : 'text-orange-400'
              }`}>
                {resumeData.experienceCount >= 3 ? 'Strong' :
                 resumeData.experienceCount >= 2 ? 'Good' : 'Basic'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Trends */}
      <div className="glass-morphism rounded-2xl p-6 backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Performance Insights
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
            <h4 className="text-green-400 font-medium mb-2">Strengths</h4>
            <ul className="text-white/80 text-sm space-y-1">
              {resumeData.atsScore >= 80 && <li>• Excellent overall ATS optimization</li>}
              {resumeData.skillsCount >= 10 && <li>• Strong skills portfolio ({resumeData.skillsCount} skills)</li>}
              {resumeData.experienceCount >= 3 && <li>• Comprehensive work experience</li>}
              {resumeData.scoreBreakdown.personalInfo >= 25 && <li>• Complete personal information</li>}
              {Object.keys(resumeData.skills).length >= 3 && <li>• Diverse skill categories</li>}
            </ul>
          </div>
          
          <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
            <h4 className="text-orange-400 font-medium mb-2">Areas for Improvement</h4>
            <ul className="text-white/80 text-sm space-y-1">
              {resumeData.atsScore < 70 && <li>• Overall ATS score needs improvement</li>}
              {resumeData.skillsCount < 8 && <li>• Add more relevant skills to your profile</li>}
              {resumeData.experienceCount < 2 && <li>• Include more work experience or projects</li>}
              {resumeData.scoreBreakdown.personalInfo < 20 && <li>• Complete missing personal information</li>}
              {resumeData.wordCount < 300 && <li>• Expand resume content with more details</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualizations;