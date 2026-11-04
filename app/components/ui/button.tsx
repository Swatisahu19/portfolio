import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * One button system for the site. Use `asChild` to render a link with the
 * same styling (<Button asChild><a href>…</a></Button>), never a button
 * nested inside an anchor.
 */
const buttonVariants = cva(
  "group/btn relative inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full font-mono text-[0.75rem] uppercase tracking-[0.12em] transition-[transform,background-color,color,box-shadow] duration-base ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-ink text-ivory hover:bg-ink/90 shadow-soft hover:shadow-card",
        lime: "bg-lime text-ink hover:shadow-[0_10px_30px_-10px_rgb(var(--c-lime)/0.9)]",
        outline: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-ivory",
        "outline-dark": "border border-white/25 text-white hover:border-lime hover:bg-lime hover:text-ink",
        ghost: "text-ink hover:bg-ink/5",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-14 px-7 text-[0.8125rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

/** Arrow that slides on parent hover */
export function ArrowGlyph({ className = "" }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex h-4 w-4 overflow-hidden", className)} aria-hidden="true">
      <svg viewBox="0 0 16 16" className="absolute inset-0 transition-transform duration-base ease-out group-hover/btn:translate-x-4 group-hover:translate-x-4" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 8h11M9 4l4 4-4 4" />
      </svg>
      <svg viewBox="0 0 16 16" className="absolute inset-0 -translate-x-4 transition-transform duration-base ease-out group-hover/btn:translate-x-0 group-hover:translate-x-0" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 8h11M9 4l4 4-4 4" />
      </svg>
    </span>
  );
}

export { Button, buttonVariants };
