'use client';

const skillCategories = [
  {
    title: "Product & Project Management",
    skills: ["JIRA", "Confluence", "Notion", "ProductPlan", "Aha!", "Trello"],
  },
  {
    title: "Design & Prototyping",
    skills: ["Figma", "Balsamiq", "Whimsical", "Miro", "Proto.io", "Mockplus"],
  },
  {
    title: "Data Analytics & BI",
    skills: ["SQL", "Power BI", "Tableau", "Google Analytics"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS", "Heroku", "Zoho", "GitHub"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-7 md:py-10 bg-[#0F172A] dark:bg-[#0F172A]">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-white font-medium text-sm uppercase tracking-widest">Expertise</span>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
            Skills & Tools
          </h2>
          <p className="text-white/70 text-lg">
            A comprehensive toolkit for delivering exceptional product experiences.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="p-8 rounded-2xl bg-white/10 border border-white/20 hover:shadow-card transition-all duration-300"
            >
              <h3 className="font-serif text-xl font-semibold text-white mb-6">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-white/10 rounded-lg border-2 border-white/30 hover:border-accent/60 text-sm text-white font-medium hover:bg-accent/20 hover:text-accent transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
