import { cn } from "@/lib/utils";

/**
 * HR Buddy architecture, from the source document: one React SPA, one Hono API
 * (a single Vercel function), Postgres, and an AI orchestrator that has no data
 * access of its own. Its tools call the same permission-checked routes as the
 * screens. Built in HTML, not an image, so it stays sharp, responsive and
 * readable by screen readers.
 */

function Box({ title, sub, children, className, accent }: { title: string; sub?: string; children?: React.ReactNode; className?: string; accent?: boolean }) {
  return (
    <div className={cn("rounded-md border p-4", accent ? "border-ink bg-ink text-ivory" : "border-ink/15 bg-paper", className)}>
      <p className="font-medium leading-snug">{title}</p>
      {sub && <p className={cn("mt-1 text-sm leading-snug", accent ? "text-ivory/65" : "text-mute")}>{sub}</p>}
      {children}
    </div>
  );
}

function Chips({ items, dark }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5">
      {items.map((i) => (
        <li key={i} className={cn("rounded-xs px-2 py-1 font-mono text-[0.6875rem]", dark ? "bg-white/10 text-ivory/80" : "bg-ink/[0.05] text-ink-2")}>{i}</li>
      ))}
    </ul>
  );
}

function Down({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 py-2 pl-6" aria-hidden="true">
      <svg viewBox="0 0 12 28" className="h-7 w-3 text-ink/40" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M6 0v26M2 22l4 5 4-5" /></svg>
      {label && <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-mute">{label}</span>}
    </div>
  );
}

export function Architecture() {
  return (
    <figure className="rounded-xl border border-ink/10 bg-ivory p-4 sm:p-8">
      <figcaption className="sr-only">
        HR Buddy architecture. The browser app talks only to the API. Screen requests and the AI orchestrator&apos;s tools both go through the same API routes, each
        with a required permission, then role and scope checks, module rules and an append-only audit log, before reaching PostgreSQL. The orchestrator calls a model
        provider: Gemini Flash-Lite is live, the Anthropic adapter is built but not connected, and a mock provider is used locally and in tests.
      </figcaption>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_15rem]" aria-hidden="true">
        <div>
          {/* Browser */}
          <p className="label mb-2 text-mute">Browser · React 18 + Vite 6</p>
          <Box title="Single-page app" sub="Holds no secrets and makes no database calls.">
            <Chips items={["Employee view", "Admin console", "Candidate portal", "Chat panel"]} />
          </Box>
          <Down label="HTTPS · signed session" />

          {/* API */}
          <p className="label mb-2 text-mute">API · Hono 4 on Node.js 22 · one Vercel function</p>
          <div className="rounded-lg border border-dashed border-ink/25 p-3 sm:p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Box title="Screen requests" sub="Forms, lists and approvals from the app." />
              <Box title="AI orchestrator" sub="No data access of its own. Max 6 tool calls and 45 s per turn." className="border-cobalt/40 bg-cobalt-soft/50">
                <Chips items={["41 read tools", "3 prepare tools", "Restricted-field filter"]} />
              </Box>
            </div>
            <div className="grid grid-cols-2 gap-3" aria-hidden="true">
              <Down />
              <Down label="as the signed-in user" />
            </div>
            <div className="space-y-2">
              <Box accent title="Same API routes, each registered with a required permission" />
              <div className="grid gap-2 sm:grid-cols-3">
                <Box title="Role × scope" sub="Out-of-scope records return “not found”." />
                <Box title="Validation & module rules" sub="Zod input checks, leave, WFH and helpdesk rules." />
                <Box title="Append-only audit" sub="Assistant changes marked as such." />
              </div>
            </div>
          </div>
          <Down />

          {/* Data */}
          <p className="label mb-2 text-mute">Data</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Box title="PostgreSQL on Neon" sub="Production and Preview, separate databases. PGlite locally.">
              <Chips items={["9 additive migrations", "AES-256-GCM fields"]} />
            </Box>
            <Box title="Outbox and daily jobs" sub="Email and push captured, not sent. Vercel cron for accrual, SLAs and retention." />
          </div>
        </div>

        {/* Providers */}
        <div className="flex flex-col lg:pt-[13.5rem]">
          <p className="label mb-2 text-mute">Model providers</p>
          <div className="space-y-2">
            <Box title="Gemini Flash-Lite" sub="Live in production">
              <span className="label mt-3 inline-block rounded-full bg-lime px-2 py-1 text-ink">Live</span>
            </Box>
            <Box title="Anthropic adapter" sub="Built and tested, not connected">
              <span className="label mt-3 inline-block rounded-full border border-ink/25 px-2 py-1 text-ink-2">Ready</span>
            </Box>
            <Box title="Mock provider" sub="Local development, tests and the evaluation set" />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-mute">Only the orchestrator talks to a model. The model never reaches the database.</p>
        </div>
      </div>
    </figure>
  );
}
