import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Send, 
  CheckCircle2, 
  Clock, 
  Copy, 
  Check, 
  ExternalLink,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  Zap,
  MessageSquare,
  Award,
  Headphones,
  Download,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { developerData } from '../data/portfolioData';
import { useToast } from '../contexts/ToastContext';
import { api } from '../services/api';
import { updateSEO } from '../utils/seo';

export const Contact: React.FC = () => {
  const { success, error } = useToast();

  useEffect(() => {
    updateSEO({
      title: 'Contact & Project Inquiries',
      description: 'Get in touch with Yash Barot for freelance web development, .NET Core APIs, React SaaS applications, or software engineering inquiries.',
      canonicalUrl: 'https://yashbarot.dev/contact',
    });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: 'Full-Stack Web App',
    budget: '$3,000 - $5,000',
    timeline: '1-2 Months',
    subject: 'Project Discussion',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    success(`Copied to clipboard: ${text}`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      error('Please fill in your name, email, and project message.');
      return;
    }

    setIsSubmitting(true);

    try {
      await api.submitInquiry(formData);

      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#6366f1', '#a855f7', '#10b981'],
      });

      success('Thank you! Your message has been delivered to Yash Barot. You will receive a response within 24 hours.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: 'Full-Stack Web App',
        budget: '$3,000 - $5,000',
        timeline: '1-2 Months',
        subject: 'Project Discussion',
        message: '',
      });
    } catch {
      error('Failed to submit message. Please email directly to ' + developerData.email);
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'Do you take on freelance projects?',
      a: 'Yes! I am currently available for freelance contracts, full-stack MVPs, backend API development, and enterprise web applications worldwide on flexible milestone-based or hourly arrangements.'
    },
    {
      q: 'What is your typical project timeline?',
      a: 'Typical timelines range from 2 to 4 weeks for focused MVPs and dashboards, and 1 to 3 months for comprehensive multi-tenant SaaS or ERP platforms with custom database schemas.'
    },
    {
      q: 'What technologies do you work with?',
      a: 'My core stack consists of React, TypeScript, Tailwind CSS, ASP.NET Core, C#, Node.js, Express, Microsoft SQL Server, MongoDB, and modern AI LLM/voice integrations.'
    },
    {
      q: 'How do we get started with a project?',
      a: 'Simply submit your project details in the form above or email me. We will schedule a 20-minute discovery call to discuss scope, architecture, deliverables, and timeline milestones.'
    }
  ];

  return (
    <div className="pt-8 pb-20 relative">
      {/* Background radial glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-mono text-cyan-400 font-semibold mb-2 block">
              GET IN TOUCH
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white light:text-slate-900 tracking-tight leading-tight">
              Let's Build Something <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Great Together!
              </span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-400 light:text-slate-600 leading-relaxed">
              I'm always open to discussing new opportunities, interesting projects or ways we can work together. Whether you have a project in mind, a question or just want to say hello – I'd love to hear from you!
            </p>
          </div>

          {/* Code Badge Callout */}
          <div className="hidden lg:block relative max-w-sm w-full">
            <div className="rounded-2xl bg-[#090d1a] border border-white/10 p-4 font-mono text-xs text-slate-300 shadow-xl">
              <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-white/5 text-[11px] text-slate-500">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2">contact.ts</span>
              </div>
              <p><span className="text-purple-400">const</span> <span className="text-blue-400">contact</span> = {'{'}</p>
              <p className="pl-4">ideas: <span className="text-emerald-400">true</span>,</p>
              <p className="pl-4">projects: <span className="text-emerald-400">true</span>,</p>
              <p className="pl-4">collaborations: <span className="text-emerald-400">true</span>,</p>
              <p className="pl-4">coffee: <span className="text-cyan-400">"always"</span></p>
              <p>{'}'};</p>
            </div>
            <div className="mt-2 text-right">
              <span className="text-xs text-purple-300 font-medium italic">
                Let's turn your ideas into real solutions! ✍️
              </span>
            </div>
          </div>
        </div>

        {/* 3-Column Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-16">
          {/* Left Column: Contact Information Cards */}
          <div className="lg:col-span-4 rounded-3xl p-6 sm:p-7 bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200 backdrop-blur-xl space-y-4">
            <div>
              <h2 className="text-lg font-bold text-white light:text-slate-900">
                Contact Information
              </h2>
              <p className="text-xs text-slate-400 light:text-slate-600 mt-1 leading-snug">
                Feel free to reach out through any of the following channels. I usually respond within 24 hours.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {/* Email */}
              <div className="p-3.5 rounded-2xl bg-slate-900/70 light:bg-slate-50 border border-white/5 light:border-slate-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono text-slate-400 block">Email</span>
                    <a href={`mailto:${developerData.email}`} className="text-xs font-semibold text-white light:text-slate-900 hover:text-blue-400 truncate block">
                      {developerData.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(developerData.email, 'email')}
                  className="p-2 rounded-xl bg-slate-800 light:bg-slate-200 text-slate-400 hover:text-white"
                  title="Copy email"
                >
                  {copiedKey === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Phone */}
              <div className="p-3.5 rounded-2xl bg-slate-900/70 light:bg-slate-50 border border-white/5 light:border-slate-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono text-slate-400 block">Phone</span>
                    <a href={`tel:${developerData.phone}`} className="text-xs font-semibold text-white light:text-slate-900 hover:text-emerald-400 block">
                      {developerData.phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(developerData.phone, 'phone')}
                  className="p-2 rounded-xl bg-slate-800 light:bg-slate-200 text-slate-400 hover:text-white"
                  title="Copy phone"
                >
                  {copiedKey === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Location */}
              <div className="p-3.5 rounded-2xl bg-slate-900/70 light:bg-slate-50 border border-white/5 light:border-slate-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono text-slate-400 block">Location</span>
                    <span className="text-xs font-semibold text-white light:text-slate-900 block">
                      {developerData.location}
                    </span>
                    <span className="text-[10px] text-slate-500">Open for remote work worldwide</span>
                  </div>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="p-3.5 rounded-2xl bg-slate-900/70 light:bg-slate-50 border border-white/5 light:border-slate-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-sky-600/20 text-sky-400 flex items-center justify-center shrink-0">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono text-slate-400 block">LinkedIn</span>
                    <span className="text-xs font-semibold text-white light:text-slate-900 truncate block">
                      yash-barot-8b2b49229
                    </span>
                  </div>
                </div>
                <a
                  href={developerData.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-slate-800 light:bg-slate-200 text-slate-400 hover:text-white"
                  title="Open LinkedIn"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* GitHub */}
              <div className="p-3.5 rounded-2xl bg-slate-900/70 light:bg-slate-50 border border-white/5 light:border-slate-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0">
                    <Github className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono text-slate-400 block">GitHub</span>
                    <span className="text-xs font-semibold text-white light:text-slate-900 truncate block">
                      Dev-Yash-cyber
                    </span>
                  </div>
                </div>
                <a
                  href={developerData.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-slate-800 light:bg-slate-200 text-slate-400 hover:text-white"
                  title="Open GitHub"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Center Column: Send Me a Message Form */}
          <div className="lg:col-span-5 rounded-3xl p-6 sm:p-8 bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200 backdrop-blur-xl shadow-2xl">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-white light:text-slate-900">
                Send Me a Message
              </h2>
              <p className="text-xs text-slate-400 light:text-slate-600 mt-1 leading-snug">
                Tell me about your project or just say hello. I'll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-slate-300 font-mono block mb-1">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-mono block mb-1">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-slate-300 font-mono block mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-mono block mb-1">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Your Company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-slate-300 font-mono block mb-1">Project Type</label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Full-Stack Web App">Full-Stack Web App</option>
                    <option value="SaaS Platform">SaaS Platform</option>
                    <option value=".NET Core Web API">.NET Core Web API</option>
                    <option value="React Frontend UI">React Frontend UI</option>
                    <option value="Admin Dashboard & ERP">Admin Dashboard & ERP</option>
                    <option value="AI / LLM Integration">AI / LLM Integration</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-mono block mb-1">Budget Range (Optional)</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="< $1,000">&lt; $1,000</option>
                    <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                    <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000+">$10,000+</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-slate-300 font-mono block mb-1">Timeline (Optional)</label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Immediate (1-2 weeks)">Immediate (1-2 weeks)</option>
                    <option value="1 Month">1 Month</option>
                    <option value="1-2 Months">1-2 Months</option>
                    <option value="3+ Months">3+ Months</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-mono block mb-1">
                    Subject <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="Project Discussion"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-slate-300 font-mono block">
                    Message <span className="text-rose-400">*</span>
                  </label>
                  <span className="text-[10px] font-mono text-slate-500">
                    {formData.message.length}/1000
                  </span>
                </div>
                <textarea
                  name="message"
                  required
                  rows={4}
                  maxLength={1000}
                  placeholder="Tell me about your project, requirements or any questions you have..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-glow-md transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <div className="text-center pt-2 text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Your information is safe and will never be shared with third parties.</span>
              </div>
            </form>
          </div>

          {/* Right Column: Why Work With Me + Map Location */}
          <div className="lg:col-span-3 space-y-6">
            {/* 4 Value Props */}
            <div className="rounded-3xl p-6 bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-white light:text-slate-900">
                Why Work With Me?
              </h3>

              <div className="grid grid-cols-1 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-900/60 light:bg-slate-50 border border-white/5 flex items-start gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 mt-0.5">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white light:text-slate-900">Quick Response</h4>
                    <p className="text-[11px] text-slate-400">Usually respond within 24 hours</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 light:bg-slate-50 border border-white/5 flex items-start gap-2.5">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0 mt-0.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white light:text-slate-900">Clear Communication</h4>
                    <p className="text-[11px] text-slate-400">Regular updates and transparent process</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 light:bg-slate-50 border border-white/5 flex items-start gap-2.5">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0 mt-0.5">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white light:text-slate-900">Quality Work</h4>
                    <p className="text-[11px] text-slate-400">Clean, scalable and maintainable code</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 light:bg-slate-50 border border-white/5 flex items-start gap-2.5">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                    <Headphones className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white light:text-slate-900">Long-Term Support</h4>
                    <p className="text-[11px] text-slate-400">Ongoing support even after delivery</p>
                  </div>
                </div>
              </div>
            </div>

            {/* My Location Map Card */}
            <div className="rounded-3xl p-5 bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200 overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-white light:text-slate-900">My Location</span>
                <a
                  href="https://maps.google.com/?q=Gujarat,India"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 font-mono"
                >
                  <span>View on Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Map Preview Graphic */}
              <div className="relative rounded-2xl overflow-hidden h-36 bg-slate-950 border border-white/5 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80"
                  alt="Gujarat Map"
                  className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d1a] to-transparent" />
                <div className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/90 text-white font-mono text-xs shadow-lg backdrop-blur-md">
                  <MapPin className="w-3.5 h-3.5 text-rose-300 animate-bounce" />
                  <span>Gujarat, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Frequently Asked Questions Accordion */}
        <div className="rounded-3xl p-6 sm:p-8 bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200 mb-16">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div>
              <h3 className="text-lg font-bold text-white light:text-slate-900">
                Frequently Asked Questions
              </h3>
              <p className="text-xs text-slate-400">Quick answers to common questions.</p>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-900/60 light:bg-slate-50 border border-white/5 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-white light:text-slate-900"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-400' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-4 pb-4 text-xs text-slate-400 leading-relaxed"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Call to Action Banner */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-blue-950 via-indigo-950 to-purple-950 border border-blue-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest font-semibold block mb-1">
              READY TO GET STARTED?
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Have a Project in Mind?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
              Let's discuss how we can bring your ideas to life. I'm always excited to work on new and challenging projects.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => window.scrollTo({ top: 300, behavior: 'smooth' })}
              className="px-5 py-3 rounded-xl text-xs font-bold bg-white text-slate-950 hover:bg-slate-100 flex items-center gap-2 shadow-lg"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Let's Talk Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a
              href="/resume"
              className="px-5 py-3 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5 text-cyan-300" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
