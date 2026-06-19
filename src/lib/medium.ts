import type { MediumArticle } from "@/data/types";

const MEDIUM_USERNAME = "vionakaleb";
const RSS_ENDPOINT = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`;

interface Rss2JsonItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail: string;
  categories: string[];
}

interface Rss2JsonResponse {
  status: string;
  items: Rss2JsonItem[];
}

function extractThumbnail(html: string, fallback: string): string {
  const match = html.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1] : fallback;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function fetchMediumArticles(): Promise<MediumArticle[]> {
  const res = await fetch(RSS_ENDPOINT);
  if (!res.ok) {
    throw new Error(`Failed to load Medium feed: ${res.status}`);
  }
  const data = (await res.json()) as Rss2JsonResponse;
  if (data.status !== "ok") {
    throw new Error("Medium feed returned non-ok status");
  }
  return data.items.map((item) => ({
    title: item.title,
    link: item.link,
    pubDate: item.pubDate,
    description: stripHtml(item.description).slice(0, 240),
    thumbnail: item.thumbnail || extractThumbnail(item.description, ""),
    categories: item.categories ?? [],
  }));
}

export function formatArticleDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
