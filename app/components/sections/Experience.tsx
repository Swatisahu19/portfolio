'use client';

import { Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    title: "Principal Product Manager",
    company: "Hindustan Times Digital",
    period: "May 2022 - Present",
    location: "India",
    description: "Leading product strategy and digital transformation initiatives for one of India's largest media organizations.",
    skills: ["Product Strategy", "Digital Transformation", "Revenue Growth", "Team Leadership", "Agile Methodology"],
    highlights: [
      "Led development of digital ad booking platform achieving ₹2.5Cr revenue in 5 months",
      "Orchestrated print circulation digitization with 60% efficiency improvement",
      "Reduced operational costs by 50% through strategic digital solutions",
    ],
  },
  {
    title: "Product Manager – Digital Solutions",
    company: "Max Life Insurance",
    period: "Dec 2021 - May 2022",
    location: "India",
    description: "Drove digital product initiatives and API integrations for enhanced customer experience.",
    skills: ["Product Roadmap", "API Integration", "Process Optimization", "Lead Generation"],
    highlights: [
      "Improved delivery efficiency by 12% through optimized product roadmaps",
      "Reduced API integration downtime by 15%",
      "Expedited digital enhancements by 10%",
    ],
  },
  {
    title: "Assistant Product Manager",
    company: "The Smart Cube",
    period: "Apr 2019 - Dec 2021",
    location: "India",
    description: "Managed product analytics and feature development for business intelligence solutions.",
    skills: ["User Retention", "Data Analysis", "Feature Development", "A/B Testing"],
    highlights: [
      "Boosted user retention by 15% through innovative features",
      "Reduced delivery turnaround time by 25%",
    ],
  },
  {
    title: "Team Lead – Competitive Intelligence",
    company: "Phronesis Partners",
    period: "May 2015 - Mar 2019",
    location: "India",
    description: "Led competitive analysis and market intelligence initiatives for strategic planning.",
    skills: ["Competitive Analysis", "Project Management", "Market Intelligence", "Strategic Planning"],
    highlights: [
      "Built and led high-performing analysis teams",
      "Delivered actionable market insights for executive decision-making",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-7 md:py-10 bg-[#0F172A] dark:bg-[#0F172A]">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-white font-medium text-sm uppercase tracking-widest">Career Journey</span>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
            Professional Experience
          </h2>
          <p className="text-white/70 text-lg">
            A decade of driving product innovation and digital transformation across diverse industries.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line - white */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white" />

            {experiences.map((exp, index) => (
              <div
                key={exp.title + exp.company}
                className="relative mb-12 last:mb-0 pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute top-0 left-6 w-5 h-5 bg-white rounded-full border-4 border-[#0F172A] shadow-lg -translate-x-1/2" />

                <div className="p-6 bg-white/10 rounded-2xl border border-white/20 shadow-soft hover:shadow-card transition-all duration-300">
                  <div className="flex flex-wrap items-start gap-2 mb-3">
                    <Badge variant="accent" className="text-xs text-white">
                      {exp.period}
                    </Badge>
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-white mb-1">
                    {exp.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
                    <Briefcase className="w-4 h-4" />
                    <span>{exp.company}</span>
                  </div>

                  <p className="text-white/70 text-sm mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="space-y-2 mb-4">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="text-white/90 text-sm flex items-start gap-2">
                        <span className="text-accent mt-1.5 flex-shrink-0 font-bold">•</span>
                        <span className="flex-1">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <Badge 
                        key={skill} 
                        variant="outline" 
                        className="text-xs border-2 border-white/30 hover:border-accent/60 text-white transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
