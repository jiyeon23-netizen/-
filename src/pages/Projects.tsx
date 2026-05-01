/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { usePortfolioStore } from '../store/useStore';

export default function Projects() {
  const { projects, settings } = usePortfolioStore();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-brand-bg min-h-screen pt-40 pb-20"
    >
      <div className="px-8 max-w-7xl mx-auto">
        <header className="mb-20">
           <h1 className="text-6xl md:text-8xl font-serif mb-4 text-brand-text">{settings.projectsTitle}</h1>
           <p className="text-[10px] tracking-[0.5em] text-brand-text/40 uppercase font-light">{settings.projectsSubtitle}</p>
        </header>

        <div className="space-y-40 text-brand-text">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="group"
            >
              <Link to={`/projects/${project.id}`} className="block relative aspect-[21/9] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                <img 
                   src={project.heroImage} 
                   alt={project.title}
                   className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-brand-bg/20 group-hover:bg-transparent transition-colors duration-500"></div>
                
                {/* Overlay Text */}
                <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                   <div className="space-y-2">
                      <span className="text-[10px] tracking-widest uppercase text-brand-accent">{project.category}</span>
                      <h2 className="text-4xl md:text-6xl font-serif text-white shadow-sm">{project.title}</h2>
                   </div>
                   <div className="hidden md:block">
                      <p className="text-[10px] tracking-[0.3em] font-light max-w-xs text-right text-brand-text/80">
                        {project.shortDescription}
                      </p>
                   </div>
                </div>
              </Link>
              
              <div className="mt-8 flex justify-between items-start">
                 <p className="text-xs font-light text-brand-text/40 tracking-wider">{settings.projectsLabelNumber} 0{idx + 1}</p>
                 <Link to={`/projects/${project.id}`} className="text-[10px] tracking-[0.5em] hover:text-brand-accent transition-colors">{settings.projectsLabelView}</Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.main>
  );
}
