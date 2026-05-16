import { createBlogAction, deleteBlogAction } from "@/app/admin/actions";
import { CyberCard } from "@/components/CyberCard";
import { getAllPosts } from "@/lib/markdown";
import Link from "next/link";

export default function AdminBlogPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-10 lg:grid-cols-[0.95fr_1.05fr] sm:px-6 lg:px-8">
      <section className="cyber-panel neon-border rounded-lg p-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyanNeon">Markdown</p>
        <h1 className="mt-4 text-3xl font-black text-white">新增博客</h1>
        <form action={createBlogAction} className="mt-6 grid gap-4">
          <input className="admin-input" name="titleZh" placeholder="中文标题" required />
          <input className="admin-input" name="titleEn" placeholder="English title" required />
          <input className="admin-input" name="slug" placeholder="slug，例如 my-new-post" required />
          <input className="admin-input" name="date" type="date" />
          <input className="admin-input" name="tags" placeholder="标签，用英文逗号分隔，例如 AI, Next.js" />
          <textarea className="admin-input min-h-20" name="descriptionZh" placeholder="中文摘要" required />
          <textarea className="admin-input min-h-20" name="descriptionEn" placeholder="English description" required />
          <textarea className="admin-input min-h-56 font-mono" name="content" placeholder="Markdown 正文" required />
          <button className="cyber-button border border-cyan-300/40 bg-cyan-300/10 px-5 py-3 font-semibold text-cyan-50" type="submit">
            保存博客
          </button>
        </form>
      </section>

      <section className="grid content-start gap-4">
        {posts.map((post) => (
          <CyberCard key={post.slug}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs text-slate-500">{post.date}</p>
                <h2 className="mt-2 text-xl font-bold text-white">{post.title.zh}</h2>
                <p className="mt-2 text-sm text-slate-400">{post.slug}</p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <Link className="admin-nav-link" href={`/admin/blog/${post.slug}/edit`}>
                  编辑
                </Link>
                <form action={deleteBlogAction}>
                  <input name="slug" type="hidden" value={post.slug} />
                  <button className="admin-danger-button" type="submit">
                    删除
                  </button>
                </form>
              </div>
            </div>
          </CyberCard>
        ))}
      </section>
    </main>
  );
}
