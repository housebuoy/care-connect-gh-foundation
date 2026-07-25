import Image from "next/image";
import type { Partner } from "@/lib/mock/partners";

const GROUPS = [
  { key: "medical", label: "Medical & diagnostic" },
  { key: "implementation", label: "Implementation & scientific" },
  { key: "media", label: "Media" },
  { key: "corporate", label: "Corporate sponsors" },
] as const;

export function Partners({ partners = [] }: { partners?: Partner[] }) {
  if (partners.length === 0) return null;

  const grouped = GROUPS.map((g) => ({
    ...g,
    items: partners.filter((p) => p.category === g.key),
  })).filter((g) => g.items.length > 0);

  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="type-caption text-tally">Our partners</p>
            <h2 className="type-h2 mt-3 text-ink">
              The work is never done alone.
            </h2>
          </div>
          <span className="type-caption text-ink/40">
            {partners.length} organisations
          </span>
        </div>

        <div className="mt-12 divide-y divide-ink/10 border-t border-ink/10">
          {grouped.map((g, i) => (
            <div
              key={g.key}
              className="grid gap-4 py-8 md:grid-cols-[1fr_2fr] md:gap-12"
            >
              <div className="flex items-baseline gap-3 md:min-w-0">
                <span className="type-caption text-tally">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-semibold text-ink md:text-xl">
                  {g.label}
                </h3>
              </div>

              <ul className="flex flex-wrap items-center gap-x-3 gap-y-5 md:min-w-0">
                {g.items.map((p) => (
                  <li key={p.name}>
                    <PartnerMark partner={p} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnerMark({ partner }: { partner: Partner }) {
  const content = partner.logo ? (
    <div className="relative h-9 w-28 opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 md:h-10 md:w-32">
      <Image
        src={partner.logo}
        alt={partner.name}
        fill
        className="object-contain object-left"
        sizes="128px"
      />
    </div>
  ) : (
    <span className="type-body text-ink/70 transition-colors hover:text-navy">
      {partner.name}
    </span>
  );

  return partner.url ? (
    <a href={partner.url} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  ) : (
    content
  );
}