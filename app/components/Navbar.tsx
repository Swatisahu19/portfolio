'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md dark:bg-gray-900/80' : 'bg-transparent'
    }`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-purple-600 rounded-lg">
                <span className="text-white text-lg font-bold">SS</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Swati Sahu
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                href="#about"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
              >
                About
              </a>
              <a
                href="#skills"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
              >
                Skills
              </a>
              <a
                href="#projects"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
              >
                Projects
              </a>
              <a
                href="#experience"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
              >
                Experience
              </a>
              <a
                href="#contact"
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="space-y-1 px-2 pb-3 pt-2">
          <a
            href="#about"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-purple-600 dark:text-gray-300 dark:hover:bg-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </a>
          <a
            href="#skills"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-purple-600 dark:text-gray-300 dark:hover:bg-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Skills
          </a>
          <a
            href="#projects"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-purple-600 dark:text-gray-300 dark:hover:bg-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
          </a>
          <a
            href="#experience"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-purple-600 dark:text-gray-300 dark:hover:bg-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Experience
          </a>
          <a
            href="#contact"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-purple-600 dark:text-gray-300 dark:hover:bg-gray-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
} 