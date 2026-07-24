export type Outreach = {
  number: number;
  alt?: string;
  year: number;
  community: string;
  location: string;
  region: string;
  summary: string;
  isUpcoming?: boolean;
  date?: string;
  reached?: number;
  image?: string;
};

// the real 13 — completed outreaches
const realOutreaches: Outreach[] = [
  { number: 1,  year: 2024, community: "Ayeduase Market Traders",            location: "Ayeduase, KNUST",              region: "Ashanti", summary: "Conducted a health survey to assess community knowledge and gauge interest in screenings for diabetes and hypertension.", image: "/images/home/outreaches/2E3A0741.jpg" },
  { number: 2,  year: 2024, community: "Maakro D/A JHS",                     location: "Abuakwa–Maakro",               region: "Ashanti", summary: "Delivered a targeted educational session to students on preventing hypertension and diabetes through early, healthy lifestyle choices.", image: "/images/home/outreaches/2E3A0741.jpg" },
  { number: 3,  year: 2024, community: "Ebenezer International School",      location: "Abuakwa–Maakro",               region: "Ashanti", summary: "Provided education on cholera prevention, sanitation and food safety, alongside talks on hypertension and healthy living.", image: "/images/home/outreaches/2E3A0741.jpg" },
  { number: 4,  year: 2024, community: "Akoma Memorial Educational Complex", location: "Abuakwa–Maakro",               region: "Ashanti", summary: "Educated students on STIs and cholera, emphasising personal safety to protect their future health.", image: "/images/home/outreaches/2E3A0741.jpg" },
  { number: 5,  year: 2024, community: "Presbyterian JHS",                   location: "Kibi",                         region: "Eastern", summary: "Held a health talk on the rising risks of hypertension and diabetes among youth driven by lifestyle and eating habits.", image: "/images/home/outreaches/2E3A0741.jpg" },
  { number: 6,  year: 2024, community: "Rock of Ages Academy",              location: "Kibi",                         region: "Eastern", summary: "Taught students about the risks and prevention of typhoid fever and STIs, highlighting clean water and personal safety.", image: "/images/home/outreaches/2E3A0741.jpg" },
  { number: 7,  year: 2025, community: "Kingdom Community Chapel",          location: "IPT, Diamond Hills",           region: "Ashanti", summary: "Spread awareness and shared essential healthcare tips, focused heavily on cholera prevention.", image: "/images/home/outreaches/2E3A0741.jpg" },
  { number: 8,  year: 2025, community: "Anwomaso JHS",                       location: "Anwomaso",                     region: "Ashanti", summary: "Collaborated with partners to empower students through discussions on reproductive health, science and informed life choices.", image: "/images/home/outreaches/2E3A0741.jpg" },
  { number: 9,  year: 2025, community: "Ayeduase Roman Catholic JHS",       location: "Ayeduase, KNUST",              region: "Ashanti", summary: "Led a menstrual health and hygiene session for girls, featuring the donation and demonstration of sanitary pads.", image: "/images/home/outreaches/2E3A0741.jpg" },
  { number: 10, year: 2025, community: "Empowered for Transformation Seminar 1.0", location: "Church of Pentecost, Asenemaso", region: "Ashanti", summary: "Provided over 350 students with training in leadership, STEM, reproductive health and practical hygiene.", reached: 350, image: "/images/home/outreaches/2E3A0741.jpg" },
  { number: 11, year: 2025, community: "King Jesus Charity Home",           location: "Ayeduase-New Site, KNUST",     region: "Ashanti", summary: "Partnered with bio-researchers to donate educational materials, food and sanitary supplies to vulnerable children.", image: "/images/home/outreaches/2E3A0741.jpg" },
  { number: 12, year: 2026, community: "Kotei Roman Catholic JHS",          location: "Kotei, KNUST",                 region: "Ashanti", summary: "Educated students on personal hygiene and malaria prevention, advising against self-medication and unverified remedies.", image: "/images/home/outreaches/2E3A0741.jpg" },
  { number: 13, year: 2026, community: "Atwima Nwabiagya Municipal",        location: "Atwima Nwabiagya",             region: "Ashanti", summary: "Organised a municipal health screening with a medical diagnostic centre — testing, health surveys and on-site pharmaceutical care.", reached: 150, image: "/images/home/outreaches/2E3A0741.jpg" },
];

// ⚠️ DEMO ONLY — fake upcoming outreaches to preview the layout. DELETE before launch.
const DEMO_UPCOMING: Outreach[] = [
  { number: 14, year: 2026, community: "Oforikrom Community Screening", location: "Oforikrom", region: "Ashanti", summary: "A community-wide health screening — blood pressure, blood sugar and BMI checks, with health education and referrals for anyone who needs follow-up care.", isUpcoming: true, date: "2026-09-12", image: "/images/about/2E3A0769.jpg" },
  { number: 15, year: 2026, community: "Tafo Senior High School", location: "Old Tafo", region: "Ashanti", summary: "A schools outreach on malaria prevention and reproductive health, with a menstrual-hygiene session and free sanitary-pad donations.", isUpcoming: true, date: "2026-10-03", image: "/images/about/2E3A0769.jpg" },
];

// single source — demo upcoming only in dev, so it can never ship
export const outreaches: Outreach[] = [
  ...(process.env.NODE_ENV === "development" ? DEMO_UPCOMING : []),
  ...realOutreaches,
];

// derived lists
export const upcomingOutreaches = outreaches.filter((o) => o.isUpcoming);
export const completedOutreaches = outreaches.filter((o) => !o.isUpcoming);

// newest completed first
const recentCompleted = [...completedOutreaches].sort((a, b) => b.number - a.number);
export const heroOutreaches = recentCompleted.slice(0, 3);
export const recentOutreaches = recentCompleted.slice(0, 5);

// honest totals — completed only
export const impactTotals = {
  outreaches: completedOutreaches.length,
  regions: new Set(completedOutreaches.map((o) => o.region)).size,
  years: `${Math.min(...completedOutreaches.map((o) => o.year))}–${Math.max(...completedOutreaches.map((o) => o.year))}`,
};

export const outreachStats = impactTotals;

// year grouping runs over COMPLETED only — upcoming never mixes into the record
export function outreachesByYear() {
  const years = [...new Set(completedOutreaches.map((o) => o.year))].sort((a, b) => b - a);
  return years.map((year) => ({
    year,
    items: completedOutreaches.filter((o) => o.year === year).sort((a, b) => b.number - a.number),
  }));
}

export function formatDate(iso?: string) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  }).format(new Date(iso));
}