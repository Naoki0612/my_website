import { notFound } from "next/navigation";
import { CyberBackground } from "@/components/CyberBackground";
import { Nav } from "@/components/Nav";
import { isLocale, type Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  return (
    <>
      <CyberBackground />
      <Nav locale={lang as Locale} />
      {children}
      <footer className="mx-auto max-w-7xl px-4 pb-10 pt-16 text-sm text-slate-500 sm:px-6 lg:px-8">
        <div className="border-t border-cyan-300/10 pt-6 font-mono">Naoki.OS / 2026 / file-based signal archive</div>
      </footer>
    </>
  );
}
