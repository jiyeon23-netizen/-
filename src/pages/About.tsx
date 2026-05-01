/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

import { usePortfolioStore } from '../store/useStore';

export default function About() {
  const { settings } = usePortfolioStore();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-32 px-8 min-h-screen bg-brand-bg"
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-32">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl md:text-8xl font-serif mb-12"
          >
            {settings.aboutTitle}
          </motion.h1>
          <div className="flex flex-col md:flex-row gap-20 items-start">
             <div className="flex-1">
               <p className="text-xl md:text-3xl font-light leading-snug text-brand-text/90 whitespace-pre-line">
                 {settings.aboutIntro}
               </p>
               <div className="mt-12 flex flex-wrap gap-3">
                  {settings.aboutKeywords.map((word) => (
                    <span key={word} className="px-5 py-2 bg-brand-accent/5 border border-brand-accent/10 rounded-full text-[10px] tracking-widest uppercase text-brand-accent font-medium">
                      {word}
                    </span>
                  ))}
               </div>

               <div className="mt-16 border-t border-brand-accent/5 pt-12 space-y-12">
                  <div className="text-center md:text-left">
                     <p className="text-[10px] font-bold text-brand-accent/40 tracking-[0.4em] uppercase mb-2">Architect / Designer</p>
                     <h2 className="text-xl md:text-2xl font-bold text-brand-accent tracking-tighter">{settings.aboutName}</h2>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-x-16 gap-y-6">
                     <div className="space-y-1">
                        <p className="text-[8px] font-bold text-brand-accent/40 tracking-[0.3em] uppercase">Birthdate</p>
                        <p className="text-sm font-medium text-brand-text/80">{settings.aboutBirthdate}</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[8px] font-bold text-brand-accent/40 tracking-[0.3em] uppercase">Phone</p>
                        <p className="text-sm font-medium text-brand-text/80">{settings.aboutPhone}</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[8px] font-bold text-brand-accent/40 tracking-[0.3em] uppercase">Email</p>
                        <p className="text-sm font-medium text-brand-text/80">{settings.aboutEmail}</p>
                     </div>
                  </div>
               </div>
             </div>
             <div className="flex-1 aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 w-full">
                <img src={settings.aboutProfileImage} alt="Profile" className="w-full h-full object-cover" />
             </div>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-x-32 gap-y-24 border-t border-brand-accent/10 pt-24">
           {settings.aboutSections.map((section) => (
             <div key={section.title} className="space-y-12">
                <h2 className="text-[10px] tracking-[0.5em] text-brand-accent font-bold uppercase">{section.title}</h2>
                <div className="space-y-8">
                   {section.items.map((item, idx) => (
                     <div key={idx} className="group">
                        <p className="text-xs text-brand-text/40 tracking-[0.2em] mb-2 uppercase">{item.label}</p>
                        <p className="text-lg font-serif font-light group-hover:text-brand-accent transition-colors text-brand-text">{item.value}</p>
                     </div>
                   ))}
                </div>
             </div>
           ))}
        </div>

        <section className="mt-40 p-16 bg-brand-gray border border-brand-accent/5 text-center">
           <h3 className="text-2xl font-serif italic mb-8 whitespace-pre-line text-brand-text">{settings.aboutStatementTitle}</h3>
           <p className="text-sm font-light text-brand-text/60 max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
             {settings.aboutStatementText}
           </p>
        </section>
      </div>
    </motion.main>
  );
}
