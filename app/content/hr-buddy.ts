import type { Check } from "./types";

/**
 * HR Buddy: case study (/work/hr-buddy) and AI experiment (/lab/hr-buddy-experiment).
 *
 * Source of truth: "HR Buddy features, AI and technology" (15 Nov 2026).
 * Rules for this file:
 *  - Every number restates that document. No adoption, accuracy, revenue or
 *    user figures exist for HR Buddy, so none are published.
 *  - HR Buddy is an independent portfolio experiment on synthetic data. It is
 *    not an employer product and is separate from the "In-house HRMS" lab entry.
 *  - Built-but-not-connected (Anthropic adapter) and not-built items (Google
 *    Chat, SSO/MFA, sending notifications) are always labelled as such.
 */

export const HRB_SOURCE: Check = { status: "verified", source: "HR Buddy features, AI and technology (15 Nov 2026)" };

export const hrBuddy = {
  slug: "hr-buddy",
  index: "05",
  kicker: "AI-powered enterprise product · 0→1",
  cardTitle: "Designing and Building an AI-Powered HRMS",
  cardKicker: "Independent AI product · 0→1",
  cardContext:
    "HR Buddy is a working HRMS prototype I drove from product definition to production: employee self-service, manager workflows and HR administration across 16 modules, with an AI assistant that answers questions and prepares requests for employees to confirm.",
  /** Strategy, execution and hands-on building, kept distinct */
  cardRoles: [
    { k: "Product strategy", v: "Vision, hypothesis, PRDs and phased scope" },
    { k: "Product execution", v: "Architecture decisions, workflow and AI interaction design, testing, launch" },
    { k: "Hands-on build", v: "Built with Claude Code as development partner and deployed to production" },
  ],
  cardOutcomes: ["16 working modules and an AI assistant with 41 permission-checked read tools", "Live in production, with 15 demo workflows passing a production check"],
  title: "HR Buddy: Rethinking Enterprise HR Through AI",
  titleLines: ["HR Buddy: Rethinking", "Enterprise HR Through AI"],
  statement:
    "An experiment in building an end-to-end enterprise HRMS with an intelligent AI assistant — from product vision to production in 11 days.",
  cardDescription:
    "Can an enterprise HRMS become more than a system of records? I built a full-stack HR platform spanning employee self-service, manager workflows and HR administration, with an AI assistant that can answer questions and prepare employee requests.",
  context: "Independent product experiment",
  cardRole: "Product Vision, Product Strategy, Product Architecture, AI Experience Design and End-to-End Execution",
  role: "Product owner and AI-assisted product builder",
  productType: "Enterprise HRMS / AI-powered application",
  achievement: { value: "11 days", countTo: 11, suffix: " days", label: "From first prototype to production deployment, 1–11 November 2026." },
  /** Homepage card only, as requested: the core build week */
  cardAchievement: { value: "1 week", label: "From the PRD v0.3 rebuild to production deployment, 3–11 November 2026." },
  liveUrl: "/hr-buddy",
  liveUrlDisplay: "swati-sahu.com/hr-buddy",
  /** The repository is private: visitors request access through the contact form */
  accessHref: "/?topic=hr-buddy-access#contact",
  accessLabel: "Request code access",
  accessNote2: "The source code is private. Use the contact form to request access to the repository.",
  experimentHref: "/lab/hr-buddy-experiment",
  caseHref: "/work/hr-buddy",
  /** Production sign-in is gated; visitors need to ask for the code */
  accessNote: "Sign-in on the live demo is gated by a demo access code. All people, policies and numbers in it are synthetic.",
  summary:
    "An independent experiment: a 16-module enterprise HRMS with a permission-aware AI assistant, taken from first prototype to production in 11 days.",
};

/* ------------------------------------------------------------------ */
/* Screenshots: captured from a local run of the app on synthetic data */
/* ------------------------------------------------------------------ */

export type Shot = { src: string; alt: string; caption: string; w: number; h: number };
const S = (file: string, alt: string, caption: string): Shot => ({ src: `/images/hr-buddy/${file}.jpg`, alt, caption, w: 2000, h: 1250 });

