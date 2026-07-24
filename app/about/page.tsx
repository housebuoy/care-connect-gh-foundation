import { GetInvolved } from "@/components/home/get-involved";
import { Partners } from "@/components/home/partners";
import { about as fallbackAbout } from "@/lib/mock/about";
import Image from "next/image";
import { NavTheme } from "@/components/nav-theme";
import { PeoplePreview } from "@/components/about/people-preview";
import { getPeople, getPartners, getAboutContent } from "@/sanity/queries";

const PREVIEW_COUNT = 20;

export const metadata = {
  title: "About · Care Connect GH Foundation",
  description:
    "A community health foundation bridging gaps in health literacy and access across Ghana.",
};

export default async function AboutPage() {
  const [content, team, partners] = await Promise.all([
    getAboutContent().catch(() => null),
    getPeople().catch(() => []),
    getPartners().catch(() => []),
  ]);

  const about = content ?? fallbackAbout;

  const leaders = team.filter((m) => m.isLeadership);
  const volunteers = team
    .filter((m) => !m.isLeadership)
    .sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
  const preview = [...leaders, ...volunteers].slice(0, PREVIEW_COUNT);

  return (
    <>
      <NavTheme theme="light" />

      {/* header */}
      <header className="bg-ink text-white">
        <div className="mx-auto grid max-w-6xl items-stretch gap-10 px-5 pb-16 pt-32 md:grid-cols-2 md:gap-12 md:pb-20 md:pt-40">
          <div className="flex flex-col justify-center">
            <p className="type-caption text-sky">About us</p>
            <h1 className="type-hero text-white">
              Bridging the gap <br /> between communities <br />
              and their <span className="text-sky italic">health.</span>
            </h1>
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              <Meta label="Founded" value={about.foundedYear} />
              <Meta label="Based in" value={about.location} />
            </div>
          </div>

          <div className="relative aspect-4/3 overflow-hidden rounded-2xl md:aspect-auto md:min-h-96">
            <Image
              src="/images/about/2E3A0769.jpg"
              alt="The Care Connect GH team at a community outreach"
              fill
              priority
              quality={90}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
        </div>
      </header>

      {/* why founded */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="grid items-center gap-8 md:grid-cols-[1.5fr_1fr] md:gap-16">
          <div>
            <p className="type-caption text-tally">Why we exist</p>
            <p className="type-lead mt-5 text-ink/75">{about.whyFounded}</p>
          </div>
          <p className="font-display text-4xl leading-[1.15] text-ink sm:text-5xl md:text-6xl">
            Most people learn{" "}
            <span className="text-navy italic">too late.</span>
          </p>
        </div>
      </section>

      {/* mission + vision */}
      <section className="bg-paper pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-12 border-t border-ink/10 pt-12 md:grid-cols-[1.6fr_1fr] md:gap-16 md:pt-16">
            <div className="min-w-0">
              <div className="flex items-baseline gap-3">
                <span className="type-caption text-ink/35">01</span>
                <span className="type-caption text-navy">Mission</span>
              </div>
              <p className="mt-5 wrap-break-word font-display text-[1.6rem] leading-[1.35] text-ink sm:text-[1.9rem] md:text-[2.1rem] md:leading-[1.3]">
                {about.mission}
              </p>
            </div>
            <div className="min-w-0 md:pt-16">
              <div className="flex items-baseline gap-3">
                <span className="type-caption text-ink/35">02</span>
                <span className="type-caption text-navy">Vision</span>
              </div>
              <p className="type-lead mt-5 wrap-break-word text-ink/70">
                {about.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* leadership — hidden until there are leaders */}
      {leaders.length > 0 && (
        <section className="bg-paper py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <div className="max-w-2xl">
              <p className="type-caption text-tally">Leadership</p>
              <h2 className="type-h2 mt-3 text-ink">
                The team behind the work.
              </h2>
              <p className="type-lead mt-4 text-ink/60">
                The founders, clinicians and coordinators leading every
                outreach.
              </p>
            </div>

            <ul className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
              {leaders.map((m, i) => (
                <li key={`${m.name}-${i}`}>
                  <div className="relative aspect-4/5 overflow-hidden rounded-xl border border-ink/10 bg-ink/3">
                    {m.image ? (
                      <Image
                        src={m.image}
                        alt={m.name ?? "Team member"}
                        fill
                        className="object-cover"
                        sizes="(max-width:768px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="font-display text-4xl text-ink/15">
                          CC
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                    {m.name}
                  </h3>
                  <p className="type-caption mt-1 text-ink/60">{m.role}</p>
                  {m.credential && (
                    <p className="type-caption mt-1 text-tally">
                      {m.credential}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* full team — capped preview with See all */}
      <PeoplePreview people={preview} total={team.length} />

      <Partners partners={partners} />
      <GetInvolved />
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="type-caption text-white/40">{label}</p>
      <p className="type-body mt-1 text-white">{value}</p>
    </div>
  );
}
