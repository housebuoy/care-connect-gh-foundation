import { getHealthTopics, getArticles } from "@/sanity/queries";
import { NavTheme } from "@/components/nav-theme";
import { GetInvolved } from "@/components/home/get-involved";
import { TopicCard } from "@/components/health/topic-card";
import { ArticleRow } from "@/components/health/article-row";

export const metadata = {
  title: "Health · Care Connect GH Foundation",
  description:
    "Plain-language guides on hypertension, diabetes, cholera and the conditions we screen and teach for.",
};

export default async function HealthPage() {
  const [topics, articles] = await Promise.all([
    getHealthTopics().catch(() => []),
    getArticles().catch(() => []),
  ]);

  return (
    <>
      <NavTheme theme="ink" />

      <section className="bg-paper pt-32 md:pt-40">
        <div className="mx-auto max-w-6xl px-5">
          <p className="type-caption text-tally">Health education</p>
          <h1 className="type-hero mt-3 max-w-3xl text-ink">
            Learn to stay ahead of it.
          </h1>
          <p className="type-lead mt-5 max-w-xl text-ink/60">
            Plain-language guides on the conditions we screen and teach for —
            reviewed by the clinicians who run our outreaches.
          </p>
        </div>
      </section>

      {/* evergreen topics */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          {topics.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-3 md:gap-10">
              {topics.map((t) => <TopicCard key={t.slug} topic={t} />)}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-ink/15 py-20 text-center">
              <p className="type-lead text-ink/45">
                Health guides are being written and reviewed. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* dated updates — only if any exist */}
      {articles.length > 0 && (
        <section className="bg-paper pb-24 md:pb-28">
          <div className="mx-auto max-w-6xl px-5">
            <div className="flex items-baseline gap-4 border-b-2 border-tally/50 pb-3">
              <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">
                Latest updates
              </h2>
            </div>
            <ul className="divide-y divide-ink/[0.07]">
              {articles.map((a) => <ArticleRow key={a.slug} article={a} />)}
            </ul>
          </div>
        </section>
      )}

      <GetInvolved />
    </>
  );
}