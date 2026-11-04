import type { ReactNode } from "react";
import { LineReveal, Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export function SectionHead({
  index,
  label,
  lines,
  intro,
  dark = false,
  className,
  aside,
}: {
  index: string;
  label: string;
  lines: ReactNode[];
  intro?: string;
  dark?: boolean;
  className?: string;
  aside?: ReactNode;
}) {
  return (
    <header className={cn("grid gap-8 lg:grid-cols-12 lg:items-end", className)}>
      <div className="lg:col-span-8">
        <Reveal>
          <p className={cn("eyebrow mb-6", dark && "text-white/60")}>
            <span className={dark ? "text-lime" : "text-ink"}>{index}</span> / {label}
          </p>
        </Reveal>
        <h2 className={cn("text-d-lg font-medium", dark ? "text-white" : "text-ink")}>
          <LineReveal lines={lines} />
        </h2>
      </div>
      {(intro || aside) && (
        <Reveal delay={0.15} className="lg:col-span-4 lg:pb-2">
          {intro && <p className={cn("max-w-md text-lg leading-relaxed", dark ? "text-white/65" : "text-ink-2")}>{intro}</p>}
          {aside}
        </Reveal>
      )}
    </header>
  );
}