export const shots = {
  dashboard: S("employee-dashboard", "HR Buddy employee home: leave balance, today's shift, requests in progress, pending tasks, goals and upcoming holidays", "Employee home: balances, today's shift, requests in approval, tasks and goals in one view."),
  leave: S("leave", "HR Buddy leave balances: twelve leave types with available, accrued, used and pending days", "Leave: balances by type, with accrual, usage and pending days."),
  attendance: S("attendance", "HR Buddy attendance calendar for the month", "Attendance: geofenced check-in and a month calendar with hours, holidays, absences to regularise and WFH days."),
  goals: S("goals", "HR Buddy goals page: an OKR plan with weighted goals, plan check and manager check-ins", "Goals: a weighted OKR plan, plan check and manager check-ins."),
  approvals: S("manager-approvals", "HR Buddy manager approvals queue with leave, work-from-home, confirmation and exit clearance items", "Manager: one queue for leave, WFH, confirmations and exit clearances."),
  admin: S("admin-ai", "HR Buddy admin console: the HR Buddy AI switches, with every tool listed with what it reads and who it is offered to", "Admin console: a switch for the assistant and one for each tool, with what it reads and who may use it."),
  chat: S("ai-chat", "HR Buddy AI chat panel answering a leave balance question beside the employee home", "HR Buddy AI answering from live leave data, with a link to the matching screen."),
  confirm: S("ai-confirm", "HR Buddy AI confirmation card for a prepared casual leave request, with Confirm and submit and Cancel buttons", "A prepared leave request. Nothing is submitted until the employee presses Confirm."),
};

/** Shown under the AI screenshots: they come from a local run, not production */
export const localRunNote =
  "Captured from a local run on synthetic data, where a rule-based mock stands in for the model and labels its answers “Simulated”. Production runs Google Gemini Flash-Lite; the screens, tools and confirmation card are the same.";

/* ------------------------------------------------------------------ */
/* Case study                                                           */
/* ------------------------------------------------------------------ */

export const opportunity = {
  hypothesis:
    "Traditional HRMS platforms often make employees navigate multiple modules and approval workflows for everyday tasks. Checking a balance, applying for a day off or raising a payroll question can each mean a different screen, form and approver.",
  question: "What if one platform covered the whole employee journey, and an assistant could turn a plain question into the right answer or a ready-to-confirm request?",
  pillars: [
    { who: "Employees", what: "Manage their workplace journey in one place: time, leave, requests, goals, documents and help." },
    { who: "Managers", what: "See their team and act on approvals, reviews and check-ins without hunting across modules." },
    { who: "HR administrators", what: "Configure organisation, policies, workflows and forms without code changes." },
    { who: "AI", what: "Make HR interactions more accessible and actionable, inside the same permissions as the person asking." },
  ],
  note: "This is a product hypothesis, tested by building. No customer research or user interviews were run for HR Buddy.",
};

export const experiences = [
  {
    id: "employee",
    label: "Employee experience",
    shot: shots.dashboard,
    items: ["Home and profile", "Attendance", "Leave", "Work from home", "Helpdesk", "Policies", "Documents", "Performance", "Goals and KPIs", "Requests and approvals"],
  },
  {
    id: "manager",
    label: "Manager experience",
    shot: shots.approvals,
    items: ["Team visibility", "Attendance and leave approvals", "WFH approvals", "Performance reviews", "Goals and check-ins", "Team workflows"],
  },
  {
    id: "admin",
    label: "HR & admin experience",
    shot: shots.admin,
    items: [
      "Organisation structure",
      "Employee master",
      "Role and permission management",
      "Onboarding",
      "Lifecycle management",
      "Workflow and form builders",
      "Leave and attendance policies",
      "Salary slips",
      "Policy library",
      "Integrations and audit controls",
    ],
  },
] as const;

