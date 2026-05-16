import Link from "next/link";
import { CyberBackground } from "@/components/CyberBackground";
import { logoutAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/adminAuth";

const adminLinks = [
  { href: "/admin", label: "总览" },
  { href: "/admin/blog", label: "博客" },
  { href: "/admin/software", label: "软件" },
  { href: "/admin/career", label: "求职" },
  { href: "/admin/papers", label: "论文" }
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <>
      <CyberBackground />
      <header className="sticky top-0 z-30 border-b border-cyan-300/10 bg-[#06070f]/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/admin" className="font-mono text-lg uppercase tracking-[0.28em] text-white">
            Naoki Admin
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            {adminLinks.map((link) => (
              <Link key={link.href} href={link.href} className="admin-nav-link">
                {link.label}
              </Link>
            ))}
            <Link href="/zh" className="admin-nav-link text-cyan-100">
              看网站
            </Link>
            <form action={logoutAction}>
              <button className="admin-nav-link text-fuchsia-100" type="submit">
                退出
              </button>
            </form>
          </div>
        </nav>
      </header>
      {children}
    </>
  );
}
