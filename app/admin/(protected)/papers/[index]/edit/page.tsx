import Link from "next/link";
import { notFound } from "next/navigation";
import { updatePaperAction } from "@/app/admin/actions";
import { getPaperProgress } from "@/lib/contentStore";

export default async function EditPaperPage({ params }: { params: Promise<{ index: string }> }) {
  const { index: rawIndex } = await params;
  const index = Number(rawIndex);
  const paper = getPaperProgress()[index];

  if (!paper) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/admin/papers" className="font-mono text-sm text-cyanNeon">
        返回论文管理
      </Link>
      <section className="cyber-panel neon-border mt-6 rounded-lg p-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyanNeon">Edit Papers</p>
        <h1 className="mt-4 text-3xl font-black text-white">编辑论文进度</h1>
        <form action={updatePaperAction} className="mt-6 grid gap-4">
          <input name="index" type="hidden" value={index} />
          <input className="admin-input" name="titleZh" defaultValue={paper.title.zh} placeholder="中文题目" required />
          <input className="admin-input" name="titleEn" defaultValue={paper.title.en} placeholder="English title" required />
          <input className="admin-input" name="stage" defaultValue={paper.stage} placeholder="阶段，例如 Literature review" required />
          <input className="admin-input" name="progress" type="number" min="0" max="100" defaultValue={paper.progress} placeholder="进度 0-100" required />
          <input className="admin-input" name="updatedAt" type="date" defaultValue={paper.updatedAt} />
          <textarea className="admin-input min-h-20" name="milestonesZh" defaultValue={paper.milestones.map((item) => item.zh).join(", ")} placeholder="中文里程碑，用英文逗号分隔" required />
          <textarea className="admin-input min-h-20" name="milestonesEn" defaultValue={paper.milestones.map((item) => item.en).join(", ")} placeholder="English milestones, separated by commas" required />
          <button className="cyber-button border border-cyan-300/40 bg-cyan-300/10 px-5 py-3 font-semibold text-cyan-50" type="submit">
            保存修改
          </button>
        </form>
      </section>
    </main>
  );
}