/** The 16 modules, as listed in the source document */
export const modules: { name: string; detail: string; phase: "Core HR" | "Added in Phase 2" }[] = [
  { phase: "Core HR", name: "Organisation", detail: "Companies, business units, 9-level departments, designations, locations and grades. CSV import, effective-dated history." },
  { phase: "Core HR", name: "Employee master", detail: "Profiles with local-language names, education, experience and custom fields with per-role view and edit." },
  { phase: "Core HR", name: "Access and roles", detail: "Standard and custom roles with scoped grants, restricted super admin and logged proxy-as-user." },
  { phase: "Core HR", name: "Platform", detail: "Rule-based scopes, versioned form builder, 5-step approval flow builder, delegation, SLA reminders and escalation." },
  { phase: "Core HR", name: "Onboarding", detail: "Candidate tracker, secure candidate portal, sign-offs, background verification via REST and signed webhook." },
  { phase: "Core HR", name: "Lifecycle", detail: "Probation and confirmation, notice period by level, resignation, exit clearance and full-and-final inputs." },
  { phase: "Core HR", name: "Attendance", detail: "Policies by scope, shifts, geofences, browser GPS check-in, regularisation, comp-off rules and roster." },
  { phase: "Core HR", name: "Leave", detail: "12 leave types, accrual, carry forward, encashment caps, blackout dates and a leave simulator." },
  { phase: "Core HR", name: "Performance", detail: "OKR plans with weighted goals, cascade, check-ins, six-step review cycles and calibration." },
  { phase: "Core HR", name: "Integrations", detail: "Monthly payroll file, master-data change feed, public read-only API with OAuth and daily scheduled jobs." },
  { phase: "Added in Phase 2", name: "HR helpdesk", detail: "Tickets to HR, payroll or IT, with queues, response targets, two-level escalation and reopen." },
  { phase: "Added in Phase 2", name: "Work from home", detail: "Policies by scope, rule checks with a preview, approval through the flow engine." },
  { phase: "Added in Phase 2", name: "Salary slips", detail: "One encrypted PDF per employee per month; every opening is audited." },
  { phase: "Added in Phase 2", name: "Policy library", detail: "Versioned policies, published only after a second person approves, with full-text search." },
  { phase: "Added in Phase 2", name: "Goals and KPIs", detail: "KPI goals with baseline, target and calculated achievement, evidence, alignment and a KPI library." },
  { phase: "Added in Phase 2", name: "HR Buddy AI", detail: "The assistant panel and its admin console." },
];

export const chatbotVsAssistant = {
  chatbot: [
    "Answers from a fixed FAQ or a document index",
    "Knows policy, not your balance, your requests or your team",
    "Hands you a link and leaves the form to you",
    "Often runs with its own service account and broad access",
  ],
  assistant: [
    "Answers from live application data through 41 read tools",
    "Context-aware: your leave, attendance, goals, tickets and approvals",
    "Prepares the leave, WFH or helpdesk request, checked by the module's own rules",
    "Acts only as you, with your permissions, and never submits on its own",
  ],
};

export const aiCapabilities = [
  { k: "41", label: "Read tools", detail: "Profile, directory, organisation, documents, leave, attendance, comp-offs, WFH, requests, approvals, goals, KPIs, reviews, lifecycle, onboarding, helpdesk and policies." },
  { k: "EN · हिं", label: "English and Hindi", detail: "Answers in the language the employee writes in." },
  { k: "3", label: "Prepared actions", detail: "Leave request, WFH request and helpdesk ticket, each checked by the module's own preview rules." },
  { k: "10 min", label: "Action expiry", detail: "A confirmation card expires after 10 minutes. The assistant can cancel its own open card when asked." },
  { k: "By role", label: "Suggested prompts", detail: "Prompts change with the user's role and permissions, for example approvals for managers and queues for helpdesk agents." },
  { k: "Admin", label: "AI administration", detail: "A global switch and one per tool, a daily token limit, conversation retention, usage by day and by tool, and an exportable action log." },
];

/** Interactive workflow: the example is the leave request shown in the screenshots */
export const aiFlow = [
  { title: "Employee asks", body: "“Apply for casual leave tomorrow.”", tag: "Chat panel" },
  { title: "AI identifies intent", body: "A leave application for one day of casual leave.", tag: "Model" },
  { title: "Retrieves permitted context", body: "Balance and policy, read through the same API routes as the Leave screen, as this employee.", tag: "Read tools" },
  { title: "Validates with business rules", body: "The Leave module's own preview rules: working days charged, balance after approval, blackout dates.", tag: "Module rules" },
  { title: "Prepares the action", body: "A card with type, dates, days charged and balance after approval. Not submitted.", tag: "Prepared, not sent" },
  { title: "Employee reviews", body: "The card shows exactly what will be sent and to whom, and expires in 10 minutes.", tag: "Human in the loop" },
  { title: "Confirms or cancels", body: "Only the employee's Confirm click submits it, after a check that nothing changed and a guard against double submission.", tag: "Employee decides" },
];

