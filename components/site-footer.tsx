import Link from "next/link";
import { navItems } from "@/lib/nav";
// import { socials as CONTACT, } from "@/lib/mock/about";
import Image from "next/image";
import type { IconType } from "react-icons";
import type { SiteSettings } from "@/sanity/queries";
import { FaInstagram, FaFacebookF, FaXTwitter, FaTiktok, FaLinkedin } from "react-icons/fa6";

const ICONS: Record<string, IconType> = {
  LinkedIn: FaLinkedin,  
  Instagram: FaInstagram,
  Facebook: FaFacebookF,
  X: FaXTwitter,
  TikTok: FaTiktok,
};

export function SiteFooter({ settings }: { settings?: SiteSettings | null }) {
  const email = settings?.email
  const phone = settings?.phone
  const socials = settings?.socials ?? [];

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
          <div>
            <div>
              <Image
                src="/logo/reversed.svg"
                alt="Care Connect GH Foundation"
                width={180}
                height={60}
                className="h-auto w-40 md:w-44"
              />
              <p className="type-lead mt-5 max-w-xs text-white/60">
                Empowering awareness, inspiring wellness.
              </p>
            </div>
            <Link
              href="/contact"
              className="type-label mt-6 inline-flex items-center gap-2 rounded-full bg-tally px-5 py-3 text-ink transition-transform hover:scale-105"
            >
              Get in touch →
            </Link>
          </div>

          {/* explore / nav */}
          <div>
            <p className="type-caption text-white/40">Explore</p>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="type-body text-white/75 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/donate"
                  className="type-body text-tally transition-colors hover:text-white"
                >
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          {/* contact + socials */}
          <div>
            <p className="type-caption text-white/40">Contact</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${email}`}
                  className="type-body break-all text-white/75 hover:text-white"
                >
                  {email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${phone}`}
                  className="type-body text-white/75 hover:text-white"
                >
                  {phone}
                </a>
              </li>
            </ul>

            {socials.length > 0 && (
              <>
                <p className="type-caption mt-8 text-white/40">Follow</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {socials.map((s) => {
                    const Icon = ICONS[s.platform];
                    if (!Icon) return null;
                    return (
                      <li key={s.platform}>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.platform}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-sky hover:bg-sky hover:text-ink"
                        >
                          <Icon size={17} />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        </div>

        {/* baseline */}
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="type-caption text-white/40">
            © {new Date().getFullYear()} Care Connect GH Foundation
          </p>
          <p className="type-caption text-white/40">Kumasi, Ghana</p>
        </div>
      </div>
    </footer>
  );
}