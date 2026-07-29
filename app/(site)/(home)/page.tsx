import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/home/hero";
import { Mission } from "@/components/home/mission";
import { FieldRegister } from "@/components/home/field-register";
import { GetInvolved } from "@/components/home/get-involved";
import { Partners } from "@/components/home/partners";
import { HealthPreview } from "@/components/home/health-preview";
import { WhatWeDo } from "@/components/home/what-we-do";
import { getOutreaches } from "@/sanity/queries";
import { outreaches as fallback } from "@/lib/mock/outreaches";
import { completed, impactTotals } from "@/lib/outreach-utils";
import { getPartners, getAboutContent } from "@/sanity/queries";
import { about as fallbackAbout } from "@/lib/mock/about";

export default async function Home() {
  const partners = await getPartners().catch(() => []);
  const fetched = await getOutreaches();
  const all = fetched.length ? fetched : fallback; // safe: the 13 are real
  const done = completed(all);

  const content = await getAboutContent().catch(() => null);
  const about = content ?? fallbackAbout;

  return (
    <>
      <SiteNav />
      <Hero outreaches={done.slice(0, 3)} />
      <WhatWeDo />
      <Mission mission={about.mission} vision={about.vision} />
      <FieldRegister rows={done.slice(0, 5)} totals={impactTotals(all)} />
      <HealthPreview />
      <Partners partners={partners} />
      <GetInvolved />

      {/* next sections stack below */}
    </>
  );
}