export const safeguards = [
  { title: "Existing user permissions are enforced", body: "Every tool calls the real HR Buddy route as the signed-in user, so permissions, scopes, validation and audit are the screens' own." },
  { title: "AI uses existing application routes", body: "There is no separate AI back door. Tools go through the same API every screen uses, each registered with a required permission." },
  { title: "No independent database access", body: "The assistant has no connection to the database of its own. It can never see more than the user could." },
  { title: "No direct AI writes", body: "Write tools can only prepare. Submission happens only on the Confirm button." },
  { title: "Human confirmation required", body: "The employee reviews every prepared request and confirms or cancels it." },
  { title: "Sensitive data excluded", body: "Salary, compensation, ratings and disciplinary data never reach the model. A second filter drops any such field from every tool result." },
  { title: "Least-data access", body: "Each tool returns only named fields. Personal details, document content and review answers are never returned." },
  { title: "Prompt-injection safeguards", body: "Tool results are treated as data, never as instructions." },
  { title: "Auditable AI actions", body: "Every tool call is logged with a reference to the audit entries it caused. Changes made through the assistant are marked as such." },
  { title: "Duplicate-submission protection", body: "Confirm checks the details were not changed and guards against submitting twice." },
  { title: "Rate and token limits", body: "6 tool calls and 45 seconds per turn, 30 messages a minute per user, and a daily token ceiling with an alert at 80%." },
];

export const stack: { layer: string; items: { name: string; note?: string; status?: "live" | "ready" }[] }[] = [
  { layer: "Frontend", items: [{ name: "React 18" }, { name: "Vite 6" }, { name: "TypeScript 5.7" }, { name: "React Router 6" }, { name: "TanStack Query 5" }] },
  { layer: "Backend", items: [{ name: "Hono 4" }, { name: "Node.js 22" }, { name: "Zod", note: "input checks" }, { name: "jose", note: "signed sessions" }] },
  { layer: "Data", items: [{ name: "PostgreSQL / Neon", note: "production and Preview" }, { name: "PGlite", note: "local, in-process" }, { name: "9 SQL migrations", note: "additive only" }] },
  {
    layer: "AI",
    items: [
      { name: "Google Gemini Flash-Lite", note: "live in production", status: "live" },
      { name: "Anthropic adapter", note: "built and tested, not connected", status: "ready" },
      { name: "Mock provider", note: "local development and tests" },
    ],
  },
  { layer: "Security", items: [{ name: "AES-256-GCM", note: "sensitive fields, salary slips" }, { name: "Append-only audit", note: "enforced in the database" }, { name: "OAuth client credentials", note: "public API" }] },
  { layer: "Delivery", items: [{ name: "Vercel", note: "region sin1, daily cron" }, { name: "GitHub Actions", note: "Node 22" }, { name: "Vitest", note: "with React Testing Library" }] },
];

export const validation = [
  { k: "87", label: "AI evaluation questions", detail: "67 tuned and 20 held out. Run against the real chat API with network access blocked, measuring intent, completion and logging." },
  { k: "15", label: "Production demo workflows passed", detail: "Checked on production on 11 November 2026, after three wording fixes." },
  { k: "20", label: "Test files", detail: "Including a route × persona permission check across every API route." },
  { k: "CI", label: "Typecheck, tests and AI evaluation", detail: "GitHub Actions on every push and pull request." },
  { k: "11 Nov", label: "Production deployment", detail: "Both phases merged to production in November 2026, with migrations applied and no reseed." },
];
export const validationNote = "No AI accuracy percentage or adoption figure is published. HR Buddy runs on synthetic data and has no real users.";

export const timeline = [
  { date: "1 Nov", title: "First prototype", body: "A prototype on synthetic data, served under /hr-buddy." },
  { date: "3 Nov", title: "PRD v0.3 rebuild", body: "Backend and UI rebuilt from the revised PRD: employee view, admin console and candidate portal." },
  { date: "9–10 Nov", title: "Core HRMS and AI modules", body: "Migrations, the assistant, helpdesk, WFH, salary slips, policy library, KPIs and objectives." },
  { date: "11 Nov", title: "Phase 1 and Phase 2 deployed", body: "Modules merged to production, with demo content added to the existing database and Gemini switched on for synthetic data." },
  { date: "11 Nov", title: "Production checks and wording fixes", body: "15 demo workflows checked on production. The fixes stopped the assistant naming a page that does not exist or showing raw field names." },
];

