import { createCareerAction, deleteCareerAction } from "@/app/admin/actions";
import { CyberCard } from "@/components/CyberCard";
import { StatusPill } from "@/components/StatusPill";
import { getCareerItems } from "@/lib/contentStore";
import Link from "next/link";

export default function AdminCareerPage() {
  const items = getCareerItems();

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-10 lg:grid-cols-[0.95fr_1.05fr] sm:px-6 lg:px-8">
      <section className="cyber-panel neon-border rounded-lg p-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyanNeon">Career</p>
        <h1 className="mt-4 text-3xl font-black text-white">新增求职进度</h1>
        <form action={createCareerAction} className="mt-6 grid gap-4">
          <input className="admin-input" name="company" placeholder="公司" required />
          <input className="admin-input" name="role" placeholder="岗位" required />
          <input className="admin-input" name="stage" placeholder="阶段，例如 Portfolio review" required />
          <select className="admin-input" name="status" defaultValue="applied">
            <option value="researching">researching</option>
            <option value="applied">applied</option>
            <option value="interviewing">interviewing</option>
            <option value="offer">offer</option>
            <option value="closed">closed</option>
          </select>
          <input className="admin-input" name="updatedAt" type="date" />
          <textarea className="admin-input min-h-20" name="notesZh" placeholder="中文备注" required />
          <textarea className="admin-input min-h-20" name="notesEn" placeholder="English notes" required />
          <button className="cyber-button border border-cyan-300/40 bg-cyan-300/10 px-5 py-3 font-semibold text-cyan-50" type="submit">
            保存进度
          </button>
        </form>
      </section>

      <section className="grid content-start gap-4">
        {items.map((item, index) => (
          <CyberCard key={`${item.company}-${item.role}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-bold text-white">{item.company}</h2>
                  <StatusPill status={item.status} />
                </div>
                <p className="mt-2 text-sm text-cyan-100">{item.role} / {item.stage}</p>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.notes.zh}</p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <Link className="admin-nav-link" href={`/admin/career/${index}/edit`}>
                  编辑
                </Link>
                <form action={deleteCareerAction}>
                  <input name="key" type="hidden" value={`${item.company}-${item.role}`} />
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
