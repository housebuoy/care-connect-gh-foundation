import { groq } from "next-sanity";
import { client } from "@/sanity/client";
import type { Outreach, OutreachDetail } from "@/lib/mock/outreaches";
import type { Partner } from "@/lib/mock/partners";
import { TeamMember } from "@/lib/mock/about";
import type { HealthTopic, Article } from "@/lib/mock/articles";

const fields = groq`
  number, community, location, region, year, summary,
  isUpcoming, date, reached,
  "slug": slug.current,
  "hasGallery": count(gallery) > 0,
  "image": image.asset->url, "alt": image.alt
`;

export async function getOutreaches(): Promise<Outreach[]> {
  return client.fetch(
    groq`*[_type == "outreach"] | order(number desc){ ${fields} }`,
    {},
    { next: { tags: ["outreach"] } },
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
    { next: { tags: ["aboutContent"] } },
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
    { next: { tags: ["siteSettings"] } },
  );
}

export async function getPartners(): Promise<Partner[]> {
  return client.fetch(
    groq`*[_type == "partner"] | order(order asc, name asc){
      name,
      category,
      "logo": logo.asset->url,
      "alt": logo.alt,
      url
    }`,
    {},
    { next: { tags: ["partner"] } },
  );
}

export async function getPeople(): Promise<TeamMember[]> {
  return client.fetch(
    groq`*[_type == "person" && showOnSite == true] | order(order asc, name asc){
      name, role, credential, isLeadership,
      "image": photo.asset->url, "alt": photo.alt
    }`,
    {},
    { next: { tags: ["person"] } }
  );
}

export async function getHealthTopics(): Promise<HealthTopic[]> {
  return client.fetch(
    groq`*[_type == "healthTopic"] | order(order asc, condition asc){
      title, "slug": slug.current, condition, excerpt,
      "image": image.asset->url, "alt": image.alt,
      "reviewedBy": reviewedBy->{name, credential}, reviewedAt
    }`,
    {},
    { next: { tags: ["healthTopic"] } },
  );
}

export async function getArticles(): Promise<Article[]> {
  return client.fetch(
    groq`*[_type == "article"] | order(date desc){
      title, "slug": slug.current, date, excerpt,
      "image": image.asset->url, "alt": image.alt
    }`,
    {},
    { next: { tags: ["article"] } },
  );
}

export async function getOutreach(slug: string): Promise<OutreachDetail | null> {
  return client.fetch(
    groq`*[_type == "outreach" && slug.current == $slug][0]{
      number, community, location, region, year, summary, reached,
      "gallery": gallery[]{ "url": asset->url, "lqip": asset->metadata.lqip, alt }
    }`,
    { slug },
    { next: { tags: ["outreach"] } }
  );
}

export async function getOutreachSlugs(): Promise<string[]> {
  return client.fetch(
    groq`*[_type == "outreach" && defined(slug.current)].slug.current`
  );
}

export async function getApprovedVolunteers(): Promise<TeamMember[]> {
  return client.fetch(
    groq`*[_type == "submission"
      && path == "volunteer"
      && status == "approved"
      && showOnSite == true]
      | order(submittedAt asc){
        "name": name,
        "role": coalesce(displayRole, role),
        "image": photo.asset->url,
        "isLeadership": false
      }`,
    {},
    { next: { tags: ["submission"] } }
  );
}