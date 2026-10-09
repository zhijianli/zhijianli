import type { Locale } from "./i18n";
import { mentalHealth2026Body } from "./posts/mental-health-2026";
import { voiceStackResearchBody } from "./posts/voice-stack-research";
import { voiceStackResearchBodyEn } from "./posts/voice-stack-research-en";

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "img"; src: string; alt: string; caption?: string };

export type BlogPost = {
  slug: string;
  date: string;
  tags: string[];
  title: string;
  excerpt: string;
  body: BlogBlock[];
};

const zhPosts: BlogPost[] = [
  {
    slug: "china-online-mental-health-2026",
    date: "2026-09-30",
    tags: ["调研", "精神健康", "行业"],
    title: "2026年中国线上精神健康行业深度研究报告",
    excerpt:
      "从需求、支付方、监管与竞争格局拆解中国线上精神健康：为何没有龙头、真壁垒是什么，以及未来 3—5 年创业机会。",
    body: mentalHealth2026Body,
  },
  {
    slug: "voice-stack-research",
    date: "2026-09-22",
    tags: ["调研", "语音", "产品"],
    title: "语音多方案调研报告",
    excerpt:
      "为 AI 教练产品的中英双语实时语音对话，对比三类架构 10 套方案：S2S、Pipeline、Platform。涵盖成本、社区口碑与教练场景推荐。",
    body: voiceStackResearchBody,
  },
];

const enPosts: BlogPost[] = [
  {
    slug: "china-online-mental-health-2026",
    date: "2026-09-30",
    tags: ["Research", "Mental Health", "Industry"],
    title: "China Online Mental Health Industry Report 2026",
    excerpt:
      "A deep dive into China's online mental health market: demand, payers, regulation, competition, and where startups can win in the next 3–5 years. Full text in Chinese.",
    body: mentalHealth2026Body,
  },
  {
    slug: "voice-stack-research",
    date: "2026-09-22",
    tags: ["Research", "Voice", "Product"],
    title: "Voice Stack Research Report",
    excerpt:
      "Comparing 10 voice architectures (S2S, Pipeline, Platform) for bilingual real-time coaching. Cost, community feedback, and recommendations.",
    body: voiceStackResearchBodyEn,
  },
];

const postsByLocale: Record<Locale, BlogPost[]> = {
  zh: zhPosts,
  en: enPosts,
};

export function listPosts(locale: Locale): BlogPost[] {
  return [...postsByLocale[locale]].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(locale: Locale, slug: string): BlogPost | undefined {
  return postsByLocale[locale].find((post) => post.slug === slug);
}

export function formatPostDate(iso: string, locale: Locale): string {
  const [year, month, day] = iso.split("-").map(Number);
  if (locale === "zh") return `${year}年${month}月${day}日`;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[month - 1]} ${day}, ${year}`;
}
