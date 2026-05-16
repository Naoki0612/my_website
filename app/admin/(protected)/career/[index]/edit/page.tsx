import Link from "next/link";
import { notFound } from "next/navigation";
import { updateCareerAction } from "@/app/admin/actions";
import { getCareerItems } from "@/lib/contentStore";

export default async function EditCareerPage({ params }: { params: Promise<{ index: string }> }) {
  const { index: rawIndex } = await params;
  const index = Number(rawIndex);
  const item = getCareerItems()[index];

  if (!item) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/admin/career" className="font-mono text-sm text-cyanNeon">
        返回求职管理
      </Link>
      <section className="cyber-panel neon-border mt-6 rounded-lg p-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyanNeon">Edit Career</p>
        <h1 className="mt-4 text-3xl font-black text-white">编辑求职进度</h1>
        <form action={updateCareerAction} className="mt-6 grid gap-4">
          <input name="index" type="hidden" value={index} />
          <input className="admin-input" name="company" defaultValue={item.company} placeholder="公司" required />
          <input className="admin-input" name="role" defaultValue={item.role} placeholder="岗位" required />
          <input className="admin-input" name="stage" defaultValue={item.stage} placeholder="阶段，例如 Portfolio review" required />
          <select className="admin-input" name="status" defaultValue={item.status}>
            <option value="researching">researching</option>
            <option value="applied">applied</option>
            <option value="interviewing">interviewing</option>
            <option value="offer">offer</option>
            <option value="closed">closed</option>
          </select>
          <input className="admin-input" name="updatedAt" type="date" defaultValue={item.updatedAt} />
          <textarea className="admin-input min-h-20" name="notesZh" defaultValue={item.notes.zh} placeholder="中文备注" required />
          <textarea className="admin-input min-h-20" name="notesEn" defaultValue={item.notes.en} placeholder="English notes" required />
          <button className="cyber-button border border-cyan-300/40 bg-cyan-300/10 px-5 py-3 font-semibold text-cyan-50" type="submit">
            保存修改
          </button>
        </form>
      </section>
    </main>
  );
}
