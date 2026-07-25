import Image from "next/image";
import Link from "next/link";
import type { HealthTopic } from "@/lib/mock/articles";

export function TopicCard({ topic }: { topic: HealthTopic }) {
  return (
    <Link href={`/health/${topic.slug}`} className="group block">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-ink/10 bg-ink/[0.03]">
        {topic.image ? (
          <Image
            src={topic.image}
            alt={topic.alt ?? topic.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 30vw"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-sky/25 to-navy/15" />
        )}
        <span className="type-caption absolute left-3 top-3 rounded-full bg-paper/90 px-3 py-1 text-navy backdrop-blur">
          {topic.condition}
        </span>
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold text-ink transition-colors group-hover:text-navy">
        {topic.title}
      </h3>
      <p className="type-body mt-2 text-ink/60">{topic.excerpt}</p>

      {topic.reviewedBy && (
        <p className="type-caption mt-3 text-tally">
          Reviewed by {topic.reviewedBy.name}
          {topic.reviewedBy.credential ? `, ${topic.reviewedBy.credential}` : ""}
        </p>
      )}
    </Link>
  );
}