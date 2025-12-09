'use client';

import { Award, GraduationCap, Target, Users, Lightbulb, TrendingUp } from "lucide-react";

const competencies = [
  {
    icon: Target,
    title: "Product Vision & Strategy",
    description: "Crafting clear product visions and strategic plans that align with user needs and business objectives.",
  },
  {
    icon: Users,
    title: "Cross-Functional Leadership",
    description: "Leading engineering, design, and marketing teams to ensure cohesive product development.",
  },
  {
    icon: Lightbulb,
    title: "User-Centric Design",
    description: "Prioritizing user feedback to deliver exceptional customer experiences that drive retention.",
  },
  {
    icon: TrendingUp,
    title: "Data-Driven Decisions",
    description: "Leveraging analytics and market research to identify opportunities for innovation.",
  },
];

const certifications = [
  {
    title: "Certified Product Manager (CPM)",
    description: "Comprehensive expertise in product management principles",
  },
  {
    title: "Certified Scrum Product Owner (CSPO®)",
    description: "Expertise in Agile methodologies and product ownership",
  },
];

export function About() {
  return (
    <section id="about" className="py-7 md:py-10 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-accent font-medium text-sm uppercase tracking-widest">About Me</span>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-foreground mt-4 mb-6">
            Transforming Ideas Into
            <span className="gradient-text"> Impactful Products</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            As a Certified Product Manager with over a decade of experience, I've been at the forefront of driving digital transformation across media, financial services, and consulting industries.
          </p>
        </div>

        {/* Core Competencies */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {competencies.map((item, index) => (
            <div
              key={item.title}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-accent/30 hover:shadow-card transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <item.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Certifications & Education */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Certifications */}
          <div className="p-8 rounded-2xl bg-secondary border border-border">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-foreground">Certifications</h3>
            </div>
            <div className="space-y-6">
              {certifications.map((cert) => (
                <div key={cert.title} className="border-l-2 border-accent pl-6 py-2">
                  <h4 className="font-semibold text-foreground mb-1">{cert.title}</h4>
                  <p className="text-muted-foreground text-sm">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="p-8 rounded-2xl bg-secondary border border-border">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-foreground">Education</h3>
            </div>
            <div className="space-y-6">
              <div className="border-l-2 border-accent pl-6 py-2">
                <h4 className="font-semibold text-foreground mb-1">
                  Growth Product Management & Digital Transformation
                </h4>
                <p className="text-muted-foreground text-sm">Duke Corporate Education • 2021-2022</p>
              </div>
              <div className="border-l-2 border-accent pl-6 py-2">
                <h4 className="font-semibold text-foreground mb-1">B.Tech in Computer Science</h4>
                <p className="text-muted-foreground text-sm">Sharda University • 2011-2015</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
