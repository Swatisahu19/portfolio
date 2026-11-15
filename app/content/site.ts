import type { Check, LabProject, Metric } from "./types";

/** Turn off before launch once every "confirm" item has been resolved. */
export const SHOW_REVIEW_MARKERS = false;

/** Primary source: newest resume. Older sources are superseded where they disagree. */
const RESUME: Check = { status: "verified", source: "Resume, Oct 2026" };
/** Exact ₹ figures are on the resume; the public site rounds them down. */
const SOFTENED = (): Check => ({
  status: "verified",
  source: "Resume, Oct 2026",
  note: "Rounded down for the public site.",
});
const LIVE_SITE: Check = { status: "verified", source: "swati-sahu.com, live version" };

export const site = {
  name: "Swati Sahu",
  url: "https://swati-sahu.com",
  title: "Swati Sahu: Product Leader, Digital Transformation & AI",
  description:
    "Product leader with 11 years building revenue platforms, enterprise systems and consumer products for a leading Indian media group and beyond. Case studies in Salesforce-led sales transformation, 0→1 launches and applied AI.",
  role: "Principal Product Manager, Enterprise & Digital Products",
  location: "Noida, India",
  email: "swati.sahu0190@gmail.com",
  linkedin: "https://www.linkedin.com/in/swatisahu0190/",
  github: "https://github.com/Swatisahu19",
  /**
   * Set to a file in /public (e.g. "/Swati-Sahu-Resume.pdf") once chosen.
   * Until then the Resume link opens the printable /resume page.
   */
  resumePdf: null as string | null,
  /** Hero: boardroom. Also used for the social share preview. */
  portrait: { src: "/images/swati-boardroom.jpg", alt: "Swati Sahu standing in a boardroom", width: 600, height: 1069 },
  aboutPortrait: { src: "/images/swati-desk.jpg", alt: "Swati Sahu at her desk" },
  contactPortrait: { src: "/images/swati-lobby.jpg", alt: "Swati Sahu in an office lobby" },
  avatar: { src: "/images/swati-avatar.jpg", alt: "" },
  certifications: ["Certified Product Manager (CPM)", "Certified Scrum Product Owner (CSPO®)"],
};

