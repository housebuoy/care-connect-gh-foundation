// src/components/about/people-preview.tsx
import Link from "next/link";
import { Avatar } from "./avatar";
import { Reveal } from "@/components/reveal";
import type { TeamMember } from "@/lib/mock/about";

export function PeoplePreview({
  people,
  total,
}: { people: TeamMember[]; total: number }) {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="type-caption text-tally">The full team</p>
            <h2 className="type-h2 mt-3 text-ink">The people who show up.</h2>
            <p className="type-lead mt-4 text-ink/60">
              {total}+ volunteers and organisers behind our outreaches across the
              Ashanti Region.
            </p>
          </div>
          <Link
            href="/about/team"
            className="type-caption text-navy/70 underline-offset-4 hover:text-navy hover:underline"
          >
            See all {total} →
          </Link>
        </Reveal>

        {/* small avatars, capped */}
        <ul className="mt-12 grid grid-cols-4 gap-x-4 gap-y-8 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
          {people.map((p, i) => (
            <li key={i}>
              <Reveal delay={Math.min(i * 0.06, 0.3)}>
                <Avatar person={p} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}