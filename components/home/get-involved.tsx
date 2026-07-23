import Image from "next/image";
import Link from "next/link";

export function GetInvolved() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2 md:gap-16">
        {/* image — real action shot, framed */}
        <div className="relative order-2 md:order-1">
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <Image
              src="/images/home/get-involved/2E3A0569.jpg"
              alt="A Care Connect nurse screening a community member"
              fill
              quality={90}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
          {/* small tally accent block behind, breaks the clean edge */}
          <div className="absolute -bottom-4 -left-4 -z-10 h-32 w-32 rounded-2xl bg-tally/20 md:-bottom-6 md:-left-6" />
        </div>

        {/* copy + the two asks */}
        <div className="order-1 md:order-2">
          <p className="type-caption text-tally">Get involved</p>

          <h2 className="type-h2 mt-4 text-ink">
            The work runs on <span className="text-navy italic">people like you.</span>
          </h2>

          <p className="type-lead mt-5 max-w-md text-ink/70">
            Every outreach needs hands and funding — volunteers to screen and
            teach on the day, and support to cover test strips, transport and
            supplies. Both make the next community possible.
          </p>

          {/* two distinct paths, not one */}
          <div className="mt-8 space-y-3">
            <Link
              href="/donate"
              className="group flex items-center justify-between rounded-xl bg-tally px-5 py-4 text-ink transition-transform hover:scale-[1.02]"
            >
              <span>
                <span className="type-label block">Donate</span>
                <span className="type-caption mt-1 block text-ink/70 normal-case tracking-normal">
                  Fund strips, transport and supplies
                </span>
              </span>
              <span className="text-xl">→</span>
            </Link>

            <Link
              href="/get-involved"
              className="group flex items-center justify-between rounded-xl border border-ink/15 px-5 py-4 text-ink transition-colors hover:bg-ink/[0.03]"
            >
              <span>
                <span className="type-label block text-navy">Volunteer</span>
                <span className="type-caption mt-1 block text-ink/60 normal-case tracking-normal">
                  Join a screening team in the field
                </span>
              </span>
              <span className="text-xl text-navy">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}