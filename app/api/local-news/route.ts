import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const fallbackNews = [
  {
    title: "当地热点新闻正在连接中",
    source: "NAOKI.OS",
    url: "#"
  },
  {
    title: "如果外部新闻源暂时不可用，页面会继续显示备用轮播",
    source: "SYSTEM",
    url: "#"
  },
  {
    title: "部署到线上后，系统会用访问者 IP 估算所在地区",
    source: "LOCAL FEED",
    url: "#"
  }
];

const countryLanguage: Record<string, string> = {
  CN: "zh-CN",
  HK: "zh-HK",
  TW: "zh-TW",
  JP: "ja",
  KR: "ko",
  US: "en-US",
  GB: "en-GB",
  FR: "fr",
  DE: "de",
  IT: "it",
  ES: "es",
  PT: "pt",
  BR: "pt-BR"
};

type SerpApiNewsItem = {
  title?: string;
  link?: string;
  source?: string | { name?: string };
};

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  return forwardedFor || realIp || "";
}

function cleanText(value: string) {
  return value
    .replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}

function getSourceName(source: SerpApiNewsItem["source"]) {
  if (typeof source === "string") return source;
  return source?.name || "Google News";
}

function normalizeSerpApiItems(items: SerpApiNewsItem[] = []) {
  return items
    .slice(0, 5)
    .map((item) => ({
      title: cleanText(item.title || ""),
      source: cleanText(getSourceName(item.source)),
      url: item.link || "#"
    }))
    .filter((item) => item.title);
}

async function fetchJson(url: string, timeoutMs = 2200) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { accept: "application/json" },
      cache: "no-store"
    });

    if (!response.ok) return null;
    return response.json();
  } finally {
    clearTimeout(timer);
  }
}

export async function GET(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    const apiKey = process.env.SERPAPI_API_KEY;
    const geo = ip ? await fetchJson(`https://ipapi.co/${ip}/json/`) : null;
    const country = typeof geo?.country_code === "string" ? geo.country_code.toUpperCase() : "JP";
    const city = typeof geo?.city === "string" ? geo.city : "";
    const region = typeof geo?.region === "string" ? geo.region : "";
    const language = countryLanguage[country] || "en-US";
    const location = [city, region, country].filter(Boolean).join(" / ") || "当地";
    const query = city ? `${city} local news` : "Japan top news";

    if (!apiKey) {
      return NextResponse.json({
        location,
        items: fallbackNews
      });
    }

    const serpApiUrl = new URL("https://serpapi.com/search.json");

    serpApiUrl.searchParams.set("engine", "google_news");
    serpApiUrl.searchParams.set("q", query);
    serpApiUrl.searchParams.set("gl", country.toLowerCase());
    serpApiUrl.searchParams.set("hl", language);
    serpApiUrl.searchParams.set("api_key", apiKey);

    const results = await fetchJson(serpApiUrl.toString(), 4200);
    const items = normalizeSerpApiItems(results?.news_results);

    return NextResponse.json({
      location,
      items: items.length ? items : fallbackNews
    });
  } catch {
    return NextResponse.json({
      location: "当地",
      items: fallbackNews
    });
  }
}
