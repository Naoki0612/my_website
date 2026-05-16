import Link from "next/link";
import { notFound } from "next/navigation";
import { updateBlogAction } from "@/app/admin/actions";
import { getPost } from "@/lib/markdown";

export default async function EditBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/admin/blog" className="font-mono text-sm text-cyanNeon">
        返回博客管理
      </Link>
      <section className="cyber-panel neon-border mt-6 rounded-lg p-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyanNeon">Edit Markdown</p>
        <h1 className="mt-4 text-3xl font-black text-white">编辑博客</h1>
        <form action={updateBlogAction} className="mt-6 grid gap-4">
          <input name="originalSlug" type="hidden" value={post.slug} />
          <input className="admin-input" name="titleZh" defaultValue={post.title.zh} placeholder="中文标题" required />
          <input className="admin-input" name="titleEn" defaultValue={post.title.en} placeholder="English title" required />
          <input className="admin-input" name="slug" defaultValue={post.slug} placeholder="slug，例如 my-new-post" required />
          <input className="admin-input" name="date" type="date" defaultValue={post.date} />
          <input className="admin-input" name="tags" defaultValue={post.tags.join(", ")} placeholder="标签，用英文逗号分隔" />
          <textarea className="admin-input min-h-20" name="descriptionZh" defaultValue={post.description.zh} placeholder="中文摘要" required />
          <textarea className="admin-input min-h-20" name="descriptionEn" defaultValue={post.description.en} placeholder="English description" required />
          <textarea className="admin-input min-h-80 font-mono" name="content" defaultValue={post.content.trim()} placeholder="Markdown 正文" required />
          <button className="cyber-button border border-cyan-300/40 bg-cyan-300/10 px-5 py-3 font-semibold text-cyan-50" type="submit">
            保存修改
          </button>
        </form>
      </section>
    </main>
  );
}
