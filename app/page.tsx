import { Hero } from "@/components/hero/Hero";
import { Impact } from "@/components/home/Impact";
import { Work } from "@/components/home/Work";
import { Philosophy } from "@/components/home/Philosophy";
import { Experience } from "@/components/home/Experience";
import { Lab } from "@/components/home/Lab";
import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";
import { Ticker } from "@/components/motion/Ticker";
import { experience, site } from "@/content/site";

/** Person schema lives on the homepage only, so case study pages carry no employer name */
const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  image: `${site.url}${site.portrait.src}`,
  jobTitle: site.role,
  worksFor: { "@type": "Organization", name: experience[0].company },
  address: { "@type": "PostalAddress", addressLocality: "Noida", addressCountry: "IN" },
  sameAs: [site.linkedin, site.github],
  knowsAbout: ["Product strategy", "Digital transformation", "Subscription platforms", "Payments", "Experimentation", "Applied AI"],
};

const TICKER = [
  "Product strategy",
  "Subscriptions & payments",
  "Enterprise platforms",
  "Experimentation",
  "Applied AI",
  "Digital transformation",
  "Media & commerce",
  "North-star metrics",
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      <Hero />
      <div className="border-y border-ink/10 bg-ink py-4 text-ivory" aria-hidden="true">
        <Ticker items={TICKER.map((t) => <span key={t} className="label text-[0.75rem]">{t}</span>)} separator="◆" className="[&_li>span:last-child]:text-lime" />
      </div>
      <Impact />
      <Work />
      <Philosophy />
      <Experience />
      <Lab />
      <About />
      <Contact />
    </>
  );
}
