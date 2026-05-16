export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 overflow-hidden rounded-full border border-cyan-300/20 bg-black/35">
      <div
        className="h-full rounded-full bg-gradient-to-r from-cyanNeon via-fuchsia-300 to-acid shadow-[0_0_18px_rgba(52,245,255,0.5)]"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
