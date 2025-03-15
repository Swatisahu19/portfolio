'use client';

import Image from "next/image";
import Navbar from './components/Navbar';
import { useState, useEffect } from 'react';

const skills = [
  {
    category: "Product Management",
    items: [
      { name: "Product Strategy", icon: "📊" },
      { name: "Agile/Scrum", icon: "🔄" },
      { name: "User Research", icon: "🔍" },
      { name: "Data Analytics", icon: "📈" },
    ]
  },
  {
    category: "Digital Transformation",
    items: [
      { name: "Cloud Migration", icon: "☁️" },
      { name: "Process Automation", icon: "⚙️" },
      { name: "System Integration", icon: "🔗" },
      { name: "Change Management", icon: "🔄" },
    ]
  },
  {
    category: "Technical Skills",
    items: [
      { name: "AWS", icon: "📦" },
      { name: "API Integration", icon: "🔌" },
      { name: "SQL", icon: "💾" },
      { name: "Data Analysis", icon: "📊" },
    ]
  },
  {
    category: "Leadership",
    items: [
      { name: "Team Management", icon: "👥" },
      { name: "Stakeholder Management", icon: "🤝" },
      { name: "Strategic Planning", icon: "🎯" },
      { name: "Cross-functional Leadership", icon: "��" },
    ]
  }
];

interface VisibilityState {
  about?: boolean;
  projects?: boolean;
  skills?: boolean;
  contact?: boolean;
}

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isVisible, setIsVisible] = useState<VisibilityState>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: entry.isIntersecting
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const form = e.currentTarget;
      const response = await fetch('https://formspree.io/f/xpwpwwok', {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setSubmitError('Sorry, something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 px-8">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/90"></div>
          </div>
          <div className="relative max-w-6xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-purple-400 shadow-lg transition-transform duration-500 hover:scale-105 dark:border-purple-300">
                <Image
                  src="/images/profile.jpg"
                  alt="Swati"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                  className="transition-transform duration-500 hover:scale-110"
                />
              </div>
            </div>
            <h1 className="mb-4 animate-fadeIn text-5xl font-bold tracking-tight text-white sm:text-6xl">
              Hi, I'm <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Swati</span>
            </h1>
            <p className="mb-6 animate-slideUp text-xl text-gray-200">
              Senior Product Manager | Digital Transformation Leader
            </p>
            <p className="mb-8 animate-slideUp text-lg text-gray-200">
              Welcome to my portfolio! I am a Senior Product Manager with a passion for driving digital transformation, 
              SaaS solutions, and B2B product innovations.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="#contact"
                className="transform rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Contact Me
              </a>
              <a
                href="https://www.linkedin.com/in/swatisahu0190/"
                className="transform rounded-full border-2 border-purple-400 px-8 py-3 text-purple-200 transition-all duration-300 hover:scale-105 hover:bg-purple-900/50 hover:shadow-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={`transform py-20 transition-all duration-1000 ${isVisible.about ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="mx-auto max-w-6xl px-8">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
              About Me
            </h2>
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300">
              <p>
                I am a Senior Product Manager with a track record of leading digital transformation projects, 
                product innovation, and strategic growth initiatives. My expertise lies in product lifecycle 
                management, data-driven decision-making, and cross-functional leadership.
              </p>
              <div>
                <p className="mb-4">I specialize in:</p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span><strong>Digital Transformation & Automation</strong> – Migrating legacy systems, 
                    streamlining processes, and integrating cutting-edge technology.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span><strong>B2B & SaaS Product Management</strong> – Building scalable platforms 
                    that drive revenue and operational efficiency.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span><strong>User Experience & Growth Strategies</strong> – Enhancing engagement, 
                    optimizing UI/UX, and increasing conversion rates.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    <span><strong>Revenue Growth & Market Expansion</strong> – Launching high-impact 
                    digital products that generate multimillion-dollar revenues.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className={`bg-gradient-to-br from-purple-100 to-indigo-100 py-20 dark:from-gray-800 dark:to-purple-900 transform transition-all duration-1000 ${isVisible.projects ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="mx-auto max-w-6xl px-8">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
              Projects & Case Studies
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* AWS Migration Project */}
              <div className="transform rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:bg-gray-700">
                <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  AWS Migration & Circulation Revenue Growth
                </h3>
                <div className="mb-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <p><strong>Challenge:</strong> The print circulation system required a scalable cloud-based solution.</p>
                  <p><strong>Solution:</strong> Led the migration of print circulation application to AWS.</p>
                </div>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Doubled circulation revenue
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    5x improvement in operational efficiency
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    ₹1.5 Cr annual savings
                  </li>
                </ul>
              </div>

              {/* B2B Ad Booking Platform */}
              <div className="transform rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:bg-gray-700">
                <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  B2B Ad Booking Platform
                </h3>
                <div className="mb-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <p><strong>Challenge:</strong> Manual ad booking processes led to inefficiencies.</p>
                  <p><strong>Solution:</strong> Designed and launched a self-service digital ad booking platform.</p>
                </div>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    ₹2.5 Cr revenue within 5 months
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Streamlined ad booking process
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Enhanced customer experience
                  </li>
                </ul>
              </div>

              {/* Event Management Project */}
              <div className="transform rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:bg-gray-700">
                <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  Event Management Automation
                </h3>
                <div className="mb-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <p><strong>Challenge:</strong> Manual event management was inefficient.</p>
                  <p><strong>Solution:</strong> Digitized the entire event management process.</p>
                </div>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Faster operations & reduced errors
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Increased event ticket sales
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-green-500">✓</span>
                    Improved revenue growth
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className={`py-20 transform transition-all duration-1000 ${isVisible.skills ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="mx-auto max-w-6xl px-8">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
              Skills & Technologies
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {skills.map((skillGroup, index) => (
                <div key={index} className="transform rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:bg-gray-700">
                  <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    {skillGroup.category}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex transform items-center space-x-2 transition-all duration-300 hover:translate-x-2">
                        <span className="text-2xl">{skill.icon}</span>
                        <span className="text-gray-600 dark:text-gray-300">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={`bg-gradient-to-br from-purple-100 to-indigo-100 py-20 dark:from-gray-800 dark:to-purple-900 transform transition-all duration-1000 ${isVisible.contact ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="mx-auto max-w-6xl px-8">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
              Let's Connect
            </h2>
            <div className="mx-auto max-w-xl">
              {isSubmitted ? (
                <div className="transform rounded-lg bg-gradient-to-r from-green-400 to-emerald-500 p-6 transition-all duration-300 hover:scale-105">
                  <p className="text-center text-lg font-medium text-white">
                    Thank you for your message! I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    ></textarea>
                  </div>
                  {submitError && (
                    <div className="rounded-md bg-red-50 p-4 dark:bg-red-900">
                      <p className="text-sm text-red-800 dark:text-red-200">{submitError}</p>
                    </div>
                  )}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full transform rounded-md bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
