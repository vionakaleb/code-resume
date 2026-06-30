import type { SocialLink } from "@/data/types";

interface StatusBarProps {
  social: SocialLink[];
}

export function StatusBar({ social }: StatusBarProps) {
  return (
    <div className="sticky bottom-0 z-10 bg-bg-base/95 backdrop-blur border-t border-bg-border px-5 py-2 text-xs text-ink-muted flex flex-col md:flex-row items-center justify-between gap-2">
      <div className="text-center">
        Delivered impact across banking, trading, e-commerce, and wayfinding.
      </div>
      <div className="flex items-center gap-3">
        {social?.map((s, i) => (
          <a
            key={i}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink-secondary transition-colors"
          >
            <span>
              {i !== 0 && "•"} {s.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
