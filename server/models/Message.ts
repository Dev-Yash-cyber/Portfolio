import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    company: { type: String },
    projectType: { type: String, default: 'Full-Stack Web App' },
    budget: { type: String },
    timeline: { type: String },
    subject: { type: String },
    message: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['new', 'read', 'contacted', 'qualified', 'closed', 'spam'],
      default: 'new'
    },
  },
  { timestamps: true }
);

export const MessageModel = mongoose.model('Message', MessageSchema);
