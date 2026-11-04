"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { DiagramKind } from "@/content/types";

/**
 * Technical illustrations, one per case study. They are abstractions of the
 * product's shape, not screenshots, so they carry no confidential data.
 * Lines draw in on view; pulses travel along paths with SMIL so there is no
 * JS loop. Reduced motion shows the final state.
 */

type P = { dark?: boolean; className?: string };

const useTone = (dark?: boolean) => ({
  ink: dark ? "rgba(255,255,255,0.85)" : "rgb(20,20,19)",
  line: dark ? "rgba(255,255,255,0.22)" : "rgba(20,20,19,0.22)",
  faint: dark ? "rgba(255,255,255,0.08)" : "rgba(20,20,19,0.06)",
  panel: dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.75)",
  accent: dark ? "rgb(200,245,58)" : "rgb(46,76,255)",
  lime: "rgb(200,245,58)",
});

function Draw({ d, stroke, delay = 0, width = 1.25, dash }: { d: string; stroke: string; delay?: number; width?: number; dash?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeDasharray={dash}
      initial={{ pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1], delay }}
    />
  );
}

function Pulse({ path, color, dur = 3, begin = 0, r = 3 }: { path: string; color: string; dur?: number; begin?: number; r?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <circle r={r} fill={color}>
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={path} />
    </circle>
  );
}

function Box({ x, y, w, h, label, sub, t, highlight }: { x: number; y: number; w: number; h: number; label: string; sub?: string; t: ReturnType<typeof useTone>; highlight?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={highlight ? t.accent : t.panel} stroke={highlight ? "none" : t.line} />
      <text x={x + 12} y={y + (sub ? 22 : h / 2 + 4)} fontSize="11" fontFamily="var(--font-mono)" letterSpacing="1.2" fill={highlight ? "rgb(20,20,19)" : t.ink}>
        {label}
      </text>
      {sub && (
        <text x={x + 12} y={y + 38} fontSize="10" fontFamily="var(--font-body)" fill={highlight ? "rgba(20,20,19,0.7)" : t.line.replace("0.22", "0.6")}>
          {sub}
        </text>
      )}
    </g>
  );
}

/* 01: quote-to-cash on Salesforce, integrated to SAP */
function BookingFlow({ dark, className }: P) {
  const t = useTone(dark);
  const steps = [
    { label: "QUOTE", sub: "price & package" },
    { label: "ORDER", sub: "capture" },
    { label: "APPROVE", sub: "routing" },
    { label: "SCHEDULE", sub: "placement" },
  ];
  const main = "M 60 150 H 540";
  return (
    <svg viewBox="0 0 600 300" className={className} role="img" aria-label="Diagram: Salesforce booking flow from quote to order, approval and scheduling, flowing automatically into SAP for invoicing and revenue recognition">
      <defs>
        <pattern id="g1" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={t.faint} />
        </pattern>
      </defs>
      <rect width="600" height="300" fill="url(#g1)" />
      <Draw d={main} stroke={t.line} />
      <Draw d="M 540 150 C 580 150 580 250 500 250 H 140 C 60 250 40 190 60 150" stroke={t.line} dash="3 5" delay={0.6} />
      {steps.map((s, i) => (
        <motion.g key={s.label} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}>
          <Box x={40 + i * 135} y={122} w={110} h={56} label={s.label} sub={s.sub} t={t} highlight={i === 3} />
        </motion.g>
      ))}
      <Box x={200} y={232} w={200} h={36} label="SAP · INVOICE · REVENUE" t={t} />
      <text x="60" y="70" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1.4" fill={t.accent}>SALESFORCE-NATIVE / ORDER-TO-CASH</text>
      <text x="60" y="92" fontSize="22" fontFamily="var(--font-display)" fill={t.ink}>One booking, one record, quote to cash</text>
      <Pulse path={main} color={t.accent} dur={3.2} />
      <Pulse path="M 540 150 C 580 150 580 250 500 250 H 140 C 60 250 40 190 60 150" color={t.lime} dur={5} begin={1} r={2.5} />
    </svg>
  );
}

