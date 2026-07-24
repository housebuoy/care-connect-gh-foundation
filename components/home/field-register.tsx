"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Outreach } from "@/lib/mock/outreaches";

export type Totals = {
  outreaches: number;
  regions: number;
  years: string;
};

export function FieldImpactTotals({ totals }: { totals: Totals }) {
  return (
    <div className="mt-8 grid grid-cols-1 divide-y divide-ink/10 border-y border-ink/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      <StatCell value={totals.outreaches} label="Outreaches" />
      <StatCell value={totals.regions} label="Regions" />
      <StatCell value={totals.years} label="Years" />
    </div>
  );
}

export function FieldRegister({
  rows = [],
  totals,
}: {
  rows?: Outreach[];
  totals: Totals;
}) {
  const reduce = useReducedMotion();

  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        {/* header: link only shows on desktop, right-aligned */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="type-caption text-tally">The field record</p>
            <h2 className="type-h2 mt-3 text-ink">
              Every outreach, on the record.
            </h2>
          </div>
          <Link
            href="/outreaches"
            className="type-caption hidden text-navy/70 underline-offset-4 hover:underline md:inline"
          >
            View all →
          </Link>
        </div>

        {/* mobile: full-width link under the table */}
        <Link
          href="/outreaches"
          className="type-label mt-6 flex items-center justify-center rounded-full border border-ink/15 py-3 text-navy hover:bg-ink/3 md:hidden"
        >
          View all outreaches →
        </Link>

        <FieldImpactTotals totals={totals} />

        {rows.length > 0 && (
          <>
            {/* column headers */}
            <div className="mt-8 hidden grid-cols-[3rem_1fr_7rem_5rem] gap-4 border-b border-ink/10 py-2 md:grid">
              <span className="type-caption text-ink/30">№</span>
              <span className="type-caption text-ink/30">Outreach</span>
              <span className="type-caption text-ink/30">Region</span>
              <span className="type-caption text-right text-ink/30">Reached</span>
            </div>

            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                show: { transition: { staggerChildren: reduce ? 0 : 0.06 } },
              }}
              className="divide-y divide-ink/[0.07]"
            >
              {rows.map((o) => (
                <motion.li
                  key={o.number}
                  variants={{
                    hidden: { opacity: 0, x: reduce ? 0 : -6 },
                    show: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href="/outreaches"
                    className="grid grid-cols-[3rem_1fr_5rem] items-center gap-4 py-3 transition-colors hover:bg-ink/3 md:grid-cols-[3rem_1fr_7rem_5rem]"
                  >
                    <span className="type-caption text-ink/40">№{o.number}</span>
                    <span className="type-caption truncate text-ink/90">
                      {o.community}
                    </span>
                    <span className="type-caption hidden text-ink/50 md:block">
                      {o.region}
                    </span>
                    <span className="type-caption text-right font-medium text-tally">
                      {o.reached ? `${o.reached}+` : "—"}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </>
        )}
      </div>
    </section>
  );
}

function StatCell({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="flex items-baseline gap-2 py-4 sm:justify-center sm:px-4">
      <span className="font-display text-2xl font-semibold text-navy">
        {typeof value === "number" ? value.toLocaleString("en-GB") : value}
      </span>
      <span className="type-caption text-ink/50">{label}</span>
    </div>
  );
}