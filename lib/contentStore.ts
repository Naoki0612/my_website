import fs from "node:fs";
import path from "node:path";
import type { LocalizedText } from "@/lib/i18n";

export type SoftwareProject = {
  name: string;
  summary: LocalizedText;
  status: "prototype" | "building" | "released";
  techStack: string[];
  links: { label: string; href: string }[];
};

export type CareerItem = {
  company: string;
  role: string;
  stage: string;
  status: "researching" | "applied" | "interviewing" | "offer" | "closed";
  updatedAt: string;
  notes: LocalizedText;
};

export type PaperProgress = {
  title: LocalizedText;
  stage: string;
  progress: number;
  updatedAt: string;
  milestones: LocalizedText[];
};

const dataDirectory = path.join(process.cwd(), "content", "data");

function readJson<T>(fileName: string, fallback: T): T {
  const filePath = path.join(dataDirectory, fileName);

  if (!fs.existsSync(filePath)) {
    return fallback;
  }

  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

function writeJson<T>(fileName: string, data: T) {
  fs.mkdirSync(dataDirectory, { recursive: true });
  fs.writeFileSync(path.join(dataDirectory, fileName), `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export function getSoftwareProjects() {
  return readJson<SoftwareProject[]>("software.json", []);
}

export function saveSoftwareProjects(projects: SoftwareProject[]) {
  writeJson("software.json", projects);
}

export function getCareerItems() {
  return readJson<CareerItem[]>("career.json", []);
}

export function saveCareerItems(items: CareerItem[]) {
  writeJson("career.json", items);
}

export function getPaperProgress() {
  return readJson<PaperProgress[]>("papers.json", []);
}

export function savePaperProgress(papers: PaperProgress[]) {
  writeJson("papers.json", papers);
}
