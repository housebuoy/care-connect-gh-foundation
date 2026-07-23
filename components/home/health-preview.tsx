import Image from "next/image";
import Link from "next/link";
import { articles, formatArticleDate, type Article } from "@/lib/mock/articles";

export function HealthPreview() {
  // No articles yet → don't render an empty "Read our latest" with nothing under it.
  if (articles.length === 0) return null;

  const recent = articles.slice(0, 3);
  const [lead, ...rest] = recent;

  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        {/* header */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="type-caption text-tally">Health education</p>
            <h2 className="type-h2 mt-3 text-ink">Learn to stay ahead of it.</h2>
          </div>
          <Link
            href="/health"
            className="type-caption text-navy/70 underline-offset-4 hover:text-navy hover:underline"
          >
            All articles →
          </Link>
        </div>

        {/* lead + secondary — asymmetric, not even thirds */}
        <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-10">
          <ArticleCard article={lead} lead />
          <div className="flex flex-col gap-8">
            {rest.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ArticleCard({ article, lead = false }: { article: Article; lead?: boolean }) {
  return (
    <Link href={`/health/${article.slug}`} className="group block">
      <div
        className={`relative overflow-hidden rounded-xl border border-ink/10 ${
          lead ? "aspect-[4/3]" : "aspect-[16/9]"
        }`}
      >
        {article.image ? (
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes={lead ? "(max-width:768px) 100vw, 45vw" : "(max-width:768px) 100vw, 40vw"}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-sky/25 to-navy/15" />
        )}
        {/* condition tag on the image */}
        <span className="type-caption absolute left-3 top-3 rounded-full bg-paper/90 px-3 py-1 text-navy backdrop-blur">
          {article.condition}
        </span>
      </div>

      <div className="mt-4">
        {/* <div className="flex items-center gap-3">
          <span className="type-caption text-ink/40">{formatArticleDate(article.date)}</span>
          {article.reviewedBy && (
            <span className="type-caption text-tally">· {article.reviewedBy}</span>
          )}
        </div> */}
        <h3
          className={`mt-2 font-display font-semibold text-ink transition-colors group-hover:text-navy ${
            lead ? "text-2xl" : "text-lg"
          }`}
        >
          {article.title}
        </h3>
        {lead && (
          <p className="type-body mt-2 max-w-md text-ink/60">{article.excerpt}</p>
        )}
      </div>
    </Link>
  );
}