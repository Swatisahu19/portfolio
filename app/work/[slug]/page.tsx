import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { site } from "@/content/site";
import { CaseStudyView } from "@/components/case-study/CaseStudyView";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getCaseStudy(params.slug);
  if (!c) return {};
  const url = `/work/${c.slug}`;
  return {
    title: `${c.title}: Case study`,
    description: c.summary,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: `${c.title} · ${site.name}`, description: c.summary, images: [site.portrait.src] },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const c = getCaseStudy(params.slug);
  if (!c) notFound();
  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    description: c.summary,
    author: { "@type": "Person", name: site.name, url: site.url },
    url: `${site.url}/work/${c.slug}`,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <CaseStudyView c={c} />
    </>
  );
}