export const lessons = [
  { title: "Detailed PRDs are the steering wheel", body: "The rebuild on 3 November came from a revised PRD, not from patching code. With an AI writing most of the code, the quality of the requirements decided the quality of the product." },
  { title: "AI-assisted development accelerates execution", body: "It collapsed the distance between a decision and a working screen, so more of my time went on product questions: scope, rules, edge cases and wording." },
  { title: "Architecture decisions matter more, not less", body: "Choosing early that every route declares a permission, and that the assistant uses those same routes, is what made a safe assistant possible later without a rewrite." },
  { title: "Enterprise AI needs permission boundaries", body: "An assistant that answers HR questions is easy. One that cannot see or do more than the person using it has to be designed in from the start." },
  { title: "Generated code is not tested code", body: "Typechecks, a permission matrix, an evaluation set and a production walkthrough each caught different things. The final wording fixes came from using the product, not from the test suite." },
  { title: "A working product is not a hardened deployment", body: "HR Buddy is live and works end to end on synthetic data. Real SSO, sent notifications, load and penetration testing and an accessibility audit are still ahead." },
];

/** The 16 modules grouped by what they do for the organisation */
export const moduleGroups = [
  { group: "Organisation & access", names: ["Organisation", "Employee master", "Access and roles"] },
  { group: "Employee lifecycle", names: ["Onboarding", "Lifecycle"] },
  { group: "Time & attendance", names: ["Attendance", "Leave", "Work from home"] },
  { group: "Performance", names: ["Performance", "Goals and KPIs"] },
  { group: "Employee services", names: ["HR helpdesk", "Salary slips", "Policy library"] },
  { group: "Platform, integrations & AI", names: ["Platform", "Integrations", "HR Buddy AI"] },
];

/** Product decisions: what the assistant may do, what it may see, and how production is treated */
export const productDecisions = [
  { title: "What the assistant may do", body: "Read through the user's own routes, prepare three kinds of request, and never submit. That boundary was a product decision, not a technical default." },
  { title: "What the model may never see", body: "Salary, compensation, ratings and disciplinary data are excluded, with a second filter on every tool result." },
  { title: "Which model, where", body: "Gemini's free tier is acceptable only because the data is synthetic. Before real employee data, it must move to a paid tier with a data-processing agreement or be switched off." },
  { title: "How production is treated", body: "Migrations are additive, and a database with data is never dropped or reseeded. Production refuses resets." },
  { title: "Decisions left open on purpose", body: "Whether non-managers may list teammates through the assistant is still an open permission question, so the assistant does not do it." },
];

export const tradeoffs = [
  { title: "Speed vs hardening", body: "The timeline bought a complete, working product. It did not buy SSO, sent notifications, load testing or an accessibility audit, and the product says so." },
  { title: "Free model vs data protection", body: "A free-tier model kept the experiment at zero cost, and is the reason only synthetic data is allowed." },
  { title: "Provider choice vs lock-in", body: "An Anthropic adapter was built and tested behind the same interface but left unconnected, so switching needs a key and a setting, not code." },
  { title: "Breadth vs depth", body: "16 modules show the shape of a full HRMS. Some Phase 2 items from the PRD, such as a report builder and dashboards, were deliberately left out." },
];

/** What is real today, what stands in for something, and what is still ahead */
export const status = {
  live: [
    "16 HRMS modules with screens, APIs and tests",
    "HR Buddy AI on Google Gemini Flash-Lite",
    "Neon Postgres in production, with daily scheduled jobs",
    "CI: typecheck, tests and AI evaluation on every push",
  ],
  simulated: [
    "All people, policies and numbers are synthetic",
    "Demo personas, behind an access code, stand in for SSO and MFA",
    "Email and push are captured in an outbox, not sent",
    "A rule-based mock replaces the model in local development and tests",
    "The Anthropic Claude adapter is built and tested, not connected",
  ],
};

export const nextSteps = [
  "Real SSO and MFA",
  "Live email and push notifications",
  "Google Chat integration",
  "Mobile applications",
  "OCR in onboarding",
  "Reporting and dashboards",
  "Load and penetration testing",
  "Accessibility audit",
];


/* ------------------------------------------------------------------ */
/* AI experiment narrative                                              */
/* ------------------------------------------------------------------ */

