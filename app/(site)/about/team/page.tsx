import { getPeople } from "@/sanity/queries";
import { TeamDirectory } from "@/components/about/team-directory";

export const metadata = {
  title: "Our team · Care Connect GH Foundation",
  description:
    "The founders, clinicians, organisers and volunteers behind every Care Connect GH outreach.",
};

export default async function TeamPage() {
  const people = await getPeople().catch(() => []);
  return <TeamDirectory people={people} />;
}