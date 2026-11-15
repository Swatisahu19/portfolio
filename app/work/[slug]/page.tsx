import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { hrBuddy, shots } from "@/content/hr-buddy";
import { site } from "@/content/site";
import { CaseStudyView } from "@/components/case-study/CaseStudyView";
import { HrBuddyCaseStudy } from "@/components/hr-buddy/HrBuddyCaseStudy";

export const dynamicParams = false;

/** HR Buddy (05) has its own layout but shares this route, so it is prerendered with the rest */
export function generateStaticParams() {
  return [...caseStudies.map((c) => ({ slug: c.slug })), { slug: hrBuddy.slug }];
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const url = `/work/${params.slug}`;
  if (params.slug === hrBuddy.slug) {
    return {
      title: `${hrBuddy.cardTitle}: Case study`,
      description: hrBuddy.summary,
      alternates: { canonical: url },
      openGraph: { type: "article", url, title: `${hrBuddy.title} · ${site.name}`, description: hrBuddy.summary, images: [shots.dashboard.src] },
    };
  }
  const c = getCaseStudy(params.slug);
  if (!c) return {};
  return {
    title: `${c.title}: Case study`,
    description: c.summary,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: `${c.title} · ${site.name}`, description: c.summary, images: [site.portrait.src] },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const isHrBuddy = params.slug === hrBuddy.slug;
  const c = getCaseStudy(params.slug);
  if (!isHrBuddy && !c) notFound();
  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: isHrBuddy ? hrBuddy.title : c!.title,
    description: isHrBuddy ? hrBuddy.summary : c!.summary,
    author: { "@type": "Person", name: site.name, url: site.url },
    url: `${site.url}/work/${params.slug}`,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      {isHrBuddy ? <HrBuddyCaseStudy /> : <CaseStudyView c={c!} />}
    </>
  );
}
