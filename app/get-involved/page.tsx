import Image from "next/image";
import Link from "next/link";
import { NavTheme } from "@/components/nav-theme";
import { InvolveForm } from "@/components/get-involved/involve-form";
import { ways, roles } from "@/lib/mock/get-involved";
import { CONTACT } from "@/lib/mock/about";
import { Suspense } from "react";

export const metadata = {
  title: "Get involved · Care Connect GH Foundation",
  description:
    "Volunteer at an outreach, partner with us, or fund the work of Care Connect GH Foundation.",
};

const whatsapp = `https://wa.me/233${CONTACT.phone.replace(/^0/, "")}`;

export default function GetInvolvedPage() {
  return (
    <>
      <NavTheme theme="ink" />

      {/* why — the opening argument */}
      <section className="bg-paper pt-32 md:pt-40">
        <div className="mx-auto max-w-6xl px-5">
          <p className="type-caption text-tally">Get involved</p>
          <h1 className="type-hero mt-3 max-w-3xl text-ink">
            An outreach only happens if people make it happen.
          </h1>
          <div className="mt-8 grid gap-8 md:grid-cols-[1.4fr_1fr] md:gap-16">
            <p className="type-lead text-ink/70">
              Most people we meet only about hypertension or diabetes after a
              diagnosis. Changing that means turning up — in schools, markets
              and communities, with people to take readings, explain results and
              answer questions, and with the supplies to do it properly. Past
              outreaches have happened that way. The next one needs the same
              three things.
            </p>
            <p className="type-lead text-ink/50">
              Time, partnership, or funding — any of the three moves the work
              forward.
            </p>
          </div>
        </div>
      </section>

      {/* the three ways */}
      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-8 md:grid-cols-3">
            {ways.map((w) => (
              <div key={w.id} className="flex flex-col">
                <div className="relative aspect-4/3 overflow-hidden rounded-xl border border-ink/10 bg-ink/3">
                  {w.image ? (
                    <Image
                      src={w.image}
                      alt={w.title}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 30vw"
                    />
                  ) : (
                    <div className="h-full w-full bg-linear-to-br from-sky/20 to-navy/10" />
                  )}
                </div>
                <p className="type-caption mt-5 text-tally">{w.eyebrow}</p>
                <h2 className="mt-2 font-display text-xl font-semibold text-ink">
                  {w.title}
                </h2>
                <p className="type-body mt-2 text-ink/65">{w.body}</p>

<Link
  href={w.href}
  className="type-caption mt-4 inline-flex items-center gap-1.5 text-navy underline-offset-4 hover:underline"
>
  {w.cta} <span aria-hidden>→</span>
</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* volunteer roles */}
      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="type-caption text-ink/40">What volunteers do</p>
          <div className="mt-6 divide-y divide-ink/10 border-t border-ink/10">
            {roles.map((r) => (
              <div
                key={r.id}
                className="grid items-start gap-4 py-7 md:grid-cols-[8rem_16rem_1fr] md:gap-10"
              >
                <div className="relative aspect-square w-28 overflow-hidden rounded-xl border border-ink/10 bg-ink/3 md:w-full">
                  {r.image && (
                    <Image
                      src={r.image}
                      alt={r.title}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  )}
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {r.title}
                  </h3>
                  {r.needsTraining && (
                    <span className="type-caption mt-2 inline-block rounded-full border border-tally/40 px-2.5 py-0.5 text-tally">
                      Training required
                    </span>
                  )}
                </div>
                <p className="type-lead text-ink/65">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* form + direct contact */}
      <section className="bg-paper pb-20 md:pb-28">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1.5fr_1fr] md:gap-14">
          <div>
            <h2 className="type-h2 text-ink">Tell us about yourself.</h2>
            <p className="type-lead mt-3 text-ink/60">
              Volunteering or partnering — pick one and we&rsquo;ll take it from
              there.
            </p>
            <div className="mt-8" id="form">
              <Suspense
                fallback={
                  <div className="h-96 rounded-2xl border border-ink/10 bg-white" />
                }
              >
                <InvolveForm />
              </Suspense>
            </div>
          </div>

          <div className="md:pt-28">
            <div className="rounded-2xl border border-ink/10 p-6 md:p-7">
              <p className="type-caption text-tally">Rather just message?</p>
              <p className="type-body mt-3 text-ink/70">
                We usually reply fastest on WhatsApp.
              </p>
              <div className="mt-6 space-y-3">
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-label flex w-full items-center justify-center rounded-full bg-ink px-5 py-3 text-white transition-transform hover:scale-[1.02]"
                >
                  WhatsApp us
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="type-caption block break-all text-navy hover:underline"
                >
                  {CONTACT.email}
                </a>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="type-caption block text-navy hover:underline"
                >
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
