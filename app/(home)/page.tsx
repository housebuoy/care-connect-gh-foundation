import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/home/hero";
import { Mission } from "@/components/home/mission";
import {FieldRegister} from "@/components/home/field-register";
import { GetInvolved } from "@/components/home/get-involved";
import { Partners } from "@/components/home/partners";
import { HealthPreview } from "@/components/home/health-preview";
import { WhatWeDo } from "@/components/home/what-we-do";

export default function Home() {
  return (
    <>
      <SiteNav />
      <Hero />
      <WhatWeDo />
      <Mission />      
      <FieldRegister />
      <HealthPreview /> 
      <Partners />
      <GetInvolved />
      
      {/* next sections stack below */}
    </>
  );
}
