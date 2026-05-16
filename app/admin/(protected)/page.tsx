import Link from "next/link";
import { CyberCard } from "@/components/CyberCard";
import { getAllPosts } from "@/lib/markdown";
import { getCareerItems, getPaperProgress, getSoftwareProjects } from "@/lib/contentStore";

const panels = [
  { href: "/admin/blog", label: "博客", hint: "新增 Markdown 文章" },
  { href: "/admin/software", label: "软件", hint: "记录项目状态和链接" },
  { href: "/admin/career", label: "求职", hint: "维护岗位与面试进度" },
  { href: "/admin/papers", label: "论文", hint: "更新论文阶段和里程碑" }
];

export default function AdminHomePage() {
  const stats = [
    { label: "博客", value: getAllPosts().length },
    { label: "软件", value: getSoftwareProjects().length },
    { label: "求职", value: getCareerItems().length },
    { label: "论文", value: getPaperProgress().length }
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="cyber-panel neon-border rounded-lg p-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyanNeon">Control Center</p>
        <h1 className="mt-4 text-4xl font-black text-white">内容管理后台</h1>
        <p className="mt-3 max-w-2xl leading-7 text-slate-400">
          这里是第一版小后台。你可以先用表单新增内容，也可以删除旧内容；以后再升级成完整编辑器和数据库。
        </p>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <CyberCard key={stat.label}>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-500">{stat.label}</p>
            <p className="mt-3 text-4xl font-black text-white">{stat.value}</p>
          </CyberCard>
        ))}
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {panels.map((panel) => (
          <Link key={panel.href} href={panel.href} className="block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyanNeon">
            <CyberCard className="h-full cursor-pointer">
              <h2 className="text-2xl font-bold text-white">{panel.label}</h2>
              <p className="mt-3 text-slate-400">{panel.hint}</p>
            </CyberCard>
          </Link>
        ))}
      </section>
    </main>
  );
}
