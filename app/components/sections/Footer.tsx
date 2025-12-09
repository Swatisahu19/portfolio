'use client';

import { Linkedin, Mail, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <a href="#" className="font-serif text-2xl font-semibold">
              Swati<span className="text-accent">.</span>
            </a>
            <p className="text-primary-foreground/60 text-sm mt-2">
              Product Manager | Digital Transformation Leader
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/swatisahu0190/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:contact@swati-sahu.com"
              className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/10 text-center text-primary-foreground/50 text-sm">
          <p className="flex items-center justify-center gap-1">
            © {currentYear} Swati Sahu. Crafted with <Heart className="w-4 h-4 text-accent fill-accent" /> for great products.
          </p>
        </div>
      </div>
    </footer>
  );
}
