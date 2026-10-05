import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Layers, 
  Layout, 
  Server, 
  Rocket, 
  Gauge, 
  Database, 
  Workflow, 
  Wrench, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Send,
  Eye,
  Check,
  Zap,
  Code2,
  TrendingUp,
  Headphones
} from 'lucide-react';
import { servicesData, processSteps } from '../data/servicesData';
import { TechIcon } from '../components/common/TechIcon';
import { SectionHeader } from '../components/common/SectionHeader';
import { updateSEO } from '../utils/seo';

export const Services: React.FC = () => {
  useEffect(() => {
    updateSEO({
      title: 'Services & Solutions | Full-Stack Development',
      description: 'Transform your ideas into real products. End-to-end Full-Stack, React, .NET Core, SaaS, and database engineering services by Yash Barot.',
      canonicalUrl: 'https://yashbarot.dev/services',
    });
  }, []);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return <Layers className="w-5 h-5 text-blue-400" />;
      case 'Layout': return <Layout className="w-5 h-5 text-pink-400" />;
      case 'Server': return <Server className="w-5 h-5 text-emerald-400" />;
      case 'Rocket': return <Rocket className="w-5 h-5 text-purple-400" />;
      case 'Gauge': return <Gauge className="w-5 h-5 text-amber-400" />;
      case 'Database': return <Database className="w-5 h-5 text-cyan-400" />;
      case 'Workflow': return <Workflow className="w-5 h-5 text-rose-400" />;
      case 'Wrench': return <Wrench className="w-5 h-5 text-sky-400" />;
      default: return <Layers className="w-5 h-5 text-blue-400" />;
    }
  };

  const benefits = [
    { title: 'Clean Code', desc: 'Maintainable and scalable code', icon: Code2, color: 'text-blue-400' },
    { title: 'Responsive Design', desc: 'Works perfectly on all devices', icon: Layout, color: 'text-pink-400' },
    { title: 'Scalable Solutions', desc: 'Ready for future growth', icon: Layers, color: 'text-cyan-400' },
    { title: 'Clear Communication', desc: 'Regular updates and transparent process', icon: Zap, color: 'text-purple-400' },
    { title: 'On-Time Delivery', desc: 'Committed to deadlines', icon: Clock, color: 'text-emerald-400' },
    { title: 'Post-Launch Support', desc: 'Ongoing support even after deployment', icon: Headphones, color: 'text-amber-400' },
  ];

  const techStack = [
    'React', 'TypeScript', 'JavaScript', '.NET Core', 'C#', 'Node.js', 'MongoDB', 'SQL Server', 'Tailwind CSS', 'Git', 'Docker'
  ];

  return (
    <div className="pt-8 pb-20 relative">
      {/* Background glow */}
      <div className="absolute top-0 right-1/3 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Services Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
          <div className="lg:col-span-7">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2 block">
              SERVICES
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white light:text-slate-900 tracking-tight leading-tight">
              Transform Your Ideas <br />
              Into <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Real Products</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-slate-300 light:text-slate-600 leading-relaxed max-w-xl">
              I offer end-to-end development services to help businesses, startups and individuals build modern, scalable and high-performance digital solutions.
            </p>

            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-xs font-medium text-blue-300">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Custom Solutions</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-xs font-medium text-indigo-300">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>On-Time Delivery</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-xs font-medium text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Long-Term Support</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-glow-sm transition-all"
              >
                <span>Let's Discuss Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors"
              >
                <span>View My Work</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Code Window & Workflow Pills */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl bg-[#090d1a] border border-white/10 p-5 font-mono text-xs text-slate-300 shadow-2xl">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5 text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span>ideas.ts</span>
              </div>
              <p><span className="text-purple-400">const</span> <span className="text-blue-400">ideas</span> = {'{'}</p>
              <p className="pl-4">design: <span className="text-emerald-400">true</span>,</p>
              <p className="pl-4">develop: <span className="text-emerald-400">true</span>,</p>
              <p className="pl-4">deploy: <span className="text-emerald-400">true</span>,</p>
              <p className="pl-4">success: <span className="text-cyan-400">true</span></p>
              <p>{'}'};</p>
            </div>

            {/* Workflow Pills List */}
            <div className="mt-4 flex flex-wrap gap-2">
              {['Plan', 'Design', 'Develop', 'Test', 'Deploy', 'Support'].map((stage, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg bg-slate-900/80 border border-white/10 text-xs font-mono text-cyan-300 flex items-center gap-1.5"
                >
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>{stage}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Section: What I Can Do for You (8 Cards) */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-1 block">
                MY SERVICES
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white light:text-slate-900">
                What I Can Do <span className="text-blue-400">for You</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl">
                From concept to deployment, I provide complete development services to help you build powerful digital products.
              </p>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 transition-colors shrink-0 self-start sm:self-auto"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((service) => (
              <div
                key={service.id}
                className="group rounded-2xl p-6 bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200 backdrop-blur-xl flex flex-col justify-between hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-slate-800/80 light:bg-slate-100 flex items-center justify-center mb-4 border border-white/5 group-hover:scale-110 transition-transform">
                    {getServiceIcon(service.icon)}
                  </div>

                  <h3 className="text-base font-bold text-white light:text-slate-900 mb-2 group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>

                  <ul className="space-y-1.5 mb-6 pt-3 border-t border-white/5 light:border-slate-100 text-xs text-slate-300 light:text-slate-700">
                    {service.capabilities.slice(0, 4).map((cap, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                        <span className="line-clamp-1">{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 group-hover:translate-x-1 transition-all pt-3 border-t border-white/5"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Section: How I Deliver Projects (Work Process) */}
        <div className="mb-20 rounded-3xl p-8 sm:p-10 bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-1 block">
                MY WORK PROCESS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white light:text-slate-900">
                How I Deliver <span className="text-blue-400">Projects</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">A clear and transparent process to ensure high-quality results.</p>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 shadow-glow-sm self-start sm:self-auto"
            >
              <span>Let's Start a Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {processSteps.slice(0, 6).map((step) => (
              <div
                key={step.number}
                className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-50 border border-white/5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-lg font-mono font-black text-blue-400 block mb-2">
                    {step.number}
                  </span>
                  <h4 className="text-xs font-bold text-white light:text-slate-900 mb-1">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 light:text-slate-600 leading-snug">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Benefits You Get (Why Work With Me) */}
        <div className="mb-20">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-1 block">
              WHY WORK WITH ME
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white light:text-slate-900">
              Benefits <span className="text-blue-400">You Get</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-[#0a0f20]/80 light:bg-white border border-white/5 light:border-slate-200 text-center flex flex-col items-center justify-center"
                >
                  <div className={`p-2.5 rounded-xl bg-slate-800 light:bg-slate-100 ${b.color} mb-3`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-white light:text-slate-900 mb-1">{b.title}</h4>
                  <p className="text-[10px] text-slate-400 light:text-slate-600 leading-tight">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section: My Tech Stack */}
        <div className="mb-20 rounded-3xl p-6 sm:p-8 bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2 block">
            TECHNOLOGIES I WORK WITH
          </span>
          <h3 className="text-xl font-bold text-white light:text-slate-900 mb-6">
            My <span className="text-blue-400">Tech Stack</span>
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {techStack.map((tech) => (
              <div
                key={tech}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 light:bg-slate-50 border border-white/5 light:border-slate-200"
              >
                <TechIcon name={tech} size="sm" />
                <span className="text-xs font-semibold text-slate-200 light:text-slate-800">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-blue-950 via-indigo-950 to-purple-950 border border-blue-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest font-semibold block mb-1">
              READY TO START?
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Let's Build Something Amazing Together!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
              I'm always open to discussing new opportunities, interesting projects or ways we can work together.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="px-5 py-3 rounded-xl text-xs font-bold bg-white text-slate-950 hover:bg-slate-100 flex items-center gap-2 shadow-lg"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/projects"
              className="px-5 py-3 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center gap-2"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-300" />
              <span>View My Work</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
