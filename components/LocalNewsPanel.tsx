"use client";

import { useEffect, useState } from "react";

type NewsItem = {
  title: string;
  source: string;
  url: string;
};

type NewsResponse = {
  location: string;
  items: NewsItem[];
};

const fallbackItems: NewsItem[] = [
  {
    title: "本地新闻连接准备中",
    source: "NAOKI.OS",
    url: "#"
  },
  {
    title: "配置新闻源后，这里会按访问者所在地区轮播热点",
    source: "LOCAL FEED",
    url: "#"
  },
  {
    title: "页面会自动保留可读内容，不会因为接口失败而空白",
    source: "SYSTEM",
    url: "#"
  }
];

export function LocalNewsPanel({
  title,
  fallbackLocation,
  loadingLabel,
  emptyLabel
}: {
  title: string;
  fallbackLocation: string;
  loadingLabel: string;
  emptyLabel: string;
}) {
  const [data, setData] = useState<NewsResponse>({
    location: fallbackLocation,
    items: fallbackItems
  });
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetch("/api/local-news")
      .then((response) => response.json() as Promise<NewsResponse>)
      .then((payload) => {
        if (!mounted) return;
        setData({
          location: payload.location || fallbackLocation,
          items: payload.items?.length ? payload.items : fallbackItems
        });
      })
      .catch(() => {
        if (mounted) {
          setData({ location: fallbackLocation, items: fallbackItems });
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [fallbackLocation]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % data.items.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [data.items.length]);

  const item = data.items[active] ?? fallbackItems[0];
  const content = loading ? loadingLabel : item.title || emptyLabel;

  return (
    <div className="local-news-panel hud-screen relative aspect-[4/3] overflow-hidden rounded-md border border-cyan-300/20 bg-black/30 p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_22%,rgba(52,245,255,0.18),transparent_30%),radial-gradient(circle_at_82%_82%,rgba(166,255,77,0.14),transparent_30%),linear-gradient(135deg,rgba(255,61,242,0.16),transparent_48%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(52,245,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(52,245,255,0.08)_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-x-8 top-10 h-px bg-cyan-200/70 shadow-[0_0_24px_rgba(52,245,255,0.8)] [animation:pulse-line_3.6s_ease-in-out_infinite]" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-100">{title}</p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.24em] text-fuchsia-100">{data.location}</p>
          </div>
          <span className="border border-cyan-300/25 bg-cyan-300/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-100">
            live
          </span>
        </div>

        <a
          href={item.url || "#"}
          target={item.url && item.url !== "#" ? "_blank" : undefined}
          rel="noreferrer"
          className="group block"
        >
          <h2 className="news-headline text-3xl font-black leading-tight text-white transition group-hover:text-cyanNeon sm:text-4xl">
            {content}
          </h2>
          <p className="mt-5 font-mono text-xs uppercase tracking-[0.24em] text-slate-300">{item.source}</p>
        </a>

        <div className="grid grid-cols-3 gap-2">
          {data.items.slice(0, 3).map((newsItem, index) => (
            <button
              key={`${newsItem.title}-${index}`}
              type="button"
              className={`h-1 rounded-full transition ${index === active ? "bg-cyanNeon shadow-neon" : "bg-cyan-300/20"}`}
              aria-label={`Show news ${index + 1}`}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
