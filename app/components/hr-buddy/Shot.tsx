import Image from "next/image";
import type { Shot as ShotT } from "@/content/hr-buddy";
import { cn } from "@/lib/utils";

/** A real HR Buddy screenshot in a quiet browser frame */
export function Shot({
  shot,
  dark = false,
  caption = true,
  priority = false,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  className,
}: {
  shot: ShotT;
  dark?: boolean;
  caption?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className={cn("overflow-hidden rounded-lg shadow-lift ring-1", dark ? "bg-night-2 ring-white/10" : "bg-paper ring-ink/10")}>
        <div className={cn("flex items-center gap-3 border-b px-4 py-2.5", dark ? "border-white/10" : "border-ink/10")} aria-hidden="true">
          <span className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className={cn("h-2 w-2 rounded-full", dark ? "bg-white/20" : "bg-ink/15")} />
            ))}
          </span>
          <span className={cn("truncate font-mono text-[0.625rem] tracking-[0.04em]", dark ? "text-white/40" : "text-mute")}>HR Buddy · synthetic demo data</span>
        </div>
        <Image src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} sizes={sizes} priority={priority} className="h-auto w-full" />
      </div>
      {caption && <figcaption className={cn("mt-3 text-sm leading-relaxed", dark ? "text-white/55" : "text-mute")}>{shot.caption}</figcaption>}
    </figure>
  );
}
