import { Hero } from "@/components/hero/Hero";
import { Impact } from "@/components/home/Impact";
import { Work } from "@/components/home/Work";
import { Experience } from "@/components/home/Experience";
import { Lab } from "@/components/home/Lab";
import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";
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

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      <Hero />
      <Impact />
      <Work />
      <Experience />
      <Lab />
      <About />
      <Contact />
    </>
  );
}
