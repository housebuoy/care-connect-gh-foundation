"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/mock/outreaches";
import type { Outreach } from "@/lib/mock/outreaches";

export default function UpcomingOutreaches({ items = [] }: { items?: Outreach[] }) {
  if (items.length === 0) return null;

  return (
    <section className="bg-ink py-16 text-white md:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <p className="type-caption text-sky">Coming up</p>
        <h2 className="type-h2 mt-3">
          {items.length === 1 ? "Our next outreach." : "What's next."}
        </h2>

        {items.length === 1 ? (
          <div className="mt-8">
            <UpcomingCard o={items[0]} />
          </div>
        ) : (
          <Carousel items={items} />
        )}
      </div>
    </section>
  );
}

function Carousel({ items }: { items: Outreach[] }) {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((p) => (p + d + items.length) % items.length);

  return (
    <div className="mt-8">
      <UpcomingCard o={items[i]} />
      <div className="mt-6 flex items-center gap-4">
        <button onClick={() => go(-1)} aria-label="Previous"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 hover:bg-white/10">
          <ChevronLeft size={18} />
        </button>
        <button onClick={() => go(1)} aria-label="Next"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 hover:bg-white/10">
          <ChevronRight size={18} />
        </button>
        <div className="ml-2 flex gap-1.5">
          {items.map((_, d) => (
            <button key={d} onClick={() => setI(d)} aria-label={`Go to ${d + 1}`}
              className={`h-1.5 rounded-full transition-all ${d === i ? "w-6 bg-tally" : "w-1.5 bg-white/30"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function UpcomingCard({ o }: { o: Outreach }) {
  return (
    <div className="grid gap-6 overflow-hidden rounded-2xl border border-white/15 md:grid-cols-2">
      {o.image && (
        <div className="relative aspect-[4/3] md:aspect-auto">
          <Image src={o.image} alt={o.alt ?? o.community} fill className="object-cover"
            sizes="(max-width:768px) 100vw, 45vw" />
        </div>
      )}
      <div className={`flex flex-col justify-center p-6 md:p-8 ${!o.image ? "md:col-span-2" : ""}`}>
        {o.date && <p className="type-caption text-tally">{formatDate(o.date)}</p>}
        <h3 className="mt-2 font-display text-2xl font-semibold">{o.community}</h3>
        <p className="type-caption mt-1 text-white/50">{o.location} · {o.region} Region</p>
        <p className="type-body mt-4 max-w-md text-white/70">{o.summary}</p>
        <Link href="/get-involved?as=volunteer#form"
          className="type-label mt-6 inline-flex w-fit rounded-full bg-tally px-6 py-3 text-ink transition-transform hover:scale-105">
          Volunteer for this →
        </Link>
      </div>
    </div>
  );
}