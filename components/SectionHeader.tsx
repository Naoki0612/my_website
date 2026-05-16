export function SectionHeader({
  eyebrow,
  title,
  lead
}: {
  eyebrow?: string;
  title: string;
  lead: string;
}) {
  return (
    <div className="mb-10 max-w-3xl">
      {eyebrow ? <p className="mb-3 font-mono text-xs uppercase tracking-[0.32em] text-cyanNeon">{eyebrow}</p> : null}
      <h1 className="cyber-title text-4xl font-black leading-tight text-white sm:text-5xl">{title}</h1>
      <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">{lead}</p>
    </div>
  );
}
