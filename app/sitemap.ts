import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, priority: 1 },
    { url: `${site.url}/resume`, lastModified: now, priority: 0.6 },
    ...caseStudies.map((c) => ({ url: `${site.url}/work/${c.slug}`, lastModified: now, priority: 0.8 })),
    { url: `${site.url}/work/hr-buddy`, lastModified: now, priority: 0.8 },
    { url: `${site.url}/lab/hr-buddy-experiment`, lastModified: now, priority: 0.7 },
  ];
}
