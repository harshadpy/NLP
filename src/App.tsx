import React, { useState } from 'react';
import { Upload, FileText, Brain, TrendingUp, Award, User, Mail, Phone, MapPin, Github, Linkedin, ChevronRight, Download, Sparkles, Target, BarChart3, Zap } from 'lucide-react';
import FileUpload from './components/FileUpload';
import PersonalInfo from './components/PersonalInfo';
import SkillsAnalysis from './components/SkillsAnalysis';
import ScoreBreakdown from './components/ScoreBreakdown';
import ExperienceTimeline from './components/ExperienceTimeline';
import Recommendations from './components/Recommendations';
import JobMatching from './components/JobMatching';
import Visualizations from './components/Visualizations';
import { parseResume, ResumeData } from './utils/resumeParser';

function App() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const handleFileUpload = async (file: File) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate analysis progress
    const progressSteps = [
      { progress: 20, message: '🔍 Extracting text from file...' },
      { progress: 40, message: '🧠 Analyzing personal information...' },
      { progress: 60, message: '🛠️ Processing skills and experience...' },
      { progress: 80, message: '📊 Calculating ATS score...' },
      { progress: 100, message: '💡 Generating recommendations...' }
    ];

    for (const step of progressSteps) {
      setAnalysisProgress(step.progress);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    try {
      const data = await parseResume(file, jobDescription);
      setResumeData(data);
    } catch (error) {
      console.error('Error parsing resume:', error);
    } finally {
      setIsAnalyzing(false);
      setAnalysisProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-6 py-12">
          <div className="glass-morphism rounded-3xl p-8 mb-8 text-center backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mr-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Elite Resume AI
              </h1>
            </div>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Transform your resume with cutting-edge AI analysis and get hired faster with intelligent insights
            </p>
            <div className="flex justify-center space-x-8">
              <div className="flex items-center text-white/80">
                <Brain className="w-6 h-6 mr-2" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center text-white/80">
                <TrendingUp className="w-6 h-6 mr-2" />
                <span>Smart Analysis</span>
              </div>
              <div className="flex items-center text-white/80">
                <Award className="w-6 h-6 mr-2" />
                <span>ATS Optimized</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Upload Section */}
            <div className="glass-morphism rounded-2xl p-6 backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <FileText className="w-6 h-6 mr-2" />
                Upload Your Resume
              </h2>
              <FileUpload onFileUpload={handleFileUpload} isAnalyzing={isAnalyzing} progress={analysisProgress} />
            </div>

            {/* Job Description */}
            <div className="glass-morphism rounded-2xl p-6 backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Target className="w-6 h-6 mr-2" />
                Job Description (Optional)
              </h2>
              <textarea
                className="w-full h-32 bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none backdrop-blur-sm"
                placeholder="Paste the job description here for targeted analysis and personalized recommendations..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              <div className="mt-3 text-sm text-white/70">
                Adding a job description provides personalized recommendations and keyword matching analysis
              </div>
            </div>
          </div>

          {/* Results Section */}
          {resumeData && (
            <div className="space-y-8">
              {/* Key Metrics Dashboard */}
              <div className="glass-morphism rounded-2xl p-6 backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl">
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-2" />
                  Performance Dashboard
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="metric-card bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-white mb-2">{Math.round(resumeData.atsScore)}</div>
                    <div className="text-sm text-green-200 uppercase tracking-wide">ATS Score</div>
                  </div>
                  <div className="metric-card bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-white mb-2">{resumeData.skillsCount}</div>
                    <div className="text-sm text-blue-200 uppercase tracking-wide">Skills Found</div>
                  </div>
                  <div className="metric-card bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-white mb-2">{resumeData.experienceCount}</div>
                    <div className="text-sm text-purple-200 uppercase tracking-wide">Experience</div>
                  </div>
                  <div className="metric-card bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-white mb-2">{resumeData.yearsExperience}</div>
                    <div className="text-sm text-orange-200 uppercase tracking-wide">Years Exp</div>
                  </div>
                </div>
              </div>

              {/* Score Breakdown */}
              <ScoreBreakdown scoreBreakdown={resumeData.scoreBreakdown} totalScore={resumeData.atsScore} />

              {/* Personal Information */}
              <PersonalInfo personalInfo={resumeData.personalInfo} />

              {/* Skills Analysis */}
              <SkillsAnalysis skills={resumeData.skills} />

              {/* Visualizations */}
              <Visualizations resumeData={resumeData} />

              {/* Experience Timeline */}
              {resumeData.experience.length > 0 && (
                <ExperienceTimeline experience={resumeData.experience} />
              )}

              {/* Job Matching */}
              {jobDescription && (
                <JobMatching resumeData={resumeData} jobDescription={jobDescription} />
              )}

              {/* Recommendations */}
              <Recommendations recommendations={resumeData.recommendations} />

              {/* Export Section */}
              <div className="glass-morphism rounded-2xl p-6 backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl">
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <Download className="w-6 h-6 mr-2" />
                  Export Your Analysis
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <button className="glass-button flex items-center justify-center space-x-2 p-4 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                    <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Download Detailed Report</span>
                  </button>
                  <button className="glass-button flex items-center justify-center space-x-2 p-4 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                    <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Download Summary</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Floating Action Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 z-50 group"
        >
          <ChevronRight className="w-6 h-6 text-white transform -rotate-90 group-hover:scale-110 transition-transform" />
        </button>

        {/* Footer */}
        <footer className="text-center py-8 px-6">
          <div className="glass-morphism rounded-2xl p-6 backdrop-blur-xl bg-white/5 border border-white/10">
            <p className="text-white/80 mb-2 flex items-center justify-center">
              <Zap className="w-5 h-5 mr-2" />
              <strong>NLP Resume Parser</strong> - Powered by Advanced Machine Learning
            </p>
            <p className="text-white/60 text-sm">
              Transform your career with AI-driven insights • Built with ❤️ for job seekers
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;