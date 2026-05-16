"use server";

import fs from "node:fs";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearAdminSession, createAdminSession, requireAdmin, verifyAdminLogin } from "@/lib/adminAuth";
import {
  getCareerItems,
  getPaperProgress,
  getSoftwareProjects,
  saveCareerItems,
  savePaperProgress,
  saveSoftwareProjects,
  type CareerItem,
  type PaperProgress,
  type SoftwareProject
} from "@/lib/contentStore";

const blogDirectory = path.join(process.cwd(), "content", "blog");

function field(formData: FormData, name: string) {
  return String(formData.get(name) || "").trim();
}

function list(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function refreshPublicPages() {
  ["/zh", "/en", "/zh/blog", "/en/blog", "/zh/software", "/en/software", "/zh/career", "/en/career", "/zh/papers", "/en/papers"].forEach((url) => {
    revalidatePath(url);
  });
}

function blogMarkdownFromForm(formData: FormData, slug: string) {
  const tags = list(field(formData, "tags"));
  const date = field(formData, "date") || new Date().toISOString().slice(0, 10);

  return `---\nslug: ${slug}\ndate: ${date}\ntags: [${tags.map((tag) => `"${tag}"`).join(", ")}]\ntitle.zh: "${field(formData, "titleZh")}"\ntitle.en: "${field(formData, "titleEn")}"\ndescription.zh: "${field(formData, "descriptionZh")}"\ndescription.en: "${field(formData, "descriptionEn")}"\n---\n${field(formData, "content")}\n`;
}

export async function loginAction(formData: FormData) {
  const email = field(formData, "email");
  const password = field(formData, "password");

  if (!(await verifyAdminLogin(email, password))) {
    redirect("/admin/login?error=1");
  }

  await createAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function createBlogAction(formData: FormData) {
  await requireAdmin();

  const slug = slugify(field(formData, "slug") || field(formData, "titleZh"));
  if (!slug) return;

  fs.mkdirSync(blogDirectory, { recursive: true });
  fs.writeFileSync(path.join(blogDirectory, `${slug}.md`), blogMarkdownFromForm(formData, slug), "utf8");
  refreshPublicPages();
  redirect("/admin/blog");
}

export async function updateBlogAction(formData: FormData) {
  await requireAdmin();

  const originalSlug = slugify(field(formData, "originalSlug"));
  const slug = slugify(field(formData, "slug") || field(formData, "titleZh"));
  if (!originalSlug || !slug) return;

  const originalPath = path.join(blogDirectory, `${originalSlug}.md`);
  const nextPath = path.join(blogDirectory, `${slug}.md`);

  if (originalSlug !== slug && fs.existsSync(originalPath)) {
    fs.unlinkSync(originalPath);
  }

  fs.mkdirSync(blogDirectory, { recursive: true });
  fs.writeFileSync(nextPath, blogMarkdownFromForm(formData, slug), "utf8");
  refreshPublicPages();
  redirect("/admin/blog");
}

export async function deleteBlogAction(formData: FormData) {
  await requireAdmin();

  const slug = slugify(field(formData, "slug"));
  const filePath = path.join(blogDirectory, `${slug}.md`);
  if (slug && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  refreshPublicPages();
  redirect("/admin/blog");
}

export async function createSoftwareAction(formData: FormData) {
  await requireAdmin();

  const project: SoftwareProject = {
    name: field(formData, "name"),
    summary: { zh: field(formData, "summaryZh"), en: field(formData, "summaryEn") },
    status: field(formData, "status") as SoftwareProject["status"],
    techStack: list(field(formData, "techStack")),
    links: [{ label: field(formData, "linkLabel") || "Link", href: field(formData, "linkHref") || "#" }]
  };

  saveSoftwareProjects([project, ...getSoftwareProjects()]);
  refreshPublicPages();
  redirect("/admin/software");
}

export async function updateSoftwareAction(formData: FormData) {
  await requireAdmin();

  const index = Number(field(formData, "index"));
  const project: SoftwareProject = {
    name: field(formData, "name"),
    summary: { zh: field(formData, "summaryZh"), en: field(formData, "summaryEn") },
    status: field(formData, "status") as SoftwareProject["status"],
    techStack: list(field(formData, "techStack")),
    links: [{ label: field(formData, "linkLabel") || "Link", href: field(formData, "linkHref") || "#" }]
  };
  const projects = getSoftwareProjects();

  if (Number.isInteger(index) && projects[index]) {
    projects[index] = project;
    saveSoftwareProjects(projects);
  }

  refreshPublicPages();
  redirect("/admin/software");
}

export async function deleteSoftwareAction(formData: FormData) {
  await requireAdmin();
  const name = field(formData, "name");
  saveSoftwareProjects(getSoftwareProjects().filter((item) => item.name !== name));
  refreshPublicPages();
  redirect("/admin/software");
}

export async function createCareerAction(formData: FormData) {
  await requireAdmin();

  const item: CareerItem = {
    company: field(formData, "company"),
    role: field(formData, "role"),
    stage: field(formData, "stage"),
    status: field(formData, "status") as CareerItem["status"],
    updatedAt: field(formData, "updatedAt") || new Date().toISOString().slice(0, 10),
    notes: { zh: field(formData, "notesZh"), en: field(formData, "notesEn") }
  };

  saveCareerItems([item, ...getCareerItems()]);
  refreshPublicPages();
  redirect("/admin/career");
}

export async function updateCareerAction(formData: FormData) {
  await requireAdmin();

  const index = Number(field(formData, "index"));
  const item: CareerItem = {
    company: field(formData, "company"),
    role: field(formData, "role"),
    stage: field(formData, "stage"),
    status: field(formData, "status") as CareerItem["status"],
    updatedAt: field(formData, "updatedAt") || new Date().toISOString().slice(0, 10),
    notes: { zh: field(formData, "notesZh"), en: field(formData, "notesEn") }
  };
  const items = getCareerItems();

  if (Number.isInteger(index) && items[index]) {
    items[index] = item;
    saveCareerItems(items);
  }

  refreshPublicPages();
  redirect("/admin/career");
}

export async function deleteCareerAction(formData: FormData) {
  await requireAdmin();
  const key = field(formData, "key");
  saveCareerItems(getCareerItems().filter((item) => `${item.company}-${item.role}` !== key));
  refreshPublicPages();
  redirect("/admin/career");
}

export async function createPaperAction(formData: FormData) {
  await requireAdmin();

  const paper: PaperProgress = {
    title: { zh: field(formData, "titleZh"), en: field(formData, "titleEn") },
    stage: field(formData, "stage"),
    progress: Number(field(formData, "progress") || 0),
    updatedAt: field(formData, "updatedAt") || new Date().toISOString().slice(0, 10),
    milestones: list(field(formData, "milestonesZh")).map((zh, index) => ({
      zh,
      en: list(field(formData, "milestonesEn"))[index] || zh
    }))
  };

  savePaperProgress([paper, ...getPaperProgress()]);
  refreshPublicPages();
  redirect("/admin/papers");
}

export async function updatePaperAction(formData: FormData) {
  await requireAdmin();

  const index = Number(field(formData, "index"));
  const zhMilestones = list(field(formData, "milestonesZh"));
  const enMilestones = list(field(formData, "milestonesEn"));
  const paper: PaperProgress = {
    title: { zh: field(formData, "titleZh"), en: field(formData, "titleEn") },
    stage: field(formData, "stage"),
    progress: Number(field(formData, "progress") || 0),
    updatedAt: field(formData, "updatedAt") || new Date().toISOString().slice(0, 10),
    milestones: zhMilestones.map((zh, milestoneIndex) => ({
      zh,
      en: enMilestones[milestoneIndex] || zh
    }))
  };
  const papers = getPaperProgress();

  if (Number.isInteger(index) && papers[index]) {
    papers[index] = paper;
    savePaperProgress(papers);
  }

  refreshPublicPages();
  redirect("/admin/papers");
}

export async function deletePaperAction(formData: FormData) {
  await requireAdmin();
  const title = field(formData, "title");
  savePaperProgress(getPaperProgress().filter((paper) => paper.title.en !== title));
  refreshPublicPages();
  redirect("/admin/papers");
}
