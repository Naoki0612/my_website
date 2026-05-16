import fs from "node:fs";
import path from "node:path";
import type { LocalizedText } from "@/lib/i18n";

export type BlogPost = {
  slug: string;
  date: string;
  tags: string[];
  title: LocalizedText;
  description: LocalizedText;
  content: string;
};

const blogDirectory = path.join(process.cwd(), "content", "blog");

function assignNested(target: Record<string, unknown>, dottedKey: string, value: unknown) {
  const parts = dottedKey.split(".");
  let current = target;

  parts.forEach((part, index) => {
    if (index === parts.length - 1) {
      current[part] = value;
      return;
    }

    if (!current[part] || typeof current[part] !== "object") {
      current[part] = {};
    }
    current = current[part] as Record<string, unknown>;
  });
}

function parseValue(value: string) {
  const trimmed = value.trim();

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }

  return trimmed.replace(/^["']|["']$/g, "");
}

function parseFrontmatter(file: string) {
  const match = file.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!match) {
    throw new Error("Blog post is missing frontmatter.");
  }

  const [, frontmatter, content] = match;
  const data: Record<string, unknown> = {};

  frontmatter.split("\n").forEach((line) => {
    const divider = line.indexOf(":");
    if (divider === -1) return;
    const key = line.slice(0, divider).trim();
    const value = line.slice(divider + 1);
    assignNested(data, key, parseValue(value));
  });

  return { data, content };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  return fs
    .readdirSync(blogDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(blogDirectory, file), "utf8");
      const { data, content } = parseFrontmatter(raw);

      return {
        slug: String(data.slug || file.replace(/\.md$/, "")),
        date: String(data.date || ""),
        tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
        title: data.title as LocalizedText,
        description: data.description as LocalizedText,
        content
      };
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPost(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}
