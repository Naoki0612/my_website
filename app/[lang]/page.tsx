import Link from "next/link";
import { CyberCard } from "@/components/CyberCard";
import { GuestbookForm } from "@/components/GuestbookForm";
import { LocalNewsPanel } from "@/components/LocalNewsPanel";
import { ProgressBar } from "@/components/ProgressBar";
import { RotatingHello } from "@/components/RotatingHello";
import { StatusPill } from "@/components/StatusPill";
import { getCareerItems } from "@/data/career";
import { getPaperProgress } from "@/data/papers";
import { profile } from "@/data/profile";
import { getSoftwareProjects } from "@/data/software";
import { getAllPosts } from "@/lib/markdown";
import { dictionary, isLocale, t, type Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function HomePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang: rawLang } = await params;
  const lang = isLocale(rawLang) ? rawLang : "zh";
  const copy = dictionary[lang];
  const posts = getAllPosts();
  const softwareProjects = getSoftwareProjects();
  const careerItems = getCareerItems();
  const paperProgress = getPaperProgress();
  const latestPost = posts[0];
  const latestPaper = paperProgress[0];
  const latestCareer = careerItems[0];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid min-h-[calc(100vh-8rem)] items-center gap-10 py-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.34em] text-cyanNeon">{copy.home.eyebrow}</p>
          <RotatingHello />
          <p className="mt-7 max-w-2xl text-lg leading-9 text-slate-300">{copy.home.intro}</p>
        </div>

        <div className="cyber-panel neon-border rounded-lg p-4">
          <LocalNewsPanel
            title={copy.home.snapshot}
            fallbackLocation={copy.home.newsFallbackLocation}
            loadingLabel={copy.home.newsLoading}
            emptyLabel={copy.home.newsEmpty}
          />
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Link href={latestPost ? `/${lang}/blog/${latestPost.slug}` : `/${lang}/blog`} className="block h-full rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyanNeon">
          <CyberCard className="h-full cursor-pointer">
            <p className="font-mono text-xs uppercase tracking-[0.26em] text-cyanNeon">{copy.home.blog}</p>
            <h2 className="mt-4 text-xl font-bold text-white">{latestPost ? t(latestPost.title, lang) : "No posts yet"}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">{latestPost ? t(latestPost.description, lang) : ""}</p>
          </CyberCard>
        </Link>
        <Link href={`/${lang}/software`} className="block h-full rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyanNeon">
          <CyberCard className="h-full cursor-pointer">
            <p className="font-mono text-xs uppercase tracking-[0.26em] text-cyanNeon">{copy.home.software}</p>
            <h2 className="mt-4 text-xl font-bold text-white">{softwareProjects[0]?.name || "No software yet"}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">{softwareProjects[0] ? t(softwareProjects[0].summary, lang) : ""}</p>
            {softwareProjects[0] ? <div className="mt-4"><StatusPill status={softwareProjects[0].status} /></div> : null}
          </CyberCard>
        </Link>
        <Link href={`/${lang}/career`} className="block h-full rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyanNeon">
          <CyberCard className="h-full cursor-pointer">
            <p className="font-mono text-xs uppercase tracking-[0.26em] text-cyanNeon">{copy.home.career}</p>
            <h2 className="mt-4 text-xl font-bold text-white">{latestCareer?.company || "No career items yet"}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">{latestCareer ? `${latestCareer.role} / ${latestCareer.stage}` : ""}</p>
            {latestCareer ? <div className="mt-4"><StatusPill status={latestCareer.status} /></div> : null}
          </CyberCard>
        </Link>
        <Link href={`/${lang}/papers`} className="block h-full rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyanNeon">
          <CyberCard className="h-full cursor-pointer">
            <p className="font-mono text-xs uppercase tracking-[0.26em] text-cyanNeon">{copy.home.papers}</p>
            <h2 className="mt-4 text-xl font-bold text-white">{latestPaper ? t(latestPaper.title, lang) : "No papers yet"}</h2>
            {latestPaper ? <div className="mt-5"><ProgressBar value={latestPaper.progress} /></div> : null}
          </CyberCard>
        </Link>
      </section>

      <section className="mt-16 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <GuestbookForm copy={copy.guestbook} />
        <CyberCard className="relative">
          <img
            src="/avatar.jpg"
            alt="Naoki avatar"
            className="absolute right-5 top-5 h-20 w-20 rounded-full border border-cyan-300/35 object-cover object-center shadow-[0_0_28px_rgba(52,245,255,0.22)]"
          />
          <p className="font-mono text-xs uppercase tracking-[0.26em] text-cyanNeon">{copy.home.contact}</p>
          <h2 className="mt-4 text-3xl font-black text-white">{profile.name}</h2>
          <p className="mt-2 font-mono text-sm text-fuchsia-100">{t(profile.role, lang)}</p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">{t(profile.bio, lang)}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="border border-cyan-300/15 bg-cyan-300/5 p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">{copy.home.location}</p>
              <p className="mt-2 text-sm text-cyan-100">{t(profile.location, lang)}</p>
            </div>
            <div className="border border-fuchsia-300/15 bg-fuchsia-300/5 p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500">{copy.home.email}</p>
              <a href={`mailto:${profile.email}`} className="mt-2 block text-sm text-fuchsia-100 hover:text-white">
                {profile.email}
              </a>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={profile.telegramUrl}
              target="_blank"
              rel="noreferrer"
              className="cyber-button inline-flex items-center gap-3 border border-cyan-200/50 bg-cyan-300/10 px-5 py-3 text-sm font-semibold text-cyan-50 shadow-neon transition hover:bg-cyan-300/20"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full border border-cyan-200/40 bg-cyan-200/10 text-cyan-100">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21.9 4.6 18.7 19.7c-.2 1-.8 1.2-1.6.8l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2l-11 6.9-4.7-1.5c-1-.3-1-1 .2-1.4L20.5 3.5c.9-.3 1.7.2 1.4 1.1Z" />
                </svg>
              </span>
              {copy.home.telegram}
            </a>
            <span className="font-mono text-sm text-slate-500">{profile.telegramHandle}</span>
          </div>
        </CyberCard>
      </section>
    </main>
  );
}
