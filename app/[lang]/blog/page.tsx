import Link from "next/link";
import { CyberCard } from "@/components/CyberCard";
import { SectionHeader } from "@/components/SectionHeader";
import { dictionary, t, type Locale } from "@/lib/i18n";
import { getAllPosts } from "@/lib/markdown";

export const dynamic = "force-dynamic";

export default async function BlogPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const copy = dictionary[lang];
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeader title={copy.pages.blogTitle} lead={copy.pages.blogLead} eyebrow="Markdown Log" />
      <div className="grid gap-5 lg:grid-cols-2">
        {posts.map((post) => (
          <CyberCard key={post.slug}>
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-slate-400">
              <time>{post.date}</time>
              {post.tags.map((tag) => (
                <span key={tag} className="border border-cyan-300/20 px-2 py-1 text-cyan-100">{tag}</span>
              ))}
            </div>
            <h2 className="mt-5 text-2xl font-bold text-white">{t(post.title, lang)}</h2>
            <p className="mt-3 leading-7 text-slate-400">{t(post.description, lang)}</p>
            <Link href={`/${lang}/blog/${post.slug}`} className="mt-6 inline-flex border border-cyan-300/35 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-300/10">
              {copy.common.readMore}
            </Link>
          </CyberCard>
        ))}
      </div>
    </main>
  );
}
