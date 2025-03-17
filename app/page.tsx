'use client';

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { FadeIn, SlideIn, ScaleIn } from './components/Animations';

const skills = [
  {
    category: "Product & Project Management",
    items: [
      { name: "JIRA", icon: "📋" },
      { name: "Confluence", icon: "📚" },
      { name: "Notion", icon: "📝" },
      { name: "ProductPlan", icon: "📊" },
      { name: "Aha!", icon: "🎯" },
      { name: "Trello", icon: "📋" },
    ]
  },
  {
    category: "Design & Prototyping",
    items: [
      { name: "Figma", icon: "🎨" },
      { name: "Balsamiq", icon: "✏️" },
      { name: "Whimsical", icon: "💡" },
      { name: "Miro", icon: "🎯" },
      { name: "Proto.io", icon: "📱" },
      { name: "Mockplus", icon: "🖼️" },
    ]
  },
  {
    category: "Data Analytics & BI",
    items: [
      { name: "SQL", icon: "💾" },
      { name: "Power BI", icon: "📊" },
      { name: "Tableau", icon: "📈" },
      { name: "Google Analytics", icon: "📱" },
    ]
  },
  {
    category: "Cloud & DevOps",
    items: [
      { name: "AWS", icon: "☁️" },
      { name: "Heroku", icon: "🚀" },
      { name: "Zoho", icon: "💼" },
      { name: "GitHub", icon: "🐙" },
    ]
  }
];

interface VisibilityState {
  projects: boolean;
  journey: boolean;
  contact: boolean;
}

