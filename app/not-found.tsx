import Link from "next/link";
import { NavThemeProvider } from "@/components/nav-theme";
import { NavTheme } from "@/components/nav-theme";
import { SiteNav } from "@/components/site-nav"; // <-- Adjust to your actual import
import { SiteFooter } from "@/components/site-footer";
export default function NotFound() {
  return (
    <>
      <NavThemeProvider>
        <SiteNav />
        <NavTheme theme="ink" />
        <section className="flex min-h-[70svh] items-center bg-paper">
          <div className="mx-auto max-w-6xl px-5">
            <p className="type-caption text-tally">404</p>
            <h1 className="type-hero mt-3 text-ink">
              We couldn&rsquo;t find that page.
            </h1>
            <p className="type-lead mt-5 max-w-md text-ink/60">
              It may have moved, or the link might be broken. Here&rsquo;s the
              way back.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                className="type-label rounded-full bg-tally px-6 py-3 text-ink transition-transform hover:scale-105"
              >
                Back home
              </Link>
              <Link
                href="/outreaches"
                className="type-label rounded-full border border-ink/20 px-6 py-3 text-ink transition-colors hover:bg-ink/3"
              >
                See our outreaches
              </Link>
            </div>
          </div>
        </section>
        <SiteFooter />
      </NavThemeProvider>
    </>
  );
}
