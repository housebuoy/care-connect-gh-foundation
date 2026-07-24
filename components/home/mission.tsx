export function Mission({
  mission,
  vision,
}: {
  mission: string;
  vision: string;
}) {
  return (
    <section className="bg-paper pb-20 md:pb-28">
  <div className="mx-auto max-w-6xl px-5">
    <div className="grid gap-12 border-t border-ink/10 pt-12 md:grid-cols-[1.6fr_1fr] md:gap-16 md:pt-16">
      <div className="min-w-0">
        <div className="flex items-baseline gap-3">
          <span className="type-caption text-ink/35">01</span>
          <span className="type-caption text-navy">Mission</span>
        </div>
        <p className="mt-5 wrap-break-word font-display text-[1.6rem] leading-[1.35] text-ink sm:text-[1.9rem] md:text-[2.1rem] md:leading-[1.3]">
          {mission}
        </p>
      </div>
      <div className="min-w-0 md:pt-16">
        <div className="flex items-baseline gap-3">
          <span className="type-caption text-ink/35">02</span>
          <span className="type-caption text-navy">Vision</span>
        </div>
        <p className="type-lead mt-5 wrap-break-word text-ink/70">
          {vision}
        </p>
      </div>
    </div>
  </div>
</section>
  );
}