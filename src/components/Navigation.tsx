/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { usePortfolioStore } from '../store/useStore';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navigation() {
  const { settings } = usePortfolioStore();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: settings.navHome, path: '/' },
    { name: settings.navAbout, path: '/about' },
    { name: settings.navProjects, path: '/projects' },
    { name: settings.navContact, path: '/contact' },
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6 px-8 flex justify-between items-center',
          scrolled ? 'bg-brand-bg/80 backdrop-blur-md py-4' : 'bg-transparent'
        )}
      >
        <NavLink to="/" className="flex flex-col z-50 group">
          <span className="text-xl font-serif tracking-[0.2em] font-light text-brand-text">{settings.siteTitle}</span>
          <span className="text-[8px] tracking-[0.4em] text-brand-text/40 font-bold uppercase -mt-1 group-hover:text-brand-accent transition-colors">{settings.siteSubtitle}</span>
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-12">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'text-[10px] tracking-[0.3em] transition-all duration-300 hover:text-brand-accent',
                  isActive ? 'text-brand-accent' : 'text-brand-text/60'
                )
              }
            >
              {item.name}
            </NavLink>
          ))}
          <NavLink to="/admin" className="text-[10px] tracking-[0.3em] text-brand-text/20 hover:text-brand-text transition-colors">ADMIN</NavLink>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 text-brand-text"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-brand-bg z-40 flex flex-col items-center justify-center space-y-8"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className="text-4xl font-serif tracking-widest hover:text-brand-accent transition-colors text-brand-text"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
