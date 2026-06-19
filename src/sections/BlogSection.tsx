import { Section } from "@/components/Section";
import { useMediumArticles } from "@/hooks/useMediumArticles";
import { formatArticleDate } from "@/lib/medium";
import { ArrowRightIcon, ExternalLinkIcon } from "@/components/icons";
import type { MediumArticle } from "@/data/types";
import { motion } from "framer-motion";

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

  return (
    <Section id={id} comment="Insights & ideas">
      {showHeading && (
        <h2 className="display-font text-3xl md:text-5xl mb-10">
          Behind My <span className="text-ink-dim">Coding Desk</span>
        </h2>
      )}

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

      {!isLoading && !error && (
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
              className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-hover transition-colors"
            >
              View all articles on Medium
              <ExternalLinkIcon />
            </a>
          </div>
        </>
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
        <p className="text-sm text-ink-secondary leading-relaxed mb-4 line-clamp-3 flex-1">
          {article.description}
        </p>
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
