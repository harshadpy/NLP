import React from 'react';
import { Wrench, TrendingUp, Star, Zap } from 'lucide-react';

interface Skills {
  [category: string]: string[];
}

interface SkillsAnalysisProps {
  skills: Skills;
}

const SkillsAnalysis: React.FC<SkillsAnalysisProps> = ({ skills }) => {
  const categoryIcons = {
    'Programming Languages': '💻',
    'Web Development': '🌐',
    'Data Science': '📊',
    'Databases': '🗄️',
    'Cloud & DevOps': '☁️',
    'AI & Machine Learning': '🤖',
    'Mobile Development': '📱',
    'Soft Skills': '🤝',
    'Tools & Platforms': '🛠️',
  };

  const categoryColors = {
    'Programming Languages': 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    'Web Development': 'from-green-500/20 to-emerald-500/20 border-green-500/30',
    'Data Science': 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
    'Databases': 'from-orange-500/20 to-red-500/20 border-orange-500/30',
    'Cloud & DevOps': 'from-indigo-500/20 to-blue-500/20 border-indigo-500/30',
    'AI & Machine Learning': 'from-pink-500/20 to-rose-500/20 border-pink-500/30',
    'Mobile Development': 'from-teal-500/20 to-cyan-500/20 border-teal-500/30',
    'Soft Skills': 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30',
    'Tools & Platforms': 'from-gray-500/20 to-slate-500/20 border-gray-500/30',
  };

  const totalSkills = Object.values(skills).flat().length;
  const categoryCount = Object.keys(skills).length;

  if (totalSkills === 0) {
    return (
      <div className="glass-morphism rounded-2xl p-6 backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
          <Wrench className="w-6 h-6 mr-2" />
          Skills Analysis
        </h2>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-yellow-400" />
          </div>
          <p className="text-white/80 mb-2">No skills detected</p>
          <p className="text-white/60 text-sm">Try uploading a more detailed resume with your technical and soft skills listed</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-morphism rounded-2xl p-6 backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white flex items-center">
          <Wrench className="w-6 h-6 mr-2" />
          Skills Portfolio
        </h2>
        <div className="flex items-center space-x-4 text-white/80">
          <div className="flex items-center">
            <Zap className="w-4 h-4 mr-1" />
            <span className="text-sm">{totalSkills} Skills</span>
          </div>
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm">{categoryCount} Categories</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(skills).map(([category, skillList]) => (
          <div key={category} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white flex items-center">
                <span className="text-2xl mr-2">
                  {categoryIcons[category as keyof typeof categoryIcons] || '🔧'}
                </span>
                {category}
              </h3>
              <span className="text-white/60 text-sm">
                {skillList.length} skill{skillList.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            <div className={`p-4 rounded-xl bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors] || 'from-gray-500/20 to-slate-500/20 border-gray-500/30'} border`}>
              <div className="flex flex-wrap gap-2">
                {skillList.map((skill, index) => (
                  <div
                    key={index}
                    className="skill-tag px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Skills Summary */}
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
        <h4 className="text-white font-medium mb-2">Skills Portfolio Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-white">{totalSkills}</div>
            <div className="text-white/60 text-xs uppercase tracking-wide">Total Skills</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{categoryCount}</div>
            <div className="text-white/60 text-xs uppercase tracking-wide">Categories</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">
              {Math.round(totalSkills / categoryCount * 10) / 10}
            </div>
            <div className="text-white/60 text-xs uppercase tracking-wide">Avg per Category</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">
              {totalSkills >= 15 ? '🏆' : totalSkills >= 10 ? '⭐' : '📈'}
            </div>
            <div className="text-white/60 text-xs uppercase tracking-wide">
              {totalSkills >= 15 ? 'Expert' : totalSkills >= 10 ? 'Proficient' : 'Developing'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsAnalysis;