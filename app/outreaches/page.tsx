import { NavTheme } from "@/components/nav-theme";
import { GetInvolved } from "@/components/home/get-involved";
import UpcomingOutreaches from "@/components/outreaches/upcoming";
import { FieldImpactTotals } from "@/components/home/field-register";
import { getOutreaches } from "@/sanity/queries";
import { outreaches as fallback } from "@/lib/mock/outreaches";
import type { Outreach } from "@/lib/mock/outreaches";
import { byYear, impactTotals, upcoming } from "@/lib/outreach-utils";

export const metadata = {
  title: "Outreaches · Care Connect GH Foundation",
  description:
    "A running record of the communities Care Connect GH has reached with health education, screening and support across Ghana.",
};

export default async function OutreachesPage() {
  let fetched: Outreach[] = [];
  try {
    fetched = await getOutreaches();
  } catch (err) {
    console.error("Sanity fetch failed, using fallback:", err);
  }

  const all = fetched.length ? fetched : fallback;
  const grouped = byYear(all);
  const totals = impactTotals(all);
  const next = upcoming(all);

  return (
    <>
      <NavTheme theme="ink" />

      {/* header */}
      <section className="bg-paper pt-32 md:pt-40">
        <div className="mx-auto max-w-6xl px-5">
          <p className="type-caption text-tally">The field record</p>
          <h1 className="type-hero mt-3 max-w-3xl text-ink">
            Every outreach, on the record.
          </h1>
          <p className="type-lead mt-5 max-w-xl text-ink/60">
            A running account of the schools, markets and communities we&rsquo;ve
            reached with health education, screening and support since 2024.
          </p>

          <FieldImpactTotals totals={totals} />
        </div>
      </section>

      {/* upcoming — nothing when none, card when one, carousel when many */}
      <UpcomingOutreaches items={next} />

      {/* the register */}
      <section className="bg-paper pb-24 pt-14 md:pb-28">
        <div className="mx-auto max-w-6xl px-5">
          {grouped.map(({ year, items }, gi) => (
            <div key={year} className={gi === 0 ? "" : "mt-16"}>
              <div className="flex items-baseline gap-4 border-b-2 border-tally/50 pb-3">
                <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">
                  {year}
                </h2>
                <span className="type-caption text-ink/40">
                  {items.length} {items.length === 1 ? "outreach" : "outreaches"}
                </span>
              </div>

              <div className="mt-4 hidden grid-cols-[3.5rem_1fr_10rem_5rem] gap-6 border-b border-ink/10 pb-2 md:grid">
                <span className="type-caption text-ink/30">№</span>
                <span className="type-caption text-ink/30">Outreach</span>
                <span className="type-caption text-ink/30">Where</span>
                <span className="type-caption text-right text-ink/30">Reached</span>
              </div>

              <ul className="divide-y divide-ink/[0.07]">
                {items.map((o) => (
                  <OutreachRow key={o.number} o={o} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <GetInvolved />
    </>
  );
}

function OutreachRow({ o }: { o: Outreach }) {
  return (
    <li className="grid grid-cols-[3.5rem_1fr] gap-x-6 gap-y-2 py-6 md:grid-cols-[3.5rem_1fr_10rem_5rem] md:items-baseline md:py-7">
      <span className="type-caption text-ink/35 md:pt-1">
        №{String(o.number).padStart(2, "0")}
      </span>

      <div>
        <h3 className="font-display text-xl font-semibold text-ink">
          {o.community}
        </h3>
        <p className="type-caption mt-1 text-navy md:hidden">
          {o.location} · {o.region} Region
        </p>
        <p className="type-body mt-3 max-w-2xl text-ink/70">{o.summary}</p>
      </div>

      <div className="hidden md:block md:pt-1">
        <p className="type-caption text-navy">{o.location}</p>
        <p className="type-caption mt-0.5 text-ink/40">{o.region} Region</p>
      </div>

      <div className="hidden md:block md:pt-1 md:text-right">
        {o.reached ? (
          <>
            <span className="font-display text-2xl font-semibold text-tally">
              {o.reached}+
            </span>
            <span className="type-caption mt-0.5 block text-ink/45">reached</span>
          </>
        ) : (
          <span className="type-caption text-ink/25">—</span>
        )}
      </div>
    </li>
  );
}