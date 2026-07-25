import Link from "next/link";
import type { Article } from "@/lib/mock/articles";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function ArticleRow({ article }: { article: Article }) {
  return (
    <li>
      <Link
        href={`/health/updates/${article.slug}`}
        className="grid gap-2 py-6 transition-colors hover:bg-ink/[0.02] md:grid-cols-[9rem_1fr] md:gap-8 md:py-7"
      >
        <span className="type-caption text-ink/40 md:pt-1">
          {formatDate(article.date)}
        </span>
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">
            {article.title}
          </h3>
          <p className="type-body mt-2 max-w-2xl text-ink/65">
            {article.excerpt}
          </p>
        </div>
      </Link>
    </li>
  );
}