/* 02: circulation actors on one route platform */
function SystemsHub({ dark, className }: P) {
  const t = useTone(dark);
  const nodes = [
    { x: 90, y: 70, label: "VENDORS" },
    { x: 90, y: 150, label: "AGENTS" },
    { x: 90, y: 230, label: "ROUTES" },
    { x: 470, y: 90, label: "FORECAST" },
    { x: 470, y: 210, label: "SUBSCRIBER" },
  ];
  const hub = { x: 300, y: 150 };
  return (
    <svg viewBox="0 0 600 300" className={className} role="img" aria-label="Diagram: vendors, delivery agents, routes, demand forecasting and individual subscribers connected through one circulation platform">
      <defs>
        <pattern id="g2" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={t.faint} />
        </pattern>
      </defs>
      <rect width="600" height="300" fill="url(#g2)" />
      {nodes.map((n, i) => {
        const d = `M ${n.x} ${n.y} C ${(n.x + hub.x) / 2} ${n.y}, ${(n.x + hub.x) / 2} ${hub.y}, ${hub.x} ${hub.y}`;
        return (
          <g key={n.label}>
            <Draw d={d} stroke={t.line} delay={i * 0.12} />
            <Pulse path={d} color={t.accent} dur={2.6 + i * 0.3} begin={i * 0.4} />
          </g>
        );
      })}
      <motion.circle cx={hub.x} cy={hub.y} r={56} fill="none" stroke={t.line} strokeDasharray="2 5" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} style={{ originX: "300px", originY: "150px" }} />
      <circle cx={hub.x} cy={hub.y} r={40} fill={t.accent} />
      <text x={hub.x} y={hub.y - 2} textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="1.2" fill="rgb(20,20,19)">ROUTE</text>
      <text x={hub.x} y={hub.y + 13} textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" fill="rgba(20,20,19,0.7)">PLATFORM</text>
      {nodes.map((n) => (
        <g key={n.label + "b"}>
          <rect x={n.x - (n.x < 300 ? 70 : 10)} y={n.y - 15} width={n.label.length * 8 + 30} height={30} rx={15} fill={t.panel} stroke={t.line} />
          <circle cx={n.x - (n.x < 300 ? 56 : -4)} cy={n.y} r={3} fill={t.ink} />
          <text x={n.x - (n.x < 300 ? 46 : -14)} y={n.y + 4} fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1.2" fill={t.ink}>{n.label}</text>
        </g>
      ))}
    </svg>
  );
}

/* 03: personalisation loop across platform surfaces */
function GrowthLoop({ dark, className }: P) {
  const t = useTone(dark);
  const ring = "M 170 150 m -90 0 a 90 90 0 1 0 180 0 a 90 90 0 1 0 -180 0";
  const stages = [
    { a: -90, label: "SIGNAL" },
    { a: 0, label: "MODEL" },
    { a: 90, label: "RECOMMEND" },
    { a: 180, label: "MEASURE" },
  ];
  const curve = "M 340 240 C 390 236, 410 220, 440 200 S 500 120, 560 70";
  return (
    <svg viewBox="0 0 600 300" className={className} role="img" aria-label="Diagram: personalisation loop of signal, model, recommend and measure, beside the platform surfaces web, app and API (illustrative)">
      <defs>
        <pattern id="g3" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={t.faint} />
        </pattern>
      </defs>
      <rect width="600" height="300" fill="url(#g3)" />
      <Draw d={ring} stroke={t.line} />
      <Pulse path={ring} color={t.accent} dur={6} r={4} />
      {stages.map((s) => {
        const rad = (s.a * Math.PI) / 180;
        const x = 170 + Math.cos(rad) * 90, y = 150 + Math.sin(rad) * 90;
        return (
          <g key={s.label}>
            <circle cx={x} cy={y} r={6} fill={t.panel} stroke={t.ink} />
            <text x={x + (s.a === 180 ? -14 : s.a === 0 ? 14 : 0)} y={y + (s.a === -90 ? -16 : s.a === 90 ? 24 : 4)} textAnchor={s.a === 180 ? "end" : s.a === 0 ? "start" : "middle"} fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1.2" fill={t.ink}>
              {s.label}
            </text>
          </g>
        );
      })}
      <text x="170" y="146" textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1.2" fill={t.accent}>ML</text>
      <text x="170" y="164" textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" fill={t.line.replace("0.22", "0.6")}>50M+ users</text>
      {/* axes */}
      <path d="M 340 250 H 570 M 340 250 V 50" stroke={t.line} />
      <Draw d={curve} stroke={t.accent} width={2} delay={0.4} />
      {[0.15, 0.4, 0.65, 0.9].map((p, i) => (
        <motion.rect key={p} x={350 + i * 55} width={28} rx={3} fill={t.faint} stroke={t.line} initial={{ height: 0, y: 250 }} whileInView={{ height: 30 + i * 32, y: 250 - (30 + i * 32) }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.12, duration: 0.8 }} />
      ))}
      <text x="560" y="58" textAnchor="end" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1.2" fill={t.ink}>ILLUSTRATIVE</text>
    </svg>
  );
}

