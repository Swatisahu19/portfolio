import type { Check, CaseStudy } from "./types";

/**
 * Case studies, rebuilt from the Oct 2026 resume.
 *
 * Writing rule:
 *  - Numbers, scope and what was built come only from the resume (check: verified).
 *  - Reasoning, framing, decisions and trade-offs are written from Swati's
 *    experience and marked `drafted: true`. They read as finished copy but
 *    need her approval before SHOW_REVIEW_MARKERS is turned off.
 *  - `todo` lists what only she can supply (dates, baselines, stories).
 *  - Exact ₹ figures are rounded down for the public site.
 */

const RESUME: Check = { status: "verified", source: "Resume, Oct 2026" };
/** Employer is not named in case studies */
const ORG = "Leading Indian media & publishing group";
const ROLE = "Principal Product Manager, Enterprise & Digital Products";

export const caseStudies: CaseStudy[] = [
  /* ================================================================== */
  {
    slug: "advertising-sales-platform",
    index: "01",
    title: "Advertising Sales on Salesforce",
    kicker: "Commercial platform transformation",
    summary:
      "Rebuilding advertising sales as one Salesforce-native workflow, from quote to revenue recognition, for 5,000+ sellers across 58 locations.",
    problem:
      "Ad sales across print, digital and classifieds ran on manual processes, and every booked order was keyed in again before it could be invoiced.",
    theme: "dark",
    diagram: "booking-flow",
    heroMetric: {
      value: "₹100 Cr+",
      countTo: 100,
      prefix: "₹",
      suffix: " Cr+",
      label: "Annual bookings now on a single platform",
      check: { status: "verified", source: "Resume, Oct 2026", note: "Rounded down for the public site." },
    },
    overview: {
      organisation: ORG,
      industry: "Media · advertising sales",
      timeline: "2022 – present",
      role: ROLE,
      ownership: "Product owner of Salesforce as the system of record for advertising and subscription revenue",
      teams: ["Sales", "Finance", "Marketing", "Strategy", "Legal", "Salesforce & SAP engineering"],
      intro:
        "Advertising is how a news business pays for journalism, and here it's sold by a field force of thousands across print, digital and classifieds. I rebuilt how that selling works: one Salesforce-native flow for quoting, order capture, approvals and scheduling, wired to SAP so a booked order becomes an invoice and recognised revenue without anyone retyping it.",
      check: RESUME,
    },
    context: {
      heading: "Business context",
      drafted: true,
      paragraphs: [
        "With 5,000+ sales users across 58 locations, small inefficiencies add up. Each manual step between a client saying yes and Finance recognising the revenue is a place for delay, error and lost visibility.",
        "The business needed one version of the truth for advertising revenue: what was sold, at what price, approved by whom, and invoiced when. Without it, leadership was steering a large revenue line with a lagging, stitched-together view.",
      ],
      todo: ["What was booking actually running on before: spreadsheets, email, a legacy tool, or a mix by region?"],
    },
    problemDetail: {
      heading: "Problem statement",
      bullets: [
        "Quoting, order capture, approvals and scheduling were manual processes",
        "Booked orders were re-entered by hand into SAP for fulfilment, invoicing and revenue recognition",
        "Print, digital and classifieds selling did not share one platform",
      ],
      paragraphs: [
        "The cost wasn't only time. Re-entry creates mismatches between what sales booked and what finance billed, and every mismatch becomes a dispute, a delay in cash, or a number nobody fully trusts.",
      ],
      drafted: true,
      todo: ["Is there an example of the pain? A disputed invoice, a month-end scramble, a lost order?"],
    },
    discovery: {
      heading: "Discovery & research",
      drafted: true,
      paragraphs: [
        "I mapped the order journey end to end, from first quote to revenue recognition, with the people who touch it: sellers in the field, sales operations, finance and the SAP team. Then I marked every hand-off where data was retyped or an approval waited in someone's inbox.",
        "The finding that shaped the product: the booking screen was not the real problem. The gaps between systems were.",
      ],
      todo: ["Confirm which research you ran: field visits, workflow mapping sessions, data on cycle times?"],
    },
    strategy: {
      heading: "Strategy & vision",
      drafted: true,
      paragraphs: [
        "Vision: one booking, one record, from quote to cash.",
        "Make Salesforce the system of record for advertising and subscription revenue, and treat integration to SAP and in-house publishing systems as part of the product, not a follow-up project.",
      ],
      bullets: [
        "Adoption: every location selling through the platform",
        "Flow: booked orders reach invoicing without manual re-entry",
        "Speed: shorter order-to-invoice turnaround",
      ],
    },
    solution: {
      heading: "What was built",
      paragraphs: ["A Salesforce-native booking workflow and the integration layer behind it."],
      modules: [
        { name: "Quoting", description: "Price and package advertising across print, digital and classifieds." },
        { name: "Order capture", description: "One structured order record per booking." },
        { name: "Approval routing", description: "Approvals routed in the platform instead of over email." },
        { name: "Scheduling", description: "Placements scheduled against the booked order." },
        { name: "Salesforce–SAP integration", description: "Booked orders flow automatically into fulfilment, invoicing and revenue recognition, plus in-house publishing systems." },
        { name: "Einstein for sales", description: "Salesforce Einstein predictive and scoring features evaluated and deployed for the sales organisation." },
      ],
    },
    beforeAfter: {
      before: ["Manual quoting, orders and approvals", "Orders re-keyed into SAP", "Selling split across processes"],
      after: [
        "Quote → order → approval → schedule in Salesforce",
        "Orders flow to fulfilment, invoice and revenue automatically",
        "₹100 Cr+ of annual bookings on one platform",
      ],
    },
    decisions: [
      {
        title: "Native on Salesforce, not a custom build",
        context: "Build-vs-buy for the enterprise stack is mine to own. A bespoke booking tool was an option.",
        choice: "Build booking as a Salesforce-native workflow on the CRM data model.",
        why: "Sales already lived in the CRM. Going native meant one data model, faster rollout to thousands of users, and less custom software to maintain over years.",
        drafted: true,
      },
      {
        title: "Integration is the product",
        context: "A new booking screen alone would have moved the re-entry problem one step downstream.",
        choice: "Define and deliver the Salesforce–SAP integration layer as a first-class part of the launch.",
        why: "The value is in an order that flows to invoice and revenue untouched. That is what cut order-to-invoice time by 40%.",
        drafted: true,
      },
      {
        title: "One forum for five functions",
        context: "Finance, Sales, Marketing, Strategy and Legal each had valid and conflicting requirements.",
        choice: "Arbitrate against shared outcomes, order-to-invoice time and booking accuracy, instead of feature by feature.",
        why: "A platform for 5,000 users can't carry every exception. A shared yardstick made trade-offs explainable.",
        drafted: true,
      },
    ],
    execution: {
      heading: "Execution & adoption",
      drafted: true,
      paragraphs: [
        "Rollout to 58 locations was a change-management problem as much as a technical one. Enablement, training and fast feedback loops with sales operations mattered as much as the build.",
      ],
      todo: ["Was it phased by location, channel (print/digital/classified) or module?", "Key milestones and dates?", "How long until most bookings ran through the platform?"],
    },
    impact: [
      {
        value: "₹100 Cr+",
        countTo: 100,
        prefix: "₹",
        suffix: " Cr+",
        label: "Annual bookings on one platform",
        definition: "Annual advertising bookings captured in the Salesforce-native workflow",
        contribution: "Product owner of the platform",
        check: { status: "verified", source: "Resume, Oct 2026", note: "Rounded down for the public site." },
      },
      {
        value: "−40%",
        countTo: 40,
        prefix: "−",
        suffix: "%",
        label: "Order-to-invoice turnaround",
        definition: "Time from booked order to invoice",
        baseline: "To confirm",
        contribution: "Defined and delivered the integration layer",
        check: RESUME,
      },
      {
        value: "5,000+",
        label: "Sales users across 58 locations",
        definition: "Users moved off manual processes",
        check: RESUME,
      },
      {
        value: "0",
        label: "Manual re-entry between booking and SAP",
        definition: "Booked orders flow automatically to fulfilment, invoicing and revenue recognition",
        check: RESUME,
      },
    ],
    challenges: [
      {
        title: "Standardising 58 locations without breaking how they sell",
        what: "Regions and channels had grown their own ways of quoting and approving. A single platform needed a single process, but sellers' local realities were real.",
        options: ["One rigid national process", "Local variants per region", "A standard core with configurable rules"],
        decision: "A standard core flow, with differences handled as configuration (approval rules, packages) rather than custom code.",
        result: "One platform and one data model, without forcing every market into the same shape.",
        drafted: true,
      },
    ],
    learnings: {
      drafted: true,
      worked: ["Treating the integration as part of the product, not a later phase", "Arbitrating with shared outcomes instead of opinions"],
      didnt: [],
      learned: ["Adoption is a product feature: for 5,000 users, enablement is part of the build"],
      differently: [],
      todo: ["What didn't go to plan, and what would you do differently today?"],
    },
    capabilities: ["Enterprise Platform Strategy", "Salesforce & CRM", "Order-to-Cash", "ERP Integration", "Stakeholder Arbitration", "Change Management"],
  },

  /* ================================================================== */
  {
    slug: "print-circulation-platform",
    index: "02",
    title: "Print Circulation, Rebuilt",
    kicker: "Enterprise transformation · 0→1",
    summary:
      "Taking newspaper circulation from manual ordering to a platform that plans routes, forecasts demand and tracks delivery to 500,000+ individual subscribers.",
    problem:
      "Circulation ran on manual orders and untracked routes, so the business couldn't see whether a paper reached the subscriber who paid for it.",
    theme: "light",
    diagram: "systems-hub",
    heroMetric: {
      value: "99%",
      countTo: 99,
      suffix: "%",
      label: "Delivery accuracy after the route platform rollout",
      check: RESUME,
    },
    overview: {
      organisation: ORG,
      industry: "Media · print circulation & logistics",
      timeline: "2022 – present",
      role: ROLE,
      ownership: "Conceived the route platform and carried it from concept through beta to full rollout",
      teams: ["Circulation", "Distribution partners", "Engineering", "Data science", "Finance"],
      intro:
        "Print is a logistics business that runs every morning, before most of the company is awake. I modernised it in two moves: first moving 10,000+ vendors and distribution agents from manual ordering to a digital platform, then launching a new route-planning and delivery-tracking product that follows every paper to the doorstep.",
      check: RESUME,
    },
    context: {
      heading: "Business context",
      drafted: true,
      paragraphs: [
        "A subscription is a promise that a paper arrives every morning. When that promise breaks, the cost shows up as complaints, churn and refunds, and the business has no data to say where it broke.",
        "Print volumes are also expensive to get wrong. Print too many and you pay for waste. Print too few and you miss sales.",
      ],
      todo: ["Why now? Rising complaints, cost pressure, or a push to protect print subscriptions?"],
    },
    problemDetail: {
      heading: "Problem statement",
      bullets: [
        "Circulation ordering by 10,000+ vendors and agents was manual",
        "No system defined routes, assigned delivery agents or tracked fulfilment to the individual subscriber",
        "Print volumes per route were set without a forecasting model",
      ],
      paragraphs: ["Without delivery data, every complaint was an argument, and every fix was a guess."],
      drafted: true,
    },
    discovery: {
      heading: "Discovery & research",
      drafted: true,
      paragraphs: [
        "The users here are not app-native: vendors, distribution agents and delivery staff working before dawn. Discovery meant understanding their day, not just the database. Who orders, when, on what device, and what happens when a route changes.",
      ],
      todo: ["Did you do field visits or ride along on routes? Any memorable insight?"],
    },
    strategy: {
      heading: "Strategy & vision",
      drafted: true,
      paragraphs: [
        "Digitise first, then optimise. Getting orders online created the data foundation, and route planning, tracking and forecasting could only work on top of it.",
        "Vision: know where every paper is, from press to doorstep.",
      ],
      bullets: ["Accuracy: right paper, right subscriber, every day", "Fewer complaints", "Less waste through route-level forecasting"],
    },
    solution: {
      heading: "What was built",
      modules: [
        { name: "Digital ordering platform", description: "In-house platform replacing manual circulation ordering for 10,000+ vendors and agents." },
        { name: "Route planning", description: "Defines distribution routes." },
        { name: "Agent assignment", description: "Assigns delivery agents to routes." },
        { name: "Delivery tracking", description: "Tracks fulfilment down to the individual subscriber." },
        { name: "Demand forecasting", description: "ML forecasting that sets print volumes by route." },
        { name: "Route optimisation", description: "Algorithmic optimisation of delivery routes." },
      ],
    },
    beforeAfter: {
      before: ["Manual circulation orders", "Routes and agents managed offline", "No delivery visibility per subscriber"],
      after: ["10,000+ vendors and agents ordering online", "Routes planned, assigned and tracked in one product", "99% delivery accuracy, 80% fewer complaints"],
    },
    decisions: [
      {
        title: "Sequence: digitise ordering before optimising routes",
        context: "Route optimisation and forecasting were the exciting parts, but they need clean, digital data.",
        choice: "Move ordering online first, then build the route product on top.",
        why: "Every later capability, from tracking to forecasting to optimisation, depended on that foundation.",
        drafted: true,
      },
      {
        title: "Track to the subscriber, not the route",
        context: "Route-level tracking would have been simpler to build.",
        choice: "Track fulfilment to the individual subscriber.",
        why: "Complaints come from people, not routes. Subscriber-level data is what made complaint resolution, and the 80% drop, possible.",
        drafted: true,
      },
      {
        title: "Beta before scale",
        context: "A failure in circulation means papers not delivered tomorrow morning.",
        choice: "Take the product from concept through a beta before full rollout across 10+ cities.",
        why: "Real routes surface edge cases no spec will. A contained beta kept the downside small.",
        drafted: true,
      },
    ],
    execution: {
      heading: "Execution & rollout",
      paragraphs: ["Concept → beta → full rollout across 10+ cities and 500,000+ subscribers."],
      todo: ["Which city ran the beta, and how long did the rollout take?", "How were vendors and agents trained and brought online?"],
    },
    impact: [
      { value: "99%", countTo: 99, suffix: "%", label: "Delivery accuracy", definition: "Deliveries reaching the right subscriber", baseline: "To confirm", contribution: "Conceived and led the product", check: RESUME },
      { value: "−80%", countTo: 80, prefix: "−", suffix: "%", label: "Delivery complaints", baseline: "To confirm", check: RESUME },
      { value: "500K+", countTo: 500, suffix: "K+", label: "Subscribers in 10+ cities", definition: "Subscribers tracked on the route platform", check: RESUME },
      { value: "10,000+", label: "Vendors and agents moved online", detail: "Order cycle time cut by 50%", check: RESUME },
    ],
    challenges: [
      {
        title: "Bringing 10,000+ non-digital users online",
        what: "Vendors and agents had run on manual ordering for years. A platform they wouldn't use would fail regardless of its features.",
        options: ["Mandate a cut-over date", "Run parallel paper and digital", "Phase by region with hands-on onboarding"],
        decision: "To confirm: how adoption was actually driven.",
        result: "10,000+ vendors and agents online; order cycle time halved.",
        drafted: true,
      },
    ],
    learnings: {
      drafted: true,
      worked: ["Foundation first: digitisation made the later ML work possible"],
      didnt: [],
      learned: ["For operational users, the best interface is the one that fits their morning"],
      differently: [],
      todo: ["What would you do differently on the route platform today?"],
    },
    capabilities: ["0→1 Product Launch", "Enterprise Transformation", "Operations & Logistics", "ML Forecasting", "Route Optimisation", "Change Management"],
  },

  /* ================================================================== */
  {
    slug: "digital-platform-personalisation",
    index: "03",
    title: "Digital Platform & Applied AI",
    kicker: "Consumer platform · applied ML",
    summary:
      "Owning the roadmap for a content platform serving 50M+ users across web, app and API, and putting ML and GenAI to work where they earn their place.",
    problem: "At 50M+ users, one-size-fits-all content and manual editorial work stop scaling.",
    theme: "dark",
    diagram: "growth-loop",
    heroMetric: {
      value: "50M+",
      countTo: 50,
      suffix: "M+",
      label: "Users across web, app and API",
      check: RESUME,
    },
    overview: {
      organisation: ORG,
      industry: "Consumer digital media",
      timeline: "2022 – present",
      role: ROLE,
      ownership: "Roadmap, north-star metrics, personalisation and subscription conversion for the digital content platform",
      teams: ["Editorial", "Engineering", "Data science", "Design", "Subscriptions"],
      intro:
        "The digital platform is where a national news brand meets most of its audience. I own its roadmap and the metrics it's judged by, and I've used applied AI across it: personalised recommendations for readers, auto-categorisation for classified listings, and GenAI pilots for editors.",
      check: RESUME,
    },
    context: {
      heading: "Business context",
      drafted: true,
      paragraphs: [
        "Digital news competes for attention with every feed on the phone. Relevance drives return visits, and return visits drive both advertising and subscription conversion.",
      ],
    },
    problemDetail: {
      heading: "Problem statement",
      drafted: true,
      paragraphs: [
        "With 50M+ users, the same homepage for everyone leaves value on the table. Behind the scenes, editors and classifieds teams spent time on tagging and categorisation that a model could do.",
      ],
    },
    discovery: {
      heading: "Discovery & research",
      bullets: ["Product analytics and experimentation in Amplitude and Mixpanel", "A/B testing"],
      todo: ["Which insight changed the roadmap most?"],
    },
    strategy: {
      heading: "Strategy & vision",
      drafted: true,
      paragraphs: [
        "Pick the north-star, then let experiments argue. And use AI where it removes real work or adds real relevance, not as decoration.",
      ],
      bullets: ["North-star metrics and KPI frameworks for the platform", "Personalisation for relevance", "Subscription conversion as a product outcome"],
      todo: ["Which north-star metric did you set, and why that one?"],
    },
    solution: {
      heading: "What was built",
      modules: [
        { name: "Personalised recommendations", description: "ML-driven content recommendations on the digital platform." },
        { name: "Classifieds auto-categorisation", description: "Automatic categorisation of classified listings." },
        { name: "GenAI editorial pilots", description: "Summarisation and auto-tagging in editorial workflows." },
        { name: "Metrics & experimentation", description: "North-star metrics, KPI frameworks and A/B testing." },
      ],
    },
    decisions: [
      {
        title: "Pilot GenAI with editors before readers",
        context: "GenAI could have gone straight into reader-facing features.",
        choice: "Run pilots for summarisation and auto-tagging inside editorial workflows first.",
        why: "A newsroom's credibility is its product. Keeping a human in the loop let us learn where models help without putting trust at risk.",
        drafted: true,
      },
      {
        title: "Evaluate before committing platform spend",
        context: "AI vendors and capabilities were multiplying quickly.",
        choice: "Run build-vs-buy evaluations of AI vendors before committing spend.",
        why: "Locking into the wrong vendor across a 50M-user platform is expensive to undo.",
        drafted: true,
      },
    ],
    execution: {
      heading: "Execution",
      todo: ["How did personalisation roll out: experiment-led, by section, by surface?", "Timeline?"],
    },
    impact: [
      { value: "50M+", countTo: 50, suffix: "M+", label: "Users on the platform", definition: "Users across web, app and API", check: RESUME },
      {
        value: "4",
        label: "ML and GenAI capabilities shipped or piloted",
        detail: "Recommendations, auto-categorisation, summarisation, auto-tagging",
        check: RESUME,
      },
    ],
    challenges: [],
    learnings: {
      drafted: true,
      worked: [],
      didnt: [],
      learned: ["AI earns its place by removing work or adding relevance, and you have to measure which"],
      differently: [],
      todo: [
        "Which outcome numbers can be published for this platform: engagement, return visits, subscription conversion?",
        "Older resumes mention a mobile redesign (3M+ MAU, +22% DAU) and a 70% payment success lift. Should either appear here?",
      ],
    },
    capabilities: ["Consumer Product Strategy", "North-Star Metrics", "Personalisation", "Applied ML", "GenAI Adoption", "Experimentation"],
  },

  /* ================================================================== */
  {
    slug: "student-assessment-platform",
    index: "04",
    title: "Student Assessment Platform",
    kicker: "Owning a product line as a business",
    summary:
      "Running a standalone product line end to end, from registration and payments to results delivery, for 900,000 registrations and ₹10 Cr+ in annual revenue.",
    problem: "A product line with its own revenue needs someone accountable for all of it, not just the features.",
    theme: "light",
    diagram: "payment-funnel",
    heroMetric: {
      value: "900K",
      countTo: 900,
      suffix: "K",
      label: "Registrations",
      check: RESUME,
    },
    overview: {
      organisation: ORG,
      industry: "Education · national school olympiad",
      timeline: "To confirm",
      role: ROLE,
      ownership: "Owner of the programme as a standalone product line",
      teams: ["Engineering", "Payments", "Operations", "Marketing", "Schools partnerships (to confirm)"],
      intro:
        "A national school olympiad is the one product I run as a business in its own right. I own the whole journey: registration, payments and results delivery. That means owning the revenue it earns and the experience of every student and parent who goes through it.",
      check: RESUME,
    },
    context: {
      heading: "Business context",
      drafted: true,
      paragraphs: [
        "An olympiad is a product with a calendar: registration windows, exam days and results day. Demand arrives in waves, and every wave has a deadline that can't move.",
      ],
      todo: ["Who registers: schools, parents or students? What does a typical season look like?"],
    },
    problemDetail: {
      heading: "Problem statement",
      drafted: true,
      paragraphs: [
        "At hundreds of thousands of registrations, small frictions compound. A confusing form or a failed payment at the deadline costs revenue and goodwill you can't win back until next season.",
      ],
    },
    discovery: { heading: "Discovery & research", todo: ["Where did registrations or payments drop off, and how did you find out?"] },
    strategy: {
      heading: "Strategy & vision",
      drafted: true,
      paragraphs: ["Treat it as a business, not a feature: own the funnel, the payments and the P&L, and design for the peak days."],
      todo: ["What were the goals: growth in registrations, revenue per registration, or operating cost?"],
    },
    solution: {
      heading: "What was built",
      modules: [
        { name: "Registration", description: "Student registration for the olympiad." },
        { name: "Payments", description: "Fee collection integrated into registration." },
        { name: "Results delivery", description: "Results published to participants." },
      ],
      todo: ["Is the exam itself online, offline or both?"],
    },
    decisions: [
      {
        title: "Design for the peak",
        context: "Registration and results traffic arrive in bursts around fixed dates.",
        choice: "To confirm: how capacity and payments were planned for peak days.",
        why: "To confirm",
        todo: true,
      },
    ],
    execution: { heading: "Execution", todo: ["Key changes you made since taking ownership?"] },
    impact: [
      { value: "900K", countTo: 900, suffix: "K", label: "Registrations", period: "To confirm: per season or cumulative", check: RESUME },
      {
        value: "₹10 Cr+",
        countTo: 10,
        prefix: "₹",
        suffix: " Cr+",
        label: "Annual revenue",
        contribution: "Owner of the product line",
        check: { status: "verified", source: "Resume, Oct 2026", note: "Rounded down for the public site." },
      },
    ],
    challenges: [],
    learnings: {
      drafted: true,
      worked: [],
      didnt: [],
      learned: ["Owning the revenue changes which problems you see first"],
      differently: [],
      todo: ["What changed in how you think about product once you owned a P&L?"],
    },
    capabilities: ["P&L Ownership", "Payments", "Funnel Optimisation", "Seasonal Scale", "Operations"],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);

/** Kept for later use. Empty because the current resume does not support the older side projects. */
export const alsoShipped: { title: string; line: string; check: Check }[] = [];

