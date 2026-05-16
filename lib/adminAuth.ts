import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieName = "naoki_admin";

function secret() {
  return process.env.ADMIN_SECRET || "local-dev-secret-change-before-deploy";
}

function adminEmail() {
  return process.env.ADMIN_EMAIL || "admin@naoki.local";
}

function adminPassword() {
  return process.env.ADMIN_PASSWORD || "naoki-admin-2026";
}

function sign(value: string) {
  return crypto.createHmac("sha256", secret()).update(value).digest("hex");
}

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);

  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function verifyAdminLogin(email: string, password: string) {
  if (process.env.NODE_ENV === "production" && (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD || !process.env.ADMIN_SECRET)) {
    return false;
  }

  return safeEqual(email, adminEmail()) && safeEqual(password, adminPassword());
}

export async function createAdminSession() {
  const value = `admin.${Date.now()}`;
  const token = `${value}.${sign(value)}`;
  const cookieStore = await cookies();

  cookieStore.set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

export async function isAdminLoggedIn() {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName)?.value;
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const value = `${parts[0]}.${parts[1]}`;
  const signature = parts[2];

  return safeEqual(signature, sign(value));
}

export async function requireAdmin() {
  if (!(await isAdminLoggedIn())) {
    redirect("/admin/login");
  }
}
