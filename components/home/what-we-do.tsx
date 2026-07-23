const services = [
  {
    label: "Screening",
    body: "Blood pressure, blood sugar and BMI, measured by trained hands. Results explained in plain terms, and anyone who needs follow-up care is referred — not left guessing.",
  },
  {
    label: "Education",
    body: "Group talks and one-on-one sessions on hypertension, diabetes and cholera: how they start, how to spot them early, and the everyday habits that keep them at bay.",
  },
  {
    label: "Support",
    body: "Basic supplies where we can, and a direct line to nearby clinics. So an outreach is the beginning of care, not a one-day event.",
  },
];

export function WhatWeDo() {
  return (
    <section className="bg-paper py-20 text-ink md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        {/* header — no glowing accent word */}
        <div className="max-w-3xl">
          <p className="type-caption text-tally">At every outreach</p>
          <h2 className="type-h2 mt-4 text-ink">
            More than a screening table.
          </h2>
          <p className="type-lead mt-4 max-w-xl text-ink/60">
            Every outreach brings care directly to the community. Three things that
            happen together, wherever we set up
          </p>
        </div>

        {/* services as a stacked list, not a card grid */}
        <div className="mt-14 divide-y divide-ink/10 border-t border-ink/10">
          {services.map((s, i) => (
            <div
              key={s.label}
              className="grid gap-4 py-8 md:grid-cols-[auto_1fr] md:gap-12 md:py-10"
            >
              <div className="flex items-baseline gap-4 md:w-64">
                <span className="type-caption text-tally">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl font-semibold text-inkmd:text-3xl">
                  {s.label}
                </h3>
              </div>
              <p className="type-lead max-w-2xl text-ink/70">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}