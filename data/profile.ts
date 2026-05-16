import type { LocalizedText } from "@/lib/i18n";

export const profile = {
  name: "Naoki",
  role: {
    zh: "AI 工具 / 系统设计 / 研究写作",
    en: "AI Tools / System Design / Research Writing"
  } satisfies LocalizedText,
  location: {
    zh: "日本 / 远程协作",
    en: "Japan / Remote-friendly"
  } satisfies LocalizedText,
  email: "ysbnaoki@gmail.com",
  telegramUrl: "https://t.me/naoki0612",
  telegramHandle: "@naoki0612",
  bio: {
    zh: "我关注把研究、软件和职业进展组织成可持续迭代的个人系统。如果你对 AI 工具、产品原型、论文协作或机会交流感兴趣，可以直接联系我。",
    en: "I focus on turning research, software, and career momentum into a personal system that can keep evolving. Reach out for AI tooling, product prototypes, research collaboration, or career opportunities."
  } satisfies LocalizedText
};
