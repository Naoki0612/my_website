import { CyberCard } from "@/components/CyberCard";
import { ProgressBar } from "@/components/ProgressBar";
import { SectionHeader } from "@/components/SectionHeader";
import { getPaperProgress } from "@/data/papers";
import { dictionary, t, type Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function PapersPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const copy = dictionary[lang];
  const paperProgress = getPaperProgress();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader title={copy.pages.papersTitle} lead={copy.pages.papersLead} eyebrow="Research Pulse" />
      <div className="grid gap-5 lg:grid-cols-2">
        {paperProgress.map((paper) => (
          <CyberCard key={paper.title.en}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-fuchsia-200">{paper.stage}</p>
              <p className="font-mono text-sm text-slate-400">{copy.common.updated}: {paper.updatedAt}</p>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-white">{t(paper.title, lang)}</h2>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex-1"><ProgressBar value={paper.progress} /></div>
              <span className="font-mono text-cyan-100">{paper.progress}%</span>
            </div>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.24em] text-cyan-100">{copy.common.milestones}</p>
            <ul className="mt-3 space-y-3">
              {paper.milestones.map((milestone) => (
                <li key={milestone.en} className="border-l border-cyan-300/35 pl-4 text-slate-300">{t(milestone, lang)}</li>
              ))}
            </ul>
          </CyberCard>
        ))}
      </div>
    </main>
  );
}
