/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { usePortfolioStore } from '../store/useStore';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const { projects, settings } = usePortfolioStore();
  const featuredProjects = projects.slice(0, 2);
  
  const { scrollYProgress } = useScroll();
  const lineScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.5]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="relative bg-brand-bg"
    >
      {/* Hero Section - Text & Architecture Focused */}
      <section className="relative h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
        {/* Architectural Lines Overlay */}
        <motion.div 
          style={{ scale: lineScale }}
          className="absolute inset-0 z-0 pointer-events-none opacity-5"
        >
          <div className="absolute top-[20%] left-0 w-full h-[1px] bg-brand-accent"></div>
          <div className="absolute top-[80%] left-0 w-full h-[1px] bg-brand-accent"></div>
          <div className="absolute left-[20%] top-0 w-[1px] h-full bg-brand-accent"></div>
          <div className="absolute left-[80%] top-0 w-[1px] h-full bg-brand-accent"></div>
        </motion.div>

        <div className="relative z-10 max-w-6xl w-full px-8">
          <div className="flex flex-col items-start">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-brand-accent text-sm font-bold tracking-[0.5em] mb-6 border-l-2 border-brand-accent pl-4 uppercase"
            >
              {settings.homeHeroSubtitle}
            </motion.span>
            
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-4xl md:text-6xl font-bold mb-8 leading-[1.1] tracking-tighter text-brand-accent whitespace-pre-line"
            >
              {settings.homeHeroTitle}
            </motion.h1>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-12">
               <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="text-sm md:text-base font-light leading-relaxed text-brand-text max-w-xl whitespace-pre-line"
              >
                {settings.homeIntroText}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex items-center space-x-6 h-fit"
              >
                 <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand-accent/40">{settings.homeLabelScroll}</span>
                 <div className="w-12 h-[1px] bg-brand-accent/40"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects with Green Accents */}
      <section className="px-8 pb-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-24 border-b border-brand-accent/10 pb-12">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-brand-accent whitespace-pre-line">{settings.homeLabelWorks}</h2>
            <Link to="/projects" className="group flex items-center space-x-3 text-[10px] font-bold tracking-[0.5em] text-brand-accent hover:text-brand-text transition-colors py-4 px-8 border border-brand-accent/20 rounded-full">
              <span>{settings.homeLabelExplore}</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-20">
            {featuredProjects.map((project) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group flex flex-col space-y-8"
              >
                <Link to={`/projects/${project.id}`} className="block aspect-square overflow-hidden bg-brand-gray relative">
                  <img 
                    src={project.heroImage} 
                    alt={project.title}
                    className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-brand-accent/5 group-hover:bg-transparent transition-colors"></div>
                </Link>
                <div className="space-y-4">
                  <span className="text-[10px] font-bold tracking-[0.4em] text-brand-accent uppercase">{project.category}</span>
                  <h3 className="text-3xl font-bold text-brand-text">{project.title}</h3>
                  <p className="text-brand-text/70 font-light text-sm leading-relaxed line-clamp-2">
                    {project.shortDescription}
                  </p>
                  <Link 
                    to={`/projects/${project.id}`}
                    className="inline-flex items-center space-x-4 pt-4 text-[10px] font-bold tracking-widest text-brand-accent border-b border-brand-accent/20 pb-2 hover:border-brand-accent transition-all"
                  >
                    {settings.homeLabelDiscover}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-40 px-8 bg-brand-accent text-white">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] tracking-[1em] uppercase font-bold opacity-50"
          >
            {settings.homePhilosophyTitle}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-lg md:text-3xl font-light leading-snug tracking-tight whitespace-pre-line"
          >
            {settings.homePhilosophyText}
          </motion.p>
          <div className="w-px h-24 bg-white/20 mx-auto"></div>
        </div>
      </section>

      <footer className="py-20 text-center border-t border-brand-accent/5">
        <p className="text-[10px] tracking-[0.5em] text-brand-text/40 font-bold uppercase">
          &copy; 2024 {settings.siteTitle} DESIGNED BY {(settings.aboutName || '').toUpperCase()}
        </p>
      </footer>
    </motion.main>
  );
}
