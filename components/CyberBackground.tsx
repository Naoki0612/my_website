"use client";

const particles = Array.from({ length: 36 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  delay: `${(index % 9) * -0.7}s`,
  duration: `${9 + (index % 7)}s`,
  size: `${2 + (index % 4)}px`
}));

export function CyberBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 cyber-grid" />
      <div className="absolute left-[calc(50%-19rem)] top-20 h-[38rem] w-[38rem] rounded-full border border-cyan-300/20 opacity-70 blur-sm [animation:ring-breathe_8s_ease-in-out_infinite]" />
      <div className="absolute left-[calc(50%-13rem)] top-20 h-[26rem] w-[26rem] rounded-full border border-fuchsia-300/15 opacity-60 [animation:ring-breathe_6s_ease-in-out_infinite_reverse]" />
      <div className="absolute left-[7%] top-32 h-72 w-px rotate-12 bg-cyan-300/30 shadow-[0_0_32px_rgba(52,245,255,0.45)] [animation:signal-drop_5.6s_ease-in-out_infinite]" />
      <div className="absolute right-[10%] top-44 h-96 w-px -rotate-12 bg-fuchsia-300/24 shadow-[0_0_32px_rgba(255,61,242,0.38)] [animation:signal-drop_6.8s_ease-in-out_infinite_reverse]" />
      <div className="absolute bottom-20 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent [animation:pulse-line_5s_ease-in-out_infinite]" />
      <div className="absolute left-0 top-1/3 h-px w-full bg-gradient-to-r from-transparent via-fuchsia-300/25 to-transparent [animation:data-sweep_8s_ease-in-out_infinite]" />
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="cyber-particle"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
              animationDuration: particle.duration
            }}
          />
        ))}
      </div>
    </div>
  );
}
