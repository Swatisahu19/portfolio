import type { Metadata } from "next";
import { experiment, hrBuddy, shots } from "@/content/hr-buddy";
import { site } from "@/content/site";
import { ExperimentView } from "@/components/hr-buddy/ExperimentView";

const url = hrBuddy.experimentHref;

export const metadata: Metadata = {
  title: experiment.title,
  description: experiment.intro,
  alternates: { canonical: url },
  openGraph: { type: "article", url, title: `${experiment.title} · ${site.name}`, description: experiment.intro, images: [shots.confirm.src] },
};

export default function HrBuddyExperimentPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: experiment.title,
    description: experiment.intro,
    author: { "@type": "Person", name: site.name, url: site.url },
    url: `${site.url}${url}`,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ExperimentView />
    </>
  );
}
