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

export type FieldType =
  | "text" | "email" | "tel" | "textarea" | "select" | "checkbox" | "file";

export type FormField = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  half?: boolean;              // sits in a 2-col row on desktop
  options?: string[];          // for select
  showFor?: Way["id"][];       // which path this field belongs to
};

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

// Form structure — will come from Sanity. Order here is render order.
export const formFields: FormField[] = [
  { name: "name",  label: "Name",  type: "text",  placeholder: "Your full name", required: true, half: true },
  { name: "email", label: "Email", type: "email", placeholder: "you@example.com", required: true, half: true },
  { name: "phone", label: "Phone", type: "tel",   placeholder: "055 000 0000",   required: true, half: true },
  { name: "location", label: "Where you're based", type: "text", placeholder: "Kumasi", required: true, half: true },
  {
  name: "photo",
  label: "Passport-sized photo (optional)",
  type: "file",
  showFor: ["volunteer"],
},

  {
    name: "role", label: "Where you'd like to help", type: "select", required: true,
    options: [...roles.map((r) => r.title), "Wherever I'm needed"],
    showFor: ["volunteer"],
  },
  {
    name: "organisation", label: "Organisation", type: "text",
    placeholder: "Your school, clinic or company", required: true,
    showFor: ["partner"],
  },
  {
    name: "partnerType", label: "How you'd like to partner", type: "select", required: true,
    options: [
      "Sponsor an outreach or supply materials",
      "Provide clinical staff or diagnostics",
      "Host an outreach at our venue",
      "Something else",
    ],
    showFor: ["partner"],
  },

  { name: "message", label: "Anything else (optional)", type: "textarea",
    placeholder: "Your background, availability, questions…" },
];