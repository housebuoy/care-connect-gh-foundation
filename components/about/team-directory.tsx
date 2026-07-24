"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar } from "@/components/about/avatar";
import { NavTheme } from "@/components/nav-theme";
import type { TeamMember } from "@/lib/mock/about";

export function TeamDirectory({ people = [] }: { people?: TeamMember[] }) {
  const [q, setQ] = useState("");

  const query = q.trim().toLowerCase();
  const filtered = query
    ? people.filter(
        (m) =>
          (m.name ?? "").toLowerCase().includes(query) ||
          (m.role ?? "").toLowerCase().includes(query),
      )
    : people;

  return (
    <>
      <NavTheme theme="ink" />
      <section className="bg-paper pb-24 pt-32 md:pt-40">
        <div className="mx-auto max-w-6xl px-5">
          <p className="type-caption text-tally">Our team</p>
          <h1 className="type-hero mt-3 text-ink">Everyone behind the work.</h1>
          <p className="type-lead mt-4 max-w-xl text-ink/60">
            The founders, clinicians, organisers and volunteers who make every
            outreach possible.
          </p>

          {/* search + CTA */}
          <div className="mt-10 flex flex-wrap items-center gap-4 border-y border-ink/10 py-5">
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name or role…"
              aria-label="Search team members"
              className="type-body min-w-56 flex-1 rounded-full border border-ink/15 bg-white px-5 py-3 text-ink outline-none placeholder:text-ink/40 focus:border-navy/40"
            />
            <span className="type-caption text-ink/40">
              {filtered.length} {filtered.length === 1 ? "person" : "people"}
            </span>
            <Link
              href="/get-involved?as=volunteer#form"
              className="type-label rounded-full bg-tally px-5 py-3 text-ink transition-transform hover:scale-105"
            >
              Volunteer with us →
            </Link>
          </div>

          {people.length === 0 ? (
            <p className="type-lead mt-16 text-center text-ink/40">
              Team profiles are being added.
            </p>
          ) : filtered.length > 0 ? (
            <ul className="mt-12 grid grid-cols-4 gap-x-4 gap-y-8 sm:grid-cols-6 md:grid-cols-8">
              {filtered.map((p, i) => (
                <li key={`${p.name}-${i}`}>
                  <Avatar person={p} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="type-lead mt-16 text-center text-ink/40">
              No one matches “{q}”.
            </p>
          )}
        </div>
      </section>
    </>
  );
}