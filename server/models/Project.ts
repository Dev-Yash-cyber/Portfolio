import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    shortDescription: { type: String },
    fullDescription: { type: String },
    category: { type: String, default: 'Full Stack' },
    techStack: [{ type: String }],
    image: { type: String },
    gallery: [{ type: String }],
    featured: { type: Boolean, default: false },
    badgeText: { type: String },
    liveUrl: { type: String },
    githubUrl: { type: String },
    metrics: [
      {
        label: { type: String },
        value: { type: String },
      }
    ],
    caseStudy: {
      overview: { type: String },
      problem: { type: String },
      businessRequirement: { type: String },
      myRole: { type: String },
      solution: { type: String },
      architecture: { type: String },
      technicalChallenges: [
        {
          challenge: { type: String },
          solution: { type: String },
        }
      ],
      databaseAndApi: { type: String },
      performanceImprovements: [{ type: String }],
      securityConsiderations: [{ type: String }],
      results: [{ type: String }],
      whatILearned: [{ type: String }],
    }
  },
  { timestamps: true, strict: false }
);

export const ProjectModel = mongoose.model('Project', ProjectSchema);
