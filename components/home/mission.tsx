export function Mission() {
  return (
    <section className="bg-paper py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-5">
        {/* section marker */}
        <p className="type-caption text-tally">Our purpose</p>

        {/* asymmetric two-column on desktop; stacked on mobile */}
        <div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-[1.6fr_1fr] md:gap-16 lg:gap-24">
          {/* MISSION — dominant */}
          <div>
            <div className="flex items-baseline gap-3">
              <span className="type-caption text-ink/35">01</span>
              <span className="type-caption text-navy">Mission</span>
            </div>
            <p className="mt-5 font-display text-[1.6rem] leading-[1.35] text-ink sm:text-[1.9rem] md:text-[2.1rem] md:leading-[1.3]">
              To deliver comprehensive health education, vital resources, and
              engaging community interventions that enable individuals to make{" "}
              <span className="text-navy italic">informed choices</span> and take
              proactive steps toward lifelong health and well-being.
            </p>
          </div>

          {/* VISION — quieter, sits lower */}
          <div className="md:pt-16">
            <div className="flex items-baseline gap-3">
              <span className="type-caption text-ink/35">02</span>
              <span className="type-caption text-navy">Vision</span>
            </div>
            <p className="mt-5 type-lead text-ink/70">
              To empower communities through transformative health education and
              proactive wellness initiatives, fostering a world where every
              individual is informed, engaged, and fully equipped to lead a
              healthier life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}