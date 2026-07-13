import { useState } from "react";
import type { LinkedInPost } from "@/data/linkedinPosts";

interface LinkedInEmbedCardProps {
  post: LinkedInPost;
}

export function LinkedInEmbedCard({ post }: LinkedInEmbedCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const iframeSrc = isExpanded ? post.embedUrl : `${post.embedUrl}?collapsed=1`;

  const iframeHeight = isExpanded ? 800 : post.collapsedHeight;

  return (
    <button
      type="button"
      className="panel w-full text-left cursor-pointer transition-all duration-300 hover:border-accent/50 group overflow-hidden"
    >
      <div className="relative">
        <a href={post.link} target="_blank">
          <iframe
            src={iframeSrc}
            height={iframeHeight}
            width="100%"
            frameBorder="0"
            allowFullScreen
            title="LinkedIn post"
            className="pointer-events-none rounded-lg transition-[height] duration-300"
            loading="lazy"
          />
        </a>
        <div
          className="px-4 py-3 border-t border-bg-border flex items-center justify-between"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="text-xs text-ink-muted">
            {isExpanded ? "Click to collapse" : "Click to expand full post"}
          </span>
          <span
            className={`text-xs text-accent transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
          >
            ▼
          </span>
        </div>
      </div>
    </button>
  );
}
