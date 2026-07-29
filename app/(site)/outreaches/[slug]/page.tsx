import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NavTheme } from "@/components/nav-theme";
import { getOutreach, getOutreachSlugs } from "@/sanity/queries";
import { Gallery } from "@/components/outreaches/gallery";

export async function generateStaticParams() {
  const slugs = await getOutreachSlugs().catch(() => []);
  return slugs.map((slug) => ({ slug }));
}

export default async function OutreachDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const o = await getOutreach(slug).catch(() => null);
  if (!o) notFound();

  return (
    <>
      <NavTheme theme="ink" />
      <article className="bg-paper pb-24 pt-32 md:pt-40">
        <div className="mx-auto max-w-4xl px-5">
          <Link
            href="/outreaches"
            className="type-caption text-navy/70 hover:underline"
          >
            ← All outreaches
          </Link>

          <p className="type-caption mt-8 text-tally">
            №{String(o.number).padStart(2, "0")} · {o.year}
          </p>
          <h1 className="type-hero mt-3 wrap-break-word text-ink">
            {o.community}
          </h1>
          <p className="type-caption mt-3 text-navy">
            {o.location} · {o.region} Region
          </p>
          <p className="type-lead mt-6 max-w-2xl wrap-break-word text-ink/75">
            {o.summary}
          </p>

          {o.reached && (
            <p className="mt-6">
              <span className="font-display text-3xl font-semibold text-tally">
                {o.reached}+
              </span>{" "}
              <span className="type-caption text-ink/50">people reached</span>
            </p>
          )}

          {o.gallery && o.gallery.length > 0 && (
            <div className="mt-12">
              <Gallery
                images={o.gallery.filter((img) => img.url)}
                community={o.community}
              />
            </div>
          )}
        </div>
      </article>
    </>
  );
}
