import Link from "next/link";
import { notFound } from "next/navigation";
import { updateSoftwareAction } from "@/app/admin/actions";
import { getSoftwareProjects } from "@/lib/contentStore";

export default async function EditSoftwarePage({ params }: { params: Promise<{ index: string }> }) {
  const { index: rawIndex } = await params;
  const index = Number(rawIndex);
  const project = getSoftwareProjects()[index];

  if (!project) {
    notFound();
  }

  const firstLink = project.links[0];

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/admin/software" className="font-mono text-sm text-cyanNeon">
        返回软件管理
      </Link>
      <section className="cyber-panel neon-border mt-6 rounded-lg p-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyanNeon">Edit Software</p>
        <h1 className="mt-4 text-3xl font-black text-white">编辑软件</h1>
        <form action={updateSoftwareAction} className="mt-6 grid gap-4">
          <input name="index" type="hidden" value={index} />
          <input className="admin-input" name="name" defaultValue={project.name} placeholder="项目名称" required />
          <textarea className="admin-input min-h-20" name="summaryZh" defaultValue={project.summary.zh} placeholder="中文简介" required />
          <textarea className="admin-input min-h-20" name="summaryEn" defaultValue={project.summary.en} placeholder="English summary" required />
          <select className="admin-input" name="status" defaultValue={project.status}>
            <option value="prototype">prototype</option>
            <option value="building">building</option>
            <option value="released">released</option>
          </select>
          <input className="admin-input" name="techStack" defaultValue={project.techStack.join(", ")} placeholder="技术栈，用英文逗号分隔" />
          <input className="admin-input" name="linkLabel" defaultValue={firstLink?.label || ""} placeholder="链接名称，例如 Demo" />
          <input className="admin-input" name="linkHref" defaultValue={firstLink?.href || ""} placeholder="链接地址，例如 https://..." />
          <button className="cyber-button border border-cyan-300/40 bg-cyan-300/10 px-5 py-3 font-semibold text-cyan-50" type="submit">
            保存修改
          </button>
        </form>
      </section>
    </main>
  );
}
