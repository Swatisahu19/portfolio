import type { Check } from "@/content/types";
import { SHOW_REVIEW_MARKERS } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Review marker for unconfirmed claims. Visible only while
 * SHOW_REVIEW_MARKERS is on; disappears site-wide when it's turned off.
 */
export function ReviewMark({ check, className, dark = false }: { check: Check; className?: string; dark?: boolean }) {
  if (!SHOW_REVIEW_MARKERS || check.status === "verified") return null;
  const detail = [check.note, `Source: ${check.source}`].filter(Boolean).join(" · ");
  const drafted = check.status === "drafted";
  return (
    <span
      className={cn(
        "group/rm relative inline-flex cursor-help items-center gap-1.5 rounded-full border border-dashed px-2 py-0.5 align-middle font-mono text-[0.625rem] uppercase tracking-[0.12em]",
        drafted
          ? dark ? "border-white/40 text-white/70" : "border-lime-ink/60 text-lime-ink"
          : dark ? "border-lime/60 text-lime" : "border-cobalt/50 text-cobalt",
        className,
      )}
      tabIndex={0}
      title={detail}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {drafted ? "Drafted · review" : "To confirm"}
      <span className="sr-only">: {detail}</span>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-0 z-30 mb-2 hidden w-64 max-w-[calc(100vw-3rem)] rounded-sm bg-ink p-3 text-left font-sans text-xs normal-case tracking-normal text-ivory shadow-lift group-hover/rm:block group-focus/rm:block"
        aria-hidden="true"
      >
        {detail}
      </span>
    </span>
  );
}

/** Section-level marker: the copy is written from experience, not quoted from a source */
export function DraftedTag({ dark = false }: { dark?: boolean }) {
  if (!SHOW_REVIEW_MARKERS) return null;
  return (
    <p className={cn("label mb-4 inline-flex items-center gap-2", dark ? "text-white/60" : "text-lime-ink")}>
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      Drafted from your experience · review wording
    </p>
  );
}

/** Box listing open questions where facts are missing */
export function TodoBox({ items, dark = false }: { items?: string[]; dark?: boolean }) {
  if (!SHOW_REVIEW_MARKERS || !items?.length) return null;
  return (
    <aside
      className={cn(
        "mt-6 rounded-md border border-dashed p-5",
        dark ? "border-lime/40 bg-lime/[0.04] text-white/80" : "border-cobalt/40 bg-cobalt-soft/40 text-ink-2",
      )}
      aria-label="Content to confirm"
    >
      <p className={cn("label mb-3", dark ? "text-lime" : "text-cobalt")}>Draft: to confirm in discovery interview</p>
      <ul className="space-y-2 text-sm leading-relaxed">
        {items.map((q) => (
          <li key={q} className="flex gap-3">
            <span aria-hidden="true">?</span>
            <span>{q}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
