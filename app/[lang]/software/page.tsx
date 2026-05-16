import { CyberCard } from "@/components/CyberCard";
import { SectionHeader } from "@/components/SectionHeader";
import { StatusPill } from "@/components/StatusPill";
import { getSoftwareProjects } from "@/data/software";
import { dictionary, t, type Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function SoftwarePage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const copy = dictionary[lang];
  const softwareProjects = getSoftwareProjects();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader title={copy.pages.softwareTitle} lead={copy.pages.softwareLead} eyebrow="Build Archive" />
      <div className="grid gap-5 lg:grid-cols-3">
        {softwareProjects.map((project) => (
          <CyberCard key={project.name}>
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-bold text-white">{project.name}</h2>
              <StatusPill status={project.status} />
            </div>
            <p className="mt-4 leading-7 text-slate-400">{t(project.summary, lang)}</p>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.24em] text-cyan-100">{copy.common.tech}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="border border-cyan-300/15 bg-cyan-300/5 px-2.5 py-1 text-sm text-slate-200">{tech}</span>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              {project.links.map((link) => (
                <a key={link.label} href={link.href} className="text-sm text-cyanNeon hover:text-white">{link.label}</a>
              ))}
            </div>
          </CyberCard>
        ))}
      </div>
    </main>
  );
}
