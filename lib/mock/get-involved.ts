export type Way = {
  id: "volunteer" | "partner" | "donate";
  href: string;
  cta: string;
  label: string;
  eyebrow: string;
  title: string;
  body: string;
  image?: string;
};

export type Role = {
  id: string;
  title: string;
  body: string;
  image?: string;
  needsTraining?: boolean;
};

export const roles: Role[] = [
  {
    id: "screening",
    title: "Screening support",
    body: "Taking blood pressure and blood sugar readings, recording results and helping people understand their numbers.",
    image: "/images/get-involved/2E3A0899.jpg",
    needsTraining: true,
  },
  {
    id: "education",
    title: "Health education",
    body: "Leading group talks and one-on-one sessions on hypertension, diabetes, cholera, malaria and reproductive health.",
    image: "/images/get-involved/2E3A0589.jpg",
  },
  {
    id: "logistics",
    title: "Setup and logistics",
    body: "Registration desks, supplies, crowd flow and getting the team where it needs to be. No medical background needed.",
    image: "/images/get-involved/2E3A0626.jpg",
  },
  {
    id: "documentation",
    title: "Documentation",
    body: "Photography and record-keeping — capturing each outreach so the work can be shown to partners and funders.",
    image: "/images/get-involved/roles/documentation.jpg",
  },
];


export const ways: Way[] = [
  {
    id: "volunteer",
    label: "Volunteer",
    cta: "Sign up to volunteer",
    href: "/get-involved?as=volunteer#form",
    eyebrow: "Give your time",
    title: "Join a team in the field.",
    body: "Outreaches run on people — taking readings, leading sessions, running the registration desk, keeping the record.",
    image: "/images/get-involved/volunteer.jpg",
  },
  {
    id: "partner",
    label: "Partner",
    cta: "Start a partnership",
    href: "/get-involved?as=partner#form",
    eyebrow: "Bring your organisation",
    title: "Make the bigger days possible.",
    body: "Our largest screening reached hundreds of people because a diagnostic centre came on board. Schools, churches, clinics and companies all have a way in.",
    image: "/images/get-involved/partner.jpg",
  },
  {
    id: "donate",
    label: "Donate",
    cta: "Ways to give",
    href: "/donate",
    eyebrow: "Fund the work",
    title: "Cover what an outreach costs.",
    body: "Test strips, transport, printed materials and supplies. Funding is what turns a planned outreach into one that happens.",
    image: "/images/get-involved/donate.jpg",
  },
];


// Form select options — the only part that genuinely varies.
export const roleOptions = [
  ...roles.map((r) => r.title),
  "Wherever I'm needed",
];

export const partnerOptions = [
  "Sponsor an outreach or supply materials",
  "Provide clinical staff or diagnostics",
  "Host an outreach at our venue",
  "Something else",
];