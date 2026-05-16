export type Locale = "zh" | "en";

export type LocalizedText = {
  zh: string;
  en: string;
};

export const locales: Locale[] = ["zh", "en"];

export function isLocale(value: string): value is Locale {
  return value === "zh" || value === "en";
}

export function t(text: LocalizedText, locale: Locale) {
  return text[locale] || text.zh;
}

export const dictionary = {
  zh: {
    nav: {
      home: "首页",
      blog: "博客",
      software: "软件",
      career: "求职",
      papers: "论文",
      about: "关于"
    },
    common: {
      latest: "最新信号",
      readMore: "读取详情",
      updated: "更新",
      status: "状态",
      tech: "技术栈",
      links: "链接",
      progress: "进度",
      milestones: "里程碑",
      all: "全部"
    },
    home: {
      eyebrow: "NAOKI / PERSONAL OPERATING SYSTEM",
      title: "你好！",
      intro: "楽しまずして何の人生ぞや。",
      primaryCta: "查看软件",
      secondaryCta: "阅读博客",
      snapshot: "当地热点",
      profile: "个人协议",
      profileBody: "我关注 AI 工具、系统设计、研究写作和把想法做成可用产品。这个网站会作为公开日志，记录从概念到交付的过程。",
      contact: "个人信息 / 联系方式",
      location: "位置",
      email: "邮箱",
      telegram: "Telegram 快速聊天",
      blog: "最新博客",
      software: "自制软件",
      career: "求职",
      papers: "论文",
      newsFallbackLocation: "当地",
      newsLoading: "正在读取热点新闻",
      newsEmpty: "暂时没有读取到当地热点新闻"
    },
    guestbook: {
      eyebrow: "GUESTBOOK / 留言入口",
      title: "给我留一句话。",
      lead: "感谢留言，我会及时与您联系！",
      nickname: "昵称",
      contact: "联系方式",
      message: "留言",
      submit: "发送留言",
      submitting: "发送中...",
      success: "已保存，谢谢你的留言。",
      error: "留言暂时没有保存成功，请稍后再试。"
    },
    pages: {
      blogTitle: "博客",
      blogLead: "研究笔记、开发日志和阶段复盘，用 Markdown 文件持续更新。",
      softwareTitle: "自制软件",
      softwareLead: "一些正在构建或打磨中的工具、实验和产品原型。",
      careerTitle: "求职进度",
      careerLead: "把申请、面试和反馈记录成清晰的时间线。",
      papersTitle: "论文进度",
      papersLead: "跟踪选题、阅读、实验、写作和投稿阶段。",
      aboutTitle: "关于我",
      aboutLead: "一个面向研究、工程和产品的个人资料页。"
    }
  },
  en: {
    nav: {
      home: "Home",
      blog: "Blog",
      software: "Software",
      career: "Career",
      papers: "Papers",
      about: "About"
    },
    common: {
      latest: "Latest Signals",
      readMore: "Read More",
      updated: "Updated",
      status: "Status",
      tech: "Tech Stack",
      links: "Links",
      progress: "Progress",
      milestones: "Milestones",
      all: "All"
    },
    home: {
      eyebrow: "NAOKI / PERSONAL OPERATING SYSTEM",
      title: "A shared console for research, software, and career momentum.",
      intro: "This site collects my blog, handmade software, career progress, and paper progress. The interface behaves like a live cyber dashboard while the content stays file-based and easy to maintain.",
      primaryCta: "View Software",
      secondaryCta: "Read Blog",
      snapshot: "Current Snapshot",
      profile: "Personal Protocol",
      profileBody: "I care about AI tools, system design, research writing, and turning ideas into usable products. This website is a public log of the path from concept to delivery.",
      contact: "Profile / Contact",
      location: "Location",
      email: "Email",
      telegram: "Chat on Telegram",
      blog: "Latest Blog",
      software: "Software",
      career: "Career Progress",
      papers: "Paper Progress",
      newsFallbackLocation: "Local",
      newsLoading: "Loading local headlines",
      newsEmpty: "No local headlines are available yet"
    },
    guestbook: {
      eyebrow: "GUESTBOOK / MESSAGE CHANNEL",
      title: "Leave me a note.",
      lead: "Thanks for leaving a note. I will get back to you soon.",
      nickname: "Nickname",
      contact: "Contact",
      message: "Message",
      submit: "Send Message",
      submitting: "Sending...",
      success: "Saved. Thanks for the note.",
      error: "The message could not be saved. Please try again later."
    },
    pages: {
      blogTitle: "Blog",
      blogLead: "Research notes, build logs, and retrospectives maintained with Markdown files.",
      softwareTitle: "Software",
      softwareLead: "Tools, experiments, and product prototypes currently being built or refined.",
      careerTitle: "Career Progress",
      careerLead: "A clear timeline for applications, interviews, and feedback.",
      papersTitle: "Paper Progress",
      papersLead: "Tracking topics, reading, experiments, writing, and submission milestones.",
      aboutTitle: "About",
      aboutLead: "A personal profile across research, engineering, and product craft."
    }
  }
} as const;
