'use client';

import { ArrowDown, Linkedin, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="text-primary-foreground">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full text-accent text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4" />
                Leading AI-Powered Product Innovation
              </div>
            </div>

            <h1 className="animate-fade-up stagger-1 font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Swati Sahu
            </h1>

            <p className="animate-fade-up stagger-2 text-xl md:text-2xl text-primary-foreground/80 font-light mb-4">
              Certified Product Manager | CSPO® | Digital Transformation
            </p>

            <p className="animate-fade-up stagger-3 text-lg text-primary-foreground/60 max-w-xl mb-10 leading-relaxed">
              I transform ideas into impactful digital solutions through data-driven strategies and user-centric design. Over a decade of experience driving product innovation.
            </p>

            <div className="animate-fade-up stagger-4 flex flex-wrap gap-4">
              <a href="https://www.linkedin.com/in/swatisahu0190/" target="_blank" rel="noopener noreferrer">
                <Button variant="accent" size="lg" className="gap-2">
                  <Linkedin className="w-5 h-5" />
                  Connect on LinkedIn
                </Button>
              </a>
              <a href="#contact">
                <Button variant="hero" size="lg" className="gap-2">
                  <Mail className="w-5 h-5" />
                  Get in Touch
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="animate-fade-up stagger-5 grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-primary-foreground/10">
              <div>
                <div className="font-serif text-3xl md:text-4xl font-bold text-accent">10+</div>
                <div className="text-primary-foreground/60 text-sm mt-1">Years Experience</div>
              </div>
              <div>
                <div className="font-serif text-3xl md:text-4xl font-bold text-accent">₹2.5Cr</div>
                <div className="text-primary-foreground/60 text-sm mt-1">Revenue Generated</div>
              </div>
              <div>
                <div className="font-serif text-3xl md:text-4xl font-bold text-accent">60%</div>
                <div className="text-primary-foreground/60 text-sm mt-1">Efficiency Boost</div>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="animate-scale-in stagger-3 relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-full border-2 border-accent/30 animate-pulse" />
              <div className="absolute -inset-8 rounded-full border border-accent/10" />
              
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-elevated border-4 border-accent/20">
                <img
                  src="/images/profile.jpg"
                  alt="Swati Sahu - Product Manager"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-card px-6 py-3 rounded-full shadow-elevated">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-foreground font-medium text-sm">Open to opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="animate-fade-up stagger-6 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary-foreground/40">
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
