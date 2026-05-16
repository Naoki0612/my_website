import { CyberCard } from "@/components/CyberCard";
import { SectionHeader } from "@/components/SectionHeader";
import { StatusPill } from "@/components/StatusPill";
import { getCareerItems } from "@/data/career";
import { dictionary, t, type Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function CareerPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const copy = dictionary[lang];
  const careerItems = getCareerItems();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader title={copy.pages.careerTitle} lead={copy.pages.careerLead} eyebrow="Career Radar" />
      <div className="grid gap-4">
        {careerItems.map((item) => (
          <CyberCard key={`${item.company}-${item.role}`}>
            <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-bold text-white">{item.company}</h2>
                  <StatusPill status={item.status} />
                </div>
                <p className="mt-2 text-cyan-100">{item.role} / {item.stage}</p>
                <p className="mt-4 leading-7 text-slate-400">{t(item.notes, lang)}</p>
              </div>
              <div className="font-mono text-sm text-slate-400">
                {copy.common.updated}: <span className="text-cyan-100">{item.updatedAt}</span>
              </div>
            </div>
          </CyberCard>
        ))}
      </div>
    </main>
  );
}
