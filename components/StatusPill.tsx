const toneByStatus: Record<string, string> = {
  prototype: "border-fuchsia-300/40 bg-fuchsia-300/10 text-fuchsia-100",
  building: "border-cyan-300/40 bg-cyan-300/10 text-cyan-100",
  released: "border-lime-300/40 bg-lime-300/10 text-lime-100",
  researching: "border-slate-300/30 bg-slate-300/10 text-slate-100",
  applied: "border-cyan-300/40 bg-cyan-300/10 text-cyan-100",
  interviewing: "border-fuchsia-300/40 bg-fuchsia-300/10 text-fuchsia-100",
  offer: "border-lime-300/40 bg-lime-300/10 text-lime-100",
  closed: "border-red-300/40 bg-red-300/10 text-red-100"
};

export function StatusPill({ status }: { status: string }) {
  return (
    <span className={`inline-flex border px-2.5 py-1 font-mono text-xs uppercase ${toneByStatus[status] || toneByStatus.researching}`}>
      {status}
    </span>
  );
}
