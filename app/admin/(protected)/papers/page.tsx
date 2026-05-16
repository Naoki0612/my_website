import { createPaperAction, deletePaperAction } from "@/app/admin/actions";
import { CyberCard } from "@/components/CyberCard";
import { ProgressBar } from "@/components/ProgressBar";
import { getPaperProgress } from "@/lib/contentStore";
import Link from "next/link";

export default function AdminPapersPage() {
  const papers = getPaperProgress();

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-10 lg:grid-cols-[0.95fr_1.05fr] sm:px-6 lg:px-8">
      <section className="cyber-panel neon-border rounded-lg p-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyanNeon">Papers</p>
        <h1 className="mt-4 text-3xl font-black text-white">新增论文进度</h1>
        <form action={createPaperAction} className="mt-6 grid gap-4">
          <input className="admin-input" name="titleZh" placeholder="中文题目" required />
          <input className="admin-input" name="titleEn" placeholder="English title" required />
          <input className="admin-input" name="stage" placeholder="阶段，例如 Literature review" required />
          <input className="admin-input" name="progress" type="number" min="0" max="100" placeholder="进度 0-100" required />
          <input className="admin-input" name="updatedAt" type="date" />
          <textarea className="admin-input min-h-20" name="milestonesZh" placeholder="中文里程碑，用英文逗号分隔" required />
          <textarea className="admin-input min-h-20" name="milestonesEn" placeholder="English milestones, separated by commas" required />
          <button className="cyber-button border border-cyan-300/40 bg-cyan-300/10 px-5 py-3 font-semibold text-cyan-50" type="submit">
            保存论文
          </button>
        </form>
      </section>

      <section className="grid content-start gap-4">
        {papers.map((paper, index) => (
          <CyberCard key={paper.title.en}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-fuchsia-200">{paper.stage}</p>
                <h2 className="mt-2 text-xl font-bold text-white">{paper.title.zh}</h2>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex-1">
                    <ProgressBar value={paper.progress} />
                  </div>
                  <span className="font-mono text-sm text-cyan-100">{paper.progress}%</span>
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <Link className="admin-nav-link" href={`/admin/papers/${index}/edit`}>
                  编辑
                </Link>
                <form action={deletePaperAction}>
                  <input name="title" type="hidden" value={paper.title.en} />
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
