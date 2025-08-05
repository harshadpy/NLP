import React from 'react';
import { Target, TrendingUp, AlertCircle, CheckCircle, Search } from 'lucide-react';
import { ResumeData } from '../utils/resumeParser';

interface JobMatchingProps {
  resumeData: ResumeData;
  jobDescription: string;
}

const JobMatching: React.FC<JobMatchingProps> = ({ resumeData, jobDescription }) => {
  // Calculate job matching score
  const calculateJobMatch = () => {
    const resumeWords = new Set(
      resumeData.rawText
        .toLowerCase()
        .split(/\W+/)
        .filter(word => word.length > 2)
    );
    
    const jobWords = new Set(
      jobDescription
        .toLowerCase()
        .split(/\W+/)
        .filter(word => word.length > 2)
    );

    // Remove common stop words
    const stopWords = new Set([
      'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
      'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had',
      'will', 'would', 'could', 'should', 'may', 'might', 'can', 'must'
    ]);

    const cleanResumeWords = new Set([...resumeWords].filter(word => !stopWords.has(word)));
    const cleanJobWords = new Set([...jobWords].filter(word => !stopWords.has(word)));

    const overlap = [...cleanResumeWords].filter(word => cleanJobWords.has(word));
    const matchScore = cleanJobWords.size > 0 ? (overlap.length / cleanJobWords.size) * 100 : 0;

    return {
      matchScore: Math.min(100, matchScore),
      matchingKeywords: overlap,
      missingKeywords: [...cleanJobWords].filter(word => !cleanResumeWords.has(word))
    };
  };

  const matchData = calculateJobMatch();

  const getMatchLevel = (score: number) => {
    if (score >= 80) return { level: 'Excellent Match', color: 'text-green-400', icon: '🎯' };
    if (score >= 60) return { level: 'Good Match', color: 'text-blue-400', icon: '⭐' };
    if (score >= 40) return { level: 'Fair Match', color: 'text-yellow-400', icon: '📈' };
    return { level: 'Needs Improvement', color: 'text-red-400', icon: '🔧' };
  };

  const matchLevel = getMatchLevel(matchData.matchScore);

  return (
    <div className="glass-morphism rounded-2xl p-6 backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl">
      <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
        <Target className="w-6 h-6 mr-2" />
        Job Matching Intelligence
      </h2>

      {/* Match Score */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="text-center p-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
          <div className="text-4xl font-bold text-white mb-2">
            {Math.round(matchData.matchScore)}%
          </div>
          <div className="text-white/80 font-medium mb-1">Job Match Score</div>
          <div className={`text-sm ${matchLevel.color}`}>
            {matchLevel.icon} {matchLevel.level}
          </div>
        </div>

        <div className="text-center p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
          <div className="text-4xl font-bold text-white mb-2">
            {matchData.matchingKeywords.length}
          </div>
          <div className="text-white/80 font-medium mb-1">Matching Keywords</div>
          <div className="text-green-400 text-sm">
            <CheckCircle className="w-4 h-4 inline mr-1" />
            Found in Resume
          </div>
        </div>

        <div className="text-center p-4 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
          <div className="text-4xl font-bold text-white mb-2">
            {Math.min(15, matchData.missingKeywords.length)}
          </div>
          <div className="text-white/80 font-medium mb-1">Missing Keywords</div>
          <div className="text-orange-400 text-sm">
            <AlertCircle className="w-4 h-4 inline mr-1" />
            Consider Adding
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Matching Keywords */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
            Matching Keywords ({matchData.matchingKeywords.length})
          </h3>
          
          <div className="max-h-48 overflow-y-auto custom-scrollbar">
            <div className="flex flex-wrap gap-2">
              {matchData.matchingKeywords.slice(0, 50).map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-sm text-green-200 hover:bg-green-500/30 transition-colors"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Missing Keywords */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Search className="w-5 h-5 mr-2 text-orange-400" />
            Consider Adding ({Math.min(15, matchData.missingKeywords.length)})
          </h3>
          
          <div className="max-h-48 overflow-y-auto custom-scrollbar">
            <div className="flex flex-wrap gap-2">
              {matchData.missingKeywords.slice(0, 15).map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full text-sm text-orange-200 hover:bg-orange-500/30 transition-colors cursor-pointer"
                  title="Click to copy"
                  onClick={() => navigator.clipboard.writeText(keyword)}
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Match Analysis */}
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
        <h4 className="text-white font-medium mb-2 flex items-center">
          <TrendingUp className="w-4 h-4 mr-2" />
          Match Analysis & Recommendations
        </h4>
        
        <div className="space-y-2 text-white/80 text-sm">
          <p>
            <strong>Current Match:</strong> Your resume matches {Math.round(matchData.matchScore)}% of the job requirements.
          </p>
          
          {matchData.matchScore >= 80 ? (
            <p className="text-green-400">
              🎉 Excellent alignment! Your resume strongly matches this job posting. Consider highlighting the matching keywords in your application.
            </p>
          ) : matchData.matchScore >= 60 ? (
            <p className="text-blue-400">
              👍 Good foundation! Focus on incorporating 3-5 of the missing keywords that are relevant to your experience.
            </p>
          ) : matchData.matchScore >= 40 ? (
            <p className="text-yellow-400">
              📝 Room for improvement. Consider revising your resume to include more job-specific keywords and requirements.
            </p>
          ) : (
            <p className="text-red-400">
              🔧 Significant gap detected. This role may require skills or experience not reflected in your current resume.
            </p>
          )}
          
          <p>
            <strong>Next Steps:</strong> Review the missing keywords and naturally incorporate relevant ones into your experience descriptions.
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white/80 text-sm">Match Progress</span>
          <span className="text-white font-semibold">{Math.round(matchData.matchScore)}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ease-out ${
              matchData.matchScore >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
              matchData.matchScore >= 60 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
              matchData.matchScore >= 40 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
              'bg-gradient-to-r from-red-500 to-pink-500'
            }`}
            style={{ width: `${matchData.matchScore}%` }}
          >
            <div className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobMatching;