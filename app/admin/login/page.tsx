import { CyberBackground } from "@/components/CyberBackground";
import { loginAction } from "@/app/admin/actions";

export default async function AdminLoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      <CyberBackground />
      <main className="mx-auto grid min-h-screen max-w-6xl place-items-center px-4 py-12">
        <section className="cyber-panel neon-border w-full max-w-md rounded-lg p-6">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyanNeon">Admin Access</p>
          <h1 className="mt-4 text-3xl font-black text-white">登录后台</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">输入管理员账号后，就可以管理博客、软件、求职和论文内容。</p>

          {params.error ? (
            <div className="mt-5 border border-fuchsia-300/30 bg-fuchsia-300/10 px-4 py-3 text-sm text-fuchsia-100">
              账号或密码不正确。
            </div>
          ) : null}

          <form action={loginAction} className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm text-slate-300">
              邮箱
              <input className="admin-input" name="email" type="email" placeholder="admin@naoki.local" required />
            </label>
            <label className="grid gap-2 text-sm text-slate-300">
              密码
              <input className="admin-input" name="password" type="password" placeholder="naoki-admin-2026" required />
            </label>
            <button className="cyber-button border border-cyan-300/40 bg-cyan-300/10 px-5 py-3 font-semibold text-cyan-50" type="submit">
              进入控制台
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
