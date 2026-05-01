/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Mail, Instagram, FileText, ArrowUpRight } from 'lucide-react';
import { usePortfolioStore } from '../store/useStore';

export default function Contact() {
  const { settings } = usePortfolioStore();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-20 px-8 min-h-screen flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-32">
           <section>
              <h1 className="text-6xl md:text-8xl font-serif mb-12">{settings.contactTitle}</h1>
              <p className="text-xl md:text-2xl font-light text-brand-text/60 leading-relaxed mb-12 max-w-md whitespace-pre-wrap">
                {settings.contactIntro}
              </p>
              
              <div className="space-y-8">
                 <a href={`mailto:${settings.contactEmail}`} className="group flex items-center justify-between border-b border-brand-text/10 pb-4 hover:border-brand-accent transition-colors">
                    <span className="flex items-center space-x-4">
                       <Mail size={16} className="text-brand-text/40" />
                       <span className="text-[10px] tracking-widest uppercase">{settings.contactEmail}</span>
                    </span>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                 </a>
                 <a href="#" className="group flex items-center justify-between border-b border-brand-text/10 pb-4 hover:border-brand-accent transition-colors">
                    <span className="flex items-center space-x-4">
                       <Instagram size={16} className="text-brand-text/40" />
                       <span className="text-[10px] tracking-widest uppercase">{settings.contactInstagram}</span>
                    </span>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                 </a>
                 <a href={settings.contactPortfolioUrl} className="group flex items-center justify-between border-b border-brand-text/10 pb-4 hover:border-brand-accent transition-colors">
                    <span className="flex items-center space-x-4">
                       <FileText size={16} className="text-brand-text/40" />
                       <span className="text-[10px] tracking-widest uppercase">{settings.contactLabelPortfolio}</span>
                    </span>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                 </a>
              </div>
           </section>
           
           <section className="flex flex-col justify-center">
              <div className="aspect-[4/5] bg-brand-gray border border-brand-text/5 relative overflow-hidden group">
                 <img src={settings.contactHeroImage} className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-70 transition-opacity duration-1000" alt="" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[1px] h-full bg-brand-text/10 absolute left-1/2 -translate-x-1/2"></div>
                    <div className="h-[1px] w-full bg-brand-text/10 absolute top-1/2 -translate-y-1/2"></div>
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="w-4 h-4 rounded-full bg-brand-accent shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                    ></motion.div>
                 </div>
              </div>
           </section>
        </div>
      </div>

      <footer className="mt-32 pt-12 border-t border-brand-text/10 text-center">
         <p className="text-[10px] tracking-[0.5em] text-brand-text/20 uppercase">&copy; 2024 {settings.siteTitle} {settings.footerLocation}</p>
      </footer>
    </motion.main>
  );
}
