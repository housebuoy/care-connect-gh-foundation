"use client";

import Image from "next/image";
import type { Partner } from "@/lib/mock/partners";

export function Partners({ partners = [] }: { partners?: Partner[] }) {
  // Don't render an empty/thin credibility section — hide until real partners exist.
  if (partners.length === 0) return null;

  // duplicate the list so the marquee can loop seamlessly
  const loop = [...partners, ...partners];

  // only animate if there are enough to scroll; otherwise center them statically
  const animate = partners.length >= 5;

  return (
    <section className="border-y border-ink/10 bg-paper py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-5">
        <p className="type-caption text-center text-tally">Our Partners</p>
      </div>

      {animate ? (
        <div className="group relative mt-8 overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <ul className="flex w-max animate-marquee items-center gap-12 group-hover:[animation-play-state:paused] md:gap-20">
            {loop.map((p, i) => (
              <li key={`${p.name}-${i}`} className="shrink-0">
                <PartnerMark partner={p} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mx-auto mt-8 flex max-w-6xl flex-wrap items-center justify-center gap-10 px-5 md:gap-16">
          {partners.map((p) => (
            <PartnerMark key={p.name} partner={p} />
          ))}
        </div>
      )}
    </section>
  );
}

function PartnerMark({ partner }: { partner: Partner }) {
  const content = partner.logo ? (
    <div className="relative h-10 w-32 opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0 md:h-12 md:w-40">
      <Image
        src={partner.logo}
        alt={partner.name}
        fill
        className="object-contain"
        sizes="160px"
      />
    </div>
  ) : (
    // graceful fallback when there's a name but no logo yet
    <span className="type-label whitespace-nowrap text-ink/40 transition hover:text-navy">
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