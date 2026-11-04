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
  { label: "About", href: "/#about", id: "about" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Experiments", href: "/#lab", id: "lab" },
  { label: "Resume", href: "/resume", id: "resume" },
] as const;

export const hero = {
  eyebrow: "Product Leadership / Digital Transformation / AI",
  headline: ["Building digital", "products that move", "businesses"],
  /** Final highlighted word of the headline */
  headlineAccent: "forward",
  statement:
    "I'm a product leader with 11+ years of experience turning complex business challenges into scalable digital products. I work across product strategy, revenue growth, enterprise transformation, and AI-powered innovation to create meaningful business outcomes.",
  floatingLabels: [
    "PRODUCT STRATEGY",
    "DIGITAL TRANSFORMATION",
    "AI INNOVATION",
    "PLATFORM THINKING",
    "BUSINESS GROWTH",
    "CUSTOMER EXPERIENCE",
  ],
  credibility: [
    "11+ years in product",
    "₹100 Cr+ bookings on one platform",
    "Enterprise transformation",
    "AI & product innovation",
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
    name: "PM Toolkit",
    stage: "LIVE PRODUCT",
    problem: "Product managers rebuild the same PRDs, prioritisation sheets and SQL from scratch on every project.",
    concept:
      "An open-source working kit of templates, AI prompts, frameworks and SQL snippets, wired for AI-assisted editing in Cursor.",
    contribution: "Designed the structure, wrote the templates and prompt library, published it under MIT.",
    approach: ["Markdown-only, zero build step", "Cursor rules encode conventions", "Private folder keeps confidential work off GitHub"],
    stageNote: "Public repository, maintained.",
    href: "https://github.com/Swatisahu19/pm-toolkit",
    hrefLabel: "View on GitHub",
    check: { status: "verified", source: "github.com/Swatisahu19/pm-toolkit README" },
  },
  {
    name: "GenAI editorial pilots",
    stage: "PROTOTYPE",
    problem: "Editorial teams spend time on repetitive work around every story: summaries, tags and metadata.",
    concept: "Generative AI inside the editorial workflow for summarisation and auto-tagging, with editors staying in control.",
    contribution: "Ran the pilots as part of owning AI adoption across the product estate.",
    approach: ["Pilot inside existing workflow", "Human review before publish", "Build-vs-buy evaluation before platform spend"],
    stageNote: "Piloted in editorial workflows. Not a reader-facing product.",
    check: { status: "drafted", source: "Resume, Oct 2026 (pilots); problem framing drafted", note: "Confirm the framing and current status of the pilots." },
  },
  {
    name: "In-house HRMS",
    stage: "CONCEPT",
    problem:
      "A large media group runs HR on a licensed SaaS HRMS that duplicates roles for multi-entity employees, needs hand-edited policy groups and pushes rostering offline.",
    concept:
      "An in-house HRMS that rebuilds every configured rule with parity first, then fixes known pain points, with no-code forms, workflows and approvals for HR admins.",
    contribution: "Product owner for requirements: discovery walkthroughs with HR, scope and phasing, PRD.",
    approach: ["Parity principle with signed-off deviations", "MoSCoW phasing across 9 Phase 1 modules", "Configurable builders over hard-coded policy"],
    stageNote: "Requirements defined. Build not yet started.",
    check: {
      status: "confirm",
      source: "Internal requirements document",
      note: "Internal employer programme. Approve this generic wording, or remove before publishing.",
    },
  },
  {
    name: "This portfolio",
    stage: "LIVE PRODUCT",
    problem: "A static CV page could not show how I think about products, only where I have worked.",
    concept:
      "A case-study-led site built with AI pair-programming, with every claim stored as reviewable data with its source.",
    contribution: "Product direction, content model and review. Built with Claude and Cursor.",
    approach: ["Next.js App Router, static output", "Hand-written canvas 3D, no WebGL dependency", "Claims carry provenance and review status"],
    stageNote: "Live at swati-sahu.com.",
    href: "https://github.com/Swatisahu19/portfolio",
    hrefLabel: "View source",
    check: LIVE_SITE,
  },
];

export const about = {
  headline: "Part strategist. Part builder. Always curious.",
  paragraphs: [
    "I started in competitive intelligence, taking markets apart for consulting clients. The habit stuck: before I decide what to build, I want to know who is winning, why, and what it would take to change that.",
    "From there I moved into product: B2B analytics platforms at The Smart Cube, insurance distribution at Max Life, and since 2022, HT Media. Today I run the product vertical across Print, Digital, Jobs and Radio, plus the enterprise systems the business runs on: Salesforce, SAP and Zoho.",
    "My best work sits where revenue meets legacy operations. I moved advertising sales for 5,000+ sellers onto one Salesforce platform wired to SAP. I took newspaper circulation from paper orders to a route platform that tracks every delivery. And I run a national student assessment programme as a business with its own P&L.",
    "I use AI as a builder and as a buyer: ML personalisation and forecasting in production, GenAI pilots in editorial, Einstein in sales, and Claude and Cursor for my own prototypes. I'm looking for senior product leadership roles in India, Europe or the Middle East where commercial and technical judgment both matter.",
  ],
  principles: ["Outcomes over output", "Write it down", "Instrument before you argue", "Ship the smallest true thing"],
};

export const contact = {
  headline: "Have an interesting problem to solve?",
  copy:
    "I'm always interested in meaningful conversations around product strategy, technology, transformation, and building what's next.",
};
