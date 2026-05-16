import Link from "next/link";
import { notFound } from "next/navigation";
import { dictionary, t, type Locale } from "@/lib/i18n";
import { getPost } from "@/lib/markdown";
import { renderMarkdown } from "@/lib/renderMarkdown";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale; slug: string }> }) {
  const { lang, slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${t(post.title, lang)} / Naoki.OS`,
    description: t(post.description, lang)
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ lang: Locale; slug: string }> }) {
  const { lang, slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Link href={`/${lang}/blog`} className="font-mono text-sm text-cyanNeon">← {dictionary[lang].nav.blog}</Link>
      <article className="prose-cyber mt-8">
        <div className="mb-8 border-b border-cyan-300/15 pb-8">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-fuchsia-200">{post.date}</p>
          <h1>{t(post.title, lang)}</h1>
          <p className="text-lg leading-8 text-slate-300">{t(post.description, lang)}</p>
        </div>
        {renderMarkdown(post.content)}
      </article>
    </main>
  );
}
