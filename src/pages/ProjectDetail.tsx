/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { usePortfolioStore } from '../store/useStore';
import { ArrowLeft, ChevronDown } from 'lucide-react';

export default function ProjectDetail() {
  const { id } = useParams();
  const { projects, settings } = usePortfolioStore();
  const project = projects.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) return (
    <div className="h-screen flex items-center justify-center">
      <p className="font-serif italic">{settings.projectLabelNotFound}</p>
    </div>
  );

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-brand-bg min-h-screen"
    >
      {/* Intro Section */}
      <section className="relative h-screen flex flex-col justify-end p-8 md:p-20 overflow-hidden">
        <div className="absolute inset-0 z-0 scale-110">
           <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover brightness-50" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <Link to="/projects" className="inline-flex items-center space-x-2 text-[10px] tracking-widest text-brand-white/40 hover:text-brand-white mb-12 transition-colors">
            <ArrowLeft size={12} />
            <span>{settings.projectLabelBack}</span>
          </Link>
          <div className="space-y-6">
            <h1 className="text-6xl md:text-9xl font-serif leading-none tracking-tighter text-brand-white">{project.title}</h1>
            <p className="text-xl md:text-2xl font-light tracking-wide text-brand-white/80 max-w-2xl">{project.shortDescription}</p>
          </div>
          <div className="mt-20 flex justify-center animate-bounce">
             <ChevronDown size={32} className="text-brand-white/20" />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 py-40">
        {/* Background & Analysis */}
        <section className="grid md:grid-cols-2 gap-20 mb-60">
           <div className="space-y-12">
              <div>
                <h2 className="text-[10px] tracking-[0.5em] text-brand-accent mb-6 uppercase">{settings.projectLabelContext}</h2>
                <h3 className="text-4xl font-serif mb-4 text-brand-text">{settings.projectLabelContext}</h3>
                <p className="text-lg font-light leading-relaxed text-brand-text/60">{project.backgroundIssue}</p>
              </div>
              <div>
                <h3 className="text-4xl font-serif mb-4 text-brand-text">{settings.projectLabelAnalysis}</h3>
                <p className="text-brand-text/60 font-light leading-relaxed">{project.backgroundAnalysis}</p>
              </div>
           </div>
           <div className="flex flex-col justify-center bg-brand-text/[0.02] p-12 border border-brand-text/5">
              <h2 className="text-[10px] tracking-[0.5em] text-brand-accent mb-6 uppercase">{settings.projectLabelConcept}</h2>
              <h3 className="text-5xl font-serif mb-8 text-brand-text">{project.conceptIdea}</h3>
              <div className="flex flex-wrap gap-4">
                 {project.conceptKeywords.map(k => (
                   <span key={k} className="text-[10px] tracking-widest px-4 py-2 border border-brand-text/10 text-brand-text/40 uppercase">#{k}</span>
                 ))}
              </div>
           </div>
        </section>

        {/* Spatial Scenario */}
        <section className="mb-60">
           <h2 className="text-5xl font-serif mb-20 text-center text-brand-text">{settings.projectLabelScenario}</h2>
           <div className="space-y-32">
             {project.scenarios.map((scenario, idx) => (
                <div key={idx} className="flex flex-col md:flex-row items-center gap-20">
                   <div className="flex-1 text-center md:text-right">
                      <span className="text-[10px] text-brand-accent tracking-[1em] mb-4 block">{settings.projectLabelStep} 0{idx+1}</span>
                      <h3 className="text-5xl font-serif mb-6 text-brand-text">{scenario.title}</h3>
                      <p className="text-brand-text/50 text-light leading-relaxed">{scenario.description}</p>
                   </div>
                   <div className="w-[1px] h-32 bg-brand-accent/20 hidden md:block"></div>
                   <div className="flex-1 flex flex-col items-center md:items-start text-brand-text">
                      {/* Diagram Placeholder */}
                      <div className="w-24 h-24 rounded-full border border-brand-accent/40 flex items-center justify-center italic text-brand-accent/30 text-xs">
                         {settings.projectLabelStep} {idx+1}
                      </div>
                   </div>
                </div>
             ))}
           </div>
        </section>

        {/* Programs */}
        <section className="mb-60 grid md:grid-cols-2 gap-20 items-center">
           <div className="order-2 md:order-1">
             <div className="grid grid-cols-1 gap-8">
                {project.programs.map((p, i) => (
                  <div key={i} className="group border-l border-brand-text/10 pl-8 hover:border-brand-accent transition-colors duration-500">
                     <h4 className="text-[10px] tracking-[0.3em] text-brand-text/40 group-hover:text-brand-accent transition-colors">{settings.projectLabelZone} 0{i+1}</h4>
                     <h3 className="text-2xl font-serif my-2 text-brand-text">{p.zone}</h3>
                     <p className="text-sm text-brand-text/40 font-light">{p.description}</p>
                  </div>
                ))}
             </div>
           </div>
           <div className="order-1 md:order-2">
             <h2 className="text-6xl font-serif text-right leading-tight text-brand-text whitespace-pre-line">{settings.projectLabelPrograms}</h2>
           </div>
        </section>

        {/* Strategy */}
        <section className="mb-60 bg-brand-text/[0.02] p-20 border border-brand-text/5">
           <h2 className="text-3xl font-serif mb-16 text-center italic text-brand-text">{settings.projectLabelStrategies}</h2>
           <div className="grid md:grid-cols-4 gap-12">
              {project.strategies.map((s, i) => (
                <div key={i} className="text-center md:text-left">
                   <h3 className="text-xl font-serif mb-4 text-brand-text">{s.title}</h3>
                   <div className="w-10 h-[1px] bg-brand-accent mb-6"></div>
                   <p className="text-xs text-brand-text/50 leading-relaxed font-light">{s.description}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Visuals */}
        <section className="mb-40 space-y-20">
           {project.visuals.map((v, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="w-full aspect-video grayscale hover:grayscale-0 transition-all duration-1000"
             >
               <img src={v} alt={`${project.title} Visual ${i+1}`} className="w-full h-full object-cover" />
             </motion.div>
           ))}
        </section>

        <footer className="pt-20 border-t border-brand-text/10 flex justify-between items-center">
           <p className="text-[10px] tracking-widest text-brand-text/30">{settings.projectLabelDate}: {project.date}</p>
           <Link to="/projects" className="text-[10px] tracking-[0.5em] hover:text-brand-accent transition-colors text-brand-text">{settings.projectLabelBack}</Link>
        </footer>
      </div>
    </motion.main>
  );
}