export const nav = [
  { label: "Work", href: "/#work", id: "work" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "AI Lab", href: "/#lab", id: "lab" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Resume", href: "/resume", id: "resume" },
] as const;

export const hero = {
  eyebrow: "Product Leadership / Digital Transformation / AI",
  headline: ["Building digital", "products that move", "businesses"],
  /** Final highlighted word of the headline */
  headlineAccent: "forward",
  statement:
    "Principal Product Manager with 11+ years across enterprise platforms, digital products and transformation. I connect product strategy to revenue and operating outcomes, and I build AI-enabled products hands-on.",
  floatingLabels: [
    "PRODUCT STRATEGY",
    "DIGITAL TRANSFORMATION",
    "AI INNOVATION",
    "PLATFORM THINKING",
    "BUSINESS GROWTH",
    "CUSTOMER EXPERIENCE",
  ],
  /** Seniority and scope at a glance; outcomes live in Impact, so nothing repeats */
  credibility: [
    "Principal PM · HT Media",
    "Leads a 20-person product & engineering org",
    "50M+ user digital platform",
    "Enterprise estate: Salesforce, SAP, Zoho",
  ],
};

export const impact: Metric[] = [
  {
    value: "11+",
    countTo: 11,
    suffix: "+",
    label: "Years in product and adjacent roles",
    detail: "Seven of them owning enterprise and customer-facing portfolios.",
    check: RESUME,
  },
  {
    value: "₹100 Cr+",
    countTo: 100,
    prefix: "₹",
    suffix: " Cr+",
    label: "Annual ad bookings moved onto one Salesforce platform",
    detail: "5,000+ sales users across 58 locations.",
    check: SOFTENED(),
  },
  {
    value: "99%",
    countTo: 99,
    suffix: "%",
    label: "Delivery accuracy on a 0→1 circulation platform",
    detail: "500,000+ subscribers in 10+ cities; complaints down 80%.",
    check: RESUME,
  },
  {
    value: "900K",
    countTo: 900,
    suffix: "K",
    label: "Registrations on a product line I own end to end",
    detail: "A national student assessment programme: registration, payments and results.",
    check: RESUME,
  },
];

export const philosophy = {
  headline: "Good products don't happen by accident.",
  intro:
    "Each stage feeds the next. Strategy without execution is a slide deck. Growth without strategy is noise. Innovation only matters when it compounds back into the core.",
  pillars: [
    {
      n: "01",
      name: "Strategy",
      line: "Identifying meaningful problems and establishing product direction.",
      practice: ["North-star metrics and KPI trees", "Roadmaps tied to funding decisions", "Saying no, in writing"],
    },
    {
      n: "02",
      name: "Execution",
      line: "Translating strategy into scalable and usable products.",
      practice: ["PRD and sprint standards", "MVP cut lines", "Integration-first delivery"],
    },
    {
      n: "03",
      name: "Growth",
      line: "Driving adoption, engagement, revenue, and measurable impact.",
      practice: ["Experimentation at velocity", "Funnel and payment diagnostics", "Retention loops"],
    },
    {
      n: "04",
      name: "Innovation",
      line: "Exploring emerging technology and rethinking existing experiences.",
      practice: ["Applied AI and personalisation", "Prototype before PRD", "Replacing tools that no longer fit"],
    },
  ],
};

export type Role = {
  company: string;
  title: string;
  period: string;
  start: string;
  summary: string;
  scope: string[];
  outcomes: string[];
  tags: string[];
  check: Check;
};

export const experience: Role[] = [
  {
    company: "HT Media (Hindustan Times)",
    title: "Principal Product Manager, Enterprise & Digital Products",
    period: "May 2022 – Present",
    start: "2022",
    summary:
      "Run the product vertical across Print, Digital, Jobs and Radio, plus the enterprise application estate: Salesforce, SAP, Zoho and in-house systems. Report to the CIO.",
    scope: [
      "Lead a 20-person product and engineering organisation: PMs, engineering managers, engineers, QA, design and analytics",
      "Own build-vs-buy, consolidation and AI-adoption decisions across the enterprise stack",
      "Arbitrate competing requirements from Finance, Sales, Marketing, Strategy and Legal",
      "Lead India DPDP data-privacy readiness across every customer-facing system",
      "Own the 50M+ user digital content platform: roadmap, north-star metrics, personalisation, subscription conversion",
    ],
    outcomes: [
      "₹100 Cr+ annual ad bookings on one Salesforce-native platform, used by 5,000+ sellers",
      "Order-to-invoice 40% faster through the Salesforce–SAP integration",
      "0→1 route platform: 500K+ subscribers, 99% delivery accuracy, 80% fewer complaints",
      "10,000+ vendors and agents moved online; order cycle time halved",
      "Student assessment programme: 900K registrations, ₹10 Cr+ annual revenue",
    ],
    tags: ["Enterprise platforms", "Salesforce & SAP", "0→1", "Applied AI", "Org leadership"],
    check: RESUME,
  },
  {
    company: "Max Life Insurance",
    title: "Product Manager, Digital",
    period: "Dec 2021 – May 2022",
    start: "2021",
    summary: "Shipped digital platform enhancements that connected distribution, sales and operations systems.",
    scope: [
      "Turned distribution, sales and operations requirements into specs for enterprise onboarding workflows",
      "Drove integration automation and API reliability work",
    ],
    outcomes: ["15% faster operational turnaround", "12% better delivery efficiency", "15% less API downtime, 10% faster rollouts"],
    tags: ["Integrations", "API reliability", "Insurance distribution"],
    check: RESUME,
  },
  {
    company: "The Smart Cube",
    title: "Assistant Product Manager",
    period: "Apr 2019 – Dec 2021",
    start: "2019",
    summary: "Owned the full lifecycle of B2B analytics and market-intelligence platforms used by enterprise clients.",
    scope: [
      "Prioritised with usage analytics and direct client feedback inside a B2B subscription model",
      "Tightened release planning and backlog discipline",
    ],
    outcomes: ["15% higher user retention", "25% shorter feature delivery cycle", "10% higher platform engagement"],
    tags: ["B2B SaaS", "Analytics products", "Retention"],
    check: RESUME,
  },
  {
    company: "Phronesis Partners",
    title: "Team Lead, Competitive Intelligence",
    period: "May 2015 – Mar 2019",
    start: "2015",
    summary:
      "Led competitive-intelligence engagements for enterprise clients. It's where I learned to take a market apart before deciding what to build.",
    scope: ["Restructured research delivery workflows", "Built benchmarking frameworks; mentored a delivery team"],
    outcomes: ["30% shorter turnaround", "40% better client competitive positioning"],
    tags: ["Market intelligence", "Benchmarking", "Client leadership"],
    check: RESUME,
  },
];

export const education = [
  { name: "Product Management: Growth PM & Digital Transformation", org: "Duke Corporate Education", period: "2021–2022", check: RESUME },
  {
    name: "B.Tech, Information Technology",
    org: "Sharda University",
    period: "2011–2015",
    check: RESUME,
  },
];

export const toolkit = [
  { group: "Salesforce & enterprise", items: ["Sales Cloud", "Service Cloud", "Einstein", "SAP ERP", "Zoho", "REST APIs"] },
  { group: "Data & experimentation", items: ["SQL", "Amplitude", "Mixpanel", "Power BI", "A/B testing"] },
  { group: "Product", items: ["JIRA", "Aha!", "Confluence", "Figma", "Miro", "Whimsical"] },
  { group: "AI building", items: ["Claude", "Cursor", "Lovable"] },
];

export const lab: LabProject[] = [
  {
    name: "HR Buddy",
    subtitle: "Independent product experiment · AI-powered HRMS",
    featured: true,
    stage: "LIVE PRODUCT",
    problem: "Enterprise HR workflows are distributed across modules, forms and approval chains.",
    conceptLabel: "Experiment",
    concept: "Could I build a complete HRMS with an integrated AI assistant using AI-assisted development?",
    contribution: "Product vision, requirements, architecture decisions, workflow design, AI interaction design, testing and production launch.",
    approach: [
      "Claude Code as AI development partner",
      "Google Gemini as the in-product AI provider",
      "Permission-aware AI tools",
      "Synthetic data",
      "Automated testing and evaluation",
    ],
    outcome: "A working HRMS with 16 modules and an integrated AI assistant, live in production.",
    stageNote: "Live at swati-sahu.com/hr-buddy, on synthetic data.",
    links: [
      { label: "Read case study", href: "/work/hr-buddy" },
      { label: "The AI experiment", href: "/lab/hr-buddy-experiment" },
      { label: "Explore product", href: "/hr-buddy", external: true },
    ],
    check: { status: "verified", source: "HR Buddy features, AI and technology (15 Nov 2026)" },
  },
  {
    name: "PM Toolkit",
    subtitle: "Open source",
    stage: "LIVE PRODUCT",
    problem: "Product managers rebuild the same PRDs, prioritisation sheets and SQL from scratch on every project.",
    concept: "A working kit of templates, AI prompts, frameworks and SQL snippets, wired for AI-assisted editing in Cursor.",
    contribution: "Designed the structure, wrote the templates and prompt library, published it under MIT.",
    approach: ["Markdown-only, zero build step", "Cursor rules encode conventions"],
    stageNote: "Public repository, maintained.",
    href: "https://github.com/Swatisahu19/pm-toolkit",
    hrefLabel: "View on GitHub",
    check: { status: "verified", source: "github.com/Swatisahu19/pm-toolkit README" },
  },
  {
    name: "GenAI editorial pilots",
    subtitle: "Editorial workflow",
    stage: "PROTOTYPE",
    problem: "Editorial teams spend time on repetitive work around every story: summaries, tags and metadata.",
    concept: "Generative AI inside the editorial workflow for summarisation and auto-tagging, with editors staying in control.",
    contribution: "Ran the pilots as part of owning AI adoption across the product estate.",
    approach: ["Pilot inside existing workflow", "Human review before publish"],
    stageNote: "Piloted in editorial workflows. Not a reader-facing product.",
    check: { status: "drafted", source: "Resume, Oct 2026 (pilots); problem framing drafted", note: "Confirm the framing and current status of the pilots." },
  },
  {
    name: "In-house HRMS",
    subtitle: "HT Media initiative · separate from HR Buddy",
    stage: "CONCEPT",
    problem: "Replace a licensed SaaS HRMS with a platform HR admins can configure themselves.",
    concept: "An in-house HRMS that rebuilds every configured rule with parity first, then fixes known pain points, with no-code forms, workflows and approvals for HR admins.",
    contribution: "Product owner for requirements: discovery walkthroughs with HR, scope and phasing, PRD.",
    approach: ["Parity principle with signed-off deviations", "MoSCoW phasing across 9 Phase 1 modules"],
    stageNote: "Requirements defined. Build not yet started.",
    check: { status: "verified", source: "Swati, Nov 2026: HT Media initiative, concept stage" },
  },
  {
    name: "This portfolio",
    subtitle: "swati-sahu.com",
    stage: "LIVE PRODUCT",
    problem: "A static CV page could not show how I think about products, only where I have worked.",
    concept: "A case-study-led site built with AI pair-programming, with every claim stored as reviewable data with its source.",
    contribution: "Product direction, content model and review. Built with Claude and Cursor.",
    approach: ["Next.js App Router, static output", "Claims carry provenance and review status"],
    stageNote: "Live at swati-sahu.com.",
    href: "https://github.com/Swatisahu19/portfolio",
    hrefLabel: "View source",
    check: LIVE_SITE,
  },
];

export const about = {
  headline: "Part strategist. Part builder.",
  paragraphs: [
    "I started in competitive intelligence, taking markets apart for consulting clients. The habit stuck: before I decide what to build, I want to know who is winning, why, and what it would take to change that.",
    "My best work sits where revenue meets legacy operations, and I use AI as both a buyer and a builder: ML and GenAI on the platforms I own, and hands-on products like HR Buddy.",
    "I'm looking for Director, Head of Product and Principal Product roles in India, Europe or the Middle East, where commercial and technical judgment both matter.",
  ],
};

export const contact = {
  headline: "Have an interesting problem to solve?",
  copy:
    "Hiring for a senior product role, or want to compare notes on enterprise platforms and AI? Write to me directly, or use the form.",
};
