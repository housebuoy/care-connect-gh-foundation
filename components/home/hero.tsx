"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Outreach } from "@/lib/mock/outreaches";

const ROTATE_MS = 8000;

export function Hero({ outreaches }: { outreaches: Outreach[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce || outreaches.length <= 1) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % outreaches.length),
      ROTATE_MS,
    );
    return () => clearInterval(id);
  }, [reduce, outreaches.length]);

  const current = outreaches[active];

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-paper text-ink">
      {/* ── PHOTO ── */}
      <div className="relative h-[52vh] w-full md:absolute md:inset-y-0 md:right-0 md:h-full md:w-[54%]">
        {outreaches.length > 0 ? (
          outreaches.map((o, i) => (
            <motion.div
              key={o.number}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: i === active ? 1 : 0 }}
              transition={{ duration: reduce ? 0 : 1.2 }}
            >
              <HeroPhoto
                src={o.image}
                alt={o.alt ?? `Health outreach at ${o.community}`}
                priority={i === 0}
              />
            </motion.div>
          ))
        ) : (
          <HeroPhoto alt="" />
        )}

        {/* mobile bottom fade so the section reads as one */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-paper via-transparent to-transparent md:hidden" />

        {/* labelled evidence — only when there's an outreach to label */}
        {current && (
          <div className="absolute bottom-5 right-5 rounded-lg border border-ink/10 bg-paper/85 px-4 py-2.5 backdrop-blur">
            <p className="type-caption text-navy">
              №{current.number} · {current.region}
            </p>
          </div>
        )}
      </div>

      {/* ── CONTENT ── fills the viewport, bottom-weighted */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-5 pb-14 pt-8 md:pb-24 md:pt-28">
        <div className="md:w-[42%] md:pr-8">
          <h1 className="type-hero text-ink">
            Empowering <br /> awareness,
            <br />
            inspiring <span className="text-navy italic">wellness.</span>
          </h1>

          <p className="type-lead mt-6 max-w-md text-ink/70">
            Health education, resources and community screenings for informed
            health decisions.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/donate"
              className="type-label rounded-full bg-tally px-6 py-3 text-ink transition-transform hover:scale-105"
            >
              Donate
            </Link>
            <Link
              href="/get-involved"
              className="type-label rounded-full border border-ink/20 px-6 py-3 text-ink transition-colors hover:bg-ink/4"
            >
              Get involved
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroPhoto({
  src,
  alt,
  priority,
}: {
  src?: string;
  alt: string;
  priority?: boolean;
}) {
  if (!src) {
    return <div className="h-full w-full bg-linear-to-br from-sky/30 to-navy/20" />;
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      quality={90}
      className="object-cover"
      sizes="(max-width: 768px) 100vw, 54vw"
    />
  );
}