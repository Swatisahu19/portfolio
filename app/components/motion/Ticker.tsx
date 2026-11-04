import type { ReactNode } from "react";

/** Infinite horizontal strip. Pure CSS; pauses on hover; stops under reduced motion. */
export function Ticker({ items, className = "", separator = "✳" }: { items: ReactNode[]; className?: string; separator?: string }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-10 whitespace-nowrap">
          <span>{item}</span>
          <span className="opacity-40" aria-hidden="true">{separator}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`group relative flex overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
