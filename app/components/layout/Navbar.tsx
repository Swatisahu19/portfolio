'use client';

import { useState, useEffect } from "react";
import { Menu, X, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-xl shadow-soft border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#"
          className={`font-serif text-2xl font-semibold tracking-tight transition-colors ${
            isScrolled ? "text-foreground hover:text-accent" : "text-primary-foreground hover:text-accent"
          }`}
        >
          Swati<span className="text-accent">.</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`font-sans text-sm font-medium transition-colors relative group ${
                isScrolled 
                  ? "text-muted-foreground hover:text-foreground" 
                  : "text-primary-foreground/70 hover:text-primary-foreground"
              }`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="https://www.linkedin.com/in/swatisahu0190/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="default" size="sm" className="gap-2">
              <Linkedin className="w-4 h-4" />
              Connect
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-card/95 backdrop-blur-xl border-b border-border transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-sans text-lg font-medium text-foreground hover:text-accent transition-colors py-2"
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://www.linkedin.com/in/swatisahu0190/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2"
          >
            <Button variant="default" className="w-full gap-2">
              <Linkedin className="w-4 h-4" />
              Connect on LinkedIn
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
