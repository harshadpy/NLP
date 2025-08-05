import React from 'react';
import { Lightbulb, CheckCircle, AlertTriangle, TrendingUp, Star } from 'lucide-react';

interface RecommendationsProps {
  recommendations: string[];
}

const Recommendations: React.FC<RecommendationsProps> = ({ recommendations }) => {
  const getRecommendationConfig = (rec: string) => {
    if (rec.includes('🏷️') || rec.includes('📧') || rec.includes('📞')) {
      return { icon: AlertTriangle, color: 'from-red-500/20 to-pink-500/20 border-red-500/30', priority: 'High' };
    }
    if (rec.includes('🛠️') || rec.includes('💼') || rec.includes('🎯')) {
      return { icon: TrendingUp, color: 'from-orange-500/20 to-yellow-500/20 border-orange-500/30', priority: 'Medium' };
    }
    if (rec.includes('📄') || rec.includes('✂️') || rec.includes('🔍')) {
      return { icon: Star, color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30', priority: 'Low' };
    }
    return { icon: CheckCircle, color: 'from-green-500/20 to-emerald-500/20 border-green-500/30', priority: 'Info' };
  };

  if (recommendations.length === 0) {
    return (
      <div className="glass-morphism rounded-2xl p-6 backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl">
        <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2" />
          AI Recommendations
        </h2>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <p className="text-green-400 font-medium mb-2">Excellent Resume!</p>
          <p className="text-white/60 text-sm">Your resume meets all the key criteria for ATS optimization</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-morphism rounded-2xl p-6 backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white flex items-center">
          <Lightbulb className="w-6 h-6 mr-2" />
          Elite AI Recommendations
        </h2>
        <div className="text-white/60 text-sm">
          {recommendations.length} suggestion{recommendations.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => {
          const config = getRecommendationConfig(rec);
          const Icon = config.icon;
          
          return (
            <div
              key={index}
              className={`p-4 rounded-xl bg-gradient-to-r ${config.color} border hover:scale-[1.02] transition-all duration-300 group`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 p-2 rounded-lg bg-white/10">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      config.priority === 'High' ? 'bg-red-500/30 text-red-200' :
                      config.priority === 'Medium' ? 'bg-orange-500/30 text-orange-200' :
                      config.priority === 'Low' ? 'bg-blue-500/30 text-blue-200' :
                      'bg-green-500/30 text-green-200'
                    }`}>
                      {config.priority} Priority
                    </span>
                  </div>
                  
                  <p className="text-white/90 leading-relaxed group-hover:text-white transition-colors">
                    {rec}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Tips */}
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
        <h4 className="text-white font-medium mb-2 flex items-center">
          <Star className="w-4 h-4 mr-2" />
          Quick Action Tips
        </h4>
        <ul className="space-y-1 text-white/70 text-sm">
          <li>• Address high-priority recommendations first for maximum impact</li>
          <li>• Update your resume after each change and re-analyze for progress tracking</li>
          <li>• Focus on 2-3 recommendations at a time to avoid overwhelming changes</li>
          <li>• Tailor recommendations based on specific job applications</li>
        </ul>
      </div>
    </div>
  );
};

export default Recommendations;