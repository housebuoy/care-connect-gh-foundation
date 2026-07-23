import { FaInstagram, FaFacebookF, FaXTwitter, FaTiktok, FaLinkedinIn } from "react-icons/fa6";

export type TeamMember = {
  name: string;
  role: string;
  credential?: string;
  image?: string;
  bio?: string;
  isLeadership?: boolean;

};


import type { IconType } from "react-icons";

export const socials: { label: string; handle: string; href: string; Icon: IconType }[] = [
  { label: "LinkedIn", handle: "@careconnectghfoundation", href: "https://www.linkedin.com/company/thecareconnectghfoundation", Icon: FaLinkedinIn },
  { label: "Instagram", handle: "@careconnectghfoundation", href: "https://instagram.com/careconnectghfoundation", Icon: FaInstagram },
  { label: "Facebook",  handle: "The Care Connect GH Foundation", href: "#", Icon: FaFacebookF },
  { label: "X",         handle: "careconnectgh_f", href: "https://x.com/careconnectgh_f", Icon: FaXTwitter },
  { label: "TikTok",    handle: "@careconnectgh", href: "#", Icon: FaTiktok },
];

export const CONTACT = {
  email: "Careconnectghfoundation@gmail.com",
  phone: "0551919096",
};

// Names/photos not available yet — placeholders. Page adapts when real data drops in.
export const team: TeamMember[] = [
  // leaders — MUST have isLeadership: true
  { name: "Placeholder", role: "Founder & Director", credential: "Registered Nurse", isLeadership: true },
  { name: "Placeholder", role: "Medical Lead", credential: "MBChB", isLeadership: true },
  { name: "Placeholder", role: "Outreach Coordinator", isLeadership: true },
  { name: "Placeholder", role: "Education Lead", isLeadership: true },
  // volunteers — no flag
  { name: "Placeholder", role: "Volunteer" },
  { name: "Placeholder", role: "Volunteer" },
  { name: "Placeholder", role: "Volunteer" },
  { name: "Placeholder", role: "Volunteer" },
  { name: "Placeholder", role: "Volunteer" },
  { name: "Placeholder", role: "Volunteer" },
  { name: "Placeholder", role: "Volunteer" },
  { name: "Placeholder", role: "Volunteer" },
  { name: "Placeholder", role: "Volunteer" },
  { name: "Placeholder", role: "Volunteer" },
  { name: "Placeholder", role: "Volunteer" },
  { name: "Placeholder", role: "Volunteer" },
  { name: "Placeholder", role: "Volunteer" },
  { name: "Placeholder", role: "Volunteer" },
  { name: "Placeholder", role: "Volunteer" },
  { name: "Placeholder", role: "Volunteer" },
];


export const about = {
  foundedYear: "2024",
  location: "Kumasi, Ashanti Region, Ghana",

  mission:
    "To deliver comprehensive health education, vital resources, and engaging community interventions that enable individuals to make informed choices and take proactive steps toward lifelong health and well-being.",
  vision:
    "To empower communities through transformative health education and proactive wellness initiatives, fostering a world where every individual is informed, engaged, and fully equipped to lead a healthier life.",

  whyFounded:
    "Care Connect GH Foundation was founded to bridge critical gaps in community health literacy and healthcare access across Ghana, after identifying widespread misinformation about rising chronic and infectious diseases. A market survey revealed that most people only learn about conditions like hypertension and diabetes after a diagnosis. The foundation stepped in to shift communities toward proactive wellness — taking free medical screenings, on-site pharmaceutical care, and preventative education directly into schools and marketplaces, so underserved populations can make informed, life-saving choices.",

  registrationStatus: "Registration in progress", // placeholder until real number
};

