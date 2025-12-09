'use client';

import { useEffect, useState } from 'react';
import { Linkedin, Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-[#E5E7EB] dark:bg-[#0F172A]/90 dark:border-slate-800'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#"
          className={`font-serif text-2xl font-semibold tracking-tight transition-colors ${
            isScrolled
              ? 'text-[#1F2937] hover:text-[#1E40AF] dark:text-white dark:hover:text-[#60A5FA]'
              : 'text-white hover:text-[#60A5FA]'
          }`}
        >
          Swati<span className="text-[#60A5FA]">.</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`font-sans text-sm font-medium transition-colors relative group ${
                isScrolled
                  ? 'text-[#6B7280] hover:text-[#111827] dark:text-gray-300 dark:hover:text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#60A5FA] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="https://www.linkedin.com/in/swatisahu0190/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#1E40AF] px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-[#153075] transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            Connect
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-white hover:text-[#60A5FA] focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="container mx-auto px-6 py-6 flex flex-col gap-4 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-xl border-b border-[#E5E7EB] dark:border-slate-800 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-sans text-lg font-medium text-[#1F2937] hover:text-[#1E40AF] dark:text-white dark:hover:text-[#60A5FA] transition-colors py-2"
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://www.linkedin.com/in/swatisahu0190/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-[#1E40AF] px-4 py-3 text-sm font-semibold text-white shadow hover:bg-[#153075] transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </header>
  );
}