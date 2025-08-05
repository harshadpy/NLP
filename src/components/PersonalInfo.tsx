import React from 'react';
import { User, Mail, Phone, MapPin, Github, Linkedin, AlertTriangle, CheckCircle } from 'lucide-react';

interface PersonalInfo {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
}

interface PersonalInfoProps {
  personalInfo: PersonalInfo;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ personalInfo }) => {
  const InfoItem = ({ 
    icon: Icon, 
    label, 
    value, 
    isUrl = false 
  }: { 
    icon: any; 
    label: string; 
    value?: string; 
    isUrl?: boolean;
  }) => (
    <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
      <div className={`p-2 rounded-lg ${value ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
        {value ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
      </div>
      <Icon className="w-5 h-5 text-white/70" />
      <div className="flex-1">
        <div className="text-white/60 text-xs uppercase tracking-wide">{label}</div>
        {value ? (
          isUrl ? (
            <a 
              href={value} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-blue-300 transition-colors truncate block"
            >
              {value}
            </a>
          ) : (
            <div className="text-white">{value}</div>
          )
        ) : (
          <div className="text-red-400 text-sm">Not found</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="glass-morphism rounded-2xl p-6 backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl">
      <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
        <User className="w-6 h-6 mr-2" />
        Personal Information
      </h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <InfoItem icon={User} label="Full Name" value={personalInfo.name} />
        <InfoItem icon={Mail} label="Email" value={personalInfo.email} />
        <InfoItem icon={Phone} label="Phone" value={personalInfo.phone} />
        <InfoItem icon={MapPin} label="Location" value={personalInfo.location} />
        <InfoItem icon={Linkedin} label="LinkedIn" value={personalInfo.linkedin} isUrl />
        <InfoItem icon={Github} label="GitHub" value={personalInfo.github} isUrl />
      </div>

      {/* Completeness indicator */}
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/80 font-medium">Profile Completeness</span>
          <span className="text-white font-semibold">
            {Math.round((Object.values(personalInfo).filter(Boolean).length / 6) * 100)}%
          </span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${(Object.values(personalInfo).filter(Boolean).length / 6) * 100}%` }}
          ></div>
        </div>
        <p className="text-white/60 text-sm mt-2">
          Complete all fields to maximize your ATS score and recruiter visibility
        </p>
      </div>
    </div>
  );
};

export default PersonalInfo;