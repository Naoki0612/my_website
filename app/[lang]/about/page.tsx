import { CyberCard } from "@/components/CyberCard";
import { SectionHeader } from "@/components/SectionHeader";
import { dictionary, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function AboutPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const copy = dictionary[lang];
  const isZh = lang === "zh";

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader title={copy.pages.aboutTitle} lead={copy.pages.aboutLead} eyebrow="Profile" />
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <CyberCard>
          <div className="aspect-square border border-cyan-300/20 bg-[radial-gradient(circle_at_50%_40%,rgba(52,245,255,0.28),transparent_34%),linear-gradient(145deg,rgba(255,61,242,0.16),rgba(6,7,15,0.8))] p-6">
            <div className="flex h-full flex-col justify-between border border-cyan-300/15 p-5">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyanNeon">Identity Card</p>
              <div>
                <h2 className="text-4xl font-black text-white">Naoki</h2>
                <p className="mt-2 font-mono text-sm text-fuchsia-100">Research / Engineering / Product</p>
              </div>
            </div>
          </div>
        </CyberCard>
        <CyberCard>
          <p className="text-lg leading-9 text-slate-300">
            {isZh
              ? "我把这个网站当作一个持续更新的个人操作系统：记录我正在写的文章、正在做的软件、正在推进的求职计划，以及论文研究的阶段性进度。"
              : "I treat this website as a living personal operating system: a place to track essays, software, career motion, and research progress in one public interface."}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              isZh ? "AI 工具" : "AI Tools",
              isZh ? "界面工程" : "Interface Engineering",
              isZh ? "研究写作" : "Research Writing"
            ].map((skill) => (
              <div key={skill} className="border border-cyan-300/15 bg-cyan-300/5 p-4">
                <p className="font-mono text-sm text-cyan-100">{skill}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-cyan-300/10 pt-6 font-mono text-sm text-slate-400">
            Email: hello@example.com / GitHub: github.com/example / X: @example
          </div>
        </CyberCard>
      </div>
    </main>
  );
}
