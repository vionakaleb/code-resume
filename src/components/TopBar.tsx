import { motion } from "framer-motion";
import type { TabKey } from "@/data/types";

interface TopBarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  location: string;
  time: string;
}

const tabs: { key: TabKey; label: string }[] = [
  { key: "info", label: "viona-info.tsx" },
  { key: "work", label: "work-projects.tsx" },
  { key: "blog", label: "blog-posts.tsx" },
];

export function TopBar({
  activeTab,
  onTabChange,
  location,
  time,
}: TopBarProps) {
  return (
    <div className="sticky top-0 z-20 bg-bg-base/95 backdrop-blur border-b border-bg-border flex items-stretch">
      <nav className="flex" role="tablist">
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab;
          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => onTabChange(tab.key)}
              className={`relative tab py-5 ${isActive ? "tab-active" : ""}`}
            >
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-3 right-3 h-[2px] bg-accent rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      <div className="ml-auto flex items-center gap-4 pr-5 text-xs text-ink-secondary">
        <span className="hidden md:flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-status-live animate-pulse-dot" />
          Open for work/projects
        </span>
        <span className="hidden md:inline text-ink-muted">• {location}</span>
        <span className="hidden md:inline text-ink-muted">
          • My time: {time}
        </span>
      </div>
    </div>
  );
}