export const experiment = {
  title: "Building an Enterprise Product with AI: An 11-Day Experiment",
  titleLines: ["Building an Enterprise", "Product with AI"],
  subtitle: "An 11-day experiment",
  intro:
    "HR Buddy was a test of a question I care about as a product leader: if AI can write most of the code, what does the product owner's job become? This page is about the method. The product itself is in the case study.",
  layers: [
    {
      kicker: "AI used to build HR Buddy",
      name: "Claude Code",
      model: "Claude Opus 5.5",
      body: "My development partner, working from the HR Buddy PRDs inside the repository. It wrote code, migrations and tests that I reviewed, ran and merged into main.",
      fact: "40 commits co-authored by Claude",
    },
    {
      kicker: "AI inside HR Buddy",
      name: "Google Gemini",
      model: "Gemini Flash-Lite",
      body: "The live in-product assistant. It answers HR questions through permission-checked tools and prepares requests for the employee to confirm.",
      fact: "Live on production since 11 Nov 2026",
    },
  ],
  lifecycle: [
    { stage: "Product vision", body: "One platform for the employee journey, with an assistant that acts inside the user's own permissions." },
    { stage: "PRDs", body: "Requirements for the HRMS and for the conversational agent, with a use case catalogue and test cases." },
    { stage: "Architecture", body: "One TypeScript codebase, every route declared with a permission, plain Postgres, additive migrations." },
    { stage: "Implementation", body: "Built module by module (M0 to M13), from the core HR modules to the Phase 2 additions." },
    { stage: "AI integration", body: "Read tools over existing routes, prepared actions with confirmation cards, and an admin console for the assistant." },
    { stage: "Testing", body: "20 test files, a route × persona permission matrix and an 87-question evaluation set, run in CI." },
    { stage: "Production deployment", body: "Merged to production on 11 November, then checked workflow by workflow on the live site." },
  ],
  requirements: [
    { title: "A catalogue, not a wish list", body: "The PRD v0.3 catalogue gives every requirement an ID by area: organisation, employee, access, platform, lifecycle, onboarding, attendance, leave, performance and non-functional." },
    { title: "Screens and engines specified", body: "A Phase 1 PRD numbers 12 employee screens and 14 admin screens, and defines the shared engines: scopes, policy resolution, approval flows, notifications, audit and effective dating." },
    { title: "Scope written down, including what is out", body: "The build plan lists what was removed from version 1 and every deviation, such as SSO, MFA and OCR being simulated or not built." },
    { title: "The assistant had its own requirements", body: "A separate PRD and a use case catalogue for the conversational agent, mapped to the tools it would need, with a gap analysis before build." },
  ],
  building: [
    "Claude Code worked inside the repository from the PRDs and the build plan, module by module, writing code, migrations and tests together.",
    "I reviewed, ran and merged the work. 40 commits are co-authored by Claude.",
    "Before production, an acceptance check recorded evidence for each phase and listed what had to happen before merging: a rehearsal against a copy of the production database with a restore point, and my go-ahead.",
    "Deployments apply additive migrations only. A database with data is never dropped or reseeded, and production refuses resets.",
  ],
  aiTesting: [
    { title: "A deterministic stand-in", body: "A rule-based mock provider lets the assistant's tools, cards and logging be tested without calling a model or the network." },
    { title: "Tuned and held-out questions", body: "87 evaluation questions: 67 used while tuning and 20 held out, so phrasing the build never saw shows where answers stop generalising." },
    { title: "Measured on the real chat API", body: "The evaluation runs against the real chat API with network access blocked, measuring intent, completion and logging. It runs in CI on every push." },
    { title: "Then used for real", body: "15 demo workflows were walked through on production. Three wording issues the suite had not caught were fixed the same day." },
  ],
  controls: [
    "The assistant calls the same permission-checked routes as the screens, as the signed-in user.",
    "It can prepare a leave, WFH or helpdesk request, but only the employee's Confirm submits it.",
    "Salary, compensation, ratings and disciplinary data never reach the model.",
    "Every tool call is audited, and usage is capped per turn, per minute and per day.",
  ],
  lessons: [
    "AI changes where the product owner's time goes, from chasing delivery to deciding scope, rules and wording.",
    "The PRD becomes executable. Vague requirements produce plausible but wrong code faster than before.",
    "Responsible AI is an architecture decision, made before the first prompt is written.",
    "Passing tests is a floor. Using the product end to end on production still found issues the suite did not.",
  ],
  disclaimer:
    "This experiment does not show that AI replaces an engineering organisation, or that HR Buddy is ready for enterprise scale. It shows how far one product owner can take a well-specified product with AI as a development partner, and where human judgment stayed essential.",
};
