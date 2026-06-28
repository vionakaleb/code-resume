import { Section } from "@/components/Section";
import { useMediumArticles } from "@/hooks/useMediumArticles";
import { formatArticleDate } from "@/lib/medium";
import {
  ArrowRightIcon,
  ExternalLinkIcon,
  GridIcon,
  ListIcon,
} from "@/components/icons";
import type { MediumArticle, ViewMode } from "@/data/types";
import { motion } from "framer-motion";
import { useState } from "react";
import { ToggleBtn } from "./GithubSection";

interface BlogSectionProps {
  id?: string;
  showHeading?: boolean;
  limit?: number;
}

export function BlogSection({
  id = "blog",
  showHeading = true,
  limit = 4,
}: BlogSectionProps) {
  const { articles, isLoading, error } = useMediumArticles();
  const items = articles.slice(0, limit);

  const [view, setView] = useState<ViewMode>("grid");

  return (
    <Section id={id} comment="Writing engineering, design, and other opinions.">
      {showHeading && (
        <h2 className="display-font text-3xl md:text-5xl mb-10">
          Behind My <span className="text-ink-dim">Coding Desk</span>
        </h2>
      )}

      <div className="flex items-center justify-between mb-8">
        <div className="text-ink-secondary text-sm">
          Articles(
          <span className="text-ink-primary">
            {articles.length.toString().padStart(2, "0")}
          </span>
          )
        </div>
        <div className="flex items-center gap-2">
          <ToggleBtn
            active={view === "grid"}
            onClick={() => setView("grid")}
            aria-label="Grid view"
          >
            <GridIcon />
          </ToggleBtn>
          <ToggleBtn
            active={view === "list"}
            onClick={() => setView("list")}
            aria-label="List view"
          >
            <ListIcon />
          </ToggleBtn>
        </div>
      </div>

      {isLoading && <BlogSkeleton count={limit} />}

      {error && !isLoading && (
        <div className="panel p-6 text-sm text-ink-secondary">
          Couldn't load articles right now ({error}). You can read them directly
          on{" "}
          <a
            href="https://vionakaleb.medium.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline"
          >
            Medium
          </a>
          .
        </div>
      )}

      {!isLoading && !error ? (
        view === "grid" ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((article, i) => (
                <ArticleCard key={article.link} article={article} index={i} />
              ))}
            </div>
            <div className="mt-6 text-right">
              <a
                href="https://vionakaleb.medium.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-green-800 hover:text-green-400 transition-colors"
              >
                View all articles on Medium
                <ExternalLinkIcon />
              </a>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            {articles.map((article, i) => (
              <motion.a
                key={article.link}
                href={article.link}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="bg-bg-elev border border-bg-border rounded-xl p-5 flex items-start gap-4 hover:border-accent/40 transition-colors group"
              >
                {article.thumbnail && (
                  <img
                    src={article.thumbnail}
                    alt=""
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0 bg-bg-panel"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
                <div className="flex flex-col gap-1 min-w-0">
                  <h3 className="text-sm font-semibold text-ink-primary group-hover:text-accent transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-ink-muted">
                    {formatArticleDate(article.pubDate)}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {article.categories.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 bg-bg-panel border border-bg-border rounded text-ink-dim"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )
      ) : (
        ""
      )}
    </Section>
  );
}

interface ArticleCardProps {
  article: MediumArticle;
  index: number;
}

function ArticleCard({ article, index }: ArticleCardProps) {
  return (
    <motion.a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      whileHover={{ y: -3 }}
      className="group panel overflow-hidden hover:border-accent/50 transition-colors flex flex-col"
    >
      {article.thumbnail && (
        <div className="aspect-[16/9] bg-bg-elev overflow-hidden">
          <img
            src={article.thumbnail}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-5 flex-1 flex flex-col">
        <div className="text-xs text-ink-muted mb-2">
          {formatArticleDate(article.pubDate)}
        </div>
        <h3 className="text-ink-primary font-semibold text-lg leading-snug mb-2 group-hover:text-accent transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-ink-secondary mb-4 flex-1">
          <div className="line-clamp-3 leading-relaxed">
            {article.description}
          </div>
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {article.categories.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 bg-bg-panel border border-bg-border rounded text-ink-dim"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="inline-flex items-center gap-2 text-sm text-accent">
          Read full blog
          <ArrowRightIcon />
        </span>
      </div>
    </motion.a>
  );
}

function BlogSkeleton({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="panel overflow-hidden">
          <div className="aspect-[16/9] bg-bg-elev animate-pulse" />
          <div className="p-5 space-y-3">
            <div className="h-3 w-20 bg-bg-elev animate-pulse rounded" />
            <div className="h-5 w-3/4 bg-bg-elev animate-pulse rounded" />
            <div className="h-3 w-full bg-bg-elev animate-pulse rounded" />
            <div className="h-3 w-5/6 bg-bg-elev animate-pulse rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
