import React from 'react';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';

interface Experience {
  title: string;
  company?: string;
  duration?: string;
  location?: string;
  description: string[];
  technologies?: string[];
}

interface ExperienceTimelineProps {
  experience: Experience[];
}

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experience }) => {
  return (
    <div className="glass-morphism rounded-2xl p-6 backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl">
      <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
        <Briefcase className="w-6 h-6 mr-2" />
        Professional Experience
      </h2>

      <div className="space-y-6">
        {experience.slice(0, 5).map((exp, index) => (
          <div key={index} className="relative">
            {/* Timeline connector */}
            {index < experience.length - 1 && (
              <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-500 opacity-30"></div>
            )}
            
            <div className="flex items-start space-x-4">
              {/* Timeline dot */}
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{exp.title}</h3>
                      {exp.company && (
                        <p className="text-blue-300 font-medium flex items-center">
                          {exp.company}
                          <ExternalLink className="w-4 h-4 ml-1 opacity-60" />
                        </p>
                      )}
                    </div>
                    
                    <div className="flex flex-col lg:items-end text-white/70 text-sm">
                      {exp.duration && (
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {exp.duration}
                        </div>
                      )}
                      {exp.location && (
                        <div className="flex items-center mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {exp.location}
                        </div>
                      )}
                    </div>
                  </div>

                  {exp.description.length > 0 && (
                    <div className="mb-3">
                      <h4 className="text-white/90 font-medium mb-2">Key Responsibilities:</h4>
                      <ul className="space-y-1">
                        {exp.description.slice(0, 4).map((desc, descIndex) => (
                          <li key={descIndex} className="text-white/80 text-sm flex items-start">
                            <span className="text-blue-400 mr-2 mt-1.5 flex-shrink-0">•</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div>
                      <h4 className="text-white/90 font-medium mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full text-xs text-white"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {experience.length > 5 && (
        <div className="mt-6 text-center">
          <p className="text-white/60 text-sm">
            Showing 5 most recent positions • {experience.length - 5} more available
          </p>
        </div>
      )}
    </div>
  );
};

export default ExperienceTimeline;