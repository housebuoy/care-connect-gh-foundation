// src/components/about/people-grid.tsx
import Image from "next/image";
import type { TeamMember } from "@/lib/mock/about";

export function PeopleGrid({ people, title, subtitle }: {
  people: TeamMember[];
  title: string;
  subtitle?: string;
}) {
  if (people.length === 0) return null;
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <p className="type-caption text-tally">The full team</p>
          <h2 className="type-h2 mt-3 text-ink">{title}</h2>
          {subtitle && <p className="type-lead mt-4 text-ink/60">{subtitle}</p>}
        </div>

        <ul className="mt-12 grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 md:grid-cols-6 md:gap-x-6">
          {people.map((p, i) => (
            <li key={i} className="flex flex-col items-center text-center">
              <div className="relative aspect-square w-full overflow-hidden rounded-full border border-ink/10 bg-ink/[0.03]">
                {p.image ? (
                  <Image src={p.image} alt={p.name} fill className="object-cover"
                    sizes="(max-width:768px) 30vw, 15vw" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="font-display text-2xl text-ink/20">
                      {p.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                )}
              </div>
              <p className="type-caption mt-3 normal-case tracking-normal text-ink/80">
                {p.name}
              </p>
              {p.role && (
                <p className="type-caption mt-0.5 text-ink/40">{p.role}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}