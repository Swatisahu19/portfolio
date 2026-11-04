import Link from "next/link";
import { ArrowGlyph, Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="tech-grid grid-fade grid min-h-[80svh] place-items-center pt-[var(--nav-h)]">
      <div className="shell text-center">
        <p className="label text-cobalt">404 · Route not found</p>
        <h1 className="mt-6 text-d-lg font-medium">This page isn&apos;t on the roadmap.</h1>
        <Button asChild size="lg" className="mt-10">
          <Link href="/">Back to home <ArrowGlyph /></Link>
        </Button>
      </div>
    </section>
  );
}