export default function Home() {
  const [visibleSection, setVisibleSection] = useState<VisibilityState>({
    projects: false,
    journey: false,
    contact: false
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const totalSlides = 5;

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto-advance slides every 8 seconds, but only if not hovered
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isHovered) {
      timer = setInterval(handleNextSlide, 8000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isHovered]);

  return (
    <main className="bg-white dark:bg-[#1E293B]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#F3F4F6] to-white dark:from-[#1E293B] dark:to-[#0F172A]">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 border border-[#E5E7EB] dark:border-[#374151] rounded-xl shadow-lg bg-white/50 dark:bg-[#1E293B]/50 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center md:text-left">
              <FadeIn delay={0.2}>
                <h1 className="text-4xl md:text-6xl font-bold text-[#1E40AF] dark:text-white mb-4">
                  Swati Sahu
                </h1>
                <p className="text-xl md:text-2xl text-[#4B5563] dark:text-[#60A5FA] mb-2 whitespace-nowrap">
                  Certified Product Manager | CSPO® | Digital Transformation
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <p className="text-lg text-[#4B5563] dark:text-[#60A5FA] mb-6">
                  Current: Leading AI-Powered Product Innovation 🚀
                </p>
              </FadeIn>
              <FadeIn delay={0.6}>
                <p className="text-lg text-[#4B5563] dark:text-[#60A5FA] mb-8">
                  Welcome to my portfolio! I transform ideas into impactful digital solutions through data-driven strategies and user-centric design.
                </p>
              </FadeIn>
              <FadeIn delay={0.6}>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <a
                    href="https://www.linkedin.com/in/swatisahu0190/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#2563EB] hover:bg-[#1E40AF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563EB]"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-.88-.06-1.273-1.16-1.273-1.17 0-1.33.91-1.33 1.235v5.642h-3v-11h3v1.493c.43-.623 1.17-1.273 2.38-1.273 1.9 0 3.11 1.248 3.11 3.676v6.104z"/>
                    </svg>
                    Connect on LinkedIn
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center px-6 py-3 border border-[#2563EB] text-base font-medium rounded-md text-[#2563EB] bg-transparent hover:bg-[#F3F4F6] dark:text-white dark:hover:bg-[#1E293B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563EB]"
                  >
                    Get in Touch
                  </a>
                </div>
              </FadeIn>
            </div>
            <div className="flex-1 flex justify-center">
              <ScaleIn delay={0.4}>
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <div className="absolute inset-0 bg-[#2563EB] rounded-full opacity-20 animate-pulse"></div>
                  <img
                    src="/images/profile.jpg"
                    alt="Swati Sahu"
                    className="relative rounded-full w-full h-full object-cover border-4 border-white dark:border-[#1E293B] shadow-xl transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </ScaleIn>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 bg-gradient-to-br from-[#F3F4F6] via-white to-[#F3F4F6] dark:from-[#1E293B] dark:via-[#0F172A] dark:to-[#1E293B]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 border border-[#E5E7EB] dark:border-[#374151] rounded-xl shadow-lg bg-white/50 dark:bg-[#1E293B]/50 backdrop-blur-sm">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1E40AF] dark:text-white mb-8">
              About Me
            </h2>
          </FadeIn>
          <div className="space-y-4">
            <FadeIn delay={0.2}>
              <div className="bg-gradient-to-br from-white via-[#F3F4F6] to-white dark:from-[#1E293B] dark:via-[#0F172A] dark:to-[#1E293B] rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-2">👋</span>
                  <h3 className="text-xl font-bold text-[#1E40AF] dark:text-white">Welcome to My Portfolio</h3>
                </div>
                <p className="text-base text-[#4B5563] dark:text-[#60A5FA] leading-relaxed">
                  Where innovation and strategic leadership converge. As a <span className="font-semibold text-[#1E40AF] dark:text-[#60A5FA]">Certified Product Manager (CPM)</span> and <span className="font-semibold text-[#1E40AF] dark:text-[#60A5FA]">Certified Scrum Product Owner (CSPO®)</span> with over a decade of experience, I have been at the forefront of driving digital transformation across diverse industries, including media, financial services, and consulting.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <div className="flex items-center bg-white dark:bg-[#1E293B] px-3 py-1.5 rounded-full">
                    <span className="mr-2">🎯</span>
                    <span className="text-sm font-medium text-[#4B5563] dark:text-[#60A5FA]">10+ Years Experience</span>
                  </div>
                  <div className="flex items-center bg-white dark:bg-[#1E293B] px-3 py-1.5 rounded-full">
                    <span className="mr-2">💡</span>
                    <span className="text-sm font-medium text-[#4B5563] dark:text-[#60A5FA]">Digital Transformation</span>
                  </div>
                  <div className="flex items-center bg-white dark:bg-[#1E293B] px-3 py-1.5 rounded-full">
                    <span className="mr-2">🚀</span>
                    <span className="text-sm font-medium text-[#4B5563] dark:text-[#60A5FA]">Strategic Leadership</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-lg p-5">
                <h3 className="text-xl font-bold text-[#1E40AF] dark:text-white mb-4">Digital Transformation Leadership</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Media Industry */}
                  <div className="bg-gradient-to-br from-white via-[#F3F4F6] to-white dark:from-[#1E293B] dark:via-[#0F172A] dark:to-[#1E293B] rounded-lg p-4 transform hover:scale-105 transition-transform duration-300 relative overflow-hidden group hover:from-white hover:via-[#F3F4F6] hover:to-white">
                    <div className="relative">
                      <h4 className="text-base font-semibold text-[#1E40AF] dark:text-[#60A5FA] mb-2 flex items-center">
                        <span className="mr-2">📱</span>
                        Digital Media
                      </h4>
                      <ul className="text-sm text-[#4B5563] dark:text-[#60A5FA] space-y-2">
                        <li className="flex items-start">
                          <span className="mr-2 mt-1">🎯</span>
                          Led the development of a digital ad booking platform, achieving a revenue milestone of ₹2.5 Cr within five months.
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-1">📈</span>
                          Orchestrated the comprehensive digitization of a substantial print circulation business, resulting in a 60% enhancement in operational efficiency and a 50% reduction in costs.
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* Financial Services */}
                  <div className="bg-gradient-to-br from-white via-[#F3F4F6] to-white dark:from-[#1E293B] dark:via-[#0F172A] dark:to-[#1E293B] rounded-lg p-4 transform hover:scale-105 transition-transform duration-300 relative overflow-hidden group hover:from-white hover:via-[#F3F4F6] hover:to-white">
                    <div className="relative">
                      <h4 className="text-base font-semibold text-[#1E40AF] dark:text-[#60A5FA] mb-2 flex items-center">
                        <span className="mr-2">💼</span>
                        Financial Services
                      </h4>
                      <ul className="text-sm text-[#4B5563] dark:text-[#60A5FA] space-y-2">
                        <li className="flex items-start">
                          <span className="mr-2 mt-1">📊</span>
                          Spearheaded the creation and execution of product roadmaps for digital solutions, leading to a 12% improvement in delivery efficiency.
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-1">⚡</span>
                          Implemented technological advancements that decreased API integration downtime by 15% and expedited digital enhancements by 10%.
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* Consulting Sector */}
                  <div className="bg-gradient-to-br from-white via-[#F3F4F6] to-white dark:from-[#1E293B] dark:via-[#0F172A] dark:to-[#1E293B] rounded-lg p-4 transform hover:scale-105 transition-transform duration-300 relative overflow-hidden group hover:from-white hover:via-[#F3F4F6] hover:to-white">
                    <div className="relative">
                      <h4 className="text-base font-semibold text-[#1E40AF] dark:text-[#60A5FA] mb-2 flex items-center">
                        <span className="mr-2">💡</span>
                        Business Consulting
                      </h4>
                      <ul className="text-sm text-[#4B5563] dark:text-[#60A5FA] space-y-2">
                        <li className="flex items-start">
                          <span className="mr-2 mt-1">🎯</span>
                          Introduced innovative product features that boosted user retention by 15%.
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-1">🤝</span>
                          Fostered cross-functional collaboration, reducing delivery turnaround time by 25% and enhancing overall project efficiency.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="bg-gradient-to-br from-white via-[#F3F4F6] to-white dark:from-[#1E293B] dark:via-[#0F172A] dark:to-[#1E293B] rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-2">🎯</span>
                  <h3 className="text-xl font-bold text-[#1E40AF] dark:text-white">Strategic Vision and Passion</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-base text-[#4B5563] dark:text-[#60A5FA] leading-relaxed">
                    My approach to digital transformation is anchored in a deep understanding of user needs, enabling the creation of exceptional customer experiences.
                  </p>
                  <p className="text-base text-[#4B5563] dark:text-[#60A5FA] leading-relaxed">
                    With over a decade in product management, I am dedicated to transforming innovative ideas into impactful products that resonate with users and drive business success. My journey has been defined by a commitment to strategic vision, user-centric design, and cross-functional collaboration.
                  </p>
                  <div className="bg-white dark:bg-[#1E293B] rounded-lg p-4 shadow-md">
                    <h4 className="text-lg font-semibold text-[#1E40AF] dark:text-[#60A5FA] mb-3">Core Competencies</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#1E40AF] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-white dark:bg-[#1E293B] rounded-lg p-4 shadow-lg transform hover:scale-[1.02] transition-all duration-300 group-hover:bg-[#F3F4F6] dark:group-hover:bg-[#0F172A]">
                          <div className="flex items-start space-x-3">
                            <span className="text-2xl mt-1 group-hover:scale-110 transition-transform duration-300">🎯</span>
                            <div>
                              <h5 className="font-semibold text-[#1E40AF] dark:text-[#60A5FA] mb-1 group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">Product Vision and Strategy</h5>
                              <p className="text-sm text-[#4B5563] dark:text-[#60A5FA] group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">I craft clear product visions and strategic plans that align with both user needs and business objectives, guiding teams toward shared goals.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#1E40AF] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-white dark:bg-[#1E293B] rounded-lg p-4 shadow-lg transform hover:scale-[1.02] transition-all duration-300 group-hover:bg-[#F3F4F6] dark:group-hover:bg-[#0F172A]">
                          <div className="flex items-start space-x-3">
                            <span className="text-2xl mt-1 group-hover:scale-110 transition-transform duration-300">🔍</span>
                            <div>
                              <h5 className="font-semibold text-[#1E40AF] dark:text-[#60A5FA] mb-1 group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">Market Research</h5>
                              <p className="text-sm text-[#4B5563] dark:text-[#60A5FA] group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">Through comprehensive market analysis and competitive research, I identify opportunities for innovation and product differentiation.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#1E40AF] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-white dark:bg-[#1E293B] rounded-lg p-4 shadow-lg transform hover:scale-[1.02] transition-all duration-300 group-hover:bg-[#F3F4F6] dark:group-hover:bg-[#0F172A]">
                          <div className="flex items-start space-x-3">
                            <span className="text-2xl mt-1 group-hover:scale-110 transition-transform duration-300">🤝</span>
                            <div>
                              <h5 className="font-semibold text-[#1E40AF] dark:text-[#60A5FA] mb-1 group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">Cross-Functional Collaboration</h5>
                              <p className="text-sm text-[#4B5563] dark:text-[#60A5FA] group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">I work closely with engineering, design, marketing, and sales teams to ensure cohesive product development and delivery, fostering a culture of collaboration and innovation.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#1E40AF] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-white dark:bg-[#1E293B] rounded-lg p-4 shadow-lg transform hover:scale-[1.02] transition-all duration-300 group-hover:bg-[#F3F4F6] dark:group-hover:bg-[#0F172A]">
                          <div className="flex items-start space-x-3">
                            <span className="text-2xl mt-1 group-hover:scale-110 transition-transform duration-300">👥</span>
                            <div>
                              <h5 className="font-semibold text-[#1E40AF] dark:text-[#60A5FA] mb-1 group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">User-Centric Design</h5>
                              <p className="text-sm text-[#4B5563] dark:text-[#60A5FA] group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">By prioritizing user needs and feedback, I ensure that products deliver exceptional customer experiences, enhancing satisfaction and loyalty.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#1E40AF] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-white dark:bg-[#1E293B] rounded-lg p-4 shadow-lg transform hover:scale-[1.02] transition-all duration-300 group-hover:bg-[#F3F4F6] dark:group-hover:bg-[#0F172A]">
                          <div className="flex items-start space-x-3">
                            <span className="text-2xl mt-1 group-hover:scale-110 transition-transform duration-300">🔄</span>
                            <div>
                              <h5 className="font-semibold text-[#1E40AF] dark:text-[#60A5FA] mb-1 group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">Product Lifecycle Management</h5>
                              <p className="text-sm text-[#4B5563] dark:text-[#60A5FA] group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">I oversee the entire product lifecycle, from ideation to launch and beyond, ensuring continuous improvement and alignment with market dynamics.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#1E40AF] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative bg-white dark:bg-[#1E293B] rounded-lg p-4 shadow-lg transform hover:scale-[1.02] transition-all duration-300 group-hover:bg-[#F3F4F6] dark:group-hover:bg-[#0F172A]">
                          <div className="flex items-start space-x-3">
                            <span className="text-2xl mt-1 group-hover:scale-110 transition-transform duration-300">💼</span>
                            <div>
                              <h5 className="font-semibold text-[#1E40AF] dark:text-[#60A5FA] mb-1 group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">Stakeholder Engagement</h5>
                              <p className="text-sm text-[#4B5563] dark:text-[#60A5FA] group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">I maintain strong relationships with stakeholders, ensuring that product strategies align with organizational goals and market expectations.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-base text-[#4B5563] dark:text-[#60A5FA] leading-relaxed">
                    My passion lies in delivering products that not only meet current market needs but also set new standards for excellence, driving both user satisfaction and business growth.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.5}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Certifications Box */}
                <div className="bg-gradient-to-br from-white via-[#F3F4F6] to-white dark:from-[#1E293B] dark:via-[#0F172A] dark:to-[#1E293B] rounded-xl shadow-lg p-6">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-2">🎯</span>
                    <h3 className="text-xl font-bold text-[#1E40AF] dark:text-white">Certifications</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-[#1E293B] rounded-lg p-4 shadow-md transform hover:scale-105 transition-transform duration-300">
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl mt-1">📋</span>
                        <div>
                          <h4 className="font-semibold text-[#1E40AF] dark:text-[#60A5FA] mb-1">Certified Product Manager (CPM)</h4>
                          <p className="text-sm text-[#4B5563] dark:text-[#60A5FA]">Demonstrates comprehensive knowledge in product management principles and practices.</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-[#1E293B] rounded-lg p-4 shadow-md transform hover:scale-105 transition-transform duration-300">
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl mt-1">⚡</span>
                        <div>
                          <h4 className="font-semibold text-[#1E40AF] dark:text-[#60A5FA] mb-1">Certified Scrum Product Owner (CSPO®)</h4>
                          <p className="text-sm text-[#4B5563] dark:text-[#60A5FA]">Signifies expertise in Agile methodologies and product ownership.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Education Box */}
                <div className="bg-gradient-to-br from-white via-[#F3F4F6] to-white dark:from-[#1E293B] dark:via-[#0F172A] dark:to-[#1E293B] rounded-xl shadow-lg p-6">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-2">🎓</span>
                    <h3 className="text-xl font-bold text-[#1E40AF] dark:text-white">Education</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-[#1E293B] rounded-lg p-4 shadow-md transform hover:scale-105 transition-transform duration-300">
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl mt-1">📈</span>
                        <div>
                          <h4 className="font-semibold text-[#1E40AF] dark:text-[#60A5FA] mb-1">Growth Product Management & Digital Transformation Specialization</h4>
                          <p className="text-sm text-[#4B5563] dark:text-[#60A5FA]">Duke Corporate Education (2021-2022)</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-[#1E293B] rounded-lg p-4 shadow-md transform hover:scale-105 transition-transform duration-300">
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl mt-1">💻</span>
                        <div>
                          <h4 className="font-semibold text-[#1E40AF] dark:text-[#60A5FA] mb-1">B.Tech in Computer Science</h4>
                          <p className="text-sm text-[#4B5563] dark:text-[#60A5FA]">Sharda University (2011-2015)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 bg-gradient-to-br from-white via-[#F3F4F6] to-white dark:from-[#1E293B] dark:via-[#0F172A] dark:to-[#1E293B]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 border border-[#E5E7EB] dark:border-[#374151] rounded-xl shadow-lg bg-white/50 dark:bg-[#1E293B]/50 backdrop-blur-sm">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1E40AF] dark:text-white mb-8">
              Skills & Expertise
            </h2>
          </FadeIn>
          
          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((category, index) => (
              <FadeIn key={category.category} delay={0.2 * (index + 1)}>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#2563EB] via-[#60A5FA] to-[#2563EB] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white dark:bg-[#1E293B] rounded-lg p-6 shadow-lg transform hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-[#F3F4F6] dark:bg-slate-900/50 rounded-lg">
                        <span className="text-2xl">{category.items[0].icon}</span>
                      </div>
                      <h3 className="ml-4 text-xl font-bold text-[#1E40AF] dark:text-white group-hover:text-[#0F172A] dark:group-hover:text-white transition-colors duration-300">
                        {category.category}
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {category.items.map((item) => (
                        <div key={item.name} className="flex items-center p-3 bg-[#F3F4F6] dark:bg-slate-900/50 rounded-lg hover:bg-[#E5E7EB] dark:hover:bg-slate-800/50 transition-all duration-300 group/item">
                          <span className="text-xl mr-3 group-hover/item:scale-110 transition-transform duration-300">{item.icon}</span>
                          <span className="text-base font-medium text-[#4B5563] dark:text-gray-300 group-hover/item:text-[#0F172A] dark:group-hover/item:text-white transition-colors duration-300">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 bg-white dark:bg-[#1E293B]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 border border-[#E5E7EB] dark:border-[#374151] rounded-xl shadow-lg bg-white/50 dark:bg-[#1E293B]/50 backdrop-blur-sm">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1E40AF] dark:text-white mb-8">
              Featured Projects
            </h2>
          </FadeIn>
          
          {/* Project Carousel */}
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={handlePrevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white dark:bg-[#1E293B] p-2 rounded-full shadow-lg hover:bg-[#F3F4F6] dark:hover:bg-[#0F172A] transition-colors duration-300"
              aria-label="Previous project"
            >
              <svg className="w-6 h-6 text-[#4B5563] dark:text-[#60A5FA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white dark:bg-[#1E293B] p-2 rounded-full shadow-lg hover:bg-[#F3F4F6] dark:hover:bg-[#0F172A] transition-colors duration-300"
              aria-label="Next project"
            >
              <svg className="w-6 h-6 text-[#4B5563] dark:text-[#60A5FA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Project Cards Container */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 50}%)` }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Project 1 */}
                <div className="w-1/2 flex-shrink-0 px-2">
                  <div className="group bg-white dark:bg-[#1E293B] rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300 h-full relative hover:bg-white dark:hover:bg-white border border-[#E5E7EB] dark:border-[#374151] hover:border-[#1E40AF] dark:hover:border-[#60A5FA]">
                    <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F3F4F6]/30 to-[#F3F4F6]/30 dark:from-[#0F172A]/10 dark:to-[#0F172A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="p-4 relative">
                      <div className="mb-3">
                        <h3 className="text-lg font-bold text-[#1E40AF] dark:text-white group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">
                          Digital Advertising Platform Development
                        </h3>
                      </div>
                      <div className="space-y-3">
                        <div className="transform group-hover:translate-x-2 transition-transform duration-300">
                          <h4 className="font-semibold text-[#1E40AF] dark:text-[#60A5FA] mb-1 group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">Challenge</h4>
                          <p className="text-sm text-[#4B5563] dark:text-[#60A5FA] group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">
                            Simplify the advertising booking process to boost revenue.
                          </p>
                        </div>
                        <div className="transform group-hover:translate-x-2 transition-transform duration-300 delay-75">
                          <h4 className="font-semibold text-[#1E40AF] dark:text-[#60A5FA] mb-1 group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">Approach</h4>
                          <p className="text-sm text-[#4B5563] dark:text-[#60A5FA] group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">
                            Designed and launched a user-centric platform featuring real-time analytics and intuitive navigation.
                          </p>
                        </div>
                        <div className="transform group-hover:translate-x-2 transition-transform duration-300 delay-150">
                          <h4 className="font-semibold text-[#1E40AF] dark:text-[#60A5FA] mb-1 group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">Outcome</h4>
                          <p className="text-sm text-[#4B5563] dark:text-[#60A5FA] group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">
                            Achieved significant revenue growth within a short period post-launch.
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          <span className="px-2 py-0.5 bg-[#F3F4F6] dark:bg-slate-900/30 text-[#1E40AF] dark:text-[#60A5FA] rounded-full text-xs group-hover:bg-[#1E40AF] group-hover:text-white dark:group-hover:bg-[#1E40AF] dark:group-hover:text-white transition-colors duration-300">Digital Advertising</span>
                          <span className="px-2 py-0.5 bg-[#F3F4F6] dark:bg-slate-900/30 text-[#1E40AF] dark:text-[#60A5FA] rounded-full text-xs group-hover:bg-[#1E40AF] group-hover:text-white dark:group-hover:bg-[#1E40AF] dark:group-hover:text-white transition-colors duration-300">Platform Development</span>
                          <span className="px-2 py-0.5 bg-[#F3F4F6] dark:bg-slate-900/30 text-[#1E40AF] dark:text-[#60A5FA] rounded-full text-xs group-hover:bg-[#1E40AF] group-hover:text-white dark:group-hover:bg-[#1E40AF] dark:group-hover:text-white transition-colors duration-300">User Experience</span>
                          <span className="px-2 py-0.5 bg-[#F3F4F6] dark:bg-slate-900/30 text-[#1E40AF] dark:text-[#60A5FA] rounded-full text-xs group-hover:bg-[#1E40AF] group-hover:text-white dark:group-hover:bg-[#1E40AF] dark:group-hover:text-white transition-colors duration-300">Revenue Growth</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project 2 */}
                <div className="w-1/2 flex-shrink-0 px-2">
                  <div className="group bg-white dark:bg-[#1E293B] rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300 h-full relative hover:bg-white dark:hover:bg-white border border-[#E5E7EB] dark:border-[#374151] hover:border-[#1E40AF] dark:hover:border-[#60A5FA]">
                    <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F3F4F6]/30 to-[#F3F4F6]/30 dark:from-[#0F172A]/10 dark:to-[#0F172A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="p-4 relative">
                      <div className="mb-3">
                        <h3 className="text-lg font-bold text-[#1E40AF] dark:text-white group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">
                          Print Subscription Digital Transformation
                        </h3>
                      </div>
                      <div className="space-y-3">
                        <div className="transform group-hover:translate-x-2 transition-transform duration-300">
                          <h4 className="font-semibold text-[#1E40AF] dark:text-[#60A5FA] mb-1 group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">Challenge</h4>
                          <p className="text-sm text-[#4B5563] dark:text-[#60A5FA] group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">
                            Modernize traditional print subscription systems to enhance efficiency and reduce costs.
                          </p>
                        </div>
                        <div className="transform group-hover:translate-x-2 transition-transform duration-300 delay-75">
                          <h4 className="font-semibold text-[#1E40AF] dark:text-[#60A5FA] mb-1 group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">Approach</h4>
                          <p className="text-sm text-[#4B5563] dark:text-[#60A5FA] group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">
                            Developed integrated digital solutions for sales, distribution, and subscription management.
                          </p>
                        </div>
                        <div className="transform group-hover:translate-x-2 transition-transform duration-300 delay-150">
                          <h4 className="font-semibold text-[#1E40AF] dark:text-[#60A5FA] mb-1 group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">Outcome</h4>
                          <p className="text-sm text-[#4B5563] dark:text-[#60A5FA] group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">
                            Increased operational efficiency and substantially lowered operational costs.
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          <span className="px-2 py-0.5 bg-[#F3F4F6] dark:bg-slate-900/30 text-[#1E40AF] dark:text-[#60A5FA] rounded-full text-xs group-hover:bg-[#1E40AF] group-hover:text-white dark:group-hover:bg-[#1E40AF] dark:group-hover:text-white transition-colors duration-300">Digital Transformation</span>
                          <span className="px-2 py-0.5 bg-[#F3F4F6] dark:bg-slate-900/30 text-[#1E40AF] dark:text-[#60A5FA] rounded-full text-xs group-hover:bg-[#1E40AF] group-hover:text-white dark:group-hover:bg-[#1E40AF] dark:group-hover:text-white transition-colors duration-300">Subscription Management</span>
                          <span className="px-2 py-0.5 bg-[#F3F4F6] dark:bg-slate-900/30 text-[#1E40AF] dark:text-[#60A5FA] rounded-full text-xs group-hover:bg-[#1E40AF] group-hover:text-white dark:group-hover:bg-[#1E40AF] dark:group-hover:text-white transition-colors duration-300">Cost Reduction</span>
                          <span className="px-2 py-0.5 bg-[#F3F4F6] dark:bg-slate-900/30 text-[#1E40AF] dark:text-[#60A5FA] rounded-full text-xs group-hover:bg-[#1E40AF] group-hover:text-white dark:group-hover:bg-[#1E40AF] dark:group-hover:text-white transition-colors duration-300">Operational Efficiency</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project 3 */}
                <div className="w-1/2 flex-shrink-0 px-2">
                  <div className="group bg-white dark:bg-[#1E293B] rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300 h-full relative hover:bg-white dark:hover:bg-white border border-[#E5E7EB] dark:border-[#374151] hover:border-[#1E40AF] dark:hover:border-[#60A5FA]">
                    <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F3F4F6]/30 to-[#F3F4F6]/30 dark:from-[#0F172A]/10 dark:to-[#0F172A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="p-4 relative">
                      <div className="mb-3">
                        <h3 className="text-lg font-bold text-[#1E40AF] dark:text-white group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">
                          E-commerce Payment Integration
                        </h3>
                      </div>
                      <div className="space-y-3">
                        <div className="transform group-hover:translate-x-2 transition-transform duration-300">
                          <h4 className="font-semibold text-[#1E40AF] dark:text-[#60A5FA] mb-1 group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">Challenge</h4>
                          <p className="text-sm text-[#4B5563] dark:text-[#60A5FA] group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">
                            Improve payment success rates and conversion metrics in an online retail environment.
                          </p>
                        </div>
                        <div className="transform group-hover:translate-x-2 transition-transform duration-300 delay-75">
                          <h4 className="font-semibold text-[#1E40AF] dark:text-[#60A5FA] mb-1 group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">Approach</h4>
                          <p className="text-sm text-[#4B5563] dark:text-[#60A5FA] group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">
                            Integrated advanced payment gateways and optimized product bundling strategies.
                          </p>
                        </div>
                        <div className="transform group-hover:translate-x-2 transition-transform duration-300 delay-150">
                          <h4 className="font-semibold text-[#1E40AF] dark:text-[#60A5FA] mb-1 group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">Outcome</h4>
                          <p className="text-sm text-[#4B5563] dark:text-[#60A5FA] group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">
                            Significantly enhanced payment success rates and boosted overall conversion rates.
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          <span className="px-2 py-0.5 bg-[#F3F4F6] dark:bg-slate-900/30 text-[#1E40AF] dark:text-[#60A5FA] rounded-full text-xs group-hover:bg-[#1E40AF] group-hover:text-white dark:group-hover:bg-[#1E40AF] dark:group-hover:text-white transition-colors duration-300">E-commerce</span>
                          <span className="px-2 py-0.5 bg-[#F3F4F6] dark:bg-slate-900/30 text-[#1E40AF] dark:text-[#60A5FA] rounded-full text-xs group-hover:bg-[#1E40AF] group-hover:text-white dark:group-hover:bg-[#1E40AF] dark:group-hover:text-white transition-colors duration-300">Payment Integration</span>
                          <span className="px-2 py-0.5 bg-[#F3F4F6] dark:bg-slate-900/30 text-[#1E40AF] dark:text-[#60A5FA] rounded-full text-xs group-hover:bg-[#1E40AF] group-hover:text-white dark:group-hover:bg-[#1E40AF] dark:group-hover:text-white transition-colors duration-300">Conversion Optimization</span>
                          <span className="px-2 py-0.5 bg-[#F3F4F6] dark:bg-slate-900/30 text-[#1E40AF] dark:text-[#60A5FA] rounded-full text-xs group-hover:bg-[#1E40AF] group-hover:text-white dark:group-hover:bg-[#1E40AF] dark:group-hover:text-white transition-colors duration-300">Revenue Enhancement</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project 4 */}
                <div className="w-1/2 flex-shrink-0 px-2">
                  <div className="group bg-white dark:bg-[#1E293B] rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300 h-full relative hover:bg-white dark:hover:bg-white border border-[#E5E7EB] dark:border-[#374151] hover:border-[#1E40AF] dark:hover:border-[#60A5FA]">
                    <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F3F4F6]/30 to-[#F3F4F6]/30 dark:from-[#0F172A]/10 dark:to-[#0F172A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="p-4 relative">
                      <div className="mb-3">
                        <h3 className="text-lg font-bold text-[#1E40AF] dark:text-white group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">
                          Digital Event Ticketing System
                        </h3>
                      </div>
                      <div className="space-y-3">
                        <div className="transform group-hover:translate-x-2 transition-transform duration-300">
                          <h4 className="font-semibold text-[#1E40AF] dark:text-[#60A5FA] mb-1 group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">Challenge</h4>
                          <p className="text-sm text-[#4B5563] dark:text-[#60A5FA] group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">
                            Create a digital platform for seamless event ticket sales and management.
                          </p>
                        </div>
                        <div className="transform group-hover:translate-x-2 transition-transform duration-300 delay-75">
                          <h4 className="font-semibold text-[#1E40AF] dark:text-[#60A5FA] mb-1 group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">Approach</h4>
                          <p className="text-sm text-[#4B5563] dark:text-[#60A5FA] group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">
                            Developed a comprehensive ticketing system with secure payment processing and user-friendly interfaces.
                          </p>
                        </div>
                        <div className="transform group-hover:translate-x-2 transition-transform duration-300 delay-150">
                          <h4 className="font-semibold text-[#1E40AF] dark:text-[#60A5FA] mb-1 group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">Outcome</h4>
                          <p className="text-sm text-[#4B5563] dark:text-[#60A5FA] group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">
                            Established a new revenue stream with substantial earnings in the initial months.
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          <span className="px-2 py-0.5 bg-[#F3F4F6] dark:bg-slate-900/30 text-[#1E40AF] dark:text-[#60A5FA] rounded-full text-xs group-hover:bg-[#1E40AF] group-hover:text-white dark:group-hover:bg-[#1E40AF] dark:group-hover:text-white transition-colors duration-300">Event Management</span>
                          <span className="px-2 py-0.5 bg-[#F3F4F6] dark:bg-slate-900/30 text-[#1E40AF] dark:text-[#60A5FA] rounded-full text-xs group-hover:bg-[#1E40AF] group-hover:text-white dark:group-hover:bg-[#1E40AF] dark:group-hover:text-white transition-colors duration-300">Digital Ticketing</span>
                          <span className="px-2 py-0.5 bg-[#F3F4F6] dark:bg-slate-900/30 text-[#1E40AF] dark:text-[#60A5FA] rounded-full text-xs group-hover:bg-[#1E40AF] group-hover:text-white dark:group-hover:bg-[#1E40AF] dark:group-hover:text-white transition-colors duration-300">User Experience</span>
                          <span className="px-2 py-0.5 bg-[#F3F4F6] dark:bg-slate-900/30 text-[#1E40AF] dark:text-[#60A5FA] rounded-full text-xs group-hover:bg-[#1E40AF] group-hover:text-white dark:group-hover:bg-[#1E40AF] dark:group-hover:text-white transition-colors duration-300">Revenue Generation</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project 5 */}
                <div className="w-1/2 flex-shrink-0 px-2">
                  <div className="group bg-white dark:bg-[#1E293B] rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300 h-full relative hover:bg-white dark:hover:bg-white border border-[#E5E7EB] dark:border-[#374151] hover:border-[#1E40AF] dark:hover:border-[#60A5FA]">
                    <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F3F4F6]/30 to-[#F3F4F6]/30 dark:from-[#0F172A]/10 dark:to-[#0F172A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="p-4 relative">
                      <div className="mb-3">
                        <h3 className="text-lg font-bold text-[#1E40AF] dark:text-white group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">
                          AI-Powered Customer Support Chatbot
                        </h3>
                      </div>
                      <div className="space-y-3">
                        <div className="transform group-hover:translate-x-2 transition-transform duration-300">
                          <h4 className="font-semibold text-[#1E40AF] dark:text-[#60A5FA] mb-1 group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">Challenge</h4>
                          <p className="text-sm text-[#4B5563] dark:text-[#60A5FA] group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">
                            Enhance customer service efficiency and responsiveness without increasing operational costs.
                          </p>
                        </div>
                        <div className="transform group-hover:translate-x-2 transition-transform duration-300 delay-75">
                          <h4 className="font-semibold text-[#1E40AF] dark:text-[#60A5FA] mb-1 group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">Approach</h4>
                          <p className="text-sm text-[#4B5563] dark:text-[#60A5FA] group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">
                            Led the development of an AI-driven chatbot capable of handling common customer inquiries, integrating natural language processing to understand and respond to user needs effectively.
                          </p>
                        </div>
                        <div className="transform group-hover:translate-x-2 transition-transform duration-300 delay-150">
                          <h4 className="font-semibold text-[#1E40AF] dark:text-[#60A5FA] mb-1 group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">Outcome</h4>
                          <p className="text-sm text-[#4B5563] dark:text-[#60A5FA] group-hover:text-[#1E40AF] dark:group-hover:text-[#1E40AF] transition-colors duration-300">
                            Reduced average response time by 70%, improved customer satisfaction scores, and decreased the workload on human support agents.
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          <span className="px-2 py-0.5 bg-[#F3F4F6] dark:bg-slate-900/30 text-[#1E40AF] dark:text-[#60A5FA] rounded-full text-xs group-hover:bg-[#1E40AF] group-hover:text-white dark:group-hover:bg-[#1E40AF] dark:group-hover:text-white transition-colors duration-300">AI Technology</span>
                          <span className="px-2 py-0.5 bg-[#F3F4F6] dark:bg-slate-900/30 text-[#1E40AF] dark:text-[#60A5FA] rounded-full text-xs group-hover:bg-[#1E40AF] group-hover:text-white dark:group-hover:bg-[#1E40AF] dark:group-hover:text-white transition-colors duration-300">Customer Support</span>
                          <span className="px-2 py-0.5 bg-[#F3F4F6] dark:bg-slate-900/30 text-[#1E40AF] dark:text-[#60A5FA] rounded-full text-xs group-hover:bg-[#1E40AF] group-hover:text-white dark:group-hover:bg-[#1E40AF] dark:group-hover:text-white transition-colors duration-300">Chatbot Development</span>
                          <span className="px-2 py-0.5 bg-[#F3F4F6] dark:bg-slate-900/30 text-[#1E40AF] dark:text-[#60A5FA] rounded-full text-xs group-hover:bg-[#1E40AF] group-hover:text-white dark:group-hover:bg-[#1E40AF] dark:group-hover:text-white transition-colors duration-300">Natural Language Processing</span>
                          <span className="px-2 py-0.5 bg-[#F3F4F6] dark:bg-slate-900/30 text-[#1E40AF] dark:text-[#60A5FA] rounded-full text-xs group-hover:bg-[#1E40AF] group-hover:text-white dark:group-hover:bg-[#1E40AF] dark:group-hover:text-white transition-colors duration-300">Operational Efficiency</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {[0, 1, 2, 3, 4].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? 'bg-[#1E40AF] dark:bg-[#60A5FA] w-4'
                      : 'bg-[#4B5563] dark:bg-[#60A5FA]'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-12 bg-gradient-to-br from-[#F3F4F6] via-white to-[#F3F4F6] dark:from-[#1E293B] dark:via-[#0F172A] dark:to-[#1E293B]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 border border-[#E5E7EB] dark:border-[#374151] rounded-xl shadow-lg bg-white/50 dark:bg-[#1E293B]/50 backdrop-blur-sm">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1E40AF] dark:text-white mb-12">
              Professional Experience
            </h2>
          </FadeIn>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#1E40AF] via-[#60A5FA] to-[#1E40AF]"></div>
            
            {/* Timeline Items */}
            <div className="space-y-16">
              {/* Senior Product Manager */}
              <FadeIn delay={0.2}>
                <div className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-[#1E40AF] rounded-full border-4 border-white dark:border-[#1E293B]"></div>
                  {/* Timeline Content */}
                  <div className="ml-0 md:ml-1/2 pl-8 md:pl-12">
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#1E40AF] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                      <div className="relative bg-[#1E40AF] dark:bg-[#1E293B] rounded-lg p-6 shadow-lg">
                        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                          <div>
                            <h3 className="text-2xl font-bold text-white dark:text-white group-hover:text-white dark:group-hover:text-white transition-colors duration-300">
                              Senior Product Manager
                            </h3>
                            <p className="text-white dark:text-[#60A5FA] font-medium text-lg mt-1">Hindustan Times Digital</p>
                          </div>
                          <span className="mt-2 md:mt-0 px-4 py-2 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm font-medium">
                            May 2022 - Present
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <span className="px-4 py-2 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm font-medium hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">Product Strategy</span>
                          <span className="px-4 py-2 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm font-medium hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">Digital Transformation</span>
                          <span className="px-4 py-2 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm font-medium hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">Revenue Growth</span>
                          <span className="px-4 py-2 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm font-medium hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">Team Leadership</span>
                          <span className="px-4 py-2 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm font-medium hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">Agile Methodology</span>
                          <span className="px-4 py-2 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm font-medium hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">Stakeholder Management</span>
                          <span className="px-4 py-2 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm font-medium hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">Market Analysis</span>
                          <span className="px-4 py-2 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm font-medium hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">User Experience</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Product Manager - Digital Solutions */}
              <FadeIn delay={0.4}>
                <div className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#60A5FA] rounded-full border-4 border-white dark:border-[#1E293B]"></div>
                  {/* Timeline Content */}
                  <div className="mr-0 md:mr-1/2 pr-8 md:pr-12">
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#60A5FA] to-[#1E40AF] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                      <div className="relative bg-[#1E40AF] dark:bg-[#1E293B] rounded-lg p-6 shadow-lg">
                        <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white dark:text-white group-hover:text-white dark:group-hover:text-white transition-colors duration-300">
                              Product Manager – Digital Solutions
                            </h3>
                            <p className="text-white dark:text-[#60A5FA] font-medium">Max Life Insurance</p>
                          </div>
                          <span className="mt-2 md:mt-0 px-3 py-1 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm">
                            Dec 2021 - May 2022
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">Product Roadmap</span>
                          <span className="px-3 py-1 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">API Integration</span>
                          <span className="px-3 py-1 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">Process Optimization</span>
                          <span className="px-3 py-1 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">Lead Generation</span>
                          <span className="px-3 py-1 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">Digital Solutions</span>
                          <span className="px-3 py-1 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">System Architecture</span>
                          <span className="px-3 py-1 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">Technical Leadership</span>
                          <span className="px-3 py-1 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">Innovation Management</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Assistant Product Manager */}
              <FadeIn delay={0.5}>
                <div className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#1E40AF] rounded-full border-4 border-white dark:border-[#1E293B]"></div>
                  {/* Timeline Content */}
                  <div className="ml-0 md:ml-1/2 pl-8 md:pl-12">
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1E40AF] to-[#60A5FA] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                      <div className="relative bg-[#2563EB] dark:bg-[#1E293B] rounded-lg p-6 shadow-lg">
                        <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white dark:text-white group-hover:text-white dark:group-hover:text-white transition-colors duration-300">
                              Assistant Product Manager
                            </h3>
                            <p className="text-white dark:text-[#60A5FA] font-medium">The Smart Cube</p>
                          </div>
                          <span className="mt-2 md:mt-0 px-3 py-1 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm">
                            Apr 2019 - Dec 2021
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">User Retention</span>
                          <span className="px-3 py-1 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">Team Collaboration</span>
                          <span className="px-3 py-1 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">Data Analysis</span>
                          <span className="px-3 py-1 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">User Research</span>
                          <span className="px-3 py-1 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">Feature Development</span>
                          <span className="px-3 py-1 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">Product Analytics</span>
                          <span className="px-3 py-1 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">A/B Testing</span>
                          <span className="px-3 py-1 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">Product Metrics</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Team Lead - Competitive Intelligence */}
              <FadeIn delay={0.6}>
                <div className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#60A5FA] rounded-full border-4 border-white dark:border-[#1E293B]"></div>
                  {/* Timeline Content */}
                  <div className="mr-0 md:mr-1/2 pr-8 md:pr-12">
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#60A5FA] to-[#1E40AF] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                      <div className="relative bg-[#3B82F6] dark:bg-[#1E293B] rounded-lg p-6 shadow-lg">
                        <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white dark:text-white group-hover:text-white dark:group-hover:text-white transition-colors duration-300">
                              Team Lead – Competitive Intelligence
                            </h3>
                            <p className="text-white dark:text-[#60A5FA] font-medium">Phronesis Partners</p>
                          </div>
                          <span className="mt-2 md:mt-0 px-3 py-1 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm">
                            May 2015 - Mar 2019
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">Competitive Analysis</span>
                          <span className="px-3 py-1 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">Project Management</span>
                          <span className="px-3 py-1 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">Client Relations</span>
                          <span className="px-3 py-1 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">Market Intelligence</span>
                          <span className="px-3 py-1 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">Strategic Planning</span>
                          <span className="px-3 py-1 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">Team Management</span>
                          <span className="px-3 py-1 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">Business Strategy</span>
                          <span className="px-3 py-1 bg-white/10 dark:bg-white/10 text-white dark:text-white rounded-full text-sm hover:bg-white/20 dark:hover:bg-white/20 transition-colors duration-300">Industry Research</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 bg-gradient-to-br from-white via-[#F3F4F6] to-white dark:from-[#1E293B] dark:via-[#0F172A] dark:to-[#1E293B]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 border border-[#E5E7EB] dark:border-[#374151] rounded-xl shadow-lg bg-white/50 dark:bg-[#1E293B]/50 backdrop-blur-sm">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1E40AF] dark:text-white mb-8">
              Get in Touch
            </h2>
          </FadeIn>
          <div className="max-w-2xl mx-auto">
            <ScaleIn delay={0.2}>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1E40AF] via-[#60A5FA] to-[#1E40AF] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white dark:bg-[#1E293B] rounded-lg p-8 shadow-lg">
                  <form action="https://formspree.io/f/your-formspree-endpoint" method="POST" className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#4B5563] dark:text-gray-300 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF] dark:bg-slate-900/50 dark:border-slate-700 dark:text-white transition-colors duration-300"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#4B5563] dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF] dark:bg-slate-900/50 dark:border-slate-700 dark:text-white transition-colors duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-[#4B5563] dark:text-gray-300 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg border border-[#E5E7EB] focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF] dark:bg-slate-900/50 dark:border-slate-700 dark:text-white transition-colors duration-300"
                        placeholder="Your message..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#2563EB] text-white py-4 px-6 rounded-lg hover:bg-[#1E40AF] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 text-lg font-medium transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>
    </main>
  );
}
