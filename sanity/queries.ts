import { groq } from "next-sanity";
import { client } from "@/sanity/client";
import type { Outreach } from "@/lib/mock/outreaches";
import type { Partner } from "@/lib/mock/partners";
import { TeamMember } from "@/lib/mock/about";

const fields = groq`
  number, community, location, region, year, summary,
  isUpcoming, date, reached,
  "image": image.asset->url, "alt": image.alt
`;

export async function getOutreaches(): Promise<Outreach[]> {
  return client.fetch(
    groq`*[_type == "outreach"] | order(number desc){ ${fields} }`,
    {},
    { next: { tags: ["outreach"] } }
  );
}

export type AboutContent = {
  mission: string;
  vision: string;
  whyFounded: string;
  foundedYear: string;
  location: string;
  registrationStatus?: string;
};

export async function getAboutContent(): Promise<AboutContent | null> {
  return client.fetch(
    groq`*[_type == "aboutContent"][0]{
      mission, vision, whyFounded, foundedYear, location, registrationStatus
    }`,
    {},
    { next: { tags: ["aboutContent"] } }
  );
}


export type SiteSettings = {
  email: string;
  phone: string;
  whatsapp?: string;
  socials?: { platform: string; handle?: string; url: string }[];
  donateUrl?: string;
};

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(
    groq`*[_type == "siteSettings"][0]{ email, phone, whatsapp, socials, donateUrl }`,
    {},
    { next: { tags: ["siteSettings"] } }
  );
}


export async function getPartners(): Promise<Partner[]> {
  return client.fetch(
    groq`*[_type == "partner"] | order(order asc, name asc){
      name,
      "logo": logo.asset->url,
      "alt": logo.alt,
      url
    }`,
    {},
    { next: { tags: ["partner"] } }
  );
}

export async function getPeople(): Promise<TeamMember[]> {
  return client.fetch(
    groq`*[_type == "person"] | order(order asc, name asc){
      name, role, credential, isLeadership,
      "image": photo.asset->url, "alt": photo.alt
    }`,
    {},
    { next: { tags: ["person"] } }
  );
}