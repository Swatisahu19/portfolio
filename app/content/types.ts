/**
 * Content model. Everything on the site is data in /app/content so it can be
 * reviewed and edited without touching components.
 *
 * Integrity rule: every claim carries a `check`. "verified" means it matches a
 * source document (named in `source`). "confirm" means it is published in a
 * source but Swati still needs to confirm the definition, baseline or
 * attribution. Items marked "confirm" render a visible review marker while
 * SHOW_REVIEW_MARKERS is true (see site.ts).
 */
export type Check = {
  /**
   * verified: matches a named source document
   * confirm:  in a source, but definition/baseline/attribution needs confirming
   * drafted:  narrative inferred from Swati's experience; needs her approval
   */
  status: "verified" | "confirm" | "drafted";
  source: string;
  note?: string;
};

export type Metric = {
  value: string;
  /** Numeric part for the count-up animation; omit for non-numeric values */
  countTo?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail?: string;
  check: Check;
};

export type ImpactMetric = Metric & {
  baseline?: string;
  result?: string;
  period?: string;
  definition?: string;
  contribution?: string;
};

export type Block = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  /** Open questions shown as a review box: facts we do not have yet */
  todo?: string[];
  /** Body text is inferred narrative, not a sourced fact */
  drafted?: boolean;
};

export type Decision = {
  title: string;
  context: string;
  choice: string;
  why: string;
  todo?: boolean;
  drafted?: boolean;
};

export type Challenge = {
  title: string;
  what: string;
  options: string[];
  decision: string;
  result: string;
  todo?: boolean;
  drafted?: boolean;
};

export type DiagramKind = "booking-flow" | "systems-hub" | "growth-loop" | "payment-funnel";

export type CaseStudy = {
  slug: string;
  index: string;
  title: string;
  kicker: string;
  /** One-line positioning used on cards and meta description */
  summary: string;
  problem: string;
  theme: "dark" | "light";
  diagram: DiagramKind;
  heroMetric: Metric;
  overview: {
    organisation: string;
    industry: string;
    timeline: string;
    role: string;
    ownership: string;
    teams: string[];
    intro: string;
    check: Check;
  };
  context: Block;
  problemDetail: Block;
  discovery: Block;
  strategy: Block;
  solution: Block & { modules?: { name: string; description: string }[] };
  /** State change the product created; each line must restate a sourced fact */
  beforeAfter?: { before: string[]; after: string[] };
  decisions: Decision[];
  execution: Block & { milestones?: { label: string; detail: string }[] };
  impact: ImpactMetric[];
  challenges: Challenge[];
  learnings: { worked: string[]; didnt: string[]; learned: string[]; differently: string[]; todo?: string[]; drafted?: boolean };
  capabilities: string[];
};

export type LabStage = "CONCEPT" | "PROTOTYPE" | "IN DEVELOPMENT" | "LIVE PRODUCT";

export type LabProject = {
  name: string;
  stage: LabStage;
  problem: string;
  concept: string;
  contribution: string;
  approach: string[];
  stageNote: string;
  href?: string;
  hrefLabel?: string;
  check: Check;
};
