import mongoose from 'mongoose';

const SettingSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Yash Barot' },
    role: { type: String, default: 'Full-Stack Developer' },
    secondaryRoles: [{ type: String }],
    bio: { type: String },
    shortBio: { type: String },
    location: { type: String, default: 'Gujarat, India' },
    status: { type: String, default: 'Available for Freelance Projects' },
    available: { type: Boolean, default: true },
    email: { type: String, default: 'byash140@gmail.com' },
    phone: { type: String, default: '+91 9624570960' },
    github: { type: String, default: 'https://github.com/Dev-Yash-cyber' },
    linkedin: { type: String, default: 'https://www.linkedin.com/in/yash-barot-8b2b49229/' },
    resumeUrl: { type: String, default: '/resume' },
    resumeFileName: { type: String },
    resumePdfData: { type: String },
    experienceYears: { type: String, default: '2+' },
    projectsCount: { type: String, default: '20+' },
    technologiesCount: { type: String, default: '10+' },
    satisfactionRate: { type: String, default: '100%' },
    philosophy: { type: String },
  },
  { timestamps: true }
);

export const SettingModel = mongoose.model('Setting', SettingSchema);
