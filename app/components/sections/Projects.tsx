'use client';

import { useState, useEffect } from 'react';
import { ArrowUpRight, TrendingUp, Zap, ShoppingCart, Ticket, Bot, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const projects = [
  {
    icon: TrendingUp,
    title: "Digital Advertising Platform",
    category: "Media & Advertising",
    challenge: "Simplify advertising booking process to boost revenue for a major media company.",
    approach: "Designed and launched a user-centric platform featuring real-time analytics and intuitive navigation.",
    outcome: "Achieved ₹2.5Cr revenue within 5 months post-launch.",
    tags: ["Digital Advertising", "Platform Development", "Revenue Growth"],
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: Zap,
    title: "Print Subscription Transformation",
    category: "Digital Transformation",
    challenge: "Modernize traditional print subscription systems to enhance efficiency.",
    approach: "Developed integrated digital solutions for sales, distribution, and subscription management.",
    outcome: "60% efficiency improvement and 50% cost reduction.",
    tags: ["Subscription Management", "Cost Reduction", "Operational Efficiency"],
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Payment Integration",
    category: "FinTech",
    challenge: "Improve payment success rates and conversion metrics in online retail.",
    approach: "Integrated advanced payment gateways and optimized product bundling strategies.",
    outcome: "Significantly enhanced payment success and conversion rates.",
    tags: ["E-commerce", "Payment Integration", "Conversion Optimization"],
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    icon: Ticket,
    title: "Digital Event Ticketing System",
    category: "Event Management",
    challenge: "Create a seamless digital platform for event ticket sales and management.",
    approach: "Developed comprehensive ticketing with secure payments and user-friendly interfaces.",
    outcome: "Established new revenue stream with substantial initial earnings.",
    tags: ["Event Ticketing", "User Experience", "Revenue Generation"],
    color: "bg-rose-500/10 text-rose-600",
  },
  {
    icon: Bot,
    title: "AI-Powered Support Chatbot",
    category: "AI & Automation",
    challenge: "Enhance customer service efficiency without increasing operational costs.",
    approach: "Led development of AI chatbot with natural language processing capabilities.",
    outcome: "70% reduction in response time, improved satisfaction scores.",
    tags: ["AI Technology", "NLP", "Customer Support"],
    color: "bg-violet-500/10 text-violet-600",
  },
];

export function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance carousel every 3 seconds
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  return (
    <section id="projects" className="py-7 md:py-10 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-accent font-medium text-sm uppercase tracking-widest">Portfolio</span>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-foreground mt-4 mb-6">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg">
            A selection of impactful products and initiatives that drove measurable business results.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Carousel Track */}
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="min-w-full px-4"
              >
                <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-card border border-border hover:border-accent/30 hover:shadow-elevated transition-all duration-500 flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-xl ${project.color} flex items-center justify-center`}>
                      <project.icon className="w-7 h-7" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                  </div>

                  {/* Content */}
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-4 hover:text-accent transition-colors">
                    {project.title}
                  </h3>

                  <div className="space-y-4 flex-grow">
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Challenge</span>
                      <p className="text-foreground/80 text-sm mt-1">{project.challenge}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Approach</span>
                      <p className="text-foreground/80 text-sm mt-1">{project.approach}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-accent uppercase tracking-wider">Outcome</span>
                      <p className="text-foreground font-medium text-sm mt-1">{project.outcome}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border hover:border-accent/60 flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-10"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border hover:border-accent/60 flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-10"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-accent'
                  : 'w-2 bg-border hover:bg-accent/50'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a href="https://www.linkedin.com/in/swatisahu0190/" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg" className="gap-2">
              View More on LinkedIn
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
