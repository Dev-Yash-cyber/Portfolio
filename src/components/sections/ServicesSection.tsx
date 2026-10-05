import React from 'react';
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
  CheckCircle2
} from 'lucide-react';
import { servicesData } from '../../data/servicesData';
import { SectionHeader } from '../common/SectionHeader';

export const ServicesSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return <Layers className="w-5 h-5 text-blue-400" />;
      case 'Layout': return <Layout className="w-5 h-5 text-cyan-400" />;
      case 'Server': return <Server className="w-5 h-5 text-indigo-400" />;
      case 'Rocket': return <Rocket className="w-5 h-5 text-purple-400" />;
      case 'Gauge': return <Gauge className="w-5 h-5 text-amber-400" />;
      case 'Database': return <Database className="w-5 h-5 text-emerald-400" />;
      case 'Workflow': return <Workflow className="w-5 h-5 text-pink-400" />;
      case 'Wrench': return <Wrench className="w-5 h-5 text-sky-400" />;
      default: return <Layers className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="SERVICES"
          title="What I Can"
          highlightText="Do For You"
          description="High-impact engineering services tailored for startups, growing companies, and enterprise teams seeking reliability, speed, and modern architecture."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="group rounded-2xl p-6 bg-[#0a0f20]/90 light:bg-white border border-white/10 light:border-slate-200 backdrop-blur-xl flex flex-col justify-between hover:border-blue-500/40 hover:-translate-y-1.5 transition-all duration-300 hover:shadow-xl"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-800/80 light:bg-slate-100 flex items-center justify-center mb-5 border border-white/5 light:border-slate-200 group-hover:scale-110 transition-transform duration-300">
                  {getIcon(service.icon)}
                </div>

                <h3 className="text-base font-bold text-white light:text-slate-900 tracking-tight mb-2 group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-400 light:text-slate-600 leading-relaxed mb-4">
                  {service.shortDesc}
                </p>

                <div className="space-y-1.5 mb-6 pt-2 border-t border-white/5 light:border-slate-100">
                  {service.capabilities.slice(0, 3).map((cap, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300 light:text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 group-hover:translate-x-1 transition-all pt-2 border-t border-white/5"
              >
                <span>Request this Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
