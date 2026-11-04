"use client";

import { ArrowGlyph, Button } from "@/components/ui/button";

export function PrintButton() {
  return (
    <Button type="button" onClick={() => window.print()} size="lg">
      Save as PDF <ArrowGlyph />
    </Button>
  );
}
