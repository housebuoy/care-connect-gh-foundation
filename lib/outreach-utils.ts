import type { Outreach } from "@/lib/mock/outreaches";

export const completed = (all: Outreach[]) => all.filter((o) => !o.isUpcoming);
export const upcoming  = (all: Outreach[]) => all.filter((o) => o.isUpcoming);

export function impactTotals(all: Outreach[]) {
  const done = completed(all);
  const years = done.map((o) => o.year);
  return {
    outreaches: done.length,
    regions: new Set(done.map((o) => o.region)).size,
    years: years.length ? `${Math.min(...years)}–${Math.max(...years)}` : "—",
  };
}

export function byYear(all: Outreach[]) {
  const done = completed(all);
  const years = [...new Set(done.map((o) => o.year))].sort((a, b) => b - a);
  return years.map((year) => ({
    year,
    items: done.filter((o) => o.year === year).sort((a, b) => b.number - a.number),
  }));
}