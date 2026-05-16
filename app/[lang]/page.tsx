import Link from "next/link";
import { CyberCard } from "@/components/CyberCard";
import { GuestbookForm } from "@/components/GuestbookForm";
import { ProgressBar } from "@/components/ProgressBar";
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
          <h1
            className="cyber-title glitch-text max-w-4xl text-5xl font-black leading-[0.98] text-white sm:text-6xl lg:text-7xl"
            data-text={copy.home.title}
          >
            {copy.home.title}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-9 text-slate-300">{copy.home.intro}</p>
        </div>

        <div className="cyber-panel neon-border rounded-lg p-4">
          <div className="hud-screen relative aspect-[4/3] overflow-hidden rounded-md border border-cyan-300/20 bg-black/30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(52,245,255,0.2),transparent_34%),linear-gradient(135deg,rgba(255,61,242,0.18),transparent_45%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(52,245,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(52,245,255,0.08)_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute inset-x-8 top-10 h-px bg-cyan-200/70 shadow-[0_0_24px_rgba(52,245,255,0.8)] [animation:pulse-line_3.6s_ease-in-out_infinite]" />
            <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/25 shadow-[0_0_28px_rgba(52,245,255,0.24)]" />
            <div className="hud-ring absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-fuchsia-300/25" />
            <div className="hud-ring-reverse absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/35" />
            <div className="radar-arm absolute left-1/2 top-1/2 h-px w-28 origin-left bg-gradient-to-r from-cyan-200 to-transparent shadow-[0_0_18px_rgba(52,245,255,0.8)]" />
            <div className="absolute bottom-10 left-8 right-8 grid grid-cols-4 gap-3">
              {[72, 38, 86, 54].map((height, index) => (
                <div key={height} className="flex h-44 items-end border border-cyan-300/15 bg-cyan-300/5 p-2">
                  <div
                    className="hud-bar w-full bg-gradient-to-t from-cyanNeon to-fuchsia-300 shadow-[0_0_18px_rgba(52,245,255,0.55)]"
                    style={{ height: `${height}%`, animationDelay: `${index * 0.22}s` }}
                  />
                </div>
              ))}
            </div>
            <div className="absolute left-8 top-16 font-mono text-xs uppercase tracking-[0.24em] text-cyan-100">
              {copy.home.snapshot}
            </div>
            <div className="absolute right-8 top-16 h-24 w-24 rounded-full border border-fuchsia-300/35 shadow-[0_0_28px_rgba(255,61,242,0.35)]">
              <div className="radar-arm-fast absolute left-1/2 top-1/2 h-px w-10 origin-left bg-fuchsia-200" />
            </div>
            <div className="absolute right-8 bottom-8 grid gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-100">
              <span className="border border-cyan-300/25 bg-cyan-300/10 px-2 py-1">live</span>
              <span className="border border-fuchsia-300/25 bg-fuchsia-300/10 px-2 py-1">sync</span>
            </div>
          </div>
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
        <CyberCard>
          <p className="font-mono text-xs uppercase tracking-[0.26em] text-fuchsia-200">{copy.home.profile}</p>
          <p className="mt-4 text-base leading-8 text-slate-300">{copy.home.profileBody}</p>
        </CyberCard>
        <CyberCard className="relative">
          <div className="absolute right-5 top-5 h-16 w-16 rounded-full border border-cyan-300/25 shadow-[0_0_28px_rgba(52,245,255,0.18)]">
            <div className="radar-arm-fast absolute left-1/2 top-1/2 h-px w-7 origin-left bg-cyan-200" />
          </div>
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
              <span className="grid h-7 w-7 place-items-center rounded-full border border-cyan-200/40 bg-cyan-200/10 font-mono text-xs">
                TG
              </span>
              {copy.home.telegram}
            </a>
            <span className="font-mono text-sm text-slate-500">{profile.telegramHandle}</span>
          </div>
        </CyberCard>
      </section>

      <GuestbookForm copy={copy.guestbook} />
    </main>
  );
}
