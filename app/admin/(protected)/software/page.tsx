import { createSoftwareAction, deleteSoftwareAction } from "@/app/admin/actions";
import { CyberCard } from "@/components/CyberCard";
import { StatusPill } from "@/components/StatusPill";
import { getSoftwareProjects } from "@/lib/contentStore";
import Link from "next/link";

export default function AdminSoftwarePage() {
  const projects = getSoftwareProjects();

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-10 lg:grid-cols-[0.95fr_1.05fr] sm:px-6 lg:px-8">
      <section className="cyber-panel neon-border rounded-lg p-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyanNeon">Software</p>
        <h1 className="mt-4 text-3xl font-black text-white">新增软件</h1>
        <form action={createSoftwareAction} className="mt-6 grid gap-4">
          <input className="admin-input" name="name" placeholder="项目名称" required />
          <textarea className="admin-input min-h-20" name="summaryZh" placeholder="中文简介" required />
          <textarea className="admin-input min-h-20" name="summaryEn" placeholder="English summary" required />
          <select className="admin-input" name="status" defaultValue="building">
            <option value="prototype">prototype</option>
            <option value="building">building</option>
            <option value="released">released</option>
          </select>
          <input className="admin-input" name="techStack" placeholder="技术栈，用英文逗号分隔" />
          <input className="admin-input" name="linkLabel" placeholder="链接名称，例如 Demo" />
          <input className="admin-input" name="linkHref" placeholder="链接地址，例如 https://..." />
          <button className="cyber-button border border-cyan-300/40 bg-cyan-300/10 px-5 py-3 font-semibold text-cyan-50" type="submit">
            保存软件
          </button>
        </form>
      </section>

      <section className="grid content-start gap-4">
        {projects.map((project, index) => (
          <CyberCard key={project.name}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-bold text-white">{project.name}</h2>
                  <StatusPill status={project.status} />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-400">{project.summary.zh}</p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <Link className="admin-nav-link" href={`/admin/software/${index}/edit`}>
                  编辑
                </Link>
                <form action={deleteSoftwareAction}>
                  <input name="name" type="hidden" value={project.name} />
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