/* 04: student assessment product line, registration to results */
function PaymentFunnel({ dark, className }: P) {
  const t = useTone(dark);
  const ok = "M 40 120 H 560";
  const fail = "M 240 140 C 240 200 255 220 280 220 H 340 C 365 220 365 120 390 120";
  const stages = ["REGISTER", "PAY", "EXAM", "RESULTS"];
  return (
    <svg viewBox="0 0 600 300" className={className} role="img" aria-label="Diagram: student assessment journey from registration and payment to exam and results, with failed payments routed through a retry path">
      <defs>
        <pattern id="g4" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={t.faint} />
        </pattern>
      </defs>
      <rect width="600" height="300" fill="url(#g4)" />
      <Draw d={ok} stroke={t.line} width={1.5} />
      <Draw d={fail} stroke={t.line} dash="3 5" delay={0.5} />
      {stages.map((s, i) => (
        <g key={s}>
          <rect x={40 + i * 150} y={100} width={100} height={40} rx={20} fill={i === 3 ? t.lime : t.panel} stroke={i === 3 ? "none" : t.line} />
          <text x={90 + i * 150} y={124} textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1.2" fill={i === 3 ? "rgb(20,20,19)" : t.ink}>{s}</text>
        </g>
      ))}
      <rect x="266" y="204" width="88" height="32" rx="6" fill={t.panel} stroke={t.accent} strokeDasharray="2 3" />
      <text x="310" y="224" textAnchor="middle" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="1.2" fill={t.accent}>RETRY</text>
      <text x="40" y="190" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1.2" fill={t.line.replace("0.22", "0.6")}>FAILURE PATH</text>
      <text x="40" y="206" fontSize="10" fontFamily="var(--font-body)" fill={t.line.replace("0.22", "0.6")}>recovered, not lost</text>
      <Pulse path={ok} color={t.accent} dur={2.8} />
      <Pulse path={fail} color={t.lime} dur={3.6} begin={1.2} r={2.5} />
      <text x="40" y="60" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1.4" fill={t.accent}>STUDENT ASSESSMENT / END-TO-END PRODUCT LINE</text>
      <text x="40" y="82" fontSize="22" fontFamily="var(--font-display)" fill={t.ink}>900K registrations, one journey to own</text>
    </svg>
  );
}

export function Diagram({ kind, dark, className = "h-auto w-full" }: { kind: DiagramKind } & P) {
  switch (kind) {
    case "booking-flow":
      return <BookingFlow dark={dark} className={className} />;
    case "systems-hub":
      return <SystemsHub dark={dark} className={className} />;
    case "growth-loop":
      return <GrowthLoop dark={dark} className={className} />;
    case "payment-funnel":
      return <PaymentFunnel dark={dark} className={className} />;
  }
}